import * as v from "valibot";
const text = v.pipe(v.string(), v.minLength(1), v.maxLength(4000));
const id = v.pipe(v.string(), v.regex(/^[a-z][a-z0-9.-]*$/), v.maxLength(100));
const nonempty = <
  T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>,
>(
  schema: T,
) => v.pipe(v.array(schema), v.minLength(1), v.maxLength(30));
export const variableFeedbackCodeSchema = v.picklist([
  "empty",
  "unsupported-syntax",
  "output-mismatch",
  "too-long",
  "correct",
  "invalid-name",
  "assignment",
  "quotes",
  "undefined-name",
  "print-variable",
  "indentation",
  "task-shape",
]);
export const variablesLessonSchema = v.pipe(
  v.strictObject({
    lessonId: id,
    specificationVersion: v.literal("1.0.0"),
    contentVersion: v.literal("1.0.0"),
    courseId: id,
    departmentId: id,
    moduleId: id,
    conceptId: id,
    title: text,
    learningObjectives: nonempty(v.strictObject({ id, description: text })),
    prerequisites: v.array(id),
    conceptExplanations: nonempty(text),
    examples: nonempty(
      v.strictObject({ code: text, expectedOutput: text, explanation: text }),
    ),
    audienceAdaptations: nonempty(
      v.strictObject({
        id,
        audience: v.picklist(["kids", "adults", "ai"]),
        route: v.pipe(text, v.regex(/^\/learn\/[a-z/-]+$/)),
        title: text,
      }),
    ),
    practiceTasks: nonempty(
      v.strictObject({
        id,
        instruction: text,
        expectedOutput: text,
        kind: v.picklist(["text", "integer", "reassign", "inventory"]),
      }),
    ),
    assessment: v.strictObject({
      method: v.literal("restricted-variables-pattern-v1"),
      successCriteria: nonempty(text),
      evaluationCriteria: nonempty(text),
      testCases: nonempty(
        v.strictObject({
          id,
          taskId: id,
          source: text,
          expectedPassed: v.boolean(),
          expectedFeedbackCode: variableFeedbackCodeSchema,
        }),
      ),
    }),
    errorFeedback: v.strictObject({
      empty: text,
      "unsupported-syntax": text,
      "output-mismatch": text,
      "too-long": text,
      correct: text,
      "invalid-name": text,
      assignment: text,
      quotes: text,
      "undefined-name": text,
      "print-variable": text,
      indentation: text,
      "task-shape": text,
    }),
    capabilityIdentifiers: nonempty(id),
    safety: v.strictObject({
      execution: v.literal("none"),
      permissions: v.pipe(v.array(v.never()), v.maxLength(0)),
      performanceClaim: text,
    }),
  }),
  v.check((spec) => {
    const tasks = new Set(spec.practiceTasks.map((task) => task.id));
    return (
      tasks.size === spec.practiceTasks.length &&
      spec.assessment.testCases.every((test) => tasks.has(test.taskId)) &&
      new Set(spec.assessment.testCases.map((test) => test.id)).size ===
        spec.assessment.testCases.length &&
      new Set(spec.audienceAdaptations.map((a) => a.id)).size ===
        spec.audienceAdaptations.length &&
      new Set(spec.learningObjectives.map((o) => o.id)).size ===
        spec.learningObjectives.length
    );
  }, "Identifiers must be unique and test cases must reference known tasks."),
);
export type VariablesLessonSpec = v.InferOutput<typeof variablesLessonSchema>;
export function validateVariablesLesson(input: unknown) {
  return v.safeParse(variablesLessonSchema, input);
}
export function parseVariablesLesson(input: unknown): VariablesLessonSpec {
  return v.parse(variablesLessonSchema, input);
}

/** Illustrative future contract only. This is not an endpoint or permission grant. */
export const variableRequestSchema = v.strictObject({
  specificationVersion: v.literal("1.0.0"),
  lessonId: v.literal("python-variables-002"),
  contentVersion: v.literal("1.0.0"),
  taskId: v.picklist(["label", "number", "change", "inventory"]),
  source: v.pipe(v.string(), v.maxLength(500)),
});
export type VariableRequest = v.InferOutput<typeof variableRequestSchema>;
