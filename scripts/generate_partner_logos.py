import os

PARTNERS_DIR = "public/brand/partners"
os.makedirs(PARTNERS_DIR, exist_ok=True)

# 1. Nike Swoosh
nike_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 44" fill="currentColor">
  <path d="M21.1 39.8C10.7 39.8 2.2 34.3 0 26.5c1.4.3 3.6.5 6.2.5 12.3 0 25.1-6.1 40.5-19.1 1.6-1.4 3.4-2.8 5.2-4.1C44.7 9.8 33.7 23.3 21.6 39.1c-.2.2-.4.5-.5.7zM118.7 0c-4.9 3.5-12.2 8.7-20.9 14.8-19.6 13.9-38.2 22.3-55.3 24.9 11-12.7 23.9-25.1 38.3-36.9 13.1-10.7 26.7-18.7 37.9-2.8z"/>
</svg>"""

# 2. Puma
puma_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 45" fill="currentColor">
  <path d="M28.4 6.2c-1.5-1.2-3.8-1.5-5.5-.8-1.2.5-3.5 2.1-4.7 3.2-1.9 1.8-3.4 2.8-5.7 3.4-2.1.6-4.5.3-6.4-.7C4 10.1 2.5 8 2.2 5.5 2 3.8 2.6 2.3 3.7 1.2 4.8.1 6.3-.3 7.8.2c1.7.5 3.3 1.8 4.7 3.2 1.2 1.2 2.7 1.8 4.4 1.7 1.6-.1 3.2-.9 4.3-2.1 1.7-1.8 3.9-3 6.3-3.2 2.5-.2 4.9.6 6.8 2.2 1.9 1.6 2.9 3.9 2.7 6.3-.2 2.5-1.5 4.7-3.5 6.1-2 1.4-4.5 1.8-6.9 1.2-2.1-.5-4-1.8-5.3-3.6-1.1-1.5-2.7-2.4-4.5-2.5-1.7-.1-3.4.6-4.6 1.9-1.5 1.6-2.2 3.8-1.9 6 .3 2.1 1.6 3.9 3.5 4.9 1.9 1 4.2 1.1 6.2.3 2.1-.8 3.7-2.4 4.7-4.4.9-1.8 2.4-3.1 4.3-3.6 2-.5 4.1-.1 5.7 1.1 1.9 1.4 2.9 3.6 2.7 5.9-.2 2.3-1.4 4.3-3.3 5.4-2 1.2-4.4 1.4-6.6.7-1.9-.6-3.5-2-4.4-3.8-.8-1.6-2.3-2.7-4.1-3-1.8-.3-3.6.3-4.8 1.6z"/>
  <text x="44" y="32" font-family="'Arial Black', Impact, sans-serif" font-size="28" font-weight="900" letter-spacing="2">PUMA</text>
</svg>"""

# 3. adidas
adidas_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 45" fill="currentColor">
  <!-- 3 Performance Bars -->
  <polygon points="12,32 24,32 18,22 6,22" />
  <polygon points="26,32 38,32 28,14 16,14" />
  <polygon points="40,32 52,32 38,6 26,6" />
  <!-- adidas Text -->
  <text x="6" y="44" font-family="'Century Gothic', 'Inter', sans-serif" font-size="14" font-weight="700" letter-spacing="1">adidas</text>
</svg>"""

# 4. HOKA
hoka_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 40" fill="currentColor">
  <text x="2" y="32" font-family="'Arial Black', Impact, sans-serif" font-size="34" font-weight="900" letter-spacing="3">HOKA</text>
  <!-- Flying bird silhouette inside/above O -->
  <path d="M 62 10 Q 69 4 75 11 Q 72 7 62 10 Z" fill="currentColor"/>
</svg>"""

# 5. Levi's
levis_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40">
  <path d="M 5 5 L 115 5 L 115 28 Q 85 24 60 35 Q 35 24 5 28 Z" fill="#C4121A"/>
  <text x="60" y="24" fill="#FFFFFF" font-family="'Arial Black', Impact, sans-serif" font-size="18" font-weight="900" text-anchor="middle" letter-spacing="1">Levi's</text>
  <circle cx="95" cy="14" r="2.5" fill="#FFFFFF"/>
</svg>"""

# 6. DIESEL
diesel_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40" fill="currentColor">
  <text x="2" y="27" font-family="'Arial Black', Impact, sans-serif" font-size="28" font-weight="900" letter-spacing="2">DIESEL</text>
  <text x="4" y="37" font-family="'Inter', sans-serif" font-size="6" font-weight="700" letter-spacing="1.2">FOR SUCCESSFUL LIVING</text>
</svg>"""

# 7. U.S. Polo Assn.
uspolo_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40" fill="currentColor">
  <text x="75" y="22" font-family="'Times New Roman', serif" font-size="15" font-weight="700" text-anchor="middle" letter-spacing="1.5">U.S. POLO ASSN.</text>
  <text x="75" y="34" font-family="'Inter', sans-serif" font-size="7" font-weight="600" text-anchor="middle" letter-spacing="2.5">SINCE 1890</text>
</svg>"""

files = {
    "nike.svg": nike_svg,
    "puma.svg": puma_svg,
    "adidas.svg": adidas_svg,
    "hoka.svg": hoka_svg,
    "levis.svg": levis_svg,
    "diesel.svg": diesel_svg,
    "us-polo-assn.svg": uspolo_svg,
}

for name, content in files.items():
    with open(os.path.join(PARTNERS_DIR, name), "w") as f:
        f.write(content)
    print(f"Generated {name}")
