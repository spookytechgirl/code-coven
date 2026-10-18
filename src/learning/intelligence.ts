import * as v from "valibot";
import {
  intelligenceRequestSchema,
  type IntelligenceTask,
} from "./intelligence-schema.ts";
import { intelligenceSpec } from "../data/lessons/intelligence-spark.ts";
export function checkIntelligence(task: IntelligenceTask, input: unknown) {
  const result = (
    passed: boolean,
    feedbackCode: "invalid" | "incomplete" | "mismatch" | "correct",
    feedback: string,
  ) => ({
    passed,
    feedbackCode,
    feedback,
    executed: false as const,
    actionsPerformed: false as const,
  });
  if (
    !Array.isArray(input) ||
    input.length !== task.slots.length ||
    input.some((x) => typeof x !== "string" || x.length > 80)
  )
    return result(
      false,
      "invalid",
      "Use only the supplied choices for this activity. No model runs.",
    );
  if (input.some((x) => x === ""))
    return result(
      false,
      "incomplete",
      "Hexi: Choose something for every menu, then check. You can try again as often as you like.",
    );
  if (input.some((x, i) => !task.slots[i].options.some((o) => o.id === x)))
    return result(
      false,
      "invalid",
      "That choice is not part of this fixed activity.",
    );
  const wrong = input.findIndex((x, i) => x !== task.slots[i].expectedId);
  if (wrong !== -1)
    return result(
      false,
      "mismatch",
      `Hexi: Let’s look at ${task.slots[wrong].label.toLowerCase()} again. ${task.slots[wrong].hint}`,
    );
  return result(
    true,
    "correct",
    `Hexi: Thoughtful reasoning! ${task.explanation}`,
  );
}
export function assessIntelligence(input: unknown) {
  const p = v.safeParse(intelligenceRequestSchema, input);
  if (!p.success)
    return {
      valid: false as const,
      executed: false as const,
      actionsPerformed: false as const,
      feedback: "Unsupported fields, values or version. No code was executed.",
    };
  const task = intelligenceSpec.practiceTasks.find(
    (t) => t.id === p.output.taskId,
  );
  if (!task)
    return {
      valid: false as const,
      executed: false as const,
      actionsPerformed: false as const,
      feedback: "Unknown task identifier.",
    };
  return {
    valid: true as const,
    specificationVersion: intelligenceSpec.specificationVersion,
    contentVersion: intelligenceSpec.contentVersion,
    lessonId: intelligenceSpec.lessonId,
    checkerVersion: intelligenceSpec.assessment.method,
    taskId: task.id,
    kind: task.kind,
    submittedAnswers: p.output.answers,
    expectedAnswers: task.slots.map((s) => s.expectedId),
    expectedOutput: task.expectedOutput,
    explanation: task.explanation,
    ...checkIntelligence(task, p.output.answers),
  };
}
export const intelligenceAssessmentRecords =
  intelligenceSpec.assessment.testCases.map((c) => ({
    caseId: c.id,
    ...assessIntelligence({
      specificationVersion: "1.0.0",
      contentVersion: "1.0.0",
      lessonId: intelligenceSpec.lessonId,
      taskId: c.taskId,
      answers: c.answers,
    }),
  }));
