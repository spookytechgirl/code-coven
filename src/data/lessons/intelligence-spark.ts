import raw from "./intelligence-spark.v1.json" with { type: "json" };
import { parseIntelligenceSpec } from "../../learning/intelligence-schema.ts";
export {
  intelligenceRoutes,
  intelligenceLesson,
} from "./intelligence-entry.ts";
export const intelligenceSpec = parseIntelligenceSpec(raw);
export type IntelligenceVariant = (typeof intelligenceSpec.variants)[number];
