// Optional local Chrome regression, following the existing external Playwright setup.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const spec = JSON.parse(
  fs.readFileSync("src/data/lessons/web-html.v1.json", "utf8"),
);
const base = process.env.BASE_URL || "http://127.0.0.1:4194";
const route = (v) =>
  `/learn/${v.id.startsWith("kids") ? "kids" : v.id}/web/first-web-spell${v.id.startsWith("kids") ? `?band=${v.id.split("-")[1]}` : ""}`;
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
        name: "Your first web spell is shining!",
        exact: true,
      });
    async function download(name) {
      const pending = page.waitForEvent("download");
      await page.getByRole("button", { name, exact: true }).click();
      const file = await pending;
      return JSON.parse(fs.readFileSync(await file.path(), "utf8"));
    }
    async function fill(form, task, little) {
      if (little) {
        const selects = form.getByRole("combobox");
        for (let i = 0; i < (task.kind === "heading" ? 1 : 2); i++) {
          await selects.nth(i * 2).selectOption(i === 0 ? "h1" : "p");
          await selects.nth(i * 2 + 1).selectOption(i === 0 ? "h1" : "p");
          await form
            .getByRole("textbox")
            .nth(i)
            .fill(i === 0 ? task.expectedHeading : task.expectedParagraph);
        }
      } else await form.getByRole("textbox").fill(task.example);
    }
    for (const variant of spec.variants) {
      await page.goto(base + route(variant));
      await page.locator(".lesson-progress").waitFor();
      assert.equal(await progress(), "0 of 6 activities complete");
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
      const first = page.locator(".html-practice").first();
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
      if (variant.id !== "kids-little") {
        const editor = first.getByRole("textbox");
        await editor.fill(
          '<script>localStorage.clear();window.htmlAttackRan=true;fetch("https://example.com/attack")</script>',
        );
        await editor.press("Tab");
        assert.equal(
          await page.evaluate(() => document.activeElement.tagName),
          "SUMMARY",
        );
        await page.keyboard.press("Tab");
        assert.equal(
          await page.evaluate(() => document.activeElement.textContent.trim()),
          "Check my web spell",
        );
        await page.keyboard.press("Enter");
        assert.equal(await first.locator(".html-preview-paper").count(), 0);
        assert.equal(
          await page.evaluate(() => window.htmlAttackRan),
          undefined,
        );
        assert.match(
          await first.getByRole("status").innerText(),
          /outside this checker/,
        );
        for (const source of [
          '<img src="https://example.com/attack" onerror="window.htmlAttackRan=true">',
          '<svg onload="window.htmlAttackRan=true"></svg>',
          '<iframe srcdoc="<script>window.htmlAttackRan=true</script>"></iframe>',
        ]) {
          await editor.fill(source);
          await first
            .getByRole("button", { name: "Check my web spell", exact: true })
            .click();
          assert.equal(await first.locator(".html-preview-paper").count(), 0);
        }
      } else {
        await first.getByRole("combobox").first().focus();
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Tab");
        assert.equal(
          await first
            .getByRole("textbox")
            .first()
            .evaluate((e) => e === document.activeElement),
          true,
        );
      }
      for (let n = 0; n < 3; n++) {
        const form = page.locator(".knowledge-check").nth(n);
        await form.getByRole("radio").nth(1).check();
        await form
          .getByRole("button", { name: "Check answer", exact: true })
          .click();
      }
      for (let n = 0; n < 3; n++) {
        const task = spec.practiceTasks.find(
          (t) => t.id === variant.taskIds[n],
        );
        const form = page.locator(".html-practice").nth(n);
        const little = variant.id === "kids-little";
        await fill(form, task, little);
        if (little) await form.getByRole("combobox").nth(1).selectOption("p");
        else
          await form
            .getByRole("textbox")
            .fill(task.example.replace("</h1>", "</p>"));
        await form
          .getByRole("button", { name: "Check my web spell", exact: true })
          .click();
        assert.match(await form.getByRole("status").innerText(), /Match|match/);
        assert.equal(await form.locator(".html-preview-paper").count(), 0);
        await fill(form, task, little);
        await form
          .getByRole("button", { name: "Check my web spell", exact: true })
          .click();
        assert.equal(
          await form.locator(".html-preview-heading").innerText(),
          task.expectedHeading || "A Little Magic",
        );
        assert.equal(
          await form
            .locator(
              ".html-safe-preview script, .html-safe-preview iframe, .html-safe-preview img, .html-safe-preview style, .html-safe-preview svg, .html-safe-preview a",
            )
            .count(),
          0,
        );
        if (n < 2) assert.equal(await celebration().count(), 0);
      }
      await celebration().waitFor();
      assert.equal(await progress(), "6 of 6 activities complete");
      assert.equal(await page.locator(".celebration-enter").count(), 1);
      if (variant.id === "ai") {
        assert.deepEqual(await download("Download lesson JSON"), spec);
        const samples = await download("Download sample assessment records");
        assert.equal(samples.length, 36);
        assert.equal(samples.filter((x) => x.passed).length, 12);
        assert.ok(
          samples.every(
            (x) => x.executed === false && x.renderedAsHtml === false,
          ),
        );
        for (let n = 0; n < 22; n++)
          await first
            .getByRole("button", { name: "Check my web spell", exact: true })
            .click();
        const session = await download("Download this session’s assessments");
        assert.equal(session.records.length, 20);
        assert.ok(
          session.records.every(
            (x) => x.executed === false && x.renderedAsHtml === false,
          ),
        );
      }
      const saved = await page.evaluate(() =>
        Object.fromEntries(
          Object.entries(localStorage).filter(([k]) =>
            k.includes("web-html-anatomy-001"),
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
        "code-coven:lesson:programming-thinking-001:ai:v1",
        JSON.stringify({
          version: 1,
          lessonVersion: "1.0.0",
          completed: ["meaning"],
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
          "code-coven:lesson:programming-thinking-001:ai:v1",
        ),
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
    fs.mkdirSync("artifacts/mission-017b", { recursive: true });
    await page.locator(".html-practice").first().scrollIntoViewIfNeeded();
    await page.screenshot({
      path: "artifacts/mission-017b/little-mobile-practice.png",
      animations: "disabled",
    });
    await page.goto(base + "/courses/web-enchantment");
    await page
      .getByRole("link", { name: "Little Apprentices", exact: true })
      .click();
    await page
      .getByRole("heading", { name: spec.title, exact: true })
      .waitFor();
    for (const audience of ["kids", "adults", "ai"]) {
      await page.goto(base + "/learn/" + audience);
      await page.getByRole("link", { name: /Open Web Enchantment/ }).click();
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
      "No external resources, markup-triggered or executor requests",
    );
    assert.equal(await page.evaluate(() => window.htmlAttackRan), undefined);
    console.log(
      "PASS: all four HTML experiences, knowledge/practice feedback and retries, building blocks/editor keyboard controls, safe fixed previews, attack payload rejection/no execution or external requests, hints, gated celebration/restore/reset/isolation, minimal storage, AI lesson/sample/session downloads and record cap, both themes x three widths, 200% text, reduced motion, blocked storage, course/path links, intact images and no browser errors (local CSP simulation).",
    );
    await context.close();
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
