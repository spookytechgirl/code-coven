import raw from "./software-spellbook.v1.json" with { type: "json" };
import { parseSoftwareSpec } from "../../learning/software-schema.ts";
export { softwareRoutes, softwareLesson } from "./software-entry.ts";
export const softwareSpec = parseSoftwareSpec(raw);
export type SoftwareVariant = (typeof softwareSpec.variants)[number];
