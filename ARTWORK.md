# Code Coven artwork handoff · Mission 002

All current academy, department, and course illustrations are **concept placeholders**, not finished or approved artwork. Visible labels identify them. Hexi's existing local SVG is unchanged; the official portrait is still needed. The new study backdrop is a lightweight local SVG, while destination and course concepts are reusable SVG components. No stock photography, remote artwork, paid service, or generated raster assets are used.

## Suggested final assets

Store approved assets in `src/assets/`. Use compressed WebP for scenes and transparent WebP/PNG or SVG for character art. Keep important subjects away from the edges so smaller screens can crop safely.

| Filename                             | Dimensions                   | Direction                                                                                                                                                                                                                             |
| ------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `academy-study.webp`                 | 1360 × 1240                  | Cozy academy interior: arched lavender window, forest outside, wisteria, pink flowers, warm floating lanterns, magical books, and glowing laptop. Leave the center-right desk free for Hexi's separate portrait. No embedded UI text. |
| `department-apprentice-cottage.webp` | 1200 × 720                   | Small lavender forest cottage, glowing windows, winding path, dusty pink flowers.                                                                                                                                                     |
| `department-potion-laboratory.webp`  | 1200 × 720                   | Cozy laboratory with bubbling purple potions, crystals, books, warm lighting.                                                                                                                                                         |
| `department-enchanted-workshop.webp` | 1200 × 720                   | Whimsical workshop with a glowing coding spellbook, tools, tiny sparks.                                                                                                                                                               |
| `department-ancient-library.webp`    | 1200 × 720                   | Towering shelves, floating enchanted books, warm reading nooks.                                                                                                                                                                       |
| `department-oracle-observatory.webp` | 1200 × 720                   | Celestial observatory, telescope, constellations, lavender starry sky.                                                                                                                                                                |
| `department-guardian-tower.webp`     | 1200 × 720                   | Protective magical tower, glowing shields, lanterns.                                                                                                                                                                                  |
| `department-archmage-sanctum.webp`   | 1200 × 720                   | Magnificent lavender castle surrounded by stars and enchanted woodland.                                                                                                                                                               |
| `course-python-potions.webp`         | 1200 × 660                   | Bubbling lavender potion above a Python recipe book.                                                                                                                                                                                  |
| `course-web-enchantment.webp`        | 1200 × 660                   | Open magical spellbook casting a web/code enchantment.                                                                                                                                                                                |
| `course-ai-fundamentals.webp`        | 1200 × 660                   | Glowing crystal with a constellation of connected ideas.                                                                                                                                                                              |
| `hexi-portrait.png`                  | About 800 × 827, transparent | Approved fluffy black cat, lavender eyes and oversized witch hat, supportive expression. Preserve the current portrait's approximate aspect ratio.                                                                                    |

The remaining four course cards currently reuse their department concepts. They support individual course images through the same registry; recommended future filenames are `course-programming-foundations.webp`, `course-algorithm-alchemy.webp`, `course-cybersecurity-charms.webp`, and `course-software-sorcery.webp`, at 1200 × 660.

## Replace the concepts

- Import approved department/course images in `src/data/artwork.ts`, set the relevant `src`, and set `placeholder: false`. Components then render those assets while retaining the same cards, links, and metadata. Decorative images have empty alt text because adjacent headings provide the link names; descriptions in the registry document intended content.
- `MagicalScenery` accepts `artwork` and `placeholder` props. Pass the approved study image and `placeholder={false}` from Home when ready. The scenery keeps Hexi as a separate replaceable component.
- For approved Hexi art, replace the default import in `src/components/Hexi.tsx` or pass its existing `artwork` prop. Once approved, also remove the “Mascot placeholder” caption in HexiCorner and update the study caption. Expressions remain an extension point, not new finished portraits.

Check both themes and mobile crops after replacing assets. Keep meaningful copy and controls in HTML rather than embedding them in illustrations.
