# Mission 015 — The Placeholder Vanishing Spell

Date: 2026-10-17 · Status: Implemented locally; not committed, pushed, or deployed.

## Scope and source

Inspected the public website at https://code-coven.pages.dev/ and made a separate local checkout of `spookytechgirl/code-coven`, based on commit `1a4af0a9814af8f2ef5ae9431bd6364c38db6fc6`. This avoids changing another local project's unpublished work. The checkout includes the Mission 008/009 classrooms; the later standalone Potion Lab prototypes reviewed in chat are not present in this baseline and were not copied, recreated, or modified.

Local production preview: http://127.0.0.1:4191/ while its preview process is running. To restart from this checkout, use the install/build/preview instructions in [README](../README.md), choosing port 4191.

## Labels removed

| Rendering source | Removed text | Affected surfaces |
| --- | --- | --- |
| [MagicalScenery](../src/components/MagicalScenery.tsx) | Study concept · placeholder illustration. Official Hexi artwork pending. | Homepage study |
| [DepartmentCard](../src/components/DepartmentCard.tsx) | Concept art · placeholder | Seven department pictures on Home and Academy |
| [CourseIllustration](../src/components/CourseIllustration.tsx) | Concept art · placeholder | Catalog, dashboard, spellbook, department course cards |
| [HexiCorner](../src/components/HexiCorner.tsx) | Mascot placeholder | Dashboard portrait |
| [LearningEntry](../src/pages/Learn.tsx) | Concept illustration | Three learning-path pictures |

All five sources were HTML overlays/captions. CSS styled the labels but generated no temporary text. Source inspection found no temporary labels embedded in the SVG assets or drawings. No raster editing, cropping, replacement art, or edited-image backups were necessary; the original images remain the active assets and Git retains their history.

Removed obsolete `placeholder` fields/props and CSS rules used only by these labels. Search input hints, difficulty badges, demo statistics/progress, planned lesson counts, coming-soon notices, meaningful scene text, and accessibility labels remain intact. An unavailable feature should still be explained honestly.

## Artwork, layout, and accessibility preservation

- Study SVG, Hexi SVG, favicon, DepartmentArtwork drawing source, and Hexi component are byte-for-byte identical to the baseline.
- CourseIllustration retains every SVG drawing instruction; only its label markup was removed.
- Before/after desktop inspection of the study frame found identical inner markup and identical dimensions (approximately 608.67 × 554.96 CSS pixels at a 1440-pixel viewport).
- No colors, image sources, crop rules, drawing geometry, grids, navigation routes, or responsive breakpoints were changed. Removing the obsolete study caption releases its own text space; the illustrated frame is unchanged.
- Meaningful Hexi alt text, decorative-image semantics, headings, link destinations, difficulty labels, and focus styles are retained. Card accessible names no longer include temporary artwork labels.
- No lesson checker/content/progress behavior, security headers, dependency versions, lockfile, or execution architecture changed. This is not a new accessibility or security certification.

## Fresh verification

- `pnpm build`: passed TypeScript and production bundling.
- `pnpm check:format`: passed.
- `pnpm test:lessons`: 10 tests passed.
- `pnpm test:build`: 6 tests passed.
- `git diff --check`: passed.
- Browser surveyed all 38 public, department, course, dashboard, and learning route/variant URLs, then checked the local production build at 1440 and 375 pixels in both Daylight and Midnight themes: 152 route/configuration checks.
- Every local check had no visible temporary artwork text and no page-wide horizontal overflow. All image elements in the captured checks completed loading with positive natural width; no broken images were observed.
- Search still narrows the catalog to Python; Hexi's authored tips still rotate; the mobile navigation opens and follows the Academy link.
- Desktop/mobile screenshots cover Home, Academy, courses, the dashboard, and learning selection. Visually reviewed Home at both sizes, the Midnight dashboard, and learning selection.

The route survey covers the existing enumerated routes, including all seven department pages, seven course previews, four learning overview pages, both Kids bands, Adults, AI, public informational pages, and dashboard pages. It does not claim coverage of future/unpublished routes, all possible device sizes, or screen-reader certification.

## Blueprint maintenance

Updated [ARTWORK](../ARTWORK.md), [Design System](DESIGN_SYSTEM.md), [Feature Registry](FEATURE_REGISTRY.md) F07/F11, [Decision Log](DECISION_LOG.md) D015, [README](../README.md), and the artwork guidance in [AGENTS](../AGENTS.md). Historical decisions remain recorded; current guidance explicitly follows the founder's instruction to preserve these pictures without temporary visitor labels. Vision and learning architecture did not change.

## Review state

Changes are unstaged and uncommitted in this separate local checkout. No push, deployment, paid service, generated artwork, or production change was performed. Review the running preview and diff before authorizing any publication.
