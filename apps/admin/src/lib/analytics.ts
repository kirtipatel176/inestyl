"use client";

import { AnalyticsEvent } from "@/types";

export function trackEvent(
  type: AnalyticsEvent["type"],
  targetId?: string,
  targetName?: string,
  metadata?: Record<string, any>
) {
  if (typeof window === "undefined") return;

  try {
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, targetId, targetName, metadata }),
      // Non-blocking fire and forget
      keepalive: true,
    }).catch((err) => {
      // Non-intrusive logging
      console.debug("Analytics event dispatch ignored:", err);
    });
  } catch (err) {
    // Ignore in non-fetch or blocked environments
  }
}
