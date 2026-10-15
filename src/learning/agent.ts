import * as v from "valibot";
import { agentRequestSchema } from "./schema.ts";
import { pythonSpec } from "../data/lessons/python-output.ts";
import { checkPrintAnswer } from "./evaluate.ts";
/** Pure local contract demonstration. No registration, API, identity or execution. */
export function evaluateAgentRequest(input: unknown) {
  const request = v.parse(agentRequestSchema, input);
  const task = pythonSpec.practiceTasks.find((t) => t.id === request.taskId)!;
  const result = checkPrintAnswer(request.source, task.expectedOutput);
  return {
    specificationVersion: pythonSpec.specificationVersion,
    contentVersion: pythonSpec.contentVersion,
    lessonId: pythonSpec.lessonId,
    taskId: task.id,
    capabilityId: pythonSpec.capabilityIdentifiers[0],
    checker: pythonSpec.assessment.method,
    passed: result.passed,
    feedbackCode: result.feedbackCode,
    feedback: pythonSpec.errorFeedback[result.feedbackCode],
    expectedOutput: task.expectedOutput,
    inferredOutput: result.inferredOutput ?? null,
    executed: false,
    scope: "sample-local-evaluation",
    claim: pythonSpec.safety.performanceClaim,
  };
}
export const exampleAgentRequest = {
  specificationVersion: "1.0.0",
  contentVersion: "1.0.0",
  lessonId: "python-output-001",
  taskId: "welcome",
  source: 'print("Welcome to Code Coven!")',
};
export const exampleAgentResponse = evaluateAgentRequest(exampleAgentRequest);
