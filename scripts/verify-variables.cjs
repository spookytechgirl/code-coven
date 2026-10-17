// Optional local browser regression: same Playwright/Chrome setup as verify-lessons.cjs.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.BASE_URL || "http://127.0.0.1:4192";
const routes = [
  "/learn/kids/python/variable-vault?band=little",
  "/learn/kids/python/variable-vault?band=junior",
  "/learn/adults/python/variable-vault",
];
const answers = {
  label: 'familiar = "Hexi"\nprint(familiar)',
  number: "potions = 3\nprint(potions)",
  change: "potions = 2\nprint(potions)\npotions = 5\nprint(potions)",
  inventory:
    'potion_name = "Moon Tea"\nbottles = 4\nprint(potion_name)\nprint(bottles)',
};
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
      reducedMotion: "no-preference",
    });
    const errors = [],
      requests = [];
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
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("request", (r) => requests.push(r.url()));
    page.on("response", (r) => {
      if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
    });
    const celebration = page.getByRole("heading", {
      name: "The Variable Vault Is Open!",
      exact: true,
    });
    async function complete() {
      const count = await page.locator(".knowledge-check fieldset").count();
      for (let i = 0; i < count; i++) {
        await page
          .locator(".knowledge-check fieldset")
          .nth(i)
          .getByRole("radio")
          .nth(0)
          .check();
        await page
          .getByRole("button", { name: "Check answer", exact: true })
          .nth(i)
          .click();
      }
      const inputs = page.getByRole("textbox");
      for (let i = 0; i < (await inputs.count()); i++) {
        const label = await inputs.nth(i).getAttribute("id");
        const name = await page.locator(`label[for="${label}"]`).innerText();
        const id = name.split(" · ")[1];
        await inputs.nth(i).fill(answers[id]);
        await page
          .getByRole("button", { name: "Check variable spell", exact: true })
          .nth(i)
          .click();
      }
      await celebration.waitFor();
      assert.equal(
        await page.locator(".lesson-progress h2").innerText(),
        "6 of 6 activities complete",
      );
    }
    for (const route of routes) {
      await page.goto(base + route);
      await page.locator(".lesson-progress h2").waitFor();
      assert.match(
        await page.locator(".lesson-progress h2").innerText(),
        /^0 of/,
      );
      await page
        .getByRole("button", { name: "Check answer", exact: true })
        .first()
        .click();
      assert.match(
        await page.locator(".lesson-feedback").first().innerText(),
        /Choose an answer/,
      );
      await page
        .locator(".knowledge-check fieldset")
        .first()
        .getByRole("radio")
        .nth(1)
        .check();
      await page
        .getByRole("button", { name: "Check answer", exact: true })
        .first()
        .click();
      assert.match(
        await page.locator(".lesson-progress h2").innerText(),
        /^0 of/,
      );
      const source = page.getByRole("textbox").first();
      await source.fill("print(unknown_name)");
      await source.press("Tab");
      assert.equal(
        await page.evaluate(() => document.activeElement.tagName),
        "SUMMARY",
      );
      await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(() => document.activeElement.textContent.trim()),
        "Check variable spell",
      );
      await page.keyboard.press("Enter");
      assert.match(
        await page
          .locator(".lesson-feedback")
          .nth(await page.locator(".knowledge-check fieldset").count())
          .innerText(),
        /Line 1:/,
      );
      await page
        .getByRole("button", { name: "Show a hint", exact: true })
        .first()
        .press("Enter");
      assert.equal(
        await page
          .getByRole("button", { name: "Hide hint", exact: true })
          .getAttribute("aria-expanded"),
        "true",
      );
      await complete();
      await page.reload();
      await celebration.waitFor();
      assert.equal(await page.locator(".celebration-enter").count(), 0);
    }
    // Reset only Junior; other variants and Lesson 001 remain independent.
    await page.goto(base + routes[1]);
    await page
      .getByRole("button", {
        name: "Reset this lesson’s progress",
        exact: true,
      })
      .click();
    assert.match(
      await page.locator(".lesson-progress h2").innerText(),
      /^0 of/,
    );
    assert.equal(await celebration.count(), 0);
    await page.goto(base + routes[0]);
    await celebration.waitFor();
    const records = await page.evaluate(() =>
      Object.entries(localStorage)
        .filter(([key]) => key.startsWith("code-coven:lesson:"))
        .map(([, value]) => JSON.parse(value)),
    );
    for (const record of records)
      assert.deepEqual(Object.keys(record).sort(), [
        "completed",
        "lessonVersion",
        "version",
      ]);
    await page.goto(base + "/learn/ai/python/variable-vault");
    await page
      .getByRole("button", { name: "Download assessment records", exact: true })
      .waitFor();
    const downloaded = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Download assessment records", exact: true })
      .click();
    const download = await downloaded;
    const assessment = JSON.parse(
      fs.readFileSync(await download.path(), "utf8"),
    );
    assert.equal(assessment.length, 20);
    assert.ok(assessment.every((x) => x.executed === false));
    // Full rendering/reflow with both theme states, plus 200% text sizing on a phone.
    for (const theme of ["daylight", "midnight"]) {
      await page.setViewportSize({ width: 1440, height: 1000 });
      if (theme === "midnight")
        await page
          .getByRole("button", { name: "Switch to Midnight Coven" })
          .click();
      for (const width of [375, 768, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        for (const route of [...routes, "/learn/ai/python/variable-vault"]) {
          await page.goto(base + route);
          await page.locator("h1").waitFor();
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            true,
            `${theme} ${width} ${route}`,
          );
        }
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(base + routes[0]);
    await page
      .getByRole("button", { name: "Reset this lesson’s progress" })
      .click();
    await complete();
    assert.equal(
      await page
        .locator(".completion-celebration")
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    await page.setViewportSize({ width: 375, height: 900 });
    await page.evaluate(() => {
      document.documentElement.style.fontSize = "200%";
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
    );
    assert.ok(
      requests.every((url) => url.startsWith(base)),
      "No executor or external requests",
    );
    assert.deepEqual(errors, []);
    await context.close();
    const blocked = await browser.newContext();
    await blocked.addInitScript(() => {
      Object.defineProperty(Storage.prototype, "setItem", {
        value() {
          throw Error("storage blocked");
        },
      });
    });
    const restricted = await blocked.newPage();
    await restricted.goto(base + routes[0]);
    await restricted
      .getByRole("group")
      .first()
      .getByRole("radio")
      .first()
      .check();
    await restricted
      .getByRole("button", { name: "Check answer", exact: true })
      .first()
      .click();
    assert.match(
      await restricted.locator(".lesson-progress").innerText(),
      /Browser storage is unavailable/,
    );
    await blocked.close();
    console.log(
      "PASS: all human variants, retries, hints, keyboard, completion/restore/reset isolation, minimal storage, AI downloads, themes/reflow, reduced motion, 200% text, blocked storage, CSP simulation, no executor/external requests, and no browser errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
