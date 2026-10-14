/** Local concept art remains a placeholder until approved illustrations arrive.
 * Import replacement assets here so Vite validates and bundles them locally.
 */
export interface Artwork {
  src?: string;
  description: string;
  placeholder: boolean;
}
export const departmentArtwork: Record<string, Artwork> = {
  cottage: {
    description:
      "A cozy lavender cottage with glowing windows among pink flowers.",
    placeholder: true,
  },
  potions: {
    description: "A magical laboratory with bubbling purple potions.",
    placeholder: true,
  },
  workshop: {
    description: "A whimsical workshop with a glowing coding spellbook.",
    placeholder: true,
  },
  library: {
    description: "Towering bookshelves and floating enchanted books.",
    placeholder: true,
  },
  observatory: {
    description: "A celestial observatory beneath a starry sky.",
    placeholder: true,
  },
  tower: {
    description: "A defensive academy tower protected by a glowing shield.",
    placeholder: true,
  },
  sanctum: {
    description: "A lavender castle surrounded by stars.",
    placeholder: true,
  },
};
export const courseArtwork: Record<string, Artwork> = {
  "python-potions": {
    description: "A lavender potion bubbling above an enchanted recipe book.",
    placeholder: true,
  },
  "web-enchantment": {
    description: "An open spellbook casting a glowing web enchantment.",
    placeholder: true,
  },
  "ai-fundamentals": {
    description: "A glowing crystal surrounded by a constellation of ideas.",
    placeholder: true,
  },
};
