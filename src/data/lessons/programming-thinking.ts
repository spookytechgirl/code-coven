import raw from "./programming-thinking.v1.json" with { type: "json" };
import { parseThinkingSpec } from "../../learning/thinking-schema.ts";
import type { Lesson } from "../../types/curriculum";
export const thinkingSpec = parseThinkingSpec(raw);
export const thinkingRoutes = {
  kids: "/learn/kids/fundamentals/thinking-like-a-programmer",
  adults: "/learn/adults/fundamentals/thinking-like-a-programmer",
  ai: "/learn/ai/fundamentals/thinking-like-a-programmer",
};
export const thinkingLesson: Lesson = {
  id: thinkingSpec.lessonId,
  title: thinkingSpec.title,
  content:
    "Plan precise instructions, sequence small steps, and debug a simple mistake.",
  challenges: thinkingSpec.practiceTasks.map((t) => ({
    id: t.id,
    title: t.title,
    instructions: t.instruction,
    rewardXP: 0,
  })),
};
export type ThinkingVariant = (typeof thinkingSpec.variants)[number];
