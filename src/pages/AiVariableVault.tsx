import { Link } from "react-router-dom";
import { variablesSpec } from "../data/lessons/python-variables";
import { variableAssessmentRecords } from "../learning/variables-agent";
import { CodeExample } from "../components/lessons/LessonControls";
function JsonDownload({
  name,
  data,
  children,
}: {
  name: string;
  data: unknown;
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
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        link.click();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }}
    >
      {children}
    </button>
  );
}
export function AiVariableVault() {
  return (
    <article className="page-width interior lesson-page ai-classroom">
      <nav className="lesson-path-nav" aria-label="Learning pathway navigation">
        <Link to="/learn">← Switch pathways</Link>
        <Link to="/learn/ai/python/output-fundamentals">Lesson 001</Link>
        <Link to="/learn/kids/python/variable-vault">Kids vault</Link>
        <Link to="/learn/adults/python/variable-vault">Adults vault</Link>
      </nav>
      <span className="eyebrow">
        CODE COVEN FOR AIS · LESSON 002 · SPECIFICATION{" "}
        {variablesSpec.specificationVersion}
      </span>
      <h1>{variablesSpec.title}</h1>
      <div className="card lesson-objectives">
        <h2>Explicit learning objectives</h2>
        <ul>
          {variablesSpec.learningObjectives.map((o) => (
            <li key={o.id}>{o.description}</li>
          ))}
        </ul>
        <p>
          Prerequisite reference: python-output-001. Content version:{" "}
          {variablesSpec.contentVersion}.
        </p>
      </div>
      <aside className="lesson-note">
        <p>
          {variablesSpec.safety.performanceClaim} Downloads are data only. No
          agent registration, public endpoint, remote execution, tool
          permissions, or Python executor is provided.
        </p>
      </aside>
      <div className="lesson-downloads">
        <JsonDownload
          name="code-coven-python-variables-v1.json"
          data={variablesSpec}
        >
          Download variables lesson JSON
        </JsonDownload>
        <JsonDownload
          name="code-coven-variables-assessments-v1.json"
          data={variableAssessmentRecords}
        >
          Download assessment records
        </JsonDownload>
      </div>
      <section className="lesson-section">
        <h2>Instructions and examples</h2>
        {variablesSpec.conceptExplanations.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {variablesSpec.examples.map((example) => (
          <div key={example.code}>
            <CodeExample
              code={example.code}
              output={example.expectedOutput}
              outputNotice="Each print shows the current value on a new line. Assignment alone prints nothing."
            />
            <p>{example.explanation}</p>
          </div>
        ))}
      </section>
      <section className="lesson-section">
        <h2>Practice tasks and success criteria</h2>
        {variablesSpec.practiceTasks.map((task) => (
          <div className="card ai-task" key={task.id}>
            <h3>{task.id}</h3>
            <p>{task.instruction}</p>
            <p>Required pattern: {task.kind}</p>
            <pre>{JSON.stringify(task.expectedOutput)}</pre>
          </div>
        ))}
        <ul>
          {variablesSpec.assessment.successCriteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h3>Evaluation boundaries</h3>
        <ul>
          {variablesSpec.assessment.evaluationCriteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p>
          Checker: <code>{variablesSpec.assessment.method}</code>. No source is
          executed. The versioned schema rejects unknown versions, fields,
          permissions, and task identifiers.
        </p>
      </section>
      <section className="lesson-section">
        <h2>Deterministic assessment cases</h2>
        <p>
          These are declared sample inputs and local checker results, not live
          agent attempts or retained learning records.
        </p>
        <div className="ai-test-cases">
          {variablesSpec.assessment.testCases.map((test, i) => (
            <article className="card ai-test" key={test.id}>
              <div>
                <strong>{test.id}</strong>
                <span>
                  {variableAssessmentRecords[i].passed
                    ? "Pass"
                    : "Does not pass"}
                </span>
              </div>
              <pre>
                <code>{test.source || "(empty input)"}</code>
              </pre>
              <p>
                Task: {test.taskId} · Feedback:{" "}
                {variableAssessmentRecords[i].feedbackCode}
              </p>
              <p>{variableAssessmentRecords[i].feedback}</p>
              <p>
                Expected output:{" "}
                <code>
                  {JSON.stringify(variableAssessmentRecords[i].expectedOutput)}
                </code>
              </p>
            </article>
          ))}
        </div>
      </section>
      <section className="lesson-section">
        <h2>Versioned local assessment contract</h2>
        <p>
          Use the existing architecture’s strict validation and pure local
          checker pattern. An example request is shown below; it is not an API
          endpoint or permission grant.
        </p>
        <pre className="json-example">
          {JSON.stringify(
            {
              specificationVersion: "1.0.0",
              contentVersion: "1.0.0",
              lessonId: variablesSpec.lessonId,
              taskId: "number",
              source: "potions = 3\nprint(potions)",
            },
            null,
            2,
          )}
        </pre>
        <p>
          Assessment records include task and checker versions, pass/fail,
          feedback code, expected and inferred output, and executed: false. They
          carry no personal identity or session retention.
        </p>
      </section>
      <Link className="button" to="/learn/ai">
        Return to AI Learning Path
      </Link>
    </article>
  );
}
