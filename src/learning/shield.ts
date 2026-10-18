import * as v from "valibot";
import { shieldRequestSchema } from "./shield-schema.ts";
import type { ShieldTask } from "./shield-schema.ts";
import { shieldSpec } from "../data/lessons/cyber-shield.ts";
export function checkShield(
  task: ShieldTask,
  classification: unknown,
  actionId: unknown,
) {
  const result = (
    passed: boolean,
    feedbackCode:
      "incomplete" | "invalid" | "classification" | "action" | "correct",
    feedback: string,
  ) => ({
    passed,
    feedbackCode,
    feedback,
    executed: false as const,
    actionsPerformed: false as const,
  });
  if (
    typeof classification !== "string" ||
    typeof actionId !== "string" ||
    classification.length > 80 ||
    actionId.length > 80
  )
    return result(
      false,
      "invalid",
      "Use the fixed lesson choices only. No action is performed.",
    );
  if (classification === "" || actionId === "")
    return result(
      false,
      "incomplete",
      "Hexi: Choose what the clues suggest and a protective response, then check. You can try again as often as you like.",
    );
  const action = task.actions.find((a) => a.id === actionId);
  if (!["suspicious", "no-warning-shown"].includes(classification) || !action)
    return result(
      false,
      "invalid",
      "Use the choices supplied for this story. This checker does not inspect real messages or take actions.",
    );
  if (classification !== task.expectedClassification)
    return result(
      false,
      "classification",
      `Hexi: Look at the story’s clues again. ${task.hint}`,
    );
  if (actionId !== task.expectedActionId)
    return result(false, "action", action.feedback);
  return result(true, "correct", `Hexi: Thoughtful choice! ${action.feedback}`);
}
export function assessShield(input: unknown) {
  const parsed = v.safeParse(shieldRequestSchema, input);
  if (!parsed.success)
    return {
      valid: false as const,
      executed: false as const,
      actionsPerformed: false as const,
      feedback:
        "Unsupported request, fields or version. No action was performed.",
    };
  const request = parsed.output;
  const task = shieldSpec.practiceTasks.find((t) => t.id === request.taskId);
  if (!task || !task.actions.some((a) => a.id === request.actionId))
    return {
      valid: false as const,
      executed: false as const,
      actionsPerformed: false as const,
      feedback: "Unknown task or action identifier.",
    };
  return {
    valid: true as const,
    specificationVersion: shieldSpec.specificationVersion,
    contentVersion: shieldSpec.contentVersion,
    lessonId: shieldSpec.lessonId,
    checkerVersion: shieldSpec.assessment.method,
    taskId: task.id,
    submittedClassification: request.classification,
    submittedActionId: request.actionId,
    expectedClassification: task.expectedClassification,
    expectedActionId: task.expectedActionId,
    expectedResponse: task.expectedResponse,
    explanation: task.explanation,
    ...checkShield(task, request.classification, request.actionId),
  };
}
export const shieldAssessmentRecords = shieldSpec.assessment.testCases.map(
  (c) => ({
    caseId: c.id,
    ...assessShield({
      specificationVersion: "1.0.0",
      contentVersion: "1.0.0",
      lessonId: shieldSpec.lessonId,
      taskId: c.taskId,
      classification: c.classification,
      actionId: c.actionId,
    }),
  }),
);
