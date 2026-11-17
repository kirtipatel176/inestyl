"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, RefreshCw, AlertTriangle, CheckCircle2, X } from "lucide-react";
import { onNetworkEvent } from "@/lib/api-client";

type NotificationType = "offline" | "reconnected" | "temporary_error" | "slow";

interface NetworkStatusContextType {
  isOnline: boolean;
  isServerReachable: boolean;
  isChecking: boolean;
  checkConnectivity: () => Promise<boolean>;
}

const NetworkStatusContext = createContext<NetworkStatusContextType>({
  isOnline: true,
  isServerReachable: true,
  isChecking: false,
  checkConnectivity: async () => true,
});

export function useNetworkStatus() {
  return useContext(NetworkStatusContext);
}

export function NetworkStatusProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isServerReachable, setIsServerReachable] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  // Active notification state
  const [activeNotification, setActiveNotification] = useState<{
    type: NotificationType;
    message: string;
    id: string;
  } | null>(null);

  // Track the last notified type to prevent duplicate notifications for same issue
  const lastNotificationTypeRef = useRef<NotificationType | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback((type: NotificationType, message: string, autoDismissMs = 0) => {
    // Avoid repeated notifications for same issue
    if (lastNotificationTypeRef.current === type && activeNotification?.type === type) {
      return;
    }

    lastNotificationTypeRef.current = type;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    setActiveNotification({
      type,
      message,
      id: `${type}_${Date.now()}`,
    });

    if (autoDismissMs > 0) {
      hideTimerRef.current = setTimeout(() => {
        setActiveNotification(null);
        if (lastNotificationTypeRef.current === type) {
          lastNotificationTypeRef.current = null;
        }
      }, autoDismissMs);
    }
  }, [activeNotification?.type]);

  const dismissNotification = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setActiveNotification(null);
  }, []);

  /**
   * Verify actual API connectivity through an active request to /api/health
   */
  const checkConnectivity = useCallback(async (): Promise<boolean> => {
    if (typeof window === "undefined") return true;

    // Fast-fail if browser itself is offline
    if (!navigator.onLine) {
      setIsOnline(false);
      setIsServerReachable(false);
      showNotification("offline", "You're currently offline. Check your internet connection.");
      return false;
    }

    setIsChecking(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      const res = await fetch("/api/health", {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (res.ok) {
        const wasDisconnected = !isOnline || !isServerReachable;
        setIsOnline(true);
        setIsServerReachable(true);

        if (wasDisconnected) {
          showNotification("reconnected", "Connection restored.", 4000);
        } else if (activeNotification?.type === "offline" || activeNotification?.type === "temporary_error") {
          dismissNotification();
        }
        setIsChecking(false);
        return true;
      } else {
        setIsServerReachable(false);
        showNotification("temporary_error", "Something went wrong. Please try again.");
        setIsChecking(false);
        return false;
      }
    } catch {
      setIsServerReachable(false);
      if (!navigator.onLine) {
        setIsOnline(false);
        showNotification("offline", "You're currently offline. Check your internet connection.");
      } else {
        showNotification("temporary_error", "Something went wrong. Please try again.");
      }
      setIsChecking(false);
      return false;
    }
  }, [isOnline, isServerReachable, showNotification, dismissNotification, activeNotification?.type]);

  // Initial mount & browser event listeners
  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnline(navigator.onLine);

    const handleOffline = () => {
      setIsOnline(false);
      setIsServerReachable(false);
      showNotification("offline", "You're currently offline. Check your internet connection.");
    };

    const handleOnline = () => {
      setIsOnline(true);
      // Immediately verify whether backend is truly reachable
      checkConnectivity();
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    // Listen to events from centralized apiClient
    const unsubscribeApiEvents = onNetworkEvent((event) => {
      if (event.type === "failed_request") {
        if (!navigator.onLine) {
          handleOffline();
        } else {
          showNotification("temporary_error", "Something went wrong. Please try again.");
        }
      } else if (event.type === "timeout") {
        showNotification("temporary_error", "Something went wrong. Please try again.");
      } else if (event.type === "slow_response") {
        // Only show if not already showing offline or error
        if (!activeNotification) {
          showNotification("slow", "Slow connection detected. Loading may take longer.", 4000);
        }
      }
    });

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
      unsubscribeApiEvents();
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [checkConnectivity, showNotification, activeNotification]);

  return (
    <NetworkStatusContext.Provider
      value={{
        isOnline,
        isServerReachable,
        isChecking,
        checkConnectivity,
      }}
    >
      {children}

      {/* Minimal Top Notification Banner */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div
            key={activeNotification.id}
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="status"
            aria-live="polite"
            className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[calc(100%-2rem)] pointer-events-auto"
          >
            <div
              className={`px-4 py-2.5 rounded-full shadow-lg border backdrop-blur-md flex items-center justify-between gap-3 text-xs font-medium transition-colors ${
                activeNotification.type === "offline"
                  ? "bg-[#1D1D1F]/95 text-white border-neutral-700"
                  : activeNotification.type === "reconnected"
                  ? "bg-emerald-900/95 text-emerald-50 border-emerald-700"
                  : activeNotification.type === "slow"
                  ? "bg-amber-900/95 text-amber-50 border-amber-700"
                  : "bg-rose-900/95 text-rose-50 border-rose-700"
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {activeNotification.type === "offline" ? (
                  <WifiOff className="w-4 h-4 text-rose-400 shrink-0" />
                ) : activeNotification.type === "reconnected" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : activeNotification.type === "slow" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span className="truncate">{activeNotification.message}</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {(activeNotification.type === "offline" || activeNotification.type === "temporary_error") && (
                  <button
                    type="button"
                    onClick={() => checkConnectivity()}
                    disabled={isChecking}
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-[11px] font-semibold transition-all flex items-center gap-1"
                    title="Retry connection check"
                  >
                    <RefreshCw className={`w-3 h-3 ${isChecking ? "animate-spin" : ""}`} />
                    <span>Retry</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={dismissNotification}
                  className="p-1 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Dismiss notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NetworkStatusContext.Provider>
  );
}
