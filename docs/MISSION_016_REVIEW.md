# Mission 016 — The Variable Vault

Date: 2026-10-17 · Status: Implemented locally, awaiting founder review. No Mission 016 commit, push, deployment, or production change.

## Local scope and preview

Work is isolated in a separate checkout based on the local Mission 015 commit `933b3dc749fa9bf47ed8ad975e645ab5965ac04a`. The original Code Coven/Potion Lab development checkout and the approved Mission 015 checkout were not edited. This baseline does not contain the unpublished executor; none of its files were imported. Publication status of Mission 015 is not inferred from using that local baseline.

Preview root: http://127.0.0.1:4192/ while the local production-preview process is running. To restart, install with the frozen lockfile, run `pnpm build`, and then `pnpm preview --port 4192 --strictPort`. No app credentials are required.

| Pathway | Local route | Activities |
| --- | --- | --- |
| Little Apprentices | `/learn/kids/python/variable-vault?band=little` | Three knowledge checks and three guided quests |
| Junior Spellcasters | `/learn/kids/python/variable-vault?band=junior` | Three knowledge checks and three quests with more independent writing |
| Adults | `/learn/adults/python/variable-vault` | Four knowledge checks and two independent inventory/reassignment tasks |
| AI | `/learn/ai/python/variable-vault` | Versioned JSON, four structured tasks, 20 deterministic cases, and downloadable assessment records |

Lesson 002 is discoverable from all three path overviews, Lesson 001 next-lesson links, and the Python course's second module. Prerequisite references recommend Lesson 001 but do not lock access. Existing routes remain valid.

## What is implemented

Six canonical objectives cover variable meaning, assignment with =, strings/integers, printing variables, reassignment, and simple naming rules. The Little adaptation uses short labeled-box explanations, guided starter code, familiar Hexi hints, and plain-language goals. Junior and Adults explain case sensitivity, snake_case, quoting a value versus quoting a name, and statement order. The box metaphor is explicitly distinguished from Python's name-to-object model.

Every human adaptation has six activities, unlimited retries, on-demand hints, and the existing Hexi completion card after all six have passed. Completion uses existing browser-only storage, isolated by lesson and variant. No names, ages, answers, source, timestamps, XP, account synchronization, or trusted mastery evidence are added. Reset affects only the current Lesson 002 variant and clears its current forms. Restored completion is static; fresh completion uses the existing reduced-motion-aware entrance. Review and return controls use real routes.

The AI pathway follows the existing versioned/strict-schema, pure local assessment pattern. Lesson/content/specification identities and expected outputs are explicit. Downloaded records contain feedback, task/checker versions, expected/inferred output, and `executed: false`. They are sample records, not real agent identities, API responses from a remote service, or evidence of retained learning.

## Safe checker and Potion Lab boundary

The checker is a small bounded text model, not a Python interpreter. It recognizes literal assignments and one `print(variable)` per line. It checks the task's required types and statement shape, so direct literal printing or using two different names cannot bypass a reassignment task.

- Maximum 500 characters and 12 lines.
- ASCII names up to 40 characters; Python keywords and shadowing `print` are rejected for these tasks.
- Plain single/double-quoted strings without escapes; integers from -9999 to 9999.
- No imports, loops, expressions, comments, additional calls, prompts, indented blocks, or code evaluation.
- Unsupported valid Python is explicitly described as a checker limitation.
- Source is never executed, sent to an executor, or persisted.

The original print checker, Lesson 001 schemas/agent evaluator, progress helpers, security headers, lockfile, runtime/build configuration, Hexi, and original illustration files are unchanged. The shared CodeExample gets an optional output explanation; its old default remains intact. No security architecture, executor/worker dependency, bridge, iframe, or external service is introduced.

Versioned examples and expected outputs can support a future separately authorized Potion Lab adapter. This mission provides no such runtime integration. The unfinished executor must remain separate and unpublished.

## Verification completed

| Check | Result |
| --- | --- |
| Production build / TypeScript | Passed |
| Formatting | Passed |
| Existing Lesson 001 unit suite | 10 tests passed |
| Variables unit suite | 8 test groups passed, including all 20 declared cases, restricted grammar, meaningful task-shape checks, hints/retries, strict requests, and progress isolation/storage failures |
| Distribution/build suite | 6 tests passed |
| Existing classroom browser regression | Passed: Kids/Adults/AI, feedback, clipboard/downloads, persistent progress/reset, blocked storage, keyboard, motion, themes/reflow, and local CSP simulation |
| Existing Little teaching/celebration browser regression | Passed: hint accuracy, original pass criteria, retries, gating, fresh-only animation, return/reset, older variants, and local CSP simulation |
| New variables browser regression | Passed: all human variants, retries, hints, keyboard, completion/reload/reset, minimal storage, actual AI download, both themes, reflow, reduced motion, 200% root text-size check, blocked storage, local CSP simulation, and no browser errors |
| Direct Browser route/layout review | 12 classroom/overview URLs at 375, 768, and 1440 pixels in both themes: 72 checks, no page-wide overflow or broken loaded images |
| Manual practice/completion review | All three human variants reached 6/6; wrong attempts did not advance progress; Junior reset retained Little completion; reload restored a static Little card |
| AI downloads inspected | Actual downloaded lesson had six objectives; assessment file had 20 records, all with no execution |
| Executor boundary | Automated browser requests remained local to the preview; no executor or external requests observed |
| Preservation / scope | Original artwork, print checker/contracts/progress, security headers, lockfile, and runtime configurations match the baseline; no executor directories imported |

The separate headless browser initially required permission to launch its temporary Chrome test profile. An initial new regression run also exposed a test-selector ambiguity between native disclosure groups and knowledge-check fieldsets; the selector was narrowed before the passing run. These were testing-environment/harness issues, not changes to the lesson's security policy.

## Limitations and remaining review

- These are guided text assessments, not real Python execution or a general Python parser. Expressions, aliases, Unicode names, large numbers, and many other valid programs are intentionally unsupported.
- Completion remains browser-local and editable; it is not an account record or proof of mastery.
- AI exercises provide deterministic samples and data, without an agent connection or permanent-learning claim.
- Actual classroom effectiveness, child reading/support needs, and listening tests with screen-reader users still require human review. Tested semantics, keyboard behavior, reflow, and reduced motion are not a full accessibility certification. The text-size test is not a claim of browser-zoom testing.
- Future real-executor integration and publication require separate founder approval. The tests simulate existing Pages headers locally; no production or Cloudflare edge checks were performed.

## Exact changed files

Relative to the Mission 015 baseline: **26 files**, with no changes staged.

| File | Change |
| --- | --- |
| `README.md` | Lesson 002 entry points, scope, limitations, and test instructions |
| `docs/ACADEMY_VISION.md` | Record the second approved local lesson and unchanged wider goals |
| `docs/AI_INTEGRATION.md` | Variables data/request/assessment contract and no-execution boundary |
| `docs/DECISION_LOG.md` | D016 decision, alternatives, and tradeoffs |
| `docs/DESIGN_SYSTEM.md` | Reused classroom UI, short copy, hints/disclosures, and accessibility boundaries |
| `docs/FEATURE_REGISTRY.md` | Update current lesson scope and add F37 |
| `docs/LEARNING_ARCHITECTURE.md` | Module, checker subset, progression, and future executor boundary |
| `docs/MISSION_016_REVIEW.md` | This implementation and QA record |
| `package.json` | Add `test:variables` script only; no dependency changes |
| `scripts/verify-variables.cjs` | Reproducible optional browser regression |
| `src/App.tsx` | Three lazy-loaded Lesson 002 routes and titles |
| `src/components/lessons/LessonControls.tsx` | Optional example-output notice with unchanged Lesson 001 default |
| `src/components/lessons/VariablePractice.tsx` | Bounded text-practice form, accessible hint toggle, and feedback |
| `src/data/curriculum.ts` | Register the variables module/lesson |
| `src/data/lessons/python-variables.ts` | Human adaptations, curriculum adapter, routes, and celebration copy |
| `src/data/lessons/python-variables.v1.json` | Versioned canonical objectives, examples, tasks, and 20 cases |
| `src/learning/variables-agent.ts` | Pure validated local assessment and sample records |
| `src/learning/variables-schema.ts` | Strict variables lesson/request schema |
| `src/learning/variables.ts` | Bounded literal-assignment/variable-print checker and hints |
| `src/pages/AiLesson.tsx` | Add Lesson 002 navigation only |
| `src/pages/AiVariableVault.tsx` | AI lesson and JSON/record downloads |
| `src/pages/Explore.tsx` | Explain the two available lessons in Python course preview |
| `src/pages/HumanLesson.tsx` | Add audience/band-preserving Lesson 002 navigation only |
| `src/pages/Learn.tsx` | Lesson 002 links and two-lesson availability copy |
| `src/pages/VariableVault.tsx` | Human classroom, objectives, activities, progress, reset, and celebration |
| `tests/variables.test.ts` | Content, grammar, schema, security-boundary, retry, and progress tests |

Generated dependencies, production output, browser artifacts, and external review screenshots/data are excluded from Git. The Living Blueprint is updated alongside this implementation. Nothing has been committed, pushed, or deployed for Mission 016.
