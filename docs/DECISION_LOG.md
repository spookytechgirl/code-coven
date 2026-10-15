# Decision Log

Last reviewed: 2026-10-15 · Baseline: v0.3.0

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

The repository available for this review has one initial commit, not a contemporaneous series of mission-by-mission decision records. Earlier documents preserve specifications, preparation notes, and selected verification results; they do not establish the original dates, alternatives, or reasoning for every engineering and design choice. No Mission 006 material is present in the reviewed documentation. Do not invent its contents or infer a completed push/deployment from this gap.

Unknowns include original detailed palette/typography tradeoffs, curriculum sequence review, learner research, audience testing, and prior evaluation of progression/execution approaches. Record new evidence if Crystal supplies it, identify its source, and distinguish a corrected historical fact from a new decision.

For future entries, copy the field structure above, use the actual recorded/adopted dates, include feature IDs and file links, and state unresolved founder choices rather than silently choosing a policy.
