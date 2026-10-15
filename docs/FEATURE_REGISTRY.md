# Feature Registry

Last reviewed: 2026-10-15 · Baseline: v0.3.0

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

### F04 — Course previews and not-found routing

- **Status:** Implemented, as previews only.
- **Purpose:** give each course a working route and honest content-availability message.
- **Audience:** visitors/demo students.
- **Benefit:** understand difficulty and planned scope without broken links.
- **Location:** [Explore / CourseDetail](../src/pages/Explore.tsx), [NotFound](../src/pages/Placeholder.tsx), [App](../src/App.tsx).
- **Dependencies:** course/department IDs, BrowserRouter.
- **Accessibility:** one page heading, readable status copy, back links, route focus.
- **Security:** unknown IDs are handled locally; previews execute no code.
- **Future improvements:** deliver F17 lessons; preserve URLs and honest continuation behavior.

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

- **Status:** Implemented; portrait is a placeholder, tips are authored local text.
- **Purpose:** provide a familiar companion and small coding reminders.
- **Audience:** current visitors; future human learners.
- **Benefit:** supportive, user-paced encouragement.
- **Location:** [Hexi](../src/components/Hexi.tsx), [HexiCorner](../src/components/HexiCorner.tsx), [tips](../src/data/curriculum.ts).
- **Dependencies:** original local SVG, React state; no AI provider.
- **Accessibility:** descriptive mascot alt text, polite tip updates, button-controlled rotation.
- **Security:** no chat, input processing, or model connection.
- **Future improvements:** approved portrait per [ARTWORK](../ARTWORK.md); expression variants are not implemented.

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

### F11 — Magical scenery and replaceable concept illustrations

- **Status:** Implemented rendering and replacement hooks; all current illustrations remain placeholders.
- **Purpose:** establish an enchanted academy atmosphere.
- **Audience:** human visitors.
- **Benefit:** recognizable destinations and a coherent setting.
- **Location:** [MagicalScenery](../src/components/MagicalScenery.tsx), [DepartmentArtwork](../src/components/DepartmentArtwork.tsx), [CourseIllustration](../src/components/CourseIllustration.tsx), [art registry](../src/data/artwork.ts), [assets](../src/assets).
- **Dependencies:** local SVG/imported images, placeholder flags, shared components.
- **Accessibility:** adjacent text names destinations; Hexi has alt text; controls remain HTML.
- **Security:** no remote stock-image service; replacement assets need review and permission.
- **Future improvements:** approved art and crop checks, maintained in [ARTWORK](../ARTWORK.md).

### F12 — Modular curriculum types and metadata

- **Status:** Implemented structure only.
- **Purpose:** separate educational metadata from presentation.
- **Audience:** developers now; future human/AI learning systems.
- **Benefit:** add content without embedding entire courses in dashboard components.
- **Location:** [types](../src/types/curriculum.ts), [data](../src/data/curriculum.ts).
- **Dependencies:** TypeScript interfaces, stable local IDs; paths reference course IDs.
- **Accessibility:** types alone do not ensure accessible lesson content.
- **Security:** no content ingestion, schema validation service, or execution engine.
- **Future improvements:** reviewed objectives, variants, evidence model, and content validation; see [Learning Architecture](LEARNING_ARCHITECTURE.md).

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

## Planned educational and learner workflows

### F17 — Shared lessons, objectives, and practical challenges

- **Status:** Planned.
- **Purpose:** deliver actual beginner-through-advanced programming education.
- **Audience:** kids, adults, and AI learners through appropriate variants.
- **Benefit:** explicit goals followed by meaningful practice.
- **Location:** no implemented content; current scaffolding is [curriculum types/data](../src/types/curriculum.ts) and [Learning Architecture](LEARNING_ARCHITECTURE.md).
- **Dependencies:** founder-selected initial scope, authored/reviewed lessons, objective model, accessible task design.
- **Accessibility:** equivalent instructions and feedback beyond visual metaphor alone.
- **Security:** review challenge content; do not treat authored instructions as permission to run untrusted code.
- **Future improvements:** approve the first course and schema extensions before claiming course availability.

### F18 — Little Apprentices (ages 6–9)

- **Status:** Planned.
- **Purpose:** provide an age-appropriate children's experience.
- **Audience:** children ages 6–9 and any future supporting adults.
- **Benefit:** approachable foundations with appropriate support.
- **Location:** none implemented; [audience design](LEARNING_ARCHITECTURE.md).
- **Dependencies:** F17, founder decisions on reading/interaction/supervision and data practices.
- **Accessibility:** validate literacy demands, motor interaction, and multimodal alternatives.
- **Security:** no age collection or guardian system exists; design privacy/safeguards before adding them.
- **Future improvements:** prototype and evaluate a small supported learning sequence.

### F19 — Junior Spellcasters (ages 10–13)

- **Status:** Planned.
- **Purpose:** offer increasingly independent programming practice.
- **Audience:** children ages 10–13.
- **Benefit:** supported debugging and practical problem solving.
- **Location:** none implemented; [audience design](LEARNING_ARCHITECTURE.md).
- **Dependencies:** F17, founder-approved scope, support and safety expectations.
- **Accessibility:** readable instructions, understandable errors, alternatives to timing pressure.
- **Security:** no accounts/community permissions are implied by an age band.
- **Future improvements:** choose starting capabilities, projects, and feedback conventions.

### F20 — Flexible older-learner and adult pathways

- **Status:** Planned.
- **Purpose:** provide flexible entry and progressively advanced routes for older learners and adults.
- **Audience:** older learners beyond the specified child bands and adult learners.
- **Benefit:** learn according to goals/readiness rather than age-only placement.
- **Location:** none implemented; existing [path interfaces](../src/types/curriculum.ts) are only scaffolding.
- **Dependencies:** F17, F22/F23, founder decisions on pathway priorities and placement.
- **Accessibility:** flexible pacing and support for varied prior knowledge/reading needs.
- **Security:** avoid collecting unnecessary demographic information; no identity service exists.
- **Future improvements:** define separate adult goals and flexible placement options; no upper-age cutoff is chosen.

### F21 — Machine-readable AI agent lessons

- **Status:** Planned.
- **Purpose:** teach/evaluate agents through explicit machine-consumable tasks.
- **Audience:** AI learners and their human developers/reviewers.
- **Benefit:** precise objectives, constraints, and assessable outputs.
- **Location:** none implemented; [AI learning design](LEARNING_ARCHITECTURE.md), not the human AI Fundamentals preview.
- **Dependencies:** F17, schema/version choices, F22, F24, tool-access policy.
- **Accessibility:** retain a human-readable interpretation of machine tasks and outcomes.
- **Security:** agent instructions/output are untrusted data; no implicit access to private resources.
- **Future improvements:** choose a minimal schema, delivery interface, and evaluation method.

### F22 — Assessment and learning feedback

- **Status:** Planned.
- **Purpose:** evaluate attempts against objectives and explain next steps.
- **Audience:** human and AI learners, with different feedback presentations.
- **Benefit:** correct misunderstandings rather than merely display completion.
- **Location:** none implemented; [assessment design](LEARNING_ARCHITECTURE.md).
- **Dependencies:** F17, approved criteria/rubrics, evidence model; execution only if needed.
- **Accessibility:** actionable feedback in text; never communicate results by color alone.
- **Security:** validate submissions and evaluator outputs; avoid exposing sensitive learner work.
- **Future improvements:** evaluate deterministic tests, rubrics, and human review as Proposed options; none selected yet.

### F23 — Capability-based progression and real learner records

- **Status:** Planned.
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

- **Status:** Planned; preview displays exist under F05/F08/F13.
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
