# iNESTYL OUTLET — Enterprise Monorepo Architecture
## Decoupled Public Storefront + Private Admin Management Console

**iNESTYL OUTLET** is an omnichannel discovery index and multi-brand outlet catalogue for verified authentic footwear (Nike, Puma, adidas, HOKA) and apparel (Levi's, DIESEL, U.S. Polo Assn.) located at Station Road, Kapadwanj, Gujarat.

> **CRITICAL BUSINESS MODEL NOTICE**:  
> **This is NOT an e-commerce checkout website.**  
> The platform is intentionally architected as a **product catalogue, stock discovery index, and store enquiry portal**. There is no shopping cart, no checkout, and no payment processing. Customer enquiries are directed to **WhatsApp Concierge** or to our physical flagship store in **Kapadwanj, Gujarat**.

---

## 1. Monorepo Architecture (`pnpm` Workspaces)

```
inestyle-outlet/
│
├── apps/
│   ├── storefront/                 # Public Catalogue & Store Discovery (inestyle.vercel.app)
│   │   ├── src/
│   │   │   ├── app/                # Public Next.js 15 App Router pages & public APIs
│   │   │   ├── components/         # Luxury Apple-minimal storefront UI components
│   │   │   ├── features/           # Discovery, search, and enquiry modules
│   │   │   ├── hooks/              # Faceted filtering & URL sync hooks
│   │   │   ├── lib/                # Client-safe utilities & database repository access
│   │   │   └── styles/             # Global Tailwind stylesheets
│   │   ├── public/                 # Optimized assets & brand vectors
│   │   ├── next.config.ts          # Independent Next.js configuration & image domains
│   │   ├── vercel.json             # Independent Vercel deployment configuration
│   │   └── package.json            # @inestyle/storefront
│   │
│   └── admin/                      # Private Administrative Portal (admin.inestyle.com)
│       ├── src/
│       │   ├── app/                # Protected admin routes (/admin, /admin/login, 2FA, APIs)
│       │   ├── components/         # Dashboard tabs, modals, auth screens, data tables
│       │   ├── features/           # Products, inventory, media, navigation, enquiries
│       │   ├── hooks/              # Admin auth & table filtering hooks
│       │   ├── lib/                # Server session validation & Cloudinary SDK
│       │   ├── middleware.ts       # Server-side HttpOnly session gatekeeper
│       │   └── styles/             # Admin console themes & typography
│       ├── public/                 # Brand assets & dashboard favicons
│       ├── next.config.ts          # Independent Next.js configuration & security headers
│       ├── vercel.json             # Independent Vercel deployment configuration
│       └── package.json            # @inestyle/admin
│
├── packages/
│   ├── database/                   # Unified durable persistence layer (PostgreSQL / atomic file DB)
│   ├── shared-types/               # Domain interfaces (Product, Brand, Enquiry, Session, etc.)
│   ├── validations/                # Zod validation contracts (product, login, enquiry, 2FA)
│   ├── shared-utils/               # Cloudinary CDN transformations, INR currency, PBKDF2 crypto, cn
│   ├── api-client/                 # Resilient HTTP client with retry logic & error taxonomy
│   ├── config/                     # Flagship store parameters, business hours, default menus & seed data
│   └── ui/                         # Shared UI primitives (loaders, toasts, buttons, dialogs)
│
├── scripts/
│   ├── verify-monorepo.js          # Architecture separation & regression test runner
│   ├── test-regression.js          # Route regression test
│   └── update-image-references.ts  # Cloudinary asset synchronizer
│
├── package.json                    # Monorepo root scripts & dev dependencies
├── pnpm-workspace.yaml             # pnpm workspace definition (apps/*, packages/*)
├── tsconfig.base.json              # Shared TypeScript path alias foundation
├── tsconfig.json                   # Root TypeScript project reference
├── .env.example                    # Complete environment variables guide
└── .gitignore                      # Git exclusion rules
```

---

## 2. Independent Applications

### A. Public Storefront (`apps/storefront`)
- **Suggested Domain**: `inestyle.vercel.app`
- **Port (Local)**: `http://localhost:3000`
- **Scope**:
  - Full product catalog discovery & faceted filtering (Footwear, Apparel, Brands, Collections).
  - Editorial Curations: The Inestyle Edit, New Arrivals Drop, Trend Spotlights.
  - Product Detail Pages: High-resolution Cloudinary imagery, size selector, real-time store stock availability indicator.
  - WhatsApp Concierge deep-linking and store enquiry dispatching.
  - Station Road, Kapadwanj flagship store guide, timings, and location.
  - Zero cart, zero checkout, zero admin code or secrets in client bundle.

### B. Private Admin Console (`apps/admin`)
- **Suggested Domain**: `admin.inestyle.com`
- **Port (Local)**: `http://localhost:3001`
- **Scope**:
  - Full catalogue management: Product CRUD, batch price adjustments, collection assignment, CSV import/export.
  - Footwear & Apparel inventory matrix with low-stock thresholds.
  - Cloudinary Digital Asset Management: Direct image uploads, folder browsing, asset tagging, and CDN delivery preview.
  - Navigation & Mega-Menu Manager: Re-order and toggle header/footer links in real time.
  - Store Enquiries & Customer CRM: Track incoming customer requests from WhatsApp and web forms.
  - Enterprise Security: Salted PBKDF2 password verification, optional 2FA OTP challenges, rate-limiting lockout protection, and immutable audit logs.

---

## 3. Getting Started & Development

### Prerequisites
- Node.js >= 20.x
- `pnpm` >= 9.x

### Installation
```bash
# Install workspace dependencies
pnpm install
```

### Running Applications
```bash
# Run both Storefront and Admin in parallel
pnpm dev

# Run Storefront only (http://localhost:3000)
pnpm dev:storefront

# Run Admin Dashboard only (http://localhost:3001)
pnpm dev:admin
```

### Independent Production Builds
```bash
# Build both applications
pnpm build

# Build Storefront independently
pnpm build:storefront

# Build Admin independently
pnpm build:admin
```

### Type Checking & Regression Verification
```bash
# Typecheck across all workspace packages and apps
pnpm typecheck

# Run architectural boundary & regression test suite
node scripts/verify-monorepo.js
```

---

## 4. Environment Variables

Copy `.env.example` to `.env.local` in `apps/storefront` and `apps/admin`:

```bash
# Storefront (apps/storefront/.env.local)
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_PHONE=919876543210
NEXT_PUBLIC_STORE_LOCATION="Station Road, Kapadwanj, Gujarat 387620"
NEXT_PUBLIC_STORE_HOURS="Mon - Sun: 10:00 AM - 9:00 PM"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=egjn8ayb

# Admin (apps/admin/.env.local)
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
NEXT_PUBLIC_STOREFRONT_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=egjn8ayb
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=egjn8ayb
```

---

## 5. Security Architecture

1. **Role-Based Access Control (RBAC)**: Supports `super_admin`, `admin`, and `inventory_manager` roles.
2. **HttpOnly Session Cookies**: Session tokens are stored in `SameSite=Lax`, `HttpOnly` cookies (`inestyl_admin_session`).
3. **Dedicated Admin Middleware**: Intercepts unauthenticated page requests and redirects to `/admin/login?returnUrl=...`. API requests without valid sessions return `401 Unauthorized`.
4. **Secret Isolation**: Cloudinary API secret and admin database service tokens are strictly isolated in `apps/admin` and never exposed to the Storefront application bundle.
