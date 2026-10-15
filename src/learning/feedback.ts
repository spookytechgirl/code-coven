import type { PracticeResult } from "./evaluate.ts";
import type {
  KnowledgeQuestion,
  PracticeFeedbackCopy,
} from "../types/learning.ts";

/** Presentation only. The checker's result remains the authority on correctness. */
export function presentPracticeFeedback(
  source: string,
  result: PracticeResult,
  copy: PracticeFeedbackCopy,
): string {
  if (result.feedbackCode !== "unsupported-syntax")
    return copy.messages[result.feedbackCode];
  const answer = source.trim();
  // Offer one likely correction for this small exercise, never a Python diagnosis.
  if (/[;\r\n]/.test(answer) || /\)[ \t]*\S/.test(answer))
    return copy.messages["unsupported-syntax"];
  if (!/^print\b/.test(answer)) return copy.hints.functionName;
  if (!/^print[ \t]*\(/.test(answer) || !answer.endsWith(")"))
    return copy.hints.missingParentheses;
  const message = answer.slice(answer.indexOf("(") + 1, -1).trim();
  const startsQuote = /^['"]/.test(message),
    endsQuote = /['"]$/.test(message);
  if (!startsQuote && !endsQuote) return copy.hints.missingQuotes;
  if (!startsQuote || !endsQuote || message[0] !== message.at(-1))
    return copy.hints.matchingQuotes;
  return copy.messages["unsupported-syntax"];
}
export function withKnowledgeFeedback(
  question: KnowledgeQuestion,
  feedback: Record<string, string>,
): KnowledgeQuestion {
  return {
    ...question,
    choices: question.choices.map((choice) => ({
      ...choice,
      feedback: feedback[choice.id] ?? choice.feedback,
    })),
  };
}
