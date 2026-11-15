"use client";

import { motion, type Variants } from "framer-motion";

export function TrustPillarsAnimated() {
  const pillars = [
    {
      title: "100% Original",
      desc: "Authentic inventory sourced exclusively from authorized distributors.",
    },
    {
      title: "Outlet Prices",
      desc: "Transparent values on genuine footwear and apparel below retail MRP.",
    },
    {
      title: "Kapadwanj Flagship",
      desc: "Visit our physical store to try on sizes and verify materials in person.",
    },
    {
      title: "Direct WhatsApp Service",
      desc: "Check live stock and hold sizes directly with our store team.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="container-luxury" aria-label="Store Guarantees">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 border-y border-[#E5E7EB]"
      >
        {pillars.map((p, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="space-y-1.5"
          >
            <h3 className="font-heading text-sm font-semibold text-[#1D1D1F] tracking-tight">
              {p.title}
            </h3>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
