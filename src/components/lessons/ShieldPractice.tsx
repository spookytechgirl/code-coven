import { useId, useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";
import type { ShieldTask } from "../../learning/shield-schema";
import { checkShield } from "../../learning/shield";
export function ShieldPractice({
  task,
  little,
  onPass,
  onAssessment,
}: {
  task: ShieldTask;
  little: boolean;
  onPass: () => void;
  onAssessment: (
    taskId: string,
    classification: string,
    actionId: string,
  ) => void;
}) {
  const id = useId();
  const [classification, setClassification] = useState("");
  const [actionId, setActionId] = useState("");
  const [hint, setHint] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof checkShield>>();
  return (
    <form
      className="card lesson-practice shield-practice"
      onSubmit={(e) => {
        e.preventDefault();
        const checked = checkShield(task, classification, actionId);
        setResult(checked);
        onAssessment(task.id, classification, actionId);
        if (checked.passed) onPass();
      }}
    >
      <h3>{task.title}</h3>
      <div className="shield-message">
        <span className="eyebrow">
          <Mail size={16} aria-hidden="true" /> FICTIONAL TRAINING MESSAGE
        </span>
        <p>
          <strong>Story sender:</strong> {task.sender}
        </p>
        <blockquote>{task.message}</blockquote>
        {task.displayAddress && (
          <p>
            <strong>Displayed address · text only:</strong>{" "}
            <code>{task.displayAddress}</code>
          </p>
        )}
        {task.attachmentLabel && (
          <p>
            <strong>Attachment description:</strong> {task.attachmentLabel}
          </p>
        )}
        <small>No link can be opened and no attachment exists here.</small>
      </div>
      <fieldset aria-describedby={`${id}-feedback`}>
        <legend>
          {little
            ? "What do the story’s clues suggest?"
            : "Classify the supplied scenario"}
        </legend>
        {[
          {
            id: "suspicious",
            text: little
              ? "Suspicious — pause and get help."
              : "Suspicious — warning signs are present.",
          },
          {
            id: "no-warning-shown",
            text: little
              ? "No warning signs are shown in this story."
              : "No immediate warning signs shown — not a safety guarantee.",
          },
        ].map((c) => (
          <label className="answer-option" key={c.id}>
            <input
              type="radio"
              name={`${id}-classification`}
              checked={classification === c.id}
              onChange={() => {
                setClassification(c.id);
                setResult(undefined);
              }}
            />
            <span>{c.text}</span>
          </label>
        ))}
      </fieldset>
      <fieldset aria-describedby={`${id}-feedback`}>
        <legend>
          {little
            ? "How can Hexi help protect the academy?"
            : "Choose the safest defensive response in this scenario"}
        </legend>
        {task.actions.map((a) => (
          <label className="answer-option" key={a.id}>
            <input
              type="radio"
              name={`${id}-action`}
              checked={actionId === a.id}
              onChange={() => {
                setActionId(a.id);
                setResult(undefined);
              }}
            />
            <span>{a.text}</span>
          </label>
        ))}
      </fieldset>
      <p className="checker-notice">
        {little
          ? "We only check your choices. No message is sent. Never type a password or private information here."
          : "Fixed fictional scenarios only. Choices are checked locally; no link is visited, account accessed, message reported or action performed. Do not provide real credentials or personal information."}
      </p>
      <div className="sequence-actions">
        <button type="submit" className="button">
          Check my shield choices <ShieldCheck size={17} aria-hidden="true" />
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
            setClassification("");
            setActionId("");
            setResult(undefined);
            setHint(false);
          }}
        >
          Reset this activity
        </button>
      </div>
      <p id={`${id}-hint`} hidden={!hint}>
        {task.hint}
      </p>
      <p
        className={`lesson-feedback ${result?.passed ? "correct" : ""}`}
        id={`${id}-feedback`}
        role="status"
      >
        {result?.feedback}
      </p>
      {result?.passed && (
        <p className="shield-explanation">
          {little
            ? "Hexi: You noticed the clues and chose a protective action. Keep asking for help whenever you need it."
            : task.explanation}
        </p>
      )}
    </form>
  );
}
