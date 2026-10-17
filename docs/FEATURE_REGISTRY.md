# Feature Registry

Last reviewed: 2026-10-17 · Baseline: v0.3.0 + Mission 008/009 pilot + Mission 015 artwork-label cleanup

## How to read and maintain this registry

Each stable feature ID records name, purpose, intended audience, learning/usability benefit, implementation location, dependencies, status, accessibility, security, and future improvements. A working preview is a different feature from the educational workflow it depicts. Source links are evidence; for unbuilt features, locations are explicitly **none**, with design references rather than invented modules.

### Status vocabulary

- **Implemented:** present in the inspected repository, within the scope stated. Does not imply production deployment, finished artwork, educational validation, or complete accessibility conformance.
- **In Progress:** implementation has actually started but is incomplete; identify existing work and what remains.
- **Planned:** intended work established by the founder brief or existing coming-soon product copy, not yet implemented.
- **Proposed:** an option or detail awaiting a decision, not an approved delivery commitment.
- **Deprecated:** retained for history but no longer the supported direction; identify its replacement when known.

No feature is currently verified as In Progress or Deprecated. Do not apply those labels just to fill a category. Specific technical options inside Planned features may remain Proposed. Entries below are a code/brief inventory, not a record of deployment or completed learner outcomes.

## Implemented interface and infrastructure

### F01 — Public academy and navigation

- **Status:** Implemented.
- **Purpose:** welcome visitors and connect public pages to the demo student area.
- **Audience:** current visitors; future human learners/supporters.
- **Benefit:** discover the academy without creating an account.
- **Location:** [Home](../src/pages/Home.tsx), [PublicLayout](../src/layouts/PublicLayout.tsx), [App](../src/App.tsx).
- **Dependencies:** React, React Router, Lucide, shared styling.
- **Accessibility:** semantic landmarks, headings, labeled expandable mobile navigation, real links.
- **Security:** static local content; no login, payment, or external script integration.
- **Future improvements:** improve content alongside real lessons while preserving open exploration.

### F02 — Academy map and seven department destinations

- **Status:** Implemented, as exploration and metadata.
- **Purpose:** organize programming subjects into navigable locations.
- **Audience:** visitors and future learners of all experiences.
- **Benefit:** clear subject orientation without unrelated department locks.
- **Location:** [Explore](../src/pages/Explore.tsx), [DepartmentGrid](../src/components/DepartmentGrid.tsx), [DepartmentCard](../src/components/DepartmentCard.tsx), [curriculum data](../src/data/curriculum.ts).
- **Dependencies:** local department/path/course IDs, Router, F11 artwork.
- **Accessibility:** textual card names and subject labels; illustrations are decorative.
- **Security:** fixed local metadata; unknown IDs use a not-found screen.
- **Future improvements:** populate paths without confusing planned lessons with completed teaching content.

### F03 — Course catalog, search, and department filter

- **Status:** Implemented.
- **Purpose:** browse/filter course metadata.
- **Audience:** visitors and demo students.
- **Benefit:** locate an appropriate subject and see useful empty results.
- **Location:** [Explore / Courses](../src/pages/Explore.tsx), [CourseCard](../src/components/CourseCard.tsx).
- **Dependencies:** local course data, React state, Router.
- **Accessibility:** associated input/select labels and result-count status text.
- **Security:** text filtering only; no query execution, uploads, or remote search.
- **Future improvements:** meaningful learning objectives and richer metadata when content exists.

### F04 — Course previews, pilot entry, and not-found routing

- **Status:** Implemented; Python and Programming Fundamentals link to complete introductory lessons; five courses remain previews.
- **Purpose:** provide stable course routes and honest availability messages.
- **Audience:** visitors and human/AI pilot learners.
- **Benefit:** reach working content without broken links or invented completed courses.
- **Location:** [Explore](../src/pages/Explore.tsx), [CourseCard](../src/components/CourseCard.tsx), [App](../src/App.tsx).
- **Dependencies:** course/department IDs, optional `learningEntry`, BrowserRouter.
- **Accessibility:** headings, back links, route focus, textual availability notices.
- **Security:** unknown IDs show not-found; previews and lessons execute no submitted code.
- **Future improvements:** populate additional courses while preserving URLs.

### F05 — Demo student dashboard and profile

- **Status:** Implemented, with sample statistics and progress only.
- **Purpose:** show the intended common-room experience.
- **Audience:** demo visitors; no authenticated students exist.
- **Benefit:** preview course continuation, level/XP/streak displays, and navigation.
- **Location:** [Dashboard](../src/pages/Dashboard.tsx), [DashboardLayout](../src/layouts/DashboardLayout.tsx), [demoProgress](../src/data/curriculum.ts), [CourseCard](../src/components/CourseCard.tsx).
- **Dependencies:** local sample data, local-time greeting, Router.
- **Accessibility:** heading structure, labeled native progress bars, visible demo notices.
- **Security:** no saved student identity, achievement evidence, or account records.
- **Future improvements:** real evidence-based progress only after F23 is designed.

### F06 — Student sidebar and responsive navigation

- **Status:** Implemented.
- **Purpose:** keep student destinations consistently reachable.
- **Audience:** demo dashboard visitors.
- **Benefit:** desktop orientation with usable mobile expansion.
- **Location:** [DashboardLayout](../src/layouts/DashboardLayout.tsx), [App](../src/App.tsx), [styles](../src/styles/index.css).
- **Dependencies:** Router active links, Lucide, React menu state.
- **Accessibility:** named navigation, toggle labels, `aria-expanded`, visible focus.
- **Security:** no hidden permission system; menu visibility is presentation only.
- **Future improvements:** expand assistive-technology and zoom/reflow validation.

### F07 — Hexi portrait, tips, and encouragement

- **Status:** Implemented; original portrait retained by Mission 015, tips are authored local text.
- **Purpose:** provide a familiar companion and small coding reminders.
- **Audience:** current visitors; future human learners.
- **Benefit:** supportive, user-paced encouragement.
- **Location:** [Hexi](../src/components/Hexi.tsx), [HexiCorner](../src/components/HexiCorner.tsx), [tips](../src/data/curriculum.ts).
- **Dependencies:** original local SVG, React state; no AI provider.
- **Accessibility:** descriptive mascot alt text, polite tip updates, button-controlled rotation.
- **Security:** no chat, input processing, or model connection.
- **Future improvements:** preserve the current portrait per [ARTWORK](../ARTWORK.md); any new portrait or expression variants require separate direction.

### F08 — Daily quest and reward preview

- **Status:** Implemented, as a static demo preview.
- **Purpose:** illustrate a daily practice prompt and sample reward.
- **Audience:** demo students.
- **Benefit:** communicate the future challenge loop without claiming completion.
- **Location:** [DailyQuestCard](../src/components/DailyQuestCard.tsx), [quest placeholder](../src/pages/Placeholder.tsx).
- **Dependencies:** local copy, Router.
- **Accessibility:** readable prompt, textual reward, clear preview notice.
- **Security:** awards no XP and stores no completion activity.
- **Future improvements:** implement real quests only with F17/F22/F23 learning evidence.

### F09 — Daylight/Midnight themes

- **Status:** Implemented.
- **Purpose:** offer two brand-consistent visual themes.
- **Audience:** human visitors.
- **Benefit:** personal visual preference persists across reloads.
- **Location:** [ThemeProvider](../src/theme/ThemeProvider.tsx), [ThemeToggle](../src/components/ThemeToggle.tsx), [styles](../src/styles/index.css).
- **Dependencies:** React context, root dataset, browser localStorage with error fallback.
- **Accessibility:** destination-theme labels, readable color tokens, reduced-motion styles.
- **Security:** persists only `code-coven-theme`; not learner identity or progress.
- **Future improvements:** review initial theme paint and system-preference options if approved.

### F10 — Shared accessibility and responsive presentation

- **Status:** Implemented safeguards; not a full conformance claim.
- **Purpose:** support keyboard use, orientation, varied widths, and reduced motion.
- **Audience:** human visitors, including assistive-technology users.
- **Benefit:** usable navigation and content with less reliance on animation or pointer precision.
- **Location:** [App](../src/App.tsx), [base styles](../src/styles/index.css), [enchantment styles](../src/styles/enchantment.css), [browser checks](../scripts/verify-browser.cjs).
- **Dependencies:** semantic HTML, focus behavior, CSS media queries.
- **Accessibility:** skip link, focus outlines, landmark focus, labels and responsive stacking; audience testing remains incomplete.
- **Security:** no special permissions or tracking needed.
- **Future improvements:** screen-reader, zoom, readability, and audience-specific testing; see [Design System](DESIGN_SYSTEM.md).

### F11 — Magical scenery and preserved local illustrations

- **Status:** Implemented rendering and optional source hooks; Mission 015 retains current illustrations and removes temporary artwork labels.
- **Purpose:** establish an enchanted academy atmosphere.
- **Audience:** human visitors.
- **Benefit:** recognizable destinations and a coherent setting.
- **Location:** [MagicalScenery](../src/components/MagicalScenery.tsx), [DepartmentArtwork](../src/components/DepartmentArtwork.tsx), [CourseIllustration](../src/components/CourseIllustration.tsx), [art registry](../src/data/artwork.ts), [assets](../src/assets).
- **Dependencies:** existing local SVG/imported images and shared components; temporary-label flags removed.
- **Accessibility:** adjacent text names destinations; Hexi retains descriptive alt text; controls remain HTML. Removing temporary labels also removes them from card link names; useful headings, difficulty labels, and focus behavior remain.
- **Security:** no remote stock-image service; replacement assets need review and permission.
- **Future improvements:** preserve current artwork; review any separately requested replacement and responsive crops per [ARTWORK](../ARTWORK.md).

### F12 — Modular curriculum types and metadata

- **Status:** Implemented, including populated output, variables and programming-thinking modules/lessons.
- **Purpose:** separate canonical objectives, adaptations, and course presentation.
- **Audience:** maintainers and human/AI pilot learners.
- **Benefit:** one print objective serves all three classroom experiences.
- **Location:** [curriculum types](../src/types/curriculum.ts), [LearningLesson](../src/types/learning.ts), [canonical JSON](../src/data/lessons/python-output.v1.json), [adapters](../src/data/lessons/python-output.ts), [course data](../src/data/curriculum.ts).
- **Dependencies:** TypeScript, Valibot validation, stable IDs, existing hierarchy.
- **Accessibility:** content variants carry readable explanations and text feedback; this is not proof of audience suitability.
- **Security:** specification is validated before use; content does not grant execution privileges.
- **Future improvements:** more concepts, content review, and migration policy without duplicating foundational logic.

### F13 — Informational and coming-soon destinations

- **Status:** Implemented informational pages; named future services remain unimplemented.
- **Purpose:** explain About, Privacy, Accessibility, Log In, Community, and student placeholder destinations.
- **Audience:** visitors/demo students.
- **Benefit:** no broken feature links or false claims of working services.
- **Location:** [Placeholder](../src/pages/Placeholder.tsx), [App](../src/App.tsx).
- **Dependencies:** local copy, Hexi, Router.
- **Accessibility:** headings and explanatory text, back-to-dashboard link.
- **Security:** no authentication, messages, saved notes, or account settings beyond F09.
- **Future improvements:** keep scope notices aligned with actual functionality and data practices.

### F14 — Static build and Pages preparation

- **Status:** Implemented local preparation; deployment not verified by this blueprint.
- **Purpose:** produce static output and document routing/build configuration.
- **Audience:** maintainers and future site visitors.
- **Benefit:** reproducible build and a documented hosting handoff.
- **Location:** [package](../package.json), [Vite config](../vite.config.ts), [runtime pin](../.nvmrc), [DEPLOYMENT](../DEPLOYMENT.md).
- **Dependencies:** pinned Node/pnpm, Vite, TypeScript, native Pages SPA fallback when hosted there.
- **Accessibility:** hosting changes must preserve deep-link navigation and asset loading.
- **Security:** no Worker, database, or deployment credential is embedded in the app.
- **Future improvements:** verify an actual edge deployment only when separately authorized; keep host instructions in DEPLOYMENT.md.

### F15 — Site metadata, favicon, and page titles

- **Status:** Implemented basic metadata; final-domain URLs remain absent.
- **Purpose:** provide site identity and readable route titles.
- **Audience:** visitors, browsers, and search/social clients.
- **Benefit:** orientation and basic link identity.
- **Location:** [index.html](../index.html), [App](../src/App.tsx), [favicon](../public/favicon.svg).
- **Dependencies:** local Hexi asset, route metadata.
- **Accessibility:** descriptive document titles support navigation context.
- **Security:** no invented production domain or remote script.
- **Future improvements:** approved absolute canonical/share-image URLs and consider prerendering; current SPA is not rich per-page server-rendered SEO.

### F16 — Security declarations and verification tools

- **Status:** Implemented declarations/scripts, not a comprehensive security certification.
- **Purpose:** constrain hosted resources and catch build/navigation regressions.
- **Audience:** developers/operators; indirect visitor benefit.
- **Benefit:** repeatable checks and reduced accidental exposure.
- **Location:** [headers](../public/_headers), [ignore rules](../.gitignore), [build tests](../scripts/verify-build.mjs), [browser tests](../scripts/verify-browser.cjs), [README](../README.md).
- **Dependencies:** Node tests, TypeScript, Prettier, optional separately installed Playwright/Chrome.
- **Accessibility:** browser checks include selected keyboard, reduced-motion, and overflow behavior.
- **Security:** ignores secrets/generated files; CSP is applied by hosting or simulated in the browser check, not enforced by Vite dev itself.
- **Future improvements:** expand threat/accessibility reviews when real data, content ingestion, or execution is introduced; no semantic lint is configured.

## Educational and learner workflows

### F17 — Shared lessons, objectives, and practical challenges

- **Status:** Implemented for output, variables and programming-thinking lessons; broader beginner-to-advanced curriculum remains Planned.
- **Purpose:** teach one canonical objective through differentiated explanations and tasks.
- **Audience:** Kids, Adults, and AI/developer experiences.
- **Benefit:** clear goal, example, practice, feedback, and explicit success criteria.
- **Location:** [canonical data/adapters](../src/data/lessons/python-output.ts), [JSON](../src/data/lessons/python-output.v1.json), [HumanLesson](../src/pages/HumanLesson.tsx), [AiLesson](../src/pages/AiLesson.tsx).
- **Dependencies:** F12, F22, F32–F35; no interpreter.
- **Accessibility:** semantic headings, labeled activities, text equivalents for syntax cues.
- **Security:** text-only checks; no code execution or remote submissions.
- **Future improvements:** learner evaluation and the next reviewed concept, not mass placeholder generation.

### F18 — Little Apprentices (ages 6–9)

- **Status:** Implemented pilot; broader pathway and target-audience validation remain Planned.
- **Purpose:** offer friendly introductory print() practice.
- **Audience:** children around 6–9 or anyone choosing guided difficulty.
- **Benefit:** recognize a correct spell, predict its output, and finish guided text practice; receive short actionable hints and a warm completion celebration (F36).
- **Location:** [Kids variant](../src/data/lessons/python-output.ts), [HumanLesson](../src/pages/HumanLesson.tsx).
- **Dependencies:** F17/F22/F33/F34; local Hexi, optional browser completion storage.
- **Accessibility:** simple language, native radios/textarea, repeatable feedback, no timers or score pressure.
- **Security:** no age/name collection, saved answers/code, accounts, chat, public profiles, leaderboards, streaks, or XP awards.
- **Future improvements:** validate reading and support needs with appropriate human review; age bands never lock access.

### F19 — Junior Spellcasters (ages 10–13)

- **Status:** Implemented pilot; broader pathway remains Planned.
- **Purpose:** introduce syntax parts and message modification.
- **Audience:** children around 10–13 or anyone choosing this difficulty.
- **Benefit:** identify quotes/string syntax, predict output, and modify a message in a challenge.
- **Location:** [Junior variant](../src/data/lessons/python-output.ts), [HumanLesson](../src/pages/HumanLesson.tsx).
- **Dependencies:** F17/F22/F33/F34.
- **Accessibility:** switch bands freely; no timed task, readable text explanations and immediate feedback.
- **Security:** no personal information requested/stored, no social/reward mechanics, no source execution.
- **Future improvements:** evaluate scope/readability and add reviewed tasks without treating age as permanent placement.

### F20 — Flexible older-learner and adult pathways

- **Status:** Planned for broader pathways; the Adults pilot is Implemented under F33.
- **Purpose:** provide flexible entry and progressively advanced routes for older learners and adults.
- **Audience:** older learners beyond the specified child bands and adult learners.
- **Benefit:** learn according to goals/readiness rather than age-only placement.
- **Location:** none implemented; existing [path interfaces](../src/types/curriculum.ts) are only scaffolding.
- **Dependencies:** F17, F22/F23, founder decisions on pathway priorities and placement.
- **Accessibility:** flexible pacing and support for varied prior knowledge/reading needs.
- **Security:** avoid collecting unnecessary demographic information; no identity service exists.
- **Future improvements:** define separate adult goals and flexible placement options; no upper-age cutoff is chosen.

### F21 — Machine-readable AI agent lessons

- **Status:** Implemented downloadable print() pilot; network integration remains Planned.
- **Purpose:** provide a versioned, inspectable task specification for developers evaluating agents.
- **Audience:** agent developers, authorized tooling, and AI learners.
- **Benefit:** canonical objective, prerequisites, examples, tasks, expected outputs, tests, criteria, error feedback, and capability IDs.
- **Location:** [JSON](../src/data/lessons/python-output.v1.json), [schema](../src/learning/schema.ts), [AiLesson](../src/pages/AiLesson.tsx), [AI integration guide](AI_INTEGRATION.md).
- **Dependencies:** Valibot strict validation and F35 local sample evaluator.
- **Accessibility:** readable web presentation alongside JSON downloads.
- **Security:** execution is `none`, permissions empty; no registration, endpoint, shell, network, filesystem, or server privileges.
- **Future improvements:** authorized delivery/version negotiation if separately approved; no claim of humanlike understanding, consciousness, or permanent learning.

### F22 — Assessment and learning feedback

- **Status:** Implemented limited pilot checks; broader assessment and mastery evaluation remain Planned.
- **Purpose:** provide immediate feedback for knowledge and source-text tasks.
- **Audience:** human pilot learners and AI sample evaluations.
- **Benefit:** explain incorrect choices and compare the requested message exactly.
- **Location:** [LessonControls](../src/components/lessons/LessonControls.tsx), [checkPrintAnswer](../src/learning/evaluate.ts), [questions](../src/data/lessons/python-output.ts).
- **Dependencies:** fixed trusted questions, bounded recognizer, declared expected outputs.
- **Accessibility:** fieldsets/legends, labeled radios, keyboard submission, polite text feedback and retries.
- **Security:** never evaluates submitted source; rejects extra statements and unsupported syntax; 500-character input bound.
- **Future improvements:** evaluate more capable controlled assessment separately. A pattern pass is task performance, not general Python validity or mastery.

### F23 — Capability-based progression and real learner records

- **Status:** Planned for trusted capability progression; browser-only pilot completion is Implemented under F34.
- **Purpose:** base progression on demonstrated capability with truthful learner evidence.
- **Audience:** future human/AI learners.
- **Benefit:** flexible readiness and useful progress beyond demo XP or elapsed time.
- **Location:** none implemented; [demo data](../src/data/curriculum.ts) must remain distinct.
- **Dependencies:** F22, founder-approved mastery criteria and record/privacy design; no storage technology selected.
- **Accessibility:** explain progression and provide nonpunitive ways to revisit material.
- **Security:** decide consent, retention, access, and integrity before real records; no authentication/database is currently implemented or authorized by this blueprint.
- **Future improvements:** approve evidence and prerequisite rules before persisting progress, streaks, or quest rewards.

### F24 — Controlled code execution / Potion Lab

- **Status:** Planned; only an informative route exists.
- **Purpose:** practice code within controlled limits.
- **Audience:** future human/AI learners.
- **Benefit:** observe program behavior and learn from safe failures.
- **Location:** no runner implemented; [placeholder](../src/pages/Placeholder.tsx), [execution design](LEARNING_ARCHITECTURE.md).
- **Dependencies:** runtime/threat-model decisions, isolation and limits, accessible output, F17/F22.
- **Accessibility:** keyboard-operable input and understandable text output/errors.
- **Security:** Proposed constraints include resource limits, resettable state, and no default access to credentials, files, or network.
- **Future improvements:** compare browser/isolated remote approaches before selecting infrastructure; never execute untrusted code in the host shell.

### F25 — Human–AI learning collaboration

- **Status:** Planned.
- **Purpose:** support understandable collaboration without obscuring who did the work.
- **Audience:** human learners, AI agents, reviewers.
- **Benefit:** explicit assistance and more interpretable learning evidence.
- **Location:** none implemented; [collaboration design](LEARNING_ARCHITECTURE.md).
- **Dependencies:** F21/F22/F24, assistance/provenance policy, founder-defined human review boundaries.
- **Accessibility:** understandable interaction history and alternate ways to receive assistance.
- **Security:** no tool/action permissions granted by lesson text; review shared content and agent boundaries.
- **Future improvements:** choose collaboration protocol and evidence conventions; no model/provider chosen.

### F26 — My Grimoire notes and projects

- **Status:** Planned; informative placeholder is Implemented under F13.
- **Purpose:** collect learner notes/projects.
- **Audience:** future human students.
- **Benefit:** reflection and revisiting work.
- **Location:** no storage/editor implemented; [grimoire placeholder](../src/pages/Placeholder.tsx).
- **Dependencies:** content/editor design and F23 privacy/record decisions.
- **Accessibility:** accessible editing, navigation, and export design.
- **Security:** treat learner content as untrusted; decide storage/retention before collecting it.
- **Future improvements:** define a minimal notes workflow without implying current persistence.

### F27 — Achievements and earned quests

- **Status:** Planned for tracked achievements/earned quests; preview displays exist under F05/F08/F13 and a local completion recognition is Implemented under F36.
- **Purpose:** recognize actual practice and milestones.
- **Audience:** future human learners; AI relevance undecided.
- **Benefit:** transparent encouragement connected to real learning.
- **Location:** no award/tracking implementation; [placeholders](../src/pages/Placeholder.tsx).
- **Dependencies:** F17/F22/F23, agreed reward/mastery policy.
- **Accessibility:** avoid streak pressure, inaccessible timing, or reward-only/color-only feedback.
- **Security:** do not award from client sample values; real evidence/integrity rules need design.
- **Future improvements:** define achievement meaning and optionality; never relabel demo totals as earned.

### F28 — Community

- **Status:** Planned; public coming-soon page exists.
- **Purpose:** support a welcoming learner community.
- **Audience:** future learners; age-group access and participation remain undecided.
- **Benefit:** shared encouragement and learning support.
- **Location:** no discussion/messaging implementation; [community placeholder](../src/pages/Placeholder.tsx).
- **Dependencies:** founder-approved scope, moderation, reporting, safety/privacy review.
- **Accessibility:** readable discussions and keyboard-operable participation tools.
- **Security:** do not connect children to public messaging without an explicit safety model; no moderation system exists.
- **Future improvements:** decide whether/how groups interact before choosing a service.

### F29 — Ask Hexi interactive assistant

- **Status:** Planned; current authored tips are F07, not an assistant.
- **Purpose:** provide interactive coding help.
- **Audience:** future human learners; age suitability unresolved.
- **Benefit:** context-sensitive explanations if designed and validated.
- **Location:** no chat/AI connection; [Ask Hexi placeholder](../src/pages/Placeholder.tsx).
- **Dependencies:** founder-defined assistance scope, privacy/content policy, provider/runtime evaluation; no service selected.
- **Accessibility:** text alternatives and user-controlled updates, clear limitations.
- **Security:** no credentials in frontend variables; evaluate data handling, unsafe output, and prompt/tool boundaries before integration.
- **Future improvements:** distinguish tutoring from completing assessed work; preserve the free academy promise.

### F30 — Student settings beyond theme

- **Status:** Planned; only F09 theme persistence is Implemented.
- **Purpose:** support future learner preferences.
- **Audience:** future human learners; agent configuration is undecided.
- **Benefit:** adapt interaction to meaningful learner needs.
- **Location:** no settings model; [settings placeholder](../src/pages/Placeholder.tsx).
- **Dependencies:** founder scope and F23 data/access decisions if persistence is needed.
- **Accessibility:** understandable preference controls and nonvisual feedback.
- **Security:** no auth/account system implied; collect only approved necessary information.
- **Future improvements:** identify useful preferences before adding records or services.

## Documentation capability

### F31 — Living academy blueprint and reference guidance

- **Status:** Implemented as repository documentation in Mission 007.
- **Purpose:** preserve philosophy, actual feature boundaries, and future design reasoning.
- **Audience:** Crystal, developers, AI coding agents, independent reference projects.
- **Benefit:** reduce invented assumptions and disconnected feature changes.
- **Location:** [Vision](ACADEMY_VISION.md), [Design](DESIGN_SYSTEM.md), [Learning](LEARNING_ARCHITECTURE.md), this registry, [Decisions](DECISION_LOG.md), [Reference Guide](REFERENCE_GUIDE.md), [AGENTS](../AGENTS.md).
- **Dependencies:** repository evidence, founder briefs, maintained links and truthful status labels.
- **Accessibility:** clear Markdown headings, consistent fields, human-readable explanations.
- **Security:** no private paths/resources/secrets in docs; reference material is not permission to access other systems.
- **Future improvements:** update alongside relevant code, retain superseded decisions, and obtain founder choices listed in the Vision.

## Mission 008 classroom delivery

### F32 — Three-path lesson selection and switching

- **Status:** Implemented.
- **Purpose:** choose Kids, Adults, or AI learning without accounts.
- **Audience:** human learners and agent developers.
- **Benefit:** distinct content treatments around one objective, with free switching.
- **Location:** [Learn](../src/pages/Learn.tsx), [App](../src/App.tsx), public/student navigation and Python course entry.
- **Dependencies:** existing Router, local artwork and learning-path metadata.
- **Accessibility:** real links, headings, readable intended-audience text, mobile navigation.
- **Security:** no age gates, registration, personal profiles, or permission grants.
- **Future improvements:** more reviewed lessons and user-tested pathway descriptions.

### F33 — Shared human classroom and Adults pilot

- **Status:** Implemented.
- **Purpose:** present audience-specific explanations, examples, checks, and practice through reusable controls.
- **Audience:** Kids bands and Adults; beginners/returning learners choose freely.
- **Benefit:** Adults learn Python/program execution, print, string literals, quotes, mistakes, and expected output, with a Welcome to Code Coven! practice quest. Kids retain their distinct guided/adaptive activities.
- **Location:** [HumanLesson](../src/pages/HumanLesson.tsx), [LessonControls](../src/components/lessons/LessonControls.tsx), [variants](../src/data/lessons/python-output.ts), [lesson styles](../src/styles/lessons.css).
- **Dependencies:** F17/F22/F34, optional clipboard, current themes/Hexi.
- **Accessibility:** syntax color is supplemented by explanation; copy reports failure; labeled inputs, native radios, text feedback, reduced motion.
- **Security:** no Python execution or source transmission; code renders as text; only completion IDs may persist.
- **Future improvements:** learner/screen-reader validation and additional reviewed content; no interpreter is implied.

### F34 — Browser-only lesson completion

- **Status:** Implemented; not a trusted capability record.
- **Purpose:** remember completed pilot activities separately for Kids Little, Kids Junior, and Adults.
- **Audience:** human pilot learners.
- **Benefit:** resume completion indicators after refresh and reset only the active lesson variant.
- **Location:** [progress helpers](../src/learning/progress.ts), [hook](../src/learning/useLessonProgress.ts), [HumanLesson](../src/pages/HumanLesson.tsx).
- **Dependencies:** localStorage when available, variant/content versions, allowed activity IDs.
- **Accessibility:** labeled progress bar and text counts; clear storage-failure notice; accessible reset button.
- **Security:** saves no name, age, answer, submitted source, or timestamp; no account sync, telemetry, or AI retention claim. Editable local records are not evidence of mastery. Corrupt/stale data fails safely.
- **Future improvements:** broader evidence design only after explicit review; preserve demo dashboard separation.

### F35 — Deterministic AI samples and future contract

- **Status:** Implemented local sample evaluator/record; live integration remains Planned.
- **Purpose:** show how validated agent task output could be checked within explicit bounds.
- **Audience:** developers of authorized compatible agents.
- **Benefit:** reproducible pass/fail examples, error feedback, and downloadable request/response/sample record.
- **Location:** [agent evaluator](../src/learning/agent.ts), [schemas](../src/learning/schema.ts), [AiLesson](../src/pages/AiLesson.tsx), [AI integration guide](AI_INTEGRATION.md).
- **Dependencies:** F21/F22, pinned content/specification/checker versions and known task IDs.
- **Accessibility:** human-readable examples and JSON; no automatic agent interaction required.
- **Security:** strict schema rejects unknown fields and wrong versions/tasks; no execution or granted permissions. No real agent identity/session or permanent-learning claim.
- **Future improvements:** authenticated/authorized integration design only if separately approved; this pilot exposes no API.

## Mission 009 teaching presentation

### F36 — Little Apprentices feedback and first-spell celebration

- **Status:** Implemented locally for the Little Apprentices print() pilot.
- **Purpose:** present accurate assessment results in child-friendly language and warmly recognize all three completed activities.
- **Audience:** Little Apprentices ages 6–9 or anyone freely selecting that band.
- **Benefit:** one actionable correction at a time, unlimited retries, and genuine completion recognition without shame or return pressure.
- **Location:** [teaching copy](../src/data/lessons/little-apprentice-teaching.ts), [feedback adapter](../src/learning/feedback.ts), [completion card](../src/components/lessons/CompletionCelebration.tsx), [controls](../src/components/lessons/LessonControls.tsx), [HumanLesson](../src/pages/HumanLesson.tsx), [styles](../src/styles/lessons.css).
- **Dependencies:** existing three successful activity IDs and local progress; optional LessonTeaching configuration; original Hexi artwork, themes, and unchanged checker. No new package/service dependency.
- **Accessibility:** short feedback in status regions, polite atomic completion announcement, labeled section, keyboard review/return controls, responsive card, one fresh-completion animation only, reduced-motion support, no audio/flashing/modals/forced focus.
- **Security:** no source execution, account, personal-data collection, new storage record, or XP/badge ledger; source correctness remains exclusively the unchanged checker's decision. Browser records remain user-editable.
- **Future improvements:** founder/learner review and real assistive-technology testing; additional lessons may opt into configurable content later. The hint recognizer does not diagnose arbitrary Python, and the local recognition is not a mastery certification.

## Mission 016 classroom delivery

### F37 — The Variable Vault: Python Lesson 002

- **Status:** Implemented locally for Little, Junior, Adults, and AI; unpublished pending founder approval.
- **Purpose:** teach named values, = assignment, strings/integers, variable printing, reassignment, and simple naming conventions.
- **Audience:** Little Apprentices 6–9, Junior Spellcasters 10–13, Adults, and developers evaluating AI learners.
- **Benefit:** six explicit objectives with differentiated explanations, knowledge checks, guided/independent quests, unlimited retries, actionable hints, and completion recognition.
- **Location:** [canonical data](../src/data/lessons/python-variables.v1.json), [adapters](../src/data/lessons/python-variables.ts), [human classroom](../src/pages/VariableVault.tsx), [AI classroom](../src/pages/AiVariableVault.tsx), [practice](../src/components/lessons/VariablePractice.tsx), [checker](../src/learning/variables.ts), [schema](../src/learning/variables-schema.ts), [AI records](../src/learning/variables-agent.ts).
- **Dependencies:** existing React/Router, Valibot, curriculum modules, shared examples/knowledge controls, completion card, and browser-only progress helpers; no new package or service.
- **Accessibility:** labels, fieldsets, keyboard hint/disclosure controls, visible focus, polite feedback/celebration, existing responsive themes and reduced-motion rules. Completion has no forced scroll, audio, or time pressure.
- **Security:** bounded text-only assignment/print model; no Python execution, public agent API, network-backed evaluation, executor connection, tool permissions, or personal-data collection. Sources/answers are not saved. Lesson 001's checker and progress semantics are retained.
- **Future improvements:** review with learners and assistive technologies; separately approve a Potion Lab adapter and further Python syntax. Passing a task is not a mastery or retained-learning claim.
- **Verification:** [Mission 016 review](MISSION_016_REVIEW.md), [unit tests](../tests/variables.test.ts), [browser regression](../scripts/verify-variables.cjs).


## Mission 017 classroom awakening · phase one

### F38 — Thinking Like a Programmer

- **Status:** Implemented locally; publication awaits founder approval. Five further course introductions remain Planned.
- **Purpose:** give the existing Programming Fundamentals course one complete introduction to programming, instructions, precision, sequencing, decomposition and debugging.
- **Audience:** Little Apprentices, Junior Spellcasters, Adults, and AI learners/developers, with distinct content and tasks.
- **Benefit:** clear goals and examples, three knowledge checks plus three practical plans per experience, unlimited retries, helpful hints, local completion/reset and a satisfying Hexi celebration.
- **Location:** [data](../src/data/lessons/programming-thinking.v1.json), [adapters](../src/data/lessons/programming-thinking.ts), [classroom](../src/pages/ThinkingLesson.tsx), [practice](../src/components/lessons/SequencePractice.tsx), [checker](../src/learning/thinking.ts), [schema](../src/learning/thinking-schema.ts), [curriculum](../src/data/curriculum.ts), course/path entry links.
- **Dependencies:** existing React/Router, Valibot, knowledge checks, progress helpers, original Hexi, celebration and theme styles; no added package or paid service.
- **Accessibility:** native labeled select/radio controls, numbered cards with wrapping text, fieldset/legend, keyboard hints/reset, polite status feedback and completion, existing reduced motion, no drag requirement or time pressure.
- **Security:** finite ordered-ID comparison only; no arbitrary source, code execution, tool permission, external agent execution, model call, server request or executor integration. AI JSON is data, not authorization. Python lessons, dependencies, assets and security headers remain unchanged.
- **Progress/privacy:** all four variants store only isolated completion IDs and versions. No names, ages, answers or assessment records are persisted. AI workbench completion is local practice, not agent retention. The last 20 practical checks can be downloaded in the current session; reload/reset clears them.
- **Verification:** [review](MISSION_017_REVIEW.md), [native tests](../tests/thinking.test.ts), [browser checks](../scripts/verify-thinking.cjs), plus existing Python regressions.
- **Future improvements:** founder/learner/assistive-technology review, additional foundations concepts and sequential implementation of the remaining five courses. No mastery certification is claimed.
