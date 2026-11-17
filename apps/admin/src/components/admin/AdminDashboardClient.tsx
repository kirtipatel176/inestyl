"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  Layers,
  Tag,
  FolderTree,
  Sliders,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  RotateCcw,
  Copy,
  Archive,
  Eye,
  EyeOff,
  History,
  FileSpreadsheet,
  Download,
  UploadCloud,
  Smartphone,
  Monitor,
  Clock,
  Video,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Brand, CollectionItem } from "@inestyle/shared-types";
import {
  StoreEnquiry,
  ProductVariant,
  Product,
  NavigationConfig,
  SizeGuideTable,
  NotificationItem,
  NotificationSettings,
  AuditLogEntry,
  BackupSnapshotMeta,
  HomepageSectionConfig,
} from "@/types";
import { AdminSidebar, AdminTab } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { ToastProvider, useToast } from "./ToastContext";
import { ConfirmDialog } from "./ConfirmDialog";
import { UnsavedChangesDialog } from "./UnsavedChangesDialog";
import { ProductPreviewModal } from "./modals/ProductPreviewModal";
import { ProductChangeHistoryModal } from "./modals/ProductChangeHistoryModal";
import { CsvImportModal } from "./modals/CsvImportModal";
import { BulkActionsBar } from "./tabs/BulkActionsBar";
import { BulkPriceModal } from "./modals/BulkPriceModal";
import { BulkAssignModal } from "./modals/BulkAssignModal";
import { NavigationManagerTab } from "./tabs/NavigationManagerTab";
import { SizeGuideManagerTab } from "./tabs/SizeGuideManagerTab";
import { AnalyticsTab } from "./tabs/AnalyticsTab";
import { NotificationsTab } from "./tabs/NotificationsTab";
import { AuditRecoveryTab } from "./tabs/AuditRecoveryTab";
import { MediaLibraryTab } from "./tabs/MediaLibraryTab";
import { MediaPickerModal } from "./modals/MediaPickerModal";
import { apiClient } from "@/lib/api-client";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { DashboardSkeleton } from "@/components/ui/DashboardSkeleton";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { RetryableError } from "@/components/ui/RetryableError";
import { saveFormDraft, getFormDraft, clearFormDraft } from "@/lib/form-recovery";

export function AdminDashboardClient() {
  return (
    <ToastProvider>
      <AdminDashboardInner />
    </ToastProvider>
  );
}

function AdminDashboardInner() {
  const router = useRouter();
  const { success, error, warning, info } = useToast();

  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Loading & Recovery States
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [initialDataError, setInitialDataError] = useState<string | null>(null);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [productSaveError, setProductSaveError] = useState<string | null>(null);
  const [isSavingCollection, setIsSavingCollection] = useState(false);

  // Product status filter tab: all | published | draft | scheduled | archived
  const [productStatusFilter, setProductStatusFilter] = useState<
    "all" | "published" | "draft" | "scheduled" | "archived"
  >("all");

  // Selection state for bulk operations
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Core Data States: Zero mock data, loaded live from PostgreSQL via Supabase API
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<CollectionItem[]>([
    { id: "col-1", title: "New Arrivals", slug: "new-arrivals", description: "Freshly unboxed verified authentic arrivals at Kapadwanj flagship.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-2", title: "Trending Styles", slug: "trending-styles", description: "Most-requested silhouettes and contemporary streetwear editions.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-3", title: "Everyday Essentials", slug: "everyday-essentials", description: "Versatile wardrobe staples built for daily performance.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-4", title: "Sports & Performance", slug: "sports-performance", description: "High-spec runners, training apparel, and technical sportswear.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-5", title: "Sneakers Collection", slug: "sneakers-collection", description: "Curated lifestyle and low-profile sneaker roster.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-6", title: "Running Collection", slug: "running-collection", description: "Road-tested responsive cushioning from Nike, adidas, and HOKA.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-7", title: "Casual Wear", slug: "casual-wear", description: "Effortless casual tees, lightweight layers, and weekend comfort.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-8", title: "Premium Clothing", slug: "premium-clothing", description: "Authorized apparel from Levi's, DIESEL, and U.S. Polo Assn.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-9", title: "Weekend Edit", slug: "weekend-edit", description: "Relaxed-fit silhouettes tailored for downtime and leisure.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-10", title: "Seasonal Collection", slug: "seasonal-collection", description: "Current weather-ready apparel and footwear essentials.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
    { id: "col-11", title: "Outlet Exclusives", slug: "outlet-exclusives", description: "Exceptional outlet valuations direct from our Kapadwanj store.", image: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/homepage/desktop/hero-lifestyle-composite" },
  ]);
  const [brands, setBrands] = useState<Brand[]>([
    { id: "nike", name: "Nike", slug: "nike", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/nike.svg", category: "both", description: "World-class performance and streetwear icons.", itemCount: 0 },
    { id: "puma", name: "Puma", slug: "puma", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/puma.svg", category: "both", description: "Fast athletic innovation and retro styling.", itemCount: 0 },
    { id: "adidas", name: "adidas", slug: "adidas", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/adidas.svg", category: "both", description: "Iconic three-stripes heritage and boost cushioning.", itemCount: 0 },
    { id: "hoka", name: "HOKA", slug: "hoka", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/hoka.svg", category: "footwear", description: "Maximalist cushioning for endurance and trail running.", itemCount: 0 },
    { id: "levis", name: "Levi's", slug: "levis", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/levis.svg", category: "apparel", description: "The definitive original American denim legacy.", itemCount: 0 },
    { id: "diesel", name: "DIESEL", slug: "diesel", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/diesel.svg", category: "apparel", description: "Bold Italian streetwear and alternative luxury denim.", itemCount: 0 },
    { id: "us-polo-assn", name: "U.S. Polo Assn.", slug: "us-polo-assn", logo: "https://res.cloudinary.com/egjn8ayb/image/upload/inestyle-outlet/brands/logos/us-polo-assn.svg", category: "apparel", description: "Classic American equestrian heritage and pique polo craft.", itemCount: 0 },
  ]);
  const [enquiries, setEnquiries] = useState<StoreEnquiry[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    lowStockThreshold: 2,
    alertLowStock: true,
    alertOutOfStock: true,
    alertNewEnquiry: true,
    alertScheduledBanner: true,
    alertProductPublication: true,
    alertFailedUploads: true,
  });
  const [navigation, setNavigation] = useState<NavigationConfig | null>(null);
  const [sizeGuides, setSizeGuides] = useState<Record<string, SizeGuideTable> | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [backups, setBackups] = useState<BackupSnapshotMeta[]>([]);

  // Homepage sections state
  const [homepageSections, setHomepageSections] = useState<
    { id: string; name: string; desc: string; enabled: boolean }[]
  >([
    { id: "heroBanner", name: "Full-Width Hero Campaign", desc: "Hero campaign photography and flagship headline", enabled: true },
    { id: "brandMarquee", name: "Brand Partners Marquee", desc: "Monochrome logo ticker for Nike, adidas, Puma, HOKA", enabled: true },
    { id: "curatedCategories", name: "Curated Category Exploration", desc: "4 image-led editorial department panels", enabled: true },
    { id: "featuredProducts", name: "Standout Styles Grid", desc: "Curated 8 standout items with pricing & size chips", enabled: true },
    { id: "newArrivalsBanner", name: "New Season Arrivals Banner", desc: "Interactive high-energy transition banner", enabled: true },
    { id: "collectionsSpotlight", name: "Thematic Collection Spotlight", desc: "Trending Styles and Outlet Exclusives carousel", enabled: true },
    { id: "storeVisitSection", name: "Kapadwanj Flagship Store Visit", desc: "Physical store reality, hours, address, and maps", enabled: true },
    { id: "trustPillars", name: "Authenticity & Trust Pillars", desc: "100% Original, Outlet Prices, WhatsApp Concierge", enabled: true },
  ]);

  // Modals & Drawers States
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<{
    product: Product;
    mode: "desktop" | "mobile";
  } | null>(null);
  const [historyProduct, setHistoryProduct] = useState<Product | null>(null);
  const [isBulkPriceModalOpen, setIsBulkPriceModalOpen] = useState(false);
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);

  // Add / Edit Product Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productFormDirty, setProductFormDirty] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  // Variant Editor Modal
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [variantProduct, setVariantProduct] = useState<Product | null>(null);

  // Collections Modals
  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false);
  const [assigningCollection, setAssigningCollection] = useState<CollectionItem | null>(null);

  // Cloudinary Media Picker Modal
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<"product" | "collection">("product");

  // Confirmation dialogs
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    variant?: "danger" | "warning" | "primary";
    action: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    action: () => {},
  });

  // Product Form State
  const initialFormState = {
    title: "",
    brand: "Nike",
    category: "Shoes",
    subcategory: "Sneakers",
    type: "footwear" as "footwear" | "clothing",
    gender: "Men" as "Men" | "Women" | "Unisex",
    mrp: 9999,
    outletPrice: 6999,
    sku: "NK-NEW-01",
    description: "Premium authentic product at Kapadwanj flagship store.",
    shoeType: "Sneakers",
    clothingCategory: "T-Shirts",
    fit: "Regular Fit",
    fabric: "100% Cotton",
    sleeve: "Half Sleeve",
    sizes: "7, 8, 9, 10",
    colours: "Black (#111111), White (#FFFFFF)",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/products/footwear/men/nike-air-max-270",
    status: "published" as "published" | "draft" | "scheduled",
    scheduledPublishDate: "",
    hasVideo: false,
    videoUrl: "",
  };

  const [productForm, setProductForm] = useState(initialFormState);

  // Collection Form State
  const [newCollectionForm, setNewCollectionForm] = useState({
    title: "",
    slug: "",
    description: "",
    badge: "Special Curation",
    image: "https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto/inestyle-outlet/homepage/desktop/hero-lifestyle-composite",
  });

  // Fetch live catalogue, navigation, notifications from API on mount
  const loadInitialData = async () => {
    setIsLoadingInitialData(true);
    setInitialDataError(null);
    try {
      // Load supporting configs concurrently
      const [prodRes, enqRes, navRes, sgRes, notifRes, auditRes, backupRes] = await Promise.all([
        apiClient<any>("/api/products?all=true", { idempotent: true }),
        apiClient<any>("/api/enquiries", { idempotent: true, suppressNetworkAlert: true }),
        apiClient<any>("/api/navigation", { idempotent: true, suppressNetworkAlert: true }),
        apiClient<any>("/api/size-guide", { idempotent: true, suppressNetworkAlert: true }),
        apiClient<any>("/api/notifications", { idempotent: true, suppressNetworkAlert: true }),
        apiClient<any>("/api/audit", { idempotent: true, suppressNetworkAlert: true }),
        apiClient<any>("/api/backup", { idempotent: true, suppressNetworkAlert: true }),
      ]);

      if (prodRes.status === 401) {
        router.push("/admin/session-expired");
        return;
      }
      if (prodRes.status === 403) {
        router.push("/admin/unauthorized");
        return;
      }

      if (prodRes.ok && prodRes.data?.success) {
        setProducts(prodRes.data.products || []);
      } else if (!prodRes.ok) {
        setInitialDataError(prodRes.error?.userMessage || "Failed to sync live product catalogue.");
      }

      if (enqRes.ok && enqRes.data?.success) {
        setEnquiries(enqRes.data.enquiries || []);
      }

      if (navRes.ok && navRes.data?.success) setNavigation(navRes.data.navigation);
      if (sgRes.ok && sgRes.data?.success) setSizeGuides(sgRes.data.sizeGuides);
      if (notifRes.ok && notifRes.data?.success) {
        setNotifications(notifRes.data.notifications);
        setNotificationSettings(notifRes.data.settings);
      }
      if (auditRes.ok && auditRes.data?.success) setAuditLogs(auditRes.data.logs);
      if (backupRes.ok && backupRes.data?.success) setBackups(backupRes.data.backups);
    } catch (err: any) {
      console.error("Central database sync error:", err);
      setInitialDataError("Could not connect to Supabase PostgreSQL database. Please retry.");
    } finally {
      setIsLoadingInitialData(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tab filter
      if (activeTab === "footwear" && p.type !== "footwear") return false;
      if (activeTab === "clothing" && p.type !== "clothing" && p.type !== "apparel") return false;

      // Status filter
      if (productStatusFilter === "published" && p.status !== "published" && p.status !== undefined) {
        return false;
      }
      if (productStatusFilter === "draft" && p.status !== "draft") return false;
      if (productStatusFilter === "scheduled" && p.status !== "scheduled") return false;
      if (productStatusFilter === "archived" && p.status !== "archived") return false;
      if (productStatusFilter === "all" && p.status === "archived") return false; // Default hides archived in "all"

      // Search Query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    });
  }, [products, activeTab, productStatusFilter, searchQuery]);

  // Tab Title helper
  const tabTitles: Record<AdminTab, string> = {
    products: "Complete Product Catalogue",
    footwear: "Footwear & Shoes Inventory",
    clothing: "Clothing & Apparel Inventory",
    collections: "Thematic Collections",
    brands: "Authorized Brand Representations",
    navigation: "Navigation & Mega Menu Manager",
    "size-guide": "Size Guide Management",
    analytics: "Event-Based Telemetry & Analytics",
    notifications: "Alerts & Notifications",
    audit: "Audit Trail & Recovery Strategy",
    enquiries: "Customer Enquiries & Reservations",
    homepage: "Homepage Section Controls",
    media: "Cloudinary Media Library & Optimization",
  };

  // Selection handlers
  const handleToggleSelectProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((pId) => pId !== id) : [...prev, id]
    );
  };

  const handleSelectAllFiltered = () => {
    if (selectedProductIds.length === filteredProducts.length) {
      setSelectedProductIds([]);
    } else {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    }
  };

  // Toggle Featured & New
  const handleToggleFeatured = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newVal = !product.isFeatured;

    const res = await apiClient<any>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isFeatured: newVal }),
      idempotent: true,
    });

    if (res.ok && res.data?.success) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isFeatured: newVal } : p))
      );
      success(`Updated ${product.title}`, `Featured status set to ${newVal ? "Yes" : "No"}`);
    } else {
      error("Update Failed", res.error?.userMessage || "Failed to update featured flag on server.");
    }
  };

  const handleToggleNew = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newVal = !product.isNew;

    const res = await apiClient<any>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isNew: newVal }),
      idempotent: true,
    });

    if (res.ok && res.data?.success) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isNew: newVal } : p))
      );
      success(`Updated ${product.title}`, `New Arrival status set to ${newVal ? "Yes" : "No"}`);
    } else {
      error("Update Failed", res.error?.userMessage || "Failed to update new arrival flag on server.");
    }
  };

  // Quick Duplicate Product
  const handleDuplicateProduct = async (id: string) => {
    const res = await apiClient<any>("/api/products/duplicate", {
      method: "POST",
      body: JSON.stringify({ id, author: "Admin (Quick Action)" }),
      idempotent: false,
    });

    if (res.ok && res.data?.success) {
      setProducts([res.data.product, ...products]);
      success("Product Duplicated", `Cloned into new Draft: ${res.data.product.sku}`);
    } else {
      error("Duplicate Failed", res.error?.userMessage || res.data?.error || "Unable to duplicate product.");
    }
  };

  // Archive / Restore Product
  const handleArchiveProduct = async (id: string, archive = true) => {
    const res = await apiClient<any>(`/api/products/${id}`, {
      method: "DELETE",
      idempotent: true,
    });

    if (res.ok && res.data?.success) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: archive ? "archived" : "draft" } : p))
      );
      success(
        archive ? "Product Archived" : "Product Restored",
        `Product status moved to ${archive ? "Archived" : "Draft"}.`
      );
    } else {
      error("Action Failed", res.error?.userMessage || "Server rejected archive/restore operation.");
    }
  };

  // Immediate Publish / Unpublish Product
  const handleQuickPublishToggle = async (id: string) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const nextStatus = product.status === "published" ? "draft" : "published";

    const res = await apiClient<any>(`/api/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        status: nextStatus,
        publishedAt: nextStatus === "published" ? new Date().toISOString() : undefined,
      }),
      idempotent: true,
    });

    if (res.ok && res.data?.success) {
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
      );
      success(
        nextStatus === "published" ? "Product Published" : "Product Unpublished",
        `${product.title} is now ${nextStatus === "published" ? "live on storefront" : "moved to draft"}.`
      );
    } else {
      error("Publishing Failure", res.error?.userMessage || "Failed to update product publication state.");
    }
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      title: product.title,
      brand: product.brand,
      category: product.category,
      subcategory: product.subcategory || "",
      type: product.type === "clothing" ? "clothing" : "footwear",
      gender: product.gender,
      mrp: product.mrp,
      outletPrice: product.outletPrice,
      sku: product.sku,
      description: product.description,
      shoeType: product.shoeType || "Sneakers",
      clothingCategory: product.clothingCategory || "T-Shirts",
      fit: product.fit || "Regular Fit",
      fabric: product.fabric || "100% Cotton",
      sleeve: product.sleeve || "Half Sleeve",
      sizes: product.sizes?.join(", ") || "",
      colours: product.colours?.map((c) => `${c.name} (${c.hex})`).join(", ") || "Default (#111111)",
      image: product.image,
      status: (product.status === "scheduled" ? "scheduled" : product.status === "draft" ? "draft" : "published") as any,
      scheduledPublishDate: product.scheduledPublishDate || "",
      hasVideo: Boolean(product.hasVideo),
      videoUrl: product.videoUrl || "",
    });
    setProductFormDirty(false);
    setIsProductModalOpen(true);
  };

  // Open New Product Modal
  const handleOpenNewProduct = () => {
    setEditingProductId(null);
    setProductForm(initialFormState);
    setProductFormDirty(false);
    setIsProductModalOpen(true);
  };

  // Save Add/Edit Product
  const handleSaveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();

    const sizeList = productForm.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const colourList = productForm.colours.split(",").map((c) => {
      const parts = c.split("(");
      const name = parts[0].trim();
      const hex = parts[1] ? parts[1].replace(")", "").trim() : "#111111";
      return { name, hex };
    });

    const discount = Math.round(
      ((productForm.mrp - productForm.outletPrice) / productForm.mrp) * 100
    );

    const payload: Partial<Product> = {
      title: productForm.title,
      brand: productForm.brand,
      brandSlug: productForm.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: productForm.type === "footwear" ? "Shoes" : "Clothing",
      subcategory: productForm.subcategory,
      type: productForm.type,
      gender: productForm.gender,
      mrp: Number(productForm.mrp),
      outletPrice: Number(productForm.outletPrice),
      discount,
      sku: productForm.sku,
      description: productForm.description,
      sizes: sizeList,
      inStockSizes: sizeList,
      colours: colourList,
      image: productForm.image,
      gallery: [productForm.image],
      status: productForm.status,
      scheduledPublishDate: productForm.status === "scheduled" ? productForm.scheduledPublishDate : undefined,
      hasVideo: productForm.hasVideo,
      videoUrl: productForm.videoUrl || undefined,
      shoeType: productForm.type === "footwear" ? (productForm.shoeType as any) : undefined,
      clothingCategory: productForm.type === "clothing" ? (productForm.clothingCategory as any) : undefined,
      fit: productForm.type === "clothing" ? (productForm.fit as any) : undefined,
      fabric: productForm.type === "clothing" ? productForm.fabric : undefined,
      sleeve: productForm.type === "clothing" ? (productForm.sleeve as any) : undefined,
    };

    setIsSavingProduct(true);
    setProductSaveError(null);

    try {
      if (editingProductId) {
        // Update
        const res = await apiClient<any>(`/api/products/${editingProductId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
          idempotent: true,
        });

        if (res.ok && res.data?.success) {
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProductId ? res.data.product : p))
          );
          clearFormDraft(`product_form_${editingProductId}`);
          setProductFormDirty(false);
          success("Product Saved", `${productForm.title} successfully updated.`);
          setIsProductModalOpen(false);
        } else {
          const msg = res.error?.userMessage || res.data?.error || "Failed to save product changes.";
          setProductSaveError(msg);
          error("Save Error", msg);
        }
      } else {
        // Create
        const slug = productForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const res = await apiClient<any>("/api/products", {
          method: "POST",
          body: JSON.stringify({
            ...payload,
            slug: `${slug}-${productForm.sku.toLowerCase()}`,
            collections: ["new-arrivals"],
            isNew: true,
            isFeatured: false,
            features: [
              "100% Genuine distributor stock.",
              "Verified authentic Kapadwanj flagship inventory.",
            ],
            variants: sizeList.map((size, idx) => ({
              id: `var-${Date.now()}-${idx}`,
              size,
              colour: colourList[0]?.name || "Default",
              stockQuantity: 3,
              isAvailable: true,
            })),
          }),
          idempotent: false,
        });

        if (res.ok && res.data?.success) {
          setProducts([res.data.product, ...products]);
          clearFormDraft("product_form_new");
          setProductFormDirty(false);
          success("Product Created", `${productForm.title} added to flagship inventory.`);
          setIsProductModalOpen(false);
        } else {
          const msg = res.error?.userMessage || res.data?.error || "Failed to create product.";
          setProductSaveError(msg);
          error("Creation Error", msg);
        }
      }
    } catch (err: any) {
      const msg = err.message || "Network failure occurred while saving product.";
      setProductSaveError(msg);
      error("Network Error", msg);
    } finally {
      setIsSavingProduct(false);
    }
  };

  // Bulk Actions Handlers
  const handleBulkStock = async (stockAction: "in_stock" | "out_of_stock") => {
    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "stock",
          ids: selectedProductIds,
          payload: { stockAction },
        }),
      });
      const data = await res.json();
      if (data.success) {
        // Refresh products list
        const reloadRes = await fetch("/api/products?all=true");
        const reloadData = await reloadRes.json();
        if (reloadData.success) setProducts(reloadData.products);

        success("Bulk Stock Updated", data.message);
        setSelectedProductIds([]);
      }
    } catch (err: any) {
      error("Bulk stock update failed", err.message);
    }
  };

  const handleBulkPriceSubmit = async (
    updateType: "discount_percent" | "flat_outlet_price" | "adjust_percent",
    value: number
  ) => {
    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "price",
          ids: selectedProductIds,
          payload: { updateType, value },
        }),
      });
      const data = await res.json();
      if (data.success) {
        const reloadRes = await fetch("/api/products?all=true");
        const reloadData = await reloadRes.json();
        if (reloadData.success) setProducts(reloadData.products);

        success("Bulk Pricing Applied", data.message);
        setSelectedProductIds([]);
      }
    } catch (err: any) {
      error("Bulk price update failed", err.message);
    }
  };

  const handleBulkAssignSubmit = async (assignments: any) => {
    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "assign",
          ids: selectedProductIds,
          payload: assignments,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const reloadRes = await fetch("/api/products?all=true");
        const reloadData = await reloadRes.json();
        if (reloadData.success) setProducts(reloadData.products);

        success("Bulk Taxonomy Assigned", data.message);
        setSelectedProductIds([]);
      }
    } catch (err: any) {
      error("Bulk assign failed", err.message);
    }
  };

  const handleBulkPublish = async (publish: boolean) => {
    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "publish",
          ids: selectedProductIds,
          payload: { publish },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) =>
            selectedProductIds.includes(p.id)
              ? { ...p, status: publish ? "published" : "draft" }
              : p
          )
        );
        success(publish ? "Bulk Published" : "Bulk Unpublished", data.message);
        setSelectedProductIds([]);
      }
    } catch (err: any) {
      error("Bulk publish failed", err.message);
    }
  };

  const handleBulkArchiveConfirm = () => {
    setConfirmDialog({
      isOpen: true,
      title: `Archive ${selectedProductIds.length} Selected Products?`,
      message: `These products will be removed from customer-facing searches and listings, but preserved in the archive for full audit and inventory history.`,
      confirmLabel: "Archive Products",
      variant: "danger",
      action: async () => {
        try {
          const res = await fetch("/api/products/bulk", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "archive",
              ids: selectedProductIds,
              payload: { archive: true },
            }),
          });
          const data = await res.json();
          if (data.success) {
            setProducts((prev) =>
              prev.map((p) =>
                selectedProductIds.includes(p.id) ? { ...p, status: "archived" } : p
              )
            );
            success("Bulk Archived", data.message);
            setSelectedProductIds([]);
          }
        } catch (err: any) {
          error("Bulk archive failed", err.message);
        }
      },
    });
  };

  // Variant Stock Editor
  const handleToggleSizeStock = async (size: string) => {
    if (!variantProduct) return;
    const isCurrentlyInStock = variantProduct.inStockSizes.includes(size);
    const updatedInStock = isCurrentlyInStock
      ? variantProduct.inStockSizes.filter((s) => s !== size)
      : [...variantProduct.inStockSizes, size];

    const updatedProduct = {
      ...variantProduct,
      inStockSizes: updatedInStock,
      variants: variantProduct.variants?.map((v) =>
        v.size === size
          ? {
              ...v,
              isAvailable: !isCurrentlyInStock,
              stockQuantity: isCurrentlyInStock ? 0 : 2,
            }
          : v
      ),
    };

    setVariantProduct(updatedProduct as any);
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? (updatedProduct as any) : p))
    );

    // Save to API with rollback on failure
    const res = await apiClient<any>(`/api/products/${updatedProduct.id}`, {
      method: "PUT",
      body: JSON.stringify({
        inStockSizes: updatedInStock,
        variants: updatedProduct.variants,
      }),
      idempotent: true,
    });

    if (!res.ok) {
      // Revert state
      setVariantProduct(variantProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === variantProduct.id ? (variantProduct as any) : p))
      );
      error("Inventory Update Failed", res.error?.userMessage || "Failed to update inventory state.");
    }
  };

  // Enquiry status change with server confirmation and rollback
  const handleUpdateEnquiryStatus = async (
    enquiryId: string,
    newStatus: StoreEnquiry["status"]
  ) => {
    const originalEnquiries = enquiries;
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === enquiryId ? { ...enq, status: newStatus } : enq))
    );

    const res = await apiClient<any>("/api/enquiries", {
      method: "PATCH",
      body: JSON.stringify({ id: enquiryId, status: newStatus }),
      idempotent: true,
    });

    if (res.ok && res.data?.success) {
      success("Enquiry Status Updated", `Status changed to "${newStatus}".`);
    } else {
      setEnquiries(originalEnquiries);
      error("Enquiry Update Failed", res.error?.userMessage || "Failed to save enquiry update.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      {/* 1. FIXED DESKTOP SIDEBAR + RESPONSIVE MOBILE NAVIGATION */}
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setSelectedProductIds([]);
        }}
        unreadNotificationsCount={notifications.filter((n) => !n.read).length}
        newEnquiriesCount={enquiries.filter((e) => e.status === "New").length}
        isOpenMobile={isMobileNavOpen}
        onCloseMobile={() => setIsMobileNavOpen(false)}
      />

      {/* 2. MAIN ADMIN CONTENT CONTAINER */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <AdminHeader
          currentTabName={tabTitles[activeTab] || "Admin Console"}
          onOpenMobileMenu={() => setIsMobileNavOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          notifications={notifications}
          onOpenNotificationsTab={() => setActiveTab("notifications")}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {initialDataError && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{initialDataError}</span>
              </div>
              <button
                type="button"
                onClick={loadInitialData}
                disabled={isLoadingInitialData}
                className="px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100 flex items-center gap-1 shadow-2xs active:scale-95"
              >
                <RefreshCw className={`w-3 h-3 ${isLoadingInitialData ? "animate-spin" : ""}`} />
                <span>Retry Sync</span>
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* CATALOGUE TABS (PRODUCTS, FOOTWEAR, CLOTHING) */}
          {/* ========================================================= */}
          {(activeTab === "products" || activeTab === "footwear" || activeTab === "clothing") && (
            <div className="space-y-6">
              {/* Top Action Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h2 className="font-heading text-xl font-bold text-[#1D1D1F]">
                    {tabTitles[activeTab]} ({filteredProducts.length})
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Manage authentic Kapadwanj flagship inventory, publishing lifecycle, and size availability.
                  </p>
                </div>

                {/* Page Level Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Export CSV */}
                  <a
                    href="/api/products/export?format=csv"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </a>

                  {/* Import CSV */}
                  <button
                    type="button"
                    onClick={() => setIsCsvImportOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors shadow-2xs"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-[#0071E3]" />
                    <span>Import Batch CSV</span>
                  </button>

                  {/* Add Product */}
                  <button
                    type="button"
                    onClick={handleOpenNewProduct}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-colors shadow-subtle"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center justify-between gap-4 flex-wrap pb-1">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: "all", label: `Active (${products.filter((p) => p.status !== "archived").length})` },
                    { id: "published", label: `Published (${products.filter((p) => p.status === "published" || !p.status).length})` },
                    { id: "draft", label: `Draft (${products.filter((p) => p.status === "draft").length})` },
                    { id: "scheduled", label: `Scheduled (${products.filter((p) => p.status === "scheduled").length})` },
                    { id: "archived", label: `Archived (${products.filter((p) => p.status === "archived").length})` },
                  ].map((filterTab) => (
                    <button
                      key={filterTab.id}
                      type="button"
                      onClick={() => setProductStatusFilter(filterTab.id as any)}
                      className={`px-3.5 py-1.5 rounded-full font-semibold transition-all ${
                        productStatusFilter === filterTab.id
                          ? "bg-[#1D1D1F] text-white shadow-2xs"
                          : "bg-white border border-[#E5E7EB] text-[#6E6E73] hover:text-[#1D1D1F]"
                      }`}
                    >
                      {filterTab.label}
                    </button>
                  ))}
                </div>

                <div className="text-xs text-[#86868B]">
                  Showing <strong className="text-[#1D1D1F]">{filteredProducts.length}</strong> styles
                </div>
              </div>

              {/* Products Table (Specific Section Area: Skeleton while waiting for backend response) */}
              <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-2xs">
                {isLoadingInitialData ? (
                  <TableSkeleton rows={8} columns={7} />
                ) : filteredProducts.length === 0 ? (
                  <div className="py-16 text-center text-[#86868B] space-y-3">
                    <Package className="w-10 h-10 mx-auto text-neutral-300 stroke-[1.5]" />
                    <p className="font-bold text-sm text-[#1D1D1F]">No Products Found</p>
                    <p className="text-xs">Try adjusting your search query or status filter.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#F5F5F7] border-b border-[#E5E7EB] text-[#86868B] font-bold uppercase text-[10px] tracking-wider select-none">
                          <th className="py-3 px-4 w-10">
                            <input
                              type="checkbox"
                              checked={
                                filteredProducts.length > 0 &&
                                selectedProductIds.length === filteredProducts.length
                              }
                              onChange={handleSelectAllFiltered}
                              className="w-4 h-4 rounded accent-[#0071E3] cursor-pointer"
                            />
                          </th>
                          <th className="py-3 px-4">Style &amp; SKU</th>
                          <th className="py-3 px-4">Department</th>
                          <th className="py-3 px-4">Pricing</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Sizes &amp; Stock</th>
                          <th className="py-3 px-4">Badges</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5E7EB] text-[#1D1D1F]">
                        {filteredProducts.map((p) => {
                          const isSelected = selectedProductIds.includes(p.id);
                          const isPublished = p.status === "published" || !p.status;
                          const isDraft = p.status === "draft";
                          const isScheduled = p.status === "scheduled";
                          const isArchived = p.status === "archived";

                          return (
                            <tr
                              key={p.id}
                              className={`hover:bg-[#F9F9FB] transition-colors ${
                                isSelected ? "bg-blue-50/50" : ""
                              }`}
                            >
                              {/* Checkbox */}
                              <td className="py-3 px-4">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleToggleSelectProduct(p.id)}
                                  className="w-4 h-4 rounded accent-[#0071E3] cursor-pointer"
                                />
                              </td>

                              {/* Title, Brand, SKU & Image */}
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl bg-[#F5F5F7] p-1.5 shrink-0 relative overflow-hidden border border-[#E5E7EB]">
                                    <Image
                                      src={p.image}
                                      alt={p.title}
                                      fill
                                      className="object-contain"
                                    />
                                  </div>
                                  <div>
                                    <span className="font-bold text-xs block text-[#1D1D1F] hover:text-[#0071E3]">
                                      {p.title}
                                    </span>
                                    <span className="text-[10px] text-[#86868B] block">
                                      {p.brand} • <strong className="font-mono text-[#1D1D1F]">{p.sku}</strong>
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Department & Subcategory */}
                              <td className="py-3 px-4">
                                <span className="font-semibold block capitalize">{p.type}</span>
                                <span className="text-[10px] text-[#86868B]">{p.subcategory || p.category}</span>
                              </td>

                              {/* Pricing */}
                              <td className="py-3 px-4 font-mono">
                                <span className="font-bold text-[#1D1D1F] block">
                                  ₹{p.outletPrice.toLocaleString("en-IN")}
                                </span>
                                <span className="text-[10px] text-[#86868B] line-through">
                                  MRP ₹{p.mrp.toLocaleString("en-IN")}
                                </span>
                                {p.discount > 0 && (
                                  <span className="text-[10px] font-bold text-[#0071E3] block">
                                    {p.discount}% OFF
                                  </span>
                                )}
                              </td>

                              {/* Publishing Status */}
                              <td className="py-3 px-4">
                                <button
                                  type="button"
                                  onClick={() => handleQuickPublishToggle(p.id)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                                    isPublished
                                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                                      : isScheduled
                                      ? "bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100"
                                      : isArchived
                                      ? "bg-neutral-100 text-neutral-600 border border-neutral-300"
                                      : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                                  }`}
                                  title="Click to toggle publish status"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                  <span>{p.status || "published"}</span>
                                </button>
                                {isScheduled && p.scheduledPublishDate && (
                                  <span className="text-[9px] text-purple-600 block mt-0.5 font-mono">
                                    {new Date(p.scheduledPublishDate).toLocaleDateString("en-IN")}
                                  </span>
                                )}
                              </td>

                              {/* Sizes & Stock */}
                              <td className="py-3 px-4">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setVariantProduct(p);
                                    setIsVariantModalOpen(true);
                                  }}
                                  className="text-left group cursor-pointer"
                                  title="Manage size variant stock"
                                >
                                  <span className="font-semibold text-xs block group-hover:text-[#0071E3] underline decoration-dotted">
                                    {p.inStockSizes?.length || 0} / {p.sizes?.length || 0} in stock
                                  </span>
                                  <div className="flex gap-1 flex-wrap max-w-xs mt-1">
                                    {p.sizes?.slice(0, 4).map((s) => {
                                      const inStock = p.inStockSizes?.includes(s);
                                      return (
                                        <span
                                          key={s}
                                          className={`text-[9px] px-1 rounded font-mono ${
                                            inStock
                                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold"
                                              : "bg-neutral-100 text-neutral-400 line-through"
                                          }`}
                                        >
                                          {s}
                                        </span>
                                      );
                                    })}
                                    {p.sizes && p.sizes.length > 4 && (
                                      <span className="text-[9px] text-neutral-400">+{p.sizes.length - 4}</span>
                                    )}
                                  </div>
                                </button>
                              </td>

                              {/* Badges / Video */}
                              <td className="py-3 px-4">
                                <div className="flex flex-col gap-1 items-start">
                                  <button
                                    type="button"
                                    onClick={() => handleToggleFeatured(p.id)}
                                    className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                                      p.isFeatured
                                        ? "bg-blue-50 text-[#0071E3] border border-blue-200"
                                        : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                                    }`}
                                  >
                                    Featured: {p.isFeatured ? "Yes" : "No"}
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleToggleNew(p.id)}
                                    className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase transition-colors ${
                                      p.isNew
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                                    }`}
                                  >
                                    New: {p.isNew ? "Yes" : "No"}
                                  </button>

                                  {p.hasVideo && (
                                    <span className="text-[9px] text-[#0071E3] flex items-center gap-0.5 font-semibold">
                                      <Video className="w-2.5 h-2.5" /> Video
                                    </span>
                                  )}
                                </div>
                              </td>

                              {/* Actions */}
                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1">
                                  {/* Preview Desktop */}
                                  <button
                                    type="button"
                                    onClick={() => setPreviewProduct({ product: p, mode: "desktop" })}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0071E3] hover:bg-neutral-100"
                                    title="Desktop Preview"
                                  >
                                    <Monitor className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Preview Mobile */}
                                  <button
                                    type="button"
                                    onClick={() => setPreviewProduct({ product: p, mode: "mobile" })}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0071E3] hover:bg-neutral-100"
                                    title="Mobile Viewport Preview"
                                  >
                                    <Smartphone className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Change History */}
                                  <button
                                    type="button"
                                    onClick={() => setHistoryProduct(p)}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0071E3] hover:bg-neutral-100"
                                    title="View Change History"
                                  >
                                    <History className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Duplicate */}
                                  <button
                                    type="button"
                                    onClick={() => handleDuplicateProduct(p.id)}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-700 hover:bg-emerald-50"
                                    title="Duplicate Product"
                                  >
                                    <Copy className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Edit Details */}
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditProduct(p)}
                                    className="p-1.5 rounded-lg text-neutral-500 hover:text-[#0071E3] hover:bg-neutral-100"
                                    title="Edit Product Details"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>

                                  {/* Archive / Restore */}
                                  <button
                                    type="button"
                                    onClick={() => handleArchiveProduct(p.id, !isArchived)}
                                    className={`p-1.5 rounded-lg ${
                                      isArchived
                                        ? "text-emerald-600 hover:bg-emerald-50"
                                        : "text-neutral-400 hover:text-red-600 hover:bg-red-50"
                                    }`}
                                    title={isArchived ? "Restore from Archive" : "Archive Product"}
                                  >
                                    <Archive className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: NAVIGATION MANAGER (C) */}
          {/* ========================================================= */}
          {activeTab === "navigation" && (
            isLoadingInitialData || !navigation ? (
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 animate-pulse" role="status" aria-label="Loading navigation">
                <div className="h-6 w-52 bg-[#E5E7EB] rounded" />
                <TableSkeleton rows={6} columns={4} />
              </div>
            ) : (
              <NavigationManagerTab initialNavigation={navigation} />
            )
          )}

          {/* ========================================================= */}
          {/* TAB: SIZE GUIDE MANAGEMENT (F) */}
          {/* ========================================================= */}
          {activeTab === "size-guide" && (
            isLoadingInitialData || !sizeGuides ? (
              <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 space-y-4 animate-pulse" role="status" aria-label="Loading size guides">
                <div className="h-6 w-52 bg-[#E5E7EB] rounded" />
                <TableSkeleton rows={6} columns={4} />
              </div>
            ) : (
              <SizeGuideManagerTab initialSizeGuides={sizeGuides} />
            )
          )}

          {/* ========================================================= */}
          {/* TAB: EVENT-BASED STORE ANALYTICS (E) */}
          {/* ========================================================= */}
          {activeTab === "analytics" && <AnalyticsTab />}

          {/* ========================================================= */}
          {/* TAB: NOTIFICATIONS & ALERTS (G) */}
          {/* ========================================================= */}
          {activeTab === "notifications" && (
            <NotificationsTab
              initialNotifications={notifications}
              initialSettings={notificationSettings}
            />
          )}

          {/* ========================================================= */}
          {/* TAB: AUDIT TRAIL & RECOVERY STRATEGY (H) */}
          {/* ========================================================= */}
          {activeTab === "audit" && (
            <AuditRecoveryTab
              initialAuditLogs={auditLogs}
              initialBackups={backups}
              products={products}
            />
          )}

          {/* ========================================================= */}
          {/* TAB: COLLECTIONS SPOTLIGHT & ASSIGNMENT */}
          {/* ========================================================= */}
          {activeTab === "collections" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
                    Thematic Collections ({collections.length})
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Manage themed edits, promotional drops, and assign catalogue styles.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewCollectionModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Collection</span>
                </button>
              </div>

              {/* Specific Section Area: Skeleton while waiting for backend response, or Grid */}
              {isLoadingInitialData ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="status" aria-label="Loading collections">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden animate-pulse">
                      <div className="aspect-[16/9] bg-[#F5F5F7]" />
                      <div className="p-5 space-y-3">
                        <div className="h-4 w-32 bg-[#E5E7EB] rounded" />
                        <div className="h-3 w-48 bg-[#E5E7EB] rounded" />
                        <div className="h-3 w-24 bg-[#E5E7EB] rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {collections.map((col) => {
                    const assignedCount = products.filter((p) =>
                      p.collections?.includes(col.slug)
                    ).length;

                    return (
                      <div
                        key={col.id}
                        className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-2xs hover:shadow-subtle transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-[16/9] bg-[#F5F5F7]">
                            <Image
                              src={col.image}
                              alt={col.title}
                              fill
                              className="object-cover"
                            />
                            {col.badge && (
                              <span className="absolute top-3 left-3 bg-[#1D1D1F] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                                {col.badge}
                              </span>
                            )}
                          </div>

                          <div className="p-5 space-y-2">
                            <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                              {col.title}
                            </h3>
                            <p className="text-xs text-[#6E6E73] line-clamp-2">{col.description}</p>
                            <span className="text-[11px] font-mono text-[#0071E3] block">
                              /{col.slug} • {assignedCount} Styles Attached
                            </span>
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          <button
                            type="button"
                            onClick={() => setAssigningCollection(col)}
                            className="w-full py-2 rounded-xl border border-[#E5E7EB] text-xs font-semibold hover:bg-[#F5F5F7] transition-colors"
                          >
                            Manage Assigned Products
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: BRAND PARTNERS */}
          {/* ========================================================= */}
          {activeTab === "brands" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
                    Authorized Brand Representations ({brands.length})
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Flagship brand curations sourced exclusively via authorized distributors.
                  </p>
                </div>
              </div>

              {/* Specific Section Area: Skeleton while waiting for backend response, or Grid */}
              {isLoadingInitialData ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" role="status" aria-label="Loading brands">
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div key={idx} className="p-5 bg-white rounded-2xl border border-[#E5E7EB] space-y-3 animate-pulse">
                      <div className="h-8 w-20 bg-[#F5F5F7] rounded" />
                      <div className="h-4 w-28 bg-[#E5E7EB] rounded" />
                      <div className="h-3 w-16 bg-[#E5E7EB] rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {brands.map((b) => {
                    const brandProductsCount = products.filter(
                      (p) => p.brandSlug === b.slug || p.brand.toLowerCase() === b.name.toLowerCase()
                    ).length;

                    return (
                      <div
                        key={b.id}
                        className="bg-white rounded-3xl border border-[#E5E7EB] p-5 space-y-3 shadow-2xs flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-bold text-base text-[#1D1D1F]">
                              {b.name}
                            </span>
                            <span className="text-[10px] font-bold text-[#0071E3] bg-blue-50 px-2 py-0.5 rounded-full uppercase">
                              {b.category}
                            </span>
                          </div>
                          <p className="text-xs text-[#6E6E73] line-clamp-2">{b.description}</p>
                        </div>

                        <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                          <span className="text-[#86868B]">{brandProductsCount} Styles Live</span>
                          <Link
                            href={`/brands/${b.slug}`}
                            target="_blank"
                            className="text-[#0071E3] font-semibold hover:underline flex items-center gap-1"
                          >
                            <span>Storefront</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: HOMEPAGE SECTION CONTROLS */}
          {/* ========================================================= */}
          {activeTab === "homepage" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
                    Homepage Section Layout &amp; Ordering
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Toggle visibility and section configurations for the storefront landing page.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#E5E7EB] divide-y divide-[#E5E7EB] shadow-2xs overflow-hidden">
                {homepageSections.map((sec, idx) => (
                  <div key={sec.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[#86868B] text-[11px]">0{idx + 1}.</span>
                        <span className="font-bold text-sm text-[#1D1D1F]">{sec.name}</span>
                      </div>
                      <p className="text-[#6E6E73]">{sec.desc}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setHomepageSections((prev) =>
                          prev.map((s) => (s.id === sec.id ? { ...s, enabled: !s.enabled } : s))
                        );
                        success("Homepage Section Updated", `${sec.name} is now ${!sec.enabled ? "Enabled" : "Hidden"}`);
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                        sec.enabled
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-neutral-100 text-neutral-400 border-neutral-200"
                      }`}
                    >
                      {sec.enabled ? "Active on Home" : "Disabled"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: ENQUIRIES MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === "enquiries" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                <div>
                  <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
                    Customer Enquiries &amp; WhatsApp Reservations ({enquiries.length})
                  </h2>
                  <p className="text-xs text-[#86868B]">
                    Manage WhatsApp size requests, stock availability enquiries, and flagship visit reservations.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-2xs">
                {isLoadingInitialData ? (
                  <TableSkeleton rows={6} columns={7} />
                ) : enquiries.length === 0 ? (
                  <div className="py-16 text-center text-[#86868B] space-y-3">
                    <MessageSquare className="w-10 h-10 mx-auto text-neutral-300 stroke-[1.5]" />
                    <p className="font-bold text-sm text-[#1D1D1F]">No Enquiries Found</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#F5F5F7] border-b border-[#E5E7EB] text-[#86868B] font-bold uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Requested Style</th>
                        <th className="py-3 px-4">Size &amp; Colour</th>
                        <th className="py-3 px-4">Channel</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB] text-[#1D1D1F]">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-[#F9F9FB] transition-colors">
                          <td className="py-3 px-4">
                            <div>
                              <span className="font-bold block">{enq.customerName}</span>
                              <span className="text-[11px] text-[#86868B]">{enq.customerPhone}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold block">{enq.productTitle}</span>
                            <span className="text-[11px] text-[#86868B]">
                              Outlet Price: ₹{enq.outletPrice?.toLocaleString("en-IN")}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#0071E3] font-semibold">
                            {enq.sizeRequested} • {enq.colourRequested}
                          </td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize bg-emerald-50 text-emerald-800 border border-emerald-200">
                              {enq.channel}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[#86868B]">{enq.createdAt}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                enq.status === "New"
                                  ? "bg-red-50 text-red-700 border border-red-200"
                                  : enq.status === "Contacted"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : enq.status === "In Store Visit"
                                  ? "bg-blue-50 text-blue-700 border border-blue-200"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {enq.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <select
                              value={enq.status}
                              onChange={(e) =>
                                handleUpdateEnquiryStatus(
                                  enq.id!,
                                  e.target.value as StoreEnquiry["status"]
                                )
                              }
                              className="bg-[#F5F5F7] border border-[#E5E7EB] rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="In Store Visit">In Store Visit</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB: CLOUDINARY MEDIA LIBRARY & OPTIMIZATION */}
          {/* ========================================================= */}
          {activeTab === "media" && (
            <MediaLibraryTab
              onSelectImage={(url) => {
                success("Image Selected", `Cloudinary delivery URL copied to clipboard: ${url}`);
                navigator.clipboard.writeText(url);
              }}
            />
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* FLOATING BULK ACTIONS TOOLBAR */}
      {/* ========================================================= */}
      <BulkActionsBar
        selectedCount={selectedProductIds.length}
        totalCount={filteredProducts.length}
        onClearSelection={() => setSelectedProductIds([])}
        onSelectAll={handleSelectAllFiltered}
        onBulkStock={handleBulkStock}
        onBulkPriceModal={() => setIsBulkPriceModalOpen(true)}
        onBulkAssignModal={() => setIsBulkAssignModalOpen(true)}
        onBulkPublish={handleBulkPublish}
        onBulkArchive={handleBulkArchiveConfirm}
      />

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT PRODUCT */}
      {/* ========================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                  {editingProductId ? "Edit Catalogue Product" : "Add Product to Catalogue"}
                </h3>
                <p className="text-xs text-[#86868B]">
                  Configure product attributes, publishing workflow status, and video availability.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (productFormDirty) setShowUnsavedWarning(true);
                  else setIsProductModalOpen(false);
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:bg-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {productSaveError && (
              <div className="p-3.5 mb-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{productSaveError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setProductSaveError(null)}
                  className="text-rose-600 hover:text-rose-900 font-bold"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <form onSubmit={handleSaveProductForm} className="space-y-4 text-xs">
              {/* Publishing Status & Scheduled Date */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <span className="font-bold text-[#0071E3] block">Publishing Workflow Lifecycle</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1">Catalogue Status</label>
                    <select
                      value={productForm.status}
                      onChange={(e) => {
                        setProductFormDirty(true);
                        setProductForm({ ...productForm, status: e.target.value as any });
                      }}
                      className="w-full h-9 px-3 rounded-xl bg-white border border-[#E5E7EB]"
                    >
                      <option value="published">Published (Live on Storefront)</option>
                      <option value="draft">Draft (Hidden from Storefront)</option>
                      <option value="scheduled">Scheduled Publishing (Timed Release)</option>
                    </select>
                  </div>

                  {productForm.status === "scheduled" && (
                    <div>
                      <label className="font-semibold block mb-1">Scheduled Date &amp; Time</label>
                      <input
                        type="datetime-local"
                        required
                        value={productForm.scheduledPublishDate}
                        onChange={(e) => {
                          setProductFormDirty(true);
                          setProductForm({ ...productForm, scheduledPublishDate: e.target.value });
                        }}
                        className="w-full h-9 px-3 rounded-xl bg-white border border-[#E5E7EB]"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Department & Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">Department</label>
                  <select
                    value={productForm.type}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({
                        ...productForm,
                        type: e.target.value as "footwear" | "clothing",
                        category: e.target.value === "footwear" ? "Shoes" : "Clothing",
                      });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  >
                    <option value="footwear">Footwear / Shoes</option>
                    <option value="clothing">Clothing / Apparel</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1">Brand</label>
                  <select
                    value={productForm.brand}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, brand: e.target.value });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  >
                    {brands.map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-semibold block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={productForm.title}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, title: e.target.value });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Store SKU</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, sku: e.target.value });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
              </div>

              {/* Pricing & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold block mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.mrp}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, mrp: Number(e.target.value) });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Outlet Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={productForm.outletPrice}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, outletPrice: Number(e.target.value) });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Gender</label>
                  <select
                    value={productForm.gender}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, gender: e.target.value as any });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              {/* Video Availability */}
              <div className="p-3.5 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.hasVideo}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, hasVideo: e.target.checked });
                    }}
                    className="w-4 h-4 rounded accent-[#0071E3]"
                  />
                  <span className="font-bold text-[#1D1D1F]">
                    Enable Video Showcase Badge &amp; Player
                  </span>
                </label>

                {productForm.hasVideo && (
                  <input
                    type="text"
                    value={productForm.videoUrl}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, videoUrl: e.target.value });
                    }}
                    placeholder="/videos/products/nike-air-max-270.mp4"
                    className="w-full h-8 px-3 rounded-xl bg-white border border-[#E5E7EB] font-mono text-[11px]"
                  />
                )}
              </div>

              {/* Sizes and Colours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1">
                    Available Sizes ({productForm.type === "footwear" ? "UK Standard" : "S, M, L, XL"})
                  </label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, sizes: e.target.value });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Colours (Name &amp; Hex)</label>
                  <input
                    type="text"
                    value={productForm.colours}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, colours: e.target.value });
                    }}
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => {
                    setProductFormDirty(true);
                    setProductForm({ ...productForm, description: e.target.value });
                  }}
                  className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                />
              </div>

              {/* Cloudinary Product Image */}
              <div className="p-3 bg-[#F5F5F7] rounded-2xl border border-[#E5E7EB] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-xs text-[#1D1D1F]">Product Catalogue Image (Cloudinary)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget("product");
                      setIsMediaPickerOpen(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    Select from Cloudinary Library
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] overflow-hidden relative shrink-0">
                    <Image
                      src={productForm.image}
                      alt="Product preview"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <input
                    type="text"
                    value={productForm.image}
                    onChange={(e) => {
                      setProductFormDirty(true);
                      setProductForm({ ...productForm, image: e.target.value });
                    }}
                    placeholder="https://res.cloudinary.com/... or public ID"
                    className="flex-1 h-9 px-3 rounded-xl bg-white border border-[#E5E7EB] text-xs font-mono text-[#1D1D1F]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (productFormDirty) setShowUnsavedWarning(true);
                    else setIsProductModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-[#F5F5F7]"
                >
                  Cancel
                </button>
                <LoadingButton
                  type="submit"
                  isLoading={isSavingProduct}
                  loadingText={editingProductId ? "Saving Changes..." : "Creating Product..."}
                  className="px-6 py-2"
                >
                  {editingProductId ? "Save Changes" : "Create Product"}
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: PREVIEW PRODUCT (DESKTOP & MOBILE) */}
      {/* ========================================================= */}
      {previewProduct && (
        <ProductPreviewModal
          product={previewProduct.product}
          initialMode={previewProduct.mode}
          onClose={() => setPreviewProduct(null)}
          onPublishNow={(id) => handleQuickPublishToggle(id)}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: PRODUCT CHANGE HISTORY */}
      {/* ========================================================= */}
      {historyProduct && (
        <ProductChangeHistoryModal
          product={historyProduct}
          onClose={() => setHistoryProduct(null)}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: CSV IMPORT */}
      {/* ========================================================= */}
      {isCsvImportOpen && (
        <CsvImportModal
          onClose={() => setIsCsvImportOpen(false)}
          onSuccess={(count) => {
            // Re-fetch all products
            fetch("/api/products?all=true")
              .then((r) => r.json())
              .then((data) => {
                if (data.success) setProducts(data.products);
              });
            success("Catalogue Batch Imported", `Successfully published ${count} new styles to catalogue.`);
          }}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: BULK PRICING */}
      {/* ========================================================= */}
      {isBulkPriceModalOpen && (
        <BulkPriceModal
          selectedCount={selectedProductIds.length}
          onClose={() => setIsBulkPriceModalOpen(false)}
          onSubmit={handleBulkPriceSubmit}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: BULK ASSIGNMENT */}
      {/* ========================================================= */}
      {isBulkAssignModalOpen && (
        <BulkAssignModal
          selectedCount={selectedProductIds.length}
          onClose={() => setIsBulkAssignModalOpen(false)}
          onSubmit={handleBulkAssignSubmit}
          brands={brands}
          collections={collections}
        />
      )}

      {/* ========================================================= */}
      {/* MODAL: VARIANT STOCK MANAGEMENT */}
      {/* ========================================================= */}
      {isVariantModalOpen && variantProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                  Manage Variant Stock
                </h3>
                <p className="text-xs text-[#86868B]">{variantProduct.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsVariantModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:bg-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-[#6E6E73]">
                Toggle sizes available for immediate physical trial at the Kapadwanj flagship outlet.
              </p>

              <div className="divide-y divide-[#E5E7EB]">
                {variantProduct.sizes.map((size) => {
                  const inStock = variantProduct.inStockSizes.includes(size);
                  return (
                    <div key={size} className="py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">
                          {variantProduct.type === "footwear" ? `UK ${size}` : size}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            inStock
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-neutral-100 text-neutral-500"
                          }`}
                        >
                          {inStock ? "In Stock (Available)" : "Out of Stock"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleSizeStock(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                          inStock
                            ? "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        }`}
                      >
                        {inStock ? "Mark Out of Stock" : "Mark In Stock"}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setIsVariantModalOpen(false)}
                  className="w-full py-2.5 rounded-full bg-[#1D1D1F] text-white font-semibold hover:bg-black"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: CREATE COLLECTION */}
      {/* ========================================================= */}
      {isNewCollectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB]">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                  Create New Collection
                </h3>
                <p className="text-xs text-[#86868B]">
                  Add a new themed edit with campaign photography.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewCollectionModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:bg-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const slug =
                  newCollectionForm.slug ||
                  newCollectionForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

                const created: CollectionItem = {
                  id: `col-${Date.now()}`,
                  slug,
                  title: newCollectionForm.title,
                  description: newCollectionForm.description,
                  badge: newCollectionForm.badge,
                  image: newCollectionForm.image,
                  featured: true,
                };

                setCollections([...collections, created]);
                setIsNewCollectionModalOpen(false);
                success("Collection Created", `${created.title} added to store curations.`);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="font-semibold block mb-1">Collection Title</label>
                <input
                  type="text"
                  required
                  value={newCollectionForm.title}
                  onChange={(e) =>
                    setNewCollectionForm({ ...newCollectionForm, title: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Badge / Tag</label>
                <input
                  type="text"
                  value={newCollectionForm.badge}
                  onChange={(e) =>
                    setNewCollectionForm({ ...newCollectionForm, badge: e.target.value })
                  }
                  className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newCollectionForm.description}
                  onChange={(e) =>
                    setNewCollectionForm({ ...newCollectionForm, description: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                />
              </div>

              {/* Cloudinary Collection Image */}
              <div className="p-3 bg-[#F5F5F7] rounded-2xl border border-[#E5E7EB] space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-xs text-[#1D1D1F]">Collection Cover Image (Cloudinary)</label>
                  <button
                    type="button"
                    onClick={() => {
                      setMediaPickerTarget("collection");
                      setIsMediaPickerOpen(true);
                    }}
                    className="px-3 py-1 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-[11px] font-semibold transition-all cursor-pointer"
                  >
                    Select from Cloudinary Library
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] overflow-hidden relative shrink-0">
                    <Image
                      src={newCollectionForm.image}
                      alt="Collection preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={newCollectionForm.image}
                    onChange={(e) =>
                      setNewCollectionForm({ ...newCollectionForm, image: e.target.value })
                    }
                    placeholder="https://res.cloudinary.com/... or public ID"
                    className="flex-1 h-9 px-3 rounded-xl bg-white border border-[#E5E7EB] text-xs font-mono text-[#1D1D1F]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewCollectionModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#E5E7EB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC]"
                >
                  Create Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ASSIGN PRODUCTS TO COLLECTION */}
      {/* ========================================================= */}
      {assigningCollection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                  Assign Products: {assigningCollection.title}
                </h3>
                <p className="text-xs text-[#86868B]">
                  Select products to include in this collection listing.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAssigningCollection(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:bg-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="divide-y divide-[#E5E7EB] max-h-96 overflow-y-auto pr-1">
                {products.map((p) => {
                  const isAssigned = p.collections?.includes(assigningCollection.slug);
                  return (
                    <label
                      key={p.id}
                      className="py-2.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#F5F5F7] px-2 rounded-lg"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isAssigned}
                          onChange={async () => {
                            const updatedCols = isAssigned
                              ? p.collections.filter((c) => c !== assigningCollection.slug)
                              : [...(p.collections || []), assigningCollection.slug];

                            setProducts((prev) =>
                              prev.map((item) =>
                                item.id === p.id ? { ...item, collections: updatedCols } : item
                              )
                            );

                            await fetch(`/api/products/${p.id}`, {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ collections: updatedCols }),
                            });
                          }}
                          className="accent-[#0071E3] w-4 h-4 rounded"
                        />
                        <div>
                          <span className="font-semibold block">{p.title}</span>
                          <span className="text-[10px] text-[#86868B]">
                            {p.brand} • {p.type} • ₹{p.outletPrice.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isAssigned ? "bg-[#0071E3]/10 text-[#0071E3]" : "text-[#86868B]"
                        }`}
                      >
                        {isAssigned ? "Assigned" : "Not in collection"}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#E5E7EB]">
                <button
                  type="button"
                  onClick={() => setAssigningCollection(null)}
                  className="w-full py-2.5 rounded-full bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC]"
                >
                  Save Collection Assignment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CONFIRMATION DIALOG */}
      {/* ========================================================= */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        variant={confirmDialog.variant}
        onConfirm={() => {
          confirmDialog.action();
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* ========================================================= */}
      {/* UNSAVED CHANGES WARNING */}
      {/* ========================================================= */}
      <UnsavedChangesDialog
        isOpen={showUnsavedWarning}
        onDiscard={() => {
          setShowUnsavedWarning(false);
          setProductFormDirty(false);
          setIsProductModalOpen(false);
        }}
        onKeepEditing={() => setShowUnsavedWarning(false)}
      />

      {/* ========================================================= */}
      {/* CLOUDINARY MEDIA PICKER MODAL */}
      {/* ========================================================= */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => {
          if (mediaPickerTarget === "product") {
            setProductFormDirty(true);
            setProductForm((prev) => ({
              ...prev,
              image: url,
            }));
            success("Image Selected", "Cloudinary image assigned to product.");
          } else {
            setNewCollectionForm((prev) => ({
              ...prev,
              image: url,
            }));
            success("Image Selected", "Cloudinary image assigned to collection.");
          }
        }}
      />
    </div>
  );
}
