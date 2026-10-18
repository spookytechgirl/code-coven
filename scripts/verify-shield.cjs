// Optional local browser QA using the external Playwright/Chrome setup in README.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const spec = JSON.parse(
  fs.readFileSync("src/data/lessons/cyber-shield.v1.json", "utf8"),
);
const base = process.env.BASE_URL || "http://127.0.0.1:4196";
const route = (v) =>
  `/learn/${v.id.startsWith("kids") ? "kids" : v.id}/security/first-shield${v.id.startsWith("kids") ? `?band=${v.id.split("-")[1]}` : ""}`;
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
        name: "Your first shield is shining!",
        exact: true,
      });
    async function download(name) {
      const pending = page.waitForEvent("download");
      await page.getByRole("button", { name, exact: true }).click();
      const file = await pending;
      return JSON.parse(fs.readFileSync(await file.path(), "utf8"));
    }
    async function choose(
      form,
      t,
      classification = t.expectedClassification,
      action = t.expectedActionId,
    ) {
      await form
        .locator("fieldset")
        .nth(0)
        .getByRole("radio")
        .nth(classification === "suspicious" ? 0 : 1)
        .check();
      await form
        .locator("fieldset")
        .nth(1)
        .getByRole("radio", {
          name: t.actions.find((a) => a.id === action).text,
          exact: true,
        })
        .check();
    }
    for (const variant of spec.variants) {
      await page.goto(base + route(variant));
      await page.locator(".lesson-progress").waitFor();
      assert.equal(await progress(), "0 of 6 activities complete");
      assert.equal(await page.locator(".lesson-objectives li").count(), 6);
      assert.equal(await page.locator(".knowledge-check").count(), 3);
      assert.equal(await page.locator(".shield-practice").count(), 3);
      assert.equal(
        await page.locator('textarea,input:not([type="radio"])').count(),
        0,
        "No secret or personal-data entry controls",
      );
      assert.equal(
        await page
          .locator(
            ".shield-message a,.shield-message iframe,.shield-message form,.shield-message img,.shield-message button",
          )
          .count(),
        0,
      );
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
      const first = page.locator(".shield-practice").first();
      await first
        .getByRole("button", { name: "Check my shield choices", exact: true })
        .click();
      assert.match(await first.getByRole("status").innerText(), /Choose/);
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
      await first
        .locator("fieldset")
        .first()
        .getByRole("radio")
        .first()
        .focus();
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Tab");
      assert.equal(
        await first
          .locator("fieldset")
          .nth(1)
          .getByRole("radio")
          .first()
          .evaluate((e) => document.activeElement === e),
        true,
      );
      const address = spec.practiceTasks.find(
        (t) => t.id === variant.taskIds[0],
      ).displayAddress;
      if (address) {
        const before = page.url();
        await first.getByText(address, { exact: true }).click();
        assert.equal(page.url(), before);
      }
      for (let n = 0; n < 3; n++) {
        const form = page.locator(".knowledge-check").nth(n);
        await form.getByRole("radio").nth(1).check();
        await form
          .getByRole("button", { name: "Check answer", exact: true })
          .click();
      }
      for (let n = 0; n < 3; n++) {
        const t = spec.practiceTasks.find((t) => t.id === variant.taskIds[n]);
        const form = page.locator(".shield-practice").nth(n);
        await choose(
          form,
          t,
          t.expectedClassification === "suspicious"
            ? "no-warning-shown"
            : "suspicious",
        );
        await form
          .getByRole("button", { name: "Check my shield choices", exact: true })
          .click();
        assert.match(await form.getByRole("status").innerText(), /clues again/);
        assert.equal(await progress(), `${3 + n} of 6 activities complete`);
        await choose(
          form,
          t,
          t.expectedClassification,
          t.actions.find((a) => a.id !== t.expectedActionId).id,
        );
        await form
          .getByRole("button", { name: "Check my shield choices", exact: true })
          .click();
        assert.equal(await progress(), `${3 + n} of 6 activities complete`);
        await choose(form, t);
        await form
          .getByRole("button", { name: "Check my shield choices", exact: true })
          .click();
        assert.match(
          await form.getByRole("status").innerText(),
          /Thoughtful choice/,
        );
        if (n < 2) assert.equal(await celebration().count(), 0);
      }
      await celebration().waitFor();
      assert.equal(await progress(), "6 of 6 activities complete");
      assert.equal(await page.locator(".celebration-enter").count(), 1);
      await first
        .getByRole("button", { name: "Reset this activity", exact: true })
        .click();
      assert.equal(await first.locator("input:checked").count(), 0);
      assert.equal(await progress(), "6 of 6 activities complete");
      if (variant.id === "ai") {
        assert.deepEqual(await download("Download lesson JSON"), spec);
        const samples = await download("Download sample assessment records");
        assert.equal(samples.length, 36);
        assert.equal(samples.filter((x) => x.passed).length, 12);
        assert.ok(
          samples.every(
            (x) =>
              x.executed === false &&
              x.actionsPerformed === false &&
              x.expectedResponse &&
              x.explanation,
          ),
        );
        await choose(
          first,
          spec.practiceTasks.find((t) => t.id === variant.taskIds[0]),
        );
        for (let i = 0; i < 22; i++)
          await first
            .getByRole("button", {
              name: "Check my shield choices",
              exact: true,
            })
            .click();
        const session = await download("Download this session’s assessments");
        assert.equal(session.records.length, 20);
        assert.ok(
          session.records.every(
            (x) => x.executed === false && x.actionsPerformed === false,
          ),
        );
      }
      const saved = await page.evaluate(() =>
        Object.fromEntries(
          Object.entries(localStorage).filter(([k]) =>
            k.includes("cyber-guardian-shield-001"),
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
    await page.evaluate(() =>
      localStorage.setItem(
        "code-coven:lesson:web-html-anatomy-001:ai:v1",
        JSON.stringify({
          version: 1,
          lessonVersion: "1.0.0",
          completed: ["html"],
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
        localStorage.getItem("code-coven:lesson:web-html-anatomy-001:ai:v1"),
      ),
    );
    await page.goto(base + route(spec.variants[0]));
    await celebration().waitFor();
    for (const theme of ["daylight", "midnight"])
      for (const width of [375, 768, 1440])
        for (const variant of spec.variants) {
          await page.setViewportSize({ width, height: 1000 });
          await page.goto(base + route(variant));
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
        .locator(".completion-celebration")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    fs.mkdirSync("artifacts/mission-017c", { recursive: true });
    await page.locator(".shield-practice").first().scrollIntoViewIfNeeded();
    await page.screenshot({
      path: "artifacts/mission-017c/little-mobile-story.png",
      animations: "disabled",
    });
    await page.goto(base + "/courses/cybersecurity-charms");
    await page
      .getByRole("link", { name: "Little Apprentices", exact: true })
      .click();
    await page
      .getByRole("heading", { name: spec.title, exact: true })
      .waitFor();
    for (const audience of ["kids", "adults", "ai"]) {
      await page.goto(base + "/learn/" + audience);
      await page
        .getByRole("link", { name: /Open Cybersecurity Charms/ })
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
      "No external, scenario-address, account or executor requests",
    );
    console.log(
      "PASS: four shield experiences, six objectives/activities, two-part deterministic decisions, retries/hints, keyboard, non-clickable fictional messages, no credential-entry controls or external/account/executor requests, gated celebration/restore/reset/isolation, minimal progress, all three AI downloads and record cap, both themes x three widths, enlarged text, reduced motion, blocked storage, course/path discovery and intact artwork (local CSP simulation).",
    );
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
