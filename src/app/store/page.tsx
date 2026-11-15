import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  MessageSquare,
  CheckCircle2,
  Car,
  Ruler,
} from "lucide-react";
import { STORE_DETAILS } from "@/constants";

export const metadata = {
  title: `Visit Our Store — ${STORE_DETAILS.name} | INESTYLE OUTLET`,
  description: `Visit our physical flagship outlet on Station Road, Kapadwanj, Gujarat. Explore verified authentic footwear from Nike, adidas, Puma, HOKA and apparel from Levi's and DIESEL.`,
};

export default function StorePage() {
  const whatsappUrl = `https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${encodeURIComponent(
    "Hello iNESTYL OUTLET, I am planning to visit the Kapadwanj store today."
  )}`;

  return (
    <div className="container-luxury py-8 space-y-14">
      {/* 1. Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#86868B]">
        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#1D1D1F] font-semibold">Visit Our Store</span>
      </nav>

      {/* 2. Page Hero Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block">
          PHYSICAL FLAGSHIP DESTINATION
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#1D1D1F] tracking-tight leading-[1.15]">
          Visit Our Kapadwanj Store
        </h1>
        <p className="text-base sm:text-lg text-[#6E6E73] font-normal leading-relaxed">
          Explore our collections, discover your size and connect with our team at our premier multi-brand boutique on Station Road, Kapadwanj.
        </p>

        {/* Quick CTA Actions */}
        <div className="flex flex-wrap items-center gap-3.5 pt-2">
          <a
            href={STORE_DETAILS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0071E3] text-white text-sm font-semibold hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1EBE5D] transition-all shadow-subtle active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Connect on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 3. Actual Store Photography Gallery (No fabricated stock photos) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]">
            Inside the Kapadwanj Flagship
          </span>
          <span className="text-xs text-[#86868B]">Verified Authentic Store Environment</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-subtle group">
            <Image
              src="/images/store/store-interior-1.jpg"
              alt="iNESTYL OUTLET Sneaker Display Wall"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
              Sneaker Display Wall
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-subtle group">
            <Image
              src="/images/store/store-interior-2.jpg"
              alt="iNESTYL OUTLET Apparel Curation"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
              Original Denim &amp; Jackets
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-subtle group">
            <Image
              src="/images/store/store-interior-3.jpg"
              alt="iNESTYL OUTLET Boutique Interior"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-104 transition-transform duration-700"
            />
            <div className="absolute bottom-4 left-4 bg-[#1D1D1F]/80 backdrop-blur-sm text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
              Fitting &amp; Hospitality
            </div>
          </div>
        </div>
      </div>

      {/* 4. Store Operations & Location Specifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Card: Core Details */}
        <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 space-y-6 shadow-subtle">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
              STORE DIRECTORY
            </span>
            <h2 className="font-heading text-2xl font-bold text-[#1D1D1F]">
              {STORE_DETAILS.name}
            </h2>
          </div>

          <div className="space-y-4 text-sm text-[#1D1D1F] divide-y divide-[#E5E7EB]">
            <div className="flex items-start gap-3.5 pt-3">
              <MapPin className="w-5 h-5 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">Complete Address</p>
                <p className="text-[#6E6E73] mt-0.5">{STORE_DETAILS.fullAddress}</p>
                <p className="text-xs text-[#86868B] mt-1">Landmark: Station Road retail district, Kapadwanj</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4">
              <Clock className="w-5 h-5 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">Operating Hours</p>
                <p className="text-[#6E6E73] mt-0.5">{STORE_DETAILS.hours}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">Open 7 days a week, including weekends</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4">
              <Phone className="w-5 h-5 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">Direct Telephone</p>
                <a
                  href={`tel:${STORE_DETAILS.phoneDisplay.replace(/\s+/g, "")}`}
                  className="text-[#0071E3] hover:underline font-medium block mt-0.5"
                >
                  {STORE_DETAILS.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-4">
              <MessageSquare className="w-5 h-5 text-[#25D366] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">WhatsApp Store Enquiries</p>
                <p className="text-xs text-[#6E6E73] mt-0.5">
                  Message before visiting to hold sizes or verify current availability.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#1B8A42] hover:underline inline-block mt-1"
                >
                  Start WhatsApp Conversation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: In-Store Amenities & Visitor Experience */}
        <div className="lg:col-span-5 bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-8 space-y-6 shadow-subtle">
          <h3 className="font-heading text-lg font-semibold text-[#1D1D1F]">
            In-Store Amenities &amp; Services
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#6E6E73]">
              <Ruler className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">Footwear Size Fitting</p>
                <p className="mt-0.5">Try on sizes side-by-side with genuine brand comparison advice.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#6E6E73]">
              <CheckCircle2 className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">Apparel Changing Rooms</p>
                <p className="mt-0.5">Comfortable private fitting rooms to check fit on Levi&apos;s and DIESEL apparel.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#6E6E73]">
              <Clock className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">WhatsApp Size Hold</p>
                <p className="mt-0.5">Message our team while en route to hold a specific pair for your visit.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-[#6E6E73]">
              <Car className="w-4 h-4 text-[#0071E3] mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-[#1D1D1F]">Convenient Access &amp; Parking</p>
                <p className="mt-0.5">Easily accessible on Station Road with street parking available.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB]">
            <Link
              href="/contact"
              className="w-full py-3 rounded-full border border-[#0071E3] text-[#0071E3] text-xs font-semibold hover:bg-[#0071E3]/5 flex items-center justify-center transition-colors"
            >
              Contact Store Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

