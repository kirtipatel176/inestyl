# iNESTYL OUTLET — Responsive Design Guidelines
*Version 1.0.0 — Multi-Device Adaptation & Mobile-First Standards*

---

## 1. Reference Viewports & Breakpoint System

The design system is calibrated across four primary hardware device classes:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        RESPONSIVE DEVICE CLASSES                       │
├─────────────────────┬──────────────────┬───────────────┬───────────────┤
│    DESKTOP WIDE     │      LAPTOP      │    TABLET     │    MOBILE     │
│       1440px        │      1280px      │     768px     │     390px     │
│   (12-Col Grid)     │   (12-Col Grid)  │  (8-Col Grid) │  (4-Col Grid) │
└─────────────────────┴──────────────────┴───────────────┴───────────────┘
```

| Breakpoint Key | Reference Width | Viewport Range | Core Layout Shift |
| :--- | :---: | :---: | :--- |
| **`2xl` (Desktop Wide)** | `1440px` | $\ge 1440\text{px}$ | Max container constrained to `1380px`, 4-column product grid, full filter sidebar. |
| **`xl` (Laptop)** | `1280px` | $1024\text{px} - 1439\text{px}$ | 12-column grid with `24px` gutters, 4-column product grid, sticky header. |
| **`md` (Tablet)** | `768px` | $768\text{px} - 1023\text{px}$ | 8-column grid, 3-column product grid, collapsible filter drawer sheet. |
| **`sm` (Mobile)** | `390px` | $360\text{px} - 767\text{px}$ | 4-column grid, 2-column product grid, mobile slide-over nav, bottom action bar. |

---

## 2. Responsive Typography Scaling

Headlines scale smoothly using CSS `clamp()` or standard Tailwind breakpoint steps:

| Level | Desktop ($1440\text{px}$) | Laptop ($1280\text{px}$) | Tablet ($768\text{px}$) | Mobile ($390\text{px}$) |
| :--- | :---: | :---: | :---: | :---: |
| **H1 Display** | `56px` | `48px` | `40px` | `32px` |
| **H2 Section** | `38px` | `32px` | `28px` | `24px` |
| **H3 Subsection** | `26px` | `24px` | `22px` | `20px` |
| **H4 Component** | `20px` | `18px` | `18px` | `16px` |
| **Body Large** | `18px` | `17px` | `16px` | `15px` |
| **Body Medium** | `15px` | `15px` | `14px` | `14px` |
| **Product Prices** | `18px` | `18px` | `16px` | `16px` |

---

## 3. Grid & Product Card Adaptations

```
DESKTOP (1440px): 4 Products per Row
┌────────────┬────────────┬────────────┬────────────┐
│  Product 1 │  Product 2 │  Product 3 │  Product 4 │
└────────────┴────────────┴────────────┴────────────┘

TABLET (768px): 3 Products per Row
┌────────────────┬────────────────┬────────────────┐
│   Product 1    │   Product 2    │   Product 3    │
└────────────────┴────────────────┴────────────────┘

MOBILE (390px): 2 Products per Row (High Efficiency)
┌──────────────────────┬──────────────────────┐
│      Product 1       │      Product 2       │
└──────────────────────┴──────────────────────┘
```

- **Desktop (1440px)**: 4-column grid (`grid-cols-4`, gap `28px`) flanked by a 280px sticky filter sidebar.
- **Tablet (768px)**: 3-column grid (`grid-cols-3`, gap `20px`), filter triggers in a horizontal pill bar opening a slide-out sheet.
- **Mobile (390px)**: 2-column compact grid (`grid-cols-2`, gap `12px`), maximizing vertical browsing efficiency without cramped readability.

---

## 4. Navigation & Header Mobile Transformation

- **Desktop & Laptop**:
  - Top announcement bar displays store location (`Kapadwanj, Gujarat`) and operating hours.
  - Sticky header displays stacked/horizontal logo, full horizontal nav links, search bar, and "Enquire Now" pill button.
- **Tablet & Mobile**:
  - Header compresses to `60px` height.
  - Logo scales to `logo-monogram.svg` or compact horizontal lockup.
  - Desktop nav links collapse into an accessible slide-over drawer triggered by a `Menu` icon button.
  - Sticky bottom quick-action bar appears on mobile screens:
    `[ Home ]  [ Footwear ]  [ Apparel ]  [ Store Visit ]  [ WhatsApp (Highlighted) ]`

---

## 5. Touch Targets & Mobile Ergonomics

1. **Minimum Touch Targets**: All interactive buttons, size pills, and navigation icons maintain a minimum hit area of **44px × 44px** to comply with WCAG 2.1 AAA touch standards.
2. **Thumb Zone Architecture**: Primary conversion triggers ("Enquire on WhatsApp") are placed within the natural ergonomic lower-third thumb zone on mobile viewports.
3. **Swipeable Carousels**: On touchscreens, category cards and multi-angle product thumbnails support native CSS scroll-snap with hardware acceleration (`touch-action: pan-x`).

---

## 6. Spacing & Padding Fluidity

```css
/* Container padding fluid clamp */
padding-left: clamp(16px, 4vw, 48px);
padding-right: clamp(16px, 4vw, 48px);

/* Section vertical spacing fluid clamp */
padding-top: clamp(48px, 8vw, 112px);
padding-bottom: clamp(48px, 8vw, 112px);
```
