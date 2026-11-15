"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageSquare, MapPin, Clock, Phone, Check } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Product Availability");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsAppClick = () => {
    const text =
      `Hello iNESTYL OUTLET Kapadwanj,\n\n` +
      `I would like to enquire about store inventory and timings.\n` +
      (name ? `Name: ${name}\n` : "") +
      `Please let me know if someone from the store team is available.`;

    const url = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setName("");
      setPhone("");
      setMessage("");
    }, 3000);
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

      {/* 2. Main Two-Column Contact Layout (Matching Reference Screenshot) */}
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
                      onChange={(e) => setName(e.target.value)}
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
                      onChange={(e) => setPhone(e.target.value)}
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
                    onChange={(e) => setSubject(e.target.value)}
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
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1D1D1F] outline-none focus:border-[#0071E3] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[44px] py-2.5 px-6 rounded-full bg-[#0071E3] text-white text-xs font-semibold tracking-normal hover:bg-[#0066CC] transition-colors flex items-center justify-center shadow-subtle active:scale-98"
                >
                  Send Enquiry to Store
                </button>
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
    </div>
  );
}
