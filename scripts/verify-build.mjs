import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import path from "node:path";
const root = path.resolve("dist");
const html = await readFile(path.join(root, "index.html"), "utf8");
async function files(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    found.push(...(entry.isDirectory() ? await files(file) : [file]));
  }
  return found;
}
const output = await files(root);
test("build contains index, local favicon, and Pages headers", async () => {
  for (const name of ["index.html", "favicon.svg", "_headers"])
    assert.ok((await stat(path.join(root, name))).size > 0, name);
  assert.match(await readFile(path.join(root, "favicon.svg"), "utf8"), /<svg/);
});
test("default Pages SPA fallback remains enabled without catch-all redirects", () => {
  assert.ok(
    !output.includes(path.join(root, "404.html")),
    "No top-level 404: Pages must use index.html for client routes",
  );
  assert.ok(
    !output.includes(path.join(root, "_redirects")),
    "No asset-swallowing catch-all rewrite",
  );
  assert.ok(
    !output.some(
      (file) => file.includes("_worker.js") || file.includes("/functions/"),
    ),
  );
});
test("metadata is present with no invented production URL", () => {
  assert.match(
    html,
    /<title>Code Coven \| A Little Magic\. A Lot of Code\.<\/title>/,
  );
  assert.match(
    html,
    /Learn to code for free at Code Coven, a magical online coding academy for beginners and advanced developers alike\./,
  );
  for (const property of [
    "og:title",
    "og:description",
    "og:type",
    "og:site_name",
  ])
    assert.ok(html.includes(property), property);
  assert.ok(!html.includes('rel="canonical"'));
  assert.ok(!html.includes('property="og:url"'));
  assert.match(html, /name="viewport"/);
});
test("HTML entry scripts, styles, and favicon resolve to built local assets", async () => {
  const references = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(
    (m) => m[1],
  );
  assert.ok(references.some((ref) => ref.endsWith(".js")));
  assert.ok(references.some((ref) => ref.endsWith(".css")));
  for (const ref of references) {
    assert.ok(ref.startsWith("/"), `Nonlocal reference: ${ref}`);
    assert.ok(!ref.startsWith("/src/"), "No source entry in production");
    assert.ok((await stat(path.join(root, ref))).size > 0, ref);
  }
});
test("Pages headers constrain scripts, framing, and browser permissions", async () => {
  const headers = await readFile(path.join(root, "_headers"), "utf8");
  assert.ok(headers.startsWith("/*\n"));
  for (const value of [
    "script-src 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "X-Content-Type-Options: nosniff",
    "Permissions-Policy: camera=(), microphone=(), geolocation=()",
  ])
    assert.ok(headers.includes(value), value);
  assert.ok(!headers.includes("'unsafe-eval'"));
});
test("distribution excludes private configuration, local tooling, and source maps", async () => {
  for (const file of output) {
    const relative = path.relative(root, file);
    assert.ok(
      relative === "index.html" ||
        relative === "favicon.svg" ||
        relative === "_headers" ||
        relative.startsWith(`assets${path.sep}`),
      relative,
    );
    assert.ok(!/\.map$|\.env|\.pem$|\.key$/.test(relative), relative);
  }
});
let total = 0;
for (const file of output) {
  const data = await readFile(file);
  total += data.length;
  if (/\.(js|css|svg)$/.test(file))
    console.log(
      `${path.relative(root, file)}: ${(data.length / 1024).toFixed(1)} KiB, gzip ${(gzipSync(data).length / 1024).toFixed(1)} KiB`,
    );
}
console.log(
  `Static distribution: ${output.length} files, ${(total / 1024).toFixed(1)} KiB uncompressed.`,
);
