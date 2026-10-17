// Optional local browser QA; uses the externally installed Playwright documented in README.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const spec = JSON.parse(
  fs.readFileSync("src/data/lessons/programming-thinking.v1.json", "utf8"),
);
const base = process.env.BASE_URL || "http://127.0.0.1:4193";
const route = (v) =>
  `/learn/${v.id.startsWith("kids") ? "kids" : v.id}/fundamentals/thinking-like-a-programmer${v.id.startsWith("kids") ? `?band=${v.id.split("-")[1]}` : ""}`;
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
        name: "A programmer’s first plan!",
        exact: true,
      });
    async function download(name) {
      const pending = page.waitForEvent("download");
      await page.getByRole("button", { name, exact: true }).click();
      const file = await pending;
      const data = JSON.parse(fs.readFileSync(await file.path(), "utf8"));
      return data;
    }
    for (const variant of spec.variants) {
      await page.goto(base + route(variant));
      await page.locator(".lesson-progress").waitFor();
      assert.equal(await progress(), "0 of 6 activities complete");
      assert.equal(await celebration().count(), 0);
      assert.equal(await page.locator(".lesson-objectives li").count(), 6);
      await page
        .getByRole("button", { name: "Check answer", exact: true })
        .first()
        .click();
      assert.match(
        await page
          .locator(".knowledge-check .lesson-feedback")
          .first()
          .innerText(),
        /Choose an answer/,
      );
      await page
        .locator(".knowledge-check")
        .first()
        .getByRole("radio")
        .first()
        .check();
      await page
        .getByRole("button", { name: "Check answer", exact: true })
        .first()
        .click();
      assert.equal(await progress(), "0 of 6 activities complete");
      const first = page.locator(".sequence-practice").first();
      await first
        .getByRole("button", { name: "Check my plan", exact: true })
        .click();
      assert.match(
        await first.getByRole("status").innerText(),
        /Choose a step/,
      );
      await first
        .getByRole("button", { name: "Show hint", exact: true })
        .focus();
      await page.keyboard.press("Enter");
      assert.equal(
        await first
          .getByRole("button", { name: "Hide hint" })
          .getAttribute("aria-expanded"),
        "true",
      );
      const menu = first.getByRole("combobox").first();
      await menu.focus();
      await menu.press("ArrowDown");
      await menu.press("Tab");
      assert.equal(
        await first
          .getByRole("combobox")
          .nth(1)
          .evaluate((e) => e === document.activeElement),
        true,
      );
      for (let n = 0; n < variant.questions.length; n++) {
        const form = page.locator(".knowledge-check").nth(n);
        await form.getByRole("radio").nth(1).check();
        await form
          .getByRole("button", { name: "Check answer", exact: true })
          .click();
      }
      for (let n = 0; n < variant.taskIds.length; n++) {
        const task = spec.practiceTasks.find(
          (t) => t.id === variant.taskIds[n],
        );
        const form = page.locator(".sequence-practice").nth(n);
        const menus = form.getByRole("combobox");
        // Repeating a step must fail, with no completion increment.
        for (let i = 0; i < task.expectedOrder.length; i++)
          await menus.nth(i).selectOption(task.expectedOrder[0]);
        await form
          .getByRole("button", { name: "Check my plan", exact: true })
          .click();
        assert.match(
          await form.getByRole("status").innerText(),
          /more than once/,
        );
        for (let i = 0; i < task.expectedOrder.length; i++)
          await menus.nth(i).selectOption(task.expectedOrder[i]);
        await form
          .getByRole("button", { name: "Check my plan", exact: true })
          .click();
        assert.match(
          await form.getByRole("status").innerText(),
          /That order reaches the goal/,
        );
        if (n < 2) assert.equal(await celebration().count(), 0);
      }
      await celebration().waitFor();
      assert.equal(await progress(), "6 of 6 activities complete");
      assert.equal(await page.locator(".celebration-enter").count(), 1);
      if (variant.id === "ai") {
        const data = await download("Download lesson JSON");
        assert.deepEqual(data, spec);
        const samples = await download("Download sample assessment records");
        assert.equal(samples.length, 24);
        assert.ok(samples.every((x) => x.executed === false));
        assert.equal(samples.filter((x) => x.passed).length, 12);
        const session = await download("Download this session’s assessments");
        assert.equal(session.executed, false);
        assert.ok(session.records.some((x) => x.valid && x.passed));
      }
      const saved = await page.evaluate(() =>
        Object.fromEntries(
          Object.entries(localStorage).filter(([k]) =>
            k.includes("programming-thinking-001"),
          ),
        ),
      );
      for (const raw of Object.values(saved)) {
        const record = JSON.parse(raw);
        assert.deepEqual(Object.keys(record).sort(), [
          "completed",
          "lessonVersion",
          "version",
        ]);
        assert.equal(record.completed.length, 6);
      }
      await page.reload();
      await celebration().waitFor();
      assert.equal(await page.locator(".celebration-enter").count(), 0);
      await page
        .getByRole("link", { name: "Review this lesson", exact: true })
        .click();
      assert.equal(
        await page.locator("h1").evaluate((e) => document.activeElement === e),
        true,
      );
    }
    // Reset AI only, clearing activity forms and session records without touching other variants/Python.
    await page.evaluate(() =>
      localStorage.setItem(
        "code-coven:lesson:python-variables-002:adults:v1",
        JSON.stringify({
          version: 1,
          lessonVersion: "1.0.0",
          completed: ["label"],
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
          "code-coven:lesson:python-variables-002:adults:v1",
        ),
      ),
    );
    await page.goto(base + route(spec.variants[0]));
    await celebration().waitFor();
    // Both themes and phone/tablet/desktop widths on every experience, plus 200% text.
    for (const theme of ["daylight", "midnight"])
      for (const width of [375, 768, 1440])
        for (const variant of spec.variants) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(base + route(variant));
          await page.locator("h1").waitFor();
          await page.evaluate(
            (t) => (document.documentElement.dataset.theme = t),
            theme,
          );
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth + 1,
            ),
            true,
            `${theme} ${width} ${variant.id}`,
          );
          assert.equal(
            await page
              .locator("img")
              .evaluateAll(
                (xs) =>
                  xs.filter((x) => !x.complete || x.naturalWidth === 0).length,
              ),
            0,
          );
        }
    await page.setViewportSize({ width: 375, height: 1000 });
    await page.goto(base + route(spec.variants[0]));
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
        .locator(".completion-celebration")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    fs.mkdirSync("artifacts/mission-017", { recursive: true });
    await page.screenshot({
      path: "artifacts/mission-017/little-mobile.png",
      fullPage: true,
    });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.screenshot({
      path: "artifacts/mission-017/little-desktop.png",
      fullPage: true,
    });
    await page.goto(base + "/courses/programming-foundations");
    await page
      .getByRole("link", { name: "Little Apprentices", exact: true })
      .click();
    await page
      .getByRole("heading", { name: spec.title, exact: true })
      .waitFor();
    for (const path of ["/learn/kids", "/learn/adults", "/learn/ai"]) {
      await page.goto(base + path);
      await page
        .getByRole("link", { name: /Open Programming Fundamentals/ })
        .click();
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
    await p
      .locator(".knowledge-check")
      .first()
      .getByRole("radio")
      .nth(1)
      .check();
    await p
      .getByRole("button", { name: "Check answer", exact: true })
      .first()
      .click();
    assert.match(await p.locator(".lesson-progress h2").innerText(), /^1 of/);
    await p
      .getByRole("button", {
        name: "Reset this lesson’s progress",
        exact: true,
      })
      .click();
    assert.match(await p.locator(".lesson-progress h2").innerText(), /^0 of/);
    await blocked.close();
    assert.deepEqual(errors, []);
    assert.ok(
      requests.every((url) => url.startsWith(base) || url.startsWith("blob:")),
      "No executor/external requests",
    );
    console.log(
      "PASS: four experiences, six activities each, hints, feedback/retries, keyboard, gated celebration/restore/reset, minimal isolated progress, AI JSON/sample/session downloads, both themes x three widths, 200% text, reduced motion, blocked storage, links, intact images, CSP simulation and no external/executor requests or browser errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
