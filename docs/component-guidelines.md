# iNESTYL OUTLET — UI Component Guidelines
*Version 1.0.0 — Reusable Component Specifications & Interactive States*

---

## 1. Button Components

Buttons in **iNESTYL OUTLET** prioritize high-contrast clarity, rounded-pill luxury geometry, and distinct interactive feedback:

```
┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     Explore Collection  →       │   │     Enquire on WhatsApp  💬     │
└─────────────────────────────────┘   └─────────────────────────────────┘
         (Primary Black)                        (WhatsApp Action)

┌─────────────────────────────────┐   ┌─────────────────────────────────┐
│     Check Store Availability    │   │     View All Categories  →      │
└─────────────────────────────────┘   └─────────────────────────────────┘
       (Secondary Outlined)                        (Text Button)
```

### A. Primary Black Button (`.btn-primary`)
- **Default State**: Background `#111111`, Text `#FFFFFF`, 1px solid `#111111`, Radius `9999px` (Pill), Padding `14px 28px`, Font `Inter SemiBold 14px`.
- **Hover State**: Background `#262626`, Border `#262626`, `translateY(-1px)`, Shadow `0 4px 14px rgba(17, 17, 17, 0.12)`.
- **Active State**: Background `#000000`, `translateY(0px)`, Shadow `none`.
- **Focus State**: `outline: none`, `ring-2 ring-brand-gold ring-offset-2`.

### B. Secondary Outlined Button (`.btn-secondary`)
- **Default State**: Background `transparent`, Text `#111111`, 1px solid `#D8D0C5`, Radius `9999px`, Padding `14px 28px`.
- **Hover State**: Background `#EAE3D9`, Border `#111111`, Text `#111111`.
- **Active State**: Background `#D8D0C5`.
- **Focus State**: `ring-2 ring-brand-black ring-offset-2`.

### C. WhatsApp Enquiry Action Button (`.btn-whatsapp`)
- **Role**: Primary lead conversion driver replacing traditional checkout triggers.
- **Default State**: Background `#111111`, Text `#FFFFFF`, Lucide `MessageCircle` icon (18px), Radius `9999px`, Padding `14px 28px`.
- **Hover State**: Background `#000000`, `box-shadow: 0 6px 20px rgba(37, 211, 102, 0.25)`, `translateY(-1px)`.
- **Action**: Opens pre-populated WhatsApp chat with Kapadwanj store line.

### D. Text Link Button (`.btn-text`)
- **Default State**: Background `transparent`, Border `none`, Text `#111111`, Font `Inter SemiBold 14px`, inline with a right arrow icon (`→`).
- **Hover State**: Horizontal gap expands from `6px` to `10px`, color deepens to `#000000`.

### E. Icon Button (Search, Filter, Mobile Menu)
- **Geometry**: 44px × 44px circular or rounded-lg button.
- **Default State**: Background `transparent`, Text `#111111`, 1px solid `#D8D0C5`.
- **Hover State**: Background `#F4EFE7`, Border `#111111`.

---

## 2. Navigation Components

### A. Top Announcement Bar
- **Surface**: Primary Black (`#111111`) or Warm Ivory (`#F4EFE7`).
- **Left Content**: `Original Brands | Outlet Prices | Visit Our Store`.
- **Right Content**: Pin icon + `Kapadwanj, Gujarat` • `Mon - Sun: 10:00 AM - 9:00 PM`.

### B. Sticky Desktop Header
- **Surface**: Warm Ivory (`#F4EFE7`) with 90% blur backdrop filter (`backdrop-blur-md`).
- **Height**: `76px`.
- **Left**: `iNESTYL OUTLET` logo mark.
- **Center**: Navigation links (`Home`, `Footwear ▾`, `Apparel ▾`, `Brands`, `New Arrivals`, `About Us`, `Contact`).
- **Right**: Search trigger icon + "Enquire Now" black pill button.
- **Sticky Elevation**: On scroll past 100px, gains a 1px border (`#D8D0C5`) and `0 4px 20px rgba(17,17,17,0.04)` shadow.

### C. Dropdown Menu Treatment
- **Surface**: Pure White (`#FFFFFF`), Border 1px `#D8D0C5`, Radius `12px`, Shadow `0 10px 30px rgba(17,17,17,0.08)`.
- **Items**: Categorized columns (e.g. Footwear: Running, Sneakers, Training, Casual).

### D. Mobile Navigation Drawer
- **Trigger**: Hamburger icon button (`Menu`) in mobile header.
- **Drawer**: Slide-out from right, covering 85% of mobile viewport, surface Warm Ivory (`#F4EFE7`), full vertical navigation links, store operating hours, and direct "Call Store" & "WhatsApp Us" triggers.

---

## 3. Product Catalogue Components

```
┌──────────────────────────────────────────────┐
│  ┌────────────────────────────────────────┐  │
│  │                                        │  │
│  │         [ Product Photography ]        │  │
│  │         Clean silhouette cutout        │  │
│  │                                        │  │
│  └────────────────────────────────────────┘  │
│  NIKE                                        │
│  Nike Air Max 270 Lifestyle                  │
│                                              │
│  ₹8,995   MRP ₹12,995   [31% OFF]            │
│                                              │
│  ● In Stock                 Sizes: 7, 8, 9   │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │         Enquire on WhatsApp  💬        │  │
│  └────────────────────────────────────────┘  │
└──────────────────────────────────────────────┘
```

1. **Product Image Container**:
   - Aspect ratio: `1:1` (Footwear) or `4:5` (Apparel).
   - Surface: Pure White (`#FFFFFF`) or Warm Ivory Tint (`#FAF8F5`).
   - Hover behavior: Subtle scale zoom (`scale: 1.04`) with 350ms ease-out transition.
2. **Brand Eyebrow Label**:
   - Uppercase tracked (`0.14em`), font size `11px`, font-weight `700`, color `#777777`.
3. **Product Title**:
   - Font `Inter Medium 16px`, color `#111111`, line-clamp 2.
4. **Pricing Row**:
   - Outlet Price: Bold `18px`, color `#111111`.
   - Retail MRP: Regular `14px`, color `#777777`, strikethrough.
   - Discount Badge: Container in `#FDF9F2` with `#C6A15B` text and subtle gold border (`31% OFF`).
5. **Stock Indicator Badge**:
   - In Stock: 7px green dot (`#2E7D32`) + "In Stock at Kapadwanj".
   - Low Stock: 7px amber dot (`#E65100`) + "Few Left in Store".
   - Out of Stock: 7px gray dot (`#777777`) + "Enquire for Restock".
6. **Size Pill Selector**:
   - 38px × 38px rounded-lg pill buttons.
   - States: Inactive (`#FFFFFF` with `#D8D0C5` border), Selected (`#111111` with `#FFFFFF` text), Unavailable (diagonally struck-through, `#F4EFE7` background).

---

## 4. Form & Filter Elements

1. **Search Input**:
   - Pill container with Lucide `Search` icon at left padding.
   - Border 1px `#D8D0C5`, focus ring in `#111111` or `#C6A15B`.
2. **Filter Controls**:
   - Checkbox: 18px × 18px rounded-sm, black fill with white checkmark when active.
   - Category Pills: Rounded-full badges with subtle border; click toggles selection.
3. **Store Enquiry Form Input**:
   - Padding `14px 18px`, border 1px `#D8D0C5`, radius `8px`, focus border `#111111`.

---

## 5. Section Headers & Trust Pillars

1. **Section Header**:
   - Layout: Section title (`Manrope Bold 32px`) flanked on right by a 40px Champagne Gold horizontal rule (`#C6A15B`), with an optional "View All →" editorial link on the far right.
2. **Trust Pillars Grid**:
   - 4-column layout showcasing:
     1. `100% Original` (ShieldCheck icon)
     2. `Outlet Prices` (Tag icon)
     3. `Visit Our Store` (Store icon)
     4. `Easy Enquiry` (MessageCircle icon)
   - Surface: Pure White cards with subtle 1px `#EAE3D9` border.
