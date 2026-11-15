# iNESTYL OUTLET — Technical Architecture & Engineering Standards
*Version 1.1.0 — Frontend Architecture & Future Backend Specification*

---

## 1. System Overview & Approved Technology Matrix

The web platform for **iNESTYL OUTLET** is architected as an ultra-fast, mobile-first product catalogue, inventory discovery index, and store enquiry portal.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / USER INTERFACE                         │
│   Next.js 15+ App Router • React 19 • TypeScript 5 • Tailwind CSS 3/4  │
│     shadcn/ui (Radix Primitives) • Lucide React • Framer Motion        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                  ┌─────────────────┴─────────────────┐
                  ▼                                   ▼
┌───────────────────────────────────┐ ┌──────────────────────────────────┐
│          IMAGE ASSET CDN          │ │     DATABASE & HEADLESS CMS    │
│        Cloudinary Pipeline        │ │      Supabase / PostgreSQL       │
│  (Auto-format WebP/AVIF, resize)  │ │  (Product Catalogue, Inventory)  │
└───────────────────────────────────┘ └─────────────────┬────────────────┘
                                                        │
                                                        ▼
                                      ┌──────────────────────────────────┐
                                      │         STORE ENQUIRIES          │
                                      │    Direct WhatsApp Business API   │
                                      │   + Store Visit Direction Engine │
                                      └──────────────────────────────────┘
```

### Approved Technology Stack

| Layer | Approved Technology | Engineering Role |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | Server-side rendering (SSR), React Server Components (RSC) for zero-JS catalogue initial loads, dynamic metadata SEO. |
| **Language** | **TypeScript (Strict)** | Strict compile-time type safety for product attributes, size variants, and brand models. |
| **Styling** | **Tailwind CSS + CSS Variables**| Utility-first styling coupled to the official 70-25-5 color system and editorial typography scale. |
| **Primitives** | **shadcn/ui (Radix UI)** | Accessible unstyled primitives (Dialogs, Sheets, Dropdowns, Selects, Accordions). |
| **Icons** | **Lucide React** | Consistent 1.5px stroke width monochrome line icons. |
| **Animation** | **Framer Motion + GSAP + Lenis**| Restrained UI transitions, scrubbed scroll timelines, and inertial smooth scrolling. |
| **Image CDN** | **Cloudinary** | Dynamic responsive image optimization (`f_auto,q_auto`), format conversion, and bandwidth caching. |
| **Backend / DB** | **Supabase (PostgreSQL)** | High-performance relational database with row-level security (RLS) for product catalogue and inventory. |
| **Hosting & CI/CD** | **Vercel + GitHub** | Edge network deployment, automated preview environments, instant cache purging. |
| **Design & Dev** | **Figma + Google Antigravity** | High-fidelity UI design and pair-programming agentic development. |

---

## 2. Development Principles & Code Standards

1. **Strict TypeScript**: No `any` types. All domain models, component props, and API payloads are strictly typed.
2. **Server Components by Default**: All catalogue grids, brand indexes, and static editorial content render as React Server Components (RSC) to maximize SEO and minimize client bundle size.
3. **Client Components Only When Interactive**: Restrict `"use client"` exclusively to components requiring event listeners (e.g. size pill selectors, search inputs, mobile filter drawers, image lightboxes).
4. **Clean Separation of Concerns**: Separation between presentation UI (`/components`), configuration constants (`/constants`), business logic helpers (`/lib`), and domain types (`/types`).
5. **No E-Commerce Checkout Modules**: Strictly prohibit shopping cart state, checkout funnels, and payment gateway keys.

---

## 3. Project Directory Structure

The project conforms to the approved Next.js structure:

```
iNESTYL-OUTLET/
│
├── public/
│   ├── brand/                        # Official vector SVGs, PNGs, and favicons
│   │   └── packaging/                # Shopping bag, price tag, thank-you card mockups
│   ├── images/                       # Static imagery
│   │   ├── hero/                     # Hero banners and sandstone plinths
│   │   ├── products/                 # Clean sneaker and apparel cutouts
│   │   ├── categories/               # Footwear and apparel category cards
│   │   ├── brands/                   # Partner brand textured cards
│   │   └── campaigns/                # Editorial lookbooks
│   ├── fonts/                        # Local font fallbacks
│   └── icons/                        # PWA and browser icons
│
├── src/
│   ├── app/                          # Next.js App Router routes
│   │   ├── layout.tsx                # Root layout with fonts, header, and footer
│   │   ├── globals.css               # Global Tailwind directives & token variables
│   │   ├── page.tsx                  # Future Phase 2: Homepage
│   │   ├── footwear/                 # Future Phase 3: Footwear catalogue
│   │   ├── apparel/                  # Future Phase 4: Apparel catalogue
│   │   ├── brands/                   # Future Phase 5: Brands directory
│   │   ├── new-arrivals/             # Future Phase 7: New drops
│   │   ├── product/                  # Future Phase 6: Product details
│   │   ├── about/                    # Future Phase 7: Brand story & authenticity
│   │   └── contact/                  # Future Phase 7: Store location & enquiry form
│   │
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # Base primitives (shadcn)
│   │   ├── layout/                   # Header, AnnouncementBar, Footer, MobileNav
│   │   ├── home/                     # HeroSection, CategorySection, BrandTicker
│   │   ├── products/                 # ProductCard, PriceDisplay, SizeSelector, StockBadge
│   │   ├── brands/                   # BrandCard, BrandDirectoryGrid
│   │   └── shared/                   # SectionHeader, TrustPillars, WhatsAppButton
│   │
│   ├── config/                       # Site metadata and third-party configuration
│   ├── constants/                    # Brand colors, store address, contact details
│   ├── hooks/                        # Custom React hooks (useMediaQuery, useReducedMotion)
│   ├── lib/                          # Utility functions (whatsapp.ts, utils.ts)
│   ├── services/                     # Supabase & Cloudinary client services
│   ├── types/                        # TypeScript domain interfaces
│   └── styles/                       # CSS tokens and presets
│
├── docs/                             # 10 comprehensive documentation manuals
│
├── .env.example                      # Environment variables template
├── components.json                   # shadcn/ui configuration
├── next.config.ts                    # Next.js build configuration
├── package.json                      # Dependencies and npm scripts
├── tsconfig.json                     # Strict TypeScript compiler options
└── README.md                         # Project documentation and setup guide
```

---

## 4. Future Supabase Database Schema (Preview)

```sql
-- Brands Table
CREATE TABLE brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('footwear', 'apparel')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products Table (Catalogue only, no checkout dependencies)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  sku TEXT NOT NULL UNIQUE,
  gender TEXT CHECK (gender IN ('men', 'women', 'unisex')),
  mrp_price NUMERIC(10, 2) NOT NULL,
  outlet_price NUMERIC(10, 2) NOT NULL,
  discount_percent INT GENERATED ALWAYS AS (ROUND(((mrp_price - outlet_price) / mrp_price) * 100)) STORED,
  description TEXT,
  features TEXT[],
  images TEXT[] NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_new_arrival BOOLEAN DEFAULT false,
  is_in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Product Size Variants & Live Store Stock
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  size_label TEXT NOT NULL, -- e.g. 'UK 7', 'UK 8', 'M', 'L'
  stock_quantity INT DEFAULT 1,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Store Enquiries Log
CREATE TABLE store_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  customer_name TEXT,
  customer_phone TEXT,
  size_requested TEXT,
  channel TEXT CHECK (channel IN ('whatsapp', 'form', 'store_visit')),
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 5. WhatsApp Enquiry Link Dispatcher

The core conversion engine formats user product inquiries into direct WhatsApp messages for the Kapadwanj store team:

```typescript
// src/lib/whatsapp.ts
export interface WhatsAppEnquiryParams {
  productTitle: string;
  brandName: string;
  outletPrice: number;
  sizeSelected?: string;
  sku?: string;
  storePhoneNumber?: string;
}

export function generateWhatsAppEnquiryUrl({
  productTitle,
  brandName,
  outletPrice,
  sizeSelected,
  sku,
  storePhoneNumber = "919876543210",
}: WhatsAppEnquiryParams): string {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(outletPrice);

  let message = `Hello iNESTYL OUTLET,\n\nI am interested in:\n• Product: ${brandName} ${productTitle}\n• Outlet Price: ${formattedPrice}`;

  if (sizeSelected) {
    message += `\n• Size: ${sizeSelected}`;
  }
  if (sku) {
    message += `\n• SKU: ${sku}`;
  }

  message += `\n\nCould you please confirm live availability at your Kapadwanj outlet? Thank you!`;

  return `https://wa.me/${storePhoneNumber}?text=${encodeURIComponent(message)}`;
}
```
