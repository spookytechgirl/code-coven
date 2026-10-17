import * as v from "valibot";
import { thinkingRequestSchema } from "./thinking-schema.ts";
import { thinkingSpec } from "../data/lessons/programming-thinking.ts";
import type { ThinkingTask } from "./thinking-schema.ts";
export function checkSequence(task: ThinkingTask, input: unknown) {
  const result = (
    passed: boolean,
    feedbackCode: "invalid" | "incomplete" | "duplicate" | "order" | "correct",
    feedback: string,
  ) => ({ passed, feedbackCode, feedback, executed: false as const });
  if (
    !Array.isArray(input) ||
    input.length > 8 ||
    input.some(
      (x) =>
        typeof x !== "string" ||
        x.length > 80 ||
        (x !== "" && !task.steps.some((s) => s.id === x)),
    )
  )
    return result(
      false,
      "invalid",
      "Use only the steps supplied for this activity. No actions are executed.",
    );
  if (input.length !== task.expectedOrder.length || input.some((x) => x === ""))
    return result(
      false,
      "incomplete",
      "Hexi: Choose a step for every place, then check again. You can try as often as you like.",
    );
  if (new Set(input).size !== input.length)
    return result(
      false,
      "duplicate",
      "Hexi: One step appears more than once. Use each step exactly once.",
    );
  const mismatch = input.findIndex((x, i) => x !== task.expectedOrder[i]);
  if (mismatch >= 0)
    return result(
      false,
      "order",
      `Hexi: Look at step ${mismatch + 1}. What must happen before the next action? Trace the plan, change a step, and check again.`,
    );
  return result(true, "correct", task.success);
}
export function assessThinking(input: unknown) {
  const request = v.safeParse(thinkingRequestSchema, input);
  if (!request.success)
    return {
      valid: false as const,
      executed: false as const,
      feedback:
        "Unsupported assessment request or version. No action was performed.",
    };
  const task = thinkingSpec.practiceTasks.find(
    (t) => t.id === request.output.taskId,
  );
  if (!task)
    return {
      valid: false as const,
      executed: false as const,
      feedback: "Unknown task. Use a task identifier in this lesson.",
    };
  return {
    valid: true as const,
    specificationVersion: thinkingSpec.specificationVersion,
    contentVersion: thinkingSpec.contentVersion,
    lessonId: thinkingSpec.lessonId,
    checkerVersion: thinkingSpec.assessment.method,
    taskId: task.id,
    submittedOrder: request.output.order,
    expectedOrder: task.expectedOrder,
    ...checkSequence(task, request.output.order),
  };
}
export const thinkingAssessmentRecords = thinkingSpec.assessment.testCases.map(
  (t) => ({
    caseId: t.id,
    ...assessThinking({
      specificationVersion: "1.0.0",
      contentVersion: "1.0.0",
      lessonId: thinkingSpec.lessonId,
      taskId: t.taskId,
      order: t.order,
    }),
  }),
);
