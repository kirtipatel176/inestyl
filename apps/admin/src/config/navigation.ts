import { NavigationConfig } from "@/types";

export const DEFAULT_NAVIGATION_CONFIG: NavigationConfig = {
  header: [
    { id: "nav-shoes", label: "Shoes", href: "/shoes", visible: true, order: 1 },
    { id: "nav-clothing", label: "Clothing", href: "/clothing", visible: true, order: 2 },
    { id: "nav-men", label: "Men", href: "/gender/men", visible: true, order: 3 },
    { id: "nav-women", label: "Women", href: "/gender/women", visible: true, order: 4 },
    { id: "nav-sale", label: "Sale", href: "/collections/sale", badge: "Up to 50% Off", visible: true, order: 5 },
  ],
  footwearMegaMenu: [
    {
      id: "fw-categories",
      title: "Footwear Categories",
      visible: true,
      order: 1,
      links: [
        { id: "fw-all", label: "All Shoes", href: "/shoes", visible: true, order: 1 },
        { id: "fw-sneakers", label: "Sneakers", href: "/shoes/sneakers", visible: true, order: 2 },
        { id: "fw-running", label: "Running Shoes", href: "/shoes/running", visible: true, order: 3 },
        { id: "fw-casual", label: "Casual Shoes", href: "/shoes/casual", visible: true, order: 4 },
        { id: "fw-slides", label: "Slides & Sandals", href: "/shoes/slides", visible: true, order: 5 },
      ],
    },
    {
      id: "fw-brands",
      title: "Top Footwear Brands",
      visible: true,
      order: 2,
      links: [
        { id: "fw-nike", label: "Nike", href: "/brands/nike", visible: true, order: 1 },
        { id: "fw-adidas", label: "Adidas", href: "/brands/adidas", visible: true, order: 2 },
        { id: "fw-puma", label: "Puma", href: "/brands/puma", visible: true, order: 3 },
        { id: "fw-hoka", label: "Hoka", href: "/brands/hoka", visible: true, order: 4 },
      ],
    },
  ],
  clothingMegaMenu: [
    {
      id: "cl-categories",
      title: "Clothing Categories",
      visible: true,
      order: 1,
      links: [
        { id: "cl-all", label: "All Clothing", href: "/clothing", visible: true, order: 1 },
        { id: "cl-tshirts", label: "T-Shirts & Polos", href: "/clothing/t-shirts", visible: true, order: 2 },
        { id: "cl-hoodies", label: "Hoodies & Sweatshirts", href: "/clothing/hoodies", visible: true, order: 3 },
        { id: "cl-jackets", label: "Jackets & Outerwear", href: "/clothing/jackets", visible: true, order: 4 },
        { id: "cl-jeans", label: "Jeans & Trousers", href: "/clothing/jeans", visible: true, order: 5 },
      ],
    },
    {
      id: "cl-brands",
      title: "Featured Apparel Brands",
      visible: true,
      order: 2,
      links: [
        { id: "cl-levis", label: "Levi's", href: "/brands/levis", visible: true, order: 1 },
        { id: "cl-diesel", label: "Diesel", href: "/brands/diesel", visible: true, order: 2 },
        { id: "cl-uspa", label: "U.S. Polo Assn.", href: "/brands/us-polo-assn", visible: true, order: 3 },
      ],
    },
  ],
  menMegaMenu: [
    {
      id: "men-featured",
      title: "Men's Collection",
      visible: true,
      order: 1,
      links: [
        { id: "men-all", label: "All Men's", href: "/gender/men", visible: true, order: 1 },
        { id: "men-shoes", label: "Men's Shoes", href: "/gender/men/shoes", visible: true, order: 2 },
        { id: "men-clothing", label: "Men's Clothing", href: "/gender/men/clothing", visible: true, order: 3 },
      ],
    },
  ],
  womenMegaMenu: [
    {
      id: "wom-featured",
      title: "Women's Collection",
      visible: true,
      order: 1,
      links: [
        { id: "wom-all", label: "All Women's", href: "/gender/women", visible: true, order: 1 },
        { id: "wom-shoes", label: "Women's Shoes", href: "/gender/women/shoes", visible: true, order: 2 },
        { id: "wom-clothing", label: "Women's Clothing", href: "/gender/women/clothing", visible: true, order: 3 },
      ],
    },
  ],
  collections: [
    { id: "col-new-arrivals", label: "New Arrivals", href: "/collections/new-arrivals", visible: true, order: 1 },
    { id: "col-trending", label: "Trending Styles", href: "/collections/trending-styles", visible: true, order: 2 },
    { id: "col-sports", label: "Sports Performance", href: "/collections/sports-performance", visible: true, order: 3 },
    { id: "col-weekend", label: "Weekend Edit", href: "/collections/weekend-edit", visible: true, order: 4 },
  ],
  brands: [
    { id: "br-nike", label: "Nike", href: "/brands/nike", visible: true, order: 1 },
    { id: "br-adidas", label: "Adidas", href: "/brands/adidas", visible: true, order: 2 },
    { id: "br-puma", label: "Puma", href: "/brands/puma", visible: true, order: 3 },
    { id: "br-hoka", label: "Hoka", href: "/brands/hoka", visible: true, order: 4 },
    { id: "br-diesel", label: "Diesel", href: "/brands/diesel", visible: true, order: 5 },
    { id: "br-levis", label: "Levi's", href: "/brands/levis", visible: true, order: 6 },
    { id: "br-uspa", label: "U.S. Polo Assn.", href: "/brands/us-polo-assn", visible: true, order: 7 },
  ],
  footer: [
    {
      id: "footer-shop",
      title: "Shop",
      visible: true,
      order: 1,
      links: [
        { id: "f-shoes", label: "Footwear", href: "/shoes", visible: true, order: 1 },
        { id: "f-clothing", label: "Clothing", href: "/clothing", visible: true, order: 2 },
        { id: "f-brands", label: "Brands", href: "/brands", visible: true, order: 3 },
        { id: "f-sale", label: "Sale & Offers", href: "/collections/sale", visible: true, order: 4 },
      ],
    },
    {
      id: "footer-about",
      title: "About",
      visible: true,
      order: 2,
      links: [
        { id: "f-store", label: "Kapadwanj Flagship", href: "/store-locator", visible: true, order: 1 },
        { id: "f-authenticity", label: "100% Authenticity Guarantee", href: "/authenticity", visible: true, order: 2 },
        { id: "f-contact", label: "Contact Us", href: "/contact", visible: true, order: 3 },
      ],
    },
    {
      id: "footer-help",
      title: "Help",
      visible: true,
      order: 3,
      links: [
        { id: "f-sizing", label: "Size Guides", href: "/size-guide", visible: true, order: 1 },
        { id: "f-shipping", label: "Shipping & Delivery", href: "/shipping", visible: true, order: 2 },
        { id: "f-returns", label: "Returns & Exchanges", href: "/returns", visible: true, order: 3 },
      ],
    },
  ],
};
