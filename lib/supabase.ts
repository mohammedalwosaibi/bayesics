"use client";

import { useMemo } from "react";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export function useSupabase(): SupabaseClient | null {
  const { session, isLoaded } = useSession();

  return useMemo(() => {
    if (!isLoaded) return null;
    if (!session) return null;
    return createClient(url, publishableKey, {
      accessToken: async () => (await session.getToken()) ?? null,
    });
  }, [isLoaded, session]);
}
