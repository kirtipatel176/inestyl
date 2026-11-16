"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  sectionName?: string;
  compact?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Isolated Section Error Boundary.
 * Prevents a single failing homepage or storefront section from crashing the entire app.
 */
export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[SectionErrorBoundary:${this.props.sectionName || "Section"}]`, error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.compact) {
        return (
          <div className="p-4 my-2 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-[#86868B]">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Unable to display {this.props.sectionName || "this section"}.</span>
            </div>
            <button
              type="button"
              onClick={this.handleRetry}
              className="px-3 py-1 rounded-full bg-white border border-[#E5E7EB] text-[11px] font-semibold text-[#1D1D1F] hover:bg-[#E5E7EB] flex items-center gap-1 shadow-2xs"
            >
              <RefreshCw className="w-3 h-3 text-[#0071E3]" />
              <span>Retry</span>
            </button>
          </div>
        );
      }

      return (
        <section className="container-luxury py-12">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] text-center space-y-4 max-w-xl mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E7EB] text-amber-600 flex items-center justify-center mx-auto shadow-xs">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                {this.props.fallbackTitle || `Unable to Load ${this.props.sectionName || "Section"}`}
              </h3>
              <p className="text-xs text-[#86868B] max-w-sm mx-auto">
                {this.props.fallbackMessage ||
                  "This section encountered a temporary display issue. The rest of the store catalogue remains available."}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0071E3] hover:bg-[#0066CC] text-white text-xs font-semibold tracking-normal transition-all shadow-subtle active:scale-98"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Section</span>
              </button>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
