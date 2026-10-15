const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
const route = "/learn/kids/python/first-spell?band=little";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  try {
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
    await context.route("**/*", async (request) => {
      const response = await request.fetch();
      await request.fulfill({
        response,
        headers: { ...response.headers(), ...headers },
      });
    });
    await page.addInitScript(() => {
      window.celebrationAnimationCount = 0;
      document.addEventListener("animationstart", (event) => {
        if (event.animationName === "celebration-arrive")
          window.celebrationAnimationCount++;
      });
    });
    const celebrate = page.getByRole("heading", {
      name: "Your First Spell Was Successful!",
      exact: true,
    });
    async function count(n) {
      await page
        .getByRole("heading", {
          name: `${n} of 3 activities complete`,
          exact: true,
        })
        .waitFor();
    }
    async function practice(source) {
      await page.getByLabel("Your Python code", { exact: true }).fill(source);
      await page.getByRole("button", { name: "Check practice text" }).click();
    }
    async function answer(index, value, keyboard = false) {
      const form = page.locator(".knowledge-check").nth(index);
      const radio = form.locator(`input[value="${value}"]`);
      if (keyboard) {
        await radio.focus();
        await page.keyboard.press("Space");
        await form
          .getByRole("button", { name: "Check answer", exact: true })
          .focus();
        await page.keyboard.press("Enter");
      } else {
        await radio.check();
        await form
          .getByRole("button", { name: "Check answer", exact: true })
          .click();
      }
    }
    await page.goto(base + route);
    await count(0);
    assert.equal(await celebrate.count(), 0);
    await answer(0, "say");
    assert.match(
      await page
        .locator(".knowledge-check")
        .first()
        .locator('[role="status"]')
        .textContent(),
      /Start your spell with print/,
    );
    await count(0);
    const missingQuotes =
      "Almost! Put matching quotation marks around your message. One at the beginning and one at the end!";
    await practice("print(Hello, Code Coven!)");
    await page
      .locator('.lesson-practice [role="status"]')
      .getByText(missingQuotes, { exact: true })
      .waitFor();
    const missingParentheses =
      "Your spell needs its round brackets! Add ( and ) around your message.";
    for (const source of [
      'print "Hello, Code Coven!"',
      'print("Hello, Code Coven!"',
    ]) {
      await practice(source);
      assert.equal(
        await page.locator('.lesson-practice [role="status"]').textContent(),
        missingParentheses,
      );
    }
    await practice("print(\"Hello, Code Coven!')");
    assert.match(
      await page.locator('.lesson-practice [role="status"]').textContent(),
      /same kind of quotation mark/,
    );
    await practice('print("not the message")');
    assert.match(
      await page.locator('.lesson-practice [role="status"]').textContent(),
      /Check the words inside your quotation marks/,
    );
    await practice('print("Hello, Code Coven!"); open("file")');
    assert.match(
      await page.locator('.lesson-practice [role="status"]').textContent(),
      /one short print spell/,
    );
    for (let attempt = 0; attempt < 8; attempt++)
      await practice("print(no quotes)");
    await count(0);
    assert.equal(await celebrate.count(), 0);
    await practice('print("Hello, Code Coven!")');
    await page
      .getByText("Your spell matches! Beautiful work, little spellcaster!", {
        exact: true,
      })
      .waitFor();
    await count(1);
    assert.equal(await celebrate.count(), 0);
    await answer(0, "print", true);
    await count(2);
    assert.equal(await celebrate.count(), 0);
    await answer(1, "hello");
    await count(3);
    await celebrate.waitFor();
    await page
      .getByText(
        "YOU DID IT! You just completed your first Python coding lesson! I'm so proud of you, little spellcaster!",
        { exact: true },
      )
      .waitFor();
    await page.getByText("First Spell Cast!", { exact: true }).waitFor();
    assert.equal(
      await page
        .locator(".completion-celebration")
        .getAttribute("aria-labelledby"),
      await celebrate.getAttribute("id"),
    );
    await page.waitForFunction(() => window.celebrationAnimationCount === 1);
    await page.locator(".completion-celebration").evaluate(async (el) => {
      await Promise.all(
        el.getAnimations().map((animation) => animation.finished),
      );
    });
    const announcement = page.locator('[role="status"][aria-live="polite"]');
    assert.equal(await announcement.getAttribute("aria-atomic"), "true");
    assert.match(
      await announcement.textContent(),
      /Your First Spell Was Successful! First Spell Cast!/,
    );
    assert.equal(
      await page
        .locator(".completion-celebration")
        .getByText(/interpreter|guided practice|does not run Python/)
        .count(),
      0,
    );
    await page
      .getByText(
        "This is guided practice. It checks your written spell. It does not run Python.",
        { exact: true },
      )
      .waitFor();
    const noticeIds = (
      await page
        .getByLabel("Your Python code", { exact: true })
        .getAttribute("aria-describedby")
    ).split(" ");
    assert.equal(noticeIds.length, 2);
    for (const id of noticeIds)
      assert.equal(await page.locator(`[id="${id}"]`).count(), 1);
    assert.equal(await page.locator('audio,[role="dialog"]').count(), 0);
    assert.equal(await page.locator('a[href*="lesson-002"]').count(), 0);
    await practice('print("Hello, Code Coven!")');
    await count(3);
    assert.equal(
      await page.evaluate(() => window.celebrationAnimationCount),
      1,
    );
    fs.mkdirSync("artifacts", { recursive: true });
    await page
      .locator(".completion-celebration")
      .screenshot({ path: "artifacts/little-completion-daylight.png" });
    await page
      .getByRole("link", { name: "Review This Lesson", exact: true })
      .focus();
    await page.keyboard.press("Enter");
    assert.equal(
      await page.evaluate(() => document.activeElement.id),
      "lesson-start",
    );
    await count(3);
    await page.reload();
    await celebrate.waitFor();
    assert.equal(
      await page
        .locator(".completion-celebration")
        .evaluate((el) => getComputedStyle(el).animationName),
      "none",
    );
    assert.equal(
      await page.evaluate(() => window.celebrationAnimationCount),
      0,
    );
    await page
      .getByRole("link", { name: "Return to Learning Path", exact: true })
      .click();
    await page
      .getByRole("heading", { name: "Code Coven for Kids", exact: true })
      .waitFor();
    await page.goto(base + route);
    await celebrate.waitFor();
    assert.equal(await page.locator(".celebration-enter").count(), 0);
    await page
      .getByRole("button", { name: "Reset this lesson’s progress" })
      .click();
    await count(0);
    assert.equal(await celebrate.count(), 0);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await answer(0, "print", true);
    await answer(1, "hello");
    await practice("print('Hello, Code Coven!')");
    await celebrate.waitFor();
    assert.equal(
      await page
        .locator(".completion-celebration")
        .evaluate((el) => getComputedStyle(el).animationName),
      "none",
    );
    for (const theme of ["daylight", "midnight"]) {
      if (theme === "midnight")
        await page
          .getByRole("button", { name: "Switch to Midnight Coven" })
          .click();
      for (const width of [375, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          true,
          `${theme} at ${width}`,
        );
        await page
          .getByRole("link", { name: "Return to Learning Path", exact: true })
          .scrollIntoViewIfNeeded();
      }
    }
    await page.setViewportSize({ width: 375, height: 900 });
    await page
      .locator(".completion-celebration")
      .screenshot({ path: "artifacts/little-completion-mobile-midnight.png" });
    // The richer older-learner feedback and generic completion must be unchanged.
    const spec = JSON.parse(
      fs.readFileSync("src/data/lessons/python-output.v1.json", "utf8"),
    );
    for (const path of [
      "/learn/kids/python/first-spell?band=junior",
      "/learn/adults/python/first-program",
    ]) {
      await page.goto(base + path);
      await page.getByLabel("Your Python code", { exact: true }).waitFor();
      await practice("print(no quotes)");
      assert.equal(
        await page.locator('.lesson-practice [role="status"]').textContent(),
        spec.errorFeedback["unsupported-syntax"],
      );
      assert.equal(await page.locator(".completion-celebration").count(), 0);
    }
    assert.deepEqual(errors, []);
    console.log(
      "PASS: Little hints, invalid/valid inputs, unlimited retries, unchanged pass criteria, three-activity completion, fresh-only animation, revisit/reset, review/path links, keyboard/live-region semantics, reduced motion, both themes/4 widths, and older feedback/CSP regressions.",
    );
  } finally {
    await context.unrouteAll({ behavior: "ignoreErrors" });
    await context.close();
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
