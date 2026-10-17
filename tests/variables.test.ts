import { test } from "node:test";
import assert from "node:assert/strict";
import {
  checkVariableAnswer,
  variableFeedback,
} from "../src/learning/variables.ts";
import {
  variablesSpec,
  variablesVariants,
  variablesLesson,
} from "../src/data/lessons/python-variables.ts";
import { validateVariablesLesson } from "../src/learning/variables-schema.ts";
import {
  evaluateVariableRequest,
  variableAssessmentRecords,
} from "../src/learning/variables-agent.ts";
import {
  readProgress,
  saveProgress,
  removeProgress,
  progressKey,
} from "../src/learning/progress.ts";
import { courses } from "../src/data/curriculum.ts";
const task = (id: string) =>
  variablesSpec.practiceTasks.find((t) => t.id === id)!;
test("variables specification covers all six objectives, adaptations, and curriculum registration", () => {
  assert.equal(variablesSpec.learningObjectives.length, 6);
  assert.equal(variablesSpec.audienceAdaptations.length, 4);
  assert.equal(
    new Set(variablesSpec.learningObjectives.map((o) => o.id)).size,
    6,
  );
  assert.deepEqual(variablesSpec.prerequisites, ["python-output-001"]);
  const modules = courses.find((c) => c.id === "python-potions")!.modules;
  assert.equal(modules[0].lessons[0].id, "python-output-001");
  assert.ok(
    modules.some(
      (m) =>
        m.id === variablesSpec.moduleId && m.lessons.includes(variablesLesson),
    ),
  );
  for (const variant of variablesVariants) {
    const ids = [
      ...variant.questions.map((q) => q.id),
      ...variant.practices.map((p) => p.taskId),
    ];
    assert.equal(new Set(ids).size, ids.length);
    for (const q of variant.questions)
      assert.equal(q.choices.filter((c) => c.correct).length, 1);
  }
});
test("all deterministic cases produce declared outcomes and downloadable record values", () => {
  for (const [i, c] of variablesSpec.assessment.testCases.entries()) {
    const result = checkVariableAnswer(c.source, task(c.taskId));
    assert.equal(result.passed, c.expectedPassed, c.id);
    assert.equal(result.feedbackCode, c.expectedFeedbackCode, c.id);
    assert.equal(variableAssessmentRecords[i].passed, c.expectedPassed);
    assert.equal(variableAssessmentRecords[i].executed, false);
    assert.equal(
      variablesSpec.errorFeedback[result.feedbackCode],
      variableFeedback(result.feedbackCode),
    );
  }
});
test("single quotes, CRLF, blank lines, uppercase and underscore names preserve Python-like literal output", () => {
  for (const source of [
    "PET_2 = 'Hexi'\r\nprint(PET_2)",
    '\nfamiliar="Hexi"\n\nprint ( familiar )\n',
    "_familiar = 'Hexi'\nprint(_familiar)",
  ]) {
    const r = checkVariableAnswer(source, task("label"));
    assert.equal(r.passed, true, source);
    assert.equal(r.inferredOutput, "Hexi\n");
  }
  assert.equal(
    checkVariableAnswer("potions = 3\nprint(potions)", task("number"))
      .inferredOutput,
    "3\n",
  );
  assert.equal(
    checkVariableAnswer("p = 2\nprint(p)\np = 5\nprint(p)", task("change"))
      .inferredOutput,
    "2\n5\n",
  );
});
test("correct output alone cannot bypass required value types, variable usage, or reassignment", () => {
  for (const [id, source] of [
    ["number", 'potions = "3"\nprint(potions)'],
    ["label", 'print("Hexi")'],
    ["change", "first = 2\nprint(first)\nsecond = 5\nprint(second)"],
    ["inventory", 'a = "Moon Tea"\nb = "4"\nprint(a)\nprint(b)'],
  ] as const)
    assert.equal(checkVariableAnswer(source, task(id)).passed, false, source);
});
test("the checker rejects unsafe and unsupported forms without executing source", () => {
  const sources = [
    "import os",
    '__import__("os")',
    'exec("anything")',
    'eval("1")',
    "while True:\n    pass",
    'open("secret")',
    'x = fetch("url")',
    "x = 1 + 2",
    "x = 1; print(x)",
    'x = "Hexi" # comment',
    'x = "a\\nb"',
    "x = 99999",
    "x = 01",
    "x = 3.0",
    "x = True",
    "print = 3",
    "for = 3",
    "x.y = 3",
    "x[0] = 3",
  ];
  for (const s of sources)
    assert.equal(checkVariableAnswer(s, task("number")).passed, false, s);
  assert.equal(
    checkVariableAnswer('name = "<script>alert(1)</script>"\nprint(name)', {
      ...task("label"),
      expectedOutput: "<script>alert(1)</script>\n",
    }).passed,
    true,
    "Text remains data, never markup execution",
  );
});
test("mistakes produce actionable hints and line numbers; retries have no state or penalty", () => {
  const cases = [
    ["x == 3", "assignment"],
    ["3x = 3", "invalid-name"],
    ["x = Hexi", "quotes"],
    ["print(x)", "undefined-name"],
    ['x = "Hexi"\nprint("x")', "print-variable"],
    [" x = 3", "indentation"],
  ] as const;
  for (const [source, feedback] of cases) {
    const r = checkVariableAnswer(source, task("label"));
    assert.equal(r.feedbackCode, feedback);
    assert.ok(r.line);
    assert.match(variableFeedback(feedback, true), /Hexi|Start/);
  }
  for (let i = 0; i < 30; i++) {
    assert.equal(checkVariableAnswer("print(x)", task("label")).passed, false);
    assert.equal(
      checkVariableAnswer('x = "Hexi"\nprint(x)', task("label")).passed,
      true,
    );
  }
  assert.equal(checkVariableAnswer("", task("label")).feedbackCode, "empty");
  assert.equal(
    checkVariableAnswer("x".repeat(501), task("label")).feedbackCode,
    "too-long",
  );
  assert.equal(
    checkVariableAnswer("\n".repeat(13), task("label")).feedbackCode,
    "empty",
  );
  assert.equal(
    checkVariableAnswer("x = 3\n".repeat(13), task("number")).feedbackCode,
    "too-long",
  );
});
test("versioned schemas reject permissions, malformed IDs, cross-lesson requests and unknown task/version", () => {
  for (const spec of [
    { ...variablesSpec, extra: true },
    { ...variablesSpec, contentVersion: "2.0.0" },
    {
      ...variablesSpec,
      safety: { ...variablesSpec.safety, execution: "python" },
    },
    {
      ...variablesSpec,
      safety: { ...variablesSpec.safety, permissions: ["network"] },
    },
    {
      ...variablesSpec,
      practiceTasks: [
        variablesSpec.practiceTasks[0],
        variablesSpec.practiceTasks[0],
      ],
    },
  ])
    assert.equal(validateVariablesLesson(spec).success, false);
  const valid = {
    specificationVersion: "1.0.0",
    contentVersion: "1.0.0",
    lessonId: "python-variables-002",
    taskId: "number",
    source: "x = 3\nprint(x)",
  };
  assert.equal(evaluateVariableRequest(valid).passed, true);
  for (const input of [
    { ...valid, taskId: "unknown" },
    { ...valid, lessonId: "python-output-001" },
    { ...valid, permissions: ["shell"] },
    { ...valid, contentVersion: "99" },
    { ...valid, source: "x".repeat(501) },
  ])
    assert.throws(() => evaluateVariableRequest(input));
});
test("progress is isolated across lessons and variants; reset and blocked storage stay safe", () => {
  const entries = new Map<string, string>();
  const store = {
    getItem: (k: string) => entries.get(k) ?? null,
    setItem: (k: string, v: string) => {
      entries.set(k, v);
    },
    removeItem: (k: string) => {
      entries.delete(k);
    },
  };
  for (const id of ["python-output-001", "python-variables-002"])
    for (const variant of ["kids-little", "kids-junior", "adults"])
      saveProgress(store, id, variant, {
        version: 1,
        lessonVersion: "1.0.0",
        completed: ["label"],
      });
  assert.equal(entries.size, 6);
  removeProgress(store, variablesSpec.lessonId, "kids-little");
  assert.equal(entries.size, 5);
  assert.ok(entries.has(progressKey("python-output-001", "kids-little")));
  assert.deepEqual(
    readProgress(store, variablesSpec.lessonId, "kids-little", "1.0.0", [
      "label",
    ]).completed,
    [],
  );
  const blocked = {
    getItem: () => {
      throw Error("blocked");
    },
    setItem: () => {
      throw Error("blocked");
    },
    removeItem: () => {
      throw Error("blocked");
    },
  };
  assert.deepEqual(
    readProgress(blocked, variablesSpec.lessonId, "adults", "1.0.0", ["label"])
      .completed,
    [],
  );
  assert.equal(
    saveProgress(blocked, variablesSpec.lessonId, "adults", {
      version: 1,
      lessonVersion: "1.0.0",
      completed: ["label"],
    }),
    false,
  );
});
