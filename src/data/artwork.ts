/** Existing local illustrations are retained for Mission 015.
 * Import replacement assets here so Vite validates and bundles them locally.
 */
export interface Artwork {
  src?: string;
  description: string;
}
export const departmentArtwork: Record<string, Artwork> = {
  cottage: {
    description:
      "A cozy lavender cottage with glowing windows among pink flowers.",
  },
  potions: {
    description: "A magical laboratory with bubbling purple potions.",
  },
  workshop: {
    description: "A whimsical workshop with a glowing coding spellbook.",
  },
  library: {
    description: "Towering bookshelves and floating enchanted books.",
  },
  observatory: {
    description: "A celestial observatory beneath a starry sky.",
  },
  tower: {
    description: "A defensive academy tower protected by a glowing shield.",
  },
  sanctum: {
    description: "A lavender castle surrounded by stars.",
  },
};
export const courseArtwork: Record<string, Artwork> = {
  "python-potions": {
    description: "A lavender potion bubbling above an enchanted recipe book.",
  },
  "web-enchantment": {
    description: "An open spellbook casting a glowing web enchantment.",
  },
  "ai-fundamentals": {
    description: "A glowing crystal surrounded by a constellation of ideas.",
  },
};
