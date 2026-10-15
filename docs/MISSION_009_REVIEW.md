# Mission 009 · Hexi's Teaching Magic

Status: Implemented locally; founder review is complete and hands-on browser testing passed. No staging, commit, push, or deployment performed by this mission. Mission 008's existing uncommitted implementation is preserved.

## What changed

Little Apprentices Lesson 001 now uses short, encouraging feedback and a reusable configurable completion celebration. Knowledge-question IDs/options/correctness, the core Python text checker, AI lesson/evaluation/schema, source-data versions, browser-progress format/helpers, and older learners' feedback are unchanged.

Example Little feedback:

| Situation              | Feedback                                                                                           |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| Missing quotes         | Almost! Put matching quotation marks around your message. One at the beginning and one at the end! |
| Missing parentheses    | Your spell needs its round brackets! Add ( and ) around your message.                              |
| Wrong message          | Good try! Check the words inside your quotation marks. Can you make them match the example?        |
| Correct pattern/output | Your spell matches! Beautiful work, little spellcaster!                                            |

Hints are presentation, not correctness logic or a comprehensive Python diagnosis. More complex unsupported syntax gets a short supported-example hint. Wrong attempts never advance progress and retries remain unlimited.

## Completion and learner control

Only completion of `recognize`, `predict`, and `practice` displays **Your First Spell Was Successful!**, the requested Hexi message, and **First Spell Cast!** No XP, streak, timer, account, database, private information, or stored achievement ledger is introduced.

Fresh completion uses one subtle 450 ms fade/rise. Restored completion is static, and review/repeated correct submissions do not replay it. Reduced motion disables the animation. Reset hides the celebration until all three activities are completed again; a deliberate new completion may animate. Review This Lesson focuses the lesson heading without clearing progress; Return to Learning Path links to the existing Kids overview. There is no Lesson 002 link, audio, flashing, modal, automatic scroll, or forced completion focus.

The separate practice notice says: “This is guided practice. It checks your written spell. It does not run Python.” The celebration itself stays warm and free from the longer technical explanation, while older learners keep that explanation.

## Accessibility and limitations

Feedback uses status regions; completion has a persistent polite/atomic announcement. The celebration is a labeled section with decorative stars hidden from assistive technology, existing descriptive Hexi artwork, readable theme tokens, keyboard links, and responsive stacking. Automated browser checks cover the DOM live-region semantics; actual listening with screen readers and educational testing with children are not claimed. Existing Hexi art remains a placeholder.

Previously successful activities remain completed until reset, including after a later incorrect retry; this preserves Mission 008's existing local-completion policy. Browser records are editable and are not trusted mastery or formal assessment evidence. No submitted code executes, and this checker does not accept every valid Python program.

## Founder review and hands-on browser testing

Founder review is complete. The founder confirmed that hands-on browser testing passed: all three Little Apprentices learning activities (`recognize`, `predict`, and `practice`) work, and Hexi's completion celebration was verified. The founder approved the final practice feedback wording: “Your spell matches! Beautiful work, little spellcaster!”

This approval does not change the documented technical limitations or authorize a commit, push, or deployment. Broader curriculum, controlled Python execution, trusted progression, and live agent integration remain future work as documented in the [Learning Architecture](LEARNING_ARCHITECTURE.md).

## Verification

- TypeScript: passed.
- Formatting and whitespace checks: passed; semantic lint is not configured.
- Native lesson tests: all 10 test groups passed, including hint cases, unchanged pass criteria, retry behavior, and isolation of older feedback.
- Existing build-output tests: all 6 passed.
- Production build: passed without a size warning.
- Targeted teaching browser checks: passed for missing/mismatched quotes, brackets, wrong message, unsupported input, success, repeated retries, 0/1/2/3 completion gating, fresh/revisit/reset behavior, both links, keyboard navigation, announcement semantics, no-motion behavior, and both themes at 375/768/1280/1440 pixels without horizontal overflow.
- Three-path browser regression checks: passed for Kids/Junior/Adults/AI, persistence/isolation/reset, downloads/copy, storage failures, navigation, themes, keyboard/reduced motion, and local CSP/resource checks.
- Source fingerprints confirm the checker, progress helpers, AI schema/data/evaluator/page, package manifest, and lockfile match the start of Mission 009. No new dependencies were installed.

These are local checks against production output. No deployment was initiated, and no full accessibility conformance or learning-effectiveness claim is made.

## Files changed in Mission 009

Created:

- [Little teaching configuration](../src/data/lessons/little-apprentice-teaching.ts)
- [Feedback presentation helpers](../src/learning/feedback.ts)
- [Reusable completion celebration](../src/components/lessons/CompletionCelebration.tsx)
- [Targeted browser checks](../scripts/verify-teaching.cjs)
- This review note.

Updated:

- [Learning types](../src/types/learning.ts): optional teaching configuration.
- [Lesson variants](../src/data/lessons/python-output.ts): Little-only isolated question feedback and configuration.
- [Lesson controls](../src/components/lessons/LessonControls.tsx): optional feedback/notice overrides with unchanged older defaults.
- [Human lesson](../src/pages/HumanLesson.tsx): completion gate, restored/fresh animation behavior, review heading, and announcement.
- [Lesson styles](../src/styles/lessons.css): scoped celebration styling and reduced motion.
- [Lesson unit tests](../tests/lessons.test.ts).
- [Existing three-path browser checks](../scripts/verify-lessons.cjs): Little celebration expectations and browser cleanup.
- [Design System](DESIGN_SYSTEM.md), [Learning Architecture](LEARNING_ARCHITECTURE.md), [Feature Registry](FEATURE_REGISTRY.md), and [Decision Log](DECISION_LOG.md): age-appropriate feedback, nonmanipulative recognition, transparency, F36, and decisions D013–D014. Earlier decision records are preserved.

## Preview and rerun

Use the existing local server at `/learn/kids/python/first-spell?band=little`. Or run `pnpm dev` from the project root and open http://127.0.0.1:5173/learn/kids/python/first-spell?band=little. The production preview uses port 4173 when started with `pnpm preview --port 4173 --strictPort` after `pnpm build`.

Try invalid practice text, then complete both knowledge checks and the practice activity. Reload to see the static restored celebration; use Reset this lesson’s progress to test a fresh completion. Progress is local to the same browser and origin.

With Playwright and Chrome available, run the focused browser check while production preview is running:

```sh
BASE_URL=http://127.0.0.1:4173 PLAYWRIGHT_CHANNEL=chrome node scripts/verify-teaching.cjs
```

As described in README, set `PLAYWRIGHT_MODULE` to your optional local Playwright installation if needed. Other commands are `pnpm typecheck`, `pnpm check:format`, `pnpm test:lessons`, `pnpm build`, and `pnpm test:build`.
