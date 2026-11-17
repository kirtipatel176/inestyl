"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Route transition top loader for instant visual feedback on navigation.
 */
export function RouteProgressLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset/complete on route change
  useEffect(() => {
    setProgress(100);
    const completeTimer = setTimeout(() => {
      setIsNavigating(false);
      setProgress(0);
    }, 200);

    return () => clearTimeout(completeTimer);
  }, [pathname, searchParams]);

  // Intercept click on internal links to start progress
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external, hash, or target blank
      if (
        href.startsWith("http") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        target.getAttribute("target") === "_blank"
      ) {
        return;
      }

      // If navigating to different path
      if (href !== pathname && href !== window.location.pathname) {
        setIsNavigating(true);
        setProgress(30);

        // Incremental progress simulation
        const t1 = setTimeout(() => setProgress(65), 150);
        const t2 = setTimeout(() => setProgress(85), 350);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
        };
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [pathname]);

  if (!isNavigating && progress === 0) return null;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="fixed top-0 left-0 right-0 z-[110] h-[2.5px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#0071E3] to-[#2997FF] shadow-[0_0_8px_rgba(0,113,227,0.6)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
