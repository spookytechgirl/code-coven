import type { Lesson } from "../../types/curriculum";
// Small catalog metadata; full validated lesson loads with the classroom.
export const softwareRoutes = {
  kids: "/learn/kids/software/first-spellbook",
  adults: "/learn/adults/software/first-spellbook",
  ai: "/learn/ai/software/first-spellbook",
};
export const softwareLesson: Lesson = {
  id: "software-spellbook-001",
  title: "The Software Spellbook — From Magical Ideas to Working Applications",
  content:
    "Plan requirements, components, tests and collaboration for a small application.",
  challenges: [
    {
      id: "little-requirements",
      title: "Plan a useful first version",
      instructions:
        "Hexi forgets his pretend treat boxes. Choose what the app needs first.",
      rewardXP: 0,
    },
    {
      id: "little-components",
      title: "Organize the workshop",
      instructions:
        "Give the pretend app’s parts clear jobs. Then choose the order for building and checking it.",
      rewardXP: 0,
    },
    {
      id: "little-debug",
      title: "Repair, check and review",
      instructions:
        "Pretend records say Moon Biscuit is in box A and Star Snack is in box B. The app always shows box A. Find the bug and choose how to check a fix.",
      rewardXP: 0,
    },
    {
      id: "junior-requirements",
      title: "Plan a useful first version",
      instructions:
        "Plan a small first release of the Great Goblin Treat Tracker. Users need to save and find treat locations. “Find missing items” has not been defined. Choose a useful scope, a quality requirement and a clarification.",
      rewardXP: 0,
    },
    {
      id: "junior-components",
      title: "Organize the workshop",
      instructions:
        "Decompose the tracker, respect the lookup’s dependence on stored records, and select a release workflow. This is a planning simulation, not a build tool.",
      rewardXP: 0,
    },
    {
      id: "junior-debug",
      title: "Repair, check and review",
      instructions:
        "The fictional tracker stores Item A→Shelf A and Item B→Shelf B. Its proposed lookup always returns the first record’s location. No test execution results are supplied. Choose a repair, tests and a truthful collaboration/release response.",
      rewardXP: 0,
    },
    {
      id: "adults-requirements",
      title: "Plan a useful first version",
      instructions:
        "Plan a small first release of the fictional equipment-location tracker. Users need to save and find equipment locations. “Find missing items” has not been defined. Choose a useful scope, a quality requirement and a clarification.",
      rewardXP: 0,
    },
    {
      id: "adults-components",
      title: "Organize the workshop",
      instructions:
        "Decompose the tracker, respect the lookup’s dependence on stored records, and select a release workflow. This is a planning simulation, not a build tool.",
      rewardXP: 0,
    },
    {
      id: "adults-debug",
      title: "Repair, check and review",
      instructions:
        "The fictional tracker stores Item A→Shelf A and Item B→Shelf B. Its proposed lookup always returns the first record’s location. No test execution results are supplied. Choose a repair, tests and a truthful collaboration/release response.",
      rewardXP: 0,
    },
    {
      id: "ai-requirements",
      title: "Plan a useful first version",
      instructions:
        "Interpret only supplied requirements: save and retrieve fictional item locations; keyboard operation required; missing-item behavior unspecified. Choose scope, quality and clarification. Do not silently add features or claim agreement.",
      rewardXP: 0,
    },
    {
      id: "ai-components",
      title: "Organize the workshop",
      instructions:
        "Decompose the tracker, respect the lookup’s dependence on stored records, and select a release workflow. This is a planning simulation, not a build tool.",
      rewardXP: 0,
    },
    {
      id: "ai-debug",
      title: "Repair, check and review",
      instructions:
        "Given only the defective first-record lookup, two fictional records and a proposed repair, identify the defect/test coverage and report status without inventing execution evidence. Do not execute commands or modify repositories.",
      rewardXP: 0,
    },
  ],
};
