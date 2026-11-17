import Link from "next/link";
import { STORE_DETAILS } from "@/constants";

export const metadata = {
  title: "Privacy Policy — INESTYL OUTLET",
  description:
    "Privacy Policy for INESTYL OUTLET. Learn how we handle your personal information when browsing our catalogue and contacting our store.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-luxury py-8 space-y-10 max-w-4xl">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Privacy Policy</span>
      </nav>

      {/* 2. Header */}
      <div className="space-y-3 pb-6 border-b border-[#E5E7EB]">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          LEGAL &amp; PRIVACY COMPLIANCE
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#86868B]">
          Last updated: November 2026 • Effective for INESTYL OUTLET website and store interactions
        </p>
      </div>

      {/* 3. Content Sections */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 sm:p-12 space-y-8 text-sm text-[#6E6E73] leading-relaxed shadow-subtle">
        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            1. Overview &amp; Catalogue Nature
          </h2>
          <p>
            INESTYLE OUTLET (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website at inestyl.com as an in-person retail discovery catalogue. We do not operate online shopping carts, payment processors, or digital checkout mechanisms. As such, we do not collect, process, or store credit card, debit card, or net-banking financial credentials on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            2. Information We Collect
          </h2>
          <p>
            When you interact with our website or contact our team, we may collect the following limited information:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>
              <strong>Enquiry Information:</strong> Name, phone number, and message contents submitted through our online enquiry form or directly via WhatsApp.
            </li>
            <li>
              <strong>Technical Usage Data:</strong> Anonymized browser type, screen resolution, operating system, and pages viewed, used solely to optimize website usability and performance.
            </li>
            <li>
              <strong>Local Preferences:</strong> Browser session storage to remember recent searches or sizing preferences on your own device.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            3. How We Use Your Information
          </h2>
          <p>Your information is used strictly to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Respond to your product availability and size enquiries.</li>
            <li>Confirm hold requests for physical inspection at our Kapadwanj flagship boutique.</li>
            <li>Maintain site performance, security, and prevent abusive bot traffic.</li>
          </ul>
          <p>
            We do not sell, rent, or lease your personal information to third-party marketing brokers or advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            4. WhatsApp Communication
          </h2>
          <p>
            When you initiate a WhatsApp conversation through our website links, communication takes place via the WhatsApp messaging platform subject to WhatsApp&apos;s own privacy policy and terms of service. We use WhatsApp strictly for direct customer concierge assistance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            5. Contacting Our Data Custodian
          </h2>
          <p>
            For any questions or privacy inquiries regarding our store operations or website:
          </p>
          <div className="p-4 bg-[#F5F5F7] rounded-xl text-xs space-y-1 text-[#1D1D1F]">
            <p className="font-semibold">{STORE_DETAILS.name}</p>
            <p>{STORE_DETAILS.fullAddress}</p>
            <p>Telephone: {STORE_DETAILS.phoneDisplay}</p>
            <p>Email: {STORE_DETAILS.supportEmail}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

