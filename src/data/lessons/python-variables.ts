import rawSpec from "./python-variables.v1.json" with { type: "json" };
import { parseVariablesLesson } from "../../learning/variables-schema.ts";
import type {
  CompletionCelebrationContent,
  KnowledgeQuestion,
  LessonSection,
} from "../../types/learning.ts";
import type { Lesson } from "../../types/curriculum.ts";
export const variablesSpec = parseVariablesLesson(rawSpec);
export const variableRoutes = {
  kids: "/learn/kids/python/variable-vault",
  adults: "/learn/adults/python/variable-vault",
  ai: "/learn/ai/python/variable-vault",
};
export interface VariablesVariant {
  id: "kids-little" | "kids-junior" | "adults";
  audienceLabel: string;
  intro: string;
  sections: (LessonSection & { example?: number })[];
  questions: KnowledgeQuestion[];
  practices: {
    taskId: "label" | "number" | "change" | "inventory";
    title: string;
    starter: string;
  }[];
}
const question = (
  id: string,
  prompt: string,
  choices: [string, string, string],
  feedback: [string, string, string],
): KnowledgeQuestion => ({
  id,
  prompt,
  choices: choices.map((text, i) => ({
    id: `choice-${i}`,
    text,
    correct: i === 0,
    feedback: feedback[i],
  })),
});
const naming = question(
  "naming",
  "Which name can label a Python variable?",
  ["potion_count", "3potions", "potion count"],
  [
    "Yes! Letters and an underscore make a clear name.",
    "Start with a letter or underscore, not a number. Try potion_count.",
    "Names cannot contain spaces. Try an underscore: potion_count.",
  ],
);
const assignment = question(
  "assignment",
  "Which spell stores the number 3 in potions?",
  ["potions = 3", "potions == 3", 'potions = "3"'],
  [
    "Yes! One = assigns the integer 3 to the name potions.",
    "== asks whether values are equal. Use one = to store a value.",
    "Quotes make this text. To store the number, use 3 without quotes.",
  ],
);
const printing = question(
  "printing",
  'After familiar = "Hexi", what does print(familiar) display?',
  ["Hexi", "familiar", '"Hexi"'],
  [
    "Yes! Printing a variable shows its value: Hexi.",
    'The unquoted name asks for its value. print("familiar") would show the name itself.',
    "The surrounding quotes belong to the code. They are not printed.",
  ],
);
const reassign = question(
  "reassignment",
  "potions = 2, then potions = 5. What does print(potions) display?",
  ["5", "2", "7"],
  [
    "Yes! The same name now refers to 5.",
    "2 was the earlier value. The later assignment changes it to 5.",
    "Assignment replaces the value associated with this name. It does not add the numbers.",
  ],
);
export const variablesVariants: VariablesVariant[] = [
  {
    id: "kids-little",
    audienceLabel: "Little Apprentices · ages 6–9",
    intro:
      "Hexi says: Let’s open the Variable Vault! A variable is like a magical box with a label. The label helps us find a value.",
    sections: [
      {
        title: "Give your magic a name",
        paragraphs: [
          'Write familiar = "Hexi". The label is familiar. The words inside are Hexi.',
          "One = gives the label a value. Words need matching quotes.",
        ],
        example: 0,
      },
      {
        title: "A box for a number",
        paragraphs: [
          "A variable can hold a number too. Write potions = 3. No quotes around this number!",
          "print(potions) shows the value. Assignment alone does not show it.",
        ],
        example: 1,
      },
      {
        title: "Change what is inside",
        paragraphs: [
          "Use the same label to give it a new value.",
          "First there are 2 potions. Then there are 5. Print each time to see the change.",
        ],
        example: 2,
      },
      {
        title: "Pick a helpful label",
        paragraphs: [
          "Start with a letter or _. After that, numbers are welcome too. No spaces!",
          "Try potion_count. Python’s special words, like for, cannot be labels. familiar and Familiar are different names.",
          "The box is a picture to help us learn. Python connects a name to a value.",
        ],
      },
    ],
    questions: [printing, assignment, naming].map((q) => ({
      ...q,
      choices: q.choices.map((c) => ({
        ...c,
        feedback: `Hexi: ${c.feedback.replace("integer", "number")}`,
      })),
    })),
    practices: [
      {
        taskId: "label",
        title: "Quest 1 · Label a box",
        starter: 'familiar = ""\nprint(familiar)',
      },
      {
        taskId: "number",
        title: "Quest 2 · Count your potions",
        starter: "potions = 0\nprint(potions)",
      },
      {
        taskId: "change",
        title: "Quest 3 · A new value",
        starter: "potions = 2\nprint(potions)\npotions = 0\nprint(potions)",
      },
    ],
  },
  {
    id: "kids-junior",
    audienceLabel: "Junior Spellcasters · ages 10–13",
    intro:
      "Give your potion ingredients names, print their values, and change your inventory. Variables let you refer to values by name.",
    sections: [
      {
        title: "Create a named value",
        paragraphs: [
          'An assignment has a name on the left, one =, and a value on the right. familiar = "Hexi" stores a string under the name familiar.',
          'print(familiar) prints its contents. print("familiar") prints the literal word. Assignment itself prints nothing.',
        ],
        example: 0,
      },
      {
        title: "Text and numbers are different",
        paragraphs: [
          'potions = 3 stores an integer. potions = "3" stores text. They look alike when printed, but their types differ.',
          "In Python, variable names refer to objects. Hexi’s labeled boxes are a useful picture, not literal memory boxes.",
        ],
        example: 1,
      },
      {
        title: "Reassign the same name",
        paragraphs: [
          "Python follows these lines in order. A second assignment changes what the same name refers to.",
          "Reassignment does not add values, and it does not rewrite output already printed.",
        ],
        example: 2,
      },
      {
        title: "Names you can read",
        paragraphs: [
          "Start with a letter or underscore. Continue with letters, numbers, or underscores. No spaces or hyphens; keywords such as for are reserved.",
          "Use lowercase snake_case such as potion_count. Uppercase names are legal, but Potion and potion are different. Avoid using print as a variable name: it hides the printing function.",
        ],
      },
    ],
    questions: [printing, reassign, naming],
    practices: [
      {
        taskId: "label",
        title: "Quest 1 · Name your familiar",
        starter: 'familiar = ""\nprint(familiar)',
      },
      { taskId: "number", title: "Quest 2 · Store an integer", starter: "" },
      {
        taskId: "change",
        title: "Quest 3 · Update your inventory",
        starter: "",
      },
    ],
  },
  {
    id: "adults",
    audienceLabel: "Adults · beginners and returning learners",
    intro:
      "Use meaningful names for text and integer values, inspect them with print(), and update them through reassignment.",
    sections: [
      {
        title: "Assignment binds a name to a value",
        paragraphs: [
          'In familiar = "Hexi", = is assignment: the right-hand value becomes associated with the left-hand name. == compares values instead. Assignment is a statement and produces no printed output.',
          "A variable is a name referring to an object, rather than a fixed physical container. You must assign a name before reading it.",
        ],
        example: 0,
      },
      {
        title: "String literals and integers",
        paragraphs: [
          'Quoted text is a string; an unquoted whole number is an integer. 3 and "3" have different types even though print displays both as 3.',
          'print(familiar) reads the variable. print("familiar") prints a literal string. Quoting the value and quoting the variable name have different purposes.',
        ],
        example: 1,
      },
      {
        title: "Reassignment and order",
        paragraphs: [
          "Reusing = with the same name changes its current value. Earlier printed output remains unchanged.",
          "Python permits reassigning a name to a different type too. These exercises intentionally keep the reassignment example numeric.",
        ],
        example: 2,
      },
      {
        title: "Naming conventions and beginner mistakes",
        paragraphs: [
          "Use descriptive snake_case names. In the ASCII subset practiced here, start with a letter or underscore and continue with letters, digits, or underscores. Python also supports many Unicode identifiers, outside this checker.",
          "Names are case-sensitive. Do not start with digits, insert spaces/hyphens, use reserved keywords, or shadow print. Undefined names, missing string quotes, == in place of =, and printing a quoted name are common beginner mistakes.",
          "This checker deliberately supports only literal assignments and print(variable), not all Python. A rejection can mean unsupported valid Python; it is not a general interpreter or syntax validator.",
        ],
      },
    ],
    questions: [assignment, printing, reassign, naming],
    practices: [
      {
        taskId: "inventory",
        title: "Practice 1 · Create a two-item inventory",
        starter: "",
      },
      { taskId: "change", title: "Practice 2 · Record a change", starter: "" },
    ],
  },
];
export const variablesLesson: Lesson = {
  id: variablesSpec.lessonId,
  title: variablesSpec.title,
  content: variablesSpec.conceptExplanations.join("\n\n"),
  challenges: variablesSpec.practiceTasks.map((t) => ({
    id: t.id,
    title: t.id,
    instructions: t.instruction,
    rewardXP: 0,
  })),
};
export function vaultCelebration(
  variant: VariablesVariant,
): CompletionCelebrationContent {
  return {
    title: "The Variable Vault Is Open!",
    message:
      variant.id === "kids-little"
        ? "Hexi says: You named your magic, counted potions, and changed a value. I’m proud of your patient practice, little spellcaster!"
        : "Hexi says: You practiced naming values, printing them, and changing them. Your careful experiments opened the vault!",
    achievement: "Names for Your Magic!",
    reviewLabel: "Review This Lesson",
    reviewHref: "#lesson-start",
    returnLabel: "Return to Learning Path",
    returnTo: variant.id === "adults" ? "/learn/adults" : "/learn/kids",
  };
}
