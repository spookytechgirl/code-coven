import { test } from "node:test";
import assert from "node:assert/strict";
import * as v from "valibot";
import { shieldSpec } from "../src/data/lessons/cyber-shield.ts";
import {
  checkShield,
  assessShield,
  shieldAssessmentRecords,
} from "../src/learning/shield.ts";
import { shieldSpecSchema } from "../src/learning/shield-schema.ts";
import { courses } from "../src/data/curriculum.ts";
import {
  saveProgress,
  readProgress,
  removeProgress,
  progressKey,
} from "../src/learning/progress.ts";
const task = shieldSpec.practiceTasks[0];
const request = {
  specificationVersion: "1.0.0",
  contentVersion: "1.0.0",
  lessonId: shieldSpec.lessonId,
  taskId: task.id,
  classification: task.expectedClassification,
  actionId: task.expectedActionId,
};
test("six goals and all four six-activity experiences register only the new cybersecurity introduction", () => {
  assert.equal(shieldSpec.learningObjectives.length, 6);
  assert.equal(shieldSpec.variants.length, 4);
  assert.deepEqual(shieldSpec.prerequisites, []);
  for (const v of shieldSpec.variants) {
    assert.equal(v.sections.length, 6);
    assert.equal(v.questions.length, 3);
    assert.equal(v.taskIds.length, 3);
    assert.equal(
      new Set([...v.questions.map((q) => q.id), ...v.taskIds]).size,
      6,
    );
    for (const q of v.questions)
      assert.equal(q.choices.filter((c) => c.correct).length, 1);
    const tasks = v.taskIds.map((id) =>
      shieldSpec.practiceTasks.find((t) => t.id === id)!,
    );
    assert.ok(
      tasks.some((t) => t.expectedClassification === "no-warning-shown"),
    );
    assert.ok(tasks.some((t) => t.expectedClassification === "suspicious"));
  }
  assert.equal(courses.filter((c) => c.modules.length > 0).length, 7);
  assert.equal(
    courses.find((c) => c.id === "cybersecurity-charms")!.modules[0].lessons[0]
      .id,
    shieldSpec.lessonId,
  );
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
  assert.equal(
    courses.find((c) => c.id === "web-enchantment")!.modules[0].lessons[0].id,
    "web-html-anatomy-001",
  );
  assert.equal(
    courses.find((c) => c.id === "software-sorcery")!.modules.length,
    1,
  );
});
test("all 36 deterministic examples reproduce declared outcomes and explain expected protective responses", () => {
  assert.equal(shieldAssessmentRecords.length, 36);
  for (const [i, c] of shieldSpec.assessment.testCases.entries()) {
    const t = shieldSpec.practiceTasks.find((t) => t.id === c.taskId)!;
    const r = checkShield(t, c.classification, c.actionId);
    assert.equal(r.passed, c.expectedPassed, c.id);
    assert.equal(r.feedbackCode, c.expectedFeedbackCode, c.id);
    const rec = shieldAssessmentRecords[i];
    assert.equal(rec.valid, true);
    assert.equal(rec.executed, false);
    assert.equal(rec.actionsPerformed, false);
    if (rec.valid) {
      assert.equal(rec.passed, c.expectedPassed);
      assert.ok(rec.expectedResponse.length);
      assert.ok(rec.explanation.length);
      assert.equal(rec.expectedActionId, t.expectedActionId);
    }
  }
  assert.deepEqual(assessShield(request), assessShield(request));
});
test("every classification/action combination passes only when both authored decisions match", () => {
  for (const t of shieldSpec.practiceTasks)
    for (const c of ["suspicious", "no-warning-shown"])
      for (const a of t.actions) {
        const r = checkShield(t, c, a.id);
        assert.equal(
          r.passed,
          c === t.expectedClassification && a.id === t.expectedActionId,
          t.id,
        );
        assert.equal(r.executed, false);
        assert.equal(r.actionsPerformed, false);
      }
});
test("missing and hostile choices fail safely and unlimited retries have no penalty", () => {
  assert.equal(checkShield(task, "", "").feedbackCode, "incomplete");
  for (const value of [
    null,
    {},
    [],
    1,
    "x".repeat(81),
    "<script>alert(1)</script>",
    "https://real-account.example/login",
    "__proto__",
  ]) {
    const r = checkShield(task, value, value);
    assert.equal(r.passed, false);
    assert.equal(r.actionsPerformed, false);
  }
  for (let i = 0; i < 50; i++) {
    assert.equal(checkShield(task, "", "").passed, false);
    assert.equal(
      checkShield(task, task.expectedClassification, task.expectedActionId)
        .passed,
      true,
    );
  }
});
test("request validation rejects real-secret fields, permissions, source payloads, unknown tasks and unknown actions", () => {
  assert.equal(assessShield(request).valid, true);
  for (const bad of [
    { ...request, password: "never-enter-a-secret" },
    { ...request, personalInformation: "not-collected" },
    { ...request, permissions: ["network"] },
    { ...request, source: "run anything" },
    { ...request, taskId: "unknown" },
    { ...request, actionId: "unknown" },
    { ...request, classification: "safe" },
    { ...request, contentVersion: "2" },
    { ...request, lessonId: "python-output-001" },
  ])
    assert.equal(assessShield(bad).valid, false);
});
test("strict content schemas reject live addresses, undeclared attachments, permissions and broken references", () => {
  for (const spec of [
    { ...shieldSpec, extra: true },
    {
      ...shieldSpec,
      safety: { ...shieldSpec.safety, permissions: ["account"] },
    },
    { ...shieldSpec, safety: { ...shieldSpec.safety, fictionalOnly: false } },
    {
      ...shieldSpec,
      practiceTasks: [
        { ...task, displayAddress: "https://accounts.example.com/login" },
      ],
    },
    {
      ...shieldSpec,
      practiceTasks: [
        { ...task, displayAddress: "academy.invalid.real.example/path" },
      ],
    },
    {
      ...shieldSpec,
      practiceTasks: [{ ...task, attachmentLabel: "file.zip" }],
    },
    { ...shieldSpec, practiceTasks: [task, task] },
    {
      ...shieldSpec,
      practiceTasks: [{ ...task, expectedActionId: "unknown" }],
    },
  ])
    assert.equal(v.safeParse(shieldSpecSchema, spec).success, false);
});
test("fictional examples never need passwords, clickable destinations or real attachments", () => {
  assert.equal(shieldSpec.safety.execution, "none");
  assert.deepEqual(shieldSpec.safety.permissions, []);
  for (const t of shieldSpec.practiceTasks) {
    assert.ok(
      !t.displayAddress ||
        /^[a-z0-9.-]+\.invalid(?:\/[a-z0-9/-]*)?$/.test(t.displayAddress),
    );
    assert.ok(!t.attachmentLabel || t.attachmentLabel.includes("fictional"));
    assert.equal(t.actions.length, 3);
    assert.ok(t.actions.some((a) => a.id === t.expectedActionId));
    assert.ok(t.hint.length > 0);
  }
});
test("completion/reset keys isolate all four variants from all existing lesson families", () => {
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
    shieldSpec.lessonId,
    "web-html-anatomy-001",
    "programming-thinking-001",
    "python-output-001",
    "python-variables-002",
  ])
    for (const variant of ["kids-little", "kids-junior", "adults", "ai"])
      saveProgress(store, lesson, variant, {
        version: 1,
        lessonVersion: "1.0.0",
        completed: ["meaning"],
      });
  assert.equal(entries.size, 20);
  removeProgress(store, shieldSpec.lessonId, "kids-junior");
  assert.equal(entries.size, 19);
  assert.ok(entries.has(progressKey("web-html-anatomy-001", "kids-junior")));
  assert.deepEqual(
    readProgress(store, shieldSpec.lessonId, "kids-little", "1.0.0", [
      "meaning",
    ]).completed,
    ["meaning"],
  );
});
