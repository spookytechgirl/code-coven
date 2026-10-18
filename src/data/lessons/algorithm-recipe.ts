import raw from "./algorithm-recipe.v1.json" with { type: "json" };
import { parseAlgorithmSpec } from "../../learning/algorithm-schema.ts";
import type { Lesson } from "../../types/curriculum";
export const algorithmSpec = parseAlgorithmSpec(raw);
export type AlgorithmVariant = (typeof algorithmSpec.variants)[number];
export const algorithmRoutes = {
  kids: "/learn/kids/algorithms/first-recipe",
  adults: "/learn/adults/algorithms/first-recipe",
  ai: "/learn/ai/algorithms/first-recipe",
};
export const algorithmLesson: Lesson = {
  id: algorithmSpec.lessonId,
  title: algorithmSpec.title,
  content:
    "Trace decisions and bounded loops, recognize patterns, and remove redundant steps.",
  challenges: algorithmSpec.practiceTasks.map((t) => ({
    id: t.id,
    title: t.title,
    instructions: t.instruction,
    rewardXP: 0,
  })),
};
