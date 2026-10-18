import raw from "./cyber-shield.v1.json" with { type: "json" };
import { parseShieldSpec } from "../../learning/shield-schema.ts";
import type { Lesson } from "../../types/curriculum";
export const shieldSpec = parseShieldSpec(raw);
export type ShieldVariant = (typeof shieldSpec.variants)[number];
export const shieldRoutes = {
  kids: "/learn/kids/security/first-shield",
  adults: "/learn/adults/security/first-shield",
  ai: "/learn/ai/security/first-shield",
};
export const shieldLesson: Lesson = {
  id: shieldSpec.lessonId,
  title: shieldSpec.title,
  content:
    "Recognize warning signs, protect passwords and information, and choose safe defensive responses.",
  challenges: shieldSpec.practiceTasks.map((t) => ({
    id: t.id,
    title: t.title,
    instructions: t.message,
    rewardXP: 0,
  })),
};
