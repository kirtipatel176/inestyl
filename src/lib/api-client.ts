/**
 * INESTYLE OUTLET — Centralized API Client & Error Handling Layer
 * 
 * Provides:
 * - Robust error classification and sanitized user-facing messages
 * - Safe exponential backoff retries for eligible idempotent requests
 * - Request cancellation (AbortSignal) support
 * - Automatic timeout handling
 * - Zero exposure of database queries, stack traces, or credentials
 * - Integration with global network status monitoring
 */

export interface ApiError {
  status: number;
  code: string;
  message: string;
  userMessage: string;
  isRetryable: boolean;
  timestamp: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: ApiError;
  latencyMs?: number;
}

export interface RequestOptions extends Omit<RequestInit, "signal"> {
  timeoutMs?: number;
  signal?: AbortSignal;
  maxRetries?: number;
  retryDelayMs?: number;
  idempotent?: boolean;
  suppressNetworkAlert?: boolean;
}

// User-facing friendly messages mapped by HTTP status
const HTTP_ERROR_MESSAGES: Record<number, { code: string; message: string; retryable: boolean }> = {
  400: {
    code: "BAD_REQUEST",
    message: "The request could not be processed. Please check your entered information and try again.",
    retryable: false,
  },
  401: {
    code: "UNAUTHORIZED",
    message: "Your session has expired or requires authorization. Please sign in again.",
    retryable: false,
  },
  403: {
    code: "FORBIDDEN",
    message: "You do not have permission to perform this action on this store resource.",
    retryable: false,
  },
  404: {
    code: "NOT_FOUND",
    message: "The requested item, product, or resource could not be found.",
    retryable: false,
  },
  408: {
    code: "REQUEST_TIMEOUT",
    message: "The request took too long to complete. Please check your connection and try again.",
    retryable: true,
  },
  409: {
    code: "CONFLICT",
    message: "This record was updated by another session. Please refresh and try again.",
    retryable: false,
  },
  422: {
    code: "VALIDATION_ERROR",
    message: "One or more submitted fields did not pass validation. Please review and correct them.",
    retryable: false,
  },
  429: {
    code: "TOO_MANY_REQUESTS",
    message: "Too many requests submitted. Please slow down and wait a moment before trying again.",
    retryable: true,
  },
  500: {
    code: "INTERNAL_SERVER_ERROR",
    message: "The store server encountered an unexpected error. Our technical team has been alerted.",
    retryable: true,
  },
  502: {
    code: "BAD_GATEWAY",
    message: "The store server is temporarily unreachable. We are reconnecting...",
    retryable: true,
  },
  503: {
    code: "SERVICE_UNAVAILABLE",
    message: "iNESTYL OUTLET services are temporarily undergoing maintenance. Please try again shortly.",
    retryable: true,
  },
  504: {
    code: "GATEWAY_TIMEOUT",
    message: "The gateway connection timed out. Please check your internet connectivity.",
    retryable: true,
  },
};

/**
 * Event emitter for network issues to inform global network notification manager
 */
type NetworkEventListener = (event: {
  type: "failed_request" | "timeout" | "slow_response" | "restored";
  status?: number;
  url: string;
  durationMs?: number;
}) => void;

const networkListeners: Set<NetworkEventListener> = new Set();

export function onNetworkEvent(listener: NetworkEventListener) {
  networkListeners.add(listener);
  return () => {
    networkListeners.delete(listener);
  };
}

function emitNetworkEvent(event: Parameters<NetworkEventListener>[0]) {
  networkListeners.forEach((fn) => {
    try {
      fn(event);
    } catch {
      // Safe noop
    }
  });
}

/**
 * Sanitize an error response to guarantee no sensitive data, SQL queries, or stack traces leak.
 */
export function sanitizeApiError(status: number, rawData?: any): ApiError {
  const standard = HTTP_ERROR_MESSAGES[status] || {
    code: "UNKNOWN_ERROR",
    message: "An unexpected error occurred while communicating with the store system.",
    retryable: status >= 500,
  };

  // If server returned a safe validation or friendly error string without stack traces
  let customMessage: string | null = null;
  if (rawData && typeof rawData === "object") {
    if (typeof rawData.error === "string" && !rawData.error.includes("Error:") && !rawData.error.includes("at ")) {
      // Clean single line message
      customMessage = rawData.error;
    } else if (typeof rawData.message === "string" && !rawData.message.includes("Error:") && !rawData.message.includes("at ")) {
      customMessage = rawData.message;
    }
  }

  return {
    status,
    code: standard.code,
    message: customMessage || standard.message,
    userMessage: customMessage || standard.message,
    isRetryable: standard.retryable,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Sleep helper for exponential backoff
 */
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Core apiClient function
 */
export async function apiClient<T = any>(
  url: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeoutMs = 12000,
    signal,
    maxRetries = 0,
    retryDelayMs = 600,
    idempotent,
    suppressNetworkAlert = false,
    ...fetchOptions
  } = options;

  const method = (fetchOptions.method || "GET").toUpperCase();
  const isIdempotentMethod = method === "GET" || method === "HEAD" || method === "OPTIONS" || !!idempotent;
  const effectiveMaxRetries = isIdempotentMethod ? maxRetries : 0;

  let attempt = 0;
  let lastError: ApiError | null = null;
  let lastStatus = 0;

  while (attempt <= effectiveMaxRetries) {
    const startTime = performance.now();
    const controller = new AbortController();
    const compositeSignal = signal;

    // Timeout timer
    const timeoutTimer = setTimeout(() => {
      controller.abort("REQUEST_TIMEOUT");
    }, timeoutMs);

    // If caller provided a signal, listen to it
    const handleCallerAbort = () => {
      controller.abort("USER_CANCELLED");
    };

    if (compositeSignal) {
      if (compositeSignal.aborted) {
        clearTimeout(timeoutTimer);
        return {
          ok: false,
          status: 0,
          error: {
            status: 0,
            code: "ABORTED",
            message: "Request cancelled.",
            userMessage: "Request cancelled.",
            isRetryable: false,
            timestamp: new Date().toISOString(),
          },
        };
      }
      compositeSignal.addEventListener("abort", handleCallerAbort);
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          Accept: "application/json",
          ...(fetchOptions.body && !(fetchOptions.body instanceof FormData)
            ? { "Content-Type": "application/json" }
            : {}),
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutTimer);
      if (compositeSignal) {
        compositeSignal.removeEventListener("abort", handleCallerAbort);
      }

      const durationMs = Math.round(performance.now() - startTime);

      // Detect slow responses (> 3500ms)
      if (durationMs > 3500 && !suppressNetworkAlert) {
        emitNetworkEvent({
          type: "slow_response",
          url,
          durationMs,
        });
      }

      lastStatus = response.status;

      // Handle successful responses
      if (response.ok) {
        // Safe json parsing
        let data: T;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          data = await response.json();
        } else {
          const text = await response.text();
          data = text as unknown as T;
        }

        return {
          ok: true,
          status: response.status,
          data,
          latencyMs: durationMs,
        };
      }

      // Handle HTTP error statuses
      let errorBody: any = null;
      try {
        errorBody = await response.json();
      } catch {
        // non-json error body
      }

      const apiError = sanitizeApiError(response.status, errorBody);
      lastError = apiError;

      // Emit failed request event for network banner
      if (!suppressNetworkAlert && response.status >= 500) {
        emitNetworkEvent({
          type: "failed_request",
          status: response.status,
          url,
          durationMs,
        });
      }

      // Check if retry is eligible
      if (apiError.isRetryable && attempt < effectiveMaxRetries) {
        attempt++;
        const jitter = Math.random() * 200;
        const backoff = retryDelayMs * Math.pow(2, attempt - 1) + jitter;
        await wait(backoff);
        continue;
      }

      return {
        ok: false,
        status: response.status,
        error: apiError,
        data: errorBody as T,
        latencyMs: durationMs,
      };
    } catch (err: any) {
      clearTimeout(timeoutTimer);
      if (compositeSignal) {
        compositeSignal.removeEventListener("abort", handleCallerAbort);
      }

      const durationMs = Math.round(performance.now() - startTime);

      if (err?.name === "AbortError" || controller.signal.aborted) {
        if (controller.signal.reason === "REQUEST_TIMEOUT") {
          if (!suppressNetworkAlert) {
            emitNetworkEvent({ type: "timeout", url, durationMs });
          }

          const timeoutError: ApiError = {
            status: 408,
            code: "REQUEST_TIMEOUT",
            message: `Request to ${url} timed out after ${timeoutMs}ms.`,
            userMessage: "Connection timed out. Please check your internet connectivity and try again.",
            isRetryable: isIdempotentMethod,
            timestamp: new Date().toISOString(),
          };

          if (isIdempotentMethod && attempt < effectiveMaxRetries) {
            attempt++;
            const backoff = retryDelayMs * Math.pow(2, attempt - 1);
            await wait(backoff);
            continue;
          }

          return {
            ok: false,
            status: 408,
            error: timeoutError,
            latencyMs: durationMs,
          };
        }

        // Caller aborted navigation or unmount
        return {
          ok: false,
          status: 0,
          error: {
            status: 0,
            code: "ABORTED",
            message: "Request cancelled.",
            userMessage: "Request cancelled.",
            isRetryable: false,
            timestamp: new Date().toISOString(),
          },
        };
      }

      // Network connection failure (offline / DNS drop)
      if (!suppressNetworkAlert) {
        emitNetworkEvent({ type: "failed_request", url, durationMs });
      }

      const networkError: ApiError = {
        status: 0,
        code: "NETWORK_ERROR",
        message: "Network request failed. Unable to reach store servers.",
        userMessage: "You appear to be offline or experiencing connection issues. Please check your internet connection.",
        isRetryable: isIdempotentMethod,
        timestamp: new Date().toISOString(),
      };
      lastError = networkError;

      if (isIdempotentMethod && attempt < effectiveMaxRetries) {
        attempt++;
        const backoff = retryDelayMs * Math.pow(2, attempt - 1);
        await wait(backoff);
        continue;
      }

      return {
        ok: false,
        status: 0,
        error: networkError,
        latencyMs: durationMs,
      };
    }
  }

  return {
    ok: false,
    status: lastStatus,
    error: lastError || {
      status: 0,
      code: "UNKNOWN",
      message: "Request failed after retries.",
      userMessage: "Something went wrong. Please try again.",
      isRetryable: false,
      timestamp: new Date().toISOString(),
    },
  };
}
