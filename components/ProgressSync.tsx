"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useSupabase } from "@/lib/supabase";
import {
  _clearLocalAfterMigration,
  _getLocalSnapshotForMigration,
  _setLocalMode,
  _setRemoteMode,
} from "@/lib/progress";

export function ProgressSync() {
  const { user, isLoaded } = useUser();
  const supabase = useSupabase();

  useEffect(() => {
    if (!isLoaded) return;
    if (!user || !supabase) {
      _setLocalMode();
      return;
    }
    let cancelled = false;
    void (async () => {
      const local = _getLocalSnapshotForMigration();

      const { data: progressRow } = await supabase
        .from("user_progress")
        .select("completed_lessons, completed_unit_tests")
        .eq("user_id", user.id)
        .maybeSingle();

      const remoteLessons = new Set<string>(
        (progressRow?.completed_lessons as string[] | null) ?? []
      );
      const remoteUnitTests = new Set<string>(
        (progressRow?.completed_unit_tests as string[] | null) ?? []
      );

      const hasLocalDelta =
        local.completedLessons.some((l) => !remoteLessons.has(l)) ||
        local.completedUnitTests.some((u) => !remoteUnitTests.has(u));

      const merged = {
        completedLessons: Array.from(
          new Set([...remoteLessons, ...local.completedLessons])
        ),
        completedUnitTests: Array.from(
          new Set([...remoteUnitTests, ...local.completedUnitTests])
        ),
      };

      if (hasLocalDelta) {
        await supabase.from("user_progress").upsert(
          {
            user_id: user.id,
            completed_lessons: merged.completedLessons,
            completed_unit_tests: merged.completedUnitTests,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
      }

      const { data: streakRow } = await supabase
        .from("user_streaks")
        .select("current_streak, longest_streak, last_completed_date")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      _setRemoteMode(user.id, supabase, {
        progress: {
          v: 1,
          completedLessons: merged.completedLessons,
          completedUnitTests: merged.completedUnitTests,
        },
        streak: {
          current: streakRow?.current_streak ?? 0,
          longest: streakRow?.longest_streak ?? 0,
          lastDate: streakRow?.last_completed_date ?? null,
        },
      });

      if (hasLocalDelta) _clearLocalAfterMigration();
    })();

    return () => {
      cancelled = true;
    };
  }, [isLoaded, user, supabase]);

  return null;
}
