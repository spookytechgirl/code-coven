import { htmlLesson } from "./lessons/web-html.ts";
import { thinkingLesson } from "./lessons/programming-thinking.ts";
import { variablesLesson } from "./lessons/python-variables.ts";
import { pythonLesson } from "./lessons/python-output.ts";
import type { Course, Department } from "../types/curriculum";
export const courses: Course[] = [
  {
    id: "programming-foundations",
    departmentId: "cottage",
    title: "Your First Spell",
    description:
      "Start with variables, logic, and the joy of solving a problem.",
    difficulty: "Beginner",
    lessonCount: 12,
    learningEntry: "/courses/programming-foundations#classrooms",
    modules: [
      {
        id: "programming-thinking-basics",
        title: "Thinking in clear steps",
        lessons: [thinkingLesson],
      },
    ],
    accent: "pink",
  },
  {
    id: "python-potions",
    departmentId: "potions",
    title: "Python Potions",
    learningEntry: "/learn",
    description:
      "A pinch of logic, a dash of Python. Brew your first programs.",
    difficulty: "Beginner",
    lessonCount: 18,
    modules: [
      {
        id: "python-output-basics",
        title: "Your first Python output",
        lessons: [pythonLesson],
      },
      {
        id: "python-variable-basics",
        title: "Names and values in the Variable Vault",
        lessons: [variablesLesson],
      },
    ],
    accent: "purple",
  },
  {
    id: "web-enchantment",
    departmentId: "workshop",
    title: "Web Enchantment",
    description: "Bring your ideas to life with HTML, CSS, and JavaScript.",
    difficulty: "Beginner",
    lessonCount: 24,
    learningEntry: "/courses/web-enchantment#classrooms",
    modules: [
      {
        id: "web-html-basics",
        title: "A first meaningful web page",
        lessons: [htmlLesson],
      },
    ],
    accent: "pink",
  },
  {
    id: "algorithm-alchemy",
    departmentId: "library",
    title: "Algorithm Alchemy",
    description: "Discover patterns, data structures, and elegant solutions.",
    difficulty: "Intermediate",
    lessonCount: 20,
    modules: [],
    accent: "gold",
  },
  {
    id: "ai-fundamentals",
    departmentId: "observatory",
    title: "AI Fundamentals",
    description: "Explore the curious world of artificial intelligence.",
    difficulty: "Beginner",
    lessonCount: 16,
    modules: [],
    accent: "gold",
  },
  {
    id: "cybersecurity-charms",
    departmentId: "tower",
    title: "Cybersecurity Charms",
    description: "Learn how to protect systems and recognize digital threats.",
    difficulty: "Beginner",
    lessonCount: 15,
    modules: [],
    accent: "purple",
  },
  {
    id: "software-sorcery",
    departmentId: "sanctum",
    title: "Software Sorcery",
    description: "Design resilient software and grow your engineering craft.",
    difficulty: "Advanced",
    lessonCount: 22,
    modules: [],
    accent: "pink",
  },
];
const locations = [
  [
    "cottage",
    "The Apprentice's Cottage",
    "Programming Fundamentals",
    "Every great adventure starts with the basics.",
  ],
  [
    "potions",
    "The Potion Laboratory",
    "Python Programming",
    "Brew something brilliant, one line at a time.",
  ],
  [
    "workshop",
    "The Enchanted Workshop",
    "HTML, CSS, JavaScript",
    "Craft delightful things for the web.",
  ],
  [
    "library",
    "The Ancient Library",
    "Computer Science and Algorithms",
    "Uncover the wisdom behind the code.",
  ],
  [
    "observatory",
    "The Oracle's Observatory",
    "AI and Machine Learning",
    "Let curiosity guide you toward new possibilities.",
  ],
  [
    "tower",
    "The Guardian's Tower",
    "Cybersecurity",
    "Learn the art of keeping the digital world safe.",
  ],
  [
    "sanctum",
    "The Archmage's Sanctum",
    "Advanced Software Development",
    "Refine your craft and build bigger magic.",
  ],
];
export const departments: Department[] = locations.map(
  ([id, title, subject, description]) => ({
    id,
    title,
    subject,
    description,
    paths: [
      {
        id: `${id}-path`,
        title: subject,
        courseIds: courses
          .filter((c) => c.departmentId === id)
          .map((c) => c.id),
      },
    ],
  }),
);
export const demoProgress: Record<string, number> = {
  "python-potions": 35,
  "web-enchantment": 12,
  "ai-fundamentals": 0,
};
export const hexiTips = [
  "Psst! Did you know Python uses indentation to organize code? Keep those spells tidy!",
  "Big spells start small. Break your problem into one tiny step at a time.",
  "Bugs fear me! Read the error message first — it usually leaves a clue.",
  "Remember to take a stretch break. Even familiars need a little rest.",
];
