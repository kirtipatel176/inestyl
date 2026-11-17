/**
 * INESTYLE OUTLET — Form Recovery & State Preservation
 * 
 * Preserves user entered form data in sessionStorage / memory across network
 * failures, accidental unmounts, or retry attempts so users never lose their data.
 */

const STORAGE_PREFIX = "inestyl_draft_";

export function saveFormDraft<T = any>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const payload = {
      timestamp: Date.now(),
      data,
    };
    sessionStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(payload));
  } catch {
    // SessionStorage might be disabled or full
  }
}

export function getFormDraft<T = any>(key: string, maxAgeMs = 24 * 60 * 60 * 1000): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > maxAgeMs) {
      sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`);
      return null;
    }
    return parsed.data as T;
  } catch {
    return null;
  }
}

export function clearFormDraft(key: string): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch {
    // Safe noop
  }
}

/**
 * Creates an idempotency key to prevent duplicate form submissions
 */
export function generateIdempotencyKey(actionName: string): string {
  return `${actionName}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
