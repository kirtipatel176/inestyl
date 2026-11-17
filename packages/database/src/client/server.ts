import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { createStorefrontClient } from "./browser";

/**
 * Creates an authenticated server-side Supabase client with cookie management for Next.js App Router.
 */
export function createAdminServerClient(cookieStore: any): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://inestyle-placeholder.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return typeof cookieStore?.getAll === "function" ? cookieStore.getAll() : [];
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options: any }>) {
        try {
          if (typeof cookieStore?.set === "function") {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          }
        } catch {
          // Can happen in Server Component read pass; safe to ignore if refreshed in middleware.
        }
      },
    },
  });
}

/**
 * Creates an elevated service-role client.
 * SECURITY: Must ONLY be called in trusted server-side execution contexts.
 */
export function createServiceClient(): SupabaseClient {
  if (typeof window !== "undefined") {
    throw new Error("Security Violation: Service role client cannot be instantiated in client-side bundles.");
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://inestyle-placeholder.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceKey) {
    console.warn("SUPABASE_SERVICE_ROLE_KEY is not defined. Falling back to anon key for server client.");
    return createStorefrontClient();
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const createElevatedClient = createServiceClient;

