"use client";

import { useSyncExternalStore } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ModuleId } from "./curriculum";

const STORAGE_KEY = "bayesics:progress:v1";
const STREAK_KEY = "bayesics:streak:v1";
const CHANGE_EVENT = "bayesics:progress";

type ProgressV1 = {
  v: 1;
  completedLessons: string[];
  completedUnitTests: string[];
};

type StreakState = {
  current: number;
  longest: number;
  lastDate: string | null;
};

const EMPTY_PROGRESS: ProgressV1 = {
  v: 1,
  completedLessons: [],
  completedUnitTests: [],
};

const EMPTY_STREAK: StreakState = {
  current: 0,
  longest: 0,
  lastDate: null,
};

function readLocal(): ProgressV1 {
  if (typeof window === "undefined") return EMPTY_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_PROGRESS;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.v !== 1) return EMPTY_PROGRESS;
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
    return EMPTY_PROGRESS;
  }
}

function writeLocal(next: ProgressV1) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function readStreakLocal(): StreakState {
  if (typeof window === "undefined") return EMPTY_STREAK;
  try {
    const raw = window.localStorage.getItem(STREAK_KEY);
    if (!raw) return EMPTY_STREAK;
    const parsed = JSON.parse(raw);
    return {
      current: typeof parsed.current === "number" ? parsed.current : 0,
      longest: typeof parsed.longest === "number" ? parsed.longest : 0,
      lastDate: typeof parsed.lastDate === "string" ? parsed.lastDate : null,
    };
  } catch {
    return EMPTY_STREAK;
  }
}

function writeStreakLocal(next: StreakState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STREAK_KEY, JSON.stringify(next));
}

function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function bumpStreak(prev: StreakState, day: string): StreakState {
  if (prev.lastDate === day) return prev;
  const yesterday = (() => {
    const d = new Date(day + "T00:00:00Z");
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().slice(0, 10);
  })();
  const next = prev.lastDate === yesterday ? prev.current + 1 : 1;
  return {
    current: next,
    longest: Math.max(prev.longest, next),
    lastDate: day,
  };
}

type Mode =
  | { kind: "local" }
  | { kind: "remote"; userId: string; supabase: SupabaseClient };

type Store = {
  progress: ProgressV1;
  streak: StreakState;
  mode: Mode;
};

let store: Store = {
  progress: EMPTY_PROGRESS,
  streak: EMPTY_STREAK,
  mode: { kind: "local" },
};

let bootstrapped = false;

function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function ensureBootstrapped() {
  if (bootstrapped || typeof window === "undefined") return;
  store = {
    progress: readLocal(),
    streak: readStreakLocal(),
    mode: { kind: "local" },
  };
  bootstrapped = true;
}

export function markLessonComplete(lessonId: string): void {
  if (typeof window === "undefined") return;
  ensureBootstrapped();
  const prev = store.progress;
  const isNew = !prev.completedLessons.includes(lessonId);
  const nextProgress: ProgressV1 = isNew
    ? { ...prev, completedLessons: [...prev.completedLessons, lessonId] }
    : prev;

  const day = todayUtc();
  const nextStreak = isNew ? bumpStreak(store.streak, day) : store.streak;

  if (!isNew) return;

  store = { ...store, progress: nextProgress, streak: nextStreak };

  if (store.mode.kind === "local") {
    writeLocal(nextProgress);
    writeStreakLocal(nextStreak);
  } else {
    void persistRemoteLessonAndStreak(store.mode, lessonId);
  }
  notify();
}

export function markUnitTestComplete(moduleId: ModuleId): void {
  if (typeof window === "undefined") return;
  ensureBootstrapped();
  const prev = store.progress;
  if (prev.completedUnitTests.includes(moduleId)) return;
  const nextProgress: ProgressV1 = {
    ...prev,
    completedUnitTests: [...prev.completedUnitTests, moduleId],
  };
  store = { ...store, progress: nextProgress };

  if (store.mode.kind === "local") {
    writeLocal(nextProgress);
  } else {
    void persistRemoteUnitTest(store.mode, moduleId);
  }
  notify();
}

async function persistRemoteLessonAndStreak(
  mode: Extract<Mode, { kind: "remote" }>,
  lessonId: string
) {
  const { supabase, userId } = mode;
  await supabase.rpc("touch_streak").then(({ data }) => {
    if (data) {
      const next: StreakState = {
        current: data.current_streak ?? 0,
        longest: data.longest_streak ?? 0,
        lastDate: data.last_completed_date ?? null,
      };
      store = { ...store, streak: next };
      notify();
    }
  });
  await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        completed_lessons: store.progress.completedLessons,
        completed_unit_tests: store.progress.completedUnitTests,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  void lessonId;
}

async function persistRemoteUnitTest(
  mode: Extract<Mode, { kind: "remote" }>,
  moduleId: ModuleId
) {
  const { supabase, userId } = mode;
  await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        completed_lessons: store.progress.completedLessons,
        completed_unit_tests: store.progress.completedUnitTests,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
  void moduleId;
}

export function isLessonComplete(lessonId: string): boolean {
  ensureBootstrapped();
  return store.progress.completedLessons.includes(lessonId);
}

export function isUnitTestComplete(moduleId: ModuleId): boolean {
  ensureBootstrapped();
  return store.progress.completedUnitTests.includes(moduleId);
}

export type ProgressSnapshot = {
  completedLessons: ReadonlySet<string>;
  completedUnitTests: ReadonlySet<string>;
};

const SERVER_PROGRESS: ProgressSnapshot = {
  completedLessons: new Set<string>(),
  completedUnitTests: new Set<string>(),
};

let cachedProgressSnapshot: ProgressSnapshot = SERVER_PROGRESS;
let cachedProgressKey = "";

function getProgressSnapshot(): ProgressSnapshot {
  if (typeof window === "undefined") return SERVER_PROGRESS;
  ensureBootstrapped();
  const key =
    store.progress.completedLessons.join(",") +
    "|" +
    store.progress.completedUnitTests.join(",");
  if (key === cachedProgressKey) return cachedProgressSnapshot;
  cachedProgressKey = key;
  cachedProgressSnapshot = {
    completedLessons: new Set(store.progress.completedLessons),
    completedUnitTests: new Set(store.progress.completedUnitTests),
  };
  return cachedProgressSnapshot;
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
  return useSyncExternalStore(
    subscribe,
    getProgressSnapshot,
    () => SERVER_PROGRESS
  );
}

const SERVER_STREAK: StreakState = EMPTY_STREAK;
let cachedStreak: StreakState = SERVER_STREAK;
let cachedStreakKey = "";

function getStreakSnapshot(): StreakState {
  if (typeof window === "undefined") return SERVER_STREAK;
  ensureBootstrapped();
  const key = `${store.streak.current}|${store.streak.longest}|${store.streak.lastDate}`;
  if (key === cachedStreakKey) return cachedStreak;
  cachedStreakKey = key;
  cachedStreak = { ...store.streak };
  return cachedStreak;
}

export function useStreak(): StreakState {
  return useSyncExternalStore(subscribe, getStreakSnapshot, () => SERVER_STREAK);
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  ensureBootstrapped();
  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(STREAK_KEY);
  store = { ...store, progress: EMPTY_PROGRESS, streak: EMPTY_STREAK };
  notify();
}

// --- Internal: ProgressSync uses these to switch the store between local and remote modes.

export function _setRemoteMode(
  userId: string,
  supabase: SupabaseClient,
  remote: { progress: ProgressV1; streak: StreakState }
) {
  store = {
    progress: remote.progress,
    streak: remote.streak,
    mode: { kind: "remote", userId, supabase },
  };
  notify();
}

export function _setLocalMode() {
  if (typeof window === "undefined") return;
  store = {
    progress: readLocal(),
    streak: readStreakLocal(),
    mode: { kind: "local" },
  };
  notify();
}

export function _getLocalSnapshotForMigration(): ProgressV1 {
  return readLocal();
}

export function _clearLocalAfterMigration() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.localStorage.removeItem(STREAK_KEY);
}
