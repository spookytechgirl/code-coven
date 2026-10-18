import * as v from "valibot";
import { htmlRequestSchema } from "./html-schema.ts";
import type { HtmlTask } from "./html-schema.ts";
import { htmlSpec } from "../data/lessons/web-html.ts";
export type HtmlFeedback =
  | "empty"
  | "too-long"
  | "unsupported"
  | "matching-tags"
  | "structure"
  | "content"
  | "correct";
export interface HtmlModel {
  heading: string;
  paragraph?: string;
  title?: string;
}
interface Node {
  tag: string;
  attribute: string;
  children: (Node | string)[];
}
export interface HtmlResult {
  passed: boolean;
  feedbackCode: HtmlFeedback;
  feedback: string;
  executed: false;
  renderedAsHtml: false;
  model?: HtmlModel;
}
const messages: Record<HtmlFeedback, string> = {
  empty:
    "Hexi: Add your heading or page blocks, then check again. You can try as often as you like.",
  "too-long":
    "This lesson accepts up to 1600 source characters and 160 plain-text characters per text element. Try a smaller example.",
  unsupported:
    "Hexi: Try only the lesson’s supported tags and plain text. Scripts, attributes on headings/paragraphs, links, images, entities and other HTML are outside this checker. Nothing was rendered as markup.",
  "matching-tags":
    "Hexi: Match each opening tag with its closing tag: <h1> with </h1>, and <p> with </p>. Close the inner element first.",
  structure:
    "Hexi: Check the page’s shape. This task needs the declared elements in order. For a full document, use doctype, html lang=en, head (UTF-8 meta then title), and body (h1 then p).",
  content:
    "Hexi: Check the words inside each element. Use the requested text, or your own nonempty plain text for the independent document.",
  correct:
    "Hexi: Your tags and page structure match this quest. A clear heading and message make a welcoming page!",
};
const normalized = (s: string) => s.replace(/\s+/gu, " ").trim();
export function checkHtml(source: unknown, task: HtmlTask): HtmlResult {
  const result = (
    feedbackCode: HtmlFeedback,
    model?: HtmlModel,
  ): HtmlResult => ({
    passed: feedbackCode === "correct",
    feedbackCode,
    feedback: messages[feedbackCode],
    executed: false,
    renderedAsHtml: false,
    ...(model ? { model } : {}),
  });
  if (typeof source !== "string") return result("unsupported");
  if (source.length > 1600) return result("too-long");
  if (!source.trim()) return result("empty");
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(source))
    return result("unsupported");
  const roots: (Node | string)[] = [];
  const stack: Node[] = [];
  let doctype = false;
  let count = 0;
  for (const token of source.match(/<[^>]*>|[^<]+|</g) ?? []) {
    if (token.startsWith("<")) {
      if (/^<!doctype\s+html\s*>$/i.test(token)) {
        if (doctype || roots.length || stack.length) return result("structure");
        doctype = true;
        continue;
      }
      const match = token.match(/^<(\/?)([a-z][a-z0-9]*)([^>]*)>$/i);
      if (!match) return result("unsupported");
      const [, closing, raw, tail] = match;
      const tag = raw.toLowerCase();
      if (!["html", "head", "meta", "title", "body", "h1", "p"].includes(tag))
        return result("unsupported");
      if (closing) {
        if (tail.trim() || tag === "meta") return result("unsupported");
        if (!stack.length || stack.at(-1)!.tag !== tag)
          return result("matching-tags");
        stack.pop();
        continue;
      }
      let attribute = "";
      if (tag === "html") {
        if (!/^\s+lang\s*=\s*(?:"en"|'en')\s*$/i.test(tail))
          return result("unsupported");
        attribute = "en";
      } else if (tag === "meta") {
        if (!/^\s+charset\s*=\s*(?:"utf-8"|'utf-8')\s*\/?\s*$/i.test(tail))
          return result("unsupported");
        attribute = "utf-8";
      } else if (tail.trim()) return result("unsupported");
      const node: Node = { tag, attribute, children: [] };
      if (++count > 16) return result("too-long");
      (stack.length ? stack.at(-1)!.children : roots).push(node);
      if (tag !== "meta") stack.push(node);
    } else {
      if (/[>&]/u.test(token)) return result("unsupported");
      if (!token.trim()) continue;
      if (!stack.length) return result("structure");
      stack.at(-1)!.children.push(token);
    }
  }
  if (stack.length) return result("matching-tags");
  const nodes = (xs: (Node | string)[]) =>
    xs.every((x) => typeof x !== "string") ? (xs as Node[]) : undefined;
  const tags = (xs: Node[] | undefined, names: string[]) =>
    !!xs &&
    xs.length === names.length &&
    xs.every((n, i) => n.tag === names[i]);
  const text = (node: Node): string | undefined =>
    node.children.every((x) => typeof x === "string")
      ? normalized(node.children.join(""))
      : undefined;
  let body = nodes(roots);
  let title: string | undefined;
  if (task.kind === "document") {
    if (!doctype || !tags(body, ["html"])) return result("structure");
    const parts = nodes(body![0].children);
    if (!tags(parts, ["head", "body"])) return result("structure");
    const head = nodes(parts![0].children);
    if (!tags(head, ["meta", "title"])) return result("structure");
    title = text(head![1]);
    body = nodes(parts![1].children);
  } else if (doctype) return result("structure");
  if (!tags(body, task.kind === "heading" ? ["h1"] : ["h1", "p"]))
    return result("structure");
  const heading = text(body![0]);
  const paragraph = task.kind === "heading" ? undefined : text(body![1]);
  const values = [
    heading,
    ...(task.kind !== "heading" ? [paragraph] : []),
    ...(task.kind === "document" ? [title] : []),
  ];
  if (values.some((x) => x === undefined)) return result("structure");
  if (values.some((x) => x!.length > 160)) return result("too-long");
  if (
    values.some((x) => !x) ||
    (task.expectedHeading && heading !== task.expectedHeading) ||
    (task.expectedParagraph && paragraph !== task.expectedParagraph) ||
    (task.expectedTitle && title !== task.expectedTitle)
  )
    return result("content");
  return result("correct", {
    heading: heading!,
    ...(paragraph !== undefined ? { paragraph } : {}),
    ...(title !== undefined ? { title } : {}),
  });
}
export function assessHtml(input: unknown) {
  const request = v.safeParse(htmlRequestSchema, input);
  if (!request.success)
    return {
      valid: false as const,
      executed: false as const,
      renderedAsHtml: false as const,
      feedback:
        "Unsupported assessment request or version. No submitted markup was rendered.",
    };
  const task = htmlSpec.practiceTasks.find(
    (t) => t.id === request.output.taskId,
  );
  if (!task)
    return {
      valid: false as const,
      executed: false as const,
      renderedAsHtml: false as const,
      feedback: "Unknown lesson task.",
    };
  return {
    valid: true as const,
    specificationVersion: htmlSpec.specificationVersion,
    contentVersion: htmlSpec.contentVersion,
    lessonId: htmlSpec.lessonId,
    taskId: task.id,
    checkerVersion: htmlSpec.assessment.method,
    ...checkHtml(request.output.source, task),
  };
}
export const htmlAssessmentRecords = htmlSpec.assessment.testCases.map((t) => ({
  caseId: t.id,
  ...assessHtml({
    specificationVersion: "1.0.0",
    contentVersion: "1.0.0",
    lessonId: htmlSpec.lessonId,
    taskId: t.taskId,
    source: t.source,
  }),
}));
