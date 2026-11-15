#!/usr/bin/env python3
"""
Generate physical packaging vector mockups for iNESTYL OUTLET:
1. Shopping Bag
2. Price Tag / Hang Tag
3. Thank-You Card
"""

import os

OUT_DIR = "public/brand/packaging"
os.makedirs(OUT_DIR, exist_ok=True)

# 1. Shopping Bag Mockup SVG
shopping_bag_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 600" width="500" height="600">
  <defs>
    <filter id="shadow" x="-10%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#111111" flood-opacity="0.12"/>
    </filter>
    <linearGradient id="bagShade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EBE5DC"/>
      <stop offset="15%" stop-color="#F4EFE7"/>
      <stop offset="85%" stop-color="#F4EFE7"/>
      <stop offset="100%" stop-color="#E2DCD3"/>
    </linearGradient>
  </defs>

  <!-- Background Canvas -->
  <rect width="500" height="600" fill="#EAE3D9" />

  <!-- Handles -->
  <path d="M 180 180 C 180 70, 320 70, 320 180" fill="none" stroke="#111111" stroke-width="14" stroke-linecap="round" />
  <path d="M 180 180 C 180 80, 320 80, 320 180" fill="none" stroke="#262626" stroke-width="4" stroke-dasharray="4,4" />

  <!-- Bag Body -->
  <g filter="url(#shadow)">
    <!-- Main Face -->
    <rect x="80" y="160" width="340" height="380" rx="4" fill="url(#bagShade)" stroke="#D8D0C5" stroke-width="1" />
    
    <!-- Top Fold Crease -->
    <line x1="80" y1="185" x2="420" y2="185" stroke="#D8D0C5" stroke-width="1" />
    <circle cx="180" cy="185" r="5" fill="#111111" />
    <circle cx="320" cy="185" r="5" fill="#111111" />

    <!-- Centered Brand Logo (Scale 0.38) -->
    <g transform="translate(112, 300) scale(0.38)">
      <!-- Gold Dot -->
      <rect x="192" y="263" width="26" height="24" fill="#C6A15B" />
      <!-- i Stem -->
      <rect x="195" y="300" width="22" height="64" fill="#111111" />
      <!-- N -->
      <path d="M 240,287 L 259,306 L 259,364 L 240,364 Z M 237,264 L 264,264 L 360,364 L 334,364 Z M 334,264 L 353,264 L 353,336 L 334,317 Z" fill="#111111" />
      <!-- E -->
      <rect x="377" y="264" width="77" height="18" fill="#111111" />
      <rect x="377" y="305" width="77" height="18" fill="#111111" />
      <rect x="377" y="346" width="77" height="18" fill="#111111" />
      <!-- S -->
      <path d="M 506,262 L 527,266 L 538,272 L 543,277 L 532,287 L 514,278 L 503,278 L 498,280 L 493,285 L 493,291 L 498,297 L 536,314 L 545,321 L 548,331 L 548,343 L 540,353 L 528,361 L 515,364 L 495,364 L 478,358 L 473,348 L 485,339 L 503,348 L 516,348 L 523,345 L 527,339 L 524,332 L 517,328 L 486,313 L 477,306 L 474,297 L 474,284 L 482,273 L 494,265 Z" fill="#111111" />
      <!-- T -->
      <rect x="560" y="264" width="79" height="18" fill="#111111" />
      <rect x="591" y="297" width="21" height="67" fill="#111111" />
      <!-- Y -->
      <polygon points="650,264 673,264 692,308 692,364 712,364 712,308 731,264 753,264 716,316 687,316" fill="#111111" />
      <!-- L -->
      <rect x="765" y="264" width="20" height="68" fill="#111111" />
      <rect x="765" y="346" width="77" height="18" fill="#111111" />
      <!-- Rules & OUTLET -->
      <rect x="192" y="415" width="127" height="3.5" rx="1.5" fill="#C6A15B" />
      <text x="515" y="426" font-family="Manrope, sans-serif" font-size="28" font-weight="700" letter-spacing="14" fill="#111111" text-anchor="middle">OUTLET</text>
      <rect x="716" y="415" width="126" height="3.5" rx="1.5" fill="#C6A15B" />
    </g>

    <!-- Bottom Store Location Stamp -->
    <text x="250" y="490" font-family="Inter, sans-serif" font-size="11" font-weight="600" letter-spacing="3" fill="#777777" text-anchor="middle">KAPADWANJ, GUJARAT</text>
  </g>
</svg>"""

with open(f"{OUT_DIR}/shopping-bag-mockup.svg", "w") as f:
    f.write(shopping_bag_svg)

# 2. Price Tag / Hang Tag Mockup SVG
price_tag_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 500" width="600" height="500">
  <defs>
    <filter id="tagShadow" x="-10%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#111111" flood-opacity="0.1"/>
    </filter>
  </defs>

  <rect width="600" height="500" fill="#EAE3D9" />

  <!-- FRONT TAG -->
  <g transform="translate(60, 40)" filter="url(#tagShadow)">
    <rect width="210" height="420" rx="8" fill="#F4EFE7" stroke="#D8D0C5" stroke-width="1" />
    <!-- Die-cut eyelet -->
    <circle cx="105" cy="30" r="7" fill="#FFFFFF" stroke="#111111" stroke-width="3" />
    <path d="M 105 27 C 105 0, 115 -20, 110 -30" fill="none" stroke="#777777" stroke-width="2" />
    
    <!-- Monogram Mark -->
    <g transform="translate(62, 100) scale(0.55)">
      <rect x="192" y="263" width="26" height="24" fill="#C6A15B" />
      <rect x="195" y="300" width="22" height="64" fill="#111111" />
      <path d="M 240,287 L 259,306 L 259,364 L 240,364 Z M 237,264 L 264,264 L 360,364 L 334,364 Z M 334,264 L 353,264 L 353,336 L 334,317 Z" fill="#111111" />
      <rect x="192" y="390" width="161" height="3.5" rx="1.5" fill="#C6A15B" />
    </g>

    <text x="105" y="240" font-family="Manrope, sans-serif" font-size="14" font-weight="800" letter-spacing="1" fill="#111111" text-anchor="middle">iNESTYL OUTLET</text>
    <text x="105" y="260" font-family="Inter, sans-serif" font-size="10" font-weight="600" letter-spacing="2" fill="#C6A15B" text-anchor="middle">100% ORIGINAL</text>

    <line x1="30" y1="310" x2="180" y2="310" stroke="#D8D0C5" stroke-width="1" />
    <text x="105" y="340" font-family="Inter, sans-serif" font-size="9" font-weight="500" letter-spacing="1" fill="#777777" text-anchor="middle">AUTHENTIC PRODUCT GUARANTEE</text>
    <text x="105" y="380" font-family="Inter, sans-serif" font-size="8" font-weight="600" letter-spacing="2" fill="#999999" text-anchor="middle">KAPADWANJ FLAGSHIP</text>
  </g>

  <!-- BACK TAG (Price & Stock Inspection) -->
  <g transform="translate(330, 40)" filter="url(#tagShadow)">
    <rect width="210" height="420" rx="8" fill="#FFFFFF" stroke="#D8D0C5" stroke-width="1" />
    <circle cx="105" cy="30" r="7" fill="#F4EFE7" stroke="#111111" stroke-width="3" />

    <text x="24" y="80" font-family="Inter, sans-serif" font-size="10" font-weight="700" letter-spacing="1.5" fill="#777777">BRAND</text>
    <text x="24" y="98" font-family="Manrope, sans-serif" font-size="15" font-weight="700" fill="#111111">NIKE FOOTWEAR</text>

    <text x="24" y="130" font-family="Inter, sans-serif" font-size="10" font-weight="700" letter-spacing="1.5" fill="#777777">ARTICLE / MODEL</text>
    <text x="24" y="148" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#111111">Air Max 270 Black/White</text>

    <text x="24" y="180" font-family="Inter, sans-serif" font-size="10" font-weight="700" letter-spacing="1.5" fill="#777777">SIZE (UK / IND)</text>
    <text x="24" y="198" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#111111">UK 8.5 / EU 43</text>

    <line x1="24" y1="220" x2="186" y2="220" stroke="#EAE3D9" stroke-width="1" />

    <text x="24" y="250" font-family="Inter, sans-serif" font-size="11" font-weight="500" fill="#777777">RETAIL MRP:</text>
    <text x="186" y="250" font-family="Inter, sans-serif" font-size="13" font-weight="500" text-decoration="line-through" fill="#777777" text-anchor="end">₹12,995</text>

    <text x="24" y="284" font-family="Manrope, sans-serif" font-size="12" font-weight="700" fill="#111111">OUTLET PRICE:</text>
    <text x="186" y="286" font-family="Inter, sans-serif" font-size="18" font-weight="800" fill="#111111" text-anchor="end">₹8,995</text>

    <rect x="24" y="302" width="162" height="24" rx="4" fill="#FDF9F2" stroke="#EADBBE" />
    <text x="105" y="318" font-family="Inter, sans-serif" font-size="11" font-weight="700" letter-spacing="1" fill="#C6A15B" text-anchor="middle">YOU SAVE 31% (₹4,000)</text>

    <!-- WhatsApp Barcode / QR Simulation -->
    <rect x="24" y="340" width="162" height="40" fill="#F4EFE7" rx="4" />
    <text x="105" y="360" font-family="Inter, sans-serif" font-size="9" font-weight="700" fill="#111111" text-anchor="middle">SCAN FOR WHATSAPP ENQUIRY</text>
    <text x="105" y="372" font-family="Inter, sans-serif" font-size="8" fill="#777777" text-anchor="middle">WA: +91 98765 43210</text>
  </g>
</svg>"""

with open(f"{OUT_DIR}/price-tag-mockup.svg", "w") as f:
    f.write(price_tag_svg)

# 3. Thank-You Card Mockup SVG
thank_you_card_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 460" width="680" height="460">
  <defs>
    <filter id="cardShadow" x="-10%" y="-5%" width="120%" height="120%">
      <feDropShadow dx="0" dy="14" stdDeviation="18" flood-color="#111111" flood-opacity="0.12"/>
    </filter>
  </defs>

  <rect width="680" height="460" fill="#EAE3D9" />

  <!-- FRONT: Black Luxury Foil Card -->
  <g transform="translate(40, 50)" filter="url(#cardShadow)">
    <rect width="280" height="360" rx="10" fill="#111111" stroke="#222222" stroke-width="1" />
    
    <!-- Monogram in Gold -->
    <g transform="translate(95, 110) scale(0.55)">
      <rect x="192" y="263" width="26" height="24" fill="#C6A15B" />
      <rect x="195" y="300" width="22" height="64" fill="#FFFFFF" />
      <path d="M 240,287 L 259,306 L 259,364 L 240,364 Z M 237,264 L 264,264 L 360,364 L 334,364 Z M 334,264 L 353,264 L 353,336 L 334,317 Z" fill="#FFFFFF" />
      <rect x="192" y="390" width="161" height="3.5" rx="1.5" fill="#C6A15B" />
    </g>

    <text x="140" y="240" font-family="Manrope, sans-serif" font-size="14" font-weight="700" letter-spacing="4" fill="#C6A15B" text-anchor="middle">THANK YOU</text>
    <text x="140" y="264" font-family="Inter, sans-serif" font-size="11" font-weight="400" letter-spacing="1" fill="#999999" text-anchor="middle">FOR SHOPPING ORIGINAL</text>
    <text x="140" y="310" font-family="Inter, sans-serif" font-size="9" font-weight="600" letter-spacing="2" fill="#777777" text-anchor="middle">iNESTYL OUTLET • KAPADWANJ</text>
  </g>

  <!-- BACK: Warm Ivory Editorial Note -->
  <g transform="translate(360, 50)" filter="url(#cardShadow)">
    <rect width="280" height="360" rx="10" fill="#F4EFE7" stroke="#D8D0C5" stroke-width="1" />

    <text x="32" y="60" font-family="Manrope, sans-serif" font-size="18" font-weight="800" fill="#111111">Pure Value.</text>
    <text x="32" y="80" font-family="Manrope, sans-serif" font-size="18" font-weight="800" fill="#111111">Original Quality.</text>

    <line x1="32" y1="100" x2="90" y2="100" stroke="#C6A15B" stroke-width="2" />

    <text x="32" y="130" font-family="Inter, sans-serif" font-size="12" font-weight="400" fill="#444444" width="216">
      <tspan x="32" dy="0">We curate only 100% original</tspan>
      <tspan x="32" dy="18">footwear and apparel from</tspan>
      <tspan x="32" dy="18">global iconic brands at genuine</tspan>
      <tspan x="32" dy="18">outlet savings.</tspan>
    </text>

    <text x="32" y="230" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="#111111">
      <tspan x="32" dy="0">Need care tips or restock alerts?</tspan>
      <tspan x="32" dy="18">Reach our Kapadwanj store team</tspan>
      <tspan x="32" dy="18">anytime via WhatsApp.</tspan>
    </text>

    <text x="32" y="320" font-family="Inter, sans-serif" font-size="11" font-weight="700" letter-spacing="1" fill="#C6A15B">WA: +91 98765 43210</text>
    <text x="32" y="336" font-family="Inter, sans-serif" font-size="9" font-weight="500" fill="#777777">Mon - Sun: 10:00 AM - 9:00 PM</text>
  </g>
</svg>"""

with open(f"{OUT_DIR}/thank-you-card-mockup.svg", "w") as f:
    f.write(thank_you_card_svg)

print("Packaging vector mockups generated successfully:")
for f in os.listdir(OUT_DIR):
    print(f" - {f}")
