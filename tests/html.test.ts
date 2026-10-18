import { test } from "node:test";
import assert from "node:assert/strict";
import * as v from "valibot";
import { htmlSpec } from "../src/data/lessons/web-html.ts";
import {
  checkHtml,
  assessHtml,
  htmlAssessmentRecords,
} from "../src/learning/html.ts";
import { htmlSpecSchema } from "../src/learning/html-schema.ts";
import { courses } from "../src/data/curriculum.ts";
import {
  saveProgress,
  readProgress,
  removeProgress,
  progressKey,
} from "../src/learning/progress.ts";
const task = (id: string) => htmlSpec.practiceTasks.find((t) => t.id === id)!;
test("six goals, four differentiated experiences and a new Web course module preserve existing curriculum", () => {
  assert.equal(htmlSpec.learningObjectives.length, 6);
  assert.equal(htmlSpec.variants.length, 4);
  for (const variant of htmlSpec.variants) {
    assert.equal(variant.questions.length, 3);
    assert.equal(variant.taskIds.length, 3);
    assert.equal(
      new Set([...variant.questions.map((q) => q.id), ...variant.taskIds]).size,
      6,
    );
    for (const q of variant.questions)
      assert.equal(q.choices.filter((c) => c.correct).length, 1);
    for (const id of variant.taskIds) assert.ok(task(id));
  }
  assert.equal(
    courses.find((c) => c.id === "web-enchantment")!.modules[0].lessons[0].id,
    htmlSpec.lessonId,
  );
  assert.equal(courses.filter((c) => c.modules.length > 0).length, 6);
  assert.deepEqual(
    courses
      .find((c) => c.id === "python-potions")!
      .modules.map((m) => m.lessons[0].id),
    ["python-output-001", "python-variables-002"],
  );
  assert.equal(
    courses.find((c) => c.id === "programming-foundations")!.modules[0]
      .lessons[0].id,
    "programming-thinking-001",
  );
});
test("all 36 declared deterministic cases and records agree with expected pass/fail and feedback", () => {
  assert.equal(htmlAssessmentRecords.length, 36);
  for (const [i, c] of htmlSpec.assessment.testCases.entries()) {
    const r = checkHtml(c.source, task(c.taskId));
    assert.equal(r.passed, c.expectedPassed, c.id);
    assert.equal(r.feedbackCode, c.expectedFeedbackCode, c.id);
    const record = htmlAssessmentRecords[i];
    assert.equal(record.valid, true);
    assert.equal(record.executed, false);
    assert.equal(record.renderedAsHtml, false);
    if (record.valid) {
      assert.equal(record.passed, c.expectedPassed);
      assert.equal(record.feedbackCode, c.expectedFeedbackCode);
    }
  }
});
test("tag case, harmless whitespace and safe document quote variants normalize to explicit text models", () => {
  assert.deepEqual(
    checkHtml("  <H1>  My   Spellbook </H1>\n", task("junior-heading")).model,
    { heading: "My Spellbook" },
  );
  const doc = task("adult-document")
    .example.replace('lang="en"', "lang = 'en'")
    .replace('charset="utf-8"', "charset = 'utf-8' /");
  assert.equal(checkHtml(doc, task("adult-document")).passed, true);
  const custom = doc
    .replace("My Spellbook", "A Community Notice")
    .replace("A Little Magic", "Garden Open Day")
    .replace("Welcome to my first page.", "Everyone is invited to learn.");
  assert.deepEqual(checkHtml(custom, task("adult-document")).model, {
    title: "A Community Notice",
    heading: "Garden Open Day",
    paragraph: "Everyone is invited to learn.",
  });
});
test("tag pairing, body/head order, content and document requirements cannot be bypassed", () => {
  for (const [id, source, code] of [
    ["junior-heading", "<p>My Spellbook</p>", "structure"],
    ["junior-heading", "<h1>Other words</h1>", "content"],
    ["junior-heading", "<h1>My Spellbook</p>", "matching-tags"],
    [
      "junior-page",
      "<p>A little magic starts here.</p><h1>My Spellbook</h1>",
      "structure",
    ],
    ["adult-document", "<h1>Hi</h1><p>Welcome</p>", "structure"],
    [
      "adult-document",
      task("adult-document").example.replace("<!doctype html>", ""),
      "structure",
    ],
    [
      "adult-document",
      task("adult-document").example.replace(
        "<title>My Spellbook</title>",
        "<title></title>",
      ),
      "content",
    ],
    [
      "adult-document",
      task("adult-document").example.replace(
        "<h1>A Little Magic</h1>",
        "<h1><p>A Little Magic</p></h1>",
      ),
      "structure",
    ],
    ["junior-heading", "<h1>My Spellbook", "matching-tags"],
    [
      "adult-document",
      task("adult-document").example.replace('<meta charset="utf-8">', ""),
      "structure",
    ],
  ] as const) {
    const r = checkHtml(source, task(id));
    assert.equal(r.passed, false, source);
    assert.equal(r.feedbackCode, code, source);
    assert.equal(r.model, undefined);
  }
});
test("hostile tags, attributes, URLs, entities and malformed text never become a preview model", () => {
  const sources = [
    "<script>localStorage.clear()</script>",
    '<img src="https://example.com/tracker" onerror="alert(1)">',
    "<svg onload=alert(1)>",
    '<iframe srcdoc="<script>alert(1)</script>"></iframe>',
    '<h1 onclick="alert(1)">My Spellbook</h1>',
    '<h1 style="background:url(https://example.com)">My Spellbook</h1>',
    '<a href="javascript:alert(1)">hello</a>',
    "<h1>&lt;script&gt;</h1>",
    "<h1>My Spellbook</h1><!-- hidden -->",
    '<object data="x"></object>',
    '<form action="https://example.com"></form>',
    '<html lang="en" onload="alert(1)">',
    "<h1>My Spellbook</h1>\u0000",
    "< h1>My Spellbook</h1>",
    '<meta http-equiv="refresh" content="0;url=https://example.com">',
  ];
  for (const source of sources) {
    const r = checkHtml(source, task("junior-heading"));
    assert.equal(r.passed, false, source);
    assert.equal(r.model, undefined);
    assert.equal(r.executed, false);
    assert.equal(r.renderedAsHtml, false);
  }
});
test("source/text/node bounds, empty input and unlimited retries remain deterministic", () => {
  assert.equal(checkHtml("", task("junior-heading")).feedbackCode, "empty");
  assert.equal(
    checkHtml("x".repeat(1601), task("junior-heading")).feedbackCode,
    "too-long",
  );
  assert.equal(
    checkHtml("<h1>" + "x".repeat(161) + "</h1>", task("junior-heading"))
      .feedbackCode,
    "too-long",
  );
  assert.equal(
    checkHtml("<h1>x</h1>".repeat(17), task("junior-heading")).feedbackCode,
    "too-long",
  );
  for (const source of [null, {}, [], 1])
    assert.equal(checkHtml(source, task("junior-heading")).passed, false);
  for (let i = 0; i < 50; i++) {
    assert.equal(checkHtml("<h1>x</p>", task("junior-heading")).passed, false);
    assert.equal(
      checkHtml(task("junior-heading").example, task("junior-heading")).passed,
      true,
    );
  }
});
test("strict schemas reject permissions, unknown tasks/versions/fields and inconsistent identifiers", () => {
  const input = {
    specificationVersion: "1.0.0",
    contentVersion: "1.0.0",
    lessonId: htmlSpec.lessonId,
    taskId: "ai-document",
    source: task("ai-document").example,
  };
  assert.equal(assessHtml(input).valid, true);
  for (const data of [
    { ...input, permissions: ["network"] },
    { ...input, taskId: "unknown" },
    { ...input, lessonId: "python-output-001" },
    { ...input, contentVersion: "2" },
    { ...input, source: "x".repeat(1601) },
  ])
    assert.equal(assessHtml(data).valid, false);
  for (const spec of [
    { ...htmlSpec, extra: true },
    { ...htmlSpec, safety: { ...htmlSpec.safety, execution: "html" } },
    { ...htmlSpec, safety: { ...htmlSpec.safety, permissions: ["script"] } },
    {
      ...htmlSpec,
      practiceTasks: [htmlSpec.practiceTasks[0], htmlSpec.practiceTasks[0]],
    },
  ])
    assert.equal(v.safeParse(htmlSpecSchema, spec).success, false);
});
test("completion/reset uses a distinct lesson and four variant keys, preserving older lesson records", () => {
  const entries = new Map<string, string>();
  const store = {
    getItem: (k: string) => entries.get(k) ?? null,
    setItem: (k: string, x: string) => {
      entries.set(k, x);
    },
    removeItem: (k: string) => {
      entries.delete(k);
    },
  };
  for (const lesson of [
    htmlSpec.lessonId,
    "programming-thinking-001",
    "python-output-001",
    "python-variables-002",
  ])
    for (const variant of ["kids-little", "kids-junior", "adults", "ai"])
      saveProgress(store, lesson, variant, {
        version: 1,
        lessonVersion: "1.0.0",
        completed: ["html"],
      });
  assert.equal(entries.size, 16);
  removeProgress(store, htmlSpec.lessonId, "kids-junior");
  assert.equal(entries.size, 15);
  assert.ok(
    entries.has(progressKey("programming-thinking-001", "kids-junior")),
  );
  assert.deepEqual(
    readProgress(store, htmlSpec.lessonId, "kids-little", "1.0.0", ["html"])
      .completed,
    ["html"],
  );
});
