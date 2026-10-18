# Decision Log

Last reviewed: 2026-10-17 · Baseline: v0.3.0 + Mission 015 artwork-label cleanup

## Recording rules

Use stable decision IDs and the [registry status vocabulary](FEATURE_REGISTRY.md#status-vocabulary). Every entry records date, decision, context, alternatives, reasoning, tradeoffs, result, and related features/files. Record the adoption date only if evidenced. An observation date is not an invented historical decision date.

Existing code establishes what was implemented, not what discussions occurred. When original reasoning or alternatives are unknown, say **undocumented**. Today's interpretations and Proposed options must not be presented as historical rationale. Preserve superseded entries, mark them Deprecated when appropriate, and link the replacement instead of silently rewriting history.

## D001 — Establish a maintained blueprint

- **Date:** 2026-10-15, recorded from the Mission 007 founder instruction.
- **Status:** Implemented, documentation only.
- **Decision:** maintain separate vision, design, learning architecture, feature registry, and decision log documents; link existing operational documentation instead of duplicating it.
- **Context:** existing README, artwork handoff, and deployment guide describe a working interface but not the full educational intention.
- **Alternatives considered:** no historical comparison supplied; a single combined blueprint is not an adopted alternative.
- **Reasoning:** the founder explicitly requested a living system that explains what and why to developers and AI coding agents.
- **Tradeoffs:** multiple documents need cross-link and status maintenance; separation keeps operational instructions in their existing homes.
- **Result:** blueprint, reference guide, README index, and maintenance instructions added; no application change authorized.
- **Related:** F31; [README](../README.md), [AGENTS](../AGENTS.md), all documents in this directory.

## D002 — Keep the academy free and independently directed

- **Date:** recorded 2026-10-15; first adoption date and earlier discussions are undocumented in repository history.
- **Status:** Implemented as a documented governing constraint; full educational delivery remains Planned.
- **Decision:** Code Coven provides completely free education and remains independently owned/directed, with Crystal as founder and creative director.
- **Context:** Mission 007 establishes ownership/direction; existing homepage/footer and README state “Free to learn. Free to grow. Free forever.”
- **Alternatives considered:** undocumented; no paid tier or external governance model is adopted.
- **Reasoning:** the founder's stated purpose is accessible programming education, with a coherent independent creative direction.
- **Tradeoffs:** future operational choices must support the free learner experience; funding and operating arrangements are not decided here.
- **Result:** vision records the constraint without creating a legal entity, monetization plan, or outside-project dependency.
- **Related:** [Academy Vision](ACADEMY_VISION.md), [Home](../src/pages/Home.tsx), [PublicLayout](../src/layouts/PublicLayout.tsx).

## D003 — Document the existing typed curriculum hierarchy

- **Date:** observed 2026-10-15; original engineering decision date is undocumented.
- **Status:** Implemented, as interfaces and metadata only.
- **Decision:** preserve Department → LearningPath → Course → CourseModule → Lesson → Challenge, with local metadata separate from page presentation.
- **Context:** current paths reference course IDs; courses reference departments and contain empty modules arrays.
- **Alternatives considered:** undocumented; no original comparison with database-backed or different content models is available.
- **Reasoning:** original reasoning is undocumented. The current separation demonstrably allows the catalog, departments, and dashboard to reuse metadata; that is an observed benefit, not a reconstructed discussion.
- **Tradeoffs:** interfaces do not supply populated lessons, content validation, objectives, evidence, or storage; future extensions require deliberate decisions.
- **Result:** the learning architecture describes current fields accurately and labels schema additions Proposed.
- **Related:** F02–F05, F12, F17; [types](../src/types/curriculum.ts), [data](../src/data/curriculum.ts), [Explore](../src/pages/Explore.tsx).

## D004 — Preserve a static prototype with honest demo boundaries

- **Date:** observed 2026-10-15; original adoption date is undocumented. Mission 003 verification is separately dated in DEPLOYMENT.md.
- **Status:** Implemented local application/build; deployment not established by this observation.
- **Decision:** retain React/Vite static rendering, local metadata, and clearly marked sample statistics; do not portray preview pages as operational learning services.
- **Context:** current repository has no auth, payment, database, execution service, or progress persistence. Deployment configuration and earlier checks already have a dedicated guide.
- **Alternatives considered:** original discussion undocumented; no new backend or hosting alternative is selected here.
- **Reasoning:** existing documents explicitly scope a free static prototype; Mission 007 requires preserving working functionality and distinguishing plans from facts.
- **Tradeoffs:** no durable student learning records or executable lessons; local production tests cannot prove Cloudflare edge behavior.
- **Result:** feature statuses separate Implemented previews from Planned teaching/record workflows. Existing deployment/security details remain in their original guide.
- **Related:** F04–F05, F08, F13–F16, F23–F24; [README](../README.md), [DEPLOYMENT](../DEPLOYMENT.md), [headers](../public/_headers).

## D005 — Preserve the enchanted identity and accessible controls

- **Date:** observed/recorded 2026-10-15; original token, illustration, typography, and breakpoint selection dates/reviews are undocumented.
- **Status:** Implemented visual system and safeguards; final artwork and complete audience validation remain Planned.
- **Decision:** keep Daylight/Midnight themes, Hexi, magical destinations, reusable illustrations, modern dashboard navigation, visible focus, and reduced-motion behavior.
- **Context:** these features are visible in current components/styles and described in the artwork handoff.
- **Alternatives considered:** historical design comparisons undocumented; no new redesign or replacement artwork is selected.
- **Reasoning:** Mission 007 explicitly preserves the site; the founding design direction combines magic with usability. Exact earlier aesthetic tradeoff discussions are undocumented.
- **Tradeoffs:** current concepts are not approved final artwork, and existing checks do not prove suitability for all reading levels or assistive technologies.
- **Result:** design rules reference actual tokens/components; ARTWORK.md remains the replacement-asset inventory.
- **Related:** F06–F11; [Design System](DESIGN_SYSTEM.md), [ARTWORK](../ARTWORK.md), [styles](../src/styles/index.css).

## D006 — Plan three audiences over shared foundations

- **Date:** 2026-10-15, recorded from Mission 007; not a claim about an earlier unrecorded adoption.
- **Status:** Planned, not implemented audience pathways.
- **Decision:** plan Code Coven for Kids, Adults, and AIs, including Little Apprentices (6–9), Junior Spellcasters (10–13), flexible older-learner pathways, adult paths, and machine-readable agent lessons.
- **Context:** current catalog is shared and has no audience variant fields, age collection, placement, or agent delivery endpoint.
- **Alternatives considered:** none reported in the founder brief; particular placement and schema options are still Proposed, not historically evaluated.
- **Reasoning:** the founder requested these audiences and shared foundational learning while preserving an understandable educational system.
- **Tradeoffs:** each experience needs its own instruction, evidence, accessibility, and safety review; sharing concepts does not mean identical presentation.
- **Result:** audience intentions are documented; first delivery priority, older-learner boundaries, supervision, and adaptation details remain founder decisions.
- **Related:** F17–F21; [Vision](ACADEMY_VISION.md), [Learning Architecture](LEARNING_ARCHITECTURE.md).

## D007 — Plan capability evidence and controlled practice

- **Date:** 2026-10-15, recorded from Mission 007.
- **Status:** Planned for progression, feedback, controlled execution, and collaboration; technical details remain Proposed.
- **Decision:** future education should connect objectives, practical tasks, assessment/feedback, and capability-based progression; human/AI execution and collaboration need explicit boundaries.
- **Context:** no challenge runner, evaluation engine, capability model, or collaboration service exists; displayed XP is demo data.
- **Alternatives considered:** no historical evaluation available. Browser vs isolated remote execution and deterministic vs rubric/human evaluation are future options, not selected solutions.
- **Reasoning:** the founder requests these learning capabilities; accurate evidence and controlled execution must accompany them before real progress is claimed.
- **Tradeoffs:** educational criteria, costs, privacy, resource limits, and accessible feedback require decisions beyond UI scaffolding. No database or provider is selected.
- **Result:** architecture distinguishes Planned workflows from Proposed schemas/constraints; implementation awaits scoped work and review.
- **Related:** F17, F21–F25, F27, F29; [Learning Architecture](LEARNING_ARCHITECTURE.md), [demo quest](../src/components/DailyQuestCard.tsx).

## D008 — Allow architectural study without implying shared branding or resources

- **Date:** 2026-10-15, recorded from Mission 007.
- **Status:** Implemented reference guidance; reuse/license policy remains Proposed and undecided.
- **Decision:** another independent project, including Alignment Academy, may study the architecture and educational patterns without assuming ownership, branding permission, private access, or a live integration.
- **Context:** Code Coven's independent direction is explicit; no license file or cross-project integration is present in the inspected repository.
- **Alternatives considered:** no partnership, code/content license, or integration design has been adopted or historically evaluated in the available material.
- **Reasoning:** the founder requests a reference guide while retaining Code Coven's independent identity.
- **Tradeoffs:** study guidance does not settle copying rights, compatibility, or sharing of private resources; those need explicit decisions.
- **Result:** a short reference guide separates conceptual study from code/art reuse and technical access.
- **Related:** F31; [Reference Guide](REFERENCE_GUIDE.md), [Vision](ACADEMY_VISION.md).

## Missing context and next records

At the initial Mission 007 review, the repository had one initial commit, not a contemporaneous series of mission-by-mission decision records. Those earlier documents preserve specifications, preparation notes, and selected verification results; they do not establish the original dates, alternatives, or reasoning for every engineering and design choice. No Mission 006 material is present in the reviewed documentation. Do not invent its contents or infer a completed push/deployment from this gap.

Unknowns include original detailed palette/typography tradeoffs, curriculum sequence review, learner research, audience testing, and prior evaluation of progression/execution approaches. Record new evidence if Crystal supplies it, identify its source, and distinguish a corrected historical fact from a new decision.

For future entries, copy the field structure above, use the actual recorded/adopted dates, include feature IDs and file links, and state unresolved founder choices rather than silently choosing a policy.

## D009 — Deliver one canonical print() objective across three classrooms

- **Date:** 2026-10-15, Mission 008 instruction and local implementation.
- **Status:** Implemented pilot; broader pathways remain Planned.
- **Decision:** use one versioned JSON specification and validated canonical objective, with human audience adapters and a populated lesson in the existing Python course/module hierarchy.
- **Context:** the founder requested complete Kids/Adults/AI pilots around the same concept, not a new project or large placeholder catalog.
- **Alternatives considered:** three independent lesson/curriculum copies would drift; a full external content service is unnecessary for this bounded pilot.
- **Reasoning:** one objective and shared checking semantics support consistent content while allowing different teaching and assessment activities.
- **Tradeoffs:** broader curriculum/schema evolution remains future work; the first supported specification/content version is explicit rather than silently accepting unknown versions.
- **Result:** selector/path routes, Little/Junior adaptations, Adults lesson, and downloadable AI specification implemented locally; course metadata and links preserve the existing academy.
- **Related:** F12, F17–F22, F32–F35; [canonical JSON](../src/data/lessons/python-output.v1.json), [adapters](../src/data/lessons/python-output.ts), [learning types](../src/types/learning.ts), [App](../src/App.tsx).

## D010 — Use an honest restricted text checker, not a Python interpreter

- **Date:** 2026-10-15, Mission 008 local implementation.
- **Status:** Implemented text checking; execution remains Planned.
- **Decision:** share a bounded one-print/string recognizer between human practice and deterministic AI samples; never execute submitted source.
- **Context:** the founder allows simplified checking but requires clear labeling and prohibits unsafe evaluation or unrestricted execution.
- **Alternatives considered:** exact full-source matching would reject harmless quote/spacing variants; introducing a Python runtime would add execution/security scope beyond the pilot.
- **Reasoning:** a small recognizer can provide useful immediate feedback and exact expected-output checks while keeping execution permissions absent.
- **Tradeoffs:** many valid Python programs are unsupported. A pass establishes only performance on the specified pattern, not general understanding/mastery or persistent AI learning.
- **Result:** matching quote styles/spacing accepted; extra statements, escapes, variables, comments, or mismatched syntax rejected with educational explanations. Native tests cover supported/unsupported inputs and expected AI outcomes.
- **Related:** F22, F24, F35; [checker](../src/learning/evaluate.ts), [lesson controls](../src/components/lessons/LessonControls.tsx), [tests](../tests/lessons.test.ts).

## D011 — Keep human completion local, separate, and minimal

- **Date:** 2026-10-15, Mission 008 local implementation.
- **Status:** Implemented browser completion; trusted capability records remain Planned.
- **Decision:** store completed activity IDs and record/content versions separately for Little, Junior, and Adults. Save no answers, source text, names, ages, or timestamps; keep dashboard demo values independent.
- **Context:** the founder requests browser-only human progress without child personal-information collection or invented synchronization.
- **Alternatives considered:** ephemeral-only progress would disappear after refresh; accounts/backend storage would introduce prohibited scope and unnecessary identity collection.
- **Reasoning:** bounded local completion supports return visits without pretending to be durable account evidence.
- **Tradeoffs:** browser owners can edit/clear records; another browser has no progress. Correctness is not re-assessed on restoration. A previously completed activity stays complete until reset even when its new unsaved answer changes.
- **Result:** content-version checks, safe parsing/filtering, per-variant reset, and storage-failure notices implemented. No AI retention state, XP, streak, or reward tracking was added.
- **Related:** F05, F23, F34; [progress](../src/learning/progress.ts), [hook](../src/learning/useLessonProgress.ts), [HumanLesson](../src/pages/HumanLesson.tsx).

## D012 — Validate versioned AI data and expose only a sample contract

- **Date:** 2026-10-15, Mission 008 local implementation.
- **Status:** Implemented data/download/sample contract; live integration remains Planned.
- **Decision:** use Valibot strict schemas for the local lesson and illustrative agent request, and expose downloadable data and pure deterministic sample responses without any public agent service.
- **Context:** the founder requests structured lessons, schema validation, error feedback/capability IDs, and an example future contract with no execution privileges.
- **Alternatives considered:** unchecked JSON would leave schema/permission ambiguities; runtime code-generating validation would be unnecessary under the existing strict CSP; public registration/ingestion endpoints are outside scope.
- **Reasoning:** declarative version-pinned validation and small pure functions make boundaries inspectable, reusable, and testable without granting tool access.
- **Tradeoffs:** consumers need compatible local tooling; no endpoint, permanent learning record, external agent identity, or integration guarantee is provided. Only the documented content/checker versions are supported.
- **Result:** malformed/unknown-version/permission-bearing requests fail validation; JSON downloads and sample records explicitly state no execution and bounded task-performance claims.
- **Related:** F21, F35; [schema](../src/learning/schema.ts), [agent samples](../src/learning/agent.ts), [AI classroom](../src/pages/AiLesson.tsx), [integration guide](AI_INTEGRATION.md).

## D013 — Adapt Little feedback without changing assessment correctness

- **Date:** 2026-10-15, Mission 009 instruction and local implementation.
- **Status:** Implemented for Little Apprentices Lesson 001; broader adoption remains Proposed.
- **Decision:** add a configurable presentation layer with short familiar wording, one actionable hint at a time, and isolated Little knowledge-question feedback. Keep the checker, accepted patterns, IDs, and older/AI feedback unchanged.
- **Context:** the founder reports hands-on browser testing found technical feedback and an insufficiently warm completion. That report motivates this change; it is not a claim of broader child-user research.
- **Alternatives considered:** replacing shared feedback globally would affect Junior/Adults; modifying validator outcomes or adding a Python interpreter would change assessment scope; duplicating the checker would invite drift.
- **Reasoning:** the same accurate pass/fail result can be presented in developmentally appropriate language without hiding meaningful errors or overwhelming younger learners.
- **Tradeoffs:** syntax hints identify likely corrections within this small activity, not every Python error. Complex unsupported input gets a concise supported-example prompt. Educational effectiveness still requires learner review.
- **Result:** missing/mismatched quotes, round brackets, function-name mistakes, wrong messages, empty/long input, and success have Little-friendly feedback. Unlimited retries and progress semantics are preserved; no submitted source executes.
- **Related:** F18, F22, F33, F36; [teaching copy](../src/data/lessons/little-apprentice-teaching.ts), [adapter](../src/learning/feedback.ts), [controls](../src/components/lessons/LessonControls.tsx), [lesson tests](../tests/lessons.test.ts).

## D014 — Recognize completion warmly without reward pressure or repeated interruptions

- **Date:** 2026-10-15, Mission 009 instruction and local implementation.
- **Status:** Implemented for the Little pilot; reusable component/configuration available.
- **Decision:** show a configurable Hexi card only after all three existing activities are completed; use a single subtle entrance for fresh completion and a static card on return. Keep the guided-checker clarification separate from the main celebration.
- **Context:** the founder specified the title, Hexi message, “First Spell Cast!” recognition, and review/path navigation while preserving browser-local progress and avoiding manipulative mechanics.
- **Alternatives considered:** an automatically replayed modal/confetti/audio celebration could interrupt returning learners; creating persisted rewards or another lesson link would add unsupported functionality; embedding all copy in UI would limit reuse.
- **Reasoning:** recognize genuine completed activity with warmth while retaining educational transparency, learner control, keyboard access, and reduced-motion support.
- **Tradeoffs:** there is no platform achievement ledger or mastery claim. Local completion remains editable by the browser owner; previous completed activities remain complete until reset. A reset followed by new completion can animate again.
- **Result:** all-three completion gates the card; review focuses the lesson heading without clearing progress, and return uses the existing Kids path. No automatic scroll/focus, audio, flashing, XP, streaks, private data, or new storage fields are added. A persistent polite/atomic status region supplies the completion announcement.
- **Related:** F18, F27, F34, F36; [card](../src/components/lessons/CompletionCelebration.tsx), [HumanLesson](../src/pages/HumanLesson.tsx), [styles](../src/styles/lessons.css), [browser checks](../scripts/verify-teaching.cjs).

## D015 — Remove temporary artwork labels while preserving the pictures

- **Date:** 2026-10-17, Mission 015 founder instruction and local implementation.
- **Status:** Implemented locally; no commit, push, or deployment authorized.
- **Decision:** remove HTML overlays/captions identifying current illustrations as placeholders, concepts, or awaiting official art. Retain the actual illustrations, Hexi, colors, sizing, responsive rules, and optional local image-source hooks.
- **Context:** Crystal explicitly likes the current pictures and requests removal of temporary labels. This supersedes earlier label-until-replacement guidance in the Mission 002 artwork handoff and design guide; those instructions are not permission to replace art now. D005 remains historical context; Mission 015 resolves its outstanding replacement direction in favor of preserving current pictures.
- **Alternatives considered:** replacement images, raster generation, crop/paint-over edits, and CSS-only hiding would be unnecessary; all five label sources are HTML. Removing the source text avoids hidden temporary labels in accessible names.
- **Reasoning:** satisfy the founder's creative direction with a bounded presentation change, without new assets, services, or changes to teaching or execution.
- **Tradeoffs:** obsolete artwork flags and label-only CSS are removed. The study's temporary caption no longer occupies space; its illustration frame, contents, and responsive sizing are retained. Honest demo and unavailable-feature notices remain visible.
- **Result:** shared department/course labels, study caption, dashboard mascot caption, and learning-path concept labels removed. No SVG artwork or Hexi component changed. Verification is recorded in the [Mission 015 review](MISSION_015_REVIEW.md); it does not claim deployment or a full accessibility audit.
- **Related:** F07, F11, F31, F32; [artwork handoff](../ARTWORK.md), [design guide](DESIGN_SYSTEM.md), [art registry](../src/data/artwork.ts).

## D016 — Add a differentiated variables lesson without granting execution

- **Date:** 2026-10-17, Mission 016 founder instruction and local implementation.
- **Status:** Implemented locally; publication awaits founder approval.
- **Decision:** add Lesson 002 in a separate local checkout based on Mission 015, using versioned shared content and existing classroom/progress components. Keep Lesson 001's checker contract unchanged.
- **Context:** the founder requests Little, Junior, Adults, and deterministic AI variables exercises, with eventual Potion Lab compatibility but no exposure or modification of the unfinished executor.
- **Alternatives considered:** importing unpublished runtime work would expand security/release scope; exact full-source matching would reject equivalent names/quotes; a general interpreter is unnecessary for bounded literal assignments and variable prints.
- **Reasoning:** a small, explicitly described text model can recognize assignment types and order without running untrusted code. Task-shape checks prevent direct-literal shortcuts from satisfying variable objectives.
- **Tradeoffs:** many valid Python programs are unsupported; ASCII/small integer bounds are checker limits, not Python language limits. A labeled-box metaphor helps beginners, with clarification that Python names refer to values. Local completion is editable and not trusted mastery evidence.
- **Result:** two curriculum modules, differentiated six-activity human variants, 20 AI sample cases and downloadable records, namespace-isolated completion, hints, and a gated Hexi card. No executor integration, paid service, account system, or production change.
- **Related:** F17–F24, F32–F37; [architecture](LEARNING_ARCHITECTURE.md), [AI integration](AI_INTEGRATION.md), [review](MISSION_016_REVIEW.md).


## D017 — Awaken Programming Fundamentals with finite sequencing activities

- **Date:** 2026-10-17, Mission 017 founder instruction and local implementation.
- **Status:** Implemented locally; no commit, push or deployment authorized.
- **Decision:** populate Programming Fundamentals first with Thinking Like a Programmer and four differentiated experiences; leave five further courses unimplemented. Reuse existing classroom/progress/celebration components and strict versioned AI data patterns.
- **Context:** the founder requests one complete introduction per existing course over time, explicitly starting with Programming Fundamentals and prohibiting simultaneous implementation of all six gaps.
- **Alternatives considered:** generating all missing courses would violate staged scope; importing Python execution would add unnecessary risk; drag-only ordering would exclude keyboard learners; free-form natural-language grading would lack deterministic correctness here.
- **Reasoning:** finite supplied steps support precise, inspectable sequencing/decomposition/debugging practice without a new service or execution architecture. Native selects keep keyboard access and established styling.
- **Tradeoffs:** exact task orders assess bounded dependency examples, not general reasoning. AI workbench progress is browser practice only; its optional session records are ephemeral. Completion is editable locally and cannot certify mastery. Target-audience and screen-reader review remain future work.
- **Result:** six objectives, six activities per experience, hints/retries, isolated progress/reset and celebration; strict lesson and request schemas; 24 sample cases and JSON/session downloads; updated course/path discovery. Existing Python lesson source, helpers, assets, dependencies and security headers are preserved.
- **Related:** F12, F17–F24, F31–F38; [review](MISSION_017_REVIEW.md), [architecture](LEARNING_ARCHITECTURE.md), [data](../src/data/lessons/programming-thinking.v1.json).


## D018 — Teach HTML with inert structure checking and fixed text display

- **Date:** 2026-10-17, Mission 017B founder instruction and local implementation.
- **Status:** Implemented locally; commit, push and deployment are not authorized.
- **Decision:** add the existing Web Enchantment course’s first complete lesson, using small validated HTML tasks and a fixed React text model instead of rendering learner markup.
- **Context:** the founder requests four introductory HTML experiences, interactive feedback/progress, deterministic AI data, preserved lessons/artwork, and appropriate isolation if untrusted markup is previewed.
- **Alternatives considered:** inserting HTML into the academy would grant unnecessary browser behavior; an iframe browser renderer would require additional sandbox/CSP design; fixed exact-string comparison would reject harmless tag case/whitespace variations. A bounded inert tree plus structural checking fits the first lesson.
- **Reasoning:** recognizing a small explicit syntax and displaying only validated text supports headings, paragraphs and document structure without creating a new execution context. Reuse existing lesson/progress/celebration architecture, keeping original Python and thinking content unchanged.
- **Tradeoffs:** this is not a full HTML parser/validator or browser-rendered preview. Many legal HTML forms are deliberately unsupported; the UI states the limits. Local completion is editable, and deterministic passes do not establish mastery. Real learner and screen-reader evaluation remain future work.
- **Result:** six shared objectives, three checks/three practices per experience, visual Little blocks, older real-tag editing, independent adult document, 36 AI cases and three downloads, keyboard/reflow/theme/motion checks and old-lesson regressions. Only the older test’s populated-course count is updated; no executor, artwork, dependency, header or deployment change.
- **Related:** F12, F17–F24, F31–F39; [review](MISSION_017B_REVIEW.md), [architecture](LEARNING_ARCHITECTURE.md), [source data](../src/data/lessons/web-html.v1.json).


## D019 — Teach cybersecurity through fixed defensive scenarios only

- **Date:** 2026-10-18, Mission 017C founder instruction and local implementation.
- **Status:** Implemented locally; commit, push, deployment and Mission 017D are not authorized.
- **Decision:** add Cybersecurity Charms’ first lesson using fictional message classification plus defensive action selection across four experiences. Reuse existing lesson/progress/celebration components and validated AI-data patterns.
- **Context:** the founder requests six shared safety objectives, three checks/three practices per experience, no real secrets/accounts/attacks, preserved artwork and unchanged executor protections. GitHub main was verified to include Mission 017B before cloning an isolated checkout.
- **Alternatives considered:** a real inbox/URL scanner would introduce data/access risks; free-text password or phishing-input fields are unnecessary; live report/link controls could act beyond the educational task. Always labeling every example suspicious would encourage a shortcut instead of reading evidence.
- **Reasoning:** comparing finite response IDs with authored answers is inspectable, reproducible and sufficient for introductory defensive practice. Both warning-sign and independently confirmed informational scenarios teach caution without claiming a message is proven safe.
- **Tradeoffs:** no real-world threat classification or trusted mastery is established. Scenarios simplify context; no-warning-shown is not a safety guarantee. AI results are ephemeral/local and do not establish retained learning. Learner/assistive-technology validation remains future work.
- **Result:** six objectives, six activities per variant, safe text-only message cards, hints/retries, completion/reset/celebration, 36 sample cases and downloads. No original artwork, existing lesson implementation, dependency, lockfile, header or executor changes. Two old curriculum-count assertions reflect four populated courses.
- **Related:** F12, F17–F24, F31–F40; [review](MISSION_017C_REVIEW.md), [architecture](LEARNING_ARCHITECTURE.md), [data](../src/data/lessons/cyber-shield.v1.json).


## D020 — Trace bounded algorithms beyond the sequencing introduction

- **Date:** 2026-10-18, Mission 017D founder instruction and local implementation.
- **Status:** Implemented locally; no commit, push, deployment or Mission 017E authorized.
- **Decision:** populate Algorithm Alchemy with four adapted experiences covering algorithms, dependencies, patterns, IF/ELSE, bounded loops and removal of unnecessary steps. Keep fixed supplied choice arrays rather than executing pseudocode or grading arbitrary plans.
- **Context:** the founder requests progression beyond Programming Fundamentals, a child-friendly potion adventure, practical adult examples, AI records and a small reduced-motion-aware potion reward. GitHub main was verified at Mission 017C before cloning a separate checkout.
- **Alternatives considered:** drag-only ordering would exclude keyboard users; unrestricted code execution would violate scope; free-form algorithm grading would require broader correctness/security design. Repeating only sequencing would miss the new objectives.
- **Reasoning:** three multi-part activities per experience can test omission/dependencies, both conditional branches and pattern/count/output independently with deterministic, inspectable results. Native menus provide an equivalent accessible ordering interface without dragging.
- **Tradeoffs:** only authored finite plans are accepted; alternative valid algorithms and runtime optimization are not evaluated. Loop notation can reduce written repetition without reducing operations. The flask uses system emoji, whose appearance varies. Target-age learner and real assistive-technology review remain outstanding.
- **Result:** six objectives, six activities per experience, hints/retries, isolated local progress/reset, original Hexi celebration and glowing potion reward; versioned data, 48 sample cases and three downloads. No executor, account, paid service, asset replacement, security-header or dependency change. Three older curriculum tests recognize the fifth populated course.
- **Related:** F12, F17–F24, F31–F41; [review](MISSION_017D_REVIEW.md), [architecture](LEARNING_ARCHITECTURE.md), [data](../src/data/lessons/algorithm-recipe.v1.json).

## D021 — Teach AI accurately with finite fictional evidence

- **Date:** 2026-10-18, Mission 017E founder instruction and local implementation.
- **Status:** Implemented locally; no commit, push, deployment or Mission 017F authorized.
- **Decision:** introduce AI Fundamentals through four adapted experiences with fixed mechanism/evidence/responsibility tasks and versioned records. Reuse lesson/progress/celebration patterns; preserve original Hexi and executor boundaries.
- **Context:** the founder requests accurate distinctions among rules, ML and generation, uncertainty, privacy/fairness, oversight and an accessible first-spark reward. GitHub main was verified at published Mission 017D before cloning a separate checkout.
- **Alternatives considered:** calling a live model would add prohibited accounts/cost/data risk; training an actual classifier would expand scope; unconstrained free-text grading would not be reproducible. Treating every rule or confident output as AI/truth would misteach the objectives.
- **Reasoning:** authored evidence and supplied IDs make correctness inspectable without implying real training, execution or general alignment. Both the prediction and held-out answer are supplied; no trained model is inferred from a few examples.
- **Tradeoffs:** simplified scenarios do not evaluate arbitrary responses, calibration, genuine model fairness or retained learning. Native controls preserve keyboard interaction; symbol appearance varies. Real learner and screen-reader evaluation remains outstanding.
- **Result:** six objectives, six activities per experience, hints/retries, local progress/reset, lavender spark/Hexi celebration, 48 cases and three downloads. A small separate catalog entry keeps full new data on the lazy classroom route and removes the initial main-bundle warning; a parity test guards duplicate metadata. Four older tests update only curriculum counts/empty-course expectations. No old lesson implementation, artwork, dependency, header or executor change.
- **Related:** F12, F17–F24, F31–F42; [review](MISSION_017E_REVIEW.md), [architecture](LEARNING_ARCHITECTURE.md), [data](../src/data/lessons/intelligence-spark.v1.json).
