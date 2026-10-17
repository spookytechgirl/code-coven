import { useId, useState } from "react";
import { Copy, Check, Sparkles } from "lucide-react";
import { presentPracticeFeedback } from "../../learning/feedback";
import type {
  PracticeFeedbackCopy,
  KnowledgeQuestion,
} from "../../types/learning";
import { checkPrintAnswer } from "../../learning/evaluate";
import { pythonSpec } from "../../data/lessons/python-output";
export function CodeExample({
  code,
  output,
  copy = true,
  outputNotice = "The quote marks are not displayed. print normally adds a newline.",
}: {
  code: string;
  output?: string;
  copy?: boolean;
  outputNotice?: string;
}) {
  const [copyStatus, setCopyStatus] = useState("");
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("Code copied.");
    } catch {
      setCopyStatus("Copy unavailable. Select the code to copy it manually.");
    }
  }
  return (
    <div className="lesson-code-example">
      <div className="code-heading">
        <span>Python example</span>
        {copy && (
          <button
            type="button"
            onClick={copyCode}
            aria-label="Copy Python example"
          >
            <Copy size={15} /> Copy code
          </button>
        )}
      </div>
      <pre>
        <code>
          {code
            .split(/("[^"\n]*"|'[^'\n]*'|\bprint\b|[()])/g)
            .map((token, i) => (
              <span
                key={i}
                className={
                  token === "print"
                    ? "code-function"
                    : /^['"]/.test(token)
                      ? "code-string"
                      : ""
                }
              >
                {token}
              </span>
            ))}
        </code>
      </pre>
      <p className="copy-status" role="status">
        {copyStatus}
      </p>
      {output !== undefined && (
        <div className="expected-output">
          <strong>Expected output in Python</strong>
          <pre>{output}</pre>
          <small>{outputNotice}</small>
        </div>
      )}
    </div>
  );
}
export function KnowledgeCheck({
  question,
  onPass,
}: {
  question: KnowledgeQuestion;
  onPass: () => void;
}) {
  const id = useId();
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [correct, setCorrect] = useState(false);
  return (
    <form
      className="card knowledge-check"
      onSubmit={(e) => {
        e.preventDefault();
        const answer = question.choices.find((c) => c.id === selected);
        setFeedback(answer?.feedback ?? "Choose an answer, then check it.");
        setCorrect(answer?.correct ?? false);
        if (answer?.correct) onPass();
      }}
    >
      <fieldset aria-describedby={`${id}-feedback`}>
        <legend>{question.prompt}</legend>
        {question.choices.map((choice) => (
          <label className="answer-option" key={choice.id}>
            <input
              type="radio"
              name={id}
              value={choice.id}
              checked={selected === choice.id}
              onChange={() => {
                setSelected(choice.id);
                setFeedback("");
              }}
            />
            <span>{choice.text}</span>
          </label>
        ))}
      </fieldset>
      <button type="submit" className="button secondary">
        Check answer
      </button>
      <p
        id={`${id}-feedback`}
        className={`lesson-feedback ${correct ? "correct" : ""}`}
        role="status"
      >
        {feedback && (
          <>
            {correct ? (
              <Check size={17} aria-hidden="true" />
            ) : (
              <Sparkles size={17} aria-hidden="true" />
            )}
            <span>{feedback}</span>
          </>
        )}
      </p>
    </form>
  );
}
export function PracticeQuest({
  taskId,
  intro,
  starter,
  feedbackCopy,
  checkerNotice,
  outputNotice,
  onPass,
}: {
  taskId: string;
  intro: string;
  starter: string;
  feedbackCopy?: PracticeFeedbackCopy;
  checkerNotice?: string;
  outputNotice?: string;
  onPass: () => void;
}) {
  const id = useId();
  const task = pythonSpec.practiceTasks.find((t) => t.id === taskId)!;
  const [source, setSource] = useState(starter);
  const [feedback, setFeedback] = useState("");
  const [passed, setPassed] = useState(false);
  return (
    <form
      className="card lesson-practice"
      onSubmit={(e) => {
        e.preventDefault();
        const result = checkPrintAnswer(source, task.expectedOutput);
        setFeedback(
          feedbackCopy
            ? presentPracticeFeedback(source, result, feedbackCopy)
            : pythonSpec.errorFeedback[result.feedbackCode],
        );
        setPassed(result.passed);
        if (result.passed) onPass();
      }}
    >
      <h3>Your practice quest</h3>
      <p>{intro}</p>
      <div className="expected-output">
        <strong>Exact expected output</strong>
        <pre>{task.expectedOutput}</pre>
        <small>
          {outputNotice ??
            "Includes a final newline in Python. You type code, not the output."}
        </small>
      </div>
      <label htmlFor={`${id}-code`}>Your Python code</label>
      <textarea
        id={`${id}-code`}
        value={source}
        rows={4}
        maxLength={500}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-describedby={`${id}-notice ${id}-feedback`}
        onChange={(e) => {
          setSource(e.target.value);
          setFeedback("");
        }}
      />
      <p id={`${id}-notice`} className="checker-notice">
        {checkerNotice ??
          "Simplified text checking only. This is not a Python interpreter. We check one plain quoted print call against the expected message; no submitted code runs. Other valid Python forms may not be supported."}
      </p>
      <button className="button" type="submit">
        Check practice text <Check size={17} />
      </button>
      <p
        id={`${id}-feedback`}
        className={`lesson-feedback ${passed ? "correct" : ""}`}
        role="status"
      >
        {feedback}
      </p>
    </form>
  );
}
