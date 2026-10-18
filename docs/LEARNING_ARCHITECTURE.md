# Learning Architecture

Last reviewed: 2026-10-17 · Baseline: Mission 015 + Mission 016 local lessons

## Verified implementation boundary

**Implemented:** the hierarchy contains two Python modules: output (Lesson 001) and variables (Lesson 002), each with Little, Junior, Adults, and AI adaptations. Kids and Adults have real knowledge checks and restricted text practice; AI has a versioned validated specification, deterministic sample evaluations, and a non-operational future contract. **Also Implemented locally in Mission 017:** Programming Fundamentals has one introductory lesson with four adaptations. **Also Implemented locally in Mission 017B:** Web Enchantment has a four-experience HTML introduction. **Not implemented:** Python execution, trusted capability tracking, a public agent API, or complete multi-course curricula.

```text
Department: potions
  └─ LearningPath (references python-potions)
      └─ Course: python-potions
          └─ Module: python-output-basics
              └─ Lesson: python-output-001
                  └─ Challenges: hello, welcome (no XP awards)
```

[Legacy curriculum types](../src/types/curriculum.ts) remain compatible. [LearningLesson](../src/types/learning.ts) extends Lesson with course/concept/version, objectives, prerequisites, examples, and audience variants. [The canonical JSON](../src/data/lessons/python-output.v1.json) defines the shared objective: **“Use Python's print() function to display text.”** [The adapter](../src/data/lessons/python-output.ts) validates it and builds human content and the canonical lesson. [Curriculum data](../src/data/curriculum.ts) places this lesson in the existing hierarchy; all seven courses now have introductory modules locally (Software Sorcery awaits founder publication approval) and catalog lesson totals remain planned counts.

The dashboard's `demoProgress` still represents sample numbers, not the pilot's local completion. No lesson completion changes dashboard XP or percentages.

## Shared foundation, different presentations

**Implemented:** one shared output concept across the three experiences. **Planned:** a broader shared foundational curriculum spanning concepts such as variables, control flow, decomposition, debugging, and practical programming. These examples describe possible foundational scope, not approved lesson sequences. Reuse concepts and stable identifiers rather than forcing identical reading, task length, or interaction on every learner.

| Experience                      | Status                             | Intended adaptation                                                                         | Decisions still needed                                                                 |
| ------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Little Apprentices, ages 6–9    | Implemented pilot; broader Planned | Short, concrete, supported activities; accessible visual and textual explanations           | Reading assumptions, adult support, interaction methods, privacy and supervision model |
| Junior Spellcasters, ages 10–13 | Implemented pilot; broader Planned | Increasing independence, explanations and debugging practice, appropriately scoped projects | Starting capabilities, task scope, feedback style, safety expectations                 |
| Flexible older-learner pathways | Planned                            | Choose entry points based on goals/readiness, with support available                        | Age boundaries if any, placement options, whether and how capability checks work       |
| Adult learning paths            | Implemented pilot; broader Planned | Foundations through advanced practical work, flexible pace and entry                        | Initial goals, first deliverable, sequencing, project expectations                     |
| AI agent learning experiences   | Implemented pilot; broader Planned | Structured lessons, explicit objectives, constrained tasks, assessable outputs              | Schema, delivery interface, permitted tools, provenance and evaluation criteria        |

**Implemented:** `/learn` selects Kids, Adults, or AIs; Kids can switch either band without an age gate. Little Apprentices recognize an example, predict output, and finish guided text practice. Junior Spellcasters identify syntax, predict output, and modify a message. Adults receive execution/string/syntax explanations, three knowledge checks, and a Welcome to Code Coven! practice task. AI learners receive downloadable data rather than an interactive agent account. No age information is collected. These adaptations have not been evaluated with their target audiences.

## Current academy map

All seven departments are open for exploration. Data derives one path per department using course IDs; no cross-department prerequisite enforcement exists.

| Department ID | Location                 | Subject                         | Current course ID         |
| ------------- | ------------------------ | ------------------------------- | ------------------------- |
| `cottage`     | The Apprentice's Cottage | Programming Fundamentals        | `programming-foundations` |
| `potions`     | The Potion Laboratory    | Python Programming              | `python-potions`          |
| `workshop`    | The Enchanted Workshop   | HTML, CSS, JavaScript           | `web-enchantment`         |
| `library`     | The Ancient Library      | Computer Science and Algorithms | `algorithm-alchemy`       |
| `observatory` | The Oracle's Observatory | AI and Machine Learning         | `ai-fundamentals`         |
| `tower`       | The Guardian's Tower     | Cybersecurity                   | `cybersecurity-charms`    |
| `sanctum`     | The Archmage's Sanctum   | Advanced Software Development   | `software-sorcery`        |

The map summarizes [source metadata](../src/data/curriculum.ts); it is not a completed syllabus. AI Fundamentals currently represents a human-facing course preview about AI, not the planned Code Coven for AIs experience.

## Intended learning cycle

**Implemented for the pilot:** clear objective → explanation/example → practical challenge → evidence → assessment/feedback → next activity. Each learner should know what they are practicing, how to begin, and what the feedback means. A lesson completion click or elapsed time alone should not be mistaken for demonstrated capability.

**Broader Proposed extensions**, beyond the pilot fields now implemented in LearningLesson and the AI specification:

- Stable objective and capability identifiers linked to a concept.
- Audience presentation variants, prerequisites with a reason, and accessible alternatives.
- Task specification, expected outputs or rubric, feedback guidance, and hints.
- Evidence records separating attempts, evaluation results, and capability decisions.
- Content/schema version and provenance, especially for machine consumption.

Choose the smallest useful extension only when implementing a reviewed lesson. Keep content and assessment logic out of page components; preserve stable links where possible. Define migrations before treating a future persisted record as durable.

## Practical challenges, assessment, and progression

**Implemented:** form-based knowledge checks with explanations of incorrect answers and exact expected-output text practice. [checkPrintAnswer](../src/learning/evaluate.ts) accepts one lowercase print call containing a plain single-line quoted string and compares the extracted text plus newline. It recognizes limited syntax; it does not execute Python, evaluate expressions, or validate all legal Python. Matching single/double quotes and surrounding whitespace are supported; escapes, comments, variables, multiple arguments, and extra statements are rejected.

**Planned:** broader practical challenges and trustworthy assessment. Pilot completion means every activity has passed its local check at least once, not independently assessed mastery. Broader mastery thresholds remain undecided. Possible checks include deterministic output tests, explanation rubrics, or project review; these are **Proposed** options, not selected historical alternatives.

**Planned:** capability-based progression. Age and XP should not be substitutes for demonstrated understanding. A learner who already knows a concept should have a considered way to show it, while another learner can revisit material without punitive locks. How evidence is collected, reviewed, stored, and made understandable still requires founder and engineering decisions.

XP, streaks, and achievement displays are currently demo presentation only. Do not connect the sample numbers to a future learner record or claim that demo rewards have been earned.

## Controlled code execution

**Planned:** controlled practice execution. **Implemented today:** no runner, interpreter, sandbox, server execution, or tool-grant interface. The existing Potion Lab route remains informative text; pilot practice checks source text without running it.

Before introducing execution, decide the runtime and threat model. **Proposed design constraints** include resource/time limits, isolation from application credentials and personal files, network/filesystem restrictions, resettable sessions, bounded outputs, and accessible errors. Browser-based and isolated remote runtimes are options to evaluate, not selected dependencies. Never run untrusted lesson/agent code directly in the application or developer shell as a shortcut.

This architecture document does not authorize provisioning infrastructure or services. Maintain the academy's free-to-learn promise and decide operational constraints before selecting a runner.

## AI lessons and human–AI collaboration

**Implemented:** a versioned JSON pilot with objective/concept/capability IDs, prerequisites, explanations/examples, tasks, outputs, success criteria, test cases, and error feedback. [Valibot schemas](../src/learning/schema.ts) validate content and a future request envelope, reject unknown properties, require no execution/permissions, and check identifier references. [Local sample evaluation](../src/learning/agent.ts) is deterministic pure text checking, not a public API. Passing demonstrates successful task performance under this checker, not humanlike understanding, consciousness, or permanent learning.

**Planned:** authorized agent delivery and integrations. A task specification must not silently grant access to a learner's resources. See [AI Integration](AI_INTEGRATION.md) for schema versions, example contracts, and limitations.

**Planned:** human–AI collaboration that makes authorship, assistance, and assessment evidence understandable. **Proposed** practices include identifying who attempted a task, what assistance occurred, and when a human must review an outcome. No chat provider, collaboration protocol, model, or automated tutor has been selected. Ask Hexi currently offers no connected assistant.

Machine-readable content and submitted outputs should be treated as data, not trusted instructions to alter platform permissions. Design execution boundaries and evaluation together; distinguish an AI's successful task result from a claim about its internal understanding.

## Local progress and privacy

**Implemented:** [progress helpers](../src/learning/progress.ts) and [the UI hook](../src/learning/useLessonProgress.ts) save only completed activity IDs, schema version, and lesson version under separate Kids Little/Junior/Adults browser keys. No names, ages, submitted code, or answers are persisted or transmitted. Reset removes only the active variant's record. Corrupt/stale/unknown fields are filtered; blocked or full storage falls back to in-memory completion with a notice. The existing Python AI pages create no progress/retention record. Mission 017 explicitly adds isolated browser practice completion on its AI workbench; that is not external agent retention.

These records are local and editable by the browser owner; they are not a trusted evidence system or account synchronization. No streaks, XP, public profiles, chat, or leaderboards are added to the Kids experience. Real learner records, collaboration, and capability-based progression remain Planned.

## Delivery questions and verification

Mission 008 selects the print() objective and first pilot for all three experiences. Crystal still needs to prioritize subsequent content, define broader readiness/mastery expectations, and choose the role of adult support and AI assistance. Data collection, consent/supervision requirements, retention, and any account model require separate design review before implementation. This document does not make legal or compliance claims.

For a future working lesson, verify objective clarity, audience readability, keyboard/assistive access, challenge/feedback consistency, assessment reliability, execution boundaries, and truthful progress reporting. Mission 008 adds native unit tests and production-browser checks for metadata, adaptations, checking, versioned validation, local progress, navigation, keyboard interactions, copy/download controls, storage failure, and responsive themes. No educational effectiveness or full accessibility conformance has been established.

See the [Feature Registry](FEATURE_REGISTRY.md) for delivery status and the [Decision Log](DECISION_LOG.md) for recorded choices and unresolved context.

## Mission 009 · Developmentally appropriate feedback

**Implemented:** Little Apprentices use an optional `LessonTeaching` configuration on their existing lesson variant. [Types](../src/types/learning.ts) define feedback-copy, practice-notice, and completion-card fields. [Little teaching data](../src/data/lessons/little-apprentice-teaching.ts) owns the lesson-specific messages and navigation, rather than embedding them in shared UI. This is reusable infrastructure; no other lesson variant has opted into it yet.

The [presentation helper](../src/learning/feedback.ts) consumes the existing checker result and offers one likely correction for missing/mismatched quotes, missing round brackets, a function-name mistake, or a mismatched message. Complex unsupported input receives a short supported-example hint. It is not a new Python parser and never marks an invalid attempt correct. [checkPrintAnswer](../src/learning/evaluate.ts), its accepted patterns/expected outputs, AI evaluation, and schema versions are unchanged. Knowledge questions keep the same IDs/options/correct answers; only Little-specific feedback is copied into isolated question objects so shared Junior/Adults content does not mutate.

**Implemented completion:** the existing `recognize`, `predict`, and `practice` IDs must all be completed before the new Little celebration renders. The same browser-local progress is read on return; no new identity, personal data, award state, or synchronization is introduced. Wrong attempts do not advance progress; retries are unrestricted. Existing policy remains: an earlier successful activity stays completed until reset even if a learner later types a new incorrect answer. Editable browser records are not trusted mastery evidence.

A newly completed attempt can animate once; an already completed lesson restores a static celebration. Reset removes the current variant's progress using the unchanged helper and hides the celebration until all activities are completed again. Review focuses the lesson heading without resetting anything. Return navigates to `/learn/kids`, not a nonexistent Lesson 002.

**Educational principles:** short actionable explanations reduce overwhelm; recognizing completed work need not create pressure, artificial urgency, forced streaks, or manipulative rewards. Celebrate what this guided practice establishes while separately explaining that no Python was executed. Full Python execution, formal achievement tracking, trusted capability assessment, and broader audience validation remain Planned. These boundaries are useful reference patterns for independent projects such as Alignment Academy; they imply no shared ownership, private access, or branding permission.

## Mission 016 · Variables lesson and safe checker

**Implemented locally:** [variables data](../src/data/lessons/python-variables.v1.json) supplies lesson `python-variables-002`, content/specification v1.0.0, six objectives, three examples, four shared tasks, and 20 deterministic cases. Module `python-variable-basics` follows `python-output-basics` in Python Potions. Lesson 001 is a recommended prerequisite, never an access lock.

[Human adapters](../src/data/lessons/python-variables.ts) distinguish Little's short labeled-box explanations and guided starters, Junior's shorter independent challenges, and Adults' two-variable inventory and reassignment practice. Each has six required activities: three checks plus three quests for Kids, four checks plus two quests for Adults. All get a gated Hexi celebration. [VariableVault](../src/pages/VariableVault.tsx) reuses shared knowledge checks, examples, completion card, progress storage, themes, and responsive classroom layout. A small optional example-output notice keeps Lesson 001's existing default copy unchanged.

[checkVariableAnswer](../src/learning/variables.ts) is a bounded text model, not Python execution. Supported lines are literal assignment and `print(variable)`. It supports plain matching single/double-quoted strings without escapes, integers from -9999 to 9999, and ASCII names up to 40 characters (excluding keywords and `print`). Input is bounded at 500 characters and 12 lines. Imports, loops, expressions, comments, indented blocks, calls, escapes, prompts, and other forms are rejected. Python itself allows many of these forms; rejection here does not claim they are invalid Python.

Task checks require the declared value types and statement shapes, not merely a matching printed string. Reassignment needs the same name printed before and after its changed numeric value. Values are tracked in a local Map only to infer this narrow pattern's output; source is never evaluated, executed, or sent anywhere. The old [print checker](../src/learning/evaluate.ts) and Lesson 001 schemas are unchanged.

Each lesson/variant keeps separate existing progress keys; only completed activity IDs and record/content versions persist. No answers, code, names, ages, timestamps, account synchronization, XP, or AI retention are added. Already-completed activities remain complete until reset. Reset clears only the active Lesson 002 variant and its current form state. Restore uses a static celebration; fresh completion has the existing reduced-motion-aware entrance.

**Planned:** eventual integration with a separately reviewed real Python Potion Lab. The versioned examples and expected outputs can be adapter inputs in future authorized work, but there is no runner import, iframe bridge, API call, executor URL, or deployment in this lesson. This mission neither imports unpublished Potion Lab work nor changes its approved isolation/security architecture. Execution approval must be separate from lesson publication.


## Mission 017 · Programming Fundamentals

**Implemented locally:** Department cottage → existing path cottage-path → course programming-foundations → module programming-thinking-basics → lesson programming-thinking-001, content/specification 1.0.0. This is distinct from Python Lesson 001. Course and pathway pages link to all four experiences; no prerequisites lock access. At the Mission 017 phase-one baseline, five other courses had empty modules; Mission 017B populates Web Enchantment.

[Versioned data](../src/data/lessons/programming-thinking.v1.json) owns six shared objectives, four differentiated introductions/sections, three questions and three practice tasks per experience, and 24 declared deterministic cases. [Strict schemas](../src/learning/thinking-schema.ts) reject unknown fields, versions, execution permissions, duplicate IDs and inconsistent references/orders. [Adapters](../src/data/lessons/programming-thinking.ts) register the lesson in the existing curriculum without changing legacy types or Python data.

[The finite checker](../src/learning/thinking.ts) requires a permutation of the supplied step IDs in the declared dependency order. It rejects blanks, duplicates, unknown IDs and oversized input; hints identify the first wrong position. Every wrong attempt remains retryable. It does not parse natural language, execute code, control a robot, call a model or contact an executor. Other reasonable real-world workflows are outside each task's explicitly stated simplified scenario.

[The classroom](../src/pages/ThinkingLesson.tsx) and [sequencing control](../src/components/lessons/SequencePractice.tsx) reuse existing knowledge checks, progress helpers, Hexi celebration and classroom styling. All six activities must pass at least once. The lesson ID plus variant scopes completion; reset clears that variant's record, its forms and session assessments. A plan's Start Again button resets only that plan, retaining prior completion as disclosed. Fresh completion animates once; restored completion is static and reduced motion suppresses animation.

The AI workbench includes the same interactive learning cycle, explicit performance limits, lesson/sample JSON and current-session assessment downloads. The last 20 practical checks exist only in memory, are lost on navigation/reload/reset and never automatically transmitted. Only completed IDs and record/content versions may persist for all four experiences. AI browser practice completion does not establish an agent identity, external learning history or trusted mastery. Python AI storage behavior is unchanged. Specification/request validation plus finite comparison follows the established local AI architecture without a public API.

**Planned:** the remaining five course introductions, real learner/assistive-technology review, and richer checking only under later scoped approval. No Mission 017 execution infrastructure is authorized. See [review](MISSION_017_REVIEW.md).


## Mission 017B · Bounded HTML anatomy

**Implemented locally:** workshop → workshop-path → web-enchantment → web-html-basics → web-html-anatomy-001. Existing Department/Path/Course/Module/Lesson/Challenge types and IDs remain intact. [Versioned data](../src/data/lessons/web-html.v1.json), validated by [strict schemas](../src/learning/html-schema.ts), supplies six objectives, four adaptations, three checks plus three practices per adaptation, accepted examples and 36 deterministic assessment cases. [The adapter](../src/data/lessons/web-html.ts) registers the lesson. No old lesson data or progression contract changes.

[checkHtml](../src/learning/html.ts) tokenizes a bounded source string into an inert small tree, checks balanced explicit tags and validates the requested shape/content. Accepted fragments are one h1 or h1 then p, with no attributes. The full document requires doctype, html lang=en, head containing UTF-8 meta then title, and body containing h1 then p. Attribute values require matching single/double quotes. Tag case and harmless whitespace are normalized. Limits: 1600 source characters, 16 elements and 160 normalized plain-text characters per text element. Entities, comments, URLs, general attributes, other tags and optional-end-tag forms are unsupported. These are checker limits, not general HTML-validity rules.

Only a passing result produces a heading/paragraph/optional title text model. [HtmlPractice](../src/components/lessons/HtmlPractice.tsx) displays that model through fixed React elements and text children. Submitted markup is never passed to a browser HTML parser, innerHTML, iframe/srcdoc, document.write or script evaluation. There is no untrusted rendered document to isolate, no resource URL binding and no academy-storage interface for markup. Labels explicitly describe a simplified safe model instead of a real browser preview. No CSP, executor isolation or other security architecture change is needed.

[WebLesson](../src/pages/WebLesson.tsx) reuses native knowledge checks, browser progress helpers, Hexi and the celebration component. Little’s tags/words are selected in labeled blocks; older learners edit a bounded textarea. Every activity must pass at least once. Wrong attempts do not advance completion; retries are unlimited. Reset clears only the active lesson/variant and current forms/session results. Activity reset restores only that form and retains prior completion as disclosed by the progress policy. Fresh celebrations animate once, restored celebrations are static and reduced motion is respected.

AI lesson/sample downloads use specification/content v1.0.0, checker restricted-html-structure-v1, explicit task IDs and deterministic pass/fail/feedback. Strict request fields are specificationVersion, contentVersion, lessonId, taskId and source; unknown fields/permissions/versions/tasks fail validation. Records include executed:false and renderedAsHtml:false. Up to 20 practical results remain in memory for optional session download, cleared on reload/navigation/reset; no source or answers are saved. All four experiences may save completion IDs and versions under isolated browser keys, without account synchronization, external agent identity or retained-learning claims.

The old thinking test’s academy count is updated from two to three populated courses; its sequencing assertions and existing lesson implementation are unchanged. Four future course introductions remain Planned. See [review](MISSION_017B_REVIEW.md).


## Mission 017C · Defensive scenario checking

**Implemented locally:** tower → tower-path → cybersecurity-charms → cyber-defensive-basics → cyber-guardian-shield-001. [Versioned data](../src/data/lessons/cyber-shield.v1.json), [strict schema](../src/learning/shield-schema.ts) and [adapter](../src/data/lessons/cyber-shield.ts) reuse the existing hierarchy and introduce no new platform service.

Every variant covers six shared objectives in six short sections, with three native knowledge checks and three two-part practical scenarios. The practical response consists only of a supplied classification and action ID. [The evaluator](../src/learning/shield.ts) requires both to match the authored case; unknown/missing values fail safely and retries are unrestricted. It does not inspect arbitrary messages, visit addresses, send reports or execute the described action. The label no-warning-shown describes the supplied context only, never guarantees safety or grants permissions.

[ShieldPractice](../src/components/lessons/ShieldPractice.tsx) renders fictional message cards, addresses and attachment descriptions as React text. Reserved .invalid addresses cannot become action links through this component; there is no href, external resource binding, file attachment or free-text/credential field. [The classroom](../src/pages/ShieldLesson.tsx) reuses knowledge checks, the unchanged progress hook, original Hexi and completion card. A static numbered storyboard supports Little’s castle-gate adventure without changing artwork.

All six activities must pass at least once. Lesson/variant keys store only completed IDs and versions; reset clears only the active record/forms/session results. An activity reset retains prior completion under the existing disclosed policy. Restored celebrations are static; fresh completion uses existing reduced-motion behavior. No personal information or responses are persisted or transmitted.

AI specification/content versions are 1.0.0; checker fixed-defensive-choice-v1. Requests allow exactly specificationVersion, contentVersion, lessonId, taskId, classification and actionId. Strict validation rejects source payloads, secret/personal-data fields, permissions, unknown versions/tasks/actions. All 36 sample cases have expected classifications/actions/responses and explanations; records include executed:false and actionsPerformed:false. The AI page displays its nine task-specific cases, while downloads include all variants’ 36 cases. Optional current-session downloads expose up to 20 in-memory practical results only; reload/navigation/reset clears them. Browser completion is not an external agent identity, retained learning or mastery evidence.

Existing Python/Thinking/HTML implementations and security boundaries remain unchanged. Two preexisting tests update only the populated-course count to four. The next three course introductions remain Planned. See [review](MISSION_017C_REVIEW.md).


## Mission 017D · Algorithms beyond sequencing

**Implemented locally:** library → library-path → algorithm-alchemy → algorithm-recipe-basics → algorithm-recipe-001. Canonical [versioned data](../src/data/lessons/algorithm-recipe.v1.json) defines six objectives and four experiences. Programming Fundamentals is recommended background, not an access gate.

Each experience includes three checks and three practicals: (1) select/order three necessary operations from four while omitting the stated unnecessary step; (2) trace both true and false inputs of an IF/ELSE rule; (3) identify a repeated unit, iteration count and exact final output. Every field must match the supplied trace. Little learners use pretend potion ingredients; Junior learners see simple pseudocode; Adults also design a parcel workflow and batch label pattern; AIs receive the same bounded contracts and explanations. Repeated groups, decisions and goal-preserving improvements extend the earlier sequencing lesson.

The [checker](../src/learning/algorithm.ts) compares finite choice arrays. It is not an interpreter, algorithm optimizer, arbitrary plan evaluator or real potion lab. Pseudocode is inert text. Strict schemas pin versions and reject unknown permissions/source/credential fields. Local progress stores only IDs and content/record versions; up to 20 session assessments are memory-only. Per-activity reset clears current choices but preserves earned completion; full reset clears the current variant and session only. Completion is not trusted mastery or persistent AI learning. Existing lesson implementations, helpers, assets, security headers and executor isolation are unchanged. See [review](MISSION_017D_REVIEW.md).

## Mission 017E · AI mechanisms, evidence and responsibility

**Implemented locally:** observatory → observatory-path → ai-fundamentals → ai-first-spark-basics → ai-first-spark-001. The [canonical lesson](../src/data/lessons/intelligence-spark.v1.json) shares six objectives across four experiences. It distinguishes the AI subject course from the AI learner pathway.

Each experience has three checks and three practicals: classify a written-rule gate, example-trained sorter and learned story generator; inspect a tiny fictional training set plus a supplied mistaken prediction/held-out answer; and select evidence-supported, privacy-aware, clarified responses with human oversight. The AI-specific third practical follows a summarize-only instruction, rejects an invented time, asks for an explicit date/time zone and protects fictional private information. Expected responses and explanations are explicit.

The tiny set does not mathematically determine a trained model; its prediction is supplied as authored evidence. No classifier is trained or called. Narrow coverage motivates evaluation without claiming that more data alone proves fairness or reliability. Training, inference and separate updates are distinguished; fluent generation is not guaranteed truth or evidence of consciousness.

[Finite checking](../src/learning/intelligence.ts) compares supplied IDs and rejects unsupported contract fields/versions. Existing progress helpers store completion IDs/versions only. Practical records are memory-only, capped at 20 for download and cleared on reload/navigation/full reset. Individual reset preserves previously earned completion; full reset isolates current lesson/variant. No answers or personal data are sent or persisted. [Small catalog metadata](../src/data/lessons/intelligence-entry.ts) prevents eager loading of full new lesson content; tests verify parity. Earlier lesson source/helpers/artwork/security/executor boundaries remain unchanged.

## Mission 017F · Project engineering beyond instructions

**Implemented locally; awaiting publication approval:** sanctum → sanctum-path → software-sorcery → software-project-basics → software-spellbook-001. Six shared objectives cover software/app purpose, requirements, iterative lifecycle, components, quality/feedback and version control/collaboration. No new prerequisite gate.

Three practicals per variant assess (1) small useful feature scope, keyboard quality requirement and clarification of missing-item behavior; (2) screen/storage/lookup responsibilities, save-before-lookup dependency and a cycle including retesting; (3) a first-record lookup defect, tests for both known items and the agreed missing case, plus truthful version/review/release evidence. Little learners use Hexi’s fictional treat boxes. Adults use a fictional equipment tracker and learn functional/nonfunctional requirements and MVP tradeoffs. AIs explicitly avoid invented requirements or unobserved test passes.

The finite checker compares three supplied choice IDs, never runs code, Git or a test suite, and never changes a student repository. Simulation disclosures distinguish educational checks from real development tools. Strict v1 contracts, original progress/reset helpers, ephemeral session records and the gated reduced-motion-aware celebration follow existing patterns. See [review](MISSION_017F_REVIEW.md).

## Mission 017F · Current introductory inventory

This table supersedes earlier missions’ historical remaining-course counts. Every existing department/course has an introduction locally. Baseline presence means verified in GitHub source at Mission 017E, not fresh live Cloudflare verification. **Software Sorcery is local only and awaits founder publication approval.** Catalog lesson totals remain planned scope, not implemented counts.

| Department | Existing course | Implemented introductory lessons | Status in this mission |
|---|---|---|---|
| Cottage | Programming Fundamentals / Your First Spell | Thinking Like a Programmer | Present in verified GitHub baseline; preserved |
| Potions | Python Potions | Lesson 001 output; Lesson 002 Variable Vault | Present in verified GitHub baseline; preserved |
| Workshop | Web Enchantment | The Anatomy of a Magical Web Page | Present in verified GitHub baseline; preserved |
| Library | Algorithm Alchemy | The Alchemist’s Recipe | Present in verified GitHub baseline; preserved |
| Observatory | AI Fundamentals | The Familiar’s First Intelligence | Present in verified GitHub baseline; preserved |
| Tower | Cybersecurity Charms | The Guardian’s First Shield | Present in verified GitHub baseline; preserved |
| Sanctum | Software Sorcery | The Software Spellbook | **Implemented locally; unpublished by this mission** |

Seven courses, eight individual lessons, four audience adaptations per lesson. This completes the Great Classroom Awakening’s introductory local coverage, not the full curriculum, trusted mastery progression or execution platform. No later course/lesson implementation is included.


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
