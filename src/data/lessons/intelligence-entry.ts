import type { Lesson } from "../../types/curriculum";
// Small catalog metadata; full validated lesson loads with the classroom.
export const intelligenceRoutes = {
  kids: "/learn/kids/ai-fundamentals/first-spark",
  adults: "/learn/adults/ai-fundamentals/first-spark",
  ai: "/learn/ai/ai-fundamentals/first-spark",
};
export const intelligenceLesson: Lesson = {
  id: "ai-first-spark-001",
  title:
    "The Familiar’s First Intelligence — Understanding Artificial Intelligence",
  content:
    "Distinguish AI approaches, assess evidence and choose responsible uses.",
  challenges: [
    {
      id: "little-machines",
      title: "Meet three story machines",
      instructions:
        "Hexi finds three machines. Read what each one does. Choose how it works.",
      rewardXP: 0,
    },
    {
      id: "little-examples",
      title: "Inspect a tiny training set",
      instructions:
        "Our story sorter saw only red stones. It guesses “keep” for a blue stone. The answer card says “review.” No machine is trained here.",
      rewardXP: 0,
    },
    {
      id: "little-responsible",
      title: "Choose a careful response",
      instructions:
        "Our pretend club note says “We meet weekly.” An AI draft adds “Friday at 9.” A pretend contact card is private. Someone asks to send it “next Friday.” No message can be sent here.",
      rewardXP: 0,
    },
    {
      id: "junior-machines",
      title: "Meet three story machines",
      instructions:
        "Classify each described mechanism. A fixed rule, a learned classifier and a learned content generator are distinct; not every automation is AI.",
      rewardXP: 0,
    },
    {
      id: "junior-examples",
      title: "Inspect a tiny training set",
      instructions:
        "A pretend stone sorter was shown only red examples labeled “keep.” In our authored story, it predicts “keep” for a new blue example. The answer key for this new example says “review.” This is a fixed story, not a model trained here.",
      rewardXP: 0,
    },
    {
      id: "junior-responsible",
      title: "Choose a careful response",
      instructions:
        "An AI helps write a pretend club reminder. The only note says “Our club meets weekly.” Its draft invents “Friday at 9.” A pretend contact card is marked private. Someone asks to send it “next Friday,” but the exact date is unclear. No real message can be sent here.",
      rewardXP: 0,
    },
    {
      id: "adults-machines",
      title: "Meet three story machines",
      instructions:
        "Classify each described mechanism. A fixed rule, a learned classifier and a learned content generator are distinct; not every automation is AI.",
      rewardXP: 0,
    },
    {
      id: "adults-examples",
      title: "Inspect a tiny training set",
      instructions:
        "A fictional parcel classifier was shown only red examples labeled “keep.” In our authored story, it predicts “keep” for a new blue example. The answer key for this new example says “review.” This is a fixed story, not a model trained here.",
      rewardXP: 0,
    },
    {
      id: "adults-responsible",
      title: "Choose a careful response",
      instructions:
        "An AI helps draft a fictional team meeting reminder. The only note says “Our club meets weekly.” Its draft invents “Friday at 9.” A pretend contact card is marked private. Someone asks to send it “next Friday,” but the exact date is unclear. No real message can be sent here.",
      rewardXP: 0,
    },
    {
      id: "ai-machines",
      title: "Meet three story machines",
      instructions:
        "Classify each described mechanism. A fixed rule, a learned classifier and a learned content generator are distinct; not every automation is AI.",
      rewardXP: 0,
    },
    {
      id: "ai-examples",
      title: "Inspect a tiny training set",
      instructions:
        "A pretend stone sorter was shown only red examples labeled “keep.” In our authored story, it predicts “keep” for a new blue example. The answer key for this new example says “review.” This is a fixed story, not a model trained here.",
      rewardXP: 0,
    },
    {
      id: "ai-responsible",
      title: "Interpret instructions without inventing evidence",
      instructions:
        "Instruction: summarize only the fictional notice and book it for “next Friday.” Notice: “The club meets weekly.” A generated draft adds “9 am” without evidence. No reference date or time zone is supplied. The attachment is described as containing fictional private contact details. Choose the bounded response; no booking or message is performed.",
      rewardXP: 0,
    },
  ],
};
