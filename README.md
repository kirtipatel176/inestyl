# iNESTYL OUTLET — Phase 1 Deliverables
## Complete Brand Identity + Design System + Technical Foundation

**iNESTYL OUTLET** is a premium multi-brand footwear and apparel outlet offering 100% original, authentic branded products (Nike, Puma, adidas, HOKA, Levi's, DIESEL, U.S. Polo Assn.) at attractive outlet value.

> **CRITICAL BUSINESS MODEL NOTICE**:  
> **This is NOT an e-commerce checkout website.**  
> The system is intentionally architected as a **product catalogue, stock discovery index, and store enquiry portal**. There is no shopping cart, no checkout, and no payment processing. Customer enquiries are directed to **WhatsApp** or to our physical flagship outlet store in **Kapadwanj, Gujarat**.

---

## Phase 1 Deliverables Directory Structure

```
IneStyl/
├── docs/                                  # 10 Comprehensive Documentation Manuals
│   ├── brand-guidelines.md                # Brand positioning, target audience, retail packaging
│   ├── logo-guidelines.md                 # Geometric mark anatomy, variations, clear space, dos & don'ts
│   ├── design-system.md                   # 70-25-5 palette, layout, elevation, Lucide iconography
│   ├── typography-guidelines.md           # Manrope & Inter typographic scale, pricing typography
│   ├── photography-guidelines.md          # Sneaker & apparel photo direction, 5-shot angle library
│   ├── animation-guidelines.md            # Motion philosophy, Framer Motion, GSAP, timing curves
│   ├── technical-architecture.md          # Next.js App Router, Supabase schema, Cloudinary, WhatsApp dispatcher
│   ├── component-guidelines.md            # Reusable UI component specs (Buttons, Cards, Inputs, Pills)
│   ├── responsive-guidelines.md           # Breakpoints (1440px, 1280px, 768px, 390px), touch targets
│   └── phase-roadmap.md                   # Phase 1 through Phase 9 project roadmap & milestone criteria
├── public/
│   ├── brand/                             # Scalable Vector Graphics & High-Resolution PNG Exports
│   │   ├── logo-primary-stacked.svg       # Master stacked logo (Black & Gold on Transparent)
│   │   ├── logo-primary-stacked-dark.svg  # Master inverted stacked logo (White & Gold)
│   │   ├── logo-primary-stacked-light.svg # Master stacked logo on Warm Ivory (#F4EFE7)
│   │   ├── logo-horizontal.svg            # Horizontal navbar logo lockup
│   │   ├── logo-horizontal-dark.svg       # Inverted horizontal logo lockup
│   │   ├── logo-horizontal-light.svg      # Horizontal logo lockup on Warm Ivory
│   │   ├── logo-monogram.svg              # 'iN' monogram icon with gold underline
│   │   ├── logo-monogram-dark.svg         # Inverted 'iN' monogram icon
│   │   ├── logo-monogram-light.svg        # 'iN' monogram icon on Warm Ivory
│   │   ├── favicon.svg                    # Scalable vector favicon
│   │   ├── favicon.ico                    # Multi-resolution browser icon (32x32)
│   │   ├── logo-primary-stacked.png       # 1460x500 Transparent high-res raster
│   │   ├── logo-primary-stacked-dark.png  # 1460x500 Transparent inverted raster
│   │   ├── logo-horizontal.png            # 1800x260 Transparent horizontal raster
│   │   ├── logo-monogram.png              # 512x512 App Icon / Social Avatar
│   │   ├── favicon-180x180.png            # Apple Touch Icon
│   │   └── packaging/                     # Physical Retail Packaging Mockups
│   │       ├── shopping-bag-mockup.svg    # 240gsm craft shopping bag with gold foil accent
│   │       ├── price-tag-mockup.svg       # 350gsm hang tag with outlet pricing & WhatsApp QR
│   │       └── thank-you-card-mockup.svg  # A6 black-and-gold foil customer thank-you card
│   ├── images/                            # Static asset placeholder trees
│   │   ├── hero/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brands/
│   │   └── campaigns/
│   ├── fonts/
│   └── icons/
├── src/                                   # Clean Next.js Skeleton Architecture
│   ├── app/
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── products/
│   │   ├── brands/
│   │   └── shared/
│   ├── config/
│   ├── constants/
│   │   └── index.ts
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── design-system/                         # Reusable Code Tokens & Presets
│   ├── tokens.json                        # Machine-readable design tokens (Colors, Typography, Spacing)
│   ├── tailwind-preset.js                 # Tailwind CSS configuration preset
│   └── theme.css                          # CSS custom properties and core utility classes
├── preview/
│   └── index.html                         # Interactive Brand Showcase & Design System Specimen
├── scripts/
│   ├── generate_brand_assets.py           # Vector extraction and raster generation pipeline
│   └── generate_packaging_assets.py       # Vector packaging mockup generator
├── .env.example                           # Environment configuration template
├── components.json                        # shadcn/ui configuration
├── next.config.ts                         # Next.js build configuration
├── package.json                           # Dependencies and scripts
├── tsconfig.json                          # Strict TypeScript configuration
└── README.md                              # Project overview
```

---

## The Official 70-25-5 Colour System

- **Warm Ivory & Pure White (70%)**: `#F4EFE7` and `#FFFFFF`
- **Primary Black (25%)**: `#111111`
- **Champagne Gold (5%)**: `#C6A15B`
- **Supporting Elements**: `#EAE3D9` (Cream), `#D8D0C5` (Border), `#777777` (Muted Charcoal)

---

## Typography Standards

- **Primary Headings**: Manrope (800 ExtraBold, 700 Bold, 600 SemiBold)
- **Body & Product Information**: Inter (400 Regular, 500 Medium)
- **Outlet Prices**: Inter SemiBold / Bold (700)
- **Logo Wordmark**: Preserved custom architectural geometric stencil typography

---

## Viewing the Interactive Visual Showcase

To view the interactive Brand Identity & Design System visual showcase:

1. Open [`preview/index.html`](preview/index.html) in any web browser.
2. Toggle between **Warm Ivory**, **Pure White**, and **Black** background themes.
3. Test interactive buttons, size pill selectors, search inputs, packaging mockups, and the authentic product card specimen.
4. Click on any color hex code to copy it directly to your clipboard.

---

## Phase Status

- **Phase 1: Brand Identity, Design System & Project Foundation** — **COMPLETED**
- **Phase 2: Homepage Development** — **AWAITING CLIENT APPROVAL**
# inestyl
