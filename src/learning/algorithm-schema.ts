import * as v from "valibot";
const text = v.pipe(v.string(), v.minLength(1), v.maxLength(3000));
const id = v.pipe(v.string(), v.regex(/^[a-z][a-z0-9-]*$/), v.maxLength(80));
const option = v.strictObject({ id, text });
const slot = v.strictObject({
  label: text,
  options: v.pipe(v.array(option), v.minLength(2), v.maxLength(6)),
  expectedId: id,
  hint: text,
});
export const algorithmTaskSchema = v.strictObject({
  id,
  kind: v.picklist(["recipe", "branch", "loop"]),
  title: text,
  instruction: text,
  goal: text,
  input: text,
  expectedOutput: text,
  explanation: text,
  hint: text,
  slots: v.pipe(v.array(slot), v.minLength(2), v.maxLength(3)),
});
export type AlgorithmTask = v.InferOutput<typeof algorithmTaskSchema>;
const answers = v.pipe(
  v.array(v.pipe(v.string(), v.maxLength(80))),
  v.maxLength(3),
);
export const algorithmRequestSchema = v.strictObject({
  specificationVersion: v.literal("1.0.0"),
  contentVersion: v.literal("1.0.0"),
  lessonId: v.literal("algorithm-recipe-001"),
  taskId: id,
  answers,
});
export const algorithmSpecSchema = v.pipe(
  v.strictObject({
    specificationVersion: v.literal("1.0.0"),
    contentVersion: v.literal("1.0.0"),
    lessonId: v.literal("algorithm-recipe-001"),
    courseId: v.literal("algorithm-alchemy"),
    moduleId: v.literal("algorithm-recipe-basics"),
    departmentId: v.literal("library"),
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
          sections: v.pipe(
            v.array(
              v.strictObject({
                title: text,
                paragraphs: v.pipe(v.array(text), v.minLength(1)),
                pseudocode: v.pipe(v.string(), v.maxLength(2000)),
              }),
            ),
            v.length(6),
          ),
          questions: v.pipe(
            v.array(
              v.strictObject({
                id,
                prompt: text,
                choices: v.pipe(
                  v.array(
                    v.strictObject({
                      id,
                      text,
                      correct: v.boolean(),
                      feedback: text,
                    }),
                  ),
                  v.minLength(2),
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
    practiceTasks: v.pipe(v.array(algorithmTaskSchema), v.length(12)),
    assessment: v.strictObject({
      method: v.literal("fixed-algorithm-trace-v1"),
      testCases: v.pipe(
        v.array(
          v.strictObject({
            id,
            taskId: id,
            answers,
            expectedPassed: v.boolean(),
            expectedFeedbackCode: v.picklist([
              "correct",
              "mismatch",
              "incomplete",
            ]),
          }),
        ),
        v.length(48),
      ),
    }),
    safety: v.strictObject({ execution: text, performanceClaim: text }),
  }),
  v.check((s) => {
    const unique = (xs: string[]) => new Set(xs).size === xs.length;
    return (
      unique(s.variants.map((x) => x.id)) &&
      unique(s.learningObjectives.map((x) => x.id)) &&
      unique(s.practiceTasks.map((x) => x.id)) &&
      unique(s.assessment.testCases.map((x) => x.id)) &&
      s.practiceTasks.every(
        (t) =>
          t.slots.every(
            (x) =>
              unique(x.options.map((o) => o.id)) &&
              x.options.some((o) => o.id === x.expectedId),
          ) && t.slots.length === (t.kind === "branch" ? 2 : 3),
      ) &&
      s.variants.every(
        (x) =>
          unique(x.taskIds) &&
          x.taskIds.every((id) => s.practiceTasks.some((t) => t.id === id)) &&
          new Set(
            x.taskIds.map(
              (id) => s.practiceTasks.find((t) => t.id === id)!.kind,
            ),
          ).size === 3 &&
          unique(x.questions.map((q) => q.id)) &&
          x.questions.every(
            (q) =>
              unique(q.choices.map((c) => c.id)) &&
              q.choices.filter((c) => c.correct).length === 1,
          ),
      ) &&
      s.assessment.testCases.every((c) =>
        s.practiceTasks.some((t) => t.id === c.taskId),
      )
    );
  }, "Lesson IDs, choices and references must be consistent."),
);
export function parseAlgorithmSpec(input: unknown) {
  return v.parse(algorithmSpecSchema, input);
}
