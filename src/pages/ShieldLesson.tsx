import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  shieldRoutes,
  shieldSpec,
  type ShieldVariant,
} from "../data/lessons/cyber-shield";
import { KnowledgeCheck } from "../components/lessons/LessonControls";
import { ShieldPractice } from "../components/lessons/ShieldPractice";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import { useLessonProgress } from "../learning/useLessonProgress";
import { assessShield, shieldAssessmentRecords } from "../learning/shield";
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
export function ShieldLesson({
  audience,
}: {
  audience: "kids" | "adults" | "ai";
}) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = shieldSpec.variants.find(
    (v) => v.id === (audience === "kids" ? `kids-${band}` : audience),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/courses/cybersecurity-charms">← Cybersecurity Charms</Link>
        <Link to={shieldRoutes.kids}>Kids</Link>
        <Link to={shieldRoutes.adults}>Adults</Link>
        <Link to={shieldRoutes.ai}>AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="shield-band">Choose your spell difficulty</label>
          <select
            id="shield-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <ShieldClassroom key={variant.id} variant={variant} />
    </>
  );
}
function ShieldClassroom({ variant }: { variant: ShieldVariant }) {
  const required = [...variant.questions.map((q) => q.id), ...variant.taskIds];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    shieldSpec.lessonId,
    variant.id,
    shieldSpec.contentVersion,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animate, setAnimate] = useState(!complete);
  const [resetTick, setResetTick] = useState(0);
  const [records, setRecords] = useState<ReturnType<typeof assessShield>[]>([]);
  const little = variant.id === "kids-little";
  const ai = variant.id === "ai";
  const plainGoals = [
    "Learn what cybersecurity protects.",
    "Notice a suspicious message or link.",
    "Keep strong, different passwords secret.",
    "Learn about MFA: an extra kind of sign-in check.",
    "Keep private information private.",
    "Pause and ask a trusted adult for help.",
  ];
  return (
    <article className="page-width lesson-page lesson-shield">
      <header className="lesson-header">
        <span className="eyebrow">CYBERSECURITY CHARMS · LESSON 001</span>
        <h1 id="lesson-start" tabIndex={-1}>
          {shieldSpec.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your learning goals</h2>
          <ul>
            {shieldSpec.learningObjectives.map((o, i) => (
              <li key={o.id}>{little ? plainGoals[i] : o.description}</li>
            ))}
          </ul>
          <p>No prerequisites, account, or timer. Try as often as you like.</p>
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
            className="shield-storyboard"
            aria-label="The guardian’s three reminders"
          >
            <div>
              <span aria-hidden="true">①</span>
              <strong>Pause at the gate</strong>
              <p>Notice the clues before acting.</p>
            </div>
            <div>
              <span aria-hidden="true">②</span>
              <strong>Protect the keys</strong>
              <p>Passwords and codes stay private.</p>
            </div>
            <div>
              <span aria-hidden="true">③</span>
              <strong>Ask for backup</strong>
              <p>Trusted help is part of your shield.</p>
            </div>
          </div>
          {variant.sections.map((s, i) => (
            <section className="lesson-section" key={s.title}>
              <span className="eyebrow">0{i + 1} · EXPLORE</span>
              <h2>{s.title}</h2>
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
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
                ? "Help Hexi Protect the Academy!"
                : "Notice, pause, and protect"}
            </h2>
            <p>
              {little
                ? "Hexi has three gate messages to check. Notice the clues, choose a protective action, and ask for a hint whenever you like."
                : "Read each fictional scenario. Classify the clues, then select a defensive response. “No warning signs shown” describes this story only; it does not prove a sender or link is safe."}
            </p>
            <div className="knowledge-stack">
              {variant.taskIds.map((id) => (
                <ShieldPractice
                  key={`${resetTick}-${id}`}
                  task={shieldSpec.practiceTasks.find((t) => t.id === id)!}
                  little={little}
                  onPass={() => markComplete(id)}
                  onAssessment={(taskId, classification, actionId) =>
                    setRecords((old) => [
                      ...old.slice(-19),
                      assessShield({
                        specificationVersion: "1.0.0",
                        contentVersion: "1.0.0",
                        lessonId: shieldSpec.lessonId,
                        taskId,
                        classification,
                        actionId,
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
                {shieldSpec.assessment.method}. Each case supplies
                classification/action IDs and an expected pass/fail result.
                Unknown fields, versions, permissions and task identifiers are
                rejected. This is a local workbench, not a public API or
                unrestricted agent execution.
              </p>
              <p>
                {shieldSpec.safety.performanceClaim} No data is sent anywhere.
                Your last 20 practical checks are available for this open
                session only; they are cleared on reload or reset.
              </p>
              <div className="lesson-downloads">
                <Download
                  data={shieldSpec}
                  name="code-coven-cyber-shield-v1.json"
                >
                  Download lesson JSON
                </Download>
                <Download
                  data={shieldAssessmentRecords}
                  name="code-coven-shield-sample-assessments-v1.json"
                >
                  Download sample assessment records
                </Download>
                <Download
                  data={{
                    lessonId: shieldSpec.lessonId,
                    contentVersion: shieldSpec.contentVersion,
                    executed: false,
                    records,
                    actionsPerformed: false,
                  }}
                  name="code-coven-shield-session-assessments-v1.json"
                >
                  Download this session’s assessments
                </Download>
              </div>
              <h3>Declared assessment cases</h3>
              <div className="ai-test-cases">
                {shieldSpec.assessment.testCases
                  .filter((t) => variant.taskIds.includes(t.taskId))
                  .map((t) => (
                    <div className="card ai-test" key={t.id}>
                      <strong>{t.id}</strong>
                      <p>
                        Input classification: <code>{t.classification}</code> ·
                        action: <code>{t.actionId}</code>
                      </p>
                      <p>
                        Expected response:{" "}
                        {
                          shieldSpec.practiceTasks.find(
                            (task) => task.id === t.taskId,
                          )!.expectedResponse
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
              These are fictional defensive-choice activities. No scenario links
              are opened, accounts accessed, story attachments downloaded or
              reports sent. Never enter passwords, sign-in codes or personal
              information. Completion means each activity passed at least once
              here, not independently assessed mastery.
            </p>
          </aside>
          <p
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {complete
              ? "Your first shield is shining! All six activities complete."
              : ""}
          </p>
          {complete ? (
            <CompletionCelebration
              animate={animate}
              content={{
                title: "Your first shield is shining!",
                message: little
                  ? "Hexi: You paused at mystery messages, protected secrets, and knew when to ask for help. Your thoughtful choices help protect the academy!"
                  : "Hexi: You noticed warning signs, protected credentials and information, and chose safer responses. Keep verifying through trusted channels and asking for help.",
                achievement: "The Guardian’s First Shield — practice complete",
                reviewHref: "#lesson-start",
                reviewLabel: "Review this lesson",
                returnTo: "/courses/cybersecurity-charms",
                returnLabel: "Return to Cybersecurity Charms",
              }}
            />
          ) : (
            <section className="card lesson-completion">
              <h2>Your guardian shield is taking shape</h2>
              <p>
                Complete the three checks and three stories to celebrate with
                Hexi. Pause or retry whenever you like.
              </p>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">YOUR GUARDIAN JOURNEY</span>
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
                {shieldSpec.practiceTasks.find((t) => t.id === id)!.title}
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
          <small>Lesson v{shieldSpec.contentVersion}</small>
        </aside>
      </div>
    </article>
  );
}
