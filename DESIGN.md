---
version: alpha
name: Apple Minimal
description: A crisp, high-contrast premium system with generous whitespace, restrained color, and precise type hierarchy.
colors:
  primary: "#0071E3"
  primary-strong: "#0066CC"
  secondary: "#2997FF"
  tertiary: "#1D1D1F"
  neutral: "#F5F5F7"
  surface: "#FFFFFF"
  on-surface: "#1D1D1F"
  muted: "#E5E7EB"
  backdrop: "#000000"
  error: "#D92D20"
typography:
  headline-display:
    fontFamily: "SF Pro Text"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: "67px"
    letterSpacing: "0px"
  headline-lg:
    fontFamily: "SF Pro Display"
    fontSize: "47px"
    fontWeight: 600
    lineHeight: "60px"
    letterSpacing: "-0.28px"
  headline-md:
    fontFamily: "SF Pro Display"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: "44px"
    letterSpacing: "0px"
  headline-sm:
    fontFamily: "SF Pro Text"
    fontSize: "33px"
    fontWeight: 600
    lineHeight: "40px"
    letterSpacing: "0px"
  body-lg:
    fontFamily: "SF Pro Display"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: "42px"
    letterSpacing: "0.196px"
  body-md:
    fontFamily: "SF Pro Text"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "26px"
    letterSpacing: "0px"
  body-sm:
    fontFamily: "SF Pro Text"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
    letterSpacing: "0px"
  label-lg:
    fontFamily: "SF Pro Text"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: "26px"
    letterSpacing: "0px"
  label-md:
    fontFamily: "SF Pro Text"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "22px"
    letterSpacing: "0px"
  label-sm:
    fontFamily: "SF Pro Text"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0.02em"
  nav:
    fontFamily: "SF Pro Text"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
    letterSpacing: "0em"
  eyebrow:
    fontFamily: "SF Pro Text"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.08em"
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 54px
  xl: 70px
  gutter: 16px
  section: 54px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "11px 21px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.primary-strong}"
    textColor: "{colors.surface}"
    rounded: "{rounded.full}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: "11px 21px"
    height: "44px"
  button-secondary-hover:
    backgroundColor: "transparent"
    textColor: "{colors.primary-strong}"
    rounded: "{rounded.full}"
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.primary-strong}"
    typography: "{typography.body-md}"
    rounded: "{rounded.none}"
    padding: "0px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: "11px 16px"
  nav-item:
    backgroundColor: "transparent"
    textColor: "{colors.neutral}"
    typography: "{typography.nav}"
    padding: "0px"
---

## Overview
This system feels premium, restrained, and highly polished, with a calm editorial tone rather than a loud promotional one. It relies on large-scale imagery, precise spacing, and strong typographic hierarchy to communicate confidence and clarity. The experience is spacious and lightweight, aimed at a broad consumer audience that expects simplicity and fast comprehension.

## Colors
- **Primary (#0071E3):** The signature Apple blue used for primary actions, links, and emphasis. It reads as energetic but controlled, staying visually clean against white or dark surfaces.
- **Primary-strong (#0066CC):** A deeper interaction state for links and buttons. Use it for hover/focus reinforcement without changing the brand mood.
- **Secondary (#2997FF):** A lighter, more luminous blue used for outlined actions and secondary interactive emphasis. It provides contrast while remaining unmistakably Apple.
- **Tertiary (#1D1D1F):** The core ink tone for text and dark UI surfaces. It carries most headline and body copy, especially in light sections.
- **Neutral (#F5F5F7):** A soft off-white background tone that supports the spacious, airy feel of the page. It helps separate sections without introducing heavy borders.
- **Surface (#FFFFFF):** The base card and canvas color used for the cleanest surfaces and product presentation.
- **On-surface (#1D1D1F):** The default readable text color on light surfaces. It should be used for copy, headings, and icons that need maximum legibility.
- **Muted (#E5E7EB):** A subtle divider/border color for low-contrast framing and card edges. It keeps structure visible without distracting from content.
- **Backdrop (#000000):** Reserved for the darkest navbar and deeply saturated hero treatments. It creates strong contrast and a premium, cinematic top frame.
- **Error (#D92D20):** A utility red for destructive states and alerts. It is not visually dominant in the marketing experience but should remain accessible and clear.

## Typography
The type system is built on SF Pro Text and SF Pro Display, matching the clean, modern Apple voice. SF Pro Text carries navigation, buttons, and body copy, while SF Pro Display is used for larger editorial headlines and more expressive hero messaging. Weights stay relatively restrained: 400 for most reading text, 600 for strong headings, and 700 for the largest display treatment.

Headlines should feel crisp, compact, and well-spaced, with slightly negative tracking on the largest display heading for a refined, engineered look. Body text is comfortable and highly legible, with generous line heights that keep the layout breathable. Labels and nav items stay small, understated, and mostly sentence case; uppercase is used sparingly, if at all, and when present it should be tracked out for clarity.

## Layout
The layout is built around a fluid full-width canvas with large image-led modules, not a rigid boxed grid. Sections use strong vertical separation and generous horizontal breathing room, with spacing tokens centered on an 8px rhythm and larger section jumps at 54px and 70px. Content blocks typically sit centered with a narrow text measure, while promotional panels can extend edge-to-edge for immersive impact.

Padding in cards and smaller modules should stay modest, usually around 16px, so content feels tidy but not cramped. Interactive clusters such as button groups should have clear internal gaps and enough vertical space to avoid visual compression. Overall, the system favors open composition over dense information stacking.

## Elevation & Depth
The system is visually flat by design, with very limited shadow usage. Depth is created primarily through color blocking, image contrast, and tonal separation rather than heavy elevation effects. Where shadows appear, they are subtle and restrained, supporting product cutouts without making the interface feel layered or cluttered.

Borders are thin and quiet, usually in muted gray, and cards remain clean white surfaces with minimal ornamentation. This approach keeps attention on product imagery and messaging rather than chrome. If hierarchy is needed, prefer contrast, spacing, and size over shadow.

## Shapes
The shape language is soft and highly rounded, especially on interactive controls. Buttons use a fully pill-shaped radius, while cards and inputs use a modest 8px radius for a calm, approachable structure. The overall feel is smooth and polished, with rounded geometry reinforcing the friendly consumer tone.

## Components
Buttons are the most visually distinct interactive elements. `button-primary` should use the Apple blue fill, white text, and pill rounding with compact padding (`11px 21px`) and a minimum comfortable height of 44px. `button-secondary` should remain transparent with blue text and a blue outline, preserving the same pill shape and sizing. `button-tertiary` should be link-like and borderless for low-emphasis actions. Hover states should darken or intensify color subtly, not change size or shape.

Cards should stay simple: white background, 1px muted border, small radius, and 16px padding. Avoid shadows unless the card must float above a busy image. Inputs should match cards in tone, using white surfaces, subtle borders, and comfortable internal padding; they should never look heavy or boxed-in.

Navigation items are minimal and text-first, with no visible button chrome. Use small SF Pro Text labels and preserve ample spacing between items so the top bar feels lightweight. Links should remain understated and rely on blue color rather than decoration-heavy treatments. Any badges, chips, or helper UI should follow the same principle: low visual weight, clear typography, and soft rounding.

## Do's and Don'ts
- Do keep actions pill-shaped and lightweight, with minimal chrome.
- Do use large, confident headlines with generous whitespace around them.
- Do rely on blue for interaction, but use it sparingly so it stays meaningful.
- Do keep borders subtle and shadows nearly invisible.
- Don't introduce heavy gradients, loud outlines, or decorative textures in UI controls.
- Don't crowd sections with dense content; this system depends on breathing room.
- Don't use overly rounded cards or inputs that compete with the pill buttons.
- Don't deviate from the restrained SF Pro hierarchy with unrelated fonts or theatrical type effects.

