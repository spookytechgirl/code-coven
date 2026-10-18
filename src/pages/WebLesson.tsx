import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  htmlRoutes,
  htmlSpec,
  type HtmlVariant,
} from "../data/lessons/web-html";
import { KnowledgeCheck } from "../components/lessons/LessonControls";
import { HtmlPractice } from "../components/lessons/HtmlPractice";
import { CompletionCelebration } from "../components/lessons/CompletionCelebration";
import { Hexi } from "../components/Hexi";
import { useLessonProgress } from "../learning/useLessonProgress";
import { assessHtml, htmlAssessmentRecords } from "../learning/html";
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
export function WebLesson({
  audience,
}: {
  audience: "kids" | "adults" | "ai";
}) {
  const [params, setParams] = useSearchParams();
  const band = params.get("band") === "junior" ? "junior" : "little";
  const variant = htmlSpec.variants.find(
    (v) => v.id === (audience === "kids" ? `kids-${band}` : audience),
  )!;
  return (
    <>
      <nav
        className="page-width lesson-path-nav"
        aria-label="Learning pathway navigation"
      >
        <Link to="/courses/web-enchantment">← Web Enchantment</Link>
        <Link to={htmlRoutes.kids}>Kids</Link>
        <Link to={htmlRoutes.adults}>Adults</Link>
        <Link to={htmlRoutes.ai}>AIs</Link>
      </nav>
      {audience === "kids" && (
        <div className="page-width band-picker">
          <label htmlFor="html-band">Choose your spell difficulty</label>
          <select
            id="html-band"
            value={band}
            onChange={(e) => setParams({ band: e.target.value })}
          >
            <option value="little">Little Apprentices · ages 6–9</option>
            <option value="junior">Junior Spellcasters · ages 10–13</option>
          </select>
          <p>Both are open to everyone. We do not ask your age.</p>
        </div>
      )}
      <WebClassroom key={variant.id} variant={variant} />
    </>
  );
}
function WebClassroom({ variant }: { variant: HtmlVariant }) {
  const required = [...variant.questions.map((q) => q.id), ...variant.taskIds];
  const { completed, markComplete, reset, storageWorking } = useLessonProgress(
    htmlSpec.lessonId,
    variant.id,
    htmlSpec.contentVersion,
    required,
  );
  const complete = required.every((id) => completed.includes(id));
  const [animate, setAnimate] = useState(!complete);
  const [resetTick, setResetTick] = useState(0);
  const [records, setRecords] = useState<ReturnType<typeof assessHtml>[]>([]);
  const little = variant.id === "kids-little";
  const ai = variant.id === "ai";
  const plainGoals = [
    "Learn about websites and web pages.",
    "See how HTML gives a page its shape.",
    "Spot opening tags, closing tags and elements.",
    "Make a heading and a paragraph.",
    "Put your page blocks in order.",
    "Fix a mixed-up HTML tag.",
  ];
  return (
    <article className="page-width lesson-page lesson-web">
      <header className="lesson-header">
        <span className="eyebrow">WEB ENCHANTMENT · LESSON 001</span>
        <h1 id="lesson-start" tabIndex={-1}>
          {htmlSpec.title}
        </h1>
        <p>{variant.audienceLabel}</p>
        <div className="lesson-objectives">
          <h2>Your learning goals</h2>
          <ul>
            {htmlSpec.learningObjectives.map((o, i) => (
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
                      ? "Hexi’s page blocks"
                      : "A heading and paragraph fragment"}
                  </h3>
                  <pre className="html-source">
                    <code>
                      {"<h1>Hexi’s Garden</h1>\n<p>Welcome, apprentice!</p>"}
                    </code>
                  </pre>
                  <div className="html-element-key">
                    <span>
                      Opening tag: <code>&lt;h1&gt;</code>
                    </span>
                    <span>Content: Hexi’s Garden</span>
                    <span>
                      Closing tag: <code>&lt;/h1&gt;</code>
                    </span>
                  </div>
                  <p>
                    The complete h1 element marks the main heading. The p
                    element marks the welcome paragraph. These are body-content
                    fragments, not the whole document.
                  </p>
                </div>
              )}
              {i === 2 && !little && (
                <div className="card sequence-example">
                  <h3>A complete introductory document</h3>
                  <pre className="html-source">
                    <code>
                      {
                        htmlSpec.practiceTasks.find(
                          (t) => t.kind === "document",
                        )!.example
                      }
                    </code>
                  </pre>
                  <p>
                    The tab title belongs in head. The heading and paragraph
                    belong in body. The meta element is a void element: it does
                    not need a closing tag.
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
                ? "Build with Hexi, one block at a time"
                : "Build, inspect, and repair"}
            </h2>
            <p>
              {little
                ? "Pick your tags and words. Match the start and end of each block. Hexi’s hints are always here."
                : "Practice with real HTML text. Read the task’s goal, inspect the tag pairs, and check your result. Hints are always available; the adult document exercise lets you choose your own words."}
            </p>
            <div className="knowledge-stack">
              {variant.taskIds.map((id) => (
                <HtmlPractice
                  key={`${resetTick}-${id}`}
                  task={htmlSpec.practiceTasks.find((t) => t.id === id)!}
                  little={little}
                  onPass={() => markComplete(id)}
                  onAssessment={(taskId, source) =>
                    setRecords((old) => [
                      ...old.slice(-19),
                      assessHtml({
                        specificationVersion: "1.0.0",
                        contentVersion: "1.0.0",
                        lessonId: htmlSpec.lessonId,
                        taskId,
                        source,
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
                {htmlSpec.assessment.method}. Each case supplies HTML source and
                an expected pass/fail result. Unknown fields, versions,
                permissions and task identifiers are rejected. This is a local
                workbench, not a public API or unrestricted agent execution.
              </p>
              <p>
                {htmlSpec.safety.performanceClaim} No data is sent anywhere.
                Your last 20 practical checks are available for this open
                session only; they are cleared on reload or reset.
              </p>
              <div className="lesson-downloads">
                <Download data={htmlSpec} name="code-coven-web-html-v1.json">
                  Download lesson JSON
                </Download>
                <Download
                  data={htmlAssessmentRecords}
                  name="code-coven-html-sample-assessments-v1.json"
                >
                  Download sample assessment records
                </Download>
                <Download
                  data={{
                    lessonId: htmlSpec.lessonId,
                    contentVersion: htmlSpec.contentVersion,
                    executed: false,
                    records,
                  }}
                  name="code-coven-html-session-assessments-v1.json"
                >
                  Download this session’s assessments
                </Download>
              </div>
              <h3>Declared assessment cases</h3>
              <div className="ai-test-cases">
                {htmlSpec.assessment.testCases
                  .filter((t) => variant.taskIds.includes(t.taskId))
                  .map((t) => (
                    <div className="card ai-test" key={t.id}>
                      <strong>{t.id}</strong>
                      <pre className="html-source">
                        <code>{t.source}</code>
                      </pre>
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
              {little
                ? "Hexi: This is guided practice. Your blocks are checked and your words are shown safely. Keep exploring, and try again whenever you like!"
                : "This lesson checks a small set of HTML tags and safely displays their text. It does not open a live page or run scripts. Completion means each activity passed at least once here, not independently assessed mastery."}
            </p>
          </aside>
          <p
            className="sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {complete
              ? "Your first web spell is shining! All six activities complete."
              : ""}
          </p>
          {complete ? (
            <CompletionCelebration
              animate={animate}
              content={{
                title: "Your first web spell is shining!",
                message: little
                  ? "Hexi: You built a heading, added a message, and fixed a mixed-up tag. Your first web spell is shining!"
                  : "Hexi: You gave content a meaningful shape and checked your HTML. A heading and a welcoming paragraph are a wonderful beginning!",
                achievement: "First Web Spell — practice complete",
                reviewHref: "#lesson-start",
                reviewLabel: "Review this lesson",
                returnTo: "/courses/web-enchantment",
                returnLabel: "Return to Web Enchantment",
              }}
            />
          ) : (
            <section className="card lesson-completion">
              <h2>Your web page is taking shape</h2>
              <p>
                Complete the three checks and three web spells to celebrate with
                Hexi. Pause or retry whenever you like.
              </p>
            </section>
          )}
        </div>
        <aside className="card lesson-progress">
          <span className="eyebrow">YOUR FIRST WEB SPELL</span>
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
                {htmlSpec.practiceTasks.find((t) => t.id === id)!.title}
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
          <small>Lesson v{htmlSpec.contentVersion}</small>
        </aside>
      </div>
    </article>
  );
}
