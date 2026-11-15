"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_DETAILS } from "@/constants";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const HOMEPAGE_FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "How can I check product availability?",
    answer:
      "When viewing any product on our catalogue, select your desired size and colour chip. The live availability indicator will display whether that specific configuration is currently in stock at our Kapadwanj flagship store.",
  },
  {
    id: "faq-2",
    question: "Are the branded products authentic?",
    answer:
      "Yes, 100% authentic. INESTYLE OUTLET strictly enforces a zero-tolerance policy against grey-market replicas or counterfeit items. Every sneaker, denim, jacket, and polo is sourced exclusively through authorized distributor channels and retains original brand tags and packaging.",
  },
  {
    id: "faq-3",
    question: "How can I enquire about or reserve a product?",
    answer:
      "Because we operate as a discovery catalogue without online payment gateways or remote checkout, simply tap 'Enquire on WhatsApp' on any product page. This sends a pre-formatted message with the product name, SKU, and selected size directly to our store staff for reservation or enquiry.",
  },
  {
    id: "faq-4",
    question: "Can I visit the physical store to try items on in person?",
    answer:
      `Absolutely. Our flagship outlet is located on Station Road, Kapadwanj, Gujarat 387620. We are open every day from ${STORE_DETAILS.hours}, featuring dedicated sneaker fitting areas and apparel changing rooms.`,
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="container-luxury space-y-6">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#E5E7EB]"
      >
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-1">
            COMMON QUESTIONS
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#1D1D1F] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#6E6E73] mt-1">
            Everything you need to know about our catalogue, store visits, and authentic sourcing.
          </p>
        </div>
        <Link
          href="/faq"
          className="text-xs sm:text-sm font-medium text-[#1D1D1F] hover:text-[#0071E3] flex items-center gap-1.5 transition-colors group self-start sm:self-auto"
        >
          <span>View All FAQs</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Accessible Accordion Component */}
      <div className="max-w-3xl mx-auto space-y-3">
        {HOMEPAGE_FAQS.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-colors bg-[#FFFFFF] ${
                isOpen ? "border-[#0071E3]/50 shadow-subtle" : "border-[#E5E7EB] hover:border-[#86868B]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-2xl"
              >
                <span className="font-heading text-base sm:text-lg font-medium text-[#1D1D1F]">
                  {faq.question}
                </span>
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                    isOpen ? "bg-[#0071E3] text-white rotate-180" : "bg-[#F5F5F7] text-[#6E6E73]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${faq.id}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#6E6E73] leading-relaxed border-t border-[#E5E7EB]/60">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}

