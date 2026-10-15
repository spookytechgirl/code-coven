# Design System

Last reviewed: 2026-10-15 · Baseline: v0.3.0

## Atmosphere and usability

**Implemented:** an enchanted academy setting using lavender architecture, warm lights, books, stars, wisteria, and Hexi alongside conventional navigation, search, cards, and a professional dashboard. The intention is cozy exploration without obscuring the learning task. The current artwork is explicitly labeled concept/placeholder material, not approved finished illustration.

Crystal is the creative director. Preserve the established academy identity and working controls; use future design work to support the [Academy Vision](ACADEMY_VISION.md), not to add decorative complexity for its own sake.

## Color tokens: current source of truth

[Base styles](../src/styles/index.css) define the tokens below. [Enchantment styles](../src/styles/enchantment.css), imported afterward by [main.tsx](../src/main.tsx), extend the atmosphere and override some layouts. Treat these files as implementation evidence; update this table when tokens change.

| Token       | Daylight Coven | Midnight Coven | Role                 |
| ----------- | -------------- | -------------- | -------------------- |
| `--bg`      | `#FFF8F1`      | `#21162D`      | Main background      |
| `--surface` | `#FFFDF9`      | `#2E203B`      | Cards and navigation |
| `--text`    | `#301B42`      | `#FFF8F1`      | Primary text         |
| `--muted`   | `#705B79`      | `#CFBEDB`      | Supporting text      |
| `--border`  | `#E8DEEA`      | `#503D60`      | Surface separation   |
| `--soft`    | `#F1E8F6`      | `#3E2B50`      | Soft emphasis        |
| `--accent`  | `#684084`      | `#C6A3EB`      | Links and accents    |
| `--gold`    | `#8C6523`      | `#E5C17D`      | Readable gold detail |

Illustrations also use brand lavender `#B99BDD`, deep plum `#573068`, dusty pink `#EAC1D7`, and soft gold `#D9B76E`. Those illustration colors are not automatically accessible text colors. Check foreground/background combinations, including hover, focus, disabled, and both theme states. Keep meaning available without color alone.

## Theme behavior

**Implemented:** [ThemeProvider](../src/theme/ThemeProvider.tsx) sets `data-theme` on the root element and stores `code-coven-theme` in browser localStorage. The initial fallback is Daylight; unavailable storage does not prevent switching. [ThemeToggle](../src/components/ThemeToggle.tsx) labels the destination theme. Theme and surface transitions are subtle; there is no scheduled theme change or system-preference synchronization.

**Proposed:** investigate initial-paint theme consistency or system preference only if needed. No implementation choice or migration is decided.

## Typography and information hierarchy

**Implemented:** system sans-serif for UI and supporting copy; Georgia/serif for major academy and card headings. There are no externally hosted fonts. Use semantic heading levels, actual labels, and familiar button/link text. Preserve readable line lengths and room for translated or enlarged text.

**Planned:** age-appropriate reading and instruction variants. The current visual system is not validated as a children's reading interface. Existing small labels deserve review at zoom and on phones before claiming suitability for all ages. Typography/accessibility improvements should be measured in the actual layout rather than assumed from a font choice.

## Reusable components and visual ownership

| Component / source                                                                                                   | Verified role                                                                             | Boundary                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Hexi](../src/components/Hexi.tsx), [local portrait](../src/assets/hexi.svg)                                         | Black familiar with lavender eyes/hat, alt text, optional message and replaceable artwork | Chief Bug Inspector; “Bugs fear me!”; expression prop is an extension point, not distinct implemented portraits |
| [MagicalScenery](../src/components/MagicalScenery.tsx)                                                               | Study backdrop and separate focal Hexi with placeholder caption                           | Use a local asset; do not replace Hexi with stock photography                                                   |
| [DepartmentCard](../src/components/DepartmentCard.tsx), [DepartmentArtwork](../src/components/DepartmentArtwork.tsx) | Seven linked destination concepts                                                         | Keep course associations and meaningful link names                                                              |
| [CourseCard](../src/components/CourseCard.tsx), [CourseIllustration](../src/components/CourseIllustration.tsx)       | Course metadata, illustration, optional labeled demo progress                             | A preview link is not an implemented lesson                                                                     |
| [HexiCorner](../src/components/HexiCorner.tsx)                                                                       | User-controlled rotating tips and encouragement                                           | No remote AI chat or automatic timer                                                                            |
| [DailyQuestCard](../src/components/DailyQuestCard.tsx)                                                               | Demo challenge/reward preview                                                             | Awards no XP                                                                                                    |
| [Artwork registry](../src/data/artwork.ts)                                                                           | Replacement image sources and placeholder flags                                           | Do not remove placeholder labels before approval                                                                |
| [Public shell](../src/layouts/PublicLayout.tsx), [student shell](../src/layouts/DashboardLayout.tsx)                 | Shared brand/navigation and dashboard sidebar                                             | Preserve usable controls across sizes                                                                           |

[ARTWORK.md](../ARTWORK.md) remains the authoritative asset handoff for missing art, dimensions, filenames, and replacement steps. Do not duplicate that inventory here. **Planned:** approved final environment illustrations and mascot artwork; no approval is implied by the existing concepts.

## Responsive and motion behavior

**Implemented:** desktop sidebar, collapsed expandable mobile navigation, stacking card grids, flexible public layouts, and small-screen styling. CSS includes width breakpoints at 1190, 960, 760, and 430 pixels, plus a wide-screen rule at 1400. These are current layout thresholds, not device guarantees; both stylesheets participate in the cascade.

Focus outlines, the skip link, main-landmark focus after routing, label associations, progress labels, and semantic controls are implemented. Tips use a polite live region. `prefers-reduced-motion` suppresses animations/transitions and hover transforms in the enchantment layer. There are no continuous heavy animations.

## Verification boundaries

The historical local checks in [DEPLOYMENT.md](../DEPLOYMENT.md) cover selected text contrast pairs, routes, keyboard interaction, reduced motion, and multiple viewport widths. They do not constitute a full accessibility audit. The [browser smoke check](../scripts/verify-browser.cjs) is available for future UI changes; [README](../README.md) describes how to run it.

**Planned:** broader keyboard/screen-reader testing, zoom/reflow review, and validation with each intended learner audience. Do not claim WCAG conformance or child-specific accessibility certification from the current checks.

## Maintenance

Update this guide and the relevant [feature entries](FEATURE_REGISTRY.md) when tokens, typography, themes, responsive rules, or reusable visual behavior changes. Record consequential tradeoffs in the [Decision Log](DECISION_LOG.md). Keep final-asset instructions in ARTWORK.md and deployment behavior in DEPLOYMENT.md.
