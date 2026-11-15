# iNESTYL OUTLET — Comprehensive Project Roadmap
*Sequential Milestones: Phase 1 through Phase 9*

---

## 1. Roadmap Architecture & Execution Philosophy

The development of **iNESTYL OUTLET** is governed by a strict sequential milestone model. Progression requires formal review and explicit client sign-off at each stage:

```
PHASE 1 (COMPLETED) ──► PHASE 2 ──► PHASE 3 ──► PHASE 4 ──► PHASE 5
Brand & Design          Homepage    Footwear    Apparel     Brands
Foundation                          Listing     Listing     Directory
                                                               │
PHASE 9 ◄── PHASE 8 ◄── PHASE 7 ◄── PHASE 6 ◄──────────────────┘
Motion &    Responsive  Supporting  Product
Deployment  Polish      Pages       Detail
```

---

## 2. Detailed Milestone Specifications

### Phase 1: Brand Identity, Design System & Project Foundation
**Status: COMPLETED (Current Milestone)**
- **Scope**: Complete visual identity, vector logo system, 70-25-5 color system, typography scale, component guidelines, responsive rules, technical architecture, and physical packaging mockups.
- **Key Deliverables**:
  - Vector asset library in `public/brand/` (Stacked, Horizontal, Monogram, Favicon).
  - Physical packaging mockups in `public/brand/packaging/` (Shopping Bag, Price Tag, Thank-You Card).
  - Complete 10-document manual suite in `docs/`.
  - Machine-readable `design-system/tokens.json`, `tailwind-preset.js`, and `theme.css`.
  - Initial project skeleton (`package.json`, `tsconfig.json`, `next.config.ts`, `components.json`, `.env.example`).
  - Interactive HTML preview showcase in `preview/index.html`.
- **Exit Criteria**: Explicit client review and formal approval to proceed to Phase 2.

---

### Phase 2: Homepage Development
**Status: PENDING CLIENT APPROVAL**
- **Scope**: Construct the primary brand gateway and catalogue landing page.
- **Key Deliverables**:
  - Top announcement bar with store location ("Kapadwanj, Gujarat") and operating hours.
  - Sticky editorial header with logo, navigation dropdowns, search trigger, and "Enquire Now" pill button (NO cart icon).
  - Hero campaign section: Multi-brand product staging on limestone plinth, bold Manrope typography, and "Explore Collection →" CTA.
  - Partner brand monochrome logo ticker (Nike, Puma, adidas, HOKA, Levi's, DIESEL, U.S. Polo Assn.).
  - "Shop by Category" curated cards for Footwear and Apparel.
  - "Featured Brands" grid with textured dark cards.
  - "New Arrivals" drop banner.
  - Four Trust Pillars (100% Original, Outlet Prices, Visit Our Store, Easy Enquiry).
  - Editorial footer with store coordinates, operational hours, and WhatsApp enquiry links.

---

### Phase 3: Footwear Catalogue & Filter Engine
**Status: PLANNED**
- **Scope**: Build the dedicated multi-brand footwear discovery page.
- **Key Deliverables**:
  - Breadcrumbs (`Home / Footwear`) and live product count.
  - Multi-attribute filter sidebar / drawer: Brand, Category (Sneakers, Running, Lifestyle, Training), Size (UK 6–11), and Price range.
  - 4-column responsive product card grid featuring clean product cutouts, outlet prices, strikethrough MRPs, and live stock badges.
  - Instant WhatsApp enquiry pre-fill from catalogue cards.

---

### Phase 4: Apparel Catalogue & Sizing Matrix
**Status: PLANNED**
- **Scope**: Build the multi-brand apparel discovery page.
- **Key Deliverables**:
  - Apparel category tabs: All, T-Shirts, Jeans & Denim, Jackets & Outerwear, Hoodies.
  - Sizing matrix (XS, S, M, L, XL, XXL / Waist 28–38).
  - High-fashion editorial lookbook banner demonstrating fabric drape and fit.
  - 4-column product grid optimized for `4:5` vertical photography.

---

### Phase 5: Brands Directory & Brand Landing Pages
**Status: PLANNED**
- **Scope**: Comprehensive brand directory and individual brand hubs.
- **Key Deliverables**:
  - Alphabetical brand directory (`A–Z`).
  - Individual brand hubs (`/brands/nike`, `/brands/levis`): Heritage story, authenticity guarantee, and curated brand inventory.

---

### Phase 6: Product Detail & Store Availability Engine
**Status: PLANNED**
- **Scope**: High-conversion individual product discovery sheets.
- **Key Deliverables**:
  - Multi-angle image gallery (5-shot library) with thumbnail carousel and zoom inspection.
  - Prominent Outlet Price display alongside strikethrough MRP and savings badge.
  - Interactive Size Selector with stock availability per size.
  - **Primary Action: "Enquire on WhatsApp"** button generating detailed product inquiry.
  - **Secondary Action: "Check Store Availability"** modal with Kapadwanj store phone line and directions.
  - "Similar Outlet Styles" carousel.

---

### Phase 7: Supporting Pages & Retail Destination
**Status: PLANNED**
- **Scope**: Essential trust, story, and retail destination pages.
- **Key Deliverables**:
  - **About Us**: The iNESTYL story, outlet sourcing model, and 100% authenticity guarantee.
  - **Visit Our Store**: Interactive Kapadwanj map, driving directions, store interior photography, and in-store payment methods (Cash, Cards, UPI at store).
  - **Contact & Enquiry**: Enquiry form and WhatsApp QR code.
  - **New Arrivals**: Filtered catalogue feed.

---

### Phase 8: Mobile-First Responsive Optimization & Cross-Browser QA
**Status: PLANNED**
- **Scope**: Comprehensive responsiveness and performance audits.
- **Key Deliverables**:
  - Mobile bottom navigation bar (`Home`, `Footwear`, `Apparel`, `Store`, `Enquire`).
  - Performance audit: Sub-second First Contentful Paint (FCP) and 95+ Google Lighthouse scores across Performance, Accessibility, Best Practices, and SEO.
  - Cross-browser verification across Safari iOS, Chrome Android, Safari macOS, Chrome desktop, and Firefox.

---

### Phase 9: Motion, Interaction Polish & Production Launch
**Status: PLANNED**
- **Scope**: Final luxury motion tuning and Vercel edge deployment.
- **Key Deliverables**:
  - GSAP / Framer Motion hero staggered text reveals and Lenis inertial scrolling.
  - Reduced-motion verification.
  - Production readiness checklist and automated CI/CD pipeline on Vercel.
