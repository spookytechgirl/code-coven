# Mission 008 · Local Review Notes

Status: Implemented pilot; founder review is complete and hands-on browser testing passed. No commit, push, or deployment performed by this mission.

## Delivered scope

One canonical objective — “Use Python's print() function to display text.” — serves the Kids, Adults, and AI/developer experiences. The existing Python course now contains one module and one canonical lesson, with two challenge tasks and audience-specific presentations. No other course is populated with placeholder lessons.

- Kids: Little/Junior difficulty choice, Hexi welcome, explanations/visual syntax parts, two knowledge checks per band, and guided/modification practice. Bands do not restrict access or request age.
- Adults: Python/execution/string/quotation/syntax explanations, highlighted copyable example, three knowledge checks, exact expected output, practice, and completion feedback.
- AIs: strict versioned lesson validation, downloadable lesson/evaluation/contract JSON, five deterministic sample tests, capability/error-feedback fields, and explicit no-execution/no-permission boundaries.
- Human progress: local completed-activity IDs only, isolated by lesson and variant, content-version checked, resettable, and safe on storage failure. Code/answers/names/ages are not stored. Dashboard demo numbers are untouched.

The website's existing visual system/artwork and all original routes are preserved. New classrooms use reusable controls and lazy-loaded pages. The only new runtime library is Valibot; Node type declarations support typechecking the native test suite.

## Preview

Start `pnpm dev` from the project root, or use `pnpm build` then `pnpm preview --port 4173 --strictPort`. See README for prerequisites and optional browser test tooling.

| Experience          | Route                                        |
| ------------------- | -------------------------------------------- |
| All three choices   | `/learn`                                     |
| Kids overview       | `/learn/kids`                                |
| Little Apprentices  | `/learn/kids/python/first-spell?band=little` |
| Junior Spellcasters | `/learn/kids/python/first-spell?band=junior` |
| Adults overview     | `/learn/adults`                              |
| Adults pilot        | `/learn/adults/python/first-program`         |
| AI overview         | `/learn/ai`                                  |
| AI specification    | `/learn/ai/python/output-fundamentals`       |

## Verification

- TypeScript, including the lesson tests: passed.
- Existing format checks, now including `tests/`: passed. No semantic lint configuration exists.
- Native lesson suite: 8 test groups passed, covering hierarchy/shared metadata, adaptations, checks, schema/evaluation outcomes, isolated progress/reset, corruption/staleness and storage failure.
- Existing distribution suite: all 6 tests passed.
- Production build: passed, with no build-size warnings; additional lesson pages are separate chunks.
- Existing production-browser regression suite: passed for original pages, navigation, search, filters, themes, mobile controls, keyboard/reduced motion, and asset loading.
- New production lesson-browser suite: passed for entry/navigation, both Kids bands, retries/explanations, practice, copy code, progress persistence/isolation/reset, AI download validation/no progress writes, storage failure, keyboard controls, and both themes at 375/768/1280/1440 pixels without horizontal overflow.
- Browser testing simulated the unchanged Pages security-header rule locally; no CSP/resource errors appeared. This was local testing, not a deployment.
- Documentation links, required feature/decision fields, formatting, and personal-path/credential-pattern checks reviewed. The checks do not establish full accessibility conformance or educational effectiveness.

## Remaining limitations

The Python checker recognizes one plain quoted print call and exact expected output. It does not execute code or accept every valid Python construct. Completion records can be edited/cleared by a browser owner and are not mastery/certification evidence. Previously completed tasks remain complete on return even though unsaved code/answers reset. There is no account sync, public agent API, registration, AI session retention, Python runtime, or remote learner data service. No XP/streak/reward mechanics were added to the Kids pilot. Broader curriculum, real audience evaluation, controlled execution, and trusted progression remain future work. Existing artwork is still labeled concept material.

For architecture and boundaries, see [Learning Architecture](LEARNING_ARCHITECTURE.md), [Feature Registry](FEATURE_REGISTRY.md), decisions D009–D012 in the [Decision Log](DECISION_LOG.md), and [AI Integration](AI_INTEGRATION.md). Code Coven retains Crystal's independent creative direction; reference projects receive no branding/private-resource permissions.

## Files created

- [docs/AI_INTEGRATION.md](../docs/AI_INTEGRATION.md)
- [scripts/verify-lessons.cjs](../scripts/verify-lessons.cjs)
- [src/components/lessons/LessonControls.tsx](../src/components/lessons/LessonControls.tsx)
- [src/data/lessons/python-output.ts](../src/data/lessons/python-output.ts)
- [src/data/lessons/python-output.v1.json](../src/data/lessons/python-output.v1.json)
- [src/learning/agent.ts](../src/learning/agent.ts)
- [src/learning/evaluate.ts](../src/learning/evaluate.ts)
- [src/learning/progress.ts](../src/learning/progress.ts)
- [src/learning/schema.ts](../src/learning/schema.ts)
- [src/learning/useLessonProgress.ts](../src/learning/useLessonProgress.ts)
- [src/pages/AiLesson.tsx](../src/pages/AiLesson.tsx)
- [src/pages/HumanLesson.tsx](../src/pages/HumanLesson.tsx)
- [src/pages/Learn.tsx](../src/pages/Learn.tsx)
- [src/styles/lessons.css](../src/styles/lessons.css)
- [src/types/learning.ts](../src/types/learning.ts)
- [tests/lessons.test.ts](../tests/lessons.test.ts)
- [This local review report](MISSION_008_REVIEW.md)

## Files modified

- [README.md](../README.md)
- [docs/ACADEMY_VISION.md](../docs/ACADEMY_VISION.md)
- [docs/DECISION_LOG.md](../docs/DECISION_LOG.md)
- [docs/DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md)
- [docs/FEATURE_REGISTRY.md](../docs/FEATURE_REGISTRY.md)
- [docs/LEARNING_ARCHITECTURE.md](../docs/LEARNING_ARCHITECTURE.md)
- [docs/REFERENCE_GUIDE.md](../docs/REFERENCE_GUIDE.md)
- [package.json](../package.json)
- [pnpm-lock.yaml](../pnpm-lock.yaml)
- [src/App.tsx](../src/App.tsx)
- [src/components/CourseCard.tsx](../src/components/CourseCard.tsx)
- [src/data/curriculum.ts](../src/data/curriculum.ts)
- [src/layouts/DashboardLayout.tsx](../src/layouts/DashboardLayout.tsx)
- [src/layouts/PublicLayout.tsx](../src/layouts/PublicLayout.tsx)
- [src/main.tsx](../src/main.tsx)
- [src/pages/Explore.tsx](../src/pages/Explore.tsx)
- [src/pages/Placeholder.tsx](../src/pages/Placeholder.tsx)
- [src/types/curriculum.ts](../src/types/curriculum.ts)
- [tsconfig.json](../tsconfig.json)
