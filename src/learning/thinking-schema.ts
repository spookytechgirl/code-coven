import * as v from "valibot";
const text = v.pipe(v.string(), v.minLength(1), v.maxLength(2000));
const id = v.pipe(v.string(), v.regex(/^[a-z][a-z0-9-]*$/), v.maxLength(80));
const list = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  s: T,
) => v.pipe(v.array(s), v.minLength(1), v.maxLength(40));
const order = v.pipe(v.array(id), v.maxLength(8));
export const thinkingFeedbackSchema = v.picklist([
  "invalid",
  "incomplete",
  "duplicate",
  "order",
  "correct",
]);
export const thinkingSpecSchema = v.pipe(
  v.strictObject({
    specificationVersion: v.literal("1.0.0"),
    contentVersion: v.literal("1.0.0"),
    lessonId: v.literal("programming-thinking-001"),
    courseId: v.literal("programming-foundations"),
    departmentId: v.literal("cottage"),
    moduleId: v.literal("programming-thinking-basics"),
    title: text,
    learningObjectives: list(v.strictObject({ id, description: text })),
    prerequisites: v.array(id),
    variants: v.pipe(
      v.array(
        v.strictObject({
          id: v.picklist(["kids-little", "kids-junior", "adults", "ai"]),
          audienceLabel: text,
          intro: text,
          sections: list(
            v.strictObject({ title: text, paragraphs: list(text) }),
          ),
          questions: list(
            v.strictObject({
              id,
              prompt: text,
              choices: list(
                v.strictObject({
                  id,
                  text,
                  correct: v.boolean(),
                  feedback: text,
                }),
              ),
            }),
          ),
          taskIds: list(id),
        }),
      ),
      v.length(4),
    ),
    practiceTasks: list(
      v.strictObject({
        id,
        title: text,
        instruction: text,
        goal: text,
        steps: v.pipe(
          v.array(v.strictObject({ id, text })),
          v.minLength(2),
          v.maxLength(8),
        ),
        expectedOrder: order,
        initialOrder: order,
        hint: text,
        success: text,
      }),
    ),
    assessment: v.strictObject({
      method: v.literal("finite-sequence-comparison-v1"),
      successCriteria: list(text),
      testCases: list(
        v.strictObject({
          id,
          taskId: id,
          order,
          expectedPassed: v.boolean(),
          expectedFeedbackCode: thinkingFeedbackSchema,
        }),
      ),
    }),
    safety: v.strictObject({
      execution: v.literal("none"),
      permissions: v.pipe(v.array(v.never()), v.length(0)),
      performanceClaim: text,
    }),
  }),
  v.check((spec) => {
    const unique = (xs: string[]) => new Set(xs).size === xs.length;
    const tasks = new Map(spec.practiceTasks.map((t) => [t.id, t]));
    const permutation = (a: string[], b: string[]) =>
      a.length === b.length && unique(a) && a.every((x) => b.includes(x));
    return (
      unique(spec.variants.map((x) => x.id)) &&
      unique(spec.learningObjectives.map((x) => x.id)) &&
      unique(spec.practiceTasks.map((x) => x.id)) &&
      spec.practiceTasks.every(
        (t) =>
          unique(t.steps.map((s) => s.id)) &&
          permutation(
            t.expectedOrder,
            t.steps.map((s) => s.id),
          ) &&
          (!t.initialOrder.length ||
            permutation(t.initialOrder, t.expectedOrder)),
      ) &&
      spec.variants.every(
        (a) =>
          unique(a.taskIds) &&
          a.taskIds.every((x) => tasks.has(x)) &&
          unique(a.questions.map((x) => x.id)) &&
          a.questions.every(
            (q) =>
              unique(q.choices.map((x) => x.id)) &&
              q.choices.filter((x) => x.correct).length === 1,
          ),
      ) &&
      unique(spec.assessment.testCases.map((x) => x.id)) &&
      spec.assessment.testCases.every((t) => tasks.has(t.taskId))
    );
  }, "Lesson references and unique step/choice identifiers must be consistent."),
);
export type ThinkingSpec = v.InferOutput<typeof thinkingSpecSchema>;
export type ThinkingTask = ThinkingSpec["practiceTasks"][number];
export const thinkingRequestSchema = v.strictObject({
  specificationVersion: v.literal("1.0.0"),
  contentVersion: v.literal("1.0.0"),
  lessonId: v.literal("programming-thinking-001"),
  taskId: id,
  order,
});
export function parseThinkingSpec(input: unknown): ThinkingSpec {
  return v.parse(thinkingSpecSchema, input);
}
