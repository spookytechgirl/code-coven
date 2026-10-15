import { useState } from "react";
import { readProgress, saveProgress, removeProgress } from "./progress";
function browserStore() {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}
export function useLessonProgress(
  lessonId: string,
  variantId: string,
  lessonVersion: string,
  allowedIds: string[],
) {
  const [progress, setProgress] = useState(() =>
    readProgress(
      browserStore(),
      lessonId,
      variantId,
      lessonVersion,
      allowedIds,
    ),
  );
  const [storageWorking, setStorageWorking] = useState(
    () => browserStore() !== undefined,
  );
  const markComplete = (id: string) => {
    if (!allowedIds.includes(id)) return;
    const next = {
      ...progress,
      completed: [...new Set([...progress.completed, id])],
    };
    setProgress(next);
    setStorageWorking(saveProgress(browserStore(), lessonId, variantId, next));
  };
  const reset = () => {
    setStorageWorking(removeProgress(browserStore(), lessonId, variantId));
    setProgress({ version: 1, lessonVersion, completed: [] });
  };
  return { completed: progress.completed, markComplete, reset, storageWorking };
}
