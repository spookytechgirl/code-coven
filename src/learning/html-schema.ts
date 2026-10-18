import * as v from "valibot";
const text = v.pipe(v.string(), v.maxLength(4000));
const id = v.pipe(v.string(), v.regex(/^[a-z][a-z0-9-]*$/), v.maxLength(80));
const list = <T extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
  s: T,
) => v.pipe(v.array(s), v.minLength(1), v.maxLength(40));
export const htmlFeedbackSchema = v.picklist([
  "empty",
  "too-long",
  "unsupported",
  "matching-tags",
  "structure",
  "content",
  "correct",
]);
export const htmlSpecSchema = v.pipe(
  v.strictObject({
    specificationVersion: v.literal("1.0.0"),
    contentVersion: v.literal("1.0.0"),
    lessonId: v.literal("web-html-anatomy-001"),
    courseId: v.literal("web-enchantment"),
    departmentId: v.literal("workshop"),
    moduleId: v.literal("web-html-basics"),
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
        instruction: text,
        kind: v.picklist(["heading", "pair", "document"]),
        expectedHeading: text,
        expectedParagraph: text,
        expectedTitle: text,
        starter: text,
        hint: text,
        example: text,
      }),
    ),
    assessment: v.strictObject({
      method: v.literal("restricted-html-structure-v1"),
      testCases: list(
        v.strictObject({
          id,
          taskId: id,
          source: text,
          expectedPassed: v.boolean(),
          expectedFeedbackCode: htmlFeedbackSchema,
        }),
      ),
    }),
    safety: v.strictObject({
      execution: v.literal("none"),
      permissions: v.pipe(v.array(v.never()), v.length(0)),
      preview: v.literal("fixed-react-text-model"),
      performanceClaim: text,
    }),
  }),
  v.check((spec) => {
    const unique = (xs: string[]) => new Set(xs).size === xs.length;
    const tasks = new Set(spec.practiceTasks.map((t) => t.id));
    return (
      unique(spec.variants.map((v) => v.id)) &&
      unique(spec.learningObjectives.map((o) => o.id)) &&
      tasks.size === spec.practiceTasks.length &&
      unique(spec.assessment.testCases.map((t) => t.id)) &&
      spec.assessment.testCases.every((t) => tasks.has(t.taskId)) &&
      spec.variants.every(
        (a) =>
          unique(a.taskIds) &&
          a.taskIds.every((t) => tasks.has(t)) &&
          unique(a.questions.map((q) => q.id)) &&
          a.questions.every(
            (q) =>
              unique(q.choices.map((c) => c.id)) &&
              q.choices.filter((c) => c.correct).length === 1,
          ),
      )
    );
  }, "Content identifiers must be unique and reference known tasks."),
);
export type HtmlSpec = v.InferOutput<typeof htmlSpecSchema>;
export type HtmlTask = HtmlSpec["practiceTasks"][number];
export const htmlRequestSchema = v.strictObject({
  specificationVersion: v.literal("1.0.0"),
  contentVersion: v.literal("1.0.0"),
  lessonId: v.literal("web-html-anatomy-001"),
  taskId: id,
  source: v.pipe(v.string(), v.maxLength(1600)),
});
export const parseHtmlSpec = (input: unknown): HtmlSpec =>
  v.parse(htmlSpecSchema, input);
