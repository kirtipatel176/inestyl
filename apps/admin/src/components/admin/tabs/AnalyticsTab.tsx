"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Eye,
  Search,
  MessageSquare,
  TrendingUp,
  Clock,
  Compass,
  Tag,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { RetryableError } from "@/components/ui/RetryableError";

export function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d" | "all">("all");
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    const res = await apiClient<any>(`/api/analytics?range=${timeRange}`, {
      idempotent: true,
      maxRetries: 2,
    });

    if (res.ok && res.data?.success) {
      setData(res.data);
    } else {
      setErrorMsg(
        res.error?.userMessage || "Unable to load genuine store analytics telemetry."
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0071E3] block">
            GENUINE STORE DISCOVERY DATA
          </span>
          <h2 className="font-heading text-xl font-bold text-[#1D1D1F]">
            Event-Based Store Analytics
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Real customer interaction telemetry: views, searches, WhatsApp reservations, and enquiry resolutions. (No simulated sales/revenue data).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time Filter Pills */}
          <div className="flex items-center bg-[#F5F5F7] p-1 rounded-xl border border-[#E5E7EB] text-xs">
            {[
              { id: "today", label: "Today" },
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" },
              { id: "all", label: "All Time" },
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setTimeRange(p.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  timeRange === p.id
                    ? "bg-white text-[#1D1D1F] shadow-xs"
                    : "text-[#6E6E73] hover:text-[#1D1D1F]"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={fetchAnalytics}
            disabled={isLoading}
            className="p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading && !data && (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white border border-[#E5E7EB] space-y-2">
                <div className="h-3 w-16 bg-[#E5E7EB] rounded" />
                <div className="h-7 w-20 bg-[#E5E7EB] rounded" />
                <div className="h-2.5 w-24 bg-[#E5E7EB] rounded" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-white rounded-2xl border border-[#E5E7EB]" />
            <div className="h-64 bg-white rounded-2xl border border-[#E5E7EB]" />
          </div>
        </div>
      )}

      {/* Error State */}
      {errorMsg && !data && (
        <RetryableError
          title="Analytics Service Temporarily Unavailable"
          message={errorMsg}
          onRetry={fetchAnalytics}
          isRetrying={isLoading}
        />
      )}

      {/* Metric Cards Grid */}
      {data && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* 1. Product Views */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-[#0071E3]">
                <Eye className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Products</span>
              </div>
              <span className="text-2xl font-bold text-[#1D1D1F] block">
                {data.metrics.totalProductViews.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#86868B]">Product Detail Views</span>
            </div>

            {/* 2. Collection Views */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-purple-600">
                <Compass className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Collections</span>
              </div>
              <span className="text-2xl font-bold text-[#1D1D1F] block">
                {data.metrics.totalCollectionViews.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#86868B]">Thematic Curations</span>
            </div>

            {/* 3. Brand Views */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-indigo-600">
                <Tag className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Brands</span>
              </div>
              <span className="text-2xl font-bold text-[#1D1D1F] block">
                {data.metrics.totalBrandViews.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#86868B]">Brand Page Views</span>
            </div>

            {/* 4. Searches */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-amber-600">
                <Search className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Searches</span>
              </div>
              <span className="text-2xl font-bold text-[#1D1D1F] block">
                {data.metrics.totalSearchQueries.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#86868B]">Catalogue Queries</span>
            </div>

            {/* 5. WhatsApp Clicks */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-emerald-600">
                <MessageSquare className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">WhatsApp</span>
              </div>
              <span className="text-2xl font-bold text-[#1D1D1F] block">
                {data.metrics.totalWhatsAppClicks.toLocaleString()}
              </span>
              <span className="text-[11px] text-[#86868B]">Stock Enquiries</span>
            </div>

            {/* 6. Enquiries Resolution */}
            <div className="p-4 rounded-2xl bg-white border border-[#E5E7EB] shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-blue-600">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase">Resolution</span>
              </div>
              <span className="text-2xl font-bold text-[#1D1D1F] block">
                {data.enquiryResolution.resolutionRate}%
              </span>
              <span className="text-[11px] text-[#86868B]">{data.enquiryResolution.resolved} of {data.enquiryResolution.total} resolved</span>
            </div>
          </div>

          {/* Leaderboard and Search Funnel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Most Viewed Products */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <h3 className="font-heading text-sm font-bold text-[#1D1D1F] flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-[#0071E3]" />
                  <span>Most Viewed Styles Leaderboard</span>
                </h3>
                <span className="text-[11px] text-[#86868B]">Ranked by Page Views</span>
              </div>

              {data.mostViewedProducts.length === 0 ? (
                <div className="py-8 text-center text-[#86868B] text-xs">
                  No product view telemetry recorded in this period.
                </div>
              ) : (
                <div className="divide-y divide-[#E5E7EB]">
                  {data.mostViewedProducts.map((p: any, idx: number) => (
                    <div key={p.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-5 text-[11px] font-bold text-[#86868B] text-center">
                          #{idx + 1}
                        </span>
                        <span className="font-semibold text-[#1D1D1F] truncate max-w-xs">
                          {p.name}
                        </span>
                      </div>
                      <span className="font-bold text-[#0071E3] bg-blue-50 px-2.5 py-1 rounded-full text-[11px]">
                        {p.count} {p.count === 1 ? "view" : "views"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Top Search Queries */}
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <h3 className="font-heading text-sm font-bold text-[#1D1D1F] flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-600" />
                  <span>Frequent Customer Search Queries</span>
                </h3>
                <span className="text-[11px] text-[#86868B]">Storefront &amp; Modal Queries</span>
              </div>

              {data.topSearches.length === 0 ? (
                <div className="py-8 text-center text-[#86868B] text-xs">
                  No search query telemetry recorded in this period.
                </div>
              ) : (
                <div className="divide-y divide-[#E5E7EB]">
                  {data.topSearches.map((s: any, idx: number) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] text-[#86868B]">#{idx + 1}</span>
                        <span className="font-semibold text-[#1D1D1F]">
                          &ldquo;{s.query}&rdquo;
                        </span>
                      </div>
                      <span className="font-mono font-bold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded text-[11px]">
                        {s.count} searches
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Customer Enquiry Resolution Breakdown */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-sm font-bold text-[#1D1D1F]">
                  Customer Enquiry Status &amp; Resolution Tracking
                </h3>
                <p className="text-[11px] text-[#86868B]">
                  Funnel of actual store enquiries from initial submission to in-store trial and completed resolution.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200">
                <span className="text-[10px] font-bold uppercase text-red-700 block">New / Pending</span>
                <span className="text-xl font-bold text-red-800">{data.enquiryResolution.new}</span>
                <span className="text-[10px] text-red-600 block mt-0.5">Awaiting staff response</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[10px] font-bold uppercase text-amber-700 block">Contacted</span>
                <span className="text-xl font-bold text-amber-800">{data.enquiryResolution.contacted}</span>
                <span className="text-[10px] text-amber-600 block mt-0.5">Customer engaged on WhatsApp</span>
              </div>
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="text-[10px] font-bold uppercase text-blue-700 block">In Store Visit</span>
                <span className="text-xl font-bold text-blue-800">{data.enquiryResolution.inStoreVisit}</span>
                <span className="text-[10px] text-blue-600 block mt-0.5">Reserved for Kapadwanj visit</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[10px] font-bold uppercase text-emerald-700 block">Resolved</span>
                <span className="text-xl font-bold text-emerald-800">{data.enquiryResolution.resolved}</span>
                <span className="text-[10px] text-emerald-600 block mt-0.5">Completed inquiry</span>
              </div>
            </div>
          </div>

          {/* Recent Live Interaction Stream */}
          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-5 sm:p-6 space-y-3 shadow-2xs">
            <span className="font-heading text-sm font-bold text-[#1D1D1F] block pb-2 border-b border-[#E5E7EB]">
              Recent Live Telemetry Stream ({data.recentEvents.length} Recent Events)
            </span>

            <div className="divide-y divide-[#E5E7EB] text-xs">
              {data.recentEvents.map((evt: any) => (
                <div key={evt.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        evt.type === "product_view"
                          ? "bg-blue-500"
                          : evt.type === "whatsapp_click"
                          ? "bg-emerald-500"
                          : evt.type === "search_query"
                          ? "bg-amber-500"
                          : "bg-purple-500"
                      }`}
                    />
                    <span className="font-bold capitalize text-[#1D1D1F]">
                      {evt.type.replace("_", " ")}:
                    </span>
                    <span className="text-[#6E6E73] truncate max-w-sm">
                      {evt.targetName || "Store action"}
                    </span>
                  </div>

                  <span className="text-[11px] text-[#86868B] font-mono shrink-0 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(evt.timestamp).toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
