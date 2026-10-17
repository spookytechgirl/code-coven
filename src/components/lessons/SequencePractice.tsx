import { useId, useState } from "react";
import type { ThinkingTask } from "../../learning/thinking-schema";
import { checkSequence } from "../../learning/thinking";
export function SequencePractice({
  task,
  onPass,
  onAssessment,
}: {
  task: ThinkingTask;
  onPass: () => void;
  onAssessment: (taskId: string, order: string[]) => void;
}) {
  const id = useId();
  const [order, setOrder] = useState<string[]>(
    task.initialOrder.length
      ? [...task.initialOrder]
      : task.steps.map(() => ""),
  );
  const [feedback, setFeedback] = useState("");
  const [passed, setPassed] = useState(false);
  const [hint, setHint] = useState(false);
  return (
    <form
      className="card lesson-practice sequence-practice"
      onSubmit={(e) => {
        e.preventDefault();
        const result = checkSequence(task, order);
        setFeedback(result.feedback);
        setPassed(result.passed);
        onAssessment(task.id, order);
        if (result.passed) onPass();
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.instruction}</p>
      <p>
        <strong>Goal:</strong> {task.goal}
      </p>
      <fieldset aria-describedby={`${id}-notice ${id}-feedback`}>
        <legend>Your ordered plan</legend>
        <ol className="sequence-steps">
          {order.map((value, i) => (
            <li key={i}>
              <label htmlFor={`${id}-${i}`}>Step {i + 1}</label>
              <select
                id={`${id}-${i}`}
                value={value}
                onChange={(e) => {
                  setOrder(order.map((x, n) => (n === i ? e.target.value : x)));
                  setFeedback("");
                }}
              >
                <option value="">Choose a step…</option>
                {[...task.steps].reverse().map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.text}
                  </option>
                ))}
              </select>
              <p className="sequence-preview">
                {task.steps.find((s) => s.id === value)?.text ??
                  "Your next instruction will appear here."}
              </p>
            </li>
          ))}
        </ol>
      </fieldset>
      <p id={`${id}-notice`} className="checker-notice">
        Fixed-step lesson checker only. It compares this plan’s order; it does
        not execute code or control a robot. Use Tab to reach a menu, arrow keys
        to choose, and Tab to leave. Each step is used once.
      </p>
      <div className="sequence-actions">
        <button type="submit" className="button">
          Check my plan
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
            setOrder(
              task.initialOrder.length
                ? [...task.initialOrder]
                : task.steps.map(() => ""),
            );
            setFeedback("");
            setHint(false);
          }}
        >
          Start this plan again
        </button>
      </div>
      <p id={`${id}-hint`} hidden={!hint}>
        {task.hint}
      </p>
      <p
        role="status"
        id={`${id}-feedback`}
        className={`lesson-feedback ${passed ? "correct" : ""}`}
      >
        {feedback}
      </p>
    </form>
  );
}
