# Mission 017C — The Guardian’s First Shield

Date: 2026-10-18. **Status: Implemented locally; awaiting founder review.** No commit, push, deployment or Mission 017D work was performed.

## Baseline, isolation and preview

GitHub main was verified to contain Mission 017B at `7fdcfdea6e8b5771633b181eaeeca89d566a5f2a`. A separate checkout was cloned from the official repository at that baseline. No original unfinished development repository, executor work or previous release checkout was edited. This is a GitHub source-baseline observation, not new Cloudflare deployment verification.

Course: Cybersecurity Charms. Lesson: **The Guardian’s First Shield — Staying Safe in the Digital Realm**. Hierarchy: tower → tower-path → cybersecurity-charms → cyber-defensive-basics → cyber-guardian-shield-001. Introductory course coverage is now four of seven locally; Algorithm Alchemy, AI Fundamentals and Software Sorcery remain Planned.

Preview: http://127.0.0.1:4196/courses/cybersecurity-charms

| Experience | Route |
|---|---|
| Little Apprentices | `/learn/kids/security/first-shield?band=little` |
| Junior Spellcasters | `/learn/kids/security/first-shield?band=junior` |
| Adults | `/learn/adults/security/first-shield` |
| AIs | `/learn/ai/security/first-shield` |

To restart: install dependencies with the frozen lockfile, run `pnpm build`, then `pnpm preview --port 4196 --strictPort`. No application credentials are needed.

## Six shared learning objectives

1. Explain cybersecurity as protecting devices, accounts and information.
2. Recognize warning signs in suspicious messages and displayed addresses.
3. Explain why passwords should be strong and unique.
4. Recognize the purpose and limits of multifactor authentication.
5. Explain why personal/sensitive information deserves protection.
6. Choose safe defensive responses, including trusted help and reporting.

Each variant covers all six objectives in six instructional sections. Every experience includes three knowledge checks and three practical activities. Each practical activity requires **both** a classification and a protective response. Correct classification with a risky action, or the right action with the wrong classification, does not complete the activity. Optional hints and meaningful incorrect-answer feedback support unlimited retries.

| Experience | Scenarios and teaching |
|---|---|
| Little | Help Hexi Protect the Academy! A mystery prize, a request for secrets, and a garden notice checked with a trusted adult. Short explanations, a three-part visual reminder board and encouraging feedback. |
| Junior | A disguised academy address, an uninitiated MFA prompt, and a confirmed club reminder. Covers phishing, domain clues, privacy and trusted-adult/reporting routes. |
| Adults | An unexpected invoice archive, unsolicited password/code “support,” and an independently verified logistics reminder. Covers social engineering, password managers, MFA, browsing/attachment caution, sensitive data and established reporting procedures. |
| AI | Fixed fictional code/approval requests and a confirmed informational notice. Versioned objectives, explicit expected responses/explanations, deterministic evaluation and downloads. |

All variants include suspicious and confirmed informational cases; always choosing suspicious cannot pass. “No warning signs shown” means only that the supplied story contains no immediate red flags. It is not a guarantee of safety, a general threat-detection result or permission to follow a link. HTTPS and familiar display names are explicitly not treated as proof of trust. Two passwords are not taught as two different MFA factors. The lesson encourages asking for help after a mistake without blame.

## Interaction, progress and celebration

Native radio groups distinguish classifying clues from selecting an action. Hints use real buttons with expanded state and controlled-content IDs. Feedback is textual in polite status regions. The numbered pause/protect/ask storyboard and fictional message cards reuse existing tokens; original Hexi and all artwork are unchanged.

All six activities must pass at least once to show Hexi’s celebration. Existing lesson/variant completion keys store IDs and versions only. Reset clears only the current lesson/variant, its forms and session results. Individual-activity reset retains prior completion, consistent with the disclosed shared policy. Restored completion is static; fresh completion uses the existing reduced-motion-aware animation. There is no forced focus/scroll, audio, modal, timer, penalty or XP pressure.

## Educational security boundary

This is a defensive educational lesson, not a hacking lab or real-message scanner. Inputs are fixed lesson choice IDs only. No text/password/email/upload field, real secret, personal information, student account connection, live attachment, attack, phishing delivery tool, code execution or public agent endpoint is introduced.

Displayed addresses are fictional reserved .invalid names and rendered as React text, never href/resource/action destinations. Attachment labels describe nonexistent files and have no download control. Checking a response does not visit, scan, send, approve, report or perform the selected action. No academy-storage or executor permission is granted by message text. Existing CSP headers, lockfile, dependencies, runtime/build settings and executor boundaries remain unchanged. Only optional local JSON exports create downloads.

## Versioned AI assessment

Specification/content: **1.0.0**. Checker: **fixed-defensive-choice-v1**. Requests permit exactly specificationVersion, contentVersion, lessonId, taskId, classification and actionId. Strict validation rejects unknown fields, permissions, source/secret payloads, task/action IDs and versions.

The lesson and sample download contain **36 deterministic cases** across twelve practical tasks. Each supplies expected classification/action, pass/fail, feedback and protective explanation. The AI page displays the nine cases relevant to its three tasks. All records include executed:false and actionsPerformed:false. The same request yields the same result.

The workbench also has interactive checks/practice/completion and an optional current-session download capped at 20 practical results. Session results are in memory only and lost on reload/navigation/reset. Responses are not persisted or transmitted; only browser completion IDs/versions may persist. This is not retained AI learning, identity, general threat detection or trusted mastery evidence.

## Fresh verification

- Production build / TypeScript, formatting, whitespace and local Markdown target checks: passed.
- 46 native test groups: Shield 8, HTML 8, Thinking 6, Python output 10, Variables 8, distribution 6.
- All 36 shield examples matched declared outcomes/feedback. Every classification/action combination was tested: only the correct pair passes. Bounds, empty/unknown/hostile IDs, repeated retries, strict data/request schemas and cross-lesson progress isolation were checked.
- New browser suite passed all four experiences: counts/objectives, empty/incorrect/correct attempts, hints, keyboard, both decision parts, completion/restore/reset/isolation, all three downloads and cap, minimal saved IDs/versions, blocked storage, non-clickable examples, no secret-entry fields, intact artwork, no browser errors and no external/account/executor requests.
- Responsive browser checks covered both themes at 375/768/1440 widths, 200% root text and reduced motion. These are not claims of browser zoom or full accessibility conformance.
- Existing Python Lessons 001/002, Thinking Like a Programmer and Web Enchantment browser regressions passed against this build.
- All 85 preexisting files outside the change scope were checked byte-for-byte against the Mission 017B baseline. Old lesson implementation files, artwork, shared learning helpers, security declarations and configuration are unchanged. Only two old test assertions change the populated-course count from three to four; their lesson checks are preserved.

One additional parallel browser run hit a 10-second classroom-load timeout during layout navigation. The unchanged suite passed when rerun on its own; no lesson or test-code change was needed. The timeout’s cause was not established.

Browser tests reproduce existing Pages headers locally; they do not verify a deployed Cloudflare edge. Optional browser tooling follows README’s separately installed Playwright/Chrome pattern and adds no application dependency.

## Content references and interpretation

The original fictional stories and age-adapted teaching were checked against these primary references, consulted 2026-10-18:

- [NIST: Phishing](https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/phishing): warning signs, independent confirmation and reporting/help.
- [NIST: Multi-Factor Authentication](https://www.nist.gov/itl/smallbusinesscyber/guidance-topic/multi-factor-authentication): different factor types, limits of some methods and phishing-resistant options.
- [NIST: How Do I Create a Good Password?](https://www.nist.gov/cybersecurity-and-privacy/how-do-i-create-good-password): unique long passwords, manager support and additional account protection. The lesson does not prescribe a service or collect example secrets.
- [RFC 2606](https://www.rfc-editor.org/rfc/rfc2606.html): reserved .invalid example namespace. No scenario address was opened.

The risk labels and exact accepted actions are authored lesson criteria, not NIST-issued classifications of these fictional messages. Avoid implying that a finite scenario checker is a real security authority.

## Known limitations

The scenarios are simplified and deterministic. Real threats require context, independent verification and appropriate trusted support; this lesson cannot establish that a real message is safe or analyze a real account. MFA reduces risk but is not an absolute guarantee. There is no real reporting or account-configuration workflow. Progress is browser-local/editable and separate from demo dashboard statistics. Actual target-age learner testing and real screen-reader review remain future work; these checks do not certify learning effectiveness or WCAG conformance.

## Future opportunities and release isolation

Possible later cybersecurity lessons: software updates, privacy settings, verified account recovery, deeper domain reading and responsible reporting through more fictional scenarios. Algorithm Alchemy is next in the broader course plan, but Mission 017D is not implemented or authorized here.

Keep this work separate from unfinished development. Before any publication, review the exact source set below, freeze a release manifest with source/build hashes, and recheck GitHub main and the official remote. Stop for renewed review if the baseline/scope differs. Exclude dist, node_modules, artifacts, external review packets, executor/security experiments and other-course development. Do not stage, commit, push or deploy until the founder explicitly authorizes those actions.

## Exact changed files

Paths are relative to the local Mission 017B baseline. This is the complete Mission 017C source scope.

- `README.md`
- `docs/ACADEMY_VISION.md`
- `docs/AI_INTEGRATION.md`
- `docs/DECISION_LOG.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/FEATURE_REGISTRY.md`
- `docs/LEARNING_ARCHITECTURE.md`
- `docs/MISSION_017C_REVIEW.md`
- `package.json`
- `scripts/verify-shield.cjs`
- `src/App.tsx`
- `src/components/lessons/ShieldPractice.tsx`
- `src/data/curriculum.ts`
- `src/data/lessons/cyber-shield.ts`
- `src/data/lessons/cyber-shield.v1.json`
- `src/learning/shield-schema.ts`
- `src/learning/shield.ts`
- `src/pages/Explore.tsx`
- `src/pages/Learn.tsx`
- `src/pages/ShieldLesson.tsx`
- `src/styles/lessons.css`
- `tests/html.test.ts`
- `tests/shield.test.ts`
- `tests/thinking.test.ts`
