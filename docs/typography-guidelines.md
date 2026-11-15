# iNESTYL OUTLET — Typography Guidelines & Font System
*Version 1.0.0 — Editorial Typographic Scale & Usage Standards*

---

## 1. Font Family Roles & Philosophy

The typography system pairs **Manrope** and **Inter** to achieve an editorial, architectural aesthetic that reflects high-fashion poise and modern athletic precision:

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│             MANROPE             │     │              INTER              │
│     (Primary Headings & Display)│     │  (Body, UI, Nav, Product & Price)│
├─────────────────────────────────┤     ├─────────────────────────────────┤
│ • Modern geometric neo-grotesque│     │ • Highly legible humanist sans  │
│ • Bold structural confidence    │     │ • Neutral editorial transparency│
│ • Architectural letterforms     │     │ • Superior micro-scale clarity  │
└─────────────────────────────────┘     └─────────────────────────────────┘
```

### Approved Font Roles
- **Headings & Display**: `Manrope` (Weights: `600`, `700`, `800`)
- **Body & Navigation**: `Inter` (Weights: `400`, `500`, `600`)
- **Product Titles**: `Inter Medium` (`500`)
- **Product Prices**: `Inter Bold` / `Inter SemiBold` (`700` / `600`)
- **Brand Logo**: Custom geometric stencil typography.

---

## 2. Complete Typographical Scale

| Level | Font & Weight | Desktop Size | Mobile Size | Line Height | Letter Spacing | CSS Utility |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **H1 Display** | Manrope 800 (ExtraBold) | `56px` | `34px` | `1.1` | `-0.02em` | `text-4xl md:text-6xl font-extrabold tracking-tight` |
| **H2 Section** | Manrope 700 (Bold) | `38px` | `26px` | `1.2` | `-0.015em` | `text-2xl md:text-4xl font-bold tracking-tight` |
| **H3 Subsection** | Manrope 600 (SemiBold) | `26px` | `22px` | `1.3` | `-0.01em` | `text-xl md:text-2xl font-semibold` |
| **H4 Component** | Manrope 600 (SemiBold) | `20px` | `18px` | `1.4` | `0em` | `text-lg font-semibold` |
| **Body Large** | Inter 400 (Regular) | `18px` | `16px` | `1.6` | `0em` | `text-base md:text-lg text-brand-black/90` |
| **Body Medium** | Inter 400 (Regular) | `15px` | `14px` | `1.6` | `0em` | `text-sm md:text-[15px] text-brand-black/80` |
| **Body Small** | Inter 400 (Regular) | `13px` | `12px` | `1.5` | `0.01em` | `text-xs md:text-sm text-brand-charcoal` |
| **Navigation** | Inter 500 (Medium) | `14px` | `14px` | `1.4` | `0.02em` | `text-sm font-medium tracking-wide` |
| **Button Text** | Inter 600 (SemiBold) | `14px` | `14px` | `1.2` | `0.02em` | `text-sm font-semibold tracking-wide` |
| **Product Title** | Inter 500 (Medium) | `16px` | `15px` | `1.35` | `-0.005em` | `text-[15px] md:text-base font-medium` |
| **Outlet Price** | Inter 700 (Bold) | `18px` | `16px` | `1.2` | `-0.01em` | `text-base md:text-lg font-bold text-brand-black` |
| **Retail MRP** | Inter 400 (Regular) | `14px` | `13px` | `1.2` | `0em` | `text-sm line-through text-brand-charcoal` |
| **Discount Badge** | Inter 700 (Bold) | `11px` | `10px` | `1.2` | `0.04em` | `text-[11px] font-bold uppercase tracking-wider` |
| **Brand Eyebrow** | Manrope 700 (Bold) | `11px` | `10px` | `1.2` | `0.14em` | `text-xs font-bold uppercase tracking-eyebrow` |

---

## 3. Typographical Usage Rules & Best Practices

1. **Editorial Restraint**:
   - Never use more than two font families on any screen.
   - Restrict heading capitalization: use Title Case or Sentence Case for headlines; avoid ALL-CAPS except for Brand Eyebrows and Discount Badges.
2. **Pricing Presentation**:
   - The **Outlet Price** must always be positioned first or given higher visual weight than the retail MRP.
   - Retail MRP must always feature strikethrough styling in `#777777`.
   - The **Discount Badge** is set in Champagne Gold (`#C6A15B`) to communicate authentic outlet savings.
3. **Line Length & Ergonomics**:
   - Limit editorial paragraph line lengths to 60–75 characters (`max-w-prose` / `max-w-xl`) to maintain optimal reading comfort.
4. **Font Loading Strategy**:
   - In Next.js, load fonts using `next/font/google` with `display: 'swap'` and `variable` declarations to ensure zero Layout Shift (CLS = 0).
