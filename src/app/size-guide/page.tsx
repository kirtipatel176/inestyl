import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export const metadata = {
  title: "Size Guide — Footwear & Apparel Conversions | INESTYL OUTLET",
  description:
    "Complete footwear and apparel size conversion guide for Nike, adidas, Puma, HOKA, Levi's, and DIESEL at INESTYL OUTLET. UK, US, EU, and CM measurements.",
};

export default function SizeGuidePage() {
  const footwearSizes = [
    { uk: "5.0", usMen: "5.5", usWomen: "7.0", eu: "38.0", cm: "24.0" },
    { uk: "6.0", usMen: "6.5", usWomen: "8.0", eu: "39.5", cm: "24.8" },
    { uk: "7.0", usMen: "7.5", usWomen: "9.0", eu: "41.0", cm: "25.7" },
    { uk: "8.0", usMen: "8.5", usWomen: "10.0", eu: "42.5", cm: "26.5" },
    { uk: "9.0", usMen: "9.5", usWomen: "11.0", eu: "44.0", cm: "27.4" },
    { uk: "10.0", usMen: "10.5", usWomen: "12.0", eu: "45.0", cm: "28.2" },
    { uk: "11.0", usMen: "11.5", usWomen: "13.0", eu: "46.5", cm: "29.1" },
  ];

  const apparelSizes = [
    { size: "S", chest: '36" - 38"', waist: '30" - 31"', collar: '14.5"' },
    { size: "M", chest: '39" - 41"', waist: '32" - 33"', collar: '15.5"' },
    { size: "L", chest: '42" - 44"', waist: '34" - 36"', collar: '16.5"' },
    { size: "XL", chest: '45" - 47"', waist: '37" - 39"', collar: '17.5"' },
    { size: "XXL", chest: '48" - 50"', waist: '40" - 42"', collar: '18.5"' },
  ];

  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I need assistance confirming my size before visiting."
  )}`;

  return (
    <div className="container-luxury py-8 space-y-12">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Size Guide</span>
      </nav>

      {/* 2. Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          FIT &amp; MEASUREMENT STANDARDS
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
          Size Guide &amp; Fit Recommendations
        </h1>
        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
          INESTYLE OUTLET uses authentic international standard sizing. Use our conversion tables below to find your ideal fit across global footwear and apparel collections.
        </p>
      </div>

      {/* 3. Footwear Conversion Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB]">
          <div>
            <h2 className="font-heading text-xl font-semibold text-[#1D1D1F]">
              Footwear Size Conversion
            </h2>
            <p className="text-xs text-[#86868B] mt-0.5">
              All shoes at INESTYL OUTLET are labeled in standard UK sizes by default.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full self-start sm:self-auto">
            UK Standard Sizing
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#1D1D1F] font-semibold">
                <th className="py-3 px-4 bg-[#F5F5F7] rounded-l-lg">UK (Store Default)</th>
                <th className="py-3 px-4">US Men</th>
                <th className="py-3 px-4">US Women</th>
                <th className="py-3 px-4">EU</th>
                <th className="py-3 px-4 rounded-r-lg">Foot Length (CM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#6E6E73]">
              {footwearSizes.map((row) => (
                <tr key={row.uk} className="hover:bg-[#F5F5F7]/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#1D1D1F] bg-[#F5F5F7]/30">
                    UK {row.uk}
                  </td>
                  <td className="py-3 px-4">US {row.usMen}</td>
                  <td className="py-3 px-4">US {row.usWomen}</td>
                  <td className="py-3 px-4">EU {row.eu}</td>
                  <td className="py-3 px-4 font-medium text-[#1D1D1F]">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Apparel Conversion Table */}
      <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 space-y-6 shadow-subtle">
        <div className="pb-4 border-b border-[#E5E7EB]">
          <h2 className="font-heading text-xl font-semibold text-[#1D1D1F]">
            Apparel Measurements (Inches)
          </h2>
          <p className="text-xs text-[#86868B] mt-0.5">
            Applicable for Levi&apos;s, DIESEL, U.S. Polo Assn., and Nike outerwear and tops.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-[#1D1D1F] font-semibold">
                <th className="py-3 px-4 bg-[#F5F5F7] rounded-l-lg">Standard Size</th>
                <th className="py-3 px-4">Chest</th>
                <th className="py-3 px-4">Waist</th>
                <th className="py-3 px-4 rounded-r-lg">Collar / Neck</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-[#6E6E73]">
              {apparelSizes.map((row) => (
                <tr key={row.size} className="hover:bg-[#F5F5F7]/50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#1D1D1F] bg-[#F5F5F7]/30">
                    {row.size}
                  </td>
                  <td className="py-3 px-4">{row.chest}</td>
                  <td className="py-3 px-4">{row.waist}</td>
                  <td className="py-3 px-4">{row.collar}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Brand-Specific Fit Guidance & Measuring Instructions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Tips */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 space-y-4 shadow-subtle">
          <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            Brand-Specific Fit Notes
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#6E6E73]">
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-[#1D1D1F]">Nike:</strong> Running models (Pegasus, Vaporfly) fit slightly snug in the toe box. If between sizes, consider ordering half a size up.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-[#1D1D1F]">HOKA:</strong> Fits true to size with a generous forefoot profile. Ideal for neutral and wide-foot runners.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-[#1D1D1F]">Levi&apos;s Denim:</strong> 501 Original uses 100% rigid non-stretch cotton. Size up 1 waist size if you prefer a looser thigh fit.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#0071E3] mt-1.5 flex-shrink-0" />
              <div>
                <strong className="text-[#1D1D1F]">adidas:</strong> Boost midsoles fit true to size. PRIMEKNIT models offer a snug sock-like feel.
              </div>
            </li>
          </ul>
        </div>

        {/* Measuring Guide */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-6 sm:p-8 space-y-4 shadow-subtle">
          <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            How to Measure Your Foot Length
          </h3>
          <ol className="space-y-3 text-xs sm:text-sm text-[#6E6E73] list-decimal list-inside">
            <li>Place a sheet of paper on a flat hard floor against a wall.</li>
            <li>Stand on the paper with your heel against the wall wearing normal socks.</li>
            <li>Mark the longest tip of your toes on the paper with a pencil.</li>
            <li>Measure the distance from the edge of the paper to the mark in centimeters (CM).</li>
            <li>Match your foot length to the conversion table above for your precise UK size.</li>
          </ol>

          <div className="pt-4 border-t border-[#E5E7EB]">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0071E3] hover:underline"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Still unsure? Ask our store team on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

