"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, MapPin, Clock, Phone, Check, AlertCircle, RefreshCw } from "lucide-react";
import { STORE_DETAILS } from "@/constants";
import { apiClient } from "@/lib/api-client";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { WhatsAppFallbackModal } from "@/components/shared/WhatsAppFallbackModal";
import { saveFormDraft, getFormDraft, clearFormDraft, generateIdempotencyKey } from "@/lib/form-recovery";
import { trackEvent } from "@/lib/analytics";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Product Availability");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isWhatsAppFallbackOpen, setIsWhatsAppFallbackOpen] = useState(false);
  const [waMessage, setWaMessage] = useState("");

  // Restore draft on mount
  useEffect(() => {
    const draft = getFormDraft<{ name: string; phone: string; subject: string; message: string }>("contact_form");
    if (draft) {
      if (draft.name) setName(draft.name);
      if (draft.phone) setPhone(draft.phone);
      if (draft.subject) setSubject(draft.subject);
      if (draft.message) setMessage(draft.message);
    }
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    saveFormDraft("contact_form", { name: val, phone, subject, message });
  };
  const handlePhoneChange = (val: string) => {
    setPhone(val);
    saveFormDraft("contact_form", { name, phone: val, subject, message });
  };
  const handleSubjectChange = (val: string) => {
    setSubject(val);
    saveFormDraft("contact_form", { name, phone, subject: val, message });
  };
  const handleMessageChange = (val: string) => {
    setMessage(val);
    saveFormDraft("contact_form", { name, phone, subject, message: val });
  };

  const handleWhatsAppClick = () => {
    const text =
      `Hello iNESTYL OUTLET Kapadwanj,\n\n` +
      `I would like to enquire about store inventory and timings.\n` +
      (name ? `Name: ${name}\n` : "") +
      `Enquiry Subject: ${subject}\n` +
      `Please let me know if someone from the store team is available.`;

    setWaMessage(text);
    const url = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;

    try {
      const win = window.open(url, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        setIsWhatsAppFallbackOpen(true);
      }
    } catch {
      setIsWhatsAppFallbackOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const idempotencyKey = generateIdempotencyKey("contact_enquiry");

    const res = await apiClient("/api/enquiries", {
      method: "POST",
      body: JSON.stringify({
        customerName: name,
        customerPhone: phone,
        productTitle: `Customer Contact: ${subject}`,
        productSku: "GENERAL",
        message,
        channel: "contact_page",
        idempotencyKey,
      }),
      idempotent: false,
    });

    setIsSubmitting(false);

    if (res.ok) {
      trackEvent("product_enquiry", undefined, subject, {
        customerName: name,
        customerPhone: phone,
      });

      clearFormDraft("contact_form");
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setPhone("");
        setMessage("");
      }, 3500);
    } else {
      setErrorMessage(
        res.error?.userMessage || "Unable to send your enquiry. Please try again or use WhatsApp."
      );
    }
  };

  return (
    <div className="container-luxury py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Contact</span>
      </nav>

      {/* 2. Main Two-Column Contact Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left Column: Get in Touch & Actions */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-2">
              WE ARE HERE TO HELP
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base text-[#6E6E73] mt-2 leading-relaxed max-w-lg">
              Have a question, want to check stock or know more about a product? We&apos;re here to help. Connect directly with our store team on WhatsApp or drop us an enquiry.
            </p>
          </div>

          {/* Quick Action Pill Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2.5 min-h-[44px] px-6 py-2.5 rounded-full bg-[#0071E3] text-white text-sm font-semibold tracking-normal hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              <span>Enquire on WhatsApp</span>
            </button>

            <a
              href="#enquiry-form"
              className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full border border-[#0071E3] text-sm font-semibold tracking-normal text-[#0071E3] hover:bg-[#0071E3]/5 hover:text-[#0066CC] transition-all"
            >
              <span>Send an Enquiry</span>
            </a>
          </div>

          {/* Interactive Enquiry Form */}
          <div id="enquiry-form" className="p-6 sm:p-8 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-subtle space-y-5">
            <h2 className="font-heading text-lg font-semibold text-[#1D1D1F]">
              Submit a Product Enquiry
            </h2>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setErrorMessage(null)}
                  className="text-rose-600 hover:text-rose-900 font-bold"
                >
                  Dismiss
                </button>
              </div>
            )}

            {isSubmitted ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm font-medium flex items-center gap-3">
                <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  Thank you! Your enquiry has been forwarded to our Kapadwanj store team. We will contact you on WhatsApp / Phone shortly.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patel"
                      value={name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                    Subject / Enquiry Type
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => handleSubjectChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] bg-white cursor-pointer"
                  >
                    <option value="Product Availability">Product Size &amp; Stock Availability</option>
                    <option value="Store Visit">Planning a Store Visit to Kapadwanj</option>
                    <option value="Brand Authenticity">Brand Verification &amp; Sourcing</option>
                    <option value="General">Other Customer Service Enquiry</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#1D1D1F] block mb-1">
                    Enquiry Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide sneaker model, denim style or size you are looking for..."
                    value={message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] resize-none"
                  />
                </div>

                <LoadingButton
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Sending Enquiry..."
                  className="w-full min-h-[44px]"
                >
                  Send Enquiry to Store
                </LoadingButton>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Store Details & Location Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Store Info Card */}
          <div className="p-6 sm:p-8 bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] shadow-subtle space-y-6">
            <h2 className="font-heading text-lg font-semibold text-[#1D1D1F] pb-3 border-b border-[#E5E7EB]">
              Physical Store Information
            </h2>

            {/* Visit Store */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center text-[#0071E3] flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block">
                  Visit Our Store
                </span>
                <p className="text-sm font-semibold text-[#1D1D1F] mt-0.5">
                  Station Road, Kapadwanj, Gujarat 387620
                </p>
                <span className="text-xs text-[#86868B]">Landmark: Near Main Station Circle</span>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center text-[#0071E3] flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block">
                  Store Timings
                </span>
                <p className="text-sm font-semibold text-[#1D1D1F] mt-0.5">
                  {STORE_DETAILS.hours}
                </p>
                <span className="text-xs text-[#86868B]">Open 7 days a week</span>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] flex items-center justify-center text-[#0071E3] flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B] block">
                  Call Us Directly
                </span>
                <p className="text-sm font-semibold text-[#1D1D1F] mt-0.5">
                  {STORE_DETAILS.phoneDisplay}
                </p>
                <span className="text-xs text-[#86868B]">Store Manager Assistance</span>
              </div>
            </div>
          </div>

          {/* Interactive Map / Storefront Plinth */}
          <div className="p-6 bg-[#F5F5F7] rounded-xl border border-[#E5E7EB] text-center space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3] block">
              DIRECTIONS &amp; LOCATION
            </span>
            <p className="text-xs text-[#6E6E73]">
              Located in Kapadwanj, Gujarat with convenient parking and full trial rooms.
            </p>
            <a
              href="https://maps.google.com/?q=Kapadwanj+Gujarat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 rounded-full bg-[#FFFFFF] border border-[#0071E3] text-xs font-semibold tracking-normal text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-all shadow-subtle"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open in Google Maps</span>
            </a>
          </div>
        </div>
      </div>

      <WhatsAppFallbackModal
        isOpen={isWhatsAppFallbackOpen}
        onClose={() => setIsWhatsAppFallbackOpen(false)}
        messageText={waMessage}
      />
    </div>
  );
}
