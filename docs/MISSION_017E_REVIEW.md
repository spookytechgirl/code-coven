# Mission 017E — The Familiar’s First Intelligence

Date: 2026-10-18. **Status: Implemented locally; awaiting founder review.** No staging, commit, push, deployment or Mission 017F work.

## Baseline and isolation

GitHub main was verified to include Mission 017D at `262f20ec880fd8ae5a10f3cd732471a6269c9b24` before cloning this separate checkout. Original development, unfinished Potion Lab, prior release folders and synced sources were not modified. This is a GitHub source-baseline observation, not new Cloudflare deployment verification.

Hierarchy: observatory → observatory-path → ai-fundamentals → ai-first-spark-basics → ai-first-spark-001. Six of seven courses now have introductions locally; only Software Sorcery remains Planned. Other AI Fundamentals catalog lessons remain planned. AI Fundamentals is the subject course; its AI pathway is an educational workbench, not an external agent platform.

## Local preview

Course selector: http://127.0.0.1:4200/courses/ai-fundamentals

| Experience | Route |
|---|---|
| Little Apprentices | `/learn/kids/ai-fundamentals/first-spark?band=little` |
| Junior Spellcasters | `/learn/kids/ai-fundamentals/first-spark?band=junior` |
| Adults | `/learn/adults/ai-fundamentals/first-spark` |
| AIs | `/learn/ai/ai-fundamentals/first-spark` |

To restart, install with the frozen lockfile, run `pnpm build`, then `pnpm preview --port 4200 --strictPort`. No environment credential, student registration, external AI account or paid service is required.

## Six shared objectives

1. Describe AI as systems used for tasks including prediction and content generation.
2. Distinguish explicit programmed rules, machine learning and generative AI.
3. Explain the role and limitations of training examples.
4. Recognize that predictions and confident generated claims can be incorrect.
5. Explain meaningful human oversight of important uses.
6. Choose privacy-aware, fair and independently verified uses.

Each variant has six instruction sections, three knowledge checks and three multi-part practicals, with hints, encouraging feedback and unlimited retries. No timer, penalty or account gate.

## Learning experiences

| Experience | Adaptation |
|---|---|
| Little | “Help Hexi Discover the Thinking Machines!” Three symbol-and-text machines, short explanations, written-rule/example/storymaker choices, pretend stone examples and a fictional club reminder. “Thinking machines” is explicitly a story nickname, not a claim of human-like minds. No code writing or external account. |
| Junior | AI/ML/generation, training versus use, data coverage, a supplied mistaken prediction, confidence versus evidence, privacy, fairness and verification. |
| Adults | Training/inference, separately updated models, generative drafts and hallucinations, data quality/bias, fictional parcel classification, team-reminder verification and accountable human review. Useful drafts are distinguished from unsupported facts. |
| AIs | Versioned canonical objectives and finite assessments of mechanism interpretation, evidence, uncertainty, clarification, privacy, limitations and human confirmation. No model API, generated command or unrestricted agent. |

The practicals are:

- **Machines:** identify an explicitly programmed gate, a classifier fitted from examples and a learned content generator. Each description must be classified correctly.
- **Examples:** inspect three red→keep examples, a supplied blue→keep prediction and a held-out answer of review. Identify the error, missing relevant coverage and the need for separate testing/human review.
- **Responsible response:** identify unsupported draft details, exclude unnecessary fictional private information, clarify an ambiguous date and obtain appropriate human review. The AI-specific task follows a summarize-only instruction, omits an invented time and asks for an explicit date/time zone; it does not book or execute anything.

The given examples do not mathematically force a model’s prediction: the prediction is authored story evidence. No model is trained here. The learner compares it with a supplied answer key rather than treating a simulated output as live inference.

## Educational accuracy

The lesson distinguishes broad AI, rules-based systems, ML and generation without saying every simple automation is AI or every AI system learns from data. Many deployed models do not retrain on every interaction; conversation context, training and separate updates are distinguished. Systems may also be designed for online learning, so a universal “AI never learns during use” claim is avoided.

Generative outputs can be useful drafts and can contain plausible falsehoods, including invented sources. Fluent/confident wording is not verification. Important claims need independent reliable evidence and suitable human oversight. Improved data coverage alone does not guarantee accuracy or fairness; review must consider errors and affected people. Task performance is not evidence of human-like emotions, consciousness or understanding.

Primary references consulted for these distinctions (2026-10-18):

- [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf): confidently incorrect generation and related risk considerations.
- [NIST AI risk characteristics](https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/): privacy, harmful bias and the social context of trustworthy use.
- [Google ML: static/dynamic training](https://developers.google.com/machine-learning/crash-course/production-ml-systems/static-vs-dynamic-training) and [inference](https://developers.google.com/machine-learning/crash-course/production-ml-systems/static-vs-dynamic-inference): training/update choices versus serving predictions.

These are teaching references, not endorsements or validation of the authored fictional answer keys. No reference site, model or external service is contacted by the learner activity.

## AI records and privacy

Specification/content **1.0.0**, checker **fixed-ai-evidence-choice-v1**. Strict requests contain exactly specificationVersion, contentVersion, lessonId, taskId and an ordered answers array. Three supplied IDs (maximum 80 characters each) must match the task. Unknown fields, versions, permissions, source/credential payloads, task IDs and choices cannot pass. No arbitrary natural-language grading.

There are **48 deterministic cases** across twelve tasks: one correct, two mismatched and one incomplete per task (12 passes, 36 failures). The AI page shows its twelve relevant cases; lesson/sample downloads include all 48. Each result supplies expected answers/output, explanation and `executed:false`, `actionsPerformed:false`. Exhaustive native tests also verify every supplied choice combination.

Three JSON downloads provide lesson data, sample assessments and current-session practical results. Only the last 20 session records remain in memory; navigation, reload or full reset clears them. Only completion IDs and record/content versions may persist, separately for each lesson/variant. Answers, personal information, names, ages and assessment records are not saved or sent. These deterministic passes establish neither general alignment, mastery nor retained AI learning.

## Progress, resets and first spark

All six activities must pass to show original Hexi and “The Familiar’s First Spark,” a lavender-accented spark representing curiosity and learning. Fresh completion gets one brief glow; restored completion is static. Reduced motion disables the spark and shared card animations. No audio, flashing, modal, forced focus, purchases, account reward ledger or new persisted fields.

Individual practice reset clears its current choices/hint/feedback while retaining previously earned completion. Full reset clears the current variant, its forms and in-memory session records; other variants/lessons retain progress. Blocked storage is explained and does not prevent learning. Review targets a focusable heading; Return uses the existing course selector. Dashboard demo statistics remain separate.

## Security and preservation

Fixed fictional choices only. No personal-data input, upload, model training/call, generated command, arbitrary code execution, agent OS access, live suspicious link, account integration, paid service, public AI API or unfinished executor. Existing security headers, dependency lockfile, runtime/deployment settings and executor isolation remain unchanged. Original Hexi and artwork are preserved.

Earlier lesson implementations/data/checkers and shared learning/progress/celebration helpers remain byte-for-byte baseline files. Four older native tests change only the populated-course count (five→six) and empty-course expectations. No other-course implementation is added.

Full new lesson data loads with the lazy classroom route. Small catalog metadata supplies course/path discovery; an explicit parity test guards its agreement with canonical tasks. This removed the initial >500 kB main-chunk warning without altering older lesson loading. The final main chunk is about 487 kB uncompressed (139 kB gzip); this is not a mobile performance benchmark.

## Quality assurance

Production build/TypeScript, formatting and native checks pass. **61 native test groups:** Intelligence 8, Algorithms 7, Shield 8, HTML 8, Thinking 6, Python output 10, Variables 8, distribution 6. They cover all cases/combinations, incomplete/hostile/oversized IDs, strict schemas/versions, retries, progress isolation and catalog metadata parity.

The new browser suite covers all four variants: six objectives, three checks/three practices, empty/incorrect/correct feedback, each practice field, keyboard menus and hint buttons, retries, completion gating, activity/full reset, static restoration, cross-lesson isolation, minimal local storage, all three downloads and the session cap, blocked storage, course/path links, intact images and no external/account/executor requests or browser errors.

Layout checks cover both themes and all four variants at 375/768/1440 widths, 200% root-text enlargement and reduced motion. Mobile/desktop/celebration screenshots are saved to ignored artifacts and visually spot-reviewed. Local browser checks reproduce the existing Pages headers; this is not deployed-edge verification. Final browser outcomes and logs accompany the external local review packet. Existing suites exercise Python Lessons 001/002, Programming Fundamentals, Web Enchantment, Cybersecurity Charms and Algorithm Alchemy.

## Known limitations and next opportunities

- Fixed authored cases only: no live ML, generative model, arbitrary prompt evaluator, realistic calibration metric or general alignment assurance.
- Tiny fictional sets illustrate coverage and error checking; they do not establish model behavior, fairness or reliability in deployment.
- Local/editable completion is not authenticated mastery, and assessment records are not retained/synchronized.
- Actual target-age learner evaluation, VoiceOver/NVDA listening, real browser zoom, formal WCAG/contrast audit and measured mobile performance remain outstanding. Automated semantics/reflow checks do not establish conformance or educational effectiveness.
- Symbol appearance varies across platforms; text labels retain meaning. No image or character was replaced.
- Future AI Fundamentals opportunities are Proposed: held-out dataset design, subgroup evaluation, source verification, uncertainty calibration, prompting with privacy and clearer model-lifecycle examples. No Mission 017F work is included.

## Recommended release isolation

After founder review, clone official GitHub main into a separate release checkout, verify the reviewed baseline and copy only the exact source files below. Rebuild, rerun checks and compare source/artifact/protected hashes. Prepare a reviewed manifest before requesting explicit publication approval. Stop on baseline, scope or hash drift. Exclude generated dist, node_modules, ignored screenshots, external operator reports and all original unfinished development. No commit, push or deploy is authorized by this local implementation report.

## Exact changed files

- `README.md`
- `docs/ACADEMY_VISION.md`
- `docs/AI_INTEGRATION.md`
- `docs/DECISION_LOG.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/FEATURE_REGISTRY.md`
- `docs/LEARNING_ARCHITECTURE.md`
- `docs/MISSION_017E_REVIEW.md`
- `package.json`
- `scripts/verify-intelligence.cjs`
- `src/App.tsx`
- `src/components/lessons/IntelligencePractice.tsx`
- `src/data/curriculum.ts`
- `src/data/lessons/intelligence-entry.ts`
- `src/data/lessons/intelligence-spark.ts`
- `src/data/lessons/intelligence-spark.v1.json`
- `src/learning/intelligence-schema.ts`
- `src/learning/intelligence.ts`
- `src/pages/Explore.tsx`
- `src/pages/IntelligenceLesson.tsx`
- `src/pages/Learn.tsx`
- `src/styles/lessons.css`
- `tests/algorithms.test.ts`
- `tests/html.test.ts`
- `tests/intelligence.test.ts`
- `tests/shield.test.ts`
- `tests/thinking.test.ts`
