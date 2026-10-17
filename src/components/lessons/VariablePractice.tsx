import { useId, useState } from "react";
import {
  checkVariableAnswer,
  variableFeedback,
  type VariableTask,
} from "../../learning/variables";
export function VariablePractice({
  task,
  title,
  starter,
  little,
  onPass,
}: {
  task: VariableTask;
  title: string;
  starter: string;
  little: boolean;
  onPass: () => void;
}) {
  const id = useId();
  const [source, setSource] = useState(starter),
    [hint, setHint] = useState(false),
    [feedback, setFeedback] = useState("");
  const [passed, setPassed] = useState(false);
  const hints = {
    label:
      'Give your name the quoted text "Hexi", then print the name without quotes.',
    number:
      "Use the number 3 without quotes. Print the same name you assigned.",
    change:
      "Use the SAME name for 2 and 5. Print once before changing it, and once afterward.",
    inventory:
      'Use one name for "Moon Tea" and a different name for 4. Print the text first, then the number.',
  };
  return (
    <form
      className="card lesson-practice"
      onSubmit={(e) => {
        e.preventDefault();
        const result = checkVariableAnswer(source, task);
        setPassed(result.passed);
        setFeedback(
          `${result.line ? `Line ${result.line}: ` : ""}${variableFeedback(result.feedbackCode, little)}`,
        );
        if (result.passed) onPass();
      }}
    >
      <h3>{title}</h3>
      <p>
        {little
          ? ({
              label:
                'Put "Hexi" in a labeled box. Then print the label to show its value.',
              number:
                "Put the number 3 in a labeled box. No quotes! Then print the label.",
              change:
                "Put 2 in your box and print it. Give the same label a new value of 5. Print it again.",
              inventory: task.instruction,
            }[task.id] ?? task.instruction)
          : task.instruction}
      </p>
      <div className="expected-output">
        <strong>Exact expected output in Python</strong>
        <pre>{task.expectedOutput}</pre>
        <small>
          One newline follows each printed value. Assignment alone prints
          nothing.
        </small>
      </div>
      <label htmlFor={`${id}-source`}>Your Python code · {task.id}</label>
      <textarea
        id={`${id}-source`}
        rows={6}
        maxLength={500}
        value={source}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        aria-describedby={`${id}-notice ${id}-feedback`}
        onChange={(e) => {
          setSource(e.target.value);
          setFeedback("");
          setPassed(false);
        }}
      />
      <p id={`${id}-notice`} className="checker-notice">
        This is guided text practice. It checks your written spell; it does not
        run Python. You can try again as often as you like.
      </p>
      <details className="checker-notice">
        <summary>About this checker’s limits</summary>
        <p>
          Up to 500 characters and 12 lines: literal assignments and
          print(variable), plain quoted text, integers from -9999 to 9999, and
          ASCII names up to 40 characters. Other valid Python may be
          unsupported. No imports, expressions, escapes, comments, or input
          prompts.
        </p>
      </details>
      <div className="lesson-downloads">
        <button className="button" type="submit">
          Check variable spell
        </button>
        <button
          className="button secondary"
          type="button"
          aria-expanded={hint}
          aria-controls={`${id}-hint`}
          onClick={() => setHint(!hint)}
        >
          {hint ? "Hide hint" : "Show a hint"}
        </button>
      </div>
      <p id={`${id}-hint`} hidden={!hint}>
        {hints[task.id as keyof typeof hints]}
      </p>
      <p
        id={`${id}-feedback`}
        role="status"
        className={`lesson-feedback ${passed ? "correct" : ""}`}
      >
        {feedback}
      </p>
    </form>
  );
}
