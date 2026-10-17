import * as v from "valibot";
import { variablesSpec } from "../data/lessons/python-variables.ts";
import { variableRequestSchema } from "./variables-schema.ts";
import { checkVariableAnswer, variableFeedback } from "./variables.ts";
/** Pure local data evaluation. No API, agent registration, network, or Python execution. */
export function evaluateVariableRequest(input: unknown) {
  const request = v.parse(variableRequestSchema, input);
  const task = variablesSpec.practiceTasks.find(
    (t) => t.id === request.taskId,
  )!;
  const result = checkVariableAnswer(request.source, task);
  return {
    specificationVersion: variablesSpec.specificationVersion,
    contentVersion: variablesSpec.contentVersion,
    lessonId: variablesSpec.lessonId,
    taskId: task.id,
    checker: variablesSpec.assessment.method,
    passed: result.passed,
    feedbackCode: result.feedbackCode,
    feedback: variableFeedback(result.feedbackCode),
    line: result.line ?? null,
    expectedOutput: task.expectedOutput,
    inferredOutput: result.inferredOutput ?? null,
    executed: false,
    scope: "sample-local-evaluation",
    claim: variablesSpec.safety.performanceClaim,
  };
}
export const variableAssessmentRecords = variablesSpec.assessment.testCases.map(
  (test) => ({
    caseId: test.id,
    ...evaluateVariableRequest({
      specificationVersion: "1.0.0",
      contentVersion: "1.0.0",
      lessonId: variablesSpec.lessonId,
      taskId: test.taskId,
      source: test.source,
    }),
  }),
);
