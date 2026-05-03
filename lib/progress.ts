"use client";

import { useSyncExternalStore } from "react";
import type { ModuleId } from "./curriculum";

const STORAGE_KEY = "bayesics:progress:v1";
const CHANGE_EVENT = "bayesics:progress";

type ProgressV1 = {
  v: 1;
  completedLessons: string[];
  completedUnitTests: string[];
};

const EMPTY: ProgressV1 = { v: 1, completedLessons: [], completedUnitTests: [] };

function read(): ProgressV1 {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== 1) return EMPTY;
    return {
      v: 1,
      completedLessons: Array.isArray(parsed.completedLessons)
        ? parsed.completedLessons.filter((x: unknown) => typeof x === "string")
        : [],
      completedUnitTests: Array.isArray(parsed.completedUnitTests)
        ? parsed.completedUnitTests.filter((x: unknown) => typeof x === "string")
        : [],
    };
  } catch {
    return EMPTY;
  }
}

function write(next: ProgressV1) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function markLessonComplete(lessonId: string): void {
  if (typeof window === "undefined") return;
  const cur = read();
  if (cur.completedLessons.includes(lessonId)) return;
  write({ ...cur, completedLessons: [...cur.completedLessons, lessonId] });
}

export function markUnitTestComplete(moduleId: ModuleId): void {
  if (typeof window === "undefined") return;
  const cur = read();
  if (cur.completedUnitTests.includes(moduleId)) return;
  write({ ...cur, completedUnitTests: [...cur.completedUnitTests, moduleId] });
}

export function isLessonComplete(lessonId: string): boolean {
  return read().completedLessons.includes(lessonId);
}

export function isUnitTestComplete(moduleId: ModuleId): boolean {
  return read().completedUnitTests.includes(moduleId);
}

export type ProgressSnapshot = {
  completedLessons: ReadonlySet<string>;
  completedUnitTests: ReadonlySet<string>;
};

const SERVER_SNAPSHOT: ProgressSnapshot = {
  completedLessons: new Set<string>(),
  completedUnitTests: new Set<string>(),
};

let cachedRaw: string | null | undefined;
let cachedSnapshot: ProgressSnapshot = SERVER_SNAPSHOT;

function getSnapshot(): ProgressSnapshot {
  if (typeof window === "undefined") return SERVER_SNAPSHOT;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  const cur = read();
  cachedSnapshot = {
    completedLessons: new Set(cur.completedLessons),
    completedUnitTests: new Set(cur.completedUnitTests),
  };
  return cachedSnapshot;
}

function subscribe(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener(CHANGE_EVENT, handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener(CHANGE_EVENT, handler);
  };
}

export function useProgress(): ProgressSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, () => SERVER_SNAPSHOT);
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
