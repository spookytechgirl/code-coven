import test from "node:test";
import assert from "node:assert/strict";
import {
  softwareSpec,
  softwareRoutes,
} from "../src/data/lessons/software-spellbook.ts";
import { parseSoftwareSpec } from "../src/learning/software-schema.ts";
import {
  assessSoftware,
  checkSoftware,
  softwareAssessmentRecords,
} from "../src/learning/software.ts";
import { courses } from "../src/data/curriculum.ts";
import {
  saveProgress,
  readProgress,
  removeProgress,
} from "../src/learning/progress.ts";
const request = (taskId: string, answers: string[]) => ({
  specificationVersion: "1.0.0",
  contentVersion: "1.0.0",
  lessonId: softwareSpec.lessonId,
  taskId,
  answers,
});
test("four variants, six objectives and six activities each extend the existing curriculum", () => {
  assert.equal(softwareSpec.variants.length, 4);
  assert.equal(softwareSpec.learningObjectives.length, 6);
  const ids: string[] = [];
  for (const v of softwareSpec.variants) {
    assert.equal(v.sections.length, 6);
    assert.equal(v.questions.length, 3);
    assert.equal(v.taskIds.length, 3);
    ids.push(...v.questions.map((q) => q.id), ...v.taskIds);
    assert.equal(
      new Set(
        v.taskIds.map(
          (id) => softwareSpec.practiceTasks.find((t) => t.id === id)!.kind,
        ),
      ).size,
      3,
    );
  }
  assert.equal(new Set(ids).size, 24);
  assert.equal(courses.filter((c) => c.modules.length > 0).length, 7);
  assert.equal(
    courses.find((c) => c.id === "software-sorcery")!.modules[0].lessons[0].id,
    softwareSpec.lessonId,
  );
  assert.equal(
    courses.find((c) => c.id === "python-potions")!.modules.length,
    2,
  );
  assert.ok(
    courses.find((c) => c.id === "cybersecurity-charms")!.modules.length,
  );
  assert.equal(
    courses.find((c) => c.id === "software-sorcery")!.modules.length,
    1,
  );
  assert.equal(
    courses.find((c) => c.id === "software-sorcery")!.modules.length,
    1,
  );
  assert.ok(softwareRoutes.ai.includes("software/first-spellbook"));
});
test("48 deterministic declared evaluations match and expose no execution privileges", () => {
  assert.equal(softwareAssessmentRecords.length, 48);
  softwareSpec.assessment.testCases.forEach((c, i) => {
    const r = softwareAssessmentRecords[i];
    assert.equal(r.valid, true);
    assert.ok("passed" in r);
    assert.equal(r.passed, c.expectedPassed, c.id);
    assert.equal(r.feedbackCode, c.expectedFeedbackCode, c.id);
    assert.equal(r.executed, false);
    assert.equal(r.actionsPerformed, false);
    assert.deepEqual(
      assessSoftware(request(c.taskId, c.answers)),
      assessSoftware(request(c.taskId, c.answers)),
    );
  });
  assert.equal(
    softwareAssessmentRecords.filter((r) => "passed" in r && r.passed).length,
    12,
  );
});
test("every supplied combination is checked: requirements, dependencies, debugging, tests and honest version/release evidence", () => {
  for (const t of softwareSpec.practiceTasks) {
    const visit = (answers: string[]) => {
      if (answers.length === t.slots.length) {
        const r = checkSoftware(t, answers);
        assert.equal(
          r.passed,
          answers.every((a, i) => a === t.slots[i].expectedId),
          t.id + answers,
        );
        return;
      }
      for (const o of t.slots[answers.length].options)
        visit([...answers, o.id]);
    };
    visit([]);
    const good = t.slots.map((s) => s.expectedId);
    for (let i = 0; i < 25; i++)
      assert.equal(checkSoftware(t, good).passed, true);
  }
  const little = softwareSpec.practiceTasks.filter((t) =>
    t.id.startsWith("little-"),
  );
  assert.deepEqual(
    little[0].slots.map((s) => s.expectedId),
    ["core", "keyboard", "ask"],
  );
  assert.deepEqual(
    little[1].slots.map((s) => s.expectedId),
    ["separate", "save-first", "cycle"],
  );
  assert.deepEqual(
    little[2].slots.map((s) => s.expectedId),
    ["match", "cases", "honest"],
  );
  assert.match(
    softwareSpec.safety.performanceClaim,
    /does not establish general software engineering competence/,
  );
});
test("empty, oversized, duplicate, unknown and hostile inputs cannot satisfy activities", () => {
  for (const t of softwareSpec.practiceTasks) {
    for (const bad of [
      null,
      {},
      [],
      new Array(100).fill("x"),
      t.slots.map(() => "x"),
      t.slots.map(() => "<script>alert(1)</script>"),
      t.slots.map(() => 1),
      t.slots.map(() => "x".repeat(81)),
    ])
      assert.equal(checkSoftware(t, bad).passed, false);
    assert.equal(
      checkSoftware(
        t,
        t.slots.map(() => " "),
      ).feedbackCode,
      "invalid",
    );
    assert.equal(
      checkSoftware(
        t,
        t.slots.map(() => ""),
      ).feedbackCode,
      "incomplete",
    );
  }
  const t = softwareSpec.practiceTasks[0];
  assert.equal(checkSoftware(t, ["core", "core", "core"]).passed, false);
});
test("versioned requests reject unknown fields, credentials, code, permissions and unknown tasks", () => {
  const t = softwareSpec.practiceTasks[0];
  const good = request(
    t.id,
    t.slots.map((s) => s.expectedId),
  );
  assert.equal(assessSoftware(good).valid, true);
  for (const bad of [
    null,
    [],
    { ...good, password: "private" },
    { ...good, source: "while true" },
    { ...good, permissions: ["os"] },
    { ...good, specificationVersion: "2.0.0" },
    { ...good, contentVersion: "0" },
    { ...good, lessonId: "other" },
    { ...good, taskId: "unknown" },
    { ...good, answers: new Array(50).fill("x") },
  ])
    assert.equal(assessSoftware(bad).valid, false);
});
test("strict lesson schema rejects broken references, duplicate IDs and invalid answer contracts", () => {
  const mutate = (fn: (s: any) => void) => {
    const s = structuredClone(softwareSpec);
    fn(s);
    assert.throws(() => parseSoftwareSpec(s));
  };
  mutate((s) => (s.secret = "x"));
  mutate((s) => (s.variants[0].taskIds[0] = "missing"));
  mutate((s) => (s.variants[1].id = s.variants[0].id));
  mutate((s) => (s.practiceTasks[0].slots[0].expectedId = "missing"));
  mutate(
    (s) =>
      (s.practiceTasks[0].slots[0].options[1].id =
        s.practiceTasks[0].slots[0].options[0].id),
  );
  mutate((s) => (s.variants[0].questions[0].choices[0].correct = true));
  mutate((s) => (s.assessment.testCases[0].taskId = "missing"));
});

test("completion is isolated by lesson, variant and content version", () => {
  const data = new Map<string, string>();
  const store = {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => {
      data.set(k, v);
    },
    removeItem: (k: string) => {
      data.delete(k);
    },
  };
  const id = softwareSpec.variants[0].taskIds[0];
  saveProgress(store, softwareSpec.lessonId, "kids-little", {
    version: 1,
    lessonVersion: "1.0.0",
    completed: [id],
  });
  assert.deepEqual(
    readProgress(store, softwareSpec.lessonId, "kids-little", "1.0.0", [id])
      .completed,
    [id],
  );
  for (const [lesson, variant, version] of [
    [softwareSpec.lessonId, "kids-junior", "1.0.0"],
    ["cyber-guardian-shield-001", "kids-little", "1.0.0"],
    [softwareSpec.lessonId, "kids-little", "2.0.0"],
  ])
    assert.deepEqual(
      readProgress(store, lesson, variant, version, [id]).completed,
      [],
    );
  removeProgress(store, softwareSpec.lessonId, "kids-little");
  assert.equal(data.size, 0);
});

test("small catalog metadata matches the canonical lesson without eagerly importing it", () => {
  const lesson = courses.find((c) => c.id === softwareSpec.courseId)!.modules[0]
    .lessons[0];
  assert.equal(lesson.title, softwareSpec.title);
  assert.deepEqual(
    lesson.challenges,
    softwareSpec.practiceTasks.map((t) => ({
      id: t.id,
      title: t.title,
      instructions: t.instruction,
      rewardXP: 0,
    })),
  );
});
