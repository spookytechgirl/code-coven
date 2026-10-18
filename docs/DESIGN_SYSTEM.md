# Design System

Last reviewed: 2026-10-17 · Baseline: v0.3.0 + Mission 008/009 pilot + Mission 015 artwork-label cleanup

## Atmosphere and usability

**Implemented:** an enchanted academy setting using lavender architecture, warm lights, books, stars, wisteria, and Hexi alongside conventional navigation, search, cards, and a professional dashboard. The intention is cozy exploration without obscuring the learning task. Mission 015 explicitly retains the current illustrations and removes their temporary visitor-facing labels. This is approval to keep the existing pictures, not a redesign or a new illustration commission.

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

**Implemented:** separate Little Apprentice and Junior Spellcaster pilot instructions/activities. **Planned:** broader age-appropriate curriculum and learner validation. The current visual system is not validated as a children's reading interface. Existing small labels deserve review at zoom and on phones before claiming suitability for all ages. Typography/accessibility improvements should be measured in the actual layout rather than assumed from a font choice.

## Reusable components and visual ownership

| Component / source                                                                                                   | Verified role                                                                             | Boundary                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [Hexi](../src/components/Hexi.tsx), [local portrait](../src/assets/hexi.svg)                                         | Black familiar with lavender eyes/hat, alt text, optional message and replaceable artwork | Chief Bug Inspector; “Bugs fear me!”; expression prop is an extension point, not distinct implemented portraits |
| [MagicalScenery](../src/components/MagicalScenery.tsx)                                                               | Study backdrop and separate focal Hexi without a temporary caption                           | Use a local asset; do not replace Hexi with stock photography                                                   |
| [DepartmentCard](../src/components/DepartmentCard.tsx), [DepartmentArtwork](../src/components/DepartmentArtwork.tsx) | Seven linked destination concepts                                                         | Keep course associations and meaningful link names                                                              |
| [CourseCard](../src/components/CourseCard.tsx), [CourseIllustration](../src/components/CourseIllustration.tsx)       | Course metadata, illustration, optional labeled demo progress                             | Python Potions, Programming Fundamentals, Web Enchantment, Cybersecurity Charms, Algorithm Alchemy and AI Fundamentals link to implemented lessons; Software Sorcery remains a preview                               |
| [HexiCorner](../src/components/HexiCorner.tsx)                                                                       | User-controlled rotating tips and encouragement                                           | No remote AI chat or automatic timer                                                                            |
| [DailyQuestCard](../src/components/DailyQuestCard.tsx)                                                               | Demo challenge/reward preview                                                             | Awards no XP                                                                                                    |
| [Artwork registry](../src/data/artwork.ts)                                                                           | Local image sources and artwork descriptions                                           | Mission 015 authorizes label removal; preserve current artwork                                                                |
| [Public shell](../src/layouts/PublicLayout.tsx), [student shell](../src/layouts/DashboardLayout.tsx)                 | Shared brand/navigation and dashboard sidebar                                             | Preserve usable controls across sizes                                                                           |

[ARTWORK.md](../ARTWORK.md) records current artwork ownership, the removed-label inventory, and optional future asset guidance. Mission 015 explicitly retains the current study, departments, courses, and Hexi. Any future replacement requires separate direction; do not replace the pictures as part of label cleanup.

## Responsive and motion behavior

**Implemented:** desktop sidebar, collapsed expandable mobile navigation, stacking card grids, flexible public layouts, and small-screen styling. CSS includes width breakpoints at 1190, 960, 760, and 430 pixels, plus a wide-screen rule at 1400. These are current layout thresholds, not device guarantees; both stylesheets participate in the cascade.

Focus outlines, the skip link, main-landmark focus after routing, label associations, progress labels, and semantic controls are implemented. Tips use a polite live region. `prefers-reduced-motion` suppresses animations/transitions and hover transforms in the enchantment layer. There are no continuous heavy animations.

## Mission 008 classroom components

**Implemented:** [Learning entry and path overviews](../src/pages/Learn.tsx) reuse destination artwork and academy cards without redesigning existing pages. [HumanLesson](../src/pages/HumanLesson.tsx) supplies shared objectives, Kids band selection, local activity progress, and pathway navigation. [LessonControls](../src/components/lessons/LessonControls.tsx) provides syntax-highlighted examples, copy status, native radio knowledge checks, labeled code textareas, and educational feedback. [AiLesson](../src/pages/AiLesson.tsx) presents data downloads and sample evaluations. [Lesson styles](../src/styles/lessons.css) reuse existing tokens and respect existing reduced-motion rules.

Human activities use fieldsets/legends, real buttons, associated labels, and polite status messages. Output and correctness are explained in text, not color alone. The sidebar becomes an in-flow progress summary at narrower widths. Completion is resettable and not tied to streaks or rewards. Neither kid band restricts access or requests age. Existing mascot/environment artwork is preserved; Mission 015 removes temporary artwork labels without changing classroom behavior.

## Verification boundaries

The historical local checks in [DEPLOYMENT.md](../DEPLOYMENT.md) cover selected text contrast pairs, routes, keyboard interaction, reduced motion, and multiple viewport widths. They do not constitute a full accessibility audit. The [browser smoke check](../scripts/verify-browser.cjs) is available for future UI changes; [README](../README.md) describes how to run it.

**Planned:** broader keyboard/screen-reader testing, zoom/reflow review, and validation with each intended learner audience. Do not claim WCAG conformance or child-specific accessibility certification from the current checks.

## Maintenance

Update this guide and the relevant [feature entries](FEATURE_REGISTRY.md) when tokens, typography, themes, responsive rules, or reusable visual behavior changes. Record consequential tradeoffs in the [Decision Log](DECISION_LOG.md). Keep final-asset instructions in ARTWORK.md and deployment behavior in DEPLOYMENT.md.

## Mission 009 · Hexi's teaching feedback and celebration

**Implemented, Little Apprentices Lesson 001 only:** short, familiar, encouraging feedback with one actionable correction at a time. [Teaching copy](../src/data/lessons/little-apprentice-teaching.ts) supplies child-specific knowledge-check and practice messages. [Feedback presentation](../src/learning/feedback.ts) maps the unchanged checker's outcome to a likely next step; it never decides whether an answer passes. Junior/Adults retain their existing richer explanations.

**Age-appropriate feedback:** match presentation to developmental needs. Name the thing to change, avoid shame and unnecessary jargon, and allow unlimited retries. For a missing quote, explain where the matching marks belong. For missing parentheses, call them round brackets and show `( and )`. More complex unsupported input gets one clear instruction to try the short example, not an invented comprehensive Python diagnosis.

**Celebration without manipulation:** [CompletionCelebration](../src/components/lessons/CompletionCelebration.tsx) is a reusable card with configurable title, Hexi message, achievement text, review link, and return route. Lavender/dusty-pink surfaces, readable plum/cream text, gold decoration, static stars, and existing Hexi artwork recognize three genuinely completed local activities. “First Spell Cast!” is a local recognition label, not XP, a stored badge ledger, a streak, a deadline, or a reason to pressure a learner to return.

A fresh completion gets a single 450 ms fade/small rise. A restored completion is static; review and repeated correct submissions do not replay the animation. Reset then explicitly completing the activities again can celebrate again. Reduced-motion preference disables the animation. There is no flashing, audio, modal, automatic scrolling, or forced focus on completion. The existing Hexi image is preserved unchanged, including under Mission 015.

**Educational transparency:** retain a brief separate practice notice: “This is guided practice. It checks your written spell. It does not run Python.” Do not bury this clarification, but keep it outside the main celebration so the celebration stays warm. Older learners retain the original fuller explanation.

A persistent polite, atomic status region announces the completion title/recognition on a state change. The card is a labeled section, decorative stars are hidden from assistive technology, and Review This Lesson targets a focusable lesson heading without clearing progress. Return to Learning Path uses the real Kids path; no nonexistent second lesson is linked. Automated checks verify these semantics and keyboard behavior, not actual listening with every screen reader or educational effectiveness with children.

## Mission 016 · The Variable Vault

**Implemented locally:** existing classroom cards, palette, code examples, keyboard controls, Hexi artwork, progress sidebar, and completion component serve Lesson 002. No illustration, theme token, grid, or breakpoint was redesigned. Little's instructions stay short; checker limits are placed in native expandable details beneath an always-visible notice that Python does not run. Hints use real buttons with `aria-expanded`/`aria-controls`, inputs have associated labels, and feedback uses status regions with line hints where available.

Six shared objectives have plain-language Little labels. Examples explain that assignments print nothing and each print shows the current value. Completion is gated on all six activities, announced politely, and static on restore. The existing reduced-motion CSS also applies to the new celebration. Browser checks are evidence for the tested sizes and interactions, not a full screen-reader or learning-effectiveness certification.


## Mission 017 · Accessible sequencing practice

**Implemented locally:** numbered step cards and native labeled selects provide a language-neutral lesson within the existing classroom. Each selected instruction is repeated as wrapping text beneath the menu so a long option remains readable on narrow screens. A worked ordered example supplies visual guidance alongside text; no drag-only interface, new illustration, palette, breakpoint or Hexi appearance is introduced.

Native keyboard menus, fieldsets/legends, button-controlled hints with expanded state, polite feedback and the existing gated completion card support all four experiences. No timed tasks, modal celebration, forced focus or punitive retry limits are added. A review link returns to the focusable lesson heading; progress reset clears only the current lesson/experience. Existing reduced-motion and Daylight/Midnight rules apply. Browser evidence covers 375/768/1440 widths and 200% text, not a formal accessibility certification or target-age reading validation.


## Mission 017B · HTML building blocks and safe text model

**Implemented locally:** existing cards, tokens, themes and layout support a new HTML lesson without new artwork or a redesign. Little learners choose opening/closing tags and short text in stacked numbered blocks. Their generated source is displayed as escaped code text. Junior/Adult/AI learners use labeled textareas; Tab exits normally. Hints have expanded state, feedback is polite textual status and full-lesson reset uses the existing progress policy.

A successful check displays only a fixed heading/paragraph text model (and optional tab-title text). It is explicitly a simplified model, not a browser sandbox or submitted HTML rendering. The preview uses scoped heading styling without adding a second page-level h1; no learner-provided markup, style or URL is inserted. Long source wraps; cards stack on mobile. Little feedback is short and actionable, while older learners can expand checker limitations. Original Hexi and its gated/reduced-motion celebration are reused.

Verify keyboard, labels, both themes, reflow, enlarged text, images and reduced motion with the [browser checks](../scripts/verify-html.cjs). These checks and visual review do not certify WCAG conformance, screen-reader experience or age-specific learning effectiveness.


## Mission 017C · Guardian message cards

**Implemented locally:** the existing classroom uses three numbered reminder cards (pause, protect keys, ask for backup) and fictional message cards with a local Lucide mail icon. Original illustrations and Hexi’s appearance are unchanged. Text identifies fictional senders, inert addresses and nonexistent attachment descriptions; no simulated message contains a live action link.

Two labeled native radio groups per practical task separate classifying the evidence from choosing a defensive response. Button hints expose expanded state, feedback is in polite status regions and reset controls follow existing policies. The Little pathway uses shorter copy and trusted-adult guidance; the older variants add detail without time pressure. The static storyboard stacks at the existing mobile breakpoint. Both themes, wrapping addresses, enlarged text, reduced motion and the original gated celebration are covered by browser checks, not a full accessibility certification.


## Mission 017D · Recipe menus and a glowing potion

**Implemented locally:** [AlgorithmPractice](../src/components/lessons/AlgorithmPractice.tsx) uses labeled native menus, fieldsets/legends, wrapping selected-choice text, optional hints and polite feedback. No drag-only interaction or child code input. Static water/moon/leaf/star ingredient symbols accompany text labels; emoji appearance may vary by device. This is interface decoration, not replacement academy or Hexi art.

[AlgorithmLesson](../src/pages/AlgorithmLesson.tsx) reuses the existing progress and completion components. All six activities gate “The Alchemist’s First Potion,” a small static flask/star reward with a one-time 1.2-second glow on fresh completion. Restored completion is static; reduced motion disables the glow and the shared card entrance. No audio, flashing, forced focus, account reward ledger or new persisted fields. Native controls, both themes and responsive wrapping use existing tokens. Automated semantics/layout checks and visual spot review do not certify screen-reader performance or reading suitability.

## Mission 017E · Fictional machines and a first spark

**Implemented locally:** three small text-and-symbol machine cards explain written rules, learned classification and generated content. [IntelligencePractice](../src/components/lessons/IntelligencePractice.tsx) uses labeled native menus, wrapping choice text, visible fictional evidence, a fieldset/legend, optional hints and polite feedback. No new illustration, Hexi appearance, drag-only requirement, code editor or free-text/private-data field.

All six activities gate the original Hexi card and “The Familiar’s First Spark,” a lavender-accented spark symbol with a brief 1.2-second glow. Reduced motion disables animation; restored completion is static. No flashing, sound, modal, forced focus or persistent reward ledger. Existing themes/tokens and responsive classroom layout remain. Actual assistive-technology listening and age-specific reading evaluation remain outstanding; automated semantics and screenshots are not accessibility certification.
