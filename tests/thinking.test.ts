import { test } from "node:test";
import assert from "node:assert/strict";
import * as v from "valibot";
import { thinkingSpec } from "../src/data/lessons/programming-thinking.ts";
import {
  checkSequence,
  assessThinking,
  thinkingAssessmentRecords,
} from "../src/learning/thinking.ts";
import { thinkingSpecSchema } from "../src/learning/thinking-schema.ts";
import { courses } from "../src/data/curriculum.ts";
import {
  progressKey,
  saveProgress,
  readProgress,
  removeProgress,
} from "../src/learning/progress.ts";
test("all four experiences have six goals, three valid checks, three practices and their own curriculum lesson", () => {
  assert.equal(thinkingSpec.learningObjectives.length, 6);
  assert.equal(thinkingSpec.variants.length, 4);
  assert.deepEqual(thinkingSpec.prerequisites, []);
  for (const variant of thinkingSpec.variants) {
    assert.equal(variant.questions.length, 3);
    assert.equal(variant.taskIds.length, 3);
    assert.equal(
      new Set([...variant.questions.map((q) => q.id), ...variant.taskIds]).size,
      6,
    );
    for (const q of variant.questions)
      assert.equal(q.choices.filter((c) => c.correct).length, 1);
    for (const id of variant.taskIds)
      assert.ok(thinkingSpec.practiceTasks.some((t) => t.id === id));
  }
  const course = courses.find((c) => c.id === "programming-foundations")!;
  assert.equal(course.modules[0].lessons[0].id, thinkingSpec.lessonId);
  assert.equal(
    course.modules[0].lessons[0].challenges.every((c) => c.rewardXP === 0),
    true,
  );
  assert.equal(
    courses.filter((c) => c.modules.length > 0).length,
    7,
    "Only Python, Programming Fundamentals, Web Enchantment, Cybersecurity Charms, Algorithm Alchemy, AI Fundamentals and Software Sorcery are implemented",
  );
  assert.deepEqual(
    courses
      .find((c) => c.id === "python-potions")!
      .modules.map((m) => m.lessons[0].id),
    ["python-output-001", "python-variables-002"],
  );
});
function permutations(xs: string[]): string[][] {
  return xs.length
    ? xs.flatMap((x, i) =>
        permutations(xs.filter((_, n) => n !== i)).map((rest) => [x, ...rest]),
      )
    : [[]];
}
test("every finite permutation matches only the declared dependency order; every debugging starter fails", () => {
  for (const task of thinkingSpec.practiceTasks) {
    for (const order of permutations(task.expectedOrder))
      assert.equal(
        checkSequence(task, order).passed,
        order.every((x, i) => x === task.expectedOrder[i]),
        task.id + order,
      );
    if (task.initialOrder.length)
      assert.equal(checkSequence(task, task.initialOrder).passed, false);
  }
});
test("all 24 versioned sample cases and downloaded records agree with the evaluator", () => {
  assert.equal(thinkingAssessmentRecords.length, 24);
  for (const [i, c] of thinkingSpec.assessment.testCases.entries()) {
    const task = thinkingSpec.practiceTasks.find((t) => t.id === c.taskId)!;
    const result = checkSequence(task, c.order);
    assert.equal(result.passed, c.expectedPassed, c.id);
    assert.equal(result.feedbackCode, c.expectedFeedbackCode, c.id);
    const record = thinkingAssessmentRecords[i];
    assert.equal(record.valid, true);
    if (record.valid) {
      assert.equal(record.passed, c.expectedPassed);
      assert.equal(record.executed, false);
      assert.equal(record.checkerVersion, "finite-sequence-comparison-v1");
    }
  }
});
test("empty, missing, duplicate, unknown and hostile inputs fail without action; retries remain unlimited", () => {
  const task = thinkingSpec.practiceTasks[0];
  assert.equal(checkSequence(task, ["", "", ""]).feedbackCode, "incomplete");
  assert.equal(
    checkSequence(task, task.expectedOrder.slice(1)).feedbackCode,
    "incomplete",
  );
  assert.equal(
    checkSequence(
      task,
      task.expectedOrder.map(() => task.expectedOrder[0]),
    ).feedbackCode,
    "duplicate",
  );
  for (const input of [
    null,
    {},
    "exec('x')",
    ["<script>alert(1)</script>"],
    ["x".repeat(81)],
    Array(9).fill(""),
    [1],
    Array(3).fill("__proto__"),
  ]) {
    const r = checkSequence(task, input);
    assert.equal(r.passed, false);
    assert.equal(r.executed, false);
  }
  for (let i = 0; i < 50; i++) {
    assert.equal(checkSequence(task, []).passed, false);
    assert.equal(checkSequence(task, task.expectedOrder).passed, true);
  }
});
test("strict lesson/request validation rejects drift, ambiguous references, permissions and unknown versions", () => {
  for (const spec of [
    { ...thinkingSpec, extra: true },
    { ...thinkingSpec, contentVersion: "2" },
    {
      ...thinkingSpec,
      safety: { ...thinkingSpec.safety, execution: "python" },
    },
    {
      ...thinkingSpec,
      safety: { ...thinkingSpec.safety, permissions: ["network"] },
    },
    {
      ...thinkingSpec,
      variants: [
        thinkingSpec.variants[0],
        thinkingSpec.variants[0],
        thinkingSpec.variants[0],
        thinkingSpec.variants[0],
      ],
    },
    {
      ...thinkingSpec,
      practiceTasks: [
        { ...thinkingSpec.practiceTasks[0], expectedOrder: ["missing"] },
      ],
    },
  ])
    assert.equal(v.safeParse(thinkingSpecSchema, spec).success, false);
  const task = thinkingSpec.practiceTasks[0];
  const input = {
    specificationVersion: "1.0.0",
    contentVersion: "1.0.0",
    lessonId: thinkingSpec.lessonId,
    taskId: task.id,
    order: task.expectedOrder,
  };
  for (const bad of [
    { ...input, taskId: "unknown" },
    { ...input, lessonId: "python-variables-002" },
    { ...input, permissions: ["shell"] },
    { ...input, contentVersion: "99" },
    { ...input, order: Array(9).fill("bad") },
  ])
    assert.equal(assessThinking(bad).valid, false);
  assert.equal(assessThinking(input).valid, true);
});
test("new local completion/reset is isolated across all four variants and both Python lessons", () => {
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
    thinkingSpec.lessonId,
    "python-output-001",
    "python-variables-002",
  ])
    for (const variant of ["kids-little", "kids-junior", "adults", "ai"])
      saveProgress(store, lesson, variant, {
        version: 1,
        lessonVersion: "1.0.0",
        completed: ["meaning"],
      });
  removeProgress(store, thinkingSpec.lessonId, "kids-junior");
  assert.equal(entries.size, 11);
  assert.ok(entries.has(progressKey("python-output-001", "kids-junior")));
  assert.deepEqual(
    readProgress(store, thinkingSpec.lessonId, "kids-little", "1.0.0", [
      "meaning",
    ]).completed,
    ["meaning"],
  );
  assert.deepEqual(
    readProgress(store, thinkingSpec.lessonId, "kids-little", "2.0.0", [
      "meaning",
    ]).completed,
    [],
  );
});
