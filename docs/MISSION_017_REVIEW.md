# Mission 017 — Programming Fundamentals local review

Status: **Implemented locally; awaiting founder review.** No Mission 017 commit, push or deployment was performed. This phase implements only Programming Fundamentals. The remaining five course introductions remain Planned.

## Scope and starting point

The Living Blueprint (README, Academy Vision, Design System, Learning Architecture, Feature Registry and Decision Log), the Mission 017 planning outline and current curriculum were reviewed. The academy has seven departments/courses; Python Potions already contains Lessons 001/002. Programming Fundamentals previously had an empty module list. This phase raises introductory course coverage to two of seven locally; it does not complete the whole catalog.

The isolated checkout starts from the approved local Mission 016 commit `8ecdd450b2d0d43882abd0f90268d3172b6bebb0`. This records the local source baseline, not a claim that Mission 016 was deployed. The original development checkout and the Mission 016 checkout were not used as implementation destinations. Dependencies are local ignored files, with no dependency or lockfile changes.

## Lesson and six objectives

Course: **Your First Spell — Programming Fundamentals**. Lesson 001: **Thinking Like a Programmer**. Stable lesson ID: `programming-thinking-001`; module: `programming-thinking-basics`; content/specification: `1.0.0`.

1. Explain programming as writing instructions a computer can follow.
2. Recognize clear, precise instructions.
3. Explain that computers follow given rules rather than guess our intentions.
4. Put dependent steps in order: sequencing.
5. Break tasks into smaller parts: decomposition.
6. Recognize a simple mistake, correct it and check again: debugging.

Every experience has an introduction, six objectives, three instructional sections, a worked ordered example, three knowledge checks and three practical plans. Wrong answers explain what to reconsider. Plan hints are optional, retries are unlimited, and each final plan begins with a bug to repair. No timer, penalty, XP or completion shortcut is added.

| Experience | Teaching and practice |
|---|---|
| Little Apprentices | Short explanations; Hexi’s garden gate, lantern and bell adventure; numbered visual step cards and helpful hints. Optional grown-up reading support. |
| Junior Spellcasters | Algorithms in plain language; independent delivery/map plans and a badge-printer debugging task. |
| Adults | Computational thinking, explicit dependencies, decomposition and debugging; report, backup and receipt workflows. |
| AIs | Explicit finite task semantics; fictional record/summary pipelines; interactive checks and plans; versioned lesson data, strict requests, 24 deterministic sample records and downloadable current-session assessments. |

## Interaction, completion and safety

Native radio controls, labeled selects and ordinary buttons support keyboard use without drag gestures. Selected instructions also appear as wrapping text beneath each menu, keeping long options understandable on phones. Hints expose expanded state and controls IDs; feedback is textual in status regions. The lesson reuses existing themes, responsive layout, original Hexi and the completion component.

Completion requires all six activities to pass at least once. Four separate lesson/variant progress keys store only completed IDs and record/content versions. Reset removes only the current variant and clears its current forms/session checks. A plan’s Start Again button resets that form, retaining prior completion as disclosed. Restored celebrations are static; fresh completion has the existing reduced-motion-aware entrance. There is no automatic scroll/focus, audio, flashing or modal.

The checker compares a bounded array of known step IDs with the declared dependency order. It rejects missing, repeated, unknown and oversized inputs. It does not interpret arbitrary text, execute code, control a robot, call a model, expose a service or contact a Python executor. The schema rejects unknown versions, fields and permissions. JSON and displayed task descriptions are data, not tool instructions.

AI downloads contain the lesson, deterministic sample assessment records and optional in-memory records of up to 20 practical checks. Current-session records disappear on reload/navigation/reset and are never automatically sent or saved. This new AI workbench’s browser completion is explicitly local practice; it is not a retained AI learning history or trusted capability evidence. Existing Python AI behavior is unchanged.

## Fresh verification results

- Production build and TypeScript: passed.
- `pnpm test:thinking`: all 6 groups passed, including every possible permutation for each finite task, all 24 declared assessment cases, debugging starters, malformed/duplicate/hostile input, unlimited retry behavior, strict schema/request rejection and progress isolation.
- `pnpm test:lessons`: all 10 existing Lesson 001 tests passed.
- `pnpm test:variables`: all 8 existing Lesson 002 groups passed.
- `pnpm test:build`: all 6 production artifact/security-header tests passed.
- `pnpm check:format` and diff whitespace check: passed.
- `scripts/verify-thinking.cjs`: all four experiences; six activities each; unsuccessful/successful retries; hints; native keyboard behavior; gated celebrations, restoration and reset; minimal isolated storage; AI lesson/sample/session downloads; both themes at 375/768/1440 pixels; 200% root text; reduced motion; blocked storage; course/path links; no broken images, browser errors or external/executor requests. Existing Pages headers were simulated locally; this is not a deployed edge check.
- Existing `scripts/verify-lessons.cjs`, `scripts/verify-variables.cjs` and `scripts/verify-teaching.cjs`: passed against the new preview, including both Python lessons’ interaction/progress and Little’s teaching/celebration regressions.
- Existing Python lesson data, classroom pages, checkers/schemas/helpers, components, tests, artwork, security headers and relevant configurations were compared with the local Mission 016 baseline and are byte-identical. Shared route/course discovery and appended lesson-specific CSS are the intentional integration changes.

Optional browser tooling uses the existing separately installed Playwright/Chrome approach; no application dependency was introduced. Screenshots are ignored local artifacts under `artifacts/mission-017/`.

## Known limitations

These exercises assess stated finite dependency examples, not arbitrary natural-language plans or general mastery. Everyday workflows are intentionally simplified. Learners can edit/clear local completion; it does not update demo dashboard progress or synchronize accounts. The AI workbench is not an autonomous agent connection. Keyboard/reflow/selected semantic checks and visual review do not establish full WCAG conformance, screen-reader certification or learning effectiveness with each target audience. Phone option menus may visually abbreviate long text, so the full selection is repeated directly underneath.

## Next opportunities — not implemented

Within Programming Fundamentals: later lessons could introduce decisions, repeated steps, input/output and tracing more complex plans. The remaining course order is Web Enchantment → Cybersecurity Charms → Algorithm Alchemy → AI Fundamentals → Software Sorcery. Each needs a separately reviewed complete introduction; none was implemented by this phase. Preserve Python regression checks at each checkpoint.

## Exact changed files

The following is the complete Mission 017 application-checkout scope, relative to its local Mission 016 baseline. No generated build, dependencies, screenshots, private configuration, executor or future-course code is included.

- `README.md`
- `docs/ACADEMY_VISION.md`
- `docs/AI_INTEGRATION.md`
- `docs/DECISION_LOG.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/FEATURE_REGISTRY.md`
- `docs/LEARNING_ARCHITECTURE.md`
- `docs/MISSION_017_REVIEW.md`
- `package.json`
- `scripts/verify-thinking.cjs`
- `src/App.tsx`
- `src/components/lessons/SequencePractice.tsx`
- `src/data/curriculum.ts`
- `src/data/lessons/programming-thinking.ts`
- `src/data/lessons/programming-thinking.v1.json`
- `src/learning/thinking-schema.ts`
- `src/learning/thinking.ts`
- `src/pages/Explore.tsx`
- `src/pages/Learn.tsx`
- `src/pages/ThinkingLesson.tsx`
- `src/styles/lessons.css`
- `tests/thinking.test.ts`
