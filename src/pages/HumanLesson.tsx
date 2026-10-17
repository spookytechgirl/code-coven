import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import {
  CodeExample,
  KnowledgeCheck,
  PracticeQuest,
} from "../components/lessons/LessonControls";
import {
  pythonLesson,
  pythonSpec,
  variants,
} from "../data/lessons/python-output";
import type { LessonVariant } from "../types/learning";
import { useLessonProgress } from "../learning/useLessonProgress";
export function HumanLesson({ audience }: { audience: "kids" | "adults" }) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = variants.find(
    (v) => v.id === (audience === "adults" ? "adults" : `kids-${band}`),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/learn">
          <ArrowLeft size={15} /> Switch pathways
        </Link>
        <Link to="/learn/kids">Kids</Link>
        <Link to="/learn/adults">Adults</Link>
        <Link to="/learn/ai">AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="lesson-band">Choose your spell difficulty</label>
          <select
            id="lesson-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <HumanClassroom key={variant.id} variant={variant} />
    </>
  );
}
function HumanClassroom({ variant }: { variant: LessonVariant }) {
  const required = [...variant.questions.map((q) => q.id), "practice"];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    pythonLesson.id,
    variant.id,
    pythonLesson.version,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animateCompletion, setAnimateCompletion] = useState(!complete);
  const teaching = variant.teaching;
  function resetLessonProgress() {
    setAnimateCompletion(true);
    reset();
  }
  useEffect(() => {
    document.title = `${variant.title} | Code Coven`;
  }, [variant.title]);
  return (
    <article className={`page-width lesson-page lesson-${variant.audience}`}>
      <header className="lesson-header">
        <span className="eyebrow">PYTHON POTIONS · LESSON 001</span>
        <h1 id="lesson-start" tabIndex={-1}>
          {variant.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your learning objective</h2>
          <p>{pythonLesson.learningObjectives[0].description}</p>
          <small>No prerequisites · one small step at your own pace</small>
        </div>
      </header>
      <div className="lesson-workspace">
        <div className="lesson-reading">
          <section className="card lesson-welcome">
            <Hexi />
            <div>
              <span className="eyebrow">HEXI’S WELCOME</span>
              <p>{variant.intro}</p>
              <small>Take your time. Every attempt is a chance to learn.</small>
            </div>
          </section>
          {variant.sections.map((section, index) => (
            <section className="lesson-section" key={section.title}>
              <span className="eyebrow">
                {String(index + 1).padStart(2, "0")} · EXPLORE
              </span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {index === 0 && (
                <CodeExample
                  code={pythonLesson.examples[0].code}
                  output={pythonLesson.examples[0].expectedOutput}
                />
              )}
            </section>
          ))}
          {variant.audience === "kids" && (
            <div
              className="spell-parts"
              aria-label="Parts of a print statement"
            >
              <span>
                <code>print</code>
                <small>the function name</small>
              </span>
              <span>
                <code>( )</code>
                <small>hold the message</small>
              </span>
              <span>
                <code>"Hello, Code Coven!"</code>
                <small>a string of text</small>
              </span>
            </div>
          )}
          <section className="lesson-section">
            <span className="eyebrow">TRY · NOTICE · LEARN</span>
            <h2>Check your understanding</h2>
            <p>
              You can try again without losing points. These activities do not
              award XP or change the demo dashboard.
            </p>
            <div className="knowledge-stack">
              {variant.questions.map((question) => (
                <KnowledgeCheck
                  key={question.id}
                  question={question}
                  onPass={() => markComplete(question.id)}
                />
              ))}
            </div>
          </section>
          <PracticeQuest
            taskId={variant.taskId}
            intro={variant.practiceIntro}
            starter={variant.starter}
            feedbackCopy={teaching?.practiceFeedback}
            checkerNotice={teaching?.checkerNotice}
            outputNotice={teaching?.outputNotice}
            onPass={() => markComplete("practice")}
          />
          <nav className="lesson-path-nav" aria-label="Next Python lesson">
            <Link
              to={
                variant.audience === "adults"
                  ? "/learn/adults/python/variable-vault"
                  : `/learn/kids/python/variable-vault?band=${variant.band ?? "little"}`
              }
            >
              Lesson 002 · Open the Variable Vault <ArrowRight size={17} />
            </Link>
          </nav>
          {teaching && (
            <p
              className="sr-only"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {complete
                ? `${teaching.completion.title} ${teaching.completion.achievement}`
                : ""}
            </p>
          )}
          {complete && teaching ? (
            <CompletionCelebration
              content={teaching.completion}
              animate={animateCompletion}
            />
          ) : (
            <section
              className={`card lesson-completion ${complete ? "is-complete" : ""}`}
              aria-live="polite"
            >
              <h2>
                {complete ? (
                  <>
                    <CheckCircle2 size={25} /> Lesson complete
                  </>
                ) : (
                  "A little more magic to explore"
                )}
              </h2>
              <p>
                {complete
                  ? "You completed each knowledge check and matched the practice text. This records activity completion, not a claim of mastery or Python execution."
                  : "Complete every knowledge check and the practice activity to finish this lesson. You can pause and return in this browser."}
              </p>
              <Link className="button secondary" to="/learn">
                Explore another pathway <ArrowRight size={17} />
              </Link>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">
            <Sparkles size={15} /> YOUR LESSON JOURNEY
          </span>
          <h2>
            {completed.length} of {required.length} activities complete
          </h2>
          <progress
            value={completed.length}
            max={required.length}
            aria-label="Lesson activities completed"
          />
          <ul>
            {variant.questions.map((q, i) => (
              <li key={q.id}>
                {completed.includes(q.id) ? "✓" : "○"} Knowledge check {i + 1}
              </li>
            ))}
            <li>{completed.includes("practice") ? "✓" : "○"} Practice quest</li>
          </ul>
          <p>
            {storageWorking
              ? "Completion is saved only in this browser. There is no account synchronization."
              : "Browser storage is unavailable. Completion lasts only while this lesson stays open."}
          </p>
          <p>
            {variant.audience === "kids"
              ? "No names, ages, answers, or code are saved. Each difficulty has its own completion record."
              : "Only completed activity IDs are saved. Your answers and code are not stored."}
          </p>
          <button
            type="button"
            className="text-link"
            onClick={resetLessonProgress}
          >
            Reset this lesson’s progress
          </button>
          <small>
            Lesson v{pythonSpec.contentVersion} ·{" "}
            {variant.audience === "kids" ? "Kids" : "Adults"} pathway
          </small>
        </aside>
      </div>
    </article>
  );
}
