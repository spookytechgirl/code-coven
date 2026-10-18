import { useId, useState } from "react";
import type { HtmlTask } from "../../learning/html-schema";
import { checkHtml, type HtmlResult } from "../../learning/html";
export function HtmlPractice({
  task,
  little,
  onPass,
  onAssessment,
}: {
  task: HtmlTask;
  little: boolean;
  onPass: () => void;
  onAssessment: (taskId: string, source: string) => void;
}) {
  const id = useId();
  const [source, setSource] = useState(task.starter);
  const [feedback, setFeedback] = useState<HtmlResult>();
  const [hint, setHint] = useState(false);
  const initialBlocks = () =>
    [...task.starter.matchAll(/<(h1|p)>([^<>]*)<\/(h1|p)>/g)].map((m) => ({
      open: m[1],
      text: m[2],
      close: m[3],
    }));
  const [blocks, setBlocks] = useState(() => initialBlocks());
  const update = (i: number, key: "open" | "text" | "close", value: string) => {
    const next = blocks.map((b, n) => (n === i ? { ...b, [key]: value } : b));
    setBlocks(next);
    setSource(next.map((b) => `<${b.open}>${b.text}</${b.close}>`).join("\n"));
    setFeedback(undefined);
  };
  return (
    <form
      className="card lesson-practice html-practice"
      onSubmit={(e) => {
        e.preventDefault();
        const result = checkHtml(source, task);
        setFeedback(
          little
            ? {
                ...result,
                feedback: {
                  empty: "Hexi: Add your blocks, then check again.",
                  "too-long": "Hexi: Try a smaller spell with short words.",
                  unsupported:
                    "Hexi: Use only h1 or p tags and plain words for this spell.",
                  "matching-tags":
                    "Hexi: Match the tags! Close <h1> with </h1>, and <p> with </p>.",
                  structure:
                    "Hexi: Use a main heading first. If the quest asks for a message, put its paragraph next.",
                  content:
                    "Hexi: Check the words inside your blocks. Match the words in this quest.",
                  correct:
                    "Hexi: Your page blocks match. Your web spell is ready!",
                }[result.feedbackCode],
              }
            : result,
        );
        onAssessment(task.id, source);
        if (result.passed) onPass();
      }}
    >
      <h3>{task.title}</h3>
      <p>{task.instruction}</p>
      {little ? (
        <fieldset aria-describedby={`${id}-notice ${id}-feedback`}>
          <legend>Your HTML building blocks</legend>
          <div className="html-blocks">
            {blocks.map((block, i) => (
              <div className="html-block" key={i}>
                <strong>Block {i + 1}</strong>
                <label htmlFor={`${id}-open-${i}`}>
                  Opening tag · block {i + 1}
                </label>
                <select
                  id={`${id}-open-${i}`}
                  value={block.open}
                  onChange={(e) => update(i, "open", e.target.value)}
                >
                  <option value="h1">&lt;h1&gt; · main heading</option>
                  <option value="p">&lt;p&gt; · paragraph</option>
                </select>
                <label htmlFor={`${id}-text-${i}`}>Words · block {i + 1}</label>
                <input
                  id={`${id}-text-${i}`}
                  value={block.text}
                  maxLength={160}
                  onChange={(e) => update(i, "text", e.target.value)}
                />
                <label htmlFor={`${id}-close-${i}`}>
                  Closing tag · block {i + 1}
                </label>
                <select
                  id={`${id}-close-${i}`}
                  value={block.close}
                  onChange={(e) => update(i, "close", e.target.value)}
                >
                  <option value="h1">&lt;/h1&gt; · closes heading</option>
                  <option value="p">&lt;/p&gt; · closes paragraph</option>
                </select>
              </div>
            ))}
          </div>
          <p>Your blocks written as HTML:</p>
          <pre className="html-source">
            <code>{source}</code>
          </pre>
        </fieldset>
      ) : (
        <>
          <label htmlFor={`${id}-source`}>Your HTML · {task.id}</label>
          <textarea
            id={`${id}-source`}
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setFeedback(undefined);
            }}
            rows={task.kind === "document" ? 12 : 4}
            maxLength={1600}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            aria-describedby={`${id}-notice ${id}-feedback`}
          />
        </>
      )}
      <p id={`${id}-notice`} className="checker-notice">
        {little
          ? "This checks your blocks and shows your words safely. It does not open your HTML as a real page."
          : "Bounded HTML text checker and safe visual model only. Your HTML is never inserted into the academy page. Scripts and external resources do not run or load."}
      </p>
      <details>
        <summary>Supported HTML and checker limits</summary>
        <p>
          Up to 1600 source characters; 160 plain-text characters per text
          element. Use explicit paired h1/p tags with no attributes. The full
          document task requires doctype, html lang="en", head with meta
          charset="utf-8" then title, and body with h1 then p. Single/double
          attribute quotes, tag case and harmless whitespace are accepted.
          Entities, comments, links, images, styles and other
          elements/attributes are unsupported; they can be valid HTML elsewhere.
          Tab leaves the editor normally.
        </p>
      </details>
      <div className="sequence-actions">
        <button className="button" type="submit">
          Check my web spell
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
            setSource(task.starter);
            setBlocks(initialBlocks());
            setFeedback(undefined);
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
        id={`${id}-feedback`}
        className={`lesson-feedback ${feedback?.passed ? "correct" : ""}`}
        role="status"
      >
        {feedback?.feedback}
      </p>
      <section
        className="html-safe-preview"
        aria-label={`Safe visual model for ${task.title}`}
      >
        <h4>{little ? "Hexi’s page preview" : "Safe visual model"}</h4>
        <p className="checker-notice">
          {little
            ? "A safe view of your heading and message."
            : "A simplified text model of body content, not browser rendering of your HTML."}
        </p>
        {feedback?.model ? (
          <>
            {feedback.model.title && (
              <p>
                <strong>Tab title:</strong> {feedback.model.title}
              </p>
            )}
            <div className="html-preview-paper">
              <h4 className="html-preview-heading">{feedback.model.heading}</h4>
              {feedback.model.paragraph !== undefined && (
                <p>{feedback.model.paragraph}</p>
              )}
            </div>
          </>
        ) : (
          <p>Check a matching web spell to see its heading and message here.</p>
        )}
      </section>
    </form>
  );
}
