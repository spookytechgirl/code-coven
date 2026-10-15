import { test } from "node:test";
import assert from "node:assert/strict";
import {
  pythonSpec,
  pythonLesson,
  variants,
  lessonRoutes,
} from "../src/data/lessons/python-output.ts";
import { courses, departments } from "../src/data/curriculum.ts";
import { checkPrintAnswer } from "../src/learning/evaluate.ts";
import { validateAiLesson } from "../src/learning/schema.ts";
import {
  evaluateAgentRequest,
  exampleAgentRequest,
  exampleAgentResponse,
} from "../src/learning/agent.ts";
import {
  readProgress,
  saveProgress,
  removeProgress,
  progressKey,
} from "../src/learning/progress.ts";
import type { ProgressStore } from "../src/learning/progress.ts";
function memory() {
  const entries = new Map<string, string>();
  const store: ProgressStore = {
    getItem: (key) => entries.get(key) ?? null,
    setItem: (key, value) => {
      entries.set(key, value);
    },
    removeItem: (key) => {
      entries.delete(key);
    },
  };
  return { store, entries };
}

test("one canonical objective and populated hierarchy serve all adaptations", () => {
  assert.deepEqual(pythonLesson.learningObjectives, [
    {
      id: "python.print.text",
      description: "Use Python's print() function to display text.",
    },
  ]);
  const department = departments.find((d) => d.id === pythonSpec.departmentId)!;
  assert.ok(
    department.paths.some((p) => p.courseIds.includes(pythonLesson.courseId)),
  );
  const course = courses.find((c) => c.id === pythonLesson.courseId)!;
  assert.equal(course.modules[0].id, pythonSpec.moduleId);
  assert.equal(course.modules[0].lessons[0], pythonLesson);
  assert.equal(course.modules[0].lessons.length, 1);
  assert.equal(pythonLesson.challenges.length, 2);
  assert.ok(pythonLesson.challenges.every((c) => c.rewardXP === 0));
  assert.equal(pythonSpec.audienceAdaptations.length, 4);
  for (const a of pythonSpec.audienceAdaptations)
    assert.equal(a.route, lessonRoutes[a.audience]);
});
test("Kids adaptations have distinct activities while adults cover the complete pilot", () => {
  const little = variants.find((v) => v.id === "kids-little")!,
    junior = variants.find((v) => v.id === "kids-junior")!,
    adult = variants.find((v) => v.id === "adults")!;
  assert.match(little.intro, /Welcome, little spellcaster!/);
  assert.deepEqual(
    little.questions.map((q) => q.id),
    ["recognize", "predict"],
  );
  assert.deepEqual(
    junior.questions.map((q) => q.id),
    ["parts", "predict"],
  );
  assert.equal(little.taskId, "hello");
  assert.equal(junior.taskId, "welcome");
  assert.equal(adult.taskId, "welcome");
  assert.match(
    adult.sections.flatMap((s) => s.paragraphs).join(" "),
    /interpreter/,
  );
  assert.match(
    adult.sections.flatMap((s) => s.paragraphs).join(" "),
    /string literal/,
  );
  for (const variant of variants) {
    assert.ok(variant.sections.length >= 2);
    for (const q of variant.questions) {
      assert.equal(q.choices.filter((c) => c.correct).length, 1);
      assert.ok(q.choices.every((c) => c.feedback.length > 20));
    }
  }
});
test("restricted practice accepts both quote styles and benign whitespace, preserving exact output", () => {
  for (const source of [
    'print("Welcome to Code Coven!")',
    " print ( 'Welcome to Code Coven!' ) ",
  ]) {
    assert.equal(
      checkPrintAnswer(source, "Welcome to Code Coven!\n").passed,
      true,
    );
  }
  assert.equal(
    checkPrintAnswer(
      'print("welcome to Code Coven!")',
      "Welcome to Code Coven!\n",
    ).feedbackCode,
    "output-mismatch",
  );
  assert.equal(
    checkPrintAnswer('print("Hello, Code Coven!")', "Hello, Code Coven!")
      .passed,
    false,
  );
  assert.equal(checkPrintAnswer("   ", "x\n").feedbackCode, "empty");
  assert.equal(
    checkPrintAnswer("x".repeat(501), "x\n").feedbackCode,
    "too-long",
  );
});
test("submitted text is never executed and unsupported syntax is rejected", () => {
  const invalid = [
    'Print("hello")',
    "print(hello)",
    "print(\"hello')",
    'print("hello"); alert(1)',
    'print("hello")\nprint("world")',
    '__import__("os")',
    'print(f"hello")',
    'print("a\\n")',
    'print("hello", "world")',
    'print("hello") # comment',
  ];
  for (const code of invalid)
    assert.equal(
      checkPrintAnswer(code, "hello\n").feedbackCode,
      "unsupported-syntax",
      code,
    );
  assert.equal(
    checkPrintAnswer('print("<script>alert(1)</script>")', "hello\n")
      .feedbackCode,
    "output-mismatch",
  );
});
test("AI schema validates the versioned specification and rejects malformed or permission-bearing data", () => {
  assert.equal(validateAiLesson(pythonSpec).success, true);
  for (const replacement of [
    { specificationVersion: "9.0.0" },
    { learningObjectives: [] },
    { practiceTasks: [] },
    {
      safety: {
        execution: "shell",
        permissions: ["network"],
        performanceClaim: "unlimited",
      },
    },
    { extraPermission: "shell" },
  ])
    assert.equal(
      validateAiLesson({ ...pythonSpec, ...replacement }).success,
      false,
    );
  const duplicate = structuredClone(pythonSpec);
  duplicate.practiceTasks.push(duplicate.practiceTasks[0]);
  assert.equal(validateAiLesson(duplicate).success, false);
  const unknown = structuredClone(pythonSpec);
  unknown.assessment.testCases[0].taskId = "unknown";
  assert.equal(validateAiLesson(unknown).success, false);
});
test("every deterministic AI example matches its declared outcome and feedback", () => {
  for (const sample of pythonSpec.assessment.testCases) {
    const task = pythonSpec.practiceTasks.find((t) => t.id === sample.taskId)!;
    const actual = checkPrintAnswer(sample.source, task.expectedOutput);
    assert.equal(actual.passed, sample.expectedPassed, sample.id);
    assert.equal(actual.feedbackCode, sample.expectedFeedbackCode, sample.id);
  }
  assert.equal(exampleAgentResponse.executed, false);
  assert.equal(exampleAgentResponse.passed, true);
  assert.equal(exampleAgentResponse.scope, "sample-local-evaluation");
  assert.match(exampleAgentResponse.claim, /not humanlike understanding/);
  assert.deepEqual(
    evaluateAgentRequest(exampleAgentRequest),
    exampleAgentResponse,
  );
  assert.equal(
    evaluateAgentRequest({
      ...exampleAgentRequest,
      source: 'print("different")',
    }).passed,
    false,
  );
  for (const change of [
    { lessonId: "other" },
    { contentVersion: "2.0.0" },
    { permissions: ["shell"] },
    { source: "x".repeat(501) },
    { taskId: "other" },
  ])
    assert.throws(() =>
      evaluateAgentRequest({ ...exampleAgentRequest, ...change }),
    );
});
test("local completion persists by variant, stores no code, and reset affects only the chosen variant", () => {
  const { store, entries } = memory();
  const value = {
    version: 1 as const,
    lessonVersion: "1.0.0",
    completed: ["recognize", "practice"],
  };
  assert.ok(saveProgress(store, "python-output-001", "kids-little", value));
  assert.deepEqual(
    readProgress(store, "python-output-001", "kids-little", "1.0.0", [
      "recognize",
      "practice",
    ]),
    value,
  );
  assert.deepEqual(
    readProgress(store, "python-output-001", "adults", "1.0.0", [
      "recognize",
      "practice",
    ]).completed,
    [],
  );
  assert.deepEqual(
    readProgress(store, "python-output-001", "kids-junior", "1.0.0", [
      "recognize",
      "practice",
    ]).completed,
    [],
  );
  assert.deepEqual(
    Object.keys(
      JSON.parse(entries.get(progressKey("python-output-001", "kids-little"))!),
    ).sort(),
    ["completed", "lessonVersion", "version"],
  );
  assert.ok(saveProgress(store, "python-output-001", "adults", value));
  assert.deepEqual(
    readProgress(store, "future-lesson", "adults", "1.0.0", ["practice"])
      .completed,
    [],
  );
  assert.ok(removeProgress(store, "python-output-001", "kids-little"));
  assert.deepEqual(
    readProgress(store, "python-output-001", "kids-little", "1.0.0", [
      "recognize",
    ]).completed,
    [],
  );
  assert.deepEqual(
    readProgress(store, "python-output-001", "adults", "1.0.0", [
      "recognize",
      "practice",
    ]),
    value,
  );
});
test("corrupt, stale, tampered, unavailable, and full browser storage fail safely", () => {
  const { store } = memory();
  store.setItem(progressKey("python-output-001", "adults"), "{invalid");
  assert.deepEqual(
    readProgress(store, "python-output-001", "adults", "1.0.0", ["practice"])
      .completed,
    [],
  );
  store.setItem(
    progressKey("python-output-001", "adults"),
    JSON.stringify({
      version: 1,
      lessonVersion: "1.0.0",
      completed: ["practice", "unknown", "practice", 42],
    }),
  );
  assert.deepEqual(
    readProgress(store, "python-output-001", "adults", "1.0.0", ["practice"])
      .completed,
    ["practice"],
  );
  assert.deepEqual(
    readProgress(store, "python-output-001", "adults", "2.0.0", ["practice"])
      .completed,
    [],
  );
  const blocked: ProgressStore = {
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("quota");
    },
    removeItem() {
      throw Error("blocked");
    },
  };
  assert.deepEqual(
    readProgress(blocked, "python-output-001", "adults", "1.0.0", []).completed,
    [],
  );
  assert.equal(
    saveProgress(blocked, "python-output-001", "adults", {
      version: 1,
      lessonVersion: "1.0.0",
      completed: [],
    }),
    false,
  );
  assert.equal(removeProgress(blocked, "python-output-001", "adults"), false);
  assert.equal(
    saveProgress(undefined, "python-output-001", "adults", {
      version: 1,
      lessonVersion: "1.0.0",
      completed: [],
    }),
    false,
  );
});

test("Little feedback preserves checker outcomes while giving one age-appropriate hint", async () => {
  const { presentPracticeFeedback } =
    await import("../src/learning/feedback.ts");
  const little = variants.find((v) => v.id === "kids-little")!;
  const copy = little.teaching!.practiceFeedback;
  const expected = "Hello, Code Coven!\n";
  const cases: [string, string][] = [
    ["print(Hello, Code Coven!)", copy.hints.missingQuotes],
    ['print "Hello, Code Coven!"', copy.hints.missingParentheses],
    ['print"Hello, Code Coven!"', copy.hints.missingParentheses],
    ['print("Hello, Code Coven!"', copy.hints.missingParentheses],
    ["print(\"Hello, Code Coven!')", copy.hints.matchingQuotes],
    ['Print("Hello, Code Coven!")', copy.hints.functionName],
    ['print("Wrong message")', copy.messages["output-mismatch"]],
    ['print("Hello, Code Coven!")', copy.messages.correct],
    ["print('Hello, Code Coven!')", copy.messages.correct],
    ["", copy.messages.empty],
    ["x".repeat(501), copy.messages["too-long"]],
    [
      'print("Hello, Code Coven!"); open("file")',
      copy.messages["unsupported-syntax"],
    ],
    [
      'print("Hello, Code Coven!")\nprint("again")',
      copy.messages["unsupported-syntax"],
    ],
  ];
  for (const [source, message] of cases) {
    const result = checkPrintAnswer(source, expected);
    const snapshot = structuredClone(result);
    assert.equal(
      presentPracticeFeedback(source, result, copy),
      message,
      source,
    );
    assert.deepEqual(result, snapshot);
    assert.equal(result.passed, message === copy.messages.correct);
  }
  for (let retry = 0; retry < 20; retry++)
    assert.equal(checkPrintAnswer("print(no quotes)", expected).passed, false);
  assert.equal(
    checkPrintAnswer('print("Hello, Code Coven!")', expected).passed,
    true,
  );
});
test("Little question feedback is isolated from Junior/Adults and celebration copy is configurable", () => {
  const little = variants.find((v) => v.id === "kids-little")!,
    junior = variants.find((v) => v.id === "kids-junior")!,
    adult = variants.find((v) => v.id === "adults")!;
  assert.ok(little.teaching);
  assert.equal(junior.teaching, undefined);
  assert.equal(adult.teaching, undefined);
  assert.equal(
    little.teaching.completion.title,
    "Your First Spell Was Successful!",
  );
  assert.equal(little.teaching.completion.achievement, "First Spell Cast!");
  assert.equal(little.teaching.completion.returnTo, "/learn/kids");
  assert.match(little.teaching.checkerNotice, /does not run Python/);
  const original = adult.questions.find((q) => q.id === "recognize")!;
  const adapted = little.questions.find((q) => q.id === "recognize")!;
  assert.notEqual(adapted, original);
  assert.deepEqual(
    adapted.choices.map(({ id, text, correct }) => ({ id, text, correct })),
    original.choices.map(({ id, text, correct }) => ({ id, text, correct })),
  );
  assert.match(original.choices[1].feedback, /function named print/);
  assert.match(junior.questions[0].choices[0].feedback, /text argument/);
  assert.notEqual(adapted.choices[1].feedback, original.choices[1].feedback);
});
