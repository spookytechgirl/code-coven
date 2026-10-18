import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  intelligenceRoutes,
  intelligenceSpec,
  type IntelligenceVariant,
} from "../data/lessons/intelligence-spark";
import { KnowledgeCheck } from "../components/lessons/LessonControls";
import { IntelligencePractice } from "../components/lessons/IntelligencePractice";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import { useLessonProgress } from "../learning/useLessonProgress";
import {
  assessIntelligence,
  intelligenceAssessmentRecords,
} from "../learning/intelligence";
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
export function IntelligenceLesson({
  audience,
}: {
  audience: "kids" | "adults" | "ai";
}) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = intelligenceSpec.variants.find(
    (v) => v.id === (audience === "kids" ? `kids-${band}` : audience),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/courses/ai-fundamentals">← AI Fundamentals</Link>
        <Link to={intelligenceRoutes.kids}>Kids</Link>
        <Link to={intelligenceRoutes.adults}>Adults</Link>
        <Link to={intelligenceRoutes.ai}>AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="intelligence-band">
            Choose your spell difficulty
          </label>
          <select
            id="intelligence-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <IntelligenceClassroom key={variant.id} variant={variant} />
    </>
  );
}
function IntelligenceClassroom({ variant }: { variant: IntelligenceVariant }) {
  const required = [...variant.questions.map((q) => q.id), ...variant.taskIds];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    intelligenceSpec.lessonId,
    variant.id,
    intelligenceSpec.contentVersion,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animate, setAnimate] = useState(!complete);
  const [resetTick, setResetTick] = useState(0);
  const [records, setRecords] = useState<
    ReturnType<typeof assessIntelligence>[]
  >([]);
  const little = variant.id === "kids-little";
  const ai = variant.id === "ai";
  const plainGoals = [
    "Learn what AI tools can do.",
    "Tell rules from learned patterns.",
    "See why examples matter.",
    "Know a confident guess can be wrong.",
    "Ask people to check important answers.",
    "Protect secrets, be fair, and check facts.",
  ];
  return (
    <article className="page-width lesson-page lesson-intelligence">
      <header className="lesson-header">
        <span className="eyebrow">AI FUNDAMENTALS · LESSON 001</span>
        <h1 id="lesson-start" tabIndex={-1}>
          {intelligenceSpec.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your learning goals</h2>
          <ul>
            {intelligenceSpec.learningObjectives.map((o, i) => (
              <li key={o.id}>{little ? plainGoals[i] : o.description}</li>
            ))}
          </ul>
          <p>
            No prior AI knowledge needed: no account, timer or completion gate.
            Try as often as you like.
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
          <div
            className="intelligence-machines"
            aria-label="Three fictional machine mechanisms"
          >
            <div>
              <span aria-hidden="true">⚙</span>
              <strong>Rule gate</strong>
              <p>A person writes the rule.</p>
            </div>
            <div>
              <span aria-hidden="true">◇</span>
              <strong>Example sorter</strong>
              <p>Patterns are fitted from examples.</p>
            </div>
            <div>
              <span aria-hidden="true">✦</span>
              <strong>Storymaker</strong>
              <p>Learned patterns create new content.</p>
            </div>
          </div>
          {variant.sections.map((s, i) => (
            <section className="lesson-section" key={s.title}>
              <span className="eyebrow">0{i + 1} · EXPLORE</span>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.pseudocode && (
                <pre className="intelligence-pseudocode">
                  <code>{s.pseudocode}</code>
                </pre>
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
                ? "Help Hexi Discover the Thinking Machines!"
                : "Compare mechanisms, inspect evidence, respond with care"}
            </h2>
            <p>
              Read the fictional evidence and use the supplied menus. No typing
              or external AI account is required.
            </p>
            <div className="knowledge-stack">
              {variant.taskIds.map((id) => (
                <IntelligencePractice
                  key={`${resetTick}-${id}`}
                  task={intelligenceSpec.practiceTasks.find(
                    (t) => t.id === id,
                  )!}
                  little={little}
                  onPass={() => markComplete(id)}
                  onAssessment={(taskId, answers) =>
                    setRecords((old) => [
                      ...old.slice(-19),
                      assessIntelligence({
                        specificationVersion: "1.0.0",
                        contentVersion: "1.0.0",
                        lessonId: intelligenceSpec.lessonId,
                        taskId,
                        answers,
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
                {intelligenceSpec.assessment.method}. Each case supplies ordered
                choice IDs and an expected pass/fail result. Unknown fields,
                versions, permissions and task identifiers are rejected. This is
                a local workbench, not a public API or unrestricted agent
                execution.
              </p>
              <p>
                {intelligenceSpec.safety.performanceClaim} No data is sent
                anywhere. Your last 20 practical checks are available for this
                open session only; they are cleared on reload or reset.
              </p>
              <div className="lesson-downloads">
                <Download
                  data={intelligenceSpec}
                  name="code-coven-intelligence-spark-v1.json"
                >
                  Download lesson JSON
                </Download>
                <Download
                  data={intelligenceAssessmentRecords}
                  name="code-coven-intelligence-sample-assessments-v1.json"
                >
                  Download sample assessment records
                </Download>
                <Download
                  data={{
                    lessonId: intelligenceSpec.lessonId,
                    contentVersion: intelligenceSpec.contentVersion,
                    executed: false,
                    records,
                    actionsPerformed: false,
                  }}
                  name="code-coven-intelligence-session-assessments-v1.json"
                >
                  Download this session’s assessments
                </Download>
              </div>
              <h3>Declared assessment cases</h3>
              <div className="ai-test-cases">
                {intelligenceSpec.assessment.testCases
                  .filter((t) => variant.taskIds.includes(t.taskId))
                  .map((t) => (
                    <div className="card ai-test" key={t.id}>
                      <strong>{t.id}</strong>
                      <p>
                        Input choices:{" "}
                        <code>{t.answers.join(" → ") || "(empty)"}</code>
                      </p>
                      <p>
                        Expected response:{" "}
                        {
                          intelligenceSpec.practiceTasks.find(
                            (task) => task.id === t.taskId,
                          )!.expectedOutput
                        }
                      </p>
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
              Bounded fictional choice checks only. No model is trained or
              called, and no commands or described actions are performed. Do not
              share real personal information. Completion means each supplied
              activity passed at least once, not independently assessed mastery.
            </p>
          </aside>
          <p
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {complete
              ? "Your first spark is shining! All six activities complete."
              : ""}
          </p>
          {complete && (
            <div
              className={`intelligence-spark-reward ${animate ? "spark-enter" : ""}`}
              role="img"
              aria-label="The Familiar’s First Spark: a glowing lavender spark"
            >
              <span aria-hidden="true">✦ ◇ ✦</span>
              <strong>The Familiar’s First Spark</strong>
              <p>A little glow for your thoughtful work.</p>
            </div>
          )}
          {complete ? (
            <CompletionCelebration
              animate={animate}
              content={{
                title: "Your first spark is shining!",
                message: little
                  ? "Hexi: You compared machines, noticed a mistaken guess, and protected private information. Curiosity and careful checking make your first spark shine!"
                  : "Hexi: You distinguished mechanisms, checked evidence and chose privacy-aware human review. Keep asking questions and verifying important claims.",
                achievement: "The Familiar’s First Spark",
                reviewHref: "#lesson-start",
                reviewLabel: "Review this lesson",
                returnTo: "/courses/ai-fundamentals",
                returnLabel: "Return to AI Fundamentals",
              }}
            />
          ) : (
            <section className="card lesson-completion">
              <h2>Your first spark is taking shape</h2>
              <p>
                Complete the three checks and three activities to celebrate with
                Hexi. Pause or retry whenever you like.
              </p>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">YOUR CURIOSITY JOURNEY</span>
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
                {intelligenceSpec.practiceTasks.find((t) => t.id === id)!.title}
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
            <Link to="/learn">Explore the learning pathways</Link>
          </p>
          <small>Lesson v{intelligenceSpec.contentVersion}</small>
        </aside>
      </div>
    </article>
  );
}
