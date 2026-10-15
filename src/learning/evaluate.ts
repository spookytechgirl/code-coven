export type FeedbackCode =
  "empty" | "unsupported-syntax" | "output-mismatch" | "too-long" | "correct";
export interface PracticeResult {
  passed: boolean;
  feedbackCode: FeedbackCode;
  inferredOutput?: string;
}
/** A bounded recognizer, not a Python interpreter. Never executes submitted text. */
export function checkPrintAnswer(
  source: string,
  expectedOutput: string,
): PracticeResult {
  if (source.length > 500) return { passed: false, feedbackCode: "too-long" };
  if (!source.trim()) return { passed: false, feedbackCode: "empty" };
  const answer = source.trim();
  // No escapes, embedded quote characters, newlines, comments or extra statements.
  const match =
    /^print[ \t]*\([ \t]*(?:"([^"\\\r\n]*)"|'([^'\\\r\n]*)')[ \t]*\)$/.exec(
      answer,
    );
  if (!match) return { passed: false, feedbackCode: "unsupported-syntax" };
  const inferredOutput = (match[1] ?? match[2]) + "\n";
  const passed = inferredOutput === expectedOutput;
  return {
    passed,
    feedbackCode: passed ? "correct" : "output-mismatch",
    inferredOutput,
  };
}
