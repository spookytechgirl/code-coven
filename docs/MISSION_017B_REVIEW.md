# Mission 017B — Web Enchantment local review

Date: 2026-10-17. **Status: Implemented locally; publication awaits founder review.** No Mission 017B commit, push or deployment was performed.

## Baseline, scope and preview

GitHub main was verified to include Mission 017A at `2715cde93996f89ad72f6857f02aec2025dfb9ed`. A new checkout was cloned from the official repository at that baseline. All implementation is confined to this separate checkout; no original unfinished Potion Lab or previous release checkout was modified. This establishes the GitHub source baseline, not a fresh Cloudflare deployment verification.

This phase gives **Web Enchantment** one complete introductory lesson, bringing local introductory coverage to three of seven courses. Cybersecurity Charms, Algorithm Alchemy, AI Fundamentals and Software Sorcery remain Planned. No further course was implemented.

Local production preview: http://127.0.0.1:4194/courses/web-enchantment

| Experience | Direct local lesson route |
|---|---|
| Little Apprentices | `/learn/kids/web/first-web-spell?band=little` |
| Junior Spellcasters | `/learn/kids/web/first-web-spell?band=junior` |
| Adults | `/learn/adults/web/first-web-spell` |
| AIs | `/learn/ai/web/first-web-spell` |

To restart the preview, install dependencies with the frozen lockfile, run `pnpm build`, then `pnpm preview --port 4194 --strictPort`. No app credentials are required. The existing external Playwright/Chrome setup in README supports optional browser QA without adding application dependencies.

## Six learning objectives

1. Distinguish a website from a web page.
2. Explain HTML’s role in content meaning and structure.
3. Identify opening tags, closing tags and a complete element.
4. Use a main heading and paragraph appropriately.
5. Recognize body fragments and basic HTML document structure.
6. Find and fix mismatched tags or simple structure mistakes.

Each experience includes an introduction, six objectives, three teaching sections, a worked fragment example, three knowledge checks and three practical activities. Older experiences also see a full document example with doctype, html lang=en, head/UTF-8 meta/title, and body/h1/p. No prerequisite locks access.

| Experience | Adaptation |
|---|---|
| Little | Short explanations, visual tag-and-word blocks for Hexi’s garden page, plain-language feedback, optional hints, unlimited retries, completion celebration. |
| Junior | Real h1/p editing, a guided heading, independent fragment and a mismatched-tag repair. |
| Adults | Practical community-page fragment, debugging, and an independent full document with learner-chosen title, heading and paragraph. |
| AI | Explicit versioned structures and boundaries, interactive practice, 36 deterministic cases and lesson/sample/current-session assessment downloads. |

## Interactivity and accessibility

Existing knowledge checks, progress helpers, original Hexi, classroom themes/layout and completion card are reused. Native label-associated menus/inputs build Little’s tags and text; older learners use labeled bounded textareas. Tab exits normally. Hints expose expanded state and a controlled content ID. Feedback is written in polite status regions; Little messages give a short next action.

All six activities must pass at least once before the Hexi celebration. Completion is isolated by lesson and variant, storing completed IDs and versions only. Reset clears only this lesson/variant plus its forms/session results. Activity reset restores just that activity’s starter and retains prior completion, consistent with the disclosed policy. Fresh completion animates once; restored completion is static, with no forced scroll/focus, sound, modal or timed pressure. Reduced motion uses the existing rules.

## Safe HTML boundary

The checker is an inert bounded tokenizer/tree and shape checker, not a full browser parser or a general HTML validator. Accepted shapes are a single h1, h1 followed by p, or an explicit restricted document. No attributes are accepted on headings/paragraphs. The document allows only html lang=en and meta charset=utf-8 (matching single/double quotes), with explicit head/title/body and closing tags. Limits: 1600 source characters, 16 elements, and 160 normalized plain-text characters per text element. Tag case and harmless whitespace are accepted. General attributes, entities, comments, links, images, styles, scripts, SVG, iframes and many other valid HTML forms are intentionally unsupported.

Only a passing check returns heading/paragraph/optional title strings. Fixed React elements display these strings as text children. **Submitted markup is never inserted into the DOM, handed to innerHTML/document.write, parsed by DOMParser, loaded into iframe/srcdoc or executed.** There is no untrusted rendered document, resource URL prop, script context, storage bridge or network permission to sandbox. The UI labels this as a simplified safe text model rather than a browser-rendered page. Original security headers and executor boundaries remain unchanged.

The AI contract is strict and versioned: specification/content 1.0.0, lesson web-html-anatomy-001, checker restricted-html-structure-v1. Unknown fields, versions, tasks and permissions fail validation. All records state executed:false and renderedAsHtml:false. Up to 20 practical results exist in memory for optional session download; reload/navigation/reset clears them. Submitted source/answers/records are not persisted or automatically transmitted. Browser completion is not an external agent identity, retained AI learning or trusted mastery record.

## Verification

- Production build and TypeScript passed.
- 38 native test groups passed: HTML 8, thinking 6, Python output 10, Python variables 8, production artifacts 6.
- All 36 declared HTML cases agree with expected pass/fail/feedback and downloadable records. Additional tests cover casing/whitespace/quotes, independent content, balanced tags, wrong shape/text, source/text/node limits, malformed inputs, repeated retries, schema/permission rejection and progress isolation.
- Security tests reject scripts, inline event handlers, remote images, SVG, iframe/srcdoc, style/URL attributes, links, entities and malformed markup without a preview model. Actual browser attempts caused no execution, storage-clearing effect or external resource request.
- New browser checks passed across all four experiences: knowledge/practice feedback, building-block/editor keyboard controls, hints/retries, safe previews, gated celebration, restore/reset/isolation, minimal storage, AI lesson/sample/session downloads and cap, both themes at 375/768/1440 widths, 200% root text, reduced motion, blocked storage, course/path links, intact images and no browser errors.
- Existing browser regressions for Thinking Like a Programmer, Python Lesson 001 and Variable Vault passed against this preview. Original lesson content/pages/checkers/components/helpers remain byte-identical to the Mission 017A baseline.
- Formatting and diff checks passed; local Markdown targets were verified. Production CSP was simulated locally in browser tests, not verified at Cloudflare’s edge. Native text-size/reflow checks are not a claim of browser zoom or full assistive-technology conformance.

One existing thinking test changes only its count of populated courses (two → three), so the test reflects Web Enchantment’s approved addition. Its sequencing cases and lesson implementation remain unchanged. No dependency, lockfile, runtime/build configuration, asset, Hexi component or security-header change is included.

## Known limitations

The fixed text model does not reproduce browser HTML error recovery, CSS, links, images or arbitrary document rendering. Several legal HTML forms are rejected by this small lesson checker; rejected source is not necessarily invalid HTML generally. Required fragment text is exact apart from normalized whitespace, while independent document text is learner-chosen and bounded. Completion is browser-local/editable and not account synchronization or a mastery certificate. Target-age learner review and real screen-reader review remain future work; these checks do not certify accessibility or educational effectiveness.

## Release isolation recommendations

Keep this Mission 017B checkout separate from the unfinished development repository. Review only the exact files below against Mission 017A. Recheck GitHub main before any approved publication; stop for a renewed baseline review if it moved. Freeze a new release manifest with source and rebuilt artifact hashes after founder review; this implementation inventory does not authorize publication. Include no dist, node_modules, screenshots, external review packet, executor, security experiments or further-course content in a source commit. Use a fresh official-remote release checkout for any later Desktop handoff, following the successful Mission 017A procedure. Do not commit, push, change remotes or deploy before explicit approval.

## Exact changed files

All paths are relative to this checkout and its Mission 017A baseline. The complete list follows.

- `README.md`
- `docs/ACADEMY_VISION.md`
- `docs/AI_INTEGRATION.md`
- `docs/DECISION_LOG.md`
- `docs/DESIGN_SYSTEM.md`
- `docs/FEATURE_REGISTRY.md`
- `docs/LEARNING_ARCHITECTURE.md`
- `docs/MISSION_017B_REVIEW.md`
- `package.json`
- `scripts/verify-html.cjs`
- `src/App.tsx`
- `src/components/lessons/HtmlPractice.tsx`
- `src/data/curriculum.ts`
- `src/data/lessons/web-html.ts`
- `src/data/lessons/web-html.v1.json`
- `src/learning/html-schema.ts`
- `src/learning/html.ts`
- `src/pages/Explore.tsx`
- `src/pages/Learn.tsx`
- `src/pages/WebLesson.tsx`
- `src/styles/lessons.css`
- `tests/html.test.ts`
- `tests/thinking.test.ts`
