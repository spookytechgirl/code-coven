// Optional local smoke check: PLAYWRIGHT_MODULE can point to an installed Playwright module.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const baseURL = process.env.BASE_URL || "http://127.0.0.1:5173";
require("node:fs").mkdirSync("artifacts", { recursive: true });
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {}),
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  page.setDefaultTimeout(10000);
  // Vite preview does not apply Pages' _headers. Reproduce the single /* rule
  // locally so the browser also exercises the production CSP, without deploying.
  if (process.env.CHECK_PAGES_HEADERS === "1") {
    const lines = require("node:fs")
      .readFileSync("dist/_headers", "utf8")
      .split("\n");
    const headers = Object.fromEntries(
      lines
        .filter((line) => /^  [A-Za-z-]+:/.test(line))
        .map((line) => {
          const separator = line.indexOf(":");
          return [
            line.slice(0, separator).trim().toLowerCase(),
            line.slice(separator + 1).trim(),
          ];
        }),
    );
    await page.route("**/*", async (route) => {
      const response = await route.fetch();
      await route.fulfill({
        response,
        headers: { ...response.headers(), ...headers },
      });
    });
  }
  const errors = [];
  const assetErrors = [];
  page.on("response", (response) => {
    if (response.status() >= 400)
      assetErrors.push(`${response.status()} ${response.url()}`);
  });
  page.on("requestfailed", (request) => assetErrors.push(request.url()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto(`${baseURL}/`);
  await page.getByRole("heading", { name: /Code Coven/ }).waitFor();
  await page.getByRole("button", { name: "Switch to Midnight Coven" }).click();
  assert.equal(
    await page.locator("html").getAttribute("data-theme"),
    "midnight",
  );
  await page.reload();
  assert.equal(
    await page.locator("html").getAttribute("data-theme"),
    "midnight",
  );
  await page.getByRole("button", { name: "Switch to Daylight Coven" }).click();
  await page.waitForFunction(
    () =>
      getComputedStyle(document.body).backgroundColor === "rgb(255, 248, 241)",
  );
  await page.screenshot({
    path: "artifacts/homepage-desktop.png",
    fullPage: true,
  });
  assert.equal(
    await page.title(),
    "Code Coven | A Little Magic. A Lot of Code.",
  );
  assert.equal(
    await page.locator('meta[property="og:type"]').getAttribute("content"),
    "website",
  );
  const favicon = await page.request.get(`${baseURL}/favicon.svg`);
  assert.equal(favicon.status(), 200);
  assert.match(favicon.headers()["content-type"], /image\/svg/);
  console.log("Homepage, metadata, favicon, and theme persistence passed");
  await page.goto(`${baseURL}/courses`);
  await page.getByRole("searchbox").fill("Python");
  assert.equal(await page.locator(".course-card").count(), 1);
  await page.getByRole("searchbox").fill("");
  await page.getByRole("combobox").selectOption("tower");
  assert.equal(await page.locator(".course-card").count(), 1);
  await page.getByRole("link", { name: "Explore Course", exact: true }).click();
  await page
    .getByRole("heading", { name: "Cybersecurity Charms", exact: true })
    .waitFor();
  console.log("Search and department filter passed");
  for (const id of [
    "cottage",
    "potions",
    "workshop",
    "library",
    "observatory",
    "tower",
    "sanctum",
  ]) {
    await page.goto(`${baseURL}/academy/${id}`);
    assert.equal(await page.locator(".course-card").count(), 1);
  }
  await page.goto(`${baseURL}/dashboard`);
  await page.getByRole("heading", { name: /Good .*Apprentice/ }).waitFor();
  const tip = await page.locator(".tip").textContent();
  await page.getByRole("button", { name: "Another little wisdom" }).click();
  assert.notEqual(await page.locator(".tip").textContent(), tip);
  assert.equal(await page.locator(".course-card").count(), 3);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "artifacts/dashboard-desktop.png",
    fullPage: true,
  });
  console.log("Dashboard and departments passed");
  for (const theme of ["daylight", "midnight"]) {
    if (theme === "midnight")
      await page
        .getByRole("button", { name: "Switch to Midnight Coven" })
        .click();
    for (const width of [375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of [
        "/",
        "/dashboard",
        "/courses",
        "/academy",
        "/courses/python-potions",
      ]) {
        await page.goto(`${baseURL}${route}`);
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
          true,
          `${route} overflow at ${width} ${theme}`,
        );
      }
    }
  }
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(`${baseURL}/dashboard`);
  const menu = page.getByRole("button", {
    name: "Toggle dashboard navigation",
  });
  await menu.click();
  assert.equal(await menu.getAttribute("aria-expanded"), "true");
  await page.getByRole("link", { name: "My Quests", exact: true }).click();
  await page.getByRole("heading", { name: "My Quests", exact: true }).waitFor();
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  await page.goto(`${baseURL}/`);
  await page.getByRole("button", { name: "Toggle navigation" }).click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "The Academy", exact: true })
    .click();
  await page
    .getByRole("heading", { name: "The Academy", exact: true })
    .waitFor();
  await page.goto(`${baseURL}/dashboard`);
  await page.screenshot({
    path: "artifacts/dashboard-mobile-midnight.png",
    fullPage: true,
  });
  await page.goto(`${baseURL}/courses/not-a-course`);
  await page
    .getByRole("heading", { name: "This spell hasn’t been written." })
    .waitFor();
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.evaluate(
      () =>
        getComputedStyle(document.querySelector(".button")).transitionDuration,
    ),
    "0s",
  );
  await page.goto(`${baseURL}/`);
  await page.evaluate(() => {
    document.body.tabIndex = -1;
    document.body.focus();
    document.body.removeAttribute("tabindex");
  });
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent),
    "Skip to main content",
  );
  await page.keyboard.press("Enter");
  assert.equal(
    await page.evaluate(() => document.activeElement?.id),
    "main-content",
  );
  const extraRoutes = [
    "/",
    "/dashboard",
    "/courses",
    "/academy",
    "/about",
    "/community",
    "/login",
    "/privacy",
    "/accessibility",
    "/dashboard/spellbook",
    "/dashboard/potion-lab",
    "/dashboard/quests",
    "/dashboard/grimoire",
    "/dashboard/achievements",
    "/dashboard/hexi",
    "/dashboard/settings",
    "/courses/programming-foundations",
    "/courses/web-enchantment",
    "/courses/algorithm-alchemy",
    "/courses/ai-fundamentals",
    "/courses/software-sorcery",
  ];
  for (const route of extraRoutes) {
    await page.goto(`${baseURL}${route}`);
    await page.locator("h1").waitFor();
    assert.equal(await page.locator("h1").count(), 1, route);
    await page.reload();
    await page.locator("h1").waitFor();
    assert.equal(await page.locator("h1").count(), 1, `${route} refresh`);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseURL}/`);
  await page.getByRole("button", { name: "Switch to Daylight Coven" }).click();
  await page.setViewportSize({ width: 375, height: 900 });
  await page.screenshot({
    path: "artifacts/homepage-mobile-daylight.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "Switch to Midnight Coven" }).click();
  await page.screenshot({
    path: "artifacts/homepage-desktop-midnight.png",
    fullPage: true,
  });
  assert.equal(await page.locator(".destination-picture").count(), 7);
  assert.equal(
    await page.evaluate(() =>
      Array.from(document.images).every(
        (img) => img.complete && img.naturalWidth > 0,
      ),
    ),
    true,
  );
  assert.deepEqual(assetErrors, []);
  assert.deepEqual(errors, []);
  await browser.close();
  console.log(
    "PASS: routes, seven departments, search, filters, theme persistence, tips, mobile navigation, both-theme overflow checks, reduced motion, keyboard navigation, all existing pages, and no missing assets or browser errors.",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
