import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export const metadata = {
  title: "Accessibility Statement — INESTYL OUTLET",
  description:
    "Accessibility commitment and standards for the INESTYL OUTLET digital catalogue experience.",
};

export default function AccessibilityPage() {
  return (
    <div className="container-luxury py-8 space-y-10 max-w-4xl">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Accessibility Statement</span>
      </nav>

      {/* 2. Header */}
      <div className="space-y-3 pb-6 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          INCLUSIVE DESIGN COMMITMENT
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Accessibility Statement
        </h1>
        <p className="text-xs text-[#86868B]">
          Updated November 2026 • Dedicated to accessible digital experiences for all customers
        </p>
      </div>

      {/* 3. Accessibility Principles */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 space-y-8 text-sm text-[#6E6E73] leading-relaxed shadow-subtle">
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            1. Our Commitment
          </h2>
          <p>
            INESTYLE OUTLET is committed to digital accessibility and ensuring that our website is usable and welcoming to the widest possible audience, regardless of ability or technology. We aim to conform to the World Wide Web Consortium (W3C) Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            2. Measures Taken to Support Accessibility
          </h2>
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Semantic HTML:</strong> Proper landmark elements (&lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;aside&gt;, &lt;footer&gt;) to facilitate screen reader navigation.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Keyboard Navigation:</strong> All interactive elements, including search, dropdowns, accordions, and modals, are operable via keyboard tab and enter/space sequences.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Color Contrast:</strong> High-contrast color choices adhering to Apple Minimal standards, ensuring comfortable reading against light backgrounds.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <span>
                <strong>Reduced Motion:</strong> CSS and Framer Motion configurations respect user OS-level &apos;prefers-reduced-motion&apos; settings.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            3. Feedback &amp; Assistance
          </h2>
          <p>
            If you encounter any difficulty accessing any part of our website or need specific product descriptions conveyed in an alternative format:
          </p>
          <div className="p-4 bg-[#F5F5F7] rounded-xl text-xs space-y-1 text-[#1D1D1F]">
            <p className="font-semibold">{STORE_DETAILS.name}</p>
            <p>Email: {STORE_DETAILS.supportEmail}</p>
            <p>Telephone / WhatsApp: {STORE_DETAILS.phoneDisplay}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

