# iNESTYL OUTLET — Motion & Animation Guidelines
*Version 1.1.0 — Interaction Physics & Animation System*

---

## 1. Motion Philosophy: Restraint, Weight & Poise

In high-fashion retail, motion is never playful or decorative; it communicates **craftsmanship, architectural weight, and calm confidence**:

- **No Playful Bounces**: Avoid bouncy springs, cartoonish wobbles, and aggressive rubber-band effects.
- **Damped Deceleration**: Movements initiate promptly and ease out into silky, prolonged deceleration curves.
- **Spatial Consistency**: Elements enter upward from the ground plane (`translateY: 16px -> 0px`), creating a natural sense of physical grounding.
- **Accessibility by Default**: Complete compliance with `prefers-reduced-motion` across all components.

---

## 2. Technology Stack Roles

| Technology | Role | Implementation Scope |
| :--- | :--- | :--- |
| **Framer Motion** (`motion/react`) | React component transitions, interactive hover/tap states, layout animations, modal dialog reveals | Primary frontend motion library across Next.js components. |
| **GSAP (GreenSock)** | Complex multi-layer timeline sequences, scrubbed scroll triggers for hero sequences | Hero banner sandstone plinth and multi-brand parallax. |
| **Lenis Scroll** (`@studio-freight/lenis`) | Inertial smooth scrolling for desktop browsers | Global page scroll momentum with zero lag or synthetic wheel hijack. |

---

## 3. Core Easing Curves & Timing Tokens

All motion is governed by mathematical cubic bezier curves configured in `design-system/tokens.json`:

```css
/* 1. Luxury Deceleration (Default for entrances and reveals) */
--ease-luxury: cubic-bezier(0.16, 1, 0.3, 1);

/* 2. Smooth Hover Deceleration */
--ease-hover: cubic-bezier(0.4, 0, 0.2, 1);

/* 3. Page Transition Momentum */
--ease-page: cubic-bezier(0.76, 0, 0.24, 1);
```

### Duration Scale

| Token | Duration | Application |
| :--- | :---: | :--- |
| `duration-fast` | `200ms` | Button hover background shifts, icon micro-movements, tooltip reveals. |
| `duration-normal`| `350ms` | Product card image scale zoom, filter dropdown expansion, tab switches. |
| `duration-slow` | `600ms` | Section entrances, grid staggered item fades, drawer sheet slide-ins. |
| `duration-editorial`| `900ms` | Hero headline staggered line reveal, full-page route transitions. |

---

## 4. Key Animation Specifications

### A. Elegant Staggered Text Reveals (Headings)
- **Initial**: `opacity: 0`, `y: 24px`.
- **Animate**: `opacity: 1`, `y: 0px`.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)`, Duration `700ms`, Stagger delay `80ms` per line.

### B. Product Card Image Hover (Subtle Zoom)
- **Initial**: `scale: 1.0`, `y: 0px`.
- **Hover**: `scale: 1.04`, `y: -2px`.
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)`, Duration `450ms`.
- **Shadow**: Transitions smoothly from `0 4px 12px rgba(17,17,17,0.04)` to `0 12px 28px rgba(17,17,17,0.08)`.

### C. WhatsApp Enquiry Pulse
- **Purpose**: Gentle indicator that store specialists are available online.
- **Animation**: The WhatsApp icon in floating pills features a subtle 2.5s cyclical pulse (scaling $1.0 \rightarrow 1.05 \rightarrow 1.0$ with soft opacity bloom). It never flashes or obstructs view.

### D. Scroll-Based Staggered Grid Reveals
- **Trigger**: When the product catalogue grid enters the viewport (`IntersectionObserver` with `viewport: { once: true, margin: "-80px" }`).
- **Cards**: Stagger delay of `60ms` between sequential cards. Each card transitions `opacity: 0 -> 1` and `y: 20px -> 0px` over `500ms`.

---

## 5. Reduced-Motion Accessibility

Users who have enabled system-level reduced motion (`prefers-reduced-motion: reduce`) receive immediate, instantaneous state transitions without translational shifts:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
