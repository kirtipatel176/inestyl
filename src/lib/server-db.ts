import fs from "fs";
import path from "path";
import {
  Product,
  Brand,
  CollectionItem,
  StoreEnquiry,
  NavigationConfig,
  SizeGuideTable,
  AnalyticsEvent,
  NotificationItem,
  NotificationSettings,
  AuditLogEntry,
  BackupSnapshotMeta,
  HomepageSectionConfig,
  ProductVariant,
} from "@/types";
import {
  PRODUCTS_DATA,
  BRANDS_DATA,
  COLLECTIONS_DATA,
  INITIAL_ENQUIRIES,
} from "@/constants/mock-data";
import { STORE_DETAILS } from "@/constants";

export interface DatabaseSchema {
  products: Product[];
  brands: Brand[];
  collections: CollectionItem[];
  enquiries: StoreEnquiry[];
  navigation: NavigationConfig;
  sizeGuides: Record<string, SizeGuideTable>;
  homepageSections: HomepageSectionConfig[];
  notifications: NotificationItem[];
  notificationSettings: NotificationSettings;
  auditLogs: AuditLogEntry[];
  backups: BackupSnapshotMeta[];
  analyticsEvents: AnalyticsEvent[];
  storeDetails: typeof STORE_DETAILS;
  lastUpdated: string;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const BACKUPS_DIR = path.join(DATA_DIR, "backups");

// Default Navigation Tree
const DEFAULT_NAVIGATION: NavigationConfig = {
  header: [
    { id: "nav-men", label: "Men", href: "/men", visible: true, order: 1 },
    { id: "nav-women", label: "Women", href: "/women", visible: true, order: 2 },
    { id: "nav-shoes", label: "Shoes", href: "/shoes", visible: true, order: 3 },
    { id: "nav-clothing", label: "Clothing", href: "/clothing", visible: true, order: 4 },
    { id: "nav-collections", label: "Collections", href: "/collections", visible: true, order: 5 },
    { id: "nav-brands", label: "Brands", href: "/brands", visible: true, order: 6 },
    { id: "nav-our-label", label: "Our Label", href: "/our-label", visible: true, order: 7, badge: "Flagship" },
  ],
  footwearMegaMenu: [
    {
      id: "sec-fw-categories",
      title: "Footwear Categories",
      visible: true,
      order: 1,
      links: [
        { id: "fw-all", label: "All Shoes", href: "/shoes", visible: true, order: 1 },
        { id: "fw-sneakers", label: "Lifestyle Sneakers", href: "/shoes/sneakers", visible: true, order: 2, badge: "Trending" },
        { id: "fw-running", label: "Road Running Shoes", href: "/shoes/running", visible: true, order: 3 },
        { id: "fw-casual", label: "Casual Everyday Shoes", href: "/shoes/casual", visible: true, order: 4 },
        { id: "fw-sports", label: "Sports & Training", href: "/shoes", visible: true, order: 5 },
      ],
    },
    {
      id: "sec-fw-gender",
      title: "Shop By Gender",
      visible: true,
      order: 2,
      links: [
        { id: "fw-g-men", label: "Men's Footwear", href: "/men/shoes", visible: true, order: 1 },
        { id: "fw-g-women", label: "Women's Footwear", href: "/women/shoes", visible: true, order: 2 },
        { id: "fw-g-unisex", label: "Unisex Silhouettes", href: "/footwear", visible: true, order: 3 },
      ],
    },
    {
      id: "sec-fw-brands",
      title: "Top Footwear Brands",
      visible: true,
      order: 3,
      links: [
        { id: "fw-b-nike", label: "Nike Air & Running", href: "/brands/nike", visible: true, order: 1 },
        { id: "fw-b-puma", label: "Puma RS & Motorsport", href: "/brands/puma", visible: true, order: 2 },
        { id: "fw-b-adidas", label: "adidas Boost & Originals", href: "/brands/adidas", visible: true, order: 3 },
        { id: "fw-b-hoka", label: "HOKA Maximum Cushion", href: "/brands/hoka", visible: true, order: 4 },
      ],
    },
  ],
  clothingMegaMenu: [
    {
      id: "sec-cl-categories",
      title: "Apparel Categories",
      visible: true,
      order: 1,
      links: [
        { id: "cl-all", label: "All Clothing", href: "/clothing", visible: true, order: 1 },
        { id: "cl-tshirts", label: "T-Shirts & Polos", href: "/clothing", visible: true, order: 2 },
        { id: "cl-jeans", label: "Denim & Jeans", href: "/clothing", visible: true, order: 3, badge: "Must Have" },
        { id: "cl-shirts", label: "Casual & Formal Shirts", href: "/clothing", visible: true, order: 4 },
        { id: "cl-jackets", label: "Jackets & Hoodies", href: "/clothing", visible: true, order: 5 },
      ],
    },
    {
      id: "sec-cl-gender",
      title: "Shop By Gender",
      visible: true,
      order: 2,
      links: [
        { id: "cl-g-men", label: "Men's Apparel", href: "/men", visible: true, order: 1 },
        { id: "cl-g-women", label: "Women's Apparel", href: "/women", visible: true, order: 2 },
      ],
    },
    {
      id: "sec-cl-brands",
      title: "Featured Clothing Brands",
      visible: true,
      order: 3,
      links: [
        { id: "cl-b-levis", label: "Levi's Original Denim", href: "/brands/levis", visible: true, order: 1 },
        { id: "cl-b-diesel", label: "DIESEL Premium Wear", href: "/brands/diesel", visible: true, order: 2 },
        { id: "cl-b-uspolo", label: "U.S. Polo Assn. Heritage", href: "/brands/us-polo-assn", visible: true, order: 3 },
      ],
    },
  ],
  menMegaMenu: [
    {
      id: "sec-men-shoes",
      title: "Men's Footwear",
      visible: true,
      order: 1,
      links: [
        { id: "men-all-shoes", label: "All Men's Shoes", href: "/men/shoes", visible: true, order: 1 },
        { id: "men-sneakers", label: "Sneakers & Streetwear", href: "/shoes/sneakers", visible: true, order: 2 },
        { id: "men-running", label: "Running Performance", href: "/shoes/running", visible: true, order: 3 },
      ],
    },
    {
      id: "sec-men-apparel",
      title: "Men's Apparel",
      visible: true,
      order: 2,
      links: [
        { id: "men-tshirts", label: "Crew & Graphic Tees", href: "/clothing", visible: true, order: 1 },
        { id: "men-polo", label: "Polo T-Shirts", href: "/clothing", visible: true, order: 2 },
        { id: "men-jeans", label: "Straight & Slim Jeans", href: "/clothing", visible: true, order: 3 },
      ],
    },
  ],
  womenMegaMenu: [
    {
      id: "sec-women-shoes",
      title: "Women's Footwear",
      visible: true,
      order: 1,
      links: [
        { id: "women-all-shoes", label: "All Women's Shoes", href: "/women/shoes", visible: true, order: 1 },
        { id: "women-sneakers", label: "Fashion Sneakers", href: "/shoes/sneakers", visible: true, order: 2 },
        { id: "women-running", label: "Cushioned Runners", href: "/shoes/running", visible: true, order: 3 },
      ],
    },
    {
      id: "sec-women-apparel",
      title: "Women's Apparel",
      visible: true,
      order: 2,
      links: [
        { id: "women-tops", label: "Tops & T-Shirts", href: "/clothing", visible: true, order: 1 },
        { id: "women-jeans", label: "Skinny & High-Rise Jeans", href: "/clothing", visible: true, order: 2 },
      ],
    },
  ],
  collections: [
    { id: "col-nav-trending", label: "Trending Styles", href: "/collections/trending-styles", visible: true, order: 1, badge: "Popular" },
    { id: "col-nav-new", label: "New Arrivals Drop", href: "/collections/new-arrivals", visible: true, order: 2 },
    { id: "col-nav-essentials", label: "Everyday Essentials", href: "/collections/everyday-essentials", visible: true, order: 3 },
    { id: "col-nav-exclusives", label: "Outlet Exclusives", href: "/collections/outlet-exclusives", visible: true, order: 4 },
  ],
  brands: [
    { id: "b-nav-nike", label: "Nike", href: "/brands/nike", visible: true, order: 1 },
    { id: "b-nav-puma", label: "Puma", href: "/brands/puma", visible: true, order: 2 },
    { id: "b-nav-adidas", label: "adidas", href: "/brands/adidas", visible: true, order: 3 },
    { id: "b-nav-hoka", label: "HOKA", href: "/brands/hoka", visible: true, order: 4 },
    { id: "b-nav-levis", label: "Levi's", href: "/brands/levis", visible: true, order: 5 },
    { id: "b-nav-diesel", label: "DIESEL", href: "/brands/diesel", visible: true, order: 6 },
    { id: "b-nav-uspolo", label: "U.S. Polo Assn.", href: "/brands/us-polo-assn", visible: true, order: 7 },
  ],
  footer: [
    {
      id: "ft-col-explore",
      title: "Explore",
      visible: true,
      order: 1,
      links: [
        { id: "ft-all-prod", label: "All Products", href: "/products", visible: true, order: 1 },
        { id: "ft-shoes", label: "Footwear Catalogue", href: "/shoes", visible: true, order: 2 },
        { id: "ft-clothing", label: "Apparel Catalogue", href: "/clothing", visible: true, order: 3 },
        { id: "ft-new", label: "New Arrivals", href: "/new-arrivals", visible: true, order: 4 },
        { id: "ft-brands", label: "Authorized Brands", href: "/brands", visible: true, order: 5 },
      ],
    },
    {
      id: "ft-col-flagship",
      title: "Flagship Store",
      visible: true,
      order: 2,
      links: [
        { id: "ft-visit", label: "Visit Kapadwanj Store", href: "/store", visible: true, order: 1 },
        { id: "ft-about", label: "About INESTYLE OUTLET", href: "/about", visible: true, order: 2 },
        { id: "ft-label", label: "Our Label & Philosophy", href: "/our-label", visible: true, order: 3 },
        { id: "ft-contact", label: "Store Concierge & Contact", href: "/contact", visible: true, order: 4 },
      ],
    },
    {
      id: "ft-col-customer",
      title: "Customer Guidance",
      visible: true,
      order: 3,
      links: [
        { id: "ft-size", label: "Size & Fit Guide", href: "/size-guide", visible: true, order: 1 },
        { id: "ft-faq", label: "Frequently Asked Questions", href: "/faq", visible: true, order: 2 },
        { id: "ft-returns", label: "Exchange & Store Returns", href: "/returns", visible: true, order: 3 },
      ],
    },
    {
      id: "ft-col-legal",
      title: "Legal & Compliance",
      visible: true,
      order: 4,
      links: [
        { id: "ft-privacy", label: "Privacy Policy", href: "/privacy", visible: true, order: 1 },
        { id: "ft-terms", label: "Terms of Service", href: "/terms", visible: true, order: 2 },
        { id: "ft-access", label: "Accessibility Statement", href: "/accessibility", visible: true, order: 3 },
      ],
    },
  ],
};

// Default Size Guides
const DEFAULT_SIZE_GUIDES: Record<string, SizeGuideTable> = {
  menFootwear: {
    id: "sg-men-footwear",
    key: "menFootwear",
    title: "Men's Footwear Conversion Chart",
    category: "footwear",
    gender: "Men",
    description: "Standard UK, US Men, EU, and foot length (CM) conversion table for athletic and casual footwear.",
    measuringTip: "Stand barefoot on a piece of paper with your heel against a flat wall. Mark the longest point of your toe and measure the distance in centimeters.",
    headers: [
      { key: "uk", label: "UK (Store Default)" },
      { key: "usMen", label: "US Men" },
      { key: "eu", label: "EU" },
      { key: "cm", label: "Foot Length (CM)" },
    ],
    rows: [
      { id: "mf-1", uk: "6.0", usMen: "6.5", eu: "39.5", cm: "24.5" },
      { id: "mf-2", uk: "7.0", usMen: "7.5", eu: "41.0", cm: "25.5" },
      { id: "mf-3", uk: "8.0", usMen: "8.5", eu: "42.5", cm: "26.5" },
      { id: "mf-4", uk: "9.0", usMen: "9.5", eu: "44.0", cm: "27.5" },
      { id: "mf-5", uk: "10.0", usMen: "10.5", eu: "45.0", cm: "28.5" },
      { id: "mf-6", uk: "11.0", usMen: "11.5", eu: "46.5", cm: "29.5" },
      { id: "mf-7", uk: "12.0", usMen: "12.5", eu: "47.5", cm: "30.5" },
    ],
    updatedAt: new Date().toISOString(),
    isPublished: true,
  },
  womenFootwear: {
    id: "sg-women-footwear",
    key: "womenFootwear",
    title: "Women's Footwear Conversion Chart",
    category: "footwear",
    gender: "Women",
    description: "UK, US Women, EU, and CM conversion for women's lifestyle and running footwear.",
    measuringTip: "If you have wider feet or prefer extra room in running footwear, consider going up by half a UK size.",
    headers: [
      { key: "uk", label: "UK (Store Default)" },
      { key: "usWomen", label: "US Women" },
      { key: "eu", label: "EU" },
      { key: "cm", label: "Foot Length (CM)" },
    ],
    rows: [
      { id: "wf-1", uk: "3.5", usWomen: "5.5", eu: "36.0", cm: "22.5" },
      { id: "wf-2", uk: "4.5", usWomen: "6.5", eu: "37.5", cm: "23.5" },
      { id: "wf-3", uk: "5.5", usWomen: "7.5", eu: "38.5", cm: "24.5" },
      { id: "wf-4", uk: "6.5", usWomen: "8.5", eu: "40.0", cm: "25.5" },
      { id: "wf-5", uk: "7.5", usWomen: "9.5", eu: "41.5", cm: "26.5" },
      { id: "wf-6", uk: "8.5", usWomen: "10.5", eu: "42.5", cm: "27.5" },
    ],
    updatedAt: new Date().toISOString(),
    isPublished: true,
  },
  unisexFootwear: {
    id: "sg-unisex-footwear",
    key: "unisexFootwear",
    title: "Unisex & Heritage Footwear Conversion Chart",
    category: "footwear",
    gender: "Unisex",
    description: "Universal cross-gender sizing for iconic sneaker silhouettes.",
    measuringTip: "Unisex shoes are based on standard Men's UK sizing. Women should subtract 1.5 to 2 from their usual US Women size.",
    headers: [
      { key: "uk", label: "UK (Unisex)" },
      { key: "usMen", label: "US Men" },
      { key: "usWomen", label: "US Women" },
      { key: "eu", label: "EU" },
      { key: "cm", label: "CM" },
    ],
    rows: [
      { id: "uf-1", uk: "5.0", usMen: "5.5", usWomen: "7.0", eu: "38.0", cm: "24.0" },
      { id: "uf-2", uk: "6.0", usMen: "6.5", usWomen: "8.0", eu: "39.5", cm: "24.8" },
      { id: "uf-3", uk: "7.0", usMen: "7.5", usWomen: "9.0", eu: "41.0", cm: "25.7" },
      { id: "uf-4", uk: "8.0", usMen: "8.5", usWomen: "10.0", eu: "42.5", cm: "26.5" },
      { id: "uf-5", uk: "9.0", usMen: "9.5", usWomen: "11.0", eu: "44.0", cm: "27.4" },
      { id: "uf-6", uk: "10.0", usMen: "10.5", usWomen: "12.0", eu: "45.0", cm: "28.2" },
      { id: "uf-7", uk: "11.0", usMen: "11.5", usWomen: "13.0", eu: "46.5", cm: "29.1" },
    ],
    updatedAt: new Date().toISOString(),
    isPublished: true,
  },
  menClothing: {
    id: "sg-men-clothing",
    key: "menClothing",
    title: "Men's Apparel Size Guide",
    category: "clothing",
    gender: "Men",
    description: "Body measurements in inches for men's t-shirts, polos, shirts, and outerwear.",
    measuringTip: "Chest: Measure around the fullest part of your chest, keeping tape horizontal. Waist: Measure around natural waistline.",
    headers: [
      { key: "size", label: "Standard Size" },
      { key: "chest", label: "Chest (Inches)" },
      { key: "waist", label: "Waist (Inches)" },
      { key: "collar", label: "Collar (Inches)" },
      { key: "length", label: "Length (Inches)" },
    ],
    rows: [
      { id: "mc-1", size: "S", chest: "36 - 38", waist: "30 - 31", collar: "14.5", length: "27.5" },
      { id: "mc-2", size: "M", chest: "39 - 41", waist: "32 - 33", collar: "15.5", length: "28.5" },
      { id: "mc-3", size: "L", chest: "42 - 44", waist: "34 - 36", collar: "16.5", length: "29.5" },
      { id: "mc-4", size: "XL", chest: "45 - 47", waist: "37 - 39", collar: "17.5", length: "30.5" },
      { id: "mc-5", size: "XXL", chest: "48 - 50", waist: "40 - 42", collar: "18.5", length: "31.5" },
    ],
    updatedAt: new Date().toISOString(),
    isPublished: true,
  },
  womenClothing: {
    id: "sg-women-clothing",
    key: "womenClothing",
    title: "Women's Apparel Size Guide",
    category: "clothing",
    gender: "Women",
    description: "Body measurements in inches for women's tees, tops, and casual apparel.",
    measuringTip: "Bust: Measure fullest part under armpits. Hips: Measure around fullest point of hips/seat.",
    headers: [
      { key: "size", label: "Standard Size" },
      { key: "bust", label: "Bust (Inches)" },
      { key: "waist", label: "Waist (Inches)" },
      { key: "hips", label: "Hips (Inches)" },
    ],
    rows: [
      { id: "wc-1", size: "XS", bust: "31 - 33", waist: "24 - 25", hips: "34 - 35" },
      { id: "wc-2", size: "S", bust: "34 - 35", waist: "26 - 27", hips: "36 - 37" },
      { id: "wc-3", size: "M", bust: "36 - 38", waist: "28 - 30", hips: "38 - 40" },
      { id: "wc-4", size: "L", bust: "39 - 41", waist: "31 - 33", hips: "41 - 43" },
      { id: "wc-5", size: "XL", bust: "42 - 44", waist: "34 - 37", hips: "44 - 46" },
    ],
    updatedAt: new Date().toISOString(),
    isPublished: true,
  },
};

// Default Homepage Section Ordering & Visibility
const DEFAULT_HOMEPAGE_SECTIONS: HomepageSectionConfig[] = [
  { id: "heroBanner", label: "Full-Width Hero Campaign", enabled: true, order: 1 },
  { id: "brandMarquee", label: "Authorized Brand Partners Marquee", enabled: true, order: 2 },
  { id: "curatedCategories", label: "Curated Category Exploration", enabled: true, order: 3 },
  { id: "featuredProducts", label: "Standout Footwear & Apparel Grid", enabled: true, order: 4 },
  { id: "newArrivalsBanner", label: "New Season Arrivals Banner", enabled: true, order: 5 },
  { id: "collectionsSpotlight", label: "Thematic Collection Spotlight", enabled: true, order: 6 },
  { id: "storeVisitSection", label: "Kapadwanj Flagship Store Visit", enabled: true, order: 7 },
  { id: "trustPillars", label: "Authenticity & Trust Pillars", enabled: true, order: 8 },
];

// Initial Seed Notifications
const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    type: "enquiry",
    title: "New Customer Enquiry",
    message: "Aarav Patel enquired via WhatsApp for Nike Air Max 270 (UK 9).",
    severity: "info",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false,
    link: "/admin?tab=enquiries",
  },
  {
    id: "notif-2",
    type: "low_stock",
    title: "Low Variant Stock Alert",
    message: "Puma RS-X has only 1 unit remaining for size UK 8 at Kapadwanj flagship store.",
    severity: "warning",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: false,
    link: "/admin?tab=products",
  },
  {
    id: "notif-3",
    type: "publication",
    title: "Catalogue Update Deployed",
    message: "24 verified original distributor products currently live on storefront.",
    severity: "success",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true,
  },
];

// Initial Notification Settings
const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  lowStockThreshold: 2,
  alertLowStock: true,
  alertOutOfStock: true,
  alertNewEnquiry: true,
  alertScheduledBanner: true,
  alertProductPublication: true,
  alertFailedUploads: true,
};

// Initial Seed Audit Logs
const DEFAULT_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "audit-1",
    action: "STORE_INITIALIZATION",
    entity: "Store",
    entityId: "inestyl-flagship-kapadwanj",
    entityName: "iNESTYL OUTLET Flagship",
    author: "System Administrator",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    details: "Flagship store catalogue initialized with 24 verified distributor items across Nike, adidas, Puma, HOKA, Levi's, DIESEL, and U.S. Polo Assn.",
  },
  {
    id: "audit-2",
    action: "PRODUCT_PUBLISH",
    entity: "Product",
    entityId: "prod-1",
    entityName: "Nike Air Max 270",
    author: "Store Manager (Kapadwanj)",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    previousValue: "draft",
    updatedValue: "published",
    details: "Published Nike Air Max 270 with verified outlet pricing ₹8,995 (31% OFF).",
  },
];

// Initial Real Store Events for Analytics
const DEFAULT_ANALYTICS_EVENTS: AnalyticsEvent[] = [
  { id: "evt-1", type: "product_view", targetId: "prod-1", targetName: "Nike Air Max 270", timestamp: new Date(Date.now() - 1800000).toISOString() },
  { id: "evt-2", type: "product_view", targetId: "prod-1", targetName: "Nike Air Max 270", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "evt-3", type: "product_view", targetId: "prod-3", targetName: "adidas Ultraboost Light", timestamp: new Date(Date.now() - 5400000).toISOString() },
  { id: "evt-4", type: "product_view", targetId: "prod-2", targetName: "Puma RS-X", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "evt-5", type: "collection_view", targetId: "trending-styles", targetName: "Trending Styles", timestamp: new Date(Date.now() - 9000000).toISOString() },
  { id: "evt-6", type: "collection_view", targetId: "new-arrivals", targetName: "New Arrivals", timestamp: new Date(Date.now() - 10800000).toISOString() },
  { id: "evt-7", type: "brand_view", targetId: "nike", targetName: "Nike", timestamp: new Date(Date.now() - 12600000).toISOString() },
  { id: "evt-8", type: "brand_view", targetId: "levis", targetName: "Levi's", timestamp: new Date(Date.now() - 14400000).toISOString() },
  { id: "evt-9", type: "search_query", targetName: "Air Max", metadata: { resultsCount: 4 }, timestamp: new Date(Date.now() - 16200000).toISOString() },
  { id: "evt-10", type: "search_query", targetName: "Running", metadata: { resultsCount: 8 }, timestamp: new Date(Date.now() - 18000000).toISOString() },
  { id: "evt-11", type: "whatsapp_click", targetId: "prod-1", targetName: "Nike Air Max 270", metadata: { size: "9" }, timestamp: new Date(Date.now() - 20000000).toISOString() },
  { id: "evt-12", type: "whatsapp_click", targetId: "prod-3", targetName: "adidas Ultraboost Light", metadata: { size: "8" }, timestamp: new Date(Date.now() - 22000000).toISOString() },
  { id: "evt-13", type: "product_enquiry", targetId: "prod-1", targetName: "Nike Air Max 270", metadata: { customer: "Aarav Patel" }, timestamp: new Date(Date.now() - 24000000).toISOString() },
];

let memoryDb: DatabaseSchema | null = null;

function ensureDataDirectories() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  }
}

function initializeDefaultDatabase(): DatabaseSchema {
  // Enrich initial mock products with status, timestamps, video availability, and change history
  const enrichedProducts: Product[] = PRODUCTS_DATA.map((p, idx) => ({
    ...p,
    status: "published",
    publishedAt: new Date(Date.now() - (idx + 1) * 3600000).toISOString(),
    hasVideo: idx < 6, // Top 6 products have video showcase available
    videoUrl: idx < 6 ? `/videos/products/${p.slug}.mp4` : undefined,
    changeHistory: [
      {
        id: `ch-init-${p.id}`,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        author: "Inventory Importer",
        field: "status",
        from: "draft",
        to: "published",
        summary: "Initial catalogue release for Kapadwanj flagship store.",
      },
    ],
  }));

  const initialDb: DatabaseSchema = {
    products: enrichedProducts,
    brands: BRANDS_DATA,
    collections: COLLECTIONS_DATA,
    enquiries: INITIAL_ENQUIRIES,
    navigation: DEFAULT_NAVIGATION,
    sizeGuides: DEFAULT_SIZE_GUIDES,
    homepageSections: DEFAULT_HOMEPAGE_SECTIONS,
    notifications: DEFAULT_NOTIFICATIONS,
    notificationSettings: DEFAULT_NOTIFICATION_SETTINGS,
    auditLogs: DEFAULT_AUDIT_LOGS,
    backups: [
      {
        id: "backup-initial-seed",
        timestamp: new Date().toISOString(),
        author: "System Auto-Backup",
        reason: "Initial Store Setup Snapshot",
        productsCount: enrichedProducts.length,
        sizeKb: 48,
      },
    ],
    analyticsEvents: DEFAULT_ANALYTICS_EVENTS,
    storeDetails: STORE_DETAILS,
    lastUpdated: new Date().toISOString(),
  };

  return initialDb;
}

export function getDatabase(): DatabaseSchema {
  if (memoryDb) {
    return memoryDb;
  }

  ensureDataDirectories();

  if (!fs.existsSync(DB_FILE)) {
    const initialDb = initializeDefaultDatabase();
    saveDatabase(initialDb);
    memoryDb = initialDb;
    return initialDb;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    memoryDb = JSON.parse(raw);
    return memoryDb!;
  } catch (err) {
    console.error("Failed to read database file, re-initializing:", err);
    const initialDb = initializeDefaultDatabase();
    saveDatabase(initialDb);
    memoryDb = initialDb;
    return initialDb;
  }
}

export function saveDatabase(db: DatabaseSchema): void {
  ensureDataDirectories();
  db.lastUpdated = new Date().toISOString();
  memoryDb = db;

  // Safe atomic write
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(db, null, 2), "utf-8");
  fs.renameSync(tempFile, DB_FILE);
}

// -------------------------------------------------------------
// CATALOGUE & PRODUCTS API
// -------------------------------------------------------------

/**
 * Returns products for customer-facing storefront.
 * STRICT REQUIREMENT: Does NOT show unpublished or archived products.
 * If product is scheduled, only shows if scheduledPublishDate has passed.
 */
export function getPublishedProducts(): Product[] {
  const db = getDatabase();
  const now = new Date().toISOString();

  return db.products.filter((p) => {
    // If status is explicit
    if (p.status === "archived") return false;
    if (p.status === "draft") return false;
    if (p.status === "scheduled") {
      if (!p.scheduledPublishDate) return false;
      return p.scheduledPublishDate <= now;
    }
    // Default to published if undefined or "published"
    return p.status === "published" || !p.status;
  });
}

export function getAllProducts(): Product[] {
  const db = getDatabase();
  return db.products;
}

export function getProductBySlug(slug: string, includeUnpublished = false): Product | undefined {
  const db = getDatabase();
  const product = db.products.find((p) => p.slug === slug);
  if (!product) return undefined;

  if (includeUnpublished) return product;

  // Storefront check
  const now = new Date().toISOString();
  if (product.status === "draft" || product.status === "archived") return undefined;
  if (product.status === "scheduled" && product.scheduledPublishDate && product.scheduledPublishDate > now) {
    return undefined;
  }

  return product;
}

export function createProduct(
  newProduct: Omit<Product, "id">,
  author = "Admin (Kapadwanj)"
): Product {
  const db = getDatabase();
  const id = `prod-${Date.now()}`;

  const discount =
    newProduct.discount ||
    (newProduct.mrp > 0
      ? Math.round(((newProduct.mrp - newProduct.outletPrice) / newProduct.mrp) * 100)
      : 0);

  const product: Product = {
    ...newProduct,
    id,
    discount,
    status: newProduct.status || "published",
    publishedAt: newProduct.status === "published" ? new Date().toISOString() : undefined,
    changeHistory: [
      {
        id: `ch-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author,
        field: "created",
        to: newProduct.title,
        summary: `Created product "${newProduct.title}" with SKU ${newProduct.sku}.`,
      },
    ],
  };

  db.products = [product, ...db.products];

  // Audit log
  createAuditLog({
    action: "PRODUCT_CREATE",
    entity: "Product",
    entityId: product.id,
    entityName: product.title,
    author,
    updatedValue: product.title,
    details: `Added new product: ${product.title} (${product.sku}), MRP: ₹${product.mrp}, Outlet: ₹${product.outletPrice}.`,
  });

  // Check low stock notifications for the new product
  checkProductStockNotifications(product, db);

  saveDatabase(db);
  return product;
}

export function updateProduct(
  id: string,
  updates: Partial<Product>,
  author = "Admin (Kapadwanj)"
): Product | null {
  const db = getDatabase();
  const idx = db.products.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  const current = db.products[idx];
  const historyEntries = [...(current.changeHistory || [])];

  // Record individual field changes in product change history
  for (const [key, val] of Object.entries(updates)) {
    const oldVal = (current as any)[key];
    if (JSON.stringify(oldVal) !== JSON.stringify(val)) {
      historyEntries.unshift({
        id: `ch-${Date.now()}-${key}`,
        timestamp: new Date().toISOString(),
        author,
        field: key,
        from: oldVal,
        to: val,
        summary: `Updated ${key} from ${JSON.stringify(oldVal)?.slice(0, 50)} to ${JSON.stringify(val)?.slice(0, 50)}.`,
      });
    }
  }

  // Recalculate discount if prices change
  const mrp = updates.mrp !== undefined ? updates.mrp : current.mrp;
  const outletPrice = updates.outletPrice !== undefined ? updates.outletPrice : current.outletPrice;
  const discount = mrp > 0 ? Math.round(((mrp - outletPrice) / mrp) * 100) : current.discount;

  const updated: Product = {
    ...current,
    ...updates,
    mrp,
    outletPrice,
    discount,
    changeHistory: historyEntries.slice(0, 50),
  };

  db.products[idx] = updated;

  createAuditLog({
    action: "PRODUCT_UPDATE",
    entity: "Product",
    entityId: updated.id,
    entityName: updated.title,
    author,
    previousValue: current.title,
    updatedValue: updated.title,
    details: `Updated attributes for product "${updated.title}" (${updated.sku}).`,
  });

  checkProductStockNotifications(updated, db);
  saveDatabase(db);
  return updated;
}

export function duplicateProduct(id: string, author = "Admin (Kapadwanj)"): Product | null {
  const db = getDatabase();
  const original = db.products.find((p) => p.id === id);
  if (!original) return null;

  const duplicateId = `prod-${Date.now()}`;
  const copySuffix = ` (Copy ${new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })})`;
  const newSku = `${original.sku}-COPY-${Math.floor(100 + Math.random() * 900)}`;
  const newSlug = `${original.slug}-copy-${Date.now().toString().slice(-4)}`;

  const duplicated: Product = {
    ...original,
    id: duplicateId,
    title: `${original.title}${copySuffix}`,
    sku: newSku,
    slug: newSlug,
    status: "draft",
    publishedAt: undefined,
    scheduledPublishDate: undefined,
    changeHistory: [
      {
        id: `ch-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author,
        field: "duplicate",
        summary: `Duplicated from original product "${original.title}" (${original.sku}). Set to Draft.`,
      },
    ],
  };

  db.products = [duplicated, ...db.products];

  createAuditLog({
    action: "PRODUCT_DUPLICATE",
    entity: "Product",
    entityId: duplicated.id,
    entityName: duplicated.title,
    author,
    previousValue: original.sku,
    updatedValue: duplicated.sku,
    details: `Duplicated product "${original.title}" into new draft SKU "${duplicated.sku}".`,
  });

  saveDatabase(db);
  return duplicated;
}

export function archiveProduct(id: string, archive = true, author = "Admin (Kapadwanj)"): boolean {
  const db = getDatabase();
  const product = db.products.find((p) => p.id === id);
  if (!product) return false;

  const prevStatus = product.status;
  product.status = archive ? "archived" : "draft";

  product.changeHistory = [
    {
      id: `ch-${Date.now()}`,
      timestamp: new Date().toISOString(),
      author,
      field: "status",
      from: prevStatus,
      to: product.status,
      summary: archive ? `Product archived and removed from storefront.` : `Product restored from archive to Draft.`,
    },
    ...(product.changeHistory || []),
  ];

  createAuditLog({
    action: archive ? "PRODUCT_ARCHIVE" : "PRODUCT_RESTORE",
    entity: "Product",
    entityId: product.id,
    entityName: product.title,
    author,
    previousValue: prevStatus,
    updatedValue: product.status,
    details: archive ? `Archived product "${product.title}".` : `Restored product "${product.title}" to draft.`,
  });

  saveDatabase(db);
  return true;
}

// -------------------------------------------------------------
// BULK OPERATIONS
// -------------------------------------------------------------

export function bulkUpdateStock(
  ids: string[],
  action: "in_stock" | "out_of_stock" | "set_quantity",
  quantity = 3,
  size?: string,
  author = "Admin (Kapadwanj)"
): { successCount: number; message: string } {
  const db = getDatabase();
  let count = 0;

  db.products = db.products.map((p) => {
    if (!ids.includes(p.id)) return p;
    count++;

    let updatedInStock = [...p.inStockSizes];
    let updatedVariants = p.variants ? [...p.variants] : [];

    if (action === "in_stock") {
      if (size) {
        if (!updatedInStock.includes(size)) updatedInStock.push(size);
        updatedVariants = updatedVariants.map((v) =>
          v.size === size ? { ...v, isAvailable: true, stockQuantity: Math.max(v.stockQuantity, 2) } : v
        );
      } else {
        updatedInStock = [...p.sizes];
        updatedVariants = updatedVariants.map((v) => ({ ...v, isAvailable: true, stockQuantity: 3 }));
      }
    } else if (action === "out_of_stock") {
      if (size) {
        updatedInStock = updatedInStock.filter((s) => s !== size);
        updatedVariants = updatedVariants.map((v) =>
          v.size === size ? { ...v, isAvailable: false, stockQuantity: 0 } : v
        );
      } else {
        updatedInStock = [];
        updatedVariants = updatedVariants.map((v) => ({ ...v, isAvailable: false, stockQuantity: 0 }));
      }
    } else if (action === "set_quantity") {
      const isAvail = quantity > 0;
      if (size) {
        if (isAvail && !updatedInStock.includes(size)) updatedInStock.push(size);
        if (!isAvail) updatedInStock = updatedInStock.filter((s) => s !== size);
        updatedVariants = updatedVariants.map((v) =>
          v.size === size ? { ...v, isAvailable: isAvail, stockQuantity: quantity } : v
        );
      } else {
        updatedInStock = isAvail ? [...p.sizes] : [];
        updatedVariants = updatedVariants.map((v) => ({ ...v, isAvailable: isAvail, stockQuantity: quantity }));
      }
    }

    const updated = {
      ...p,
      inStockSizes: updatedInStock,
      variants: updatedVariants,
      changeHistory: [
        {
          id: `ch-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author,
          field: "stock",
          summary: `Bulk stock update (${action}${size ? ` for size ${size}` : ""}).`,
        },
        ...(p.changeHistory || []),
      ],
    };

    checkProductStockNotifications(updated, db);
    return updated;
  });

  createAuditLog({
    action: "BULK_STOCK_UPDATE",
    entity: "Product",
    entityId: `bulk-${ids.length}`,
    author,
    details: `Updated stock status for ${count} products (${action}${size ? `, size: ${size}` : ""}).`,
  });

  saveDatabase(db);
  return { successCount: count, message: `Successfully updated stock for ${count} products.` };
}

export function bulkUpdatePrices(
  ids: string[],
  updateType: "discount_percent" | "flat_outlet_price" | "adjust_percent",
  value: number,
  author = "Admin (Kapadwanj)"
): { successCount: number; message: string } {
  const db = getDatabase();
  let count = 0;

  db.products = db.products.map((p) => {
    if (!ids.includes(p.id)) return p;
    count++;

    let newOutlet = p.outletPrice;
    let newDiscount = p.discount;

    if (updateType === "discount_percent") {
      // value is percentage discount from MRP (e.g. 40%)
      const discountRatio = Math.max(0, Math.min(90, value)) / 100;
      newOutlet = Math.round(p.mrp * (1 - discountRatio));
      newDiscount = Math.round(value);
    } else if (updateType === "flat_outlet_price") {
      newOutlet = Math.max(100, Math.round(value));
      newDiscount = p.mrp > 0 ? Math.round(((p.mrp - newOutlet) / p.mrp) * 100) : 0;
    } else if (updateType === "adjust_percent") {
      // adjust outlet price by +X% or -X%
      const multiplier = 1 + value / 100;
      newOutlet = Math.max(100, Math.round(p.outletPrice * multiplier));
      newDiscount = p.mrp > 0 ? Math.round(((p.mrp - newOutlet) / p.mrp) * 100) : 0;
    }

    return {
      ...p,
      outletPrice: newOutlet,
      discount: newDiscount,
      changeHistory: [
        {
          id: `ch-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author,
          field: "pricing",
          from: p.outletPrice,
          to: newOutlet,
          summary: `Bulk price update: Outlet ₹${newOutlet} (${newDiscount}% OFF).`,
        },
        ...(p.changeHistory || []),
      ],
    };
  });

  createAuditLog({
    action: "BULK_PRICE_UPDATE",
    entity: "Product",
    entityId: `bulk-${ids.length}`,
    author,
    details: `Updated pricing for ${count} products using ${updateType} (value: ${value}).`,
  });

  saveDatabase(db);
  return { successCount: count, message: `Successfully updated pricing for ${count} products.` };
}

export function bulkAssign(
  ids: string[],
  assignments: {
    brand?: string;
    category?: string;
    subcategory?: string;
    type?: "footwear" | "clothing";
    gender?: "Men" | "Women" | "Unisex";
    collectionSlug?: string;
  },
  author = "Admin (Kapadwanj)"
): { successCount: number; message: string } {
  const db = getDatabase();
  let count = 0;

  db.products = db.products.map((p) => {
    if (!ids.includes(p.id)) return p;
    count++;

    const updated = { ...p };
    if (assignments.brand) {
      updated.brand = assignments.brand;
      updated.brandSlug = assignments.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }
    if (assignments.category) updated.category = assignments.category;
    if (assignments.subcategory) updated.subcategory = assignments.subcategory;
    if (assignments.type) updated.type = assignments.type;
    if (assignments.gender) updated.gender = assignments.gender;
    if (assignments.collectionSlug) {
      const cols = updated.collections || [];
      if (!cols.includes(assignments.collectionSlug)) {
        updated.collections = [...cols, assignments.collectionSlug];
      }
    }

    updated.changeHistory = [
      {
        id: `ch-${Date.now()}`,
        timestamp: new Date().toISOString(),
        author,
        field: "taxonomy",
        summary: `Bulk category / brand assignment applied.`,
      },
      ...(updated.changeHistory || []),
    ];

    return updated;
  });

  createAuditLog({
    action: "BULK_ASSIGNMENT",
    entity: "Product",
    entityId: `bulk-${ids.length}`,
    author,
    details: `Applied taxonomy and brand assignments to ${count} products.`,
  });

  saveDatabase(db);
  return { successCount: count, message: `Successfully updated assignments for ${count} products.` };
}

export function bulkPublish(
  ids: string[],
  publish: boolean,
  author = "Admin (Kapadwanj)"
): { successCount: number; message: string } {
  const db = getDatabase();
  let count = 0;

  db.products = db.products.map((p) => {
    if (!ids.includes(p.id)) return p;
    count++;
    const status = publish ? "published" : "draft";
    return {
      ...p,
      status,
      publishedAt: publish ? new Date().toISOString() : p.publishedAt,
      changeHistory: [
        {
          id: `ch-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author,
          field: "status",
          from: p.status,
          to: status,
          summary: publish ? "Published via bulk action." : "Unpublished to draft via bulk action.",
        },
        ...(p.changeHistory || []),
      ],
    };
  });

  createAuditLog({
    action: publish ? "BULK_PUBLISH" : "BULK_UNPUBLISH",
    entity: "Product",
    entityId: `bulk-${ids.length}`,
    author,
    details: `${publish ? "Published" : "Unpublished"} ${count} products.`,
  });

  saveDatabase(db);
  return { successCount: count, message: `Successfully ${publish ? "published" : "unpublished"} ${count} products.` };
}

export function bulkArchive(
  ids: string[],
  archive: boolean,
  author = "Admin (Kapadwanj)"
): { successCount: number; message: string } {
  const db = getDatabase();
  let count = 0;

  db.products = db.products.map((p) => {
    if (!ids.includes(p.id)) return p;
    count++;
    const status = archive ? "archived" : "draft";
    return {
      ...p,
      status,
      changeHistory: [
        {
          id: `ch-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author,
          field: "status",
          from: p.status,
          to: status,
          summary: archive ? "Archived via bulk action." : "Restored from archive via bulk action.",
        },
        ...(p.changeHistory || []),
      ],
    };
  });

  createAuditLog({
    action: archive ? "BULK_ARCHIVE" : "BULK_RESTORE",
    entity: "Product",
    entityId: `bulk-${ids.length}`,
    author,
    details: `${archive ? "Archived" : "Restored"} ${count} products.`,
  });

  saveDatabase(db);
  return { successCount: count, message: `Successfully ${archive ? "archived" : "restored"} ${count} products.` };
}

// -------------------------------------------------------------
// CSV IMPORT & VALIDATION
// -------------------------------------------------------------

export interface ImportError {
  rowNumber: number;
  sku: string;
  field: string;
  message: string;
  rawData?: any;
}

export interface ImportValidationResult {
  totalRows: number;
  validRows: Product[];
  errors: ImportError[];
  summary: {
    validCount: number;
    errorCount: number;
  };
}

export function validateProductImport(rawRows: any[]): ImportValidationResult {
  const db = getDatabase();
  const existingSkus = new Set(db.products.map((p) => p.sku.toUpperCase()));
  const seenSkusInFile = new Set<string>();

  const validRows: Product[] = [];
  const errors: ImportError[] = [];

  rawRows.forEach((row, idx) => {
    const rowNum = idx + 2; // Assuming row 1 is header
    const sku = (row.sku || row.SKU || "").trim();
    const title = (row.title || row.Title || row.name || row.Name || "").trim();
    const brand = (row.brand || row.Brand || "").trim();
    const mrp = Number(row.mrp || row.MRP);
    const outletPrice = Number(row.outletPrice || row.OutletPrice || row.price || row.Price);
    const type = (row.type || row.Type || "footwear").toLowerCase().trim() as "footwear" | "clothing";
    const gender = (row.gender || row.Gender || "Men").trim() as "Men" | "Women" | "Unisex";

    if (!sku) {
      errors.push({ rowNumber: rowNum, sku: "EMPTY", field: "sku", message: "Store SKU is required.", rawData: row });
      return;
    }

    if (existingSkus.has(sku.toUpperCase())) {
      errors.push({ rowNumber: rowNum, sku, field: "sku", message: `SKU "${sku}" already exists in the flagship catalogue.`, rawData: row });
      return;
    }

    if (seenSkusInFile.has(sku.toUpperCase())) {
      errors.push({ rowNumber: rowNum, sku, field: "sku", message: `Duplicate SKU "${sku}" repeated inside CSV.`, rawData: row });
      return;
    }
    seenSkusInFile.add(sku.toUpperCase());

    if (!title) {
      errors.push({ rowNumber: rowNum, sku, field: "title", message: "Product Title is required.", rawData: row });
      return;
    }

    if (!brand) {
      errors.push({ rowNumber: rowNum, sku, field: "brand", message: "Brand is required.", rawData: row });
      return;
    }

    if (isNaN(mrp) || mrp <= 0) {
      errors.push({ rowNumber: rowNum, sku, field: "mrp", message: "MRP must be a valid positive number.", rawData: row });
      return;
    }

    if (isNaN(outletPrice) || outletPrice <= 0) {
      errors.push({ rowNumber: rowNum, sku, field: "outletPrice", message: "Outlet Price must be a valid positive number.", rawData: row });
      return;
    }

    if (outletPrice > mrp) {
      errors.push({
        rowNumber: rowNum,
        sku,
        field: "outletPrice",
        message: `Outlet price (₹${outletPrice}) cannot exceed MRP (₹${mrp}).`,
        rawData: row,
      });
      return;
    }

    // Parse sizes
    const rawSizes = row.sizes || row.Sizes || "7, 8, 9, 10";
    const sizeList = String(rawSizes).split(",").map((s) => s.trim()).filter(Boolean);

    // Parse colours
    const rawColours = row.colours || row.Colours || "Black (#111111)";
    const colourList = String(rawColours).split(",").map((c) => {
      const parts = c.split("(");
      const name = parts[0].trim();
      const hex = parts[1] ? parts[1].replace(")", "").trim() : "#111111";
      return { name, hex };
    });

    const discount = Math.round(((mrp - outletPrice) / mrp) * 100);
    const slug = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${sku.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    const variants: ProductVariant[] = sizeList.map((size, vIdx) => ({
      id: `var-imp-${Date.now()}-${vIdx}`,
      size,
      colour: colourList[0]?.name || "Default",
      stockQuantity: 3,
      isAvailable: true,
    }));

    const validProduct: Product = {
      id: `prod-imp-${Date.now()}-${idx}`,
      title,
      slug,
      sku,
      brand,
      brandSlug: brand.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: type === "footwear" ? "Shoes" : "Clothing",
      subcategory: (row.subcategory || row.Subcategory || (type === "footwear" ? "Sneakers" : "T-Shirts")).trim(),
      type: type === "clothing" ? "clothing" : "footwear",
      gender,
      collections: ["new-arrivals"],
      mrp,
      outletPrice,
      discount,
      image: row.image || row.Image || "/images/products/nike-air-max-270.jpg",
      gallery: [row.image || row.Image || "/images/products/nike-air-max-270.jpg"],
      sizes: sizeList,
      inStockSizes: sizeList,
      colours: colourList,
      isNew: true,
      isFeatured: false,
      status: (row.status === "draft" ? "draft" : "published") as any,
      publishedAt: new Date().toISOString(),
      description: row.description || row.Description || `Original ${brand} authentic stock at Kapadwanj flagship outlet.`,
      features: [
        "100% Genuine distributor stock.",
        "Verified authentic Kapadwanj flagship inventory.",
      ],
      variants,
      changeHistory: [
        {
          id: `ch-${Date.now()}`,
          timestamp: new Date().toISOString(),
          author: "CSV Bulk Import",
          field: "import",
          summary: `Imported via bulk CSV upload.`,
        },
      ],
    };

    validRows.push(validProduct);
  });

  return {
    totalRows: rawRows.length,
    validRows,
    errors,
    summary: {
      validCount: validRows.length,
      errorCount: errors.length,
    },
  };
}

export function commitProductImport(
  products: Product[],
  author = "Admin (Kapadwanj)"
): { importedCount: number } {
  const db = getDatabase();
  db.products = [...products, ...db.products];

  createAuditLog({
    action: "CSV_IMPORT",
    entity: "Product",
    entityId: `import-${products.length}`,
    author,
    details: `Imported and published ${products.length} new products via CSV import.`,
  });

  saveDatabase(db);
  return { importedCount: products.length };
}

// -------------------------------------------------------------
// NAVIGATION MANAGEMENT
// -------------------------------------------------------------

export function getNavigation(): NavigationConfig {
  const db = getDatabase();
  return db.navigation;
}

export function updateNavigation(nav: NavigationConfig, author = "Admin (Kapadwanj)"): NavigationConfig {
  const db = getDatabase();
  const prevNav = db.navigation;
  db.navigation = nav;

  createAuditLog({
    action: "NAVIGATION_UPDATE",
    entity: "Navigation",
    entityId: "main-navigation",
    author,
    details: "Updated navigation layout (header, mega menus, brand links, and footer).",
  });

  saveDatabase(db);
  return db.navigation;
}

// -------------------------------------------------------------
// SIZE GUIDE MANAGEMENT
// -------------------------------------------------------------

export function getSizeGuides(): Record<string, SizeGuideTable> {
  const db = getDatabase();
  return db.sizeGuides;
}

export function updateSizeGuide(
  key: string,
  guide: SizeGuideTable,
  author = "Admin (Kapadwanj)"
): SizeGuideTable {
  const db = getDatabase();
  guide.updatedAt = new Date().toISOString();
  db.sizeGuides[key] = guide;

  createAuditLog({
    action: "SIZE_GUIDE_UPDATE",
    entity: "SizeGuide",
    entityId: guide.id,
    entityName: guide.title,
    author,
    details: `Updated size conversion table and measuring instructions for ${guide.title}.`,
  });

  saveDatabase(db);
  return guide;
}

// -------------------------------------------------------------
// REAL EVENT-BASED ANALYTICS
// -------------------------------------------------------------

export function recordAnalyticsEvent(
  type: AnalyticsEvent["type"],
  targetId?: string,
  targetName?: string,
  metadata?: Record<string, any>
): AnalyticsEvent {
  const db = getDatabase();
  const event: AnalyticsEvent = {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    type,
    targetId,
    targetName,
    metadata,
    timestamp: new Date().toISOString(),
  };

  db.analyticsEvents = [event, ...(db.analyticsEvents || [])].slice(0, 1000); // Retain latest 1,000 real events
  saveDatabase(db);
  return event;
}

export function getAnalyticsSummary(timeRange: "today" | "7d" | "30d" | "all" = "all") {
  const db = getDatabase();
  const now = Date.now();

  let cutoff = 0;
  if (timeRange === "today") cutoff = now - 86400000;
  else if (timeRange === "7d") cutoff = now - 7 * 86400000;
  else if (timeRange === "30d") cutoff = now - 30 * 86400000;

  const events = db.analyticsEvents.filter(
    (e) => new Date(e.timestamp).getTime() >= cutoff
  );

  const productViews = events.filter((e) => e.type === "product_view");
  const collectionViews = events.filter((e) => e.type === "collection_view");
  const brandViews = events.filter((e) => e.type === "brand_view");
  const searchQueries = events.filter((e) => e.type === "search_query");
  const whatsappClicks = events.filter((e) => e.type === "whatsapp_click");
  const productEnquiries = events.filter((e) => e.type === "product_enquiry");

  // Most viewed products
  const productViewCounts: Record<string, { count: number; name: string; id: string }> = {};
  productViews.forEach((pv) => {
    const id = pv.targetId || "unknown";
    if (!productViewCounts[id]) {
      productViewCounts[id] = { count: 0, name: pv.targetName || "Product", id };
    }
    productViewCounts[id].count++;
  });

  const mostViewedProducts = Object.values(productViewCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Top search queries
  const searchCounts: Record<string, number> = {};
  searchQueries.forEach((sq) => {
    const q = (sq.targetName || "").toLowerCase().trim();
    if (q) searchCounts[q] = (searchCounts[q] || 0) + 1;
  });

  const topSearches = Object.entries(searchCounts)
    .map(([query, count]) => ({ query, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Enquiry status resolution
  const enquiries = db.enquiries;
  const enquiryResolution = {
    total: enquiries.length,
    new: enquiries.filter((e) => e.status === "New").length,
    contacted: enquiries.filter((e) => e.status === "Contacted").length,
    inStoreVisit: enquiries.filter((e) => e.status === "In Store Visit").length,
    resolved: enquiries.filter((e) => e.status === "Resolved").length,
    resolutionRate:
      enquiries.length > 0
        ? Math.round(
            (enquiries.filter((e) => e.status === "Resolved" || e.status === "In Store Visit").length /
              enquiries.length) *
              100
          )
        : 0,
  };

  return {
    metrics: {
      totalProductViews: productViews.length,
      totalCollectionViews: collectionViews.length,
      totalBrandViews: brandViews.length,
      totalSearchQueries: searchQueries.length,
      totalWhatsAppClicks: whatsappClicks.length,
      totalEnquiries: enquiries.length,
    },
    mostViewedProducts,
    topSearches,
    enquiryResolution,
    recentEvents: events.slice(0, 20),
  };
}

// -------------------------------------------------------------
// NOTIFICATIONS & AUDIT
// -------------------------------------------------------------

function checkProductStockNotifications(product: Product, db: DatabaseSchema) {
  const threshold = db.notificationSettings.lowStockThreshold || 2;
  const inStockCount = product.inStockSizes.length;

  if (inStockCount === 0 && db.notificationSettings.alertOutOfStock) {
    db.notifications.unshift({
      id: `notif-oos-${Date.now()}`,
      type: "out_of_stock",
      title: "Out of Stock Alert",
      message: `${product.title} (${product.brand}) has 0 sizes remaining in stock.`,
      severity: "alert",
      timestamp: new Date().toISOString(),
      read: false,
      link: "/admin?tab=products",
    });
  } else if (inStockCount <= threshold && db.notificationSettings.alertLowStock) {
    db.notifications.unshift({
      id: `notif-low-${Date.now()}`,
      type: "low_stock",
      title: "Low Stock Alert",
      message: `${product.title} has only ${inStockCount} available sizes remaining at the flagship store.`,
      severity: "warning",
      timestamp: new Date().toISOString(),
      read: false,
      link: "/admin?tab=products",
    });
  }
}

export function getNotifications(): NotificationItem[] {
  const db = getDatabase();
  return db.notifications;
}

export function markNotificationRead(id: string): void {
  const db = getDatabase();
  db.notifications = db.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
  saveDatabase(db);
}

export function markAllNotificationsRead(): void {
  const db = getDatabase();
  db.notifications = db.notifications.map((n) => ({ ...n, read: true }));
  saveDatabase(db);
}

export function clearNotifications(): void {
  const db = getDatabase();
  db.notifications = [];
  saveDatabase(db);
}

export function updateNotificationSettings(
  settings: NotificationSettings,
  author = "Admin (Kapadwanj)"
): NotificationSettings {
  const db = getDatabase();
  db.notificationSettings = settings;

  createAuditLog({
    action: "NOTIFICATION_SETTINGS_UPDATE",
    entity: "Store",
    entityId: "notification-settings",
    author,
    details: `Updated alert threshold to ${settings.lowStockThreshold} units and modified notification triggers.`,
  });

  saveDatabase(db);
  return db.notificationSettings;
}

export function getAuditLogs(): AuditLogEntry[] {
  const db = getDatabase();
  return db.auditLogs;
}

export function createAuditLog(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
  const db = getDatabase();
  const log: AuditLogEntry = {
    ...entry,
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
  };

  db.auditLogs = [log, ...(db.auditLogs || [])].slice(0, 500); // Retain latest 500 audit logs
  return log;
}

// -------------------------------------------------------------
// BACKUP & RESTORE STRATEGY
// -------------------------------------------------------------

export function createDatabaseBackup(author = "Admin (Kapadwanj)", reason = "Manual Snapshot"): BackupSnapshotMeta {
  const db = getDatabase();
  ensureDataDirectories();

  const backupId = `backup-${Date.now()}`;
  const backupFilename = `${backupId}.json`;
  const backupPath = path.join(BACKUPS_DIR, backupFilename);

  const serialized = JSON.stringify(db, null, 2);
  fs.writeFileSync(backupPath, serialized, "utf-8");

  const sizeKb = Math.round(Buffer.byteLength(serialized, "utf-8") / 1024);

  const snapshot: BackupSnapshotMeta = {
    id: backupId,
    timestamp: new Date().toISOString(),
    author,
    reason,
    productsCount: db.products.length,
    sizeKb,
  };

  db.backups = [snapshot, ...(db.backups || [])];
  createAuditLog({
    action: "BACKUP_CREATE",
    entity: "Backup",
    entityId: backupId,
    author,
    details: `Created snapshot "${reason}" (${sizeKb} KB, ${db.products.length} products).`,
  });

  saveDatabase(db);
  return snapshot;
}

export function getBackups(): BackupSnapshotMeta[] {
  const db = getDatabase();
  return db.backups || [];
}

export function restoreDatabaseBackup(backupId: string, author = "Admin (Kapadwanj)"): boolean {
  const db = getDatabase();
  ensureDataDirectories();

  const backupPath = path.join(BACKUPS_DIR, `${backupId}.json`);
  if (!fs.existsSync(backupPath)) {
    console.error(`Backup file ${backupPath} not found`);
    return false;
  }

  try {
    const raw = fs.readFileSync(backupPath, "utf-8");
    const restoredData: DatabaseSchema = JSON.parse(raw);

    // Create a safety recovery snapshot of the current state before restoring
    createDatabaseBackup("System Auto-Recovery", `Safety rollback snapshot before restoring ${backupId}`);

    // Keep backups history intact
    restoredData.backups = db.backups;

    createAuditLog({
      action: "BACKUP_RESTORE",
      entity: "Backup",
      entityId: backupId,
      author,
      details: `Restored database state from snapshot ${backupId}. Storefront catalogues refreshed.`,
    });

    saveDatabase(restoredData);
    return true;
  } catch (err) {
    console.error("Failed to restore backup:", err);
    return false;
  }
}
