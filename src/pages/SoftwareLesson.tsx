import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  softwareRoutes,
  softwareSpec,
  type SoftwareVariant,
} from "../data/lessons/software-spellbook";
import { KnowledgeCheck } from "../components/lessons/LessonControls";
import { SoftwarePractice } from "../components/lessons/SoftwarePractice";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import { useLessonProgress } from "../learning/useLessonProgress";
import {
  assessSoftware,
  softwareAssessmentRecords,
} from "../learning/software";
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
export function SoftwareLesson({
  audience,
}: {
  audience: "kids" | "adults" | "ai";
}) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = softwareSpec.variants.find(
    (v) => v.id === (audience === "kids" ? `kids-${band}` : audience),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/courses/software-sorcery">← Software Sorcery</Link>
        <Link to={softwareRoutes.kids}>Kids</Link>
        <Link to={softwareRoutes.adults}>Adults</Link>
        <Link to={softwareRoutes.ai}>AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="software-band">Choose your spell difficulty</label>
          <select
            id="software-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <SoftwareClassroom key={variant.id} variant={variant} />
    </>
  );
}
function SoftwareClassroom({ variant }: { variant: SoftwareVariant }) {
  const required = [...variant.questions.map((q) => q.id), ...variant.taskIds];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    softwareSpec.lessonId,
    variant.id,
    softwareSpec.contentVersion,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animate, setAnimate] = useState(!complete);
  const [resetTick, setResetTick] = useState(0);
  const [records, setRecords] = useState<ReturnType<typeof assessSoftware>[]>(
    [],
  );
  const little = variant.id === "kids-little";
  const ai = variant.id === "ai";
  const plainGoals = [
    "See how an app can help.",
    "Choose what our app must do.",
    "Plan, build, test, improve, then share.",
    "Give each app part a clear job.",
    "Find pretend bugs and check fixes.",
    "Keep versions and ask a teammate to review.",
  ];
  return (
    <article className="page-width lesson-page lesson-software">
      <header className="lesson-header">
        <span className="eyebrow">SOFTWARE SORCERY · LESSON 001</span>
        <h1 id="lesson-start" tabIndex={-1}>
          {softwareSpec.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your learning goals</h2>
          <ul>
            {softwareSpec.learningObjectives.map((o, i) => (
              <li key={o.id}>{little ? plainGoals[i] : o.description}</li>
            ))}
          </ul>
          <p>
            No prior software-project knowledge needed: no account, timer or
            completion gate. Try as often as you like.
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
          <ol
            className="software-workflow"
            aria-label="An iterative software project cycle"
          >
            {["Plan", "Build", "Test", "Improve", "Release"].map((step, i) => (
              <li key={step}>
                <span aria-hidden="true">{i + 1}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
          <p className="checker-notice">
            This is a pretend project workshop, not a software editor or Git
            client. Testing and improvements can repeat; later feedback starts
            another cycle.
          </p>
          {variant.sections.map((s, i) => (
            <section className="lesson-section" key={s.title}>
              <span className="eyebrow">0{i + 1} · EXPLORE</span>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.pseudocode && (
                <pre className="software-pseudocode">
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
                ? "Help Hexi Build the Great Goblin Treat Tracker!"
                : "Plan a project, organize its parts, repair a defect"}
            </h2>
            <p>
              Read the fictional project clues and use the supplied menus. No
              real code, repository or account is needed.
            </p>
            <div className="knowledge-stack">
              {variant.taskIds.map((id) => (
                <SoftwarePractice
                  key={`${resetTick}-${id}`}
                  task={softwareSpec.practiceTasks.find((t) => t.id === id)!}
                  little={little}
                  onPass={() => markComplete(id)}
                  onAssessment={(taskId, answers) =>
                    setRecords((old) => [
                      ...old.slice(-19),
                      assessSoftware({
                        specificationVersion: "1.0.0",
                        contentVersion: "1.0.0",
                        lessonId: softwareSpec.lessonId,
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
                {softwareSpec.assessment.method}. Each case supplies ordered
                choice IDs and an expected pass/fail result. Unknown fields,
                versions, permissions and task identifiers are rejected. This is
                a local workbench, not a public API or unrestricted agent
                execution.
              </p>
              <p>
                {softwareSpec.safety.performanceClaim} No data is sent anywhere.
                Your last 20 practical checks are available for this open
                session only; they are cleared on reload or reset.
              </p>
              <div className="lesson-downloads">
                <Download
                  data={softwareSpec}
                  name="code-coven-software-spellbook-v1.json"
                >
                  Download lesson JSON
                </Download>
                <Download
                  data={softwareAssessmentRecords}
                  name="code-coven-software-sample-assessments-v1.json"
                >
                  Download sample assessment records
                </Download>
                <Download
                  data={{
                    lessonId: softwareSpec.lessonId,
                    contentVersion: softwareSpec.contentVersion,
                    executed: false,
                    records,
                    actionsPerformed: false,
                  }}
                  name="code-coven-software-session-assessments-v1.json"
                >
                  Download this session’s assessments
                </Download>
              </div>
              <h3>Declared assessment cases</h3>
              <div className="ai-test-cases">
                {softwareSpec.assessment.testCases
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
                          softwareSpec.practiceTasks.find(
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
              Bounded fictional project choices only. No app, tests, Git
              commands or described actions run. Do not share real personal
              information or connect repositories. Completion means each
              supplied activity passed at least once, not independently assessed
              mastery.
            </p>
          </aside>
          <p
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {complete
              ? "The first software spell is complete! All six activities complete."
              : ""}
          </p>
          {complete && (
            <div
              className={`software-spellbook-reward ${animate ? "spellbook-enter" : ""}`}
              role="img"
              aria-label="The First Software Spell Is Complete!: a glowing completed spellbook"
            >
              <span aria-hidden="true">✦ 📖 ✦</span>
              <strong>The First Software Spell Is Complete!</strong>
              <p>
                Our imaginary application comes to life in the story workshop.
              </p>
            </div>
          )}
          {complete ? (
            <CompletionCelebration
              animate={animate}
              content={{
                title: "The first software spell is complete!",
                message: little
                  ? "Hexi: Our imaginary Treat Tracker is ready for its story celebration! You planned useful features, gave each part a job, and chose how to check a fix. Your spellbook is glowing!"
                  : "Hexi: You planned requirements, organized components and chose a repair, tests and review. The imaginary app comes to life in our story; no real software was executed or released.",
                achievement: "The First Software Spell Is Complete!",
                reviewHref: "#lesson-start",
                reviewLabel: "Review this lesson",
                returnTo: "/courses/software-sorcery",
                returnLabel: "Return to Software Sorcery",
              }}
            />
          ) : (
            <section className="card lesson-completion">
              <h2>Your software spellbook is taking shape</h2>
              <p>
                Complete the three checks and three activities to celebrate with
                Hexi. Pause or retry whenever you like.
              </p>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">YOUR WORKSHOP JOURNEY</span>
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
                {softwareSpec.practiceTasks.find((t) => t.id === id)!.title}
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
          <small>Lesson v{softwareSpec.contentVersion}</small>
        </aside>
      </div>
    </article>
  );
}
