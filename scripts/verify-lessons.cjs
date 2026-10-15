const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
  });
  let context;
  try {
    context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const page = await context.newPage();
    page.setDefaultTimeout(10000);
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    page.on("response", (r) => {
      if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);
    });
    // Reproduce Pages' security headers locally; Vite preview does not apply _headers.
    const headers = Object.fromEntries(
      fs
        .readFileSync("dist/_headers", "utf8")
        .split("\n")
        .filter((s) => /^  [A-Za-z-]+:/.test(s))
        .map((s) => {
          const colon = s.indexOf(":");
          return [
            s.slice(0, colon).trim().toLowerCase(),
            s.slice(colon + 1).trim(),
          ];
        }),
    );
    await context.route("**/*", async (route) => {
      const response = await route.fetch();
      await route.fulfill({
        response,
        headers: { ...response.headers(), ...headers },
      });
    });
    async function visit(route) {
      await page.goto(base + route);
      await page.locator("h1").waitFor();
    }
    async function answer(index, value) {
      const form = page.locator(".knowledge-check").nth(index);
      await form.locator(`input[value="${value}"]`).check();
      await form
        .getByRole("button", { name: "Check answer", exact: true })
        .click();
    }
    async function practice(code) {
      await page.getByLabel("Your Python code", { exact: true }).fill(code);
      await page.getByRole("button", { name: "Check practice text" }).click();
    }
    await visit("/learn");
    assert.equal(await page.locator(".path-card").count(), 3);
    await page
      .locator(".path-kids")
      .getByRole("link", { name: "Begin Learning" })
      .click();
    await page
      .getByRole("heading", { name: "Little Apprentices", exact: true })
      .waitFor();
    await page
      .locator(".band-card")
      .first()
      .getByRole("link", { name: "Begin Learning" })
      .click();
    await page
      .getByRole("heading", { name: "Your First Magical Spell!", exact: true })
      .waitFor();
    const first = page.locator(".knowledge-check").first();
    await first
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await first
      .getByText("Choose an answer, then check it.", { exact: true })
      .waitFor();
    await answer(0, "say");
    assert.match(
      await first.locator('[role="status"]').textContent(),
      /Start your spell with print/,
    );
    await answer(0, "print");
    await answer(1, "hello");
    await practice('print("Hello, Code Coven!")');
    await page
      .getByRole("heading", {
        name: "Your First Spell Was Successful!",
        exact: true,
      })
      .waitFor();
    await page.reload();
    await page
      .getByRole("heading", {
        name: "Your First Spell Was Successful!",
        exact: true,
      })
      .waitFor();
    const saved = await page.evaluate(() =>
      JSON.parse(
        localStorage.getItem(
          "code-coven:lesson:python-output-001:kids-little:v1",
        ),
      ),
    );
    assert.deepEqual(saved.completed.sort(), [
      "practice",
      "predict",
      "recognize",
    ]);
    assert.deepEqual(Object.keys(saved).sort(), [
      "completed",
      "lessonVersion",
      "version",
    ]);
    await page
      .getByLabel("Choose your spell difficulty")
      .selectOption("junior");
    await page
      .getByRole("heading", { name: "0 of 3 activities complete", exact: true })
      .waitFor();
    await answer(0, "string");
    await answer(1, "hello");
    await practice('print("Welcome to Code Coven!")');
    await page
      .getByRole("heading", { name: "Lesson complete", exact: true })
      .waitFor();
    await page
      .getByLabel("Choose your spell difficulty")
      .selectOption("little");
    await page
      .getByRole("heading", { name: "3 of 3 activities complete", exact: true })
      .waitFor();
    await visit("/learn/adults/python/first-program");
    await page
      .getByRole("heading", { name: "0 of 4 activities complete", exact: true })
      .waitFor();
    await answer(0, "quotes");
    assert.match(
      await page
        .locator(".knowledge-check")
        .first()
        .locator('[role="status"]')
        .textContent(),
      /quotation marks/,
    );
    await answer(0, "print");
    await answer(1, "string");
    await answer(2, "hello");
    await practice('print("wrong message")');
    assert.match(
      await page.locator('.lesson-practice [role="status"]').textContent(),
      /message differs/,
    );
    await practice('print("Welcome to Code Coven!"); alert(1)');
    assert.match(
      await page.locator('.lesson-practice [role="status"]').textContent(),
      /exactly one print/,
    );
    await practice("print('Welcome to Code Coven!')");
    await page
      .getByRole("heading", { name: "Lesson complete", exact: true })
      .waitFor();
    await page.getByRole("button", { name: "Copy Python example" }).click();
    await page.getByText("Code copied.", { exact: true }).waitFor();
    assert.equal(
      await page.evaluate(() => navigator.clipboard.readText()),
      'print("Hello, Code Coven!")',
    );
    await page.reload();
    await page
      .getByRole("heading", { name: "Lesson complete", exact: true })
      .waitFor();
    fs.mkdirSync("artifacts", { recursive: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: "artifacts/lesson-adults-desktop.png",
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Reset this lesson’s progress" })
      .click();
    await page
      .getByRole("heading", { name: "0 of 4 activities complete", exact: true })
      .waitFor();
    await visit("/learn/kids/python/first-spell");
    await page
      .getByRole("heading", { name: "3 of 3 activities complete", exact: true })
      .waitFor();
    const beforeAi = await page.evaluate(() =>
      Object.keys(localStorage).sort(),
    );
    await visit("/learn/ai/python/output-fundamentals");
    assert.equal(await page.locator(".ai-test").count(), 5);
    const pending = page.waitForEvent("download");
    await page
      .getByRole("button", { name: "Download lesson JSON", exact: true })
      .click();
    const download = await pending;
    assert.equal(
      download.suggestedFilename(),
      "code-coven-python-output-v1.json",
    );
    const stream = await download.createReadStream();
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const spec = JSON.parse(Buffer.concat(chunks).toString());
    const { validateAiLesson } = await import("../src/learning/schema.ts");
    assert.equal(validateAiLesson(spec).success, true);
    assert.deepEqual(spec.safety.permissions, []);
    assert.deepEqual(
      await page.evaluate(() => Object.keys(localStorage).sort()),
      beforeAi,
    );
    for (const theme of ["daylight", "midnight"]) {
      if (theme === "midnight")
        await page
          .getByRole("button", { name: "Switch to Midnight Coven" })
          .click();
      for (const width of [375, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of [
          "/",
          "/learn",
          "/learn/kids",
          "/learn/adults",
          "/learn/ai",
          "/learn/kids/python/first-spell?band=little",
          "/learn/kids/python/first-spell?band=junior",
          "/learn/adults/python/first-program",
          "/learn/ai/python/output-fundamentals",
        ]) {
          await visit(route);
          assert.equal(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
            true,
            `${route} ${theme} ${width}`,
          );
        }
      }
    }
    await page.setViewportSize({ width: 375, height: 900 });
    await visit("/learn/kids/python/first-spell?band=junior");
    await page.screenshot({
      path: "artifacts/lesson-kids-mobile-midnight.png",
      fullPage: true,
    });
    await visit("/");
    await page.getByRole("button", { name: "Toggle navigation" }).click();
    await page
      .getByRole("navigation", { name: "Main navigation" })
      .getByRole("link", { name: "Learn", exact: true })
      .click();
    await page
      .getByRole("heading", {
        name: "One little spell. Three ways to learn.",
        exact: true,
      })
      .waitFor();
    await visit("/learn/adults/python/first-program");
    await page.evaluate(() => {
      document.body.tabIndex = -1;
      document.body.focus();
      document.body.removeAttribute("tabindex");
    });
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(() => document.activeElement.textContent),
      "Skip to main content",
    );
    await page.keyboard.press("Enter");
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "main-content",
    );
    await page
      .locator(".knowledge-check")
      .first()
      .locator('input[value="print"]')
      .focus();
    await page.keyboard.press("Space");
    assert.ok(
      await page
        .locator(".knowledge-check")
        .first()
        .locator('input[value="print"]')
        .isChecked(),
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await page
        .locator(".button")
        .first()
        .evaluate((el) => getComputedStyle(el).transitionDuration),
      "0s",
    );
    const blocked = await browser.newContext();
    await blocked.addInitScript(() => {
      for (const key of ["getItem", "setItem", "removeItem"])
        Storage.prototype[key] = () => {
          throw new Error("Storage unavailable");
        };
    });
    const blockedPage = await blocked.newPage();
    await blockedPage.goto(base + "/learn/adults/python/first-program");
    const form = blockedPage.locator(".knowledge-check").first();
    await form.locator('input[value="print"]').check();
    await form
      .getByRole("button", { name: "Check answer", exact: true })
      .click();
    await blockedPage
      .getByText(
        "Browser storage is unavailable. Completion lasts only while this lesson stays open.",
        { exact: true },
      )
      .waitFor();
    await blocked.close();
    assert.deepEqual(errors, []);
    console.log(
      "PASS: pathway navigation, both Kids bands, feedback/retries, practical checks, copy code, isolated persistent progress/reset, AI download/schema, no AI progress writes, blocked storage, keyboard interactions, reduced motion, both themes, 4 widths, and CSP/resource checks.",
    );
  } finally {
    if (context) {
      await context.unrouteAll({ behavior: "ignoreErrors" });
      await context.close();
    }
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
