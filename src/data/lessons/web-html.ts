import raw from "./web-html.v1.json" with { type: "json" };
import { parseHtmlSpec } from "../../learning/html-schema.ts";
import type { Lesson } from "../../types/curriculum";
export const htmlSpec = parseHtmlSpec(raw);
export type HtmlVariant = (typeof htmlSpec.variants)[number];
export const htmlRoutes = {
  kids: "/learn/kids/web/first-web-spell",
  adults: "/learn/adults/web/first-web-spell",
  ai: "/learn/ai/web/first-web-spell",
};
export const htmlLesson: Lesson = {
  id: htmlSpec.lessonId,
  title: htmlSpec.title,
  content:
    "Build meaningful headings, paragraphs and a basic document; repair a simple HTML mistake.",
  challenges: htmlSpec.practiceTasks.map((t) => ({
    id: t.id,
    title: t.title,
    instructions: t.instruction,
    rewardXP: 0,
  })),
};
