import {
  littleApprenticeTeaching,
  littleKnowledgeFeedback,
} from "./little-apprentice-teaching.ts";
import { withKnowledgeFeedback } from "../../learning/feedback.ts";
import rawSpec from "./python-output.v1.json" with { type: "json" };
import { parseAiLesson } from "../../learning/schema.ts";
import type {
  LearningLesson,
  LessonVariant,
  KnowledgeQuestion,
} from "../../types/learning.ts";
export const pythonSpec = parseAiLesson(rawSpec);
const recognize: KnowledgeQuestion = {
  id: "recognize",
  prompt: "Which instruction correctly asks Python to display a message?",
  choices: [
    {
      id: "print",
      text: 'print("Hello, Code Coven!")',
      correct: true,
      feedback:
        "Yes! print is followed by parentheses, and the message is inside matching quotes.",
    },
    {
      id: "say",
      text: 'say("Hello, Code Coven!")',
      correct: false,
      feedback:
        "A person can say hello, but this Python lesson uses the function named print. Try that instruction.",
    },
    {
      id: "quotes",
      text: "print(Hello, Code Coven!)",
      correct: false,
      feedback:
        "Text needs quotation marks around it so Python can recognize a string.",
    },
  ],
};
const predict: KnowledgeQuestion = {
  id: "predict",
  prompt: 'What would print("Hello, Code Coven!") display in Python?',
  choices: [
    {
      id: "hello",
      text: "Hello, Code Coven!",
      correct: true,
      feedback:
        "Exactly! Python displays the message, without the surrounding quotes or the word print.",
    },
    {
      id: "quotes",
      text: '"Hello, Code Coven!"',
      correct: false,
      feedback:
        "The quotation marks tell Python where the string starts and ends. They are not displayed.",
    },
    {
      id: "command",
      text: 'print("Hello, Code Coven!")',
      correct: false,
      feedback:
        "That is the instruction. The output is just the message inside the quotes.",
    },
  ],
};
const parts: KnowledgeQuestion = {
  id: "parts",
  prompt: 'In print("Hello, Code Coven!"), what do the quotation marks do?',
  choices: [
    {
      id: "string",
      text: "Mark the start and end of a string (a piece of text).",
      correct: true,
      feedback:
        "Correct. Matching quotation marks enclose the text argument passed to print.",
    },
    {
      id: "function",
      text: "Name the function.",
      correct: false,
      feedback:
        "The name print identifies the function. Quotation marks identify text.",
    },
    {
      id: "output",
      text: "Add quotation marks to the displayed output.",
      correct: false,
      feedback:
        "The quote delimiters are code syntax, not characters in the output.",
    },
  ],
};
export const variants: LessonVariant[] = [
  {
    id: "kids-little",
    audience: "kids",
    band: "little",
    title: "Your First Magical Spell!",
    audienceLabel: "Little Apprentices · ages 6–9",
    intro:
      "Welcome, little spellcaster! Today we're going to teach your computer how to say hello!",
    sections: [
      {
        title: "Computers follow instructions",
        paragraphs: [
          "A computer follows instructions, like a recipe. We can write instructions using a programming language called Python.",
          "Our first instruction is print. It asks the computer to display a message. You can read together with a grown-up if you like.",
        ],
      },
      {
        title: "Meet your first spell",
        paragraphs: [
          "print is the instruction. The round parentheses hold our message. The matching quotation marks show where the message begins and ends.",
          "Read the example, then choose an answer. You can try as often as you like. There is no timer or score.",
        ],
      },
    ],
    teaching: littleApprenticeTeaching,
    questions: [
      withKnowledgeFeedback(recognize, littleKnowledgeFeedback.recognize),
      withKnowledgeFeedback(predict, littleKnowledgeFeedback.predict),
    ],
    taskId: "hello",
    practiceIntro:
      "Guided activity: finish the message between the quotes so your spell would display Hello, Code Coven! You can edit the whole line if you like.",
    starter: 'print("Hello, ")',
  },
  {
    id: "kids-junior",
    audience: "kids",
    band: "junior",
    title: "Your First Magical Spell!",
    audienceLabel: "Junior Spellcasters · ages 10–13",
    intro:
      "Welcome, little spellcaster! Today we're going to teach your computer how to say hello!",
    sections: [
      {
        title: "Python is a language for instructions",
        paragraphs: [
          "Programs are instructions a computer follows. Python is one programming language we can use to write them. A Python interpreter normally reads those instructions and carries them out.",
          "The print function displays text. Text enclosed in matching quotes is called a string.",
        ],
      },
      {
        title: "Change the spell, change the message",
        paragraphs: [
          "The function name is print. Parentheses surround its argument, and quotes surround the text argument. In Python, matching single quotes also work.",
          "Changing only the text changes the displayed message. Try changing Hello, Code Coven! to Welcome to Code Coven! in the challenge below. Keep both parentheses and matching quotes.",
        ],
      },
    ],
    questions: [parts, predict],
    taskId: "welcome",
    practiceIntro:
      "Modify the message in the starter code so it would display Welcome to Code Coven! Keep the function name and the string syntax.",
    starter: 'print("Hello, Code Coven!")',
  },
  {
    id: "adults",
    audience: "adults",
    title: "Introduction to Python: Your First Program",
    audienceLabel: "Adults · beginners and returning learners",
    intro:
      "Write a first instruction, understand its parts, and check the exact message it describes.",
    sections: [
      {
        title: "Python and program execution",
        paragraphs: [
          "Python is a programming language: a structured way to express instructions. A Python interpreter normally reads a program and executes those instructions in order.",
          'In a terminal or Python environment, print("Hello, Code Coven!") displays Hello, Code Coven! and normally adds a newline. This browser lesson does not run an interpreter; it offers a limited text check.',
        ],
      },
      {
        title: "Functions, arguments, and string literals",
        paragraphs: [
          "print is a function name. The parentheses contain an argument: here, a string literal. A string literal is text written directly in matching single or double quotation marks.",
          "The quotation marks are delimiters in the program, not part of the displayed message. Parentheses complete the function call. Capitalization and punctuation inside the string affect the exact output.",
        ],
      },
      {
        title: "Common syntax mistakes",
        paragraphs: [
          "print is lowercase. Print and print are different names. Missing quotation marks or mismatched quotes do not express the string shown here; missing parentheses leave an incomplete call.",
          "Real Python supports many valid forms beyond this activity. This checker intentionally rejects variables, multiple arguments, comments, escape sequences, and additional statements. A rejected answer may be valid Python outside this restricted exercise.",
        ],
      },
    ],
    questions: [recognize, parts, predict],
    taskId: "welcome",
    practiceIntro:
      "Practice quest: write a single print call that displays the exact output below. Use one plain quoted string. You may use single or double quotes.",
    starter: "",
  },
];
export const pythonLesson: LearningLesson = {
  id: pythonSpec.lessonId,
  title: "Python Lesson 001: Output with print()",
  courseId: pythonSpec.courseId,
  conceptId: pythonSpec.conceptId,
  version: pythonSpec.contentVersion,
  content: pythonSpec.conceptExplanations.join("\n\n"),
  learningObjectives: pythonSpec.learningObjectives,
  prerequisites: pythonSpec.prerequisites,
  examples: pythonSpec.examples,
  variants,
  challenges: pythonSpec.practiceTasks.map((task) => ({
    id: task.id,
    title: "A first print spell",
    instructions: task.instruction,
    rewardXP: 0,
  })),
};
export const learningPaths = [
  {
    id: "kids",
    title: "Code Coven for Kids",
    description: "Little spells. Big discoveries.",
    audience: "Little Apprentices 6–9 · Junior Spellcasters 10–13",
    experience:
      "Friendly explanations, guided practice, and encouragement from Hexi. Choose either difficulty at any time.",
    route: "/learn/kids",
    departmentId: "cottage",
  },
  {
    id: "adults",
    title: "Code Coven for Adults",
    description: "Practical foundations, at your pace.",
    audience: "Adult beginners and returning learners",
    experience:
      "Clear explanations, knowledge checks, and a first Python practice quest. No prior coding experience needed.",
    route: "/learn/adults",
    departmentId: "potions",
  },
  {
    id: "ai",
    title: "Code Coven for AIs",
    description: "Explicit objectives. Inspectable outcomes.",
    audience: "Developers building or evaluating AI agents",
    experience:
      "A versioned lesson specification, deterministic sample assessments, and a future integration contract.",
    route: "/learn/ai",
    departmentId: "observatory",
  },
] as const;
export const lessonRoutes = {
  kids: "/learn/kids/python/first-spell",
  adults: "/learn/adults/python/first-program",
  ai: "/learn/ai/python/output-fundamentals",
};
