# Mission 017F — The Software Spellbook

Date: 2026-10-18. **Status: Implemented locally; awaiting founder review.** No staging, commit, push or deployment.

## Baseline, isolation and curriculum status

GitHub main was verified to include Mission 017E at `b39c8b5ed040ab380de1a28170cf0e13435c7215` before a separate local checkout was cloned. Original development, unfinished Potion Lab, prior releases and synced sources were not modified. This is source-baseline verification, not a new live Cloudflare deployment claim.

Hierarchy: sanctum → sanctum-path → software-sorcery → software-project-basics → software-spellbook-001. This is the final introductory classroom in the Great Classroom Awakening: all seven existing courses now have at least one introduction locally, eight individual lessons total. Software Sorcery is **not publicly released by this mission**. The existing Advanced catalog label is preserved; this first lesson is explicitly introductory and has no prerequisite gate.

[Current curriculum inventory](LEARNING_ARCHITECTURE.md#mission-017f--current-introductory-inventory) distinguishes baseline lessons from this local addition. Most of the planned 127-lesson catalog remains unimplemented. Completing introductory coverage does not complete the curriculum, execution platform or trusted capability progression.

## Working local preview

Course selector: http://127.0.0.1:4202/courses/software-sorcery

| Experience | Route |
|---|---|
| Little Apprentices | `/learn/kids/software/first-spellbook?band=little` |
| Junior Spellcasters | `/learn/kids/software/first-spellbook?band=junior` |
| Adults | `/learn/adults/software/first-spellbook` |
| AIs | `/learn/ai/software/first-spellbook` |

To restart: frozen dependency install, `pnpm build`, then `pnpm preview --port 4202 --strictPort`. No credentials, external accounts or paid tools.

## Six shared objectives

1. Explain software and the user problems applications help solve.
2. Turn a need into clear, checkable requirements.
3. Describe the iterative Plan → Build → Test → Improve → Release cycle.
4. Divide an app into manageable components with clear responsibilities.
5. Explain testing, debugging and feedback as ways to check and improve behavior.
6. Explain version control, collaboration and reviews.

This course goes beyond Programming Fundamentals’ instruction/sequencing focus. Its unit is a maintained project: user needs, feature scope, responsibilities, dependencies, quality evidence and teamwork. Every experience includes six guided sections, three knowledge checks and three practical activities, helpful hints/feedback, unlimited retries, local progress/reset and original-Hexi celebration.

## Four experiences

| Experience | Teaching and practice |
|---|---|
| Little | “Help Hexi Build the Great Goblin Treat Tracker!” Short story clues, five visual workflow cards, useful features for saving/finding treat boxes, clear app-part jobs and a pretend wrong-box bug. No real code required. |
| Junior | Requirements and small first versions, components/dependencies, iterative workflow, defect investigation, test coverage, user feedback and Git snapshots/review without GitHub accounts. |
| Adults | Fictional workplace equipment tracker; functional/nonfunctional requirements, MVP, modular design, acceptance behavior, testing/QA/debugging, Git/collaboration/review, maintenance and iteration. |
| AIs | Explicit versioned requirements, missing-information clarification, decomposition/dependencies, defect/test selection and truthful status reporting from supplied evidence. No generated commands or repository actions. |

### Three practical activities per experience

- **Requirements:** choose save/find as the useful core scope, keyboard usability as a quality requirement, and clarification of unspecified missing-item behavior. Do not invent an agreed requirement or request real records.
- **Components:** assign screen/storage/lookup responsibilities, recognize that lookup depends on saved data, and select an iterative workflow that includes retesting before release.
- **Debugging:** identify the first-record lookup defect, choose requested-name matching, select tests for both known items and the agreed missing case, then record/review the change without claiming unobserved test passes.

The adult plan spans idea, requirements, components, tests and release evidence through bounded supplied choices. It does not grade independent free-form application designs. User feedback is part of the reading/workflow; no live feedback service or personal data is collected.

## Educational accuracy

The lifecycle is explicitly simplified and iterative, not a mandatory one-pass waterfall process. Fixes require retesting, and post-release feedback can start another cycle. Functional requirements describe behavior; quality/constraint requirements include usability/accessibility. A small MVP still needs essential safety, privacy and quality.

Testing compares observed outcomes with expectations; debugging investigates and repairs causes. A proposed repair or test plan is not proof that a test ran or passed. The fictional defect and expected results are authored evidence, not runtime output. Component boundaries help manage work without guaranteeing the absence of integration defects.

Git records selected snapshots through commits; it does not automatically capture every keystroke or prove correctness. Git and GitHub are distinguished, and no account is needed. Review helps collaboration but does not replace testing or responsible release approval. The Git basics were checked against the primary [Pro Git version-control introduction](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control). This is a teaching reference, not an external learner connection or endorsement of the activity.

## AI contract and records

Specification/content **1.0.0**, checker **fixed-software-project-choice-v1**. Strict requests contain exactly specificationVersion, contentVersion, lessonId, taskId and answers: three ordered supplied IDs, each at most 80 characters. Unknown fields, versions, permissions, credentials/source, task IDs and choices cannot pass.

**48 deterministic cases** across twelve tasks: correct, first-slot mismatch, last-slot mismatch and incomplete per task (12 passes, 36 failures). The AI page shows its twelve cases; lesson/sample downloads contain all 48. Results include expected choices/output/explanation and `executed:false`, `actionsPerformed:false`. Native tests also enumerate every supplied combination and verify catalog metadata parity.

Three local JSON downloads provide lesson data, sample assessments and current-session practical results. Session records are capped at 20 in memory and cleared by reload/navigation/full reset. Only isolated completion IDs/versions may persist. Passing does not establish general software engineering competence, authentic external-agent learning or retained knowledge.

## Progress and workshop celebration

All six activities gate “The First Software Spell Is Complete!” and original Hexi’s encouragement. A small glowing completed spellbook brings the imaginary app to life in the story workshop; no app actually executes or releases. Fresh completion receives one brief 1.2-second glow. Restored completion is static; reduced motion disables the reward and shared card animations. No audio, flashing, modal, forced focus or persistent reward ledger.

Individual practice reset clears its current choices/hint/feedback but retains earned completion. Full reset clears only the current lesson/variant and its in-memory session records. Other lessons/variants retain progress. Storage failure is disclosed without preventing practice. Review targets a focusable heading; return links to the real course selector. Demo dashboard statistics remain separate.

## Security, privacy and preservation

Fictional project evidence and fixed choice IDs only. No real names/private records, free-text source/upload field, model API, student repository access, GitHub account, paid tool, external AI agent, generated command, arbitrary code/test/Git execution or unfinished Potion Lab. No security-header weakening or executor isolation change.

Original Hexi/artwork, earlier lesson implementations/data/checkers, shared learning/progress/celebration helpers, dependency lockfile, build/runtime settings and headers remain baseline files. Five older native test files update only course-count/empty-course expectations for the seventh populated course. New CSS is appended under Software Sorcery selectors. Small metadata keeps full new lesson data on its lazy route.

## Quality assurance

Production build/TypeScript and formatting pass. **69 native groups:** Software 8, Intelligence 8, Algorithms 7, Shield 8, HTML 8, Thinking 6, Python output 10, Variables 8 and distribution 6. Tests cover declared outcomes, every supplied combination, malformed/hostile/oversized inputs, strict version/schema boundaries, retries, progress isolation and metadata consistency.

The new browser suite exercises all four variants: objectives/activity counts, incomplete/incorrect/correct answers, every practical field, hints, keyboard menus/Tab controls, completion gating, individual/full reset, restore/static celebration, isolation, minimal storage, all three downloads/session cap, blocked storage, course/path navigation, original images and no external/account/executor requests or browser errors.

Layout coverage includes Daylight/Midnight at 375/768/1440 widths across all variants, 200% root text and reduced motion. Mobile, desktop and workshop screenshots are saved to ignored artifacts and visually spot-reviewed. Existing browser suites exercise all seven published lesson families (Python 001/002, Programming Fundamentals, Web Enchantment, Cybersecurity Charms, Algorithm Alchemy and AI Fundamentals). Final process outcomes are recorded in the external local review packet. Browser checks simulate existing Pages headers, not a deployed edge.

## Known limitations and future opportunities

- Only finite supplied plans are graded. No arbitrary application design, code execution, real tests, Git operations, repository edits or release occurs in the learner activity.
- Authored examples and editable browser completion do not establish independent mastery or general engineering competence.
- Actual VoiceOver/NVDA listening, target-age learner evaluation, real browser zoom, formal WCAG/contrast audit and measured mobile performance remain outstanding. Automated checks and screenshots do not certify conformance or educational effectiveness.
- Spellbook/symbol appearance varies by platform; text labels retain meaning. Original artwork is preserved.
- Later Software Sorcery opportunities are Proposed: acceptance criteria, richer module interfaces, integration tests, branches/conflicts, code review and maintenance scenarios. None is implemented here.

## Recommended release isolation

After local founder review, clone official GitHub main into a new release checkout. Verify the reviewed baseline, copy only the exact source files below, rebuild/retest and compare source/artifact/protected hashes. Prepare a manifest for explicit publication approval. Stop on baseline, scope or hash drift. Exclude dist, node_modules, ignored screenshots, external operator reports and all original unfinished development. No stage, commit, push or deployment is authorized by this local implementation report.

## Exact changed files

- `README.md`
- `docs/ACADEMY_VISION.md`
- `docs/AI_INTEGRATION.md`
- `docs/DECISION_LOG.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/FEATURE_REGISTRY.md`
- `docs/LEARNING_ARCHITECTURE.md`
- `docs/MISSION_017F_REVIEW.md`
- `package.json`
- `scripts/verify-software.cjs`
- `src/App.tsx`
- `src/components/lessons/SoftwarePractice.tsx`
- `src/data/curriculum.ts`
- `src/data/lessons/software-entry.ts`
- `src/data/lessons/software-spellbook.ts`
- `src/data/lessons/software-spellbook.v1.json`
- `src/learning/software-schema.ts`
- `src/learning/software.ts`
- `src/pages/Explore.tsx`
- `src/pages/Learn.tsx`
- `src/pages/SoftwareLesson.tsx`
- `src/styles/lessons.css`
- `tests/algorithms.test.ts`
- `tests/html.test.ts`
- `tests/intelligence.test.ts`
- `tests/shield.test.ts`
- `tests/software.test.ts`
- `tests/thinking.test.ts`


## Mission 017F · Final publication polish

**Implemented locally; publication pending:** the shared Software Sorcery course
page now describes the available introductory lesson and its four pathway links,
without visitor-facing approval-status wording. This copy is suitable for the
proposed release; it does not establish that a deployment has occurred. The
verified public source baseline remains Mission 017E
(`b39c8b5ed040ab380de1a28170cf0e13435c7215`). Software Sorcery is locally
ready for founder approval; no staging, commit, push or deployment is authorized.
All other lesson content, artwork, progress, accessibility and security behavior
remain unchanged. Fresh verification is recorded in the external release packet.
