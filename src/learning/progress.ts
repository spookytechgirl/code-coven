export interface LocalProgress {
  version: 1;
  lessonVersion: string;
  completed: string[];
}
export interface ProgressStore {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}
export const progressKey = (lessonId: string, variantId: string) =>
  `code-coven:lesson:${lessonId}:${variantId}:v1`;
export function readProgress(
  store: ProgressStore | undefined,
  lessonId: string,
  variantId: string,
  lessonVersion: string,
  allowedIds: string[],
): LocalProgress {
  const empty: LocalProgress = { version: 1, lessonVersion, completed: [] };
  try {
    const raw = store?.getItem(progressKey(lessonId, variantId));
    if (!raw) return empty;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return empty;
    const data = parsed as Record<string, unknown>;
    if (
      data.version !== 1 ||
      data.lessonVersion !== lessonVersion ||
      !Array.isArray(data.completed)
    )
      return empty;
    return {
      ...empty,
      completed: [
        ...new Set(
          data.completed.filter(
            (x): x is string => typeof x === "string" && allowedIds.includes(x),
          ),
        ),
      ],
    };
  } catch {
    return empty;
  }
}
export function saveProgress(
  store: ProgressStore | undefined,
  lessonId: string,
  variantId: string,
  progress: LocalProgress,
): boolean {
  try {
    if (!store) return false;
    store.setItem(progressKey(lessonId, variantId), JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}
export function removeProgress(
  store: ProgressStore | undefined,
  lessonId: string,
  variantId: string,
): boolean {
  try {
    if (!store) return false;
    store.removeItem(progressKey(lessonId, variantId));
    return true;
  } catch {
    return false;
  }
}
