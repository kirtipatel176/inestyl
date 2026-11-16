"use client";

import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight, Sparkles } from "lucide-react";

interface AdminAuthLayoutProps {
  children: ReactNode;
  brandStatement?: string;
  supportingText?: string;
}

export function AdminAuthLayout({
  children,
  brandStatement = "Your Store. Your Control.",
  supportingText = "Manage products, inventory, collections and your digital storefront from one place.",
}: AdminAuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex bg-[#FFFFFF] text-[#1D1D1F] font-sans antialiased selection:bg-[#0071E3]/15 selection:text-[#0071E3]">
      {/* ------------------------------------------------------------- */}
      {/* LEFT COLUMN: Editorial Brand Showcase (Desktop & Tablet)      */}
      {/* ------------------------------------------------------------- */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[52%] relative flex-col justify-between p-12 xl:p-16 bg-[#1D1D1F] overflow-hidden">
        {/* Editorial Fashion & Footwear Photograph Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/store/store-interior-1"
            alt="INESTYLE OUTLET Kapadwanj Flagship Store"
            fill
            sizes="50vw"
            priority
            className="object-cover object-center opacity-40 scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Apple-style cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111112] via-[#111112]/75 to-[#111112]/45" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Top: INESTYLE OUTLET Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/40 rounded-lg p-1"
            title="Return to INESTYLE OUTLET Storefront"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#1D1D1F] font-extrabold flex items-center justify-center text-sm tracking-wider shadow-lg">
              IN
            </div>
            <div>
              <span className="text-sm font-extrabold tracking-widest text-white block uppercase leading-none">
                INESTYLE OUTLET
              </span>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mt-0.5 block">
                Admin Management System
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-neutral-200">
            <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
            <span>Kapadwanj Flagship • Live Console</span>
          </div>
        </div>

        {/* Middle: Brand Statement & Statement Copy */}
        <div className="relative z-10 my-auto py-12 max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071E3]/25 border border-[#0071E3]/40 text-[#60A5FA] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Brand Footwear & Apparel</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.12]">
              {brandStatement}
            </h1>

            <p className="text-base text-neutral-300 leading-relaxed font-normal">
              {supportingText}
            </p>

            <div className="pt-4 flex items-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0071E3]" />
                <span>Enterprise RBAC Security</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-600" />
              <span>Two-Factor Authentication</span>
              <div className="w-1 h-1 rounded-full bg-neutral-600" />
              <span>Audit Logging</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Minimal Copyright & Storefront Link */}
        <div className="relative z-10 flex items-center justify-between text-xs text-neutral-400 border-t border-white/10 pt-6">
          <p>© {new Date().getFullYear()} INESTYLE OUTLET. All rights reserved.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            <span>Live Storefront</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT COLUMN: Interactive Authentication View                 */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 xl:w-[48%] min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-12 lg:p-14 xl:p-16 bg-[#FFFFFF]">
        {/* Mobile / Compact Top Bar */}
        <div className="flex items-center justify-between lg:justify-end pb-6 sm:pb-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1D1D1F] text-white font-extrabold flex items-center justify-center text-xs tracking-wider shadow-sm">
              IN
            </div>
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#1D1D1F] block uppercase">
                INESTYLE OUTLET
              </span>
              <span className="text-[10px] tracking-wider text-[#86868B] font-medium block">
                Admin Console
              </span>
            </div>
          </div>

          <Link
            href="/"
            className="text-xs font-semibold text-[#86868B] hover:text-[#0071E3] transition-colors flex items-center gap-1"
          >
            <span>Visit Storefront</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Form Container (Vertical Centering with comfortable max width) */}
        <div className="w-full max-w-md mx-auto my-auto py-4">
          {children}
        </div>

        {/* Bottom Security Assurance & Status */}
        <div className="pt-8 text-center text-xs text-[#86868B] border-t border-[#E5E7EB]">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>Authorised Administrator Access Only</span>
            </span>
            <span className="text-[#E5E7EB]">•</span>
            <span>256-bit Encrypted Session</span>
          </div>
          <p className="mt-2 text-[11px] text-[#A1A1A6]">
            Station Road, Kapadwanj, Gujarat 387620
          </p>
        </div>
      </div>
    </div>
  );
}
