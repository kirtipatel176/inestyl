#!/usr/bin/env python3
"""
iNESTYL OUTLET — Phase 1 Brand Asset Generator
Generates pixel-perfect scalable vector SVGs and high-resolution PNGs
based on the exact geometric specifications and uploaded reference logo.
"""

import os
import subprocess

OUT_DIR = os.path.abspath("public/brand")
os.makedirs(OUT_DIR, exist_ok=True)

# Official Brand Colors
PRIMARY_BLACK = "#111111"
WARM_IVORY = "#F4EFE7"
CHAMPAGNE_GOLD = "#C6A15B"
PURE_WHITE = "#FFFFFF"
SUPPORTING_CREAM = "#EAE3D9"
SUPPORTING_BORDER = "#D8D0C5"
MUTED_CHARCOAL = "#777777"

# Normalized coordinates for the glyphs
# In source:
# X ranges from 192 to 842 (width = 650)
# Y ranges from 263 to 430 (height = 167)
# Let offset: OX = 192, OY = 263
# With padding: PAD_X = 40, PAD_Y = 40
# Canvas width = 650 + 80 = 730
# Canvas height = 168 + 80 = 248

def get_glyph_paths(fg_color, gold_color, ox=0, oy=0, scale=1.0):
    """
    Returns SVG snippet for iNESTYL OUTLET letterforms
    ox, oy: translation offset
    scale: scaling factor
    """
    # Helper to transform (x, y)
    def t(x, y):
        nx = (x - 192) * scale + ox
        ny = (y - 263) * scale + oy
        return f"{nx:.1f},{ny:.1f}"

    def tr(x, y, w, h):
        nx = (x - 192) * scale + ox
        ny = (y - 263) * scale + oy
        nw = w * scale
        nh = h * scale
        return f'x="{nx:.1f}" y="{ny:.1f}" width="{nw:.1f}" height="{nh:.1f}"'

    elements = []

    # 1. Letter 'i'
    # Gold square dot
    elements.append(f'  <!-- Letter i: Gold Square Dot -->')
    elements.append(f'  <rect {tr(192, 263, 26, 24)} fill="{gold_color}" />')
    # Stem of i
    elements.append(f'  <!-- Letter i: Stem -->')
    elements.append(f'  <rect {tr(195, 300, 22, 64)} fill="{fg_color}" />')

    # 2. Letter 'N'
    # Left vertical stem with 45 deg top cut
    p_n_left = f"M {t(240, 287)} L {t(259, 306)} L {t(259, 364)} L {t(240, 364)} Z"
    # Diagonal stroke
    p_n_diag = f"M {t(237, 264)} L {t(264, 264)} L {t(360, 364)} L {t(334, 364)} Z"
    # Right vertical stem with 45 deg bottom cut
    p_n_right = f"M {t(334, 264)} L {t(353, 264)} L {t(353, 336)} L {t(334, 317)} Z"
    elements.append(f'  <!-- Letter N -->')
    elements.append(f'  <path d="{p_n_left} {p_n_diag} {p_n_right}" fill="{fg_color}" />')

    # 3. Letter 'E' (Three detached floating bars)
    elements.append(f'  <!-- Letter E -->')
    elements.append(f'  <rect {tr(377, 264, 77, 18)} fill="{fg_color}" />')
    elements.append(f'  <rect {tr(377, 305, 77, 18)} fill="{fg_color}" />')
    elements.append(f'  <rect {tr(377, 346, 77, 18)} fill="{fg_color}" />')

    # 4. Letter 'S' (Geometric curved glyph)
    p_s = (f"M {t(506, 262)} L {t(527, 266)} L {t(538, 272)} L {t(543, 277)} L {t(532, 287)} "
           f"L {t(514, 278)} L {t(503, 278)} L {t(498, 280)} L {t(493, 285)} L {t(493, 291)} "
           f"L {t(498, 297)} L {t(536, 314)} L {t(545, 321)} L {t(548, 331)} L {t(548, 343)} "
           f"L {t(540, 353)} L {t(528, 361)} L {t(515, 364)} L {t(495, 364)} L {t(478, 358)} "
           f"L {t(473, 348)} L {t(485, 339)} L {t(503, 348)} L {t(516, 348)} L {t(523, 345)} "
           f"L {t(527, 339)} L {t(524, 332)} L {t(517, 328)} L {t(486, 313)} L {t(477, 306)} "
           f"L {t(474, 297)} L {t(474, 284)} L {t(482, 273)} L {t(494, 265)} Z")
    elements.append(f'  <!-- Letter S -->')
    elements.append(f'  <path d="{p_s}" fill="{fg_color}" />')

    # 5. Letter 'T' (Detached top bar and stem)
    elements.append(f'  <!-- Letter T -->')
    elements.append(f'  <rect {tr(560, 264, 79, 18)} fill="{fg_color}" />')
    elements.append(f'  <rect {tr(591, 297, 21, 67)} fill="{fg_color}" />')

    # 6. Letter 'Y'
    p_y = (f"M {t(650, 264)} L {t(673, 264)} L {t(702, 316)} L {t(702, 364)} "
           f"L {t(692, 364)} L {t(692, 316)} L {t(731, 264)} L {t(753, 264)} "
           f"L {t(712, 314)} L {t(712, 364)} L {t(692, 364)} Z")
    # Clean Y polygon
    p_y_clean = (f"M {t(650, 264)} L {t(673, 264)} L {t(692, 306)} L {t(692, 364)} "
                 f"L {t(712, 364)} L {t(712, 306)} L {t(731, 264)} L {t(753, 264)} "
                 f"L {t(722, 318)} L {t(712, 326)} L {t(712, 364)} L {t(692, 364)} "
                 f"L {t(692, 326)} L {t(682, 318)} Z")
    elements.append(f'  <!-- Letter Y -->')
    elements.append(f'  <polygon points="{t(650, 264)} {t(673, 264)} {t(692, 308)} {t(692, 364)} {t(712, 364)} {t(712, 308)} {t(731, 264)} {t(753, 264)} {t(716, 316)} {t(687, 316)}" fill="{fg_color}" />')

    # 7. Letter 'L' (Vertical stem and detached base)
    elements.append(f'  <!-- Letter L -->')
    elements.append(f'  <rect {tr(765, 264, 20, 68)} fill="{fg_color}" />')
    elements.append(f'  <rect {tr(765, 346, 77, 18)} fill="{fg_color}" />')

    # 8. OUTLET Subtitle Line
    # Left gold rule
    elements.append(f'  <!-- Left Gold Rule -->')
    elements.append(f'  <rect {tr(192, 415, 127, 3.5)} rx="{1.5*scale:.1f}" fill="{gold_color}" />')

    # Letters O U T L E T
    # Letter O (with hole)
    p_o_outer = (f"M {t(366, 399)} L {t(370, 399)} L {t(377, 402)} L {t(381, 406)} L {t(383, 410)} "
                 f"L {t(383, 419)} L {t(382, 422)} L {t(378, 427)} L {t(372, 430)} L {t(363, 430)} "
                 f"L {t(359, 428)} L {t(354, 423)} L {t(352, 417)} L {t(352, 413)} L {t(355, 405)} "
                 f"L {t(360, 401)} Z")
    p_o_inner = (f"M {t(372, 405)} L {t(371, 404)} L {t(365, 404)} L {t(361, 406)} L {t(358, 410)} "
                 f"L {t(357, 417)} L {t(358, 420)} L {t(363, 425)} L {t(366, 425)} L {t(367, 426)} "
                 f"L {t(372, 425)} L {t(378, 418)} L {t(377, 409)} Z")
    elements.append(f'  <!-- Subtitle: O -->')
    elements.append(f'  <path d="{p_o_outer} {p_o_inner}" fill-rule="evenodd" fill="{fg_color}" />')

    # Letter U
    p_u = (f"M {t(421, 400)} L {t(426, 400)} L {t(426, 419)} L {t(427, 422)} L {t(430, 425)} "
           f"L {t(433, 426)} L {t(437, 425)} L {t(441, 421)} L {t(441, 400)} L {t(446, 400)} "
           f"L {t(446, 423)} L {t(442, 428)} L {t(438, 430)} L {t(430, 430)} L {t(423, 425)} "
           f"L {t(421, 419)} Z")
    elements.append(f'  <!-- Subtitle: U -->')
    elements.append(f'  <path d="{p_u}" fill="{fg_color}" />')

    # Letter T (1)
    p_t1 = (f"M {t(484, 400)} L {t(507, 400)} L {t(507, 404)} L {t(499, 404)} L {t(498, 405)} "
            f"L {t(498, 429)} L {t(497, 430)} L {t(494, 430)} L {t(493, 429)} L {t(493, 405)} "
            f"L {t(492, 404)} L {t(485, 404)} Z")
    elements.append(f'  <!-- Subtitle: T1 -->')
    elements.append(f'  <path d="{p_t1}" fill="{fg_color}" />')

    # Letter L
    p_l2 = (f"M {t(545, 400)} L {t(550, 400)} L {t(550, 424)} L {t(551, 425)} L {t(563, 425)} "
            f"L {t(564, 426)} L {t(564, 429)} L {t(563, 430)} L {t(545, 430)} Z")
    elements.append(f'  <!-- Subtitle: L -->')
    elements.append(f'  <path d="{p_l2}" fill="{fg_color}" />')

    # Letter E
    p_e2 = (f"M {t(602, 400)} L {t(622, 400)} L {t(622, 404)} L {t(608, 404)} L {t(607, 405)} "
            f"L {t(607, 412)} L {t(608, 413)} L {t(619, 413)} L {t(619, 416)} L {t(618, 417)} "
            f"L {t(608, 417)} L {t(607, 418)} L {t(607, 424)} L {t(608, 425)} L {t(621, 425)} "
            f"L {t(622, 426)} L {t(622, 429)} L {t(621, 430)} L {t(602, 430)} Z")
    elements.append(f'  <!-- Subtitle: E -->')
    elements.append(f'  <path d="{p_e2}" fill="{fg_color}" />')

    # Letter T (2)
    p_t2 = (f"M {t(660, 400)} L {t(682, 400)} L {t(682, 404)} L {t(675, 404)} L {t(673, 406)} "
            f"L {t(673, 430)} L {t(669, 430)} L {t(669, 405)} L {t(668, 404)} L {t(660, 404)} Z")
    elements.append(f'  <!-- Subtitle: T2 -->')
    elements.append(f'  <path d="{p_t2}" fill="{fg_color}" />')

    # Right gold rule
    elements.append(f'  <!-- Right Gold Rule -->')
    elements.append(f'  <rect {tr(716, 415, 126, 3.5)} rx="{1.5*scale:.1f}" fill="{gold_color}" />')

    return "\n".join(elements)


def get_monogram_paths(fg_color, gold_color, ox=0, oy=0, scale=1.0):
    """
    Returns SVG snippet for the 'iN' monogram icon with gold underline
    """
    def t(x, y):
        nx = (x - 192) * scale + ox
        ny = (y - 263) * scale + oy
        return f"{nx:.1f},{ny:.1f}"

    def tr(x, y, w, h):
        nx = (x - 192) * scale + ox
        ny = (y - 263) * scale + oy
        nw = w * scale
        nh = h * scale
        return f'x="{nx:.1f}" y="{ny:.1f}" width="{nw:.1f}" height="{nh:.1f}"'

    elements = []
    # 1. Letter 'i'
    elements.append(f'  <rect {tr(192, 263, 26, 24)} fill="{gold_color}" />')
    elements.append(f'  <rect {tr(195, 300, 22, 64)} fill="{fg_color}" />')

    # 2. Letter 'N'
    p_n_left = f"M {t(240, 287)} L {t(259, 306)} L {t(259, 364)} L {t(240, 364)} Z"
    p_n_diag = f"M {t(237, 264)} L {t(264, 264)} L {t(360, 364)} L {t(334, 364)} Z"
    p_n_right = f"M {t(334, 264)} L {t(353, 264)} L {t(353, 336)} L {t(334, 317)} Z"
    elements.append(f'  <path d="{p_n_left} {p_n_diag} {p_n_right}" fill="{fg_color}" />')

    # 3. Horizontal Gold Line underneath entire iN mark (from X=192 to 353, width 162)
    elements.append(f'  <rect {tr(192, 390, 161, 3.5)} rx="{1.5*scale:.1f}" fill="{gold_color}" />')

    return "\n".join(elements)


# 1. Primary Stacked Logo (Transparent, Black on Transparent)
def build_primary_stacked(fg, bg, gold, name):
    bg_rect = f'<rect width="730" height="250" fill="{bg}" />\n' if bg else ""
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 730 250" width="730" height="250">
{bg_rect}{get_glyph_paths(fg, gold, ox=40, oy=40, scale=1.0)}
</svg>"""
    path = os.path.join(OUT_DIR, name)
    with open(path, "w") as f:
        f.write(svg)
    return path

# 2. Horizontal Logo (iNESTYL on left, gold divider, OUTLET on right)
def build_horizontal(fg, bg, gold, name):
    bg_rect = f'<rect width="900" height="130" fill="{bg}" />\n' if bg else ""
    # In horizontal version:
    # iNESTYL is scale 0.75, width = 650 * 0.75 = 487.5
    # ox = 30, oy = 25
    # divider at X = 550, from Y = 25 to Y = 105
    # OUTLET on right: X = 580..860, Y = 50..80
    def t(x, y):
        nx = (x - 192) * 0.75 + 30
        ny = (y - 263) * 0.75 + 25
        return f"{nx:.1f},{ny:.1f}"
    def tr(x, y, w, h):
        nx = (x - 192) * 0.75 + 30
        ny = (y - 263) * 0.75 + 25
        return f'x="{nx:.1f}" y="{ny:.1f}" width="{w*0.75:.1f}" height="{h*0.75:.1f}"'

    elements = []
    # i
    elements.append(f'  <rect {tr(192, 263, 26, 24)} fill="{gold}" />')
    elements.append(f'  <rect {tr(195, 300, 22, 64)} fill="{fg}" />')
    # N
    p_n_left = f"M {t(240, 287)} L {t(259, 306)} L {t(259, 364)} L {t(240, 364)} Z"
    p_n_diag = f"M {t(237, 264)} L {t(264, 264)} L {t(360, 364)} L {t(334, 364)} Z"
    p_n_right = f"M {t(334, 264)} L {t(353, 264)} L {t(353, 336)} L {t(334, 317)} Z"
    elements.append(f'  <path d="{p_n_left} {p_n_diag} {p_n_right}" fill="{fg}" />')
    # E
    elements.append(f'  <rect {tr(377, 264, 77, 18)} fill="{fg}" />')
    elements.append(f'  <rect {tr(377, 305, 77, 18)} fill="{fg}" />')
    elements.append(f'  <rect {tr(377, 346, 77, 18)} fill="{fg}" />')
    # S
    p_s = (f"M {t(506, 262)} L {t(527, 266)} L {t(538, 272)} L {t(543, 277)} L {t(532, 287)} "
           f"L {t(514, 278)} L {t(503, 278)} L {t(498, 280)} L {t(493, 285)} L {t(493, 291)} "
           f"L {t(498, 297)} L {t(536, 314)} L {t(545, 321)} L {t(548, 331)} L {t(548, 343)} "
           f"L {t(540, 353)} L {t(528, 361)} L {t(515, 364)} L {t(495, 364)} L {t(478, 358)} "
           f"L {t(473, 348)} L {t(485, 339)} L {t(503, 348)} L {t(516, 348)} L {t(523, 345)} "
           f"L {t(527, 339)} L {t(524, 332)} L {t(517, 328)} L {t(486, 313)} L {t(477, 306)} "
           f"L {t(474, 297)} L {t(474, 284)} L {t(482, 273)} L {t(494, 265)} Z")
    elements.append(f'  <path d="{p_s}" fill="{fg}" />')
    # T
    elements.append(f'  <rect {tr(560, 264, 79, 18)} fill="{fg}" />')
    elements.append(f'  <rect {tr(591, 297, 21, 67)} fill="{fg}" />')
    # Y
    elements.append(f'  <polygon points="{t(650, 264)} {t(673, 264)} {t(692, 308)} {t(692, 364)} {t(712, 364)} {t(712, 308)} {t(731, 264)} {t(753, 264)} {t(716, 316)} {t(687, 316)}" fill="{fg}" />')
    # L
    elements.append(f'  <rect {tr(765, 264, 20, 68)} fill="{fg}" />')
    elements.append(f'  <rect {tr(765, 346, 77, 18)} fill="{fg}" />')

    # Gold Vertical Divider
    elements.append(f'  <!-- Gold Vertical Divider -->')
    elements.append(f'  <line x1="550" y1="28" x2="550" y2="102" stroke="{gold}" stroke-width="2" stroke-linecap="round" />')

    # OUTLET Typography (Clean widely spaced)
    elements.append(f'  <!-- OUTLET Typography -->')
    elements.append(f'  <text x="580" y="72" font-family="Manrope, Inter, sans-serif" font-size="28" font-weight="700" letter-spacing="14" fill="{fg}">OUTLET</text>')

    body = "\n".join(elements)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 130" width="900" height="130">
{bg_rect}{body}
</svg>"""
    path = os.path.join(OUT_DIR, name)
    with open(path, "w") as f:
        f.write(svg)
    return path

# 3. Monogram Icon (iN with gold square dot and gold underline)
def build_monogram(fg, bg, gold, name):
    bg_rect = f'<rect width="240" height="240" fill="{bg}" />\n' if bg else ""
    # Center the monogram inside 240x240 box
    # Monogram width = 162px, height = 131px
    # ox = (240 - 162)/2 = 39, oy = (240 - 131)/2 = 54
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="240" height="240">
{bg_rect}{get_monogram_paths(fg, gold, ox=39, oy=54, scale=1.0)}
</svg>"""
    path = os.path.join(OUT_DIR, name)
    with open(path, "w") as f:
        f.write(svg)
    return path

# 4. Favicon (Crisp 32x32 / 64x64 viewbox)
def build_favicon(name):
    # Favicon with subtle rounded rect background in Warm Ivory and crisp monogram
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="{PRIMARY_BLACK}" />
  <g transform="translate(10, 11) scale(0.27)">
{get_monogram_paths(PURE_WHITE, CHAMPAGNE_GOLD, ox=0, oy=0, scale=1.0)}
  </g>
</svg>"""
    path = os.path.join(OUT_DIR, name)
    with open(path, "w") as f:
        f.write(svg)
    return path

# Generate all variations
files = []

# Primary Stacked
files.append(build_primary_stacked(PRIMARY_BLACK, None, CHAMPAGNE_GOLD, "logo-primary-stacked.svg"))
files.append(build_primary_stacked(PURE_WHITE, None, CHAMPAGNE_GOLD, "logo-primary-stacked-dark.svg"))
files.append(build_primary_stacked(PRIMARY_BLACK, WARM_IVORY, CHAMPAGNE_GOLD, "logo-primary-stacked-light.svg"))

# Horizontal
files.append(build_horizontal(PRIMARY_BLACK, None, CHAMPAGNE_GOLD, "logo-horizontal.svg"))
files.append(build_horizontal(PURE_WHITE, None, CHAMPAGNE_GOLD, "logo-horizontal-dark.svg"))
files.append(build_horizontal(PRIMARY_BLACK, WARM_IVORY, CHAMPAGNE_GOLD, "logo-horizontal-light.svg"))

# Monogram Icon
files.append(build_monogram(PRIMARY_BLACK, None, CHAMPAGNE_GOLD, "logo-monogram.svg"))
files.append(build_monogram(PURE_WHITE, None, CHAMPAGNE_GOLD, "logo-monogram-dark.svg"))
files.append(build_monogram(PRIMARY_BLACK, WARM_IVORY, CHAMPAGNE_GOLD, "logo-monogram-light.svg"))

# Favicon
files.append(build_favicon("favicon.svg"))

print(f"Generated {len(files)} SVG assets in {OUT_DIR}:")
for f in files:
    print(f" - {os.path.basename(f)}")

# Export High-Res PNGs using sips
print("\nExporting PNG assets with sips...")
png_exports = [
    ("logo-primary-stacked.svg", "logo-primary-stacked.png", 1460, 500),
    ("logo-primary-stacked-dark.svg", "logo-primary-stacked-dark.png", 1460, 500),
    ("logo-primary-stacked-light.svg", "logo-primary-stacked-light.png", 1460, 500),
    ("logo-horizontal.svg", "logo-horizontal.png", 1800, 260),
    ("logo-horizontal-dark.svg", "logo-horizontal-dark.png", 1800, 260),
    ("logo-monogram.svg", "logo-monogram.png", 512, 512),
    ("logo-monogram-dark.svg", "logo-monogram-dark.png", 512, 512),
    ("favicon.svg", "favicon-32x32.png", 32, 32),
    ("favicon.svg", "favicon-180x180.png", 180, 180),
]

for src_svg, dst_png, width, height in png_exports:
    src_path = os.path.join(OUT_DIR, src_svg)
    dst_path = os.path.join(OUT_DIR, dst_png)
    res = subprocess.run(["sips", "-z", str(height), str(width), "-s", "format", "png", src_path, "--out", dst_path],
                         capture_output=True, text=True)
    if res.returncode == 0:
        print(f" - Exported {dst_png} ({width}x{height})")
    else:
        print(f" ! Failed {dst_png}: {res.stderr}")

# Export ICO favicon
fav_ico = os.path.join(OUT_DIR, "favicon.ico")
res = subprocess.run(["sips", "-z", "32", "32", "-s", "format", "ico", os.path.join(OUT_DIR, "favicon.svg"), "--out", fav_ico],
                     capture_output=True, text=True)
if res.returncode == 0:
    print(f" - Exported favicon.ico (32x32)")
