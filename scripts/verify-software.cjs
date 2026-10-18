// Optional external Playwright/Chrome QA; no application dependency.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fs = require("node:fs");
const assert = require("node:assert/strict");
const spec = JSON.parse(
  fs.readFileSync("src/data/lessons/software-spellbook.v1.json", "utf8"),
);
const base = process.env.BASE_URL || "http://127.0.0.1:4202";
const route = (v) =>
  `/learn/${v.id.startsWith("kids") ? "kids" : v.id}/software/first-spellbook${v.id.startsWith("kids") ? "?band=" + v.id.split("-")[1] : ""}`;
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const headers = Object.fromEntries(
      fs
        .readFileSync("dist/_headers", "utf8")
        .split("\n")
        .filter((s) => /^  [A-Za-z-]+:/.test(s))
        .map((s) => {
          const i = s.indexOf(":");
          return [s.slice(0, i).trim().toLowerCase(), s.slice(i + 1).trim()];
        }),
    );
    await context.route("**/*", async (route) => {
      const response = await route.fetch();
      await route.fulfill({
        response,
        headers: { ...response.headers(), ...headers },
      });
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [],
      requests = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("request", (r) => requests.push(r.url()));
    page.on("response", (r) => {
      if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
    });
    const progress = () => page.locator(".lesson-progress h2").innerText();
    const celebration = () =>
      page.getByRole("heading", {
        name: "The first software spell is complete!",
        exact: true,
      });
    const download = async (name) => {
      const pending = page.waitForEvent("download");
      await page.getByRole("button", { name, exact: true }).click();
      const d = await pending;
      return JSON.parse(fs.readFileSync(await d.path(), "utf8"));
    };
    const fill = async (
      form,
      task,
      answers = task.slots.map((s) => s.expectedId),
    ) => {
      for (let i = 0; i < answers.length; i++)
        await form.locator("select").nth(i).selectOption(answers[i]);
    };
    for (const v of spec.variants) {
      await page.goto(base + route(v));
      await page.locator(".lesson-progress").waitFor();
      assert.equal(await progress(), "0 of 6 activities complete");
      assert.equal(await page.locator(".lesson-objectives li").count(), 6);
      assert.equal(await page.locator(".knowledge-check").count(), 3);
      assert.equal(await page.locator(".software-practice").count(), 3);
      assert.equal(
        await page.locator('textarea,input:not([type="radio"])').count(),
        0,
      );
      assert.equal(await celebration().count(), 0);
      for (let i = 0; i < 3; i++) {
        const f = page.locator(".knowledge-check").nth(i),
          q = v.questions[i];
        await f
          .getByRole("button", { name: "Check answer", exact: true })
          .click();
        assert.match(await f.getByRole("status").innerText(), /Choose/);
        await f
          .getByRole("radio")
          .nth(q.choices.findIndex((c) => !c.correct))
          .check();
        await f
          .getByRole("button", { name: "Check answer", exact: true })
          .click();
        assert.match(await f.getByRole("status").innerText(), /Try again/);
        await f
          .getByRole("radio")
          .nth(q.choices.findIndex((c) => c.correct))
          .check();
        await f
          .getByRole("button", { name: "Check answer", exact: true })
          .click();
        assert.match(await f.getByRole("status").innerText(), /Exactly/);
      }
      assert.equal(await progress(), "3 of 6 activities complete");
      for (let i = 0; i < 3; i++) {
        const task = spec.practiceTasks.find((t) => t.id === v.taskIds[i]);
        const f = page.locator(".software-practice").nth(i);
        const check = f.getByRole("button", {
          name: "Check my choices",
          exact: true,
        });
        await check.click();
        assert.match(await f.getByRole("status").innerText(), /every menu/);
        assert.equal(await progress(), `${3 + i} of 6 activities complete`);
        const hint = f.getByRole("button", { name: "Show hint", exact: true });
        await hint.focus();
        await page.keyboard.press("Enter");
        assert.equal(
          await f
            .getByRole("button", { name: "Hide hint", exact: true })
            .getAttribute("aria-expanded"),
          "true",
        );
        assert.ok(await f.getByText(task.hint, { exact: true }).isVisible());
        await f.locator("select").first().focus();
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Tab");
        assert.equal(
          await f
            .locator("select")
            .first()
            .evaluate((e) => e === document.activeElement),
          false,
        );
        const good = task.slots.map((s) => s.expectedId);
        for (let j = 0; j < good.length; j++) {
          const bad = [...good];
          bad[j] = task.slots[j].options.find((o) => o.id !== good[j]).id;
          await fill(f, task, bad);
          await check.click();
          assert.match(await f.getByRole("status").innerText(), /again/);
          assert.equal(await progress(), `${3 + i} of 6 activities complete`);
        }
        await fill(f, task);
        await check.click();
        assert.match(await f.getByRole("status").innerText(), /Thoughtful/);
        assert.ok(await f.locator(".software-output").isVisible());
        if (i < 2) assert.equal(await celebration().count(), 0);
        await f
          .getByRole("button", { name: "Reset this activity", exact: true })
          .click();
        assert.ok(
          (
            await f
              .locator("select")
              .evaluateAll((xs) => xs.map((x) => x.value))
          ).every((x) => x === ""),
        );
        assert.equal(await progress(), `${4 + i} of 6 activities complete`);
      }
      await celebration().waitFor();
      assert.ok(
        await page
          .getByRole("img", {
            name: "The First Software Spell Is Complete!: a glowing completed spellbook",
            exact: true,
          })
          .isVisible(),
      );
      if (v.id === "ai") {
        assert.equal(await page.locator(".ai-test").count(), 12);
        const lesson = await download("Download lesson JSON");
        assert.equal(lesson.assessment.testCases.length, 48);
        const samples = await download("Download sample assessment records");
        assert.equal(samples.length, 48);
        assert.equal(samples.filter((r) => r.passed).length, 12);
        assert.ok(
          samples.every(
            (r) => r.executed === false && r.actionsPerformed === false,
          ),
        );
        const session = await download("Download this session’s assessments");
        assert.ok(session.records.length > 0);
        assert.ok(session.records.every((r) => r.executed === false));
        const f = page.locator(".software-practice").first();
        const task = spec.practiceTasks.find((t) => t.id === v.taskIds[0]);
        await fill(f, task);
        for (let i = 0; i < 23; i++)
          await f
            .getByRole("button", { name: "Check my choices", exact: true })
            .click();
        assert.equal(
          (await download("Download this session’s assessments")).records
            .length,
          20,
        );
      }
      await page.reload();
      await celebration().waitFor();
      assert.equal(await page.locator(".spellbook-enter").count(), 0);
      if (v.id === "ai")
        assert.equal(
          (await download("Download this session’s assessments")).records
            .length,
          0,
        );
      const saved = await page.evaluate(() =>
        Object.entries(localStorage)
          .filter(([k]) =>
            k.startsWith("code-coven:lesson:software-spellbook-001:"),
          )
          .map(([, s]) => JSON.parse(s)),
      );
      assert.ok(
        saved.every(
          (s) =>
            Object.keys(s).sort().join(",") ===
            "completed,lessonVersion,version",
        ),
      );
      await page
        .getByRole("link", { name: "Review this lesson", exact: true })
        .click();
      assert.equal(
        await page.locator("h1").evaluate((e) => e === document.activeElement),
        true,
      );
    }
    await page.evaluate(() =>
      localStorage.setItem(
        "code-coven:lesson:cyber-guardian-shield-001:ai:v1",
        JSON.stringify({
          version: 1,
          lessonVersion: "1.0.0",
          completed: ["ai-check-1"],
        }),
      ),
    );
    await page
      .getByRole("button", {
        name: "Reset this lesson’s progress",
        exact: true,
      })
      .click();
    assert.equal(await progress(), "0 of 6 activities complete");
    assert.equal(await celebration().count(), 0);
    assert.equal(
      (await download("Download this session’s assessments")).records.length,
      0,
    );
    assert.ok(
      await page.evaluate(() =>
        localStorage.getItem(
          "code-coven:lesson:cyber-guardian-shield-001:ai:v1",
        ),
      ),
    );
    await page.goto(base + route(spec.variants[0]));
    await celebration().waitFor();
    fs.mkdirSync("artifacts/mission-017f", { recursive: true });
    for (const theme of ["daylight", "midnight"])
      for (const width of [375, 768, 1440])
        for (const v of spec.variants) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(base + route(v));
          await page
            .getByRole("heading", { name: spec.title, exact: true })
            .waitFor();
          await page.evaluate(
            (t) => (document.documentElement.dataset.theme = t),
            theme,
          );
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth + 1,
            ),
            true,
            `${v.id} ${theme} ${width}`,
          );
          assert.equal(
            await page
              .locator("img")
              .evaluateAll(
                (xs) => xs.filter((x) => !x.complete || !x.naturalWidth).length,
              ),
            0,
          );
          if (width === 1440 && theme === "daylight")
            await page.screenshot({
              path: `artifacts/mission-017f/${v.id}-desktop.png`,
              animations: "disabled",
            });
        }
    await page.setViewportSize({ width: 375, height: 1000 });
    await page.goto(base + route(spec.variants[0]));
    await celebration().waitFor();
    await page.evaluate(
      () => (document.documentElement.style.fontSize = "200%"),
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      true,
    );
    await page.evaluate(() => (document.documentElement.style.fontSize = ""));
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator(".software-spellbook-reward")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    assert.equal(
      await page
        .locator(".completion-celebration")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    await page.locator(".software-practice").first().scrollIntoViewIfNeeded();
    await page.screenshot({
      path: "artifacts/mission-017f/little-mobile.png",
      animations: "disabled",
    });
    await page.locator(".software-spellbook-reward").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: "artifacts/mission-017f/spellbook-reward.png",
      animations: "disabled",
    });
    await page.goto(base + "/courses/software-sorcery");
    await page
      .getByRole("link", { name: "Little Apprentices", exact: true })
      .click();
    await page
      .getByRole("heading", { name: spec.title, exact: true })
      .waitFor();
    for (const a of ["kids", "adults", "ai"]) {
      await page.goto(base + "/learn/" + a);
      await page.getByRole("link", { name: /Open Software Sorcery/ }).click();
      await page
        .getByRole("heading", { name: spec.title, exact: true })
        .waitFor();
    }
    const blocked = await browser.newContext();
    await blocked.addInitScript(() =>
      Object.defineProperty(window, "localStorage", {
        get() {
          throw Error("blocked");
        },
      }),
    );
    const p = await blocked.newPage();
    await p.goto(base + route(spec.variants[0]));
    await p
      .getByText("Browser storage is unavailable.", { exact: false })
      .waitFor();
    await blocked.close();
    assert.deepEqual(errors, []);
    assert.ok(
      requests.every((u) => u.startsWith(base) || u.startsWith("blob:")),
    );
    console.log(
      "PASS: four software experiences, six objectives and activities, complete requirements/components/debugging feedback, retries/hints, keyboard, reset/restore/isolation, 48-case and session downloads, cap, minimal storage, original artwork, workshop spellbook celebration, both themes x three widths, enlarged text, reduced motion, blocked storage and no external/executor requests or browser errors (local CSP simulation).",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
