/** A bounded text model, not Python execution. No eval, imports, calls, or tool access. */
export type VariableTaskKind = "text" | "integer" | "reassign" | "inventory";
export type VariableFeedback =
  | "empty"
  | "too-long"
  | "unsupported-syntax"
  | "invalid-name"
  | "assignment"
  | "quotes"
  | "undefined-name"
  | "print-variable"
  | "indentation"
  | "task-shape"
  | "output-mismatch"
  | "correct";
export interface VariableTask {
  id: string;
  instruction: string;
  expectedOutput: string;
  kind: VariableTaskKind;
}
export interface VariableResult {
  passed: boolean;
  feedbackCode: VariableFeedback;
  inferredOutput?: string;
  line?: number;
}
const keywords = new Set(
  "False None True and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield".split(
    " ",
  ),
);
const identifier = /^[A-Za-z_][A-Za-z0-9_]{0,39}$/;
const validName = (name: string) =>
  identifier.test(name) && !keywords.has(name) && name !== "print";
export function checkVariableAnswer(
  source: string,
  task: VariableTask,
): VariableResult {
  const fail = (
    feedbackCode: VariableFeedback,
    line?: number,
  ): VariableResult => ({
    passed: false,
    feedbackCode,
    ...(line ? { line } : {}),
  });
  if (!source.trim()) return fail("empty");
  if (source.length > 500) return fail("too-long");
  const lines = source.split(/\r?\n/);
  if (lines.length > 12) return fail("too-long");
  const values = new Map<string, string | number>();
  const assignments: { name: string; value: string | number }[] = [];
  const prints: { name: string; value: string | number }[] = [];
  for (const [index, raw] of lines.entries()) {
    if (!raw.trim()) continue;
    const line = index + 1;
    if (/^\s/.test(raw)) return fail("indentation", line);
    const text = raw.trimEnd();
    if (/^[A-Za-z_][A-Za-z0-9_]*\s*(?:==|:=)/.test(text))
      return fail("assignment", line);
    const print = /^print\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)$/.exec(text);
    if (print) {
      const name = print[1];
      if (!validName(name)) return fail("invalid-name", line);
      if (!values.has(name)) return fail("undefined-name", line);
      prints.push({ name, value: values.get(name)! });
      continue;
    }
    if (/^print\s*\(/.test(text)) return fail("print-variable", line);
    const assignment = /^([^=]+?)\s*=\s*(.*)$/.exec(text);
    if (!assignment) return fail("unsupported-syntax", line);
    const name = assignment[1].trim(),
      literal = assignment[2];
    if (!validName(name)) return fail("invalid-name", line);
    let value: string | number;
    if (/^-?(?:0|[1-9][0-9]{0,3})$/.test(literal)) value = Number(literal);
    else if (/^"[^"\\\r\n]*"$/.test(literal) || /^'[^'\\\r\n]*'$/.test(literal))
      value = literal.slice(1, -1);
    else if (/^[A-Za-z_][A-Za-z0-9_ ]*$/.test(literal))
      return fail("quotes", line);
    else return fail("unsupported-syntax", line);
    assignments.push({ name, value });
    values.set(name, value);
  }
  const inferredOutput = prints.map((p) => String(p.value) + "\n").join("");
  const text = assignments.filter((a) => typeof a.value === "string");
  const numbers = assignments.filter((a) => typeof a.value === "number");
  const shape =
    task.kind === "text"
      ? assignments.length === 1 && text.length === 1 && prints.length === 1
      : task.kind === "integer"
        ? assignments.length === 1 &&
          numbers.length === 1 &&
          prints.length === 1
        : task.kind === "inventory"
          ? assignments.length === 2 &&
            text.length === 1 &&
            numbers.length === 1 &&
            values.size === 2 &&
            prints.length === 2 &&
            prints[0].name !== prints[1].name
          : assignments.length === 2 &&
            numbers.length === 2 &&
            values.size === 1 &&
            prints.length === 2 &&
            prints[0].name === prints[1].name &&
            prints[0].value !== prints[1].value;
  if (!shape) return { ...fail("task-shape"), inferredOutput };
  if (inferredOutput !== task.expectedOutput)
    return { ...fail("output-mismatch"), inferredOutput };
  return { passed: true, feedbackCode: "correct", inferredOutput };
}
export function variableFeedback(
  code: VariableFeedback,
  little = false,
): string {
  const messages: Record<VariableFeedback, string> = {
    empty: little
      ? 'Hexi: Let’s label a box! Try familiar = "Hexi", then print(familiar) on the next line.'
      : "Start with an assignment, then print the variable on a new line.",
    "too-long":
      "Keep this small exercise to 500 characters and 12 lines or fewer.",
    "unsupported-syntax": little
      ? 'Hexi: Try one small step per line: a name = "text", a name = number, or print(name).'
      : "This checker accepts only one literal assignment or print(variable) per line: plain quoted strings and integers from -9999 to 9999. No expressions, escapes, comments, or other Python forms are supported.",
    "invalid-name": little
      ? "Hexi: Use letters or an underscore first, then letters, numbers, or underscores. No spaces! Try potion_count."
      : "Use an ASCII letter or underscore first, followed by letters, digits, or underscores (up to 40 characters here). Avoid Python keywords and the name print. Lowercase snake_case is recommended, not required.",
    assignment: little
      ? "Hexi: One = puts a value in your labeled box. Try potions = 3."
      : "Use a single = for assignment. == compares values; it does not assign them. This activity does not support :=.",
    quotes: little
      ? 'Hexi: Words need matching quotes, like "Hexi". Numbers such as 3 do not.'
      : 'Use a plain quoted string, like "Hexi", or an integer, like 3. Copying another variable is valid Python but outside this exercise’s literal-only checker.',
    "undefined-name": little
      ? "Hexi: Label your box before printing it. Check that both names match, including big and small letters."
      : "Assign this variable before printing it. Names are case-sensitive: potions and Potions are different names.",
    "print-variable": little
      ? "Hexi: Print the box’s label without quotes: print(familiar). Quotes would show the word familiar instead."
      : "Print one assigned variable: print(familiar). A quoted name prints literal text. Expressions, multiple arguments, and direct literals are outside this task.",
    indentation:
      "Start these simple statements at the left edge. This lesson does not use indented blocks.",
    "task-shape": little
      ? "Hexi: Follow this quest’s steps. Use a labeled box for each value, and print it when the quest asks."
      : "Follow this task’s required assignments and prints. Reassignment needs the same variable twice, with one print before and one after the change; each other task needs its stated value types.",
    "output-mismatch": little
      ? "Hexi: Your boxes are ready! Check the values, their order, and spelling against the expected message."
      : "The supported statements are recognized, but their inferred output differs. Check values, case, spaces, and statement order.",
    correct: little
      ? "Hexi: Your written spell matches! You gave the magic a name!"
      : "Your written assignments match the task and expected output under this restricted checker. Python was not executed.",
  };
  return messages[code];
}
