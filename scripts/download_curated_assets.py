import os
import urllib.request

IMAGE_DIRS = [
    "public/images/hero",
    "public/images/products",
    "public/images/categories",
    "public/images/store",
    "public/images/brands",
]

for d in IMAGE_DIRS:
    os.makedirs(d, exist_ok=True)

# Curated URLs matching the reference showcase aesthetic
CURATED = {
    # 1. Hero Composite / Split Banner
    "public/images/hero/hero-lifestyle-composite.jpg": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=85",
    "public/images/hero/hero-sneaker-apparel.jpg": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",

    # 2. Category Banners
    "public/images/categories/category-footwear.jpg": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=85",
    "public/images/categories/category-apparel.jpg": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85",

    # 3. New Arrivals Banner Texture
    "public/images/hero/new-arrivals-banner.jpg": "https://images.unsplash.com/photo-1512374382149-233c42b6683b?auto=format&fit=crop&w=1400&q=85",

    # 4. Products matching reference
    "public/images/products/nike-air-max-270.jpg": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=85",
    "public/images/products/nike-air-max-270-side.jpg": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=85",
    "public/images/products/nike-air-max-270-top.jpg": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=85",
    "public/images/products/nike-air-max-270-sole.jpg": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=85",

    "public/images/products/puma-rs-x.jpg": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=85",
    "public/images/products/adidas-ultraboost.jpg": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=800&q=85",
    "public/images/products/hoka-clifton-9.jpg": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=85",
    
    # Apparel Products
    "public/images/products/levis-501-original.jpg": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85",
    "public/images/products/diesel-denim-jacket.jpg": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=85",
    "public/images/products/us-polo-classic-tee.jpg": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85",
    "public/images/products/nike-club-hoodie.jpg": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=85",

    # 5. Store / About Us Photography
    "public/images/store/store-interior-1.jpg": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=85",
    "public/images/store/store-interior-2.jpg": "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=85",
    "public/images/store/store-interior-3.jpg": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=85",
}

headers = {'User-Agent': 'Mozilla/5.0'}
for path, url in CURATED.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp, open(path, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded: {path}")
    except Exception as e:
        print(f"Failed {path}: {e}")

