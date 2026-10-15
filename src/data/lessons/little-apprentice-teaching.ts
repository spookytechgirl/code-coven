import type { LessonTeaching } from "../../types/learning.ts";
export const littleApprenticeTeaching: LessonTeaching = {
  practiceFeedback: {
    messages: {
      empty: "Let's try a spell! Start with the example above.",
      "unsupported-syntax":
        "This activity checks one short print spell. Try the example on its own.",
      "output-mismatch":
        "Good try! Check the words inside your quotation marks. Can you make them match the example?",
      "too-long": "That spell is long! Try just the short example above.",
      correct: "Your spell matches! Beautiful work, little spellcaster!",
    },
    hints: {
      missingQuotes:
        "Almost! Put matching quotation marks around your message. One at the beginning and one at the end!",
      matchingQuotes:
        "Almost! Use the same kind of quotation mark at both ends of your message.",
      missingParentheses:
        "Your spell needs its round brackets! Add ( and ) around your message.",
      functionName:
        "Almost! Start with print in small letters, just like the example.",
    },
  },
  checkerNotice:
    "This is guided practice. It checks your written spell. It does not run Python.",
  outputNotice: "Write the spell that would show these words.",
  completion: {
    title: "Your First Spell Was Successful!",
    message:
      "YOU DID IT! You just completed your first Python coding lesson! I'm so proud of you, little spellcaster!",
    achievement: "First Spell Cast!",
    reviewLabel: "Review This Lesson",
    reviewHref: "#lesson-start",
    returnLabel: "Return to Learning Path",
    returnTo: "/learn/kids",
  },
};
export const littleKnowledgeFeedback: Record<string, Record<string, string>> = {
  recognize: {
    print: "You found it! print tells the computer to show your message.",
    say: "Good try! Start your spell with print, just like the example.",
    quotes: "Almost! Add matching quotation marks around the message.",
  },
  predict: {
    hello: "You got it! The computer shows Hello, Code Coven!",
    quotes:
      "Good try! The quotation marks stay in the spell. We only see the words inside them.",
    command:
      "Almost! Look inside the quotation marks. Those are the words the computer shows.",
  },
};
