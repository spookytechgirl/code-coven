# Academy Vision

Last reviewed: 2026-10-15 · Application baseline: v0.3.0

## Purpose and authority

Code Coven is a completely free, enchanted coding academy created by **Crystal**, its founder and creative director. Crystal directs its educational philosophy, creative identity, audience priorities, and product direction. Code Coven has independent ownership and direction; it is not a component of, or governed by, another educational project. This describes project direction, not a new legal entity or licensing agreement.

This blueprint explains both what exists and why future work matters. Current implementation is verified against repository files; future intentions come from the Mission 007 founder brief. Status meanings and feature-level evidence live in the [Feature Registry](FEATURE_REGISTRY.md). The brief establishes direction, not implementation approval for every possible service or technology.

## Enduring principles

| Principle                        | Meaning for development                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Completely free education        | Free to learn. Free to grow. Free forever. Do not introduce premium lessons, paywalls, or paid learner tiers.                                                            |
| Beginner through advanced        | Offer approachable foundations and meaningful routes toward advanced programming. Catalog labels alone do not fulfill this promise.                                      |
| Magical adventure-based learning | Use the academy, quests, departments, and Hexi to encourage exploration; retain direct navigation, clear instructions, and honest feedback.                              |
| Accessibility and inclusivity    | Design for different abilities, reading levels, devices, learning paces, and prior experience. Validate access rather than claiming universal compliance.                |
| Learning through practice        | Build understanding through clear objectives, applied challenges, feedback, and demonstrated capabilities. These learning workflows are not implemented yet.             |
| Human and AI experiences         | Share foundational concepts while adapting presentation, interaction, and evidence of learning to each audience. An AI subject course is not an agent-learning platform. |
| Honest status                    | Distinguish prototypes, sample statistics, approved content, and working educational features. Never present demo XP as saved progress.                                  |

## Three audiences

All three audience experiences are **Planned**. The current open website has no audience selector, age gating, differentiated lessons, agent API, or adult-specific pathway.

- **Code Coven for Kids:** Little Apprentices (ages 6–9) and Junior Spellcasters (ages 10–13), with age-appropriate reading, tasks, support, and safeguards still to be designed.
- **Code Coven for Adults:** flexible entry points, practical paths, and progressively demanding work without assuming every adult starts at the same level.
- **Code Coven for AIs:** machine-readable lessons, explicit goals and boundaries, and assessable task outcomes. This is distinct from humans learning about AI through AI Fundamentals.

Older learners need flexible pathways rather than an automatic placement based only on age. No upper-age cutoff, placement algorithm, guardian workflow, or account model has been chosen. See [Learning Architecture](LEARNING_ARCHITECTURE.md).

## What exists today

**Implemented:** a browsable public academy, seven departments with course metadata, a searchable catalog, routed course previews, a clearly marked demo student dashboard, theme persistence, local concept illustrations, and accessibility-oriented navigation/styles. See [README](../README.md) for setup and the [Feature Registry](FEATURE_REGISTRY.md) for exact scope.

**Planned:** actual teaching content and differentiated learning experiences. Every current course has an empty modules array. There is no executable exercise, assessment engine, saved progression, authentication, or database. Courses can be explored without an account.

The seven magical locations establish a setting, not locked academic silos. Avoid unrelated prerequisites that prevent someone exploring a department. Any future prerequisite should explain its learning purpose and offer a way to demonstrate an existing capability.

## Relationship to other projects

Alignment Academy is independently developed. It may study Code Coven as an architectural and educational reference; that does not establish shared governance, a partnership, a data connection, compatibility, or access to private resources. No integration is implemented or approved by this blueprint.

Study the separation of curriculum data, presentation, and learning evidence. Do not assume permission to copy Code Coven's name, Hexi, artwork, branded copy, or private materials. No project license file is currently present; obtain explicit permission or an applicable license before reusing code or content. See the short [Reference Guide](REFERENCE_GUIDE.md).

## Founder decisions still needed

1. Which audience and first learning pathway should be delivered first, and what constitutes a useful initial course?
2. What reading, interaction, supervision, and privacy expectations should distinguish the two children's pathways?
3. How should older learners choose or demonstrate readiness without restrictive age assumptions?
4. What should adult pathways emphasize: general foundations, practical projects, career goals, or a combination?
5. How should success be measured for an AI learner, and which agent interactions should be allowed?
6. What evidence establishes mastery, what feedback is appropriate, and which progression rules are acceptable?
7. What sharing/license policy and brand-use permissions should govern reference projects?

These are unresolved decisions, not reasons to change the current interface during documentation work. No new platform service, code-execution system, account system, or deployment is authorized by this document.

## Maintenance

Update this document when mission, governance, audiences, or guiding principles change. Keep implementation details in the registry and source, design rules in the [Design System](DESIGN_SYSTEM.md), and decision evidence in the [Decision Log](DECISION_LOG.md). Do not rewrite history to match a later implementation.
