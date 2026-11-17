export interface NavSubcategory {
  name: string;
  slug: string;
  href: string;
  badge?: string;
}

export const SHOES_SUBCATEGORIES: NavSubcategory[] = [
  { name: "Sneakers", slug: "sneakers", href: "/shoes/sneakers" },
  { name: "Running Shoes", slug: "running-shoes", href: "/shoes/running" },
  { name: "Walking Shoes", slug: "walking-shoes", href: "/shoes?shoeType=Walking" },
  { name: "Sports Shoes", slug: "sports-shoes", href: "/shoes?shoeType=Sports" },
  { name: "Casual Shoes", slug: "casual-shoes", href: "/shoes/casual" },
  { name: "Lifestyle Shoes", slug: "lifestyle-shoes", href: "/shoes?shoeType=Lifestyle" },
  { name: "Training Shoes", slug: "training-shoes", href: "/shoes?shoeType=Training" },
];

export const CLOTHING_SUBCATEGORIES: NavSubcategory[] = [
  { name: "T-Shirts", slug: "t-shirts", href: "/clothing?clothingCategory=T-Shirts" },
  { name: "Polo T-Shirts", slug: "polo-t-shirts", href: "/clothing?clothingCategory=Polo+T-Shirts" },
  { name: "Shirts", slug: "shirts", href: "/clothing?clothingCategory=Shirts" },
  { name: "Jeans", slug: "jeans", href: "/clothing?clothingCategory=Jeans" },
  { name: "Trousers", slug: "trousers", href: "/clothing?clothingCategory=Trousers" },
  { name: "Shorts", slug: "shorts", href: "/clothing?clothingCategory=Shorts" },
  { name: "Hoodies", slug: "hoodies", href: "/clothing?clothingCategory=Hoodies" },
  { name: "Sweatshirts", slug: "sweatshirts", href: "/clothing?clothingCategory=Sweatshirts" },
  { name: "Jackets", slug: "jackets", href: "/clothing?clothingCategory=Jackets" },
  { name: "Sportswear", slug: "sportswear", href: "/clothing?clothingCategory=Sportswear" },
];

export const MEN_SUBCATEGORIES: NavSubcategory[] = [
  { name: "Men's Sneakers", slug: "mens-sneakers", href: "/men/shoes" },
  { name: "Running Trainers", slug: "mens-running", href: "/shoes/running?gender=Men" },
  { name: "Denim & Jeans", slug: "mens-jeans", href: "/clothing?gender=Men&clothingCategory=Jeans" },
  { name: "Pique Polos & Tees", slug: "mens-polos", href: "/clothing?gender=Men&clothingCategory=T-Shirts" },
  { name: "Hoodies & Jackets", slug: "mens-jackets", href: "/clothing?gender=Men&clothingCategory=Jackets" },
];

export const WOMEN_SUBCATEGORIES: NavSubcategory[] = [
  { name: "Women's Sneakers", slug: "womens-sneakers", href: "/women/shoes" },
  { name: "Road Running Shoes", slug: "womens-running", href: "/shoes/running?gender=Women" },
  { name: "Lifestyle Trainers", slug: "womens-lifestyle", href: "/shoes/casual?gender=Women" },
  { name: "Tees & Hoodies", slug: "womens-apparel", href: "/clothing?gender=Women" },
];

export const NAV_BRANDS = [
  { id: "nike", name: "Nike", slug: "nike", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/nike.svg", category: "both" },
  { id: "puma", name: "Puma", slug: "puma", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/puma.svg", category: "both" },
  { id: "adidas", name: "adidas", slug: "adidas", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/adidas.svg", category: "both" },
  { id: "hoka", name: "HOKA", slug: "hoka", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/hoka.svg", category: "footwear" },
  { id: "levis", name: "Levi's", slug: "levis", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/levis.svg", category: "apparel" },
  { id: "diesel", name: "DIESEL", slug: "diesel", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/diesel.svg", category: "apparel" },
  { id: "us-polo-assn", name: "U.S. Polo Assn.", slug: "us-polo-assn", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/us-polo-assn.svg", category: "apparel" },
];

export const NAV_COLLECTIONS = [
  { id: "col-1", title: "New Arrivals", slug: "new-arrivals" },
  { id: "col-2", title: "Trending Styles", slug: "trending-styles" },
  { id: "col-3", title: "Everyday Essentials", slug: "everyday-essentials" },
  { id: "col-4", title: "Sports & Performance", slug: "sports-performance" },
  { id: "col-5", title: "Sneakers Collection", slug: "sneakers-collection" },
  { id: "col-6", title: "Running Collection", slug: "running-collection" },
  { id: "col-7", title: "Casual Wear", slug: "casual-wear" },
  { id: "col-8", title: "Premium Clothing", slug: "premium-clothing" },
  { id: "col-9", title: "Weekend Edit", slug: "weekend-edit" },
  { id: "col-10", title: "Seasonal Collection", slug: "seasonal-collection" },
  { id: "col-11", title: "Outlet Exclusives", slug: "outlet-exclusives" },
];
