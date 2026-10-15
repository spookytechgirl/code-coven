# Learning Architecture

Last reviewed: 2026-10-15 · Baseline: v0.3.0

## Verified implementation boundary

**Implemented:** TypeScript interfaces and locally organized metadata, browsable departments, derived learning paths, course previews, and demo dashboard progress. **Not implemented:** populated lessons/challenges, learning objectives, assessment, feedback processing, capability tracking, code execution, audience adaptations, machine-readable lesson delivery, or learner collaboration.

The structure in [curriculum types](../src/types/curriculum.ts) is:

```text
Department
  └─ LearningPath (courseIds)
      └─ Course (departmentId, modules)
          └─ CourseModule (lessons)
              └─ Lesson (content, challenges)
                  └─ Challenge (instructions, rewardXP)
```

This is a data model, not an operational teaching pipeline. The current Lesson has an ID, title, content string, and challenges; it has no objective, age-band, assessment, or capability fields. Course metadata includes difficulty and planned lesson count; every modules array is empty. The catalog and dashboard read [local data](../src/data/curriculum.ts); dashboard percentages come from a separate `demoProgress` object and are not evidence of learning.

## Shared foundation, different presentations

**Planned:** a shared foundational curriculum spanning concepts such as variables, control flow, decomposition, debugging, and practical programming. These examples describe possible foundational scope, not approved lesson sequences. Reuse concepts and stable identifiers rather than forcing identical reading, task length, or interaction on every learner.

| Experience                      | Status  | Intended adaptation                                                                         | Decisions still needed                                                                 |
| ------------------------------- | ------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Little Apprentices, ages 6–9    | Planned | Short, concrete, supported activities; accessible visual and textual explanations           | Reading assumptions, adult support, interaction methods, privacy and supervision model |
| Junior Spellcasters, ages 10–13 | Planned | Increasing independence, explanations and debugging practice, appropriately scoped projects | Starting capabilities, task scope, feedback style, safety expectations                 |
| Flexible older-learner pathways | Planned | Choose entry points based on goals/readiness, with support available                        | Age boundaries if any, placement options, whether and how capability checks work       |
| Adult learning paths            | Planned | Foundations through advanced practical work, flexible pace and entry                        | Initial goals, first deliverable, sequencing, project expectations                     |
| AI agent learning experiences   | Planned | Structured lessons, explicit objectives, constrained tasks, assessable outputs              | Schema, delivery interface, permitted tools, provenance and evaluation criteria        |

No audience-selection UI or placement mechanism exists. No age information is collected. These intended adaptations are not claims that existing content has been tested for these groups.

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

**Planned:** clear objective → explanation/example → practical challenge → evidence → assessment/feedback → next activity. Each learner should know what they are practicing, how to begin, and what the feedback means. A lesson completion click or elapsed time alone should not be mistaken for demonstrated capability.

**Proposed schema extensions**, not current TypeScript properties or an adopted schema:

- Stable objective and capability identifiers linked to a concept.
- Audience presentation variants, prerequisites with a reason, and accessible alternatives.
- Task specification, expected outputs or rubric, feedback guidance, and hints.
- Evidence records separating attempts, evaluation results, and capability decisions.
- Content/schema version and provenance, especially for machine consumption.

Choose the smallest useful extension only when implementing a reviewed lesson. Keep content and assessment logic out of page components; preserve stable links where possible. Define migrations before treating a future persisted record as durable.

## Practical challenges, assessment, and progression

**Planned:** practical challenges and feedback that help learners correct misunderstandings. Assessment criteria and mastery thresholds remain undecided. Possible checks include deterministic output tests, explanation rubrics, or project review; these are **Proposed** options, not selected historical alternatives.

**Planned:** capability-based progression. Age and XP should not be substitutes for demonstrated understanding. A learner who already knows a concept should have a considered way to show it, while another learner can revisit material without punitive locks. How evidence is collected, reviewed, stored, and made understandable still requires founder and engineering decisions.

XP, streaks, and achievement displays are currently demo presentation only. Do not connect the sample numbers to a future learner record or claim that demo rewards have been earned.

## Controlled code execution

**Planned:** controlled practice execution. **Implemented today:** no runner, interpreter, sandbox, server execution, or tool-grant interface. The existing Potion Lab route is informative text.

Before introducing execution, decide the runtime and threat model. **Proposed design constraints** include resource/time limits, isolation from application credentials and personal files, network/filesystem restrictions, resettable sessions, bounded outputs, and accessible errors. Browser-based and isolated remote runtimes are options to evaluate, not selected dependencies. Never run untrusted lesson/agent code directly in the application or developer shell as a shortcut.

This architecture document does not authorize provisioning infrastructure or services. Maintain the academy's free-to-learn promise and decide operational constraints before selecting a runner.

## AI lessons and human–AI collaboration

**Planned:** machine-readable agent lessons with explicit objectives, input/output contracts, permitted tools, challenge bounds, and assessable outcomes. The existing TypeScript metadata is not a published lesson schema or API. A task specification must not silently grant an agent access to a learner's resources.

**Planned:** human–AI collaboration that makes authorship, assistance, and assessment evidence understandable. **Proposed** practices include identifying who attempted a task, what assistance occurred, and when a human must review an outcome. No chat provider, collaboration protocol, model, or automated tutor has been selected. Ask Hexi currently offers no connected assistant.

Machine-readable content and submitted outputs should be treated as data, not trusted instructions to alter platform permissions. Design execution boundaries and evaluation together; distinguish an AI's successful task result from a claim about its internal understanding.

## Delivery questions and verification

Crystal must prioritize audiences and the first course, approve objectives, define readiness/mastery expectations, and choose the role of adult support and AI assistance. Data collection, consent/supervision requirements, retention, and any account model require separate design review before implementation. This document does not make legal or compliance claims.

For a future working lesson, verify objective clarity, audience readability, keyboard/assistive access, challenge/feedback consistency, assessment reliability, execution boundaries, and truthful progress reporting. For this blueprint, verification is a source/document consistency review only; no educational effectiveness has been tested.

See the [Feature Registry](FEATURE_REGISTRY.md) for delivery status and the [Decision Log](DECISION_LOG.md) for recorded choices and unresolved context.
