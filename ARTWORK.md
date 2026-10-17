# Code Coven artwork handoff · Mission 015

Mission 015 (2026-10-17) explicitly preserves the existing study scene, seven department scenes, course illustrations, and Hexi. Their original SVG assets and drawing geometry/colors are unchanged. Temporary labels are removed from HTML, not painted out of pictures. No stock art, new raster asset, paid service, or replacement portrait is introduced.

## Removed temporary labels

| Label | Source | Where it appeared |
| --- | --- | --- |
| Study concept · placeholder illustration. Official Hexi artwork pending. | `MagicalScenery.tsx` HTML figcaption | Homepage study scene |
| Concept art · placeholder | `DepartmentCard.tsx` HTML overlay | Homepage and academy department cards |
| Concept art · placeholder | `CourseIllustration.tsx` HTML overlay | Catalog, dashboard, spellbook, and department course cards |
| Mascot placeholder | `HexiCorner.tsx` HTML caption | Dashboard portrait |
| Concept illustration | `Learn.tsx` HTML overlay | Three learning-path illustrations |

The inventory covers shared rendering sites, not just one screenshot. CSS styled these labels but did not generate them. No temporary labels were embedded in the SVG images, so no image editing, cropping, or edited-image backup is needed: the original assets remain the active assets and are preserved in Git history. Demo/progress labels, planned lesson totals, course-preview notices, difficulty badges, and search-input hints are functional explanations and remain intact.

## Optional future assets — not part of Mission 015

The historical Mission 002 suggestions below remain reference guidance only. They are not outstanding replacement requirements: the founder explicitly likes the existing pictures. Do not replace them without a separate request.

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

## Optional future source changes

- If a future artwork change is separately authorized, import local department/course images in `src/data/artwork.ts` and set the relevant `src`. Components retain their cards, links, and metadata. There is no temporary-label flag to toggle.
- `MagicalScenery` accepts an optional `artwork` prop; the existing study remains its default. Hexi remains a separate component with an unchanged portrait and descriptive alt text.
- `Hexi` supports an artwork prop, but Mission 015 does not authorize replacing its default image or appearance. Expressions remain an extension point, not new portraits.

Check both themes and mobile crops after replacing assets. Keep meaningful copy and controls in HTML rather than embedding them in illustrations.
