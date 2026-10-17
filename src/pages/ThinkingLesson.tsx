import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  thinkingRoutes,
  thinkingSpec,
  type ThinkingVariant,
} from "../data/lessons/programming-thinking";
import { KnowledgeCheck } from "../components/lessons/LessonControls";
import { SequencePractice } from "../components/lessons/SequencePractice";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import { useLessonProgress } from "../learning/useLessonProgress";
import {
  assessThinking,
  thinkingAssessmentRecords,
} from "../learning/thinking";
function Download({
  data,
  name,
  children,
}: {
  data: unknown;
  name: string;
  children: string;
}) {
  return (
    <button
      className="button secondary"
      type="button"
      onClick={() => {
        const url = URL.createObjectURL(
          new Blob([JSON.stringify(data, null, 2) + "\n"], {
            type: "application/json",
          }),
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }}
    >
      {children}
    </button>
  );
}
export function ThinkingLesson({
  audience,
}: {
  audience: "kids" | "adults" | "ai";
}) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = thinkingSpec.variants.find(
    (v) => v.id === (audience === "kids" ? `kids-${band}` : audience),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/courses/programming-foundations">
          ← Programming Fundamentals
        </Link>
        <Link to={thinkingRoutes.kids}>Kids</Link>
        <Link to={thinkingRoutes.adults}>Adults</Link>
        <Link to={thinkingRoutes.ai}>AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="thinking-band">Choose your spell difficulty</label>
          <select
            id="thinking-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <ThinkingClassroom key={variant.id} variant={variant} />
    </>
  );
}
function ThinkingClassroom({ variant }: { variant: ThinkingVariant }) {
  const required = [...variant.questions.map((q) => q.id), ...variant.taskIds];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    thinkingSpec.lessonId,
    variant.id,
    thinkingSpec.contentVersion,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animate, setAnimate] = useState(!complete);
  const [resetTick, setResetTick] = useState(0);
  const [records, setRecords] = useState<ReturnType<typeof assessThinking>[]>(
    [],
  );
  const little = variant.id === "kids-little";
  const ai = variant.id === "ai";
  const plainGoals = [
    "Learn what programming means.",
    "Give clear instructions.",
    "Notice that computers cannot guess our plans.",
    "Put steps in order.",
    "Break a big task into little steps.",
    "Find a mix-up, fix it, and check again.",
  ];
  return (
    <article className="page-width lesson-page lesson-thinking">
      <header className="lesson-header">
        <span className="eyebrow">
          YOUR FIRST SPELL · PROGRAMMING FUNDAMENTALS · LESSON 001
        </span>
        <h1 id="lesson-start" tabIndex={-1}>
          {thinkingSpec.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your learning goals</h2>
          <ul>
            {thinkingSpec.learningObjectives.map((o, i) => (
              <li key={o.id}>{little ? plainGoals[i] : o.description}</li>
            ))}
          </ul>
          <p>
            No prerequisites, coding language, account, or timer. Try as often
            as you like.
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
            </div>
          </section>
          {variant.sections.map((s, i) => (
            <section className="lesson-section" key={s.title}>
              <span className="eyebrow">0{i + 1} · EXPLORE</span>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {i === 1 && (
                <div className="card sequence-example">
                  <h3>
                    {little
                      ? "Hexi’s tiny plan"
                      : "A worked sequencing example"}
                  </h3>
                  <ol>
                    <li>Find the closed gate.</li>
                    <li>Open the gate.</li>
                    <li>Walk through the open gate.</li>
                  </ol>
                  <p>
                    Goal: reach the other side. Walking through first would fail
                    because the gate is closed. Check the fixed plan from the
                    beginning.
                  </p>
                </div>
              )}
            </section>
          ))}
          <section className="lesson-section">
            <h2>Check your understanding</h2>
            <p>
              Choose an answer, read the feedback, and try again whenever you
              want.
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
            <h2>
              {little
                ? "Guide Hexi, one step at a time"
                : "Plan, trace, and debug"}
            </h2>
            <p>
              {little
                ? "Choose a step for each place. Read your plan from top to bottom. Hexi’s hints are always here."
                : "Build each plan from the supplied steps. Then trace the order against the stated goal. The last activity starts with a bug to repair."}
            </p>
            <div className="knowledge-stack">
              {variant.taskIds.map((id) => (
                <SequencePractice
                  key={`${resetTick}-${id}`}
                  task={thinkingSpec.practiceTasks.find((t) => t.id === id)!}
                  onPass={() => markComplete(id)}
                  onAssessment={(taskId, order) =>
                    setRecords((old) => [
                      ...old.slice(-19),
                      assessThinking({
                        specificationVersion: "1.0.0",
                        contentVersion: "1.0.0",
                        lessonId: thinkingSpec.lessonId,
                        taskId,
                        order,
                      }),
                    ])
                  }
                />
              ))}
            </div>
          </section>
          {ai && (
            <section className="lesson-section">
              <h2>Versioned data and deterministic assessments</h2>
              <p>
                Specification and content v1.0.0 · checker:{" "}
                {thinkingSpec.assessment.method}. Each case supplies step IDs
                and an expected pass/fail result. Unknown fields, versions,
                permissions and task identifiers are rejected. This is a local
                workbench, not a public API or unrestricted agent execution.
              </p>
              <p>
                {thinkingSpec.safety.performanceClaim} No data is sent anywhere.
                Your last 20 practical checks are available for this open
                session only; they are cleared on reload or reset.
              </p>
              <div className="lesson-downloads">
                <Download
                  data={thinkingSpec}
                  name="code-coven-programming-thinking-v1.json"
                >
                  Download lesson JSON
                </Download>
                <Download
                  data={thinkingAssessmentRecords}
                  name="code-coven-thinking-sample-assessments-v1.json"
                >
                  Download sample assessment records
                </Download>
                <Download
                  data={{
                    lessonId: thinkingSpec.lessonId,
                    contentVersion: thinkingSpec.contentVersion,
                    executed: false,
                    records,
                  }}
                  name="code-coven-thinking-session-assessments-v1.json"
                >
                  Download this session’s assessments
                </Download>
              </div>
              <h3>Declared assessment cases</h3>
              <div className="ai-test-cases">
                {thinkingSpec.assessment.testCases
                  .filter((t) => variant.taskIds.includes(t.taskId))
                  .map((t) => (
                    <div className="card ai-test" key={t.id}>
                      <strong>{t.id}</strong>
                      <p>Input: {t.order.join(" → ")}</p>
                      <p>
                        Expected: {t.expectedPassed ? "Pass" : "Does not pass"}{" "}
                        · {t.expectedFeedbackCode}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          )}
          <aside className="lesson-note">
            <p>
              These are fixed-step learning activities, not a code execution
              environment. No Python, robot or external agent runs. Completion
              means each activity passed at least once here, not independently
              assessed mastery.
            </p>
          </aside>
          <p
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {complete
              ? "A programmer’s first plan! All six activities complete."
              : ""}
          </p>
          {complete ? (
            <CompletionCelebration
              animate={animate}
              content={{
                title: "A programmer’s first plan!",
                message: little
                  ? "Hexi: You gave me clear steps, fixed a mix-up, and checked your plan. That’s thoughtful magic!"
                  : "Hexi: You planned precise steps, broke down a task, and checked a correction. Keep asking what each step needs and what happens next.",
                achievement: "Thinking Like a Programmer — practice complete",
                reviewHref: "#lesson-start",
                reviewLabel: "Review this lesson",
                returnTo: "/courses/programming-foundations",
                returnLabel: "Return to Programming Fundamentals",
              }}
            />
          ) : (
            <section className="card lesson-completion">
              <h2>Your first plan is taking shape</h2>
              <p>
                Complete the three checks and three plans to celebrate with
                Hexi. Pause or retry whenever you like.
              </p>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">YOUR FIRST PLAN</span>
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
            {variant.taskIds.map((id) => (
              <li key={id}>
                {completed.includes(id) ? "✓" : "○"}{" "}
                {thinkingSpec.practiceTasks.find((t) => t.id === id)!.title}
              </li>
            ))}
          </ul>
          <p>
            {storageWorking
              ? "Completion is saved only in this browser, separately for every lesson and pathway."
              : "Browser storage is unavailable. Completion lasts only while this lesson stays open."}
          </p>
          <p>
            Only completion IDs and versions are saved. No answers, names, ages
            or assessment records are stored. Completed activities stay complete
            until reset.
            {ai &&
              " Browser practice completion does not represent an external AI’s retained learning."}
          </p>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              reset();
              setAnimate(true);
              setResetTick((x) => x + 1);
              setRecords([]);
            }}
          >
            Reset this lesson’s progress
          </button>
          <p>
            <Link to="/learn">Explore the Python classrooms</Link>
          </p>
          <small>Lesson v{thinkingSpec.contentVersion}</small>
        </aside>
      </div>
    </article>
  );
}
