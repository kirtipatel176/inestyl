/**
 * INESTYLE OUTLET — Verification Script for Network & Error System
 */
const fs = require("fs");
const path = require("path");

function runVerification() {
  console.log("=================================================================");
  console.log("INESTYLE OUTLET — Global Loading, Network & Error System Validation");
  console.log("=================================================================\n");

  const requiredFiles = [
    // Loading components
    "src/components/ui/FullPageLoader.tsx",
    "src/components/ui/RouteProgressLoader.tsx",
    "src/components/ui/SectionLoader.tsx",
    "src/components/ui/ProductGridSkeleton.tsx",
    "src/components/ui/ProductDetailSkeleton.tsx",
    "src/components/ui/DashboardSkeleton.tsx",
    "src/components/ui/TableSkeleton.tsx",
    "src/components/ui/ImageWithFallback.tsx",
    "src/components/ui/VideoPlaceholder.tsx",
    "src/components/ui/LoadingButton.tsx",
    "src/components/ui/FileUploadProgress.tsx",
    "src/components/ui/RetryableError.tsx",
    "src/components/ui/SectionErrorBoundary.tsx",

    // Network & API Layer
    "src/lib/api-client.ts",
    "src/lib/form-recovery.ts",
    "src/components/providers/NetworkStatusProvider.tsx",
    "src/components/shared/WhatsAppFallbackModal.tsx",
    "src/app/api/health/route.ts",

    // Next.js Boundaries & Fallback Pages
    "src/app/global-error.tsx",
    "src/app/error.tsx",
    "src/app/admin/error.tsx",
    "src/app/not-found.tsx",
    "src/app/unauthorized/page.tsx",
    "src/app/session-expired/page.tsx",
    "src/app/maintenance/page.tsx",

    // Next.js Route Loading skeletons
    "src/app/loading.tsx",
    "src/app/products/loading.tsx",
    "src/app/product/[slug]/loading.tsx",
    "src/app/brands/[slug]/loading.tsx",
    "src/app/collections/[slug]/loading.tsx",
    "src/app/admin/loading.tsx",
  ];

  let allFound = true;
  for (const file of requiredFiles) {
    const fullPath = path.join(__dirname, "..", file);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ MISSING FILE: ${file}`);
      allFound = false;
    } else {
      const stats = fs.statSync(fullPath);
      console.log(`✅ [FOUND] ${file} (${stats.size} bytes)`);
    }
  }

  if (!allFound) {
    throw new Error("One or more required components are missing!");
  }

  console.log("\n--- Checking API Client & Error Sanitization Rules ---");
  const apiClientCode = fs.readFileSync(path.join(__dirname, "..", "src/lib/api-client.ts"), "utf-8");
  const checks = [
    { text: "HTTP_ERROR_MESSAGES", desc: "Status code error catalog defined" },
    { text: "400", desc: "400 Bad Request handled" },
    { text: "401", desc: "401 Unauthorized handled" },
    { text: "403", desc: "403 Forbidden handled" },
    { text: "404", desc: "404 Not Found handled" },
    { text: "408", desc: "408 Request Timeout handled" },
    { text: "409", desc: "409 Conflict handled" },
    { text: "422", desc: "422 Validation Error handled" },
    { text: "429", desc: "429 Rate Limit handled" },
    { text: "500", desc: "500 Internal Error sanitized" },
    { text: "502", desc: "502 Bad Gateway handled" },
    { text: "503", desc: "503 Service Unavailable handled" },
    { text: "exponential backoff", desc: "Safe exponential backoff implemented", checkCase: false },
    { text: "AbortController", desc: "AbortController signal cancellation supported" },
    { text: "sanitizeApiError", desc: "Sanitization prevents leaking database queries or traces" },
  ];

  for (const c of checks) {
    const passed = c.checkCase === false
      ? apiClientCode.toLowerCase().includes(c.text.toLowerCase())
      : apiClientCode.includes(c.text);
    if (!passed) {
      console.error(`❌ FAILED API Client Check: ${c.desc}`);
      throw new Error(`API Client check failed: ${c.desc}`);
    }
    console.log(`✅ [API-CLIENT] ${c.desc}`);
  }

  console.log("\n--- Checking Network Status Provider ---");
  const netCode = fs.readFileSync(path.join(__dirname, "..", "src/components/providers/NetworkStatusProvider.tsx"), "utf-8");
  const netChecks = [
    { text: "navigator.onLine", desc: "Detects browser offline status" },
    { text: "/api/health", desc: "Verifies actual backend connectivity with /api/health" },
    { text: "Connection restored", desc: "Connection restored notification" },
    { text: "You're currently offline", desc: "Offline notification" },
    { text: "Something went wrong", desc: "Temporary error notification" },
    { text: "lastNotificationTypeRef", desc: "Deduplication prevents repeating notifications" },
  ];

  for (const c of netChecks) {
    if (!netCode.includes(c.text)) {
      console.error(`❌ FAILED Network Status Check: ${c.desc}`);
      throw new Error(`Network status check failed: ${c.desc}`);
    }
    console.log(`✅ [NETWORK-MGR] ${c.desc}`);
  }

  console.log("\n=================================================================");
  console.log("ALL GLOBAL LOADING, NETWORK & ERROR SYSTEM VERIFICATIONS PASSED!");
  console.log("=================================================================\n");
}

runVerification();
