# Mission 017D — The Alchemist’s Recipe

Date: 2026-10-18. **Status: Implemented locally; awaiting founder review.** No commit, push, deployment or Mission 017E implementation.

## Isolation and baseline

GitHub main was verified to include Mission 017C at `f871ce4bb3c4b47d7cf2f7472f08dc8cb1c9ff2f` before cloning this separate Mission 017D checkout. No original development repository, unfinished Potion Lab, earlier release checkout or synced source was edited. This establishes a GitHub source baseline, not new Cloudflare production verification.

Course hierarchy: library → library-path → algorithm-alchemy → algorithm-recipe-basics → algorithm-recipe-001. Introductory coverage is five of seven existing courses. AI Fundamentals and Software Sorcery remain Planned; Mission 017E has not started. Other Algorithm Alchemy catalog lessons remain planned, and its existing Intermediate catalog label is preserved even though this first lesson is introductory.

## Preview and pathways

Start with `/courses/algorithm-alchemy` on the local preview at http://127.0.0.1:4198.

| Experience | Route |
|---|---|
| Little Apprentices | `/learn/kids/algorithms/first-recipe?band=little` |
| Junior Spellcasters | `/learn/kids/algorithms/first-recipe?band=junior` |
| Adults | `/learn/adults/algorithms/first-recipe` |
| AIs | `/learn/ai/algorithms/first-recipe` |

To restart: install the frozen dependencies, run `pnpm build`, then `pnpm preview --port 4198 --strictPort`. No account, environment secret or paid service is required.

## Six objectives and progression

1. Explain an algorithm as a clear finite plan with a goal.
2. Explain dependent ordering of steps.
3. Recognize repeated instruction patterns.
4. Trace both outcomes of IF/ELSE.
5. Repeat an entire group a bounded number of times, then stop.
6. Remove unnecessary steps while preserving the intended result.

Thinking Like a Programmer is recommended background, not an enforced prerequisite. This lesson moves beyond its sequencing/decomposition/debugging focus: learners omit an unnecessary operation, trace both condition outcomes and identify a loop’s group/count/output. Fewer written instructions are explicitly distinguished from fewer operations; a loop can shorten notation without reducing work. Real safety and validation checks must not be discarded merely because they repeat.

## Four experiences and activities

Every experience contains six guided sections, three knowledge checks and three practicals. Hints and incomplete/incorrect/correct feedback permit unlimited retries without penalty or a timer.

| Experience | Differentiation |
|---|---|
| Little | “Help Hexi Brew His First Potion!” Short explanations, water/moon/leaf/star symbols with text labels, menus for recipe order, blue/green decisions and repeated pairs. No code writing or dragging. All ingredients and actions are pretend. |
| Junior | Potion algorithms with input/output explanations, simple pseudocode, both conditional branches, repeated pairs and redundant-step reasoning. |
| Adults | Realistic parcel workflow under an explicit already-verified unchanged-address assumption; express/standard branching; repeated A/B label batches. Magical examples remain alongside practical ones. No advanced complexity mathematics. |
| AIs | Strict versioned objectives, explicit task kinds, finite options, ordered response slots, expected outputs/explanations and deterministic sample/session records. No unrestricted agent execution. |

The three practicals assess:

- **Recipe:** select three required operations in dependency order from four options, omitting the stated unnecessary operation. Duplicate, reversed, missing or irrelevant operations cannot pass.
- **Branch:** select the correct response for both true and false inputs. Both must be right; selecting both actions is not a valid branch.
- **Loop:** identify the smallest supplied repeated unit, choose three iterations and select the exact six-item output. Each component must be right; counting items instead of groups does not pass.

## Progress, reset and celebration

Existing `useLessonProgress` and local progress contracts are reused unchanged. Only completed IDs and record/content versions may persist, separately for lesson and variant. Answers, names, ages and assessment records are not saved or sent. The demo dashboard remains unrelated.

Individual-activity reset clears its choices/hint/feedback and preserves previously earned completion, consistent with disclosed existing semantics. Whole-lesson reset clears the current variant’s progress, choices and in-memory session records; other lessons/variants retain their completion. Storage failure is explained without blocking learning.

All six activities gate the existing original-Hexi completion card plus “The Alchemist’s First Potion,” a small flask/star reward with an accessible name. A single 1.2-second glow accompanies fresh completion; restored completion is static and reduced motion disables animation. The reward has no account, stored badge ledger, external dependency, purchase, flashing, audio, modal, forced scroll or focus. Review returns to a focusable lesson heading; return navigation uses the real course selector.

## Versioned AI contract

Specification/content **1.0.0**, checker **fixed-algorithm-trace-v1**. Requests contain exactly specificationVersion, contentVersion, lessonId, taskId and answers (at most three bounded choice IDs). Strict Valibot validation rejects unknown fields, permissions, source/credential payloads, unsupported versions and unknown tasks. Invalid or unsupported choices cannot pass.

There are **48 deterministic cases** across twelve practicals: correct, first-slot mismatch, last-slot mismatch and incomplete per task (12 passes, 36 failures). The AI page displays its twelve cases; the lesson/sample downloads include all 48. Every record carries expected output/explanation and `executed:false`, `actionsPerformed:false`. Native exhaustive combination tests additionally cover each supplied recipe, branch and loop choice.

Three JSON downloads provide lesson data, sample assessments and current-session practical records. Session records are capped at 20, live only in memory, and clear on reload/navigation/full reset. Browser completion does not represent an external AI’s retained learning or authenticated capability.

## Safety boundary and preservation

This is finite educational choice comparison, not an interpreter, optimizer, real recipe or general algorithm grader. Pseudocode and user choices are inert React text. No arbitrary student code is accepted or executed. No OS access, agent tools, Python executor, account connection, personal-data field or paid service is introduced. No real potion ingredients are needed.

All 93 tracked baseline files outside this change scope were verified byte-for-byte against Mission 017C. Original Hexi, artwork, earlier lesson implementations/data/checkers, shared lesson/progress/celebration helpers, dependencies/lockfile, security headers and deployment configuration remain unchanged. Three older native test files only recognize the fifth populated course and remove Algorithm Alchemy from the empty-course assertion; existing lesson assertions are retained. A scoped recognized-credential-pattern scan found no matches; it is not a universal secret guarantee.

## QA evidence

Native checks pass: Algorithms 7, Shield 8, HTML 8, Thinking 6, Python output 10, Variables 8 and distribution 6 — **53 total test groups**. Production build includes TypeScript; formatting and whitespace checks pass. The new evaluator checks all supplied choice combinations, repeats, malformed/hostile/oversized inputs, version/schema boundaries and isolated progress.

The new browser suite exercises all four variants: objectives/activity counts; empty/incorrect/correct attempts; every practical field; keyboard menus and hints; completion gating; individual/global reset; reload/static restoration; cross-lesson/variant isolation; minimal storage; all three downloads and session cap; blocked storage; course/path entry links; intact artwork; and no external/account/executor requests or browser errors. Existing lesson suites cover Python Lessons 001/002, Programming Fundamentals, Web Enchantment and Cybersecurity Charms. Final run outcomes and logs accompany the local review handoff.

Responsive checks cover all four variants in both Daylight and Midnight at 375/768/1440 widths, 200% root-text enlargement and reduced motion. Mobile practice/reward and desktop screenshots were visually spot-reviewed. Local browser responses simulate the existing Pages headers; they do not verify a deployed Cloudflare edge.

During test authoring, the new hint assertion initially searched for “Show hint” after activation had correctly renamed it “Hide hint.” The test locator was corrected; no application fix was required. Older native curriculum assertions were updated to reflect the newly implemented fifth course. These resolved test-expectation changes do not weaken lesson correctness checks.

Final stable-build browser run: Algorithms, Shield, HTML, Thinking and Variables reported PASS and exited 0. Python Lesson 001 reported PASS for all assertions but its process remained running for over five minutes and was stopped (exit -15). An earlier run of that unchanged suite exited 0. This is an unresolved browser-test process-cleanup limitation; it is not a classroom-load timeout or a demonstrated learner-facing failure. No load timeout recurred in the final runs. Do not describe the final Python run as a clean exit.

## Limitations and future opportunities

- Fixed supplied plans only; alternative valid algorithms and independent free-form pseudocode are not graded. Adult plan design chooses/reorders bounded operations.
- No code, pseudocode, actual potion, real parcel or label printing is executed. Outputs are authored trace expectations, not runtime results.
- Emoji/symbol appearance varies with platform; labels retain meaning. This is a small interface reward, not newly generated artwork.
- Real target-age learner evaluation, VoiceOver/NVDA listening, browser zoom and a formal WCAG/contrast audit remain outstanding. Automated semantic/reflow checks do not establish conformance or learning effectiveness.
- Local progress is editable and not authenticated mastery. Session records are not retained or synchronized.
- Later Algorithm Alchemy opportunities are Proposed: more than one valid plan under explicit constraints, nested conditions/loops, searching/sorting and empirical efficiency comparisons. None is implemented here; Mission 017E is not started.

## Release isolation recommendation

After founder review, clone official GitHub main into a new release folder, verify the reviewed baseline and copy only the exact files below. Rebuild and rerun the relevant tests; compare source/production hashes and protected files. Stop on drift or extra files. Prepare a separate release manifest before seeking publication approval. Do not copy node_modules, dist, browser artifacts, local tooling, this operator’s external review packet or any original Potion Lab work into a source commit. No commit, push or deploy is authorized by this local implementation report.

## Exact changed files

- `README.md`
- `docs/ACADEMY_VISION.md`
- `docs/AI_INTEGRATION.md`
- `docs/DECISION_LOG.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/FEATURE_REGISTRY.md`
- `docs/LEARNING_ARCHITECTURE.md`
- `docs/MISSION_017D_REVIEW.md`
- `package.json`
- `scripts/verify-algorithms.cjs`
- `src/App.tsx`
- `src/components/lessons/AlgorithmPractice.tsx`
- `src/data/curriculum.ts`
- `src/data/lessons/algorithm-recipe.ts`
- `src/data/lessons/algorithm-recipe.v1.json`
- `src/learning/algorithm-schema.ts`
- `src/learning/algorithm.ts`
- `src/pages/AlgorithmLesson.tsx`
- `src/pages/Explore.tsx`
- `src/pages/Learn.tsx`
- `src/styles/lessons.css`
- `tests/algorithms.test.ts`
- `tests/html.test.ts`
- `tests/shield.test.ts`
- `tests/thinking.test.ts`
