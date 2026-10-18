import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  algorithmRoutes,
  algorithmSpec,
  type AlgorithmVariant,
} from "../data/lessons/algorithm-recipe";
import { KnowledgeCheck } from "../components/lessons/LessonControls";
import { AlgorithmPractice } from "../components/lessons/AlgorithmPractice";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import { useLessonProgress } from "../learning/useLessonProgress";
import {
  assessAlgorithm,
  algorithmAssessmentRecords,
} from "../learning/algorithm";
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
export function AlgorithmLesson({
  audience,
}: {
  audience: "kids" | "adults" | "ai";
}) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = algorithmSpec.variants.find(
    (v) => v.id === (audience === "kids" ? `kids-${band}` : audience),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/courses/algorithm-alchemy">← Algorithm Alchemy</Link>
        <Link to={algorithmRoutes.kids}>Kids</Link>
        <Link to={algorithmRoutes.adults}>Adults</Link>
        <Link to={algorithmRoutes.ai}>AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="algorithm-band">Choose your spell difficulty</label>
          <select
            id="algorithm-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <AlgorithmClassroom key={variant.id} variant={variant} />
    </>
  );
}
function AlgorithmClassroom({ variant }: { variant: AlgorithmVariant }) {
  const required = [...variant.questions.map((q) => q.id), ...variant.taskIds];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    algorithmSpec.lessonId,
    variant.id,
    algorithmSpec.contentVersion,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animate, setAnimate] = useState(!complete);
  const [resetTick, setResetTick] = useState(0);
  const [records, setRecords] = useState<ReturnType<typeof assessAlgorithm>[]>(
    [],
  );
  const little = variant.id === "kids-little";
  const ai = variant.id === "ai";
  const plainGoals = [
    "Follow a clear recipe with an ending.",
    "Keep needed steps in order.",
    "Spot a group that repeats.",
    "Choose IF or ELSE from a clue.",
    "Repeat a whole group, then stop.",
    "Leave out a step our recipe does not need.",
  ];
  return (
    <article className="page-width lesson-page lesson-algorithm">
      <header className="lesson-header">
        <span className="eyebrow">ALGORITHM ALCHEMY · LESSON 001</span>
        <h1 id="lesson-start" tabIndex={-1}>
          {algorithmSpec.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your learning goals</h2>
          <ul>
            {algorithmSpec.learningObjectives.map((o, i) => (
              <li key={o.id}>{little ? plainGoals[i] : o.description}</li>
            ))}
          </ul>
          <p>
            Builds on Thinking Like a Programmer. You can still start here: no
            account, timer or completion gate. Try as often as you like.
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
            className="algorithm-ingredients"
            aria-label="Pretend potion ingredients"
          >
            <span>💧 Pretend water</span>
            <span>☾ Moon token</span>
            <span>❧ Leaf token</span>
            <span>✦ Star token</span>
          </div>
          {variant.sections.map((s, i) => (
            <section className="lesson-section" key={s.title}>
              <span className="eyebrow">0{i + 1} · EXPLORE</span>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {s.pseudocode && (
                <pre className="algorithm-pseudocode">
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
                ? "Help Hexi Brew His First Potion!"
                : "Trace, repeat, and improve"}
            </h2>
            <p>
              Build a smaller plan, follow both decision paths, and find a
              repeating group. Use the supplied menus; no typing or dragging is
              required.
            </p>
            <div className="knowledge-stack">
              {variant.taskIds.map((id) => (
                <AlgorithmPractice
                  key={`${resetTick}-${id}`}
                  task={algorithmSpec.practiceTasks.find((t) => t.id === id)!}
                  onPass={() => markComplete(id)}
                  onAssessment={(taskId, answers) =>
                    setRecords((old) => [
                      ...old.slice(-19),
                      assessAlgorithm({
                        specificationVersion: "1.0.0",
                        contentVersion: "1.0.0",
                        lessonId: algorithmSpec.lessonId,
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
                {algorithmSpec.assessment.method}. Each case supplies ordered
                choice IDs and an expected pass/fail result. Unknown fields,
                versions, permissions and task identifiers are rejected. This is
                a local workbench, not a public API or unrestricted agent
                execution.
              </p>
              <p>
                {algorithmSpec.safety.performanceClaim} No data is sent
                anywhere. Your last 20 practical checks are available for this
                open session only; they are cleared on reload or reset.
              </p>
              <div className="lesson-downloads">
                <Download
                  data={algorithmSpec}
                  name="code-coven-algorithm-recipe-v1.json"
                >
                  Download lesson JSON
                </Download>
                <Download
                  data={algorithmAssessmentRecords}
                  name="code-coven-algorithm-sample-assessments-v1.json"
                >
                  Download sample assessment records
                </Download>
                <Download
                  data={{
                    lessonId: algorithmSpec.lessonId,
                    contentVersion: algorithmSpec.contentVersion,
                    executed: false,
                    records,
                    actionsPerformed: false,
                  }}
                  name="code-coven-algorithm-session-assessments-v1.json"
                >
                  Download this session’s assessments
                </Download>
              </div>
              <h3>Declared assessment cases</h3>
              <div className="ai-test-cases">
                {algorithmSpec.assessment.testCases
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
                          algorithmSpec.practiceTasks.find(
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
              Bounded choice checks and pseudocode illustrations only. No
              student code, potion, tool or described action is executed. No
              real ingredients are needed. Completion means each supplied
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
              ? "Your first potion is shining! All six activities complete."
              : ""}
          </p>
          {complete && (
            <div
              className={`algorithm-potion-reward ${animate ? "potion-enter" : ""}`}
              role="img"
              aria-label="The Alchemist’s First Potion: a glowing pretend potion"
            >
              <span aria-hidden="true">✦ 🧪 ✦</span>
              <strong>The Alchemist’s First Potion</strong>
              <p>A little glow for your thoughtful work.</p>
            </div>
          )}
          {complete ? (
            <CompletionCelebration
              animate={animate}
              content={{
                title: "Your first potion is shining!",
                message: little
                  ? "Hexi: You chose the needed steps, followed both color paths, and found the repeating group. Your first pretend potion is glowing!"
                  : "Hexi: You traced decisions and bounded loops, preserved the goal, and removed redundant work. Keep testing both branches and checking the result.",
                achievement: "The Alchemist’s First Potion",
                reviewHref: "#lesson-start",
                reviewLabel: "Review this lesson",
                returnTo: "/courses/algorithm-alchemy",
                returnLabel: "Return to Algorithm Alchemy",
              }}
            />
          ) : (
            <section className="card lesson-completion">
              <h2>Your first potion is taking shape</h2>
              <p>
                Complete the three checks and three algorithms to celebrate with
                Hexi. Pause or retry whenever you like.
              </p>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">YOUR ALCHEMY JOURNEY</span>
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
                {algorithmSpec.practiceTasks.find((t) => t.id === id)!.title}
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
          <small>Lesson v{algorithmSpec.contentVersion}</small>
        </aside>
      </div>
    </article>
  );
}
