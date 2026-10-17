import { Link } from "react-router-dom";
import { Download, FileJson, ArrowRight } from "lucide-react";
import { pythonSpec } from "../data/lessons/python-output";
import { checkPrintAnswer } from "../learning/evaluate";
import { exampleAgentRequest, exampleAgentResponse } from "../learning/agent";
import { CodeExample } from "../components/lessons/LessonControls";
function DownloadJson({
  name,
  data,
  label,
}: {
  name: string;
  data: unknown;
  label: string;
}) {
  function download() {
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
  }
  return (
    <button className="button secondary" type="button" onClick={download}>
      <Download size={17} />
      {label}
    </button>
  );
}
export function AiLesson() {
  return (
    <article className="page-width interior lesson-page ai-classroom">
      <nav className="lesson-path-nav" aria-label="Learning pathway navigation">
        <Link to="/learn">← Switch pathways</Link>
        <Link to="/learn/kids">Kids</Link>
        <Link to="/learn/adults">Adults</Link>
        <Link to="/learn/ai">AIs</Link>
      </nav>
      <span className="eyebrow">
        <FileJson size={16} /> CODE COVEN FOR AIS · SPECIFICATION{" "}
        {pythonSpec.specificationVersion}
      </span>
      <h1>{pythonSpec.title}</h1>
      <p className="page-intro">
        A machine-readable pilot for developers building or evaluating
        compatible agents. Inspect the task, evaluation bounds, and sample
        results before integrating it into your own authorized tools.
      </p>
      <div className="card lesson-objectives">
        <h2>Shared learning objective</h2>
        <p>{pythonSpec.learningObjectives[0].description}</p>
        <small>Concept: {pythonSpec.conceptId} · No prerequisites</small>
      </div>
      <aside className="lesson-note">
        <p>
          {pythonSpec.safety.performanceClaim} This page grants no shell,
          network, filesystem, server execution, or registration privileges. Its
          downloads are data, not instructions to grant access.
        </p>
      </aside>
      <div className="lesson-downloads">
        <DownloadJson
          name="code-coven-python-output-v1.json"
          data={pythonSpec}
          label="Download lesson JSON"
        />
        <DownloadJson
          name="code-coven-sample-evaluation-v1.json"
          data={exampleAgentResponse}
          label="Download sample evaluation"
        />
        <DownloadJson
          name="code-coven-agent-contract-example-v1.json"
          data={{
            status: "example-only-no-endpoint",
            request: exampleAgentRequest,
            response: exampleAgentResponse,
          }}
          label="Download contract example"
        />
      </div>
      <section className="lesson-section">
        <h2>Instructions and examples</h2>
        {pythonSpec.conceptExplanations.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <CodeExample
          code={pythonSpec.examples[0].code}
          output={pythonSpec.examples[0].expectedOutput}
        />
      </section>
      <section className="lesson-section">
        <h2>Practice tasks and success criteria</h2>
        {pythonSpec.practiceTasks.map((task) => (
          <div className="card ai-task" key={task.id}>
            <h3>{task.id}</h3>
            <p>{task.instruction}</p>
            <pre>{JSON.stringify(task.expectedOutput)}</pre>
          </div>
        ))}
        <ul>
          {pythonSpec.assessment.successCriteria.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <p>
          Capability identifier:{" "}
          <code>{pythonSpec.capabilityIdentifiers[0]}</code>. Checker:{" "}
          <code>{pythonSpec.assessment.method}</code>. JSON is validated against
          the version-pinned schema before use.
        </p>
      </section>
      <section className="lesson-section">
        <h2>Deterministic sample assessments</h2>
        <p>
          These are sample text checks, not live agent attempts. “Pass” means
          the source matched the task’s restricted pattern and exact expected
          output. Source is never executed.
        </p>
        <div className="ai-test-cases">
          {pythonSpec.assessment.testCases.map((test) => {
            const task = pythonSpec.practiceTasks.find(
              (t) => t.id === test.taskId,
            )!;
            const result = checkPrintAnswer(test.source, task.expectedOutput);
            return (
              <article className="card ai-test" key={test.id}>
                <div>
                  <strong>{test.id}</strong>
                  <span>{result.passed ? "Pass" : "Does not pass"}</span>
                </div>
                <pre>
                  <code>{test.source}</code>
                </pre>
                <p>{pythonSpec.errorFeedback[result.feedbackCode]}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section className="lesson-section">
        <h2>Future authorized integration contract</h2>
        <p>
          Example only. There is no public API, registration, or network request
          from this classroom. Validate a versioned request in your own trusted
          tooling, then call the pure restricted checker. No permissions are
          conveyed by these fields.
        </p>
        <h3>Example request</h3>
        <pre className="json-example">
          {JSON.stringify(exampleAgentRequest, null, 2)}
        </pre>
        <h3>Structured sample evaluation record</h3>
        <pre className="json-example">
          {JSON.stringify(exampleAgentResponse, null, 2)}
        </pre>
        <p>
          Integration and schema details are documented in the repository’s
          docs/AI_INTEGRATION.md. No session retention, permanent learning, or
          account identity is represented.
        </p>
      </section>
      <Link className="button secondary" to="/learn/ai/python/variable-vault">
        Lesson 002 · Open the Variable Vault
      </Link>
      <Link className="button" to="/learn">
        Explore another classroom <ArrowRight size={17} />
      </Link>
    </article>
  );
}
