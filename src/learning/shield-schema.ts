import * as v from "valibot";
const text = v.pipe(v.string(), v.maxLength(3000));
const id = v.pipe(v.string(), v.regex(/^[a-z][a-z0-9-]*$/), v.maxLength(80));
const list = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  s: T,
) => v.pipe(v.array(s), v.minLength(1), v.maxLength(40));
export const shieldClassificationSchema = v.picklist([
  "suspicious",
  "no-warning-shown",
]);
export const shieldFeedbackSchema = v.picklist([
  "incomplete",
  "invalid",
  "classification",
  "action",
  "correct",
]);
export const shieldSpecSchema = v.pipe(
  v.strictObject({
    specificationVersion: v.literal("1.0.0"),
    contentVersion: v.literal("1.0.0"),
    lessonId: v.literal("cyber-guardian-shield-001"),
    courseId: v.literal("cybersecurity-charms"),
    moduleId: v.literal("cyber-defensive-basics"),
    departmentId: v.literal("tower"),
    title: text,
    learningObjectives: v.pipe(
      v.array(v.strictObject({ id, description: text })),
      v.length(6),
    ),
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
          questions: v.pipe(
            v.array(
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
            v.length(3),
          ),
          taskIds: v.pipe(v.array(id), v.length(3)),
        }),
      ),
      v.length(4),
    ),
    practiceTasks: list(
      v.strictObject({
        id,
        title: text,
        sender: text,
        message: text,
        displayAddress: v.pipe(
          v.string(),
          v.maxLength(180),
          v.check(
            (s) =>
              s === "" || /^[a-z0-9.-]+\.invalid(?:\/[a-z0-9/-]*)?$/.test(s),
            "Only reserved .invalid example addresses are allowed.",
          ),
        ),
        attachmentLabel: v.pipe(
          text,
          v.check(
            (s) => s === "" || s.includes("fictional"),
            "Attachments must be labeled fictional.",
          ),
        ),
        expectedClassification: shieldClassificationSchema,
        actions: v.pipe(
          v.array(v.strictObject({ id, text, feedback: text })),
          v.length(3),
        ),
        expectedActionId: id,
        hint: text,
        explanation: text,
        expectedResponse: text,
      }),
    ),
    assessment: v.strictObject({
      method: v.literal("fixed-defensive-choice-v1"),
      testCases: list(
        v.strictObject({
          id,
          taskId: id,
          classification: shieldClassificationSchema,
          actionId: id,
          expectedPassed: v.boolean(),
          expectedFeedbackCode: shieldFeedbackSchema,
        }),
      ),
    }),
    safety: v.strictObject({
      execution: v.literal("none"),
      permissions: v.pipe(v.array(v.never()), v.length(0)),
      fictionalOnly: v.literal(true),
      performanceClaim: text,
    }),
  }),
  v.check((spec) => {
    const unique = (xs: string[]) => new Set(xs).size === xs.length;
    const tasks = new Map(spec.practiceTasks.map((t) => [t.id, t]));
    return (
      unique(spec.learningObjectives.map((x) => x.id)) &&
      unique(spec.variants.map((x) => x.id)) &&
      tasks.size === spec.practiceTasks.length &&
      spec.practiceTasks.every(
        (t) =>
          unique(t.actions.map((a) => a.id)) &&
          t.actions.some((a) => a.id === t.expectedActionId),
      ) &&
      unique(spec.assessment.testCases.map((x) => x.id)) &&
      spec.assessment.testCases.every((c) =>
        tasks.get(c.taskId)?.actions.some((a) => a.id === c.actionId),
      ) &&
      spec.variants.every(
        (a) =>
          unique(a.taskIds) &&
          a.taskIds.every((t) => tasks.has(t)) &&
          unique([...a.questions.map((q) => q.id), ...a.taskIds]) &&
          a.questions.every(
            (q) =>
              unique(q.choices.map((c) => c.id)) &&
              q.choices.filter((c) => c.correct).length === 1,
          ),
      )
    );
  }, "Lesson/task/choice identifiers must be consistent and unique."),
);
export type ShieldSpec = v.InferOutput<typeof shieldSpecSchema>;
export type ShieldTask = ShieldSpec["practiceTasks"][number];
export const shieldRequestSchema = v.strictObject({
  specificationVersion: v.literal("1.0.0"),
  contentVersion: v.literal("1.0.0"),
  lessonId: v.literal("cyber-guardian-shield-001"),
  taskId: id,
  classification: shieldClassificationSchema,
  actionId: id,
});
export const parseShieldSpec = (input: unknown): ShieldSpec =>
  v.parse(shieldSpecSchema, input);
