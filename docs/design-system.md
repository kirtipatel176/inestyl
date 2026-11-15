# iNESTYL OUTLET — Reusable Design System Specification
*Version 1.1.0 — Phase 1 Reusable UI & Design Token Foundation*

---

## 1. Design System Philosophy & Core Pillars

The **iNESTYL OUTLET** design system is engineered around editorial luxury and transparent outlet discovery:

1. **White & Ivory-First Interface (70%)**: Generous negative space using Warm Ivory (`#F4EFE7`) and Pure White (`#FFFFFF`) eliminates discount visual clutter and lets footwear silhouettes take center stage.
2. **High-Contrast Black Typography (25%)**: Primary Black (`#111111`) ensures crystal-clear readability, sharp editorial hierarchy, and confident action triggers.
3. **Restrained Champagne Gold Accents (5%)**: Champagne Gold (`#C6A15B`) is reserved for the signature dot on 'i', `OUTLET` framing lines, subtle discount tags, and active states.
4. **Minimal Borders over Heavy Cards**: Favor clean 1px hairline borders (`#EAE3D9` / `#D8D0C5`) over heavy drop shadows and card containers.
5. **No E-Commerce Transactional Elements**: The interface contains no shopping carts, no checkout buttons, and no payment gateways.

---

## 2. Official Colour Palette Specifications

```
┌─────────────────────────────────────────────────────────────┬───────────────┬──────┐
│                  70% WARM IVORY & WHITE                     │   25% BLACK   │5% GLD│
│             #F4EFE7 (35%)   +   #FFFFFF (35%)               │    #111111    │#C6A15B│
└─────────────────────────────────────────────────────────────┴───────────────┴──────┘
```

| Swatch | Color Name | Hex Code | RGB | CMYK | Usage & UI Roles |
| :---: | :--- | :---: | :---: | :---: | :--- |
| ![#111111](https://via.placeholder.com/16/111111/000000?text=+) | **Primary Black** | `#111111` | `(17, 17, 17)` | `(0, 0, 0, 93)` | **25%** — Primary typography, primary buttons, dark announcement bars, strong contrast boundaries. |
| ![#F4EFE7](https://via.placeholder.com/16/F4EFE7/000000?text=+) | **Warm Ivory** | `#F4EFE7` | `(244, 239, 231)` | `(0, 2, 5, 4)` | **35%** — Primary canvas background, editorial section breaks, stone plinths. |
| ![#FFFFFF](https://via.placeholder.com/16/FFFFFF/000000?text=+) | **Pure White** | `#FFFFFF` | `(255, 255, 255)` | `(0, 0, 0, 0)` | **35%** — Product card surfaces, input backgrounds, modal surfaces. |
| ![#C6A15B](https://via.placeholder.com/16/C6A15B/000000?text=+) | **Champagne Gold**| `#C6A15B` | `(198, 161, 91)` | `(0, 19, 54, 22)` | **5%** — Square dot on 'i', `OUTLET` flanking rules, discount percentage badges, active pagination. |
| ![#EAE3D9](https://via.placeholder.com/16/EAE3D9/000000?text=+) | **Supporting Cream**| `#EAE3D9` | `(234, 227, 217)` | `(0, 3, 7, 8)` | Secondary borders, card divider rules, pill backgrounds. |
| ![#D8D0C5](https://via.placeholder.com/16/D8D0C5/000000?text=+) | **Supporting Border**| `#D8D0C5` | `(216, 208, 197)` | `(0, 4, 9, 15)`| Form input outlines, secondary button borders, table dividers. |
| ![#777777](https://via.placeholder.com/16/777777/000000?text=+) | **Muted Charcoal**| `#777777` | `(119, 119, 119)` | `(0, 0, 0, 53)`| Strikethrough retail MRP prices, secondary captions, metadata. |

---

## 3. Layout, Grid & Spatial Rhythm

### Container Widths
- **Maximum Content Width**: `1380px` (`max-w-[1380px]` / `max-w-content`)
- **Narrow Editorial Width**: `1040px` (`max-w-[1040px]`)
- **Horizontal Container Padding**:
  - Desktop ($>1024\text{px}$): `48px`
  - Tablet ($768\text{px} - 1023\text{px}$): `32px`
  - Mobile ($<768\text{px}$): `20px`

### Responsive Grid System
| Device Class | Viewport Range | Columns | Gutter | Margins |
| :--- | :---: | :---: | :---: | :---: |
| **Desktop / Wide** | $1280\text{px} - 1920\text{px}+$ | 12 Columns | `32px` | `48px` |
| **Tablet** | $768\text{px} - 1023\text{px}$ | 8 Columns | `24px` | `32px` |
| **Mobile** | $360\text{px} - 767\text{px}$ | 4 Columns | `16px` | `20px` |

### Vertical Rhythm
- **Hero & Primary Section Gaps**: `112px` (Desktop) / `64px` (Mobile)
- **Standard Section Stacking**: `80px` (Desktop) / `48px` (Mobile)
- **Sub-group Spacing**: `40px` (Heading to Content Grid)
- **Card Internal Padding**: `20px`

---

## 4. Borders, Elevation & Surface Treatments

- **Minimal Borders**: Rely primarily on 1px crisp borders in `#EAE3D9` (Cream) or `#D8D0C5` (Warm Gray) rather than heavy drop shadows.
- **Card Containers**: Keep card containers lightweight with pure white surfaces and 14px border radius.
- **Elevation Shadow Scale**:
  - `shadow-none`: Default flat surface state.
  - `shadow-subtle` (`0 2px 10px rgba(17, 17, 17, 0.04)`): Inputs, sticky header, dropdowns.
  - `shadow-card` (`0 6px 24px rgba(17, 17, 17, 0.06)`): Active filter drawers, store enquiry modals.
  - `shadow-hover` (`0 12px 32px rgba(17, 17, 17, 0.08)`): Product card hover state.

---

## 5. Iconography Guidelines (Lucide React)

- **Library**: `lucide-react`.
- **Stroke Width**: Consistent **`1.5px`** across all standard components (`1.75px` on small 16px viewports).
- **Style Consistency**: Clean monochrome line icons only. Never mix filled, cartoon, or multicolored icon styles.
- **Approved Icon Core**:
  - `Search` (Catalogue search trigger)
  - `MessageCircle` (WhatsApp enquiry trigger)
  - `MapPin` (Kapadwanj flagship store locator)
  - `Clock` (Store operating hours)
  - `Phone` (Direct telephone line)
  - `ChevronDown` (Dropdown menus)
  - `ArrowRight` (Editorial links)
  - `ShieldCheck` (100% Original authenticity badge)
  - `Tag` (Outlet pricing)
  - `Store` (Physical outlet visit)
  - `SlidersHorizontal` (Filter controls)
