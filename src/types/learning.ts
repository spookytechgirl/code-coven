import type { FeedbackCode } from "../learning/evaluate";
import type { Lesson } from "./curriculum";
export interface LearningObjective {
  id: string;
  description: string;
}
export interface CodeSample {
  code: string;
  expectedOutput: string;
  explanation: string;
}
export interface KnowledgeQuestion {
  id: string;
  prompt: string;
  choices: { id: string; text: string; correct: boolean; feedback: string }[];
}
export interface LessonSection {
  title: string;
  paragraphs: string[];
}
export interface PracticeFeedbackCopy {
  messages: Record<FeedbackCode, string>;
  hints: {
    missingQuotes: string;
    matchingQuotes: string;
    missingParentheses: string;
    functionName: string;
  };
}
export interface CompletionCelebrationContent {
  title: string;
  message: string;
  achievement: string;
  reviewLabel: string;
  reviewHref: string;
  returnLabel: string;
  returnTo: string;
}
export interface LessonTeaching {
  practiceFeedback: PracticeFeedbackCopy;
  checkerNotice: string;
  outputNotice: string;
  completion: CompletionCelebrationContent;
}
export interface LessonVariant {
  id: "kids-little" | "kids-junior" | "adults";
  audience: "kids" | "adults";
  band?: "little" | "junior";
  title: string;
  audienceLabel: string;
  intro: string;
  sections: LessonSection[];
  questions: KnowledgeQuestion[];
  taskId: "hello" | "welcome";
  practiceIntro: string;
  starter: string;
  teaching?: LessonTeaching;
}
export interface LearningLesson extends Lesson {
  courseId: string;
  conceptId: string;
  version: string;
  learningObjectives: LearningObjective[];
  prerequisites: string[];
  examples: CodeSample[];
  variants: LessonVariant[];
}
