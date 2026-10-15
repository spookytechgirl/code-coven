# Studying Code Coven as a Reference

Last reviewed: 2026-10-15 · Status: Implemented documentation, not an integration or license grant

## Start with the purpose

Read the [Vision](ACADEMY_VISION.md), then the [Feature Registry](FEATURE_REGISTRY.md). Understand the distinction between a functioning academy interface and a completed educational system. Mission 008 now implements one shared print() pilot with audience adaptations, human text checks, and a machine-readable AI specification. Python execution, agent APIs, trusted capability progression, and broader curricula remain plans.

## Study the boundaries

1. Inspect [curriculum types](../src/types/curriculum.ts) and [data](../src/data/curriculum.ts) to see a metadata/presentation separation. One Python module contains the canonical print() lesson; other modules remain empty, and path links reference course IDs.
2. Compare [Explore](../src/pages/Explore.tsx), [CourseCard](../src/components/CourseCard.tsx), and [Dashboard](../src/pages/Dashboard.tsx): one data model supports multiple views while demo progress remains separate.
3. Study [theme state](../src/theme/ThemeProvider.tsx), semantic navigation, and reduced-motion styles as implementation patterns. Revalidate accessibility for your own users instead of inheriting a compliance claim.
4. Read the [Learning Architecture](LEARNING_ARCHITECTURE.md) as a set of intentions and open choices. Adapt objectives, evaluation, capability evidence, and controlled execution to your own educational purpose.
5. Inspect the [AI integration guide](AI_INTEGRATION.md) for the bounded pilot checker and future contract; it grants no access or execution permissions. Use the [Decision Log](DECISION_LOG.md) format to record your own reasoning. Preserve uncertainty rather than importing undocumented history as fact.

## Keep independent identity and governance

Alignment Academy is independently developed; it is one possible reference reader, not an owner, dependency, or connected service. Use your own name, visual identity, mascot, stories, and educational framing. Do not copy Hexi, Code Coven's branding, artwork, or branded copy under the assumption that architectural study grants permission.

No repository license file is present at this baseline. Before copying or distributing code/content, establish applicable permission or licensing with the owner. Conceptual study alone does not establish reuse rights or an endorsement by Crystal. Code Coven retains its own ownership and creative direction.

## Assume no private access

Use only material you are authorized to inspect. Do not assume access to private repositories, synced reference files, accounts, API credentials, learner data, or hosting resources. The `sources/` directory is read-only synced reference material, not an application dependency or a resource offered to other projects. No real learner database exists here.

A local build, hosted preview, or visible endpoint would not grant permission for automation or tool execution against another system. Design your own security boundaries and obtain explicit access for any future integration.

## Validate your adaptation

Choose your own audience, first learning outcome, content rights, feedback policy, runtime boundaries, and verification criteria. Make no claim that Code Coven has already validated those decisions for your project. Consult [README](../README.md) for local setup and [DEPLOYMENT](../DEPLOYMENT.md) for this project's operational preparation; keep your own deployment/credential decisions independent.
