import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Lightweight health check endpoint to verify actual API server connectivity.
 * Used by NetworkStatusManager and retry mechanisms.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      store: "iNESTYL OUTLET",
      location: "Kapadwanj, Gujarat",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
