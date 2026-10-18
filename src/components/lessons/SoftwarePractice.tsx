import { useId, useState } from "react";
import type { SoftwareTask } from "../../learning/software-schema";
import { checkSoftware } from "../../learning/software";
export function SoftwarePractice({
  task,
  little,
  onPass,
  onAssessment,
}: {
  task: SoftwareTask;
  little: boolean;
  onPass: () => void;
  onAssessment: (taskId: string, answers: string[]) => void;
}) {
  const id = useId();
  const [answers, setAnswers] = useState(task.slots.map(() => ""));
  const [hint, setHint] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof checkSoftware>>();
  return (
    <form
      className="card lesson-practice software-practice"
      data-task={task.id}
      onSubmit={(e) => {
        e.preventDefault();
        const r = checkSoftware(task, answers);
        setResult(r);
        onAssessment(task.id, answers);
        if (r.passed) onPass();
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.instruction}</p>
      <p className="software-evidence">
        <strong>{little ? "Story clues:" : "Fictional evidence:"}</strong>{" "}
        {task.input}
      </p>
      <p>
        <strong>Goal:</strong> {task.goal}
      </p>
      <fieldset aria-describedby={`${id}-notice ${id}-feedback`}>
        <legend>{little ? "Your choices" : "Your project choices"}</legend>
        <div className="software-slots">
          {task.slots.map((s, i) => (
            <div key={s.label}>
              <label htmlFor={`${id}-${i}`}>{s.label}</label>
              <select
                id={`${id}-${i}`}
                value={answers[i]}
                onChange={(e) => {
                  setAnswers(
                    answers.map((x, n) => (i === n ? e.target.value : x)),
                  );
                  setResult(undefined);
                }}
              >
                <option value="">Choose…</option>
                {[...s.options].reverse().map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.text}
                  </option>
                ))}
              </select>
              <p className="sequence-preview">
                {s.options.find((o) => o.id === answers[i])?.text ??
                  "Your choice will appear here."}
              </p>
            </div>
          ))}
        </div>
      </fieldset>
      <p className="checker-notice" id={`${id}-notice`}>
        {little
          ? "We only check your choices. No app or Git tool runs here. Press Tab for a menu, arrows to choose, then Tab to leave. Keep secrets out."
          : "Fixed-choice simulation only. No app, tests or Git commands run here. Use Tab to reach a menu, arrow keys to choose, then Tab to leave. Use fictional examples only; never provide private information."}
      </p>
      <div className="sequence-actions">
        <button type="submit" className="button">
          Check my choices
        </button>
        <button
          type="button"
          className="button secondary"
          aria-expanded={hint}
          aria-controls={`${id}-hint`}
          onClick={() => setHint(!hint)}
        >
          {hint ? "Hide hint" : "Show hint"}
        </button>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setAnswers(task.slots.map(() => ""));
            setHint(false);
            setResult(undefined);
          }}
        >
          Reset this activity
        </button>
      </div>
      <p id={`${id}-hint`} hidden={!hint}>
        {task.hint}
      </p>
      <p
        role="status"
        id={`${id}-feedback`}
        className={`lesson-feedback ${result?.passed ? "correct" : ""}`}
      >
        {result?.feedback}
      </p>
      {result?.passed && (
        <p className="software-output">
          <strong>Expected response:</strong> {task.expectedOutput}
        </p>
      )}
    </form>
  );
}
