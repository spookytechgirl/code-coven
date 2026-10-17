import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CodeExample,
  KnowledgeCheck,
} from "../components/lessons/LessonControls";
import { VariablePractice } from "../components/lessons/VariablePractice";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import {
  variablesSpec,
  variablesVariants,
  vaultCelebration,
  type VariablesVariant,
} from "../data/lessons/python-variables";
import { useLessonProgress } from "../learning/useLessonProgress";
export function VariableVault({ audience }: { audience: "kids" | "adults" }) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = variablesVariants.find(
    (v) => v.id === (audience === "adults" ? "adults" : `kids-${band}`),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/learn">← Switch pathways</Link>
        <Link to="/learn/kids">Kids</Link>
        <Link to="/learn/adults">Adults</Link>
        <Link to="/learn/ai">AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="vault-band">Choose your spell difficulty</label>
          <select
            id="vault-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <VaultClassroom key={variant.id} variant={variant} />
    </>
  );
}
function VaultClassroom({ variant }: { variant: VariablesVariant }) {
  const required = [
    ...variant.questions.map((q) => q.id),
    ...variant.practices.map((p) => p.taskId),
  ];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    variablesSpec.lessonId,
    variant.id,
    variablesSpec.contentVersion,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animate, setAnimate] = useState(!complete),
    [resetTick, setResetTick] = useState(0);
  const content = vaultCelebration(variant);
  useEffect(() => {
    document.title = `${variablesSpec.title} | Code Coven`;
  }, []);
  const previous =
    variant.id === "adults"
      ? "/learn/adults/python/first-program"
      : `/learn/kids/python/first-spell?band=${variant.id === "kids-junior" ? "junior" : "little"}`;
  return (
    <article className="page-width lesson-page lesson-variables">
      <header className="lesson-header">
        <span className="eyebrow">PYTHON POTIONS · LESSON 002</span>
        <h1 id="lesson-start" tabIndex={-1}>
          {variablesSpec.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your magic goals</h2>
          <ul>
            {variablesSpec.learningObjectives.map((o) => (
              <li key={o.id}>
                {variant.id === "kids-little"
                  ? [
                      "Learn how a variable gives a value a name.",
                      "Use = to give your label a value.",
                      "Name words and numbers.",
                      "Show a value with print().",
                      "Change a value.",
                      "Choose a helpful label.",
                    ][variablesSpec.learningObjectives.indexOf(o)]
                  : o.description}
              </li>
            ))}
          </ul>
          <p>
            Helpful first step:{" "}
            <Link to={previous}>Lesson 001 · Output with print()</Link>. You can
            review it any time; this vault is open to everyone.
          </p>
        </div>
      </header>
      <div className="lesson-workspace">
        <div className="lesson-reading">
          <section className="card lesson-welcome">
            <Hexi />
            <div>
              <span className="eyebrow">HEXI’S WELCOME</span>
              <p>{variant.intro}</p>
              <small>
                Try as often as you like. There is no timer, score, or penalty.
              </small>
            </div>
          </section>
          {variant.sections.map((section, i) => (
            <section className="lesson-section" key={section.title}>
              <span className="eyebrow">
                {String(i + 1).padStart(2, "0")} · EXPLORE
              </span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {section.example !== undefined && (
                <CodeExample
                  code={variablesSpec.examples[section.example].code}
                  outputNotice="Each print shows the current value on a new line. Assignment alone prints nothing."
                  output={
                    variablesSpec.examples[section.example].expectedOutput
                  }
                />
              )}
            </section>
          ))}
          <section className="lesson-section">
            <span className="eyebrow">TRY · NOTICE · LEARN</span>
            <h2>Check your understanding</h2>
            <p>
              Keep experimenting. These activities do not award XP or change the
              demo dashboard.
            </p>
            <div className="knowledge-stack">
              {variant.questions.map((q) => (
                <KnowledgeCheck
                  key={`${resetTick}-${q.id}`}
                  question={q}
                  onPass={() => markComplete(q.id)}
                />
              ))}
            </div>
          </section>
          <section className="lesson-section">
            <h2>Your variable quests</h2>
            <p>
              {variant.id === "kids-little"
                ? "Hexi: Let’s try one little box at a time. A hint is always here if you need it."
                : "Use the examples as a guide, then build your own assignments. Alternate legal names and matching quote styles are accepted within the stated subset."}
            </p>
            <div className="knowledge-stack">
              {variant.practices.map((p) => (
                <VariablePractice
                  key={`${resetTick}-${p.taskId}`}
                  task={variablesSpec.practiceTasks.find(
                    (t) => t.id === p.taskId,
                  )!}
                  title={p.title}
                  starter={p.starter}
                  little={variant.id === "kids-little"}
                  onPass={() => markComplete(p.taskId)}
                />
              ))}
            </div>
          </section>
          <aside className="lesson-note">
            <p>
              These exercises are designed for a future reviewed Potion Lab
              integration. This classroom checks written patterns only. It does
              not load or contact a Python executor. A match is task practice,
              not proof of mastery.
            </p>
          </aside>
          <p
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {complete ? `${content.title} ${content.achievement}` : ""}
          </p>
          {complete ? (
            <CompletionCelebration content={content} animate={animate} />
          ) : (
            <section className="card lesson-completion">
              <h2>A little more magic to explore</h2>
              <p>
                Complete every check and quest to open the vault. You can pause
                and return in this browser.
              </p>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">YOUR VAULT JOURNEY</span>
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
            {variant.practices.map((p) => (
              <li key={p.taskId}>
                {completed.includes(p.taskId) ? "✓" : "○"} {p.title}
              </li>
            ))}
          </ul>
          <p>
            {storageWorking
              ? "Completion is saved only in this browser, separately from Lesson 001 and every difficulty."
              : "Browser storage is unavailable. Completion lasts only while this lesson stays open."}
          </p>
          <p>
            No names, ages, answers, or code are saved. Completed activities
            stay complete until reset; this is not a mastery record.
          </p>
          <button
            className="text-link"
            type="button"
            onClick={() => {
              reset();
              setAnimate(true);
              setResetTick((n) => n + 1);
            }}
          >
            Reset this lesson’s progress
          </button>
          <p>
            <Link to={previous}>Review Lesson 001</Link>
          </p>
          <small>
            Lesson v{variablesSpec.contentVersion} · {variant.audienceLabel}
          </small>
        </aside>
      </div>
    </article>
  );
}
