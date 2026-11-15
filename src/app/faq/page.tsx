"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { STORE_DETAILS } from "@/constants";

interface FaqCategory {
  title: string;
  items: {
    id: string;
    question: string;
    answer: string;
  }[];
}

const FAQ_DATA: FaqCategory[] = [
  {
    title: "Stock & Availability",
    items: [
      {
        id: "faq-availability",
        question: "How can I check product availability?",
        answer:
          "When browsing our catalogue, click into any product detail page and select your size and colour. The availability badge will update in real time to show whether that specific item is in stock at our Kapadwanj flagship outlet.",
      },
      {
        id: "faq-sizes",
        question: "Are different sizes and colours available?",
        answer:
          "Yes. We display all current store sizes (UK 5 through 11 for footwear, S through XXL for apparel) and colorways. Available sizes are clickable, while sizes that are currently out of stock will be grayed out.",
      },
      {
        id: "faq-hold",
        question: "Can I request a product to be held before I visit?",
        answer:
          "Yes. You can contact our store team via WhatsApp with the product name and SKU. Our concierges will hold the item for up to 24 hours while you travel to our store.",
      },
    ],
  },
  {
    title: "Enquiries & Communication",
    items: [
      {
        id: "faq-enquire",
        question: "How can I enquire about a product?",
        answer:
          "Every product page features a direct 'Enquire on WhatsApp' button. Clicking this opens a pre-composed chat with the product name, selected size, and SKU directly to our store staff.",
      },
      {
        id: "faq-no-cart",
        question: "Why is there no online cart or checkout on this website?",
        answer:
          "INESTYLE OUTLET is an exclusive in-person retail discovery catalogue. We do not sell items online or operate third-party couriers, ensuring all stock remains available for physical inspection and authentic try-ons at our flagship boutique.",
      },
      {
        id: "faq-contact",
        question: "How can I contact INESTYLE OUTLET?",
        answer:
          `You can reach our team via WhatsApp at +${STORE_DETAILS.whatsappNumber}, by telephone at ${STORE_DETAILS.phoneDisplay}, or by visiting our store on Station Road, Kapadwanj.`,
      },
    ],
  },
  {
    title: "Authenticity & Sourcing",
    items: [
      {
        id: "faq-authentic",
        question: "Are the branded products authentic?",
        answer:
          "100% verified authentic. INESTYLE OUTLET has zero tolerance for grey-market goods, factory seconds, or counterfeits. All Nike, adidas, Puma, HOKA, Levi's, DIESEL, and U.S. Polo Assn. items are procured directly through certified domestic distributor networks with original tags, security packaging, and official brand credentials.",
      },
      {
        id: "faq-pricing",
        question: "How are INESTYLE OUTLET prices lower than official brand stores?",
        answer:
          "We specialize in end-of-season, overstock, and volume outlet acquisitions directly from authorized distributors. This allows us to offer genuine products at transparent discounts below official retail MRP.",
      },
    ],
  },
  {
    title: "Store Visit & Returns",
    items: [
      {
        id: "faq-visit",
        question: "Can I visit the physical store?",
        answer:
          `Yes! Our store is open 7 days a week from ${STORE_DETAILS.hours} on Station Road, Kapadwanj, Gujarat 387620. We offer fitting rooms and complete footwear try-on benches.`,
      },
      {
        id: "faq-returns",
        question: "What is your returns and exchange policy?",
        answer:
          "We offer a 7-day in-store exchange policy for unworn items with original brand tags and cash memo/receipt attached at our Kapadwanj outlet. Please review our full Returns Policy page for conditions.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openIds, setOpenIds] = useState<string[]>(["faq-availability", "faq-authentic"]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="container-luxury py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">FAQs</span>
      </nav>

      {/* 2. Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          HELP &amp; FREQUENTLY ASKED QUESTIONS
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
          Find answers to common questions about our physical store, stock availability, authentic brand sourcing, and WhatsApp concierge.
        </p>
      </div>

      {/* 3. Categorized Accordion Groups */}
      <div className="space-y-10 max-w-3xl">
        {FAQ_DATA.map((cat) => (
          <div key={cat.title} className="space-y-4">
            <h2 className="font-heading text-lg font-semibold text-[#1D1D1F] pb-2 border-b border-[#E5E7EB]">
              {cat.title}
            </h2>

            <div className="space-y-3">
              {cat.items.map((item) => {
                const isOpen = openIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`rounded-xl border transition-colors bg-[#FFFFFF] ${
                      isOpen ? "border-[#1D1D1F]/20 shadow-xs" : "border-[#E5E7EB] hover:border-[#86868B]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={`answer-${item.id}`}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] rounded-xl"
                    >
                      <span className="font-heading text-base font-medium text-[#1D1D1F]">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#86868B] transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-[#1D1D1F]" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`answer-${item.id}`}
                          role="region"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#6E6E73] leading-relaxed border-t border-[#E5E7EB]/60">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Still Need Assistance Box */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#E5E7EB] p-8 max-w-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-subtle">
        <div className="space-y-1">
          <h3 className="font-heading text-base font-semibold text-[#1D1D1F]">
            Still have questions?
          </h3>
          <p className="text-xs sm:text-sm text-[#6E6E73]">
            Our Kapadwanj store team is ready to answer specific product and sizing questions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-full border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:border-[#0071E3] transition-colors"
          >
            Contact Store
          </Link>
          <a
            href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
              "Hello iNESTYL OUTLET, I have a question regarding store stock."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1EBE5D] transition-all shadow-subtle"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}

