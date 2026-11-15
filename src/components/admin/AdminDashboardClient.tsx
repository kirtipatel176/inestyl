"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";
import {
  PRODUCTS_DATA,
  BRANDS_DATA,
  COLLECTIONS_DATA,
  MEN_SUBCATEGORIES,
  WOMEN_SUBCATEGORIES,
  SHOES_SUBCATEGORIES,
  CLOTHING_SUBCATEGORIES,
  INITIAL_ENQUIRIES,
  ProductItem,
  BrandItem,
  CollectionItem,
} from "@/constants/mock-data";
import { StoreEnquiry, ProductVariant } from "@/types";

type AdminTab =
  | "products"
  | "footwear"
  | "clothing"
  | "collections"
  | "brands"
  | "categories"
  | "homepage"
  | "enquiries";

export function AdminDashboardClient() {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  // State for products
  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");

  // State for collections
  const [collections, setCollections] = useState<CollectionItem[]>(COLLECTIONS_DATA);

  // State for brands
  const [brands, setBrands] = useState<BrandItem[]>(BRANDS_DATA);

  // State for enquiries
  const [enquiries, setEnquiries] = useState<StoreEnquiry[]>(INITIAL_ENQUIRIES);

  // State for homepage section toggles
  const [homepageSections, setHomepageSections] = useState({
    heroBanner: true,
    brandMarquee: true,
    curatedCategories: true,
    featuredProducts: true,
    newArrivalsBanner: true,
    collectionsSpotlight: true,
    storeVisitSection: true,
    trustPillars: true,
  });

  // Modal states
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [variantProduct, setVariantProduct] = useState<ProductItem | null>(null);

  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false);
  const [assigningCollection, setAssigningCollection] = useState<CollectionItem | null>(null);

  // Form state for creating product
  const [newProductForm, setNewProductForm] = useState({
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
    image: "/images/products/nike-air-max-270.jpg",
  });

  // Form state for new collection
  const [newCollectionForm, setNewCollectionForm] = useState({
    title: "",
    slug: "",
    description: "",
    badge: "Special Curation",
    image: "/images/hero/hero-lifestyle-composite.jpg",
  });

  // Filter products by search and tab
  const filteredProducts = products.filter((p) => {
    if (activeTab === "footwear" && p.type !== "footwear") return false;
    if (activeTab === "clothing" && p.type !== "clothing" && p.type !== "apparel") return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  });

  // Toggle featured status
  const handleToggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  // Toggle new arrival status
  const handleToggleNew = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isNew: !p.isNew } : p))
    );
  };

  // Open variant stock editor
  const handleOpenVariantEditor = (product: ProductItem) => {
    setVariantProduct(product);
    setIsVariantModalOpen(true);
  };

  // Update variant stock in state
  const handleToggleSizeStock = (size: string) => {
    if (!variantProduct) return;
    const isCurrentlyInStock = variantProduct.inStockSizes.includes(size);
    const updatedInStock = isCurrentlyInStock
      ? variantProduct.inStockSizes.filter((s) => s !== size)
      : [...variantProduct.inStockSizes, size];

    const updatedProduct = {
      ...variantProduct,
      inStockSizes: updatedInStock,
      variants: variantProduct.variants.map((v) =>
        v.size === size
          ? {
              ...v,
              isAvailable: !isCurrentlyInStock,
              stockQuantity: isCurrentlyInStock ? 0 : 2,
            }
          : v
      ),
    };

    setVariantProduct(updatedProduct);
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Handle creating new product
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sizeList = newProductForm.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const colourList = newProductForm.colours.split(",").map((c) => {
      const parts = c.split("(");
      const name = parts[0].trim();
      const hex = parts[1] ? parts[1].replace(")", "").trim() : "#111111";
      return { name, hex };
    });

    const discount = Math.round(
      ((newProductForm.mrp - newProductForm.outletPrice) / newProductForm.mrp) * 100
    );

    const slug = newProductForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const created: ProductItem = {
      id: `prod-${Date.now()}`,
      title: newProductForm.title,
      slug,
      sku: newProductForm.sku,
      brand: newProductForm.brand,
      brandSlug: newProductForm.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newProductForm.type === "footwear" ? "Shoes" : "Clothing",
      subcategory: newProductForm.subcategory,
      type: newProductForm.type,
      gender: newProductForm.gender,
      collections: ["new-arrivals"],
      mrp: Number(newProductForm.mrp),
      outletPrice: Number(newProductForm.outletPrice),
      discount,
      image: newProductForm.image,
      gallery: [newProductForm.image],
      sizes: sizeList,
      inStockSizes: sizeList,
      colours: colourList,
      isNew: true,
      isFeatured: false,
      description: newProductForm.description,
      features: [
        "100% Genuine distributor stock.",
        "Verified authentic Kapadwanj flagship inventory.",
      ],
      shoeType: newProductForm.type === "footwear" ? (newProductForm.shoeType as any) : undefined,
      clothingCategory: newProductForm.type === "clothing" ? (newProductForm.clothingCategory as any) : undefined,
      fit: newProductForm.type === "clothing" ? (newProductForm.fit as any) : undefined,
      fabric: newProductForm.type === "clothing" ? newProductForm.fabric : undefined,
      sleeve: newProductForm.type === "clothing" ? (newProductForm.sleeve as any) : undefined,
      variants: sizeList.map((size, idx) => ({
        id: `var-${idx}`,
        size,
        colour: colourList[0]?.name || "Default",
        stockQuantity: 3,
        isAvailable: true,
      })),
    };

    setProducts([created, ...products]);
    setIsNewProductModalOpen(false);
  };

  // Handle creating new collection
  const handleCreateCollection = (e: React.FormEvent) => {
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
  };

  // Handle assigning/unassigning product to collection
  const handleToggleProductInCollection = (productId: string, collectionSlug: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const exists = p.collections?.includes(collectionSlug);
        const updatedCols = exists
          ? p.collections.filter((c) => c !== collectionSlug)
          : [...(p.collections || []), collectionSlug];
        return { ...p, collections: updatedCols };
      })
    );
  };

  // Handle enquiry status change
  const handleUpdateEnquiryStatus = (
    enquiryId: string,
    newStatus: StoreEnquiry["status"]
  ) => {
    setEnquiries((prev) =>
      prev.map((enq) => (enq.id === enquiryId ? { ...enq, status: newStatus } : enq))
    );
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#0071E3] block mb-1">
            FLAGSHIP STORE OPERATIONS
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
            Admin Management Console
          </h1>
          <p className="text-xs sm:text-sm text-[#86868B] mt-1">
            Manage footwear, clothing, brand curations, collections, variant inventory, and customer enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#E5E7EB] bg-white text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
          >
            <span>Live Catalogue</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
          <button
            type="button"
            onClick={() => setIsNewProductModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* 2. Admin Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E7EB] no-scrollbar">
        {[
          { id: "products", label: "All Products", count: products.length, icon: Package },
          {
            id: "footwear",
            label: "Footwear",
            count: products.filter((p) => p.type === "footwear").length,
            icon: Package,
          },
          {
            id: "clothing",
            label: "Clothing",
            count: products.filter((p) => p.type === "clothing" || p.type === "apparel").length,
            icon: Layers,
          },
          { id: "collections", label: "Collections", count: collections.length, icon: Tag },
          { id: "brands", label: "Brands", count: brands.length, icon: ShieldCheck },
          { id: "categories", label: "Categories", count: 18, icon: FolderTree },
          { id: "homepage", label: "Homepage Control", count: 8, icon: Sliders },
          {
            id: "enquiries",
            label: "Customer Enquiries",
            count: enquiries.length,
            icon: MessageSquare,
            badge: enquiries.filter((e) => e.status === "New").length,
          },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-xs"
                  : "bg-white text-[#6E6E73] border-[#E5E7EB] hover:text-[#1D1D1F] hover:border-[#86868B]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-[#F5F5F7] text-[#86868B]"
                }`}
              >
                {tab.count}
              </span>
              {tab.badge && tab.badge > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#0071E3] text-white text-[9px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* -------------------------------------------------------- */}
      {/* TAB 1, 2, 3: PRODUCTS & FOOTWEAR & CLOTHING SEPARATE MGMT */}
      {/* -------------------------------------------------------- */}
      {(activeTab === "products" || activeTab === "footwear" || activeTab === "clothing") && (
        <div className="space-y-4">
          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-[#86868B] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, SKU, or brand..."
                className="w-full h-9 pl-9 pr-3 text-xs bg-[#F5F5F7] border border-[#E5E7EB] rounded-xl text-[#1D1D1F] focus:outline-none focus:border-[#0071E3] focus:bg-white transition-all"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs text-[#86868B]">
              <span>Showing {filteredProducts.length} items</span>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F5F5F7] border-b border-[#E5E7EB] text-[#86868B] font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Brand</th>
                    <th className="py-3 px-4">Department / Type</th>
                    <th className="py-3 px-4">MRP / Outlet Price</th>
                    <th className="py-3 px-4">In-Stock Sizes</th>
                    <th className="py-3 px-4 text-center">Featured</th>
                    <th className="py-3 px-4 text-center">New Drop</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-[#1D1D1F]">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F9F9FB] transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#F5F5F7] border border-[#E5E7EB] relative flex-shrink-0 overflow-hidden">
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              sizes="40px"
                              loading="lazy"
                              className="object-contain p-1"
                            />
                          </div>
                          <div>
                            <span className="font-semibold block line-clamp-1">{p.title}</span>
                            <span className="text-[10px] text-[#86868B] font-mono">{p.sku}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{p.brand}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 capitalize px-2 py-0.5 rounded-full bg-[#F5F5F7] text-[11px] font-medium border border-[#E5E7EB]">
                          {p.type} • {p.subcategory || p.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <span className="font-bold text-[#1D1D1F]">
                            ₹{p.outletPrice.toLocaleString("en-IN")}
                          </span>
                          <span className="text-[10px] text-[#86868B] block line-through">
                            MRP ₹{p.mrp.toLocaleString("en-IN")} ({p.discount}% off)
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {p.sizes.map((s) => {
                            const isAvailable = p.inStockSizes.includes(s);
                            return (
                              <span
                                key={s}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                                  isAvailable
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-neutral-100 text-neutral-400 line-through"
                                }`}
                              >
                                {p.type === "footwear" ? `UK ${s}` : s}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(p.id)}
                          className={`w-5 h-5 rounded border inline-flex items-center justify-center transition-colors ${
                            p.isFeatured
                              ? "bg-[#0071E3] border-[#0071E3] text-white"
                              : "border-[#E5E7EB] bg-white hover:border-[#86868B]"
                          }`}
                        >
                          {p.isFeatured && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleNew(p.id)}
                          className={`w-5 h-5 rounded border inline-flex items-center justify-center transition-colors ${
                            p.isNew
                              ? "bg-[#1D1D1F] border-[#1D1D1F] text-white"
                              : "border-[#E5E7EB] bg-white hover:border-[#86868B]"
                          }`}
                        >
                          {p.isNew && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenVariantEditor(p)}
                            title="Manage Variant Stock"
                            className="px-2.5 py-1 rounded-lg border border-[#E5E7EB] text-[11px] font-semibold text-[#0071E3] hover:bg-[#0071E3]/5"
                          >
                            Stock
                          </button>
                          <Link
                            href={`/product/${p.slug}`}
                            target="_blank"
                            title="View on Storefront"
                            className="p-1 text-[#86868B] hover:text-[#1D1D1F]"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* TAB 4: COLLECTIONS MANAGEMENT */}
      {/* -------------------------------------------------------- */}
      {activeTab === "collections" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
                Curated Collections ({collections.length})
              </h2>
              <p className="text-xs text-[#86868B]">
                Organize products into campaign edits and manage landing page display.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsNewCollectionModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Collection</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((col) => {
              const assignedCount = products.filter((p) =>
                p.collections?.includes(col.slug)
              ).length;

              return (
                <div
                  key={col.slug}
                  className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden p-5 space-y-4 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#F5F5F7]">
                      <Image
                        src={col.image}
                        alt={col.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 360px"
                        loading="lazy"
                        className="object-cover"
                      />
                      {col.badge && (
                        <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {col.badge}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                        {col.title}
                      </h3>
                      <p className="text-xs text-[#6E6E73] line-clamp-2 mt-1">
                        {col.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#0071E3]">
                      {assignedCount} Assigned Products
                    </span>
                    <button
                      type="button"
                      onClick={() => setAssigningCollection(col)}
                      className="px-3 py-1.5 rounded-lg border border-[#E5E7EB] text-xs font-semibold hover:border-[#0071E3] hover:text-[#0071E3] transition-colors"
                    >
                      Assign Products
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* TAB 5: BRANDS MANAGEMENT */}
      {/* -------------------------------------------------------- */}
      {activeTab === "brands" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
                Partner Brands ({brands.length})
              </h2>
              <p className="text-xs text-[#86868B]">
                Configure authorized brand representations and verified distributor details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((b) => {
              const brandItems = products.filter(
                (p) => p.brandSlug === b.slug || p.brand.toLowerCase() === b.name.toLowerCase()
              ).length;

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-10 w-24 relative">
                      <Image
                        src={b.logo}
                        alt={b.name}
                        fill
                        sizes="96px"
                        loading="lazy"
                        className="object-contain filter grayscale"
                      />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5F5F7] border border-[#E5E7EB] text-[#6E6E73]">
                      {b.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-heading text-base font-bold text-[#1D1D1F]">
                      {b.name}
                    </h3>
                    <p className="text-xs text-[#6E6E73] leading-relaxed">
                      {b.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#1D1D1F]">
                      {brandItems} Current Live Styles
                    </span>
                    <Link
                      href={`/brands/${b.slug}`}
                      target="_blank"
                      className="text-[#0071E3] font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Brand Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* TAB 6: CATEGORIES & SUBCATEGORIES MANAGEMENT */}
      {/* -------------------------------------------------------- */}
      {activeTab === "categories" && (
        <div className="space-y-8">
          <div className="pb-3 border-b border-[#E5E7EB]">
            <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
              Category &amp; Subcategory Architecture
            </h2>
            <p className="text-xs text-[#86868B]">
              Only categories with active products are displayed in storefront navigation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shoes Subcategories */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0071E3] block">
                Shoes Subcategories
              </span>
              <div className="divide-y divide-[#E5E7EB]">
                {SHOES_SUBCATEGORIES.map((cat) => {
                  const count = products.filter(
                    (p) =>
                      p.type === "footwear" &&
                      (p.subcategory?.toLowerCase().includes(cat.name.toLowerCase()) ||
                        p.shoeType?.toLowerCase().includes(cat.name.toLowerCase()))
                  ).length;

                  return (
                    <div key={cat.name} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-[#1D1D1F]">{cat.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          count > 0
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {count} Products {count === 0 && "(Hidden on Nav)"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clothing Subcategories */}
            <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0071E3] block">
                Clothing Subcategories
              </span>
              <div className="divide-y divide-[#E5E7EB]">
                {CLOTHING_SUBCATEGORIES.map((cat) => {
                  const count = products.filter(
                    (p) =>
                      (p.type === "clothing" || p.type === "apparel") &&
                      (p.subcategory?.toLowerCase().includes(cat.name.toLowerCase()) ||
                        p.clothingCategory?.toLowerCase().includes(cat.name.toLowerCase()))
                  ).length;

                  return (
                    <div key={cat.name} className="py-2.5 flex items-center justify-between text-xs">
                      <span className="font-medium text-[#1D1D1F]">{cat.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          count > 0
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {count} Products {count === 0 && "(Hidden on Nav)"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* TAB 7: HOMEPAGE SECTIONS CONTROL */}
      {/* -------------------------------------------------------- */}
      {activeTab === "homepage" && (
        <div className="space-y-6 max-w-3xl">
          <div className="pb-3 border-b border-[#E5E7EB]">
            <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
              Homepage Section Visibility Controls
            </h2>
            <p className="text-xs text-[#86868B]">
              Control hero campaigns, brand marquees, and curated collection spotlights on the homepage.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] divide-y divide-[#E5E7EB]">
            {[
              {
                key: "heroBanner",
                title: "Hero Interactive Campaign Banner",
                desc: "Full-width editorial hero showcasing featured footwear drops.",
              },
              {
                key: "brandMarquee",
                title: "Partner Brand Logos Strip",
                desc: "Marquee carousel featuring Nike, Puma, adidas, HOKA, Levi's, DIESEL, U.S. Polo.",
              },
              {
                key: "curatedCategories",
                title: "Category Discovery (Men, Women, Shoes, Apparel)",
                desc: "Visual cards navigating to Men's, Women's, Footwear, and Clothing catalogues.",
              },
              {
                key: "featuredProducts",
                title: "Featured Store Highlights Grid",
                desc: "Curated 8-pair showcase of flagship in-stock inventory.",
              },
              {
                key: "newArrivalsBanner",
                title: "New Arrivals Editorial Banner",
                desc: "Campaign promoting freshly unboxed weekly drops.",
              },
              {
                key: "collectionsSpotlight",
                title: "Signature Collections Showcase",
                desc: "Visual showcase for Running, Sneakers, and Casual Wear collections.",
              },
              {
                key: "storeVisitSection",
                title: "Flagship Store & Kapadwanj Map Destination",
                desc: "Physical store inspection encouragement and directions to Station Road.",
              },
              {
                key: "trustPillars",
                title: "Trust Pillars (Original, Outlet Prices, Concierge)",
                desc: "Guarantees explaining verified sourcing and offline trial model.",
              },
            ].map((section) => {
              const isEnabled = homepageSections[section.key as keyof typeof homepageSections];
              return (
                <div key={section.key} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-sm font-bold text-[#1D1D1F]">
                      {section.title}
                    </h3>
                    <p className="text-xs text-[#6E6E73] mt-0.5">{section.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setHomepageSections((prev) => ({
                        ...prev,
                        [section.key]: !prev[section.key as keyof typeof prev],
                      }))
                    }
                    className={`w-12 h-7 rounded-full p-1 transition-colors flex items-center ${
                      isEnabled ? "bg-[#0071E3]" : "bg-[#E5E7EB]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                        isEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* TAB 8: CUSTOMER ENQUIRIES MANAGEMENT */}
      {/* -------------------------------------------------------- */}
      {activeTab === "enquiries" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
            <div>
              <h2 className="font-heading text-lg font-bold text-[#1D1D1F]">
                Customer Enquiries &amp; WhatsApp Reservations ({enquiries.length})
              </h2>
              <p className="text-xs text-[#86868B]">
                Manage direct WhatsApp queries, store visit reservations, and stock requests.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F5F5F7] border-b border-[#E5E7EB] text-[#86868B] font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Product Requested</th>
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
                        <span className="font-semibold">{enq.productTitle}</span>
                        <span className="text-[11px] text-[#86868B] block">
                          Outlet: ₹{enq.outletPrice?.toLocaleString("en-IN")}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#0071E3]">
                          {enq.sizeRequested} • {enq.colourRequested}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                            enq.channel === "whatsapp"
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-blue-50 text-blue-800 border border-blue-200"
                          }`}
                        >
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
                          className="bg-[#F5F5F7] border border-[#E5E7EB] rounded-lg px-2 py-1 text-xs font-medium cursor-pointer"
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
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL 1: ADD NEW PRODUCT MODAL */}
      {/* -------------------------------------------------------- */}
      {isNewProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#E5E7EB] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#1D1D1F]">
                  Add Product to Discovery Catalogue
                </h3>
                <p className="text-xs text-[#86868B]">
                  Configure product details, category-specific attributes, and initial sizes.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsNewProductModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:bg-[#F5F5F7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Department / Type */}
                <div>
                  <label className="font-semibold block mb-1">Department</label>
                  <select
                    value={newProductForm.type}
                    onChange={(e) =>
                      setNewProductForm({
                        ...newProductForm,
                        type: e.target.value as "footwear" | "clothing",
                        category: e.target.value === "footwear" ? "Shoes" : "Clothing",
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  >
                    <option value="footwear">Footwear / Shoes</option>
                    <option value="clothing">Clothing / Apparel</option>
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="font-semibold block mb-1">Brand</label>
                  <select
                    value={newProductForm.brand}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, brand: e.target.value })
                    }
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  >
                    {BRANDS_DATA.map((b) => (
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
                    value={newProductForm.title}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, title: e.target.value })
                    }
                    placeholder="e.g. Nike Air Max Plus OG"
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Store SKU</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.sku}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, sku: e.target.value })
                    }
                    placeholder="NK-AMP-01"
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
                    value={newProductForm.mrp}
                    onChange={(e) =>
                      setNewProductForm({ ...newProductForm, mrp: Number(e.target.value) })
                    }
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Outlet Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.outletPrice}
                    onChange={(e) =>
                      setNewProductForm({
                        ...newProductForm,
                        outletPrice: Number(e.target.value),
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Gender</label>
                  <select
                    value={newProductForm.gender}
                    onChange={(e) =>
                      setNewProductForm({
                        ...newProductForm,
                        gender: e.target.value as "Men" | "Women" | "Unisex",
                      })
                    }
                    className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              {/* Footwear-Specific Attributes */}
              {newProductForm.type === "footwear" && (
                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] space-y-3">
                  <span className="font-bold text-[#0071E3] block">Footwear Attributes</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">Shoe Type</label>
                      <select
                        value={newProductForm.shoeType}
                        onChange={(e) =>
                          setNewProductForm({ ...newProductForm, shoeType: e.target.value })
                        }
                        className="w-full h-9 px-3 rounded-xl bg-white border border-[#E5E7EB]"
                      >
                        <option value="Sneakers">Sneakers</option>
                        <option value="Running">Running</option>
                        <option value="Walking">Walking</option>
                        <option value="Casual">Casual</option>
                        <option value="Sports">Sports</option>
                        <option value="Training">Training</option>
                        <option value="Lifestyle">Lifestyle</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">UK Sizes (comma separated)</label>
                      <input
                        type="text"
                        value={newProductForm.sizes}
                        onChange={(e) =>
                          setNewProductForm({ ...newProductForm, sizes: e.target.value })
                        }
                        placeholder="6, 7, 8, 9, 10, 11"
                        className="w-full h-9 px-3 rounded-xl bg-white border border-[#E5E7EB]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Clothing-Specific Attributes */}
              {newProductForm.type === "clothing" && (
                <div className="p-4 rounded-2xl bg-[#F5F5F7] border border-[#E5E7EB] space-y-3">
                  <span className="font-bold text-[#0071E3] block">Clothing Attributes</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="font-semibold block mb-1">Clothing Category</label>
                      <select
                        value={newProductForm.clothingCategory}
                        onChange={(e) =>
                          setNewProductForm({
                            ...newProductForm,
                            clothingCategory: e.target.value,
                          })
                        }
                        className="w-full h-9 px-3 rounded-xl bg-white border border-[#E5E7EB]"
                      >
                        <option value="T-Shirts">T-Shirts</option>
                        <option value="Polo T-Shirts">Polo T-Shirts</option>
                        <option value="Shirts">Shirts</option>
                        <option value="Jeans">Jeans</option>
                        <option value="Trousers">Trousers</option>
                        <option value="Shorts">Shorts</option>
                        <option value="Hoodies">Hoodies</option>
                        <option value="Jackets">Jackets</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Fit</label>
                      <select
                        value={newProductForm.fit}
                        onChange={(e) =>
                          setNewProductForm({ ...newProductForm, fit: e.target.value })
                        }
                        className="w-full h-9 px-3 rounded-xl bg-white border border-[#E5E7EB]"
                      >
                        <option value="Regular Fit">Regular Fit</option>
                        <option value="Slim Fit">Slim Fit</option>
                        <option value="Relaxed Fit">Relaxed Fit</option>
                        <option value="Oversized Fit">Oversized Fit</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-semibold block mb-1">Fabric</label>
                      <input
                        type="text"
                        value={newProductForm.fabric}
                        onChange={(e) =>
                          setNewProductForm({ ...newProductForm, fabric: e.target.value })
                        }
                        placeholder="100% Combed Cotton"
                        className="w-full h-9 px-3 rounded-xl bg-white border border-[#E5E7EB]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="font-semibold block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProductForm.description}
                  onChange={(e) =>
                    setNewProductForm({ ...newProductForm, description: e.target.value })
                  }
                  className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                />
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#E5E7EB] hover:bg-[#F5F5F7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#0071E3] text-white font-semibold hover:bg-[#0066CC]"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* MODAL 2: VARIANT STOCK MANAGEMENT MODAL */}
      {/* -------------------------------------------------------- */}
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

      {/* -------------------------------------------------------- */}
      {/* MODAL 3: ASSIGN PRODUCTS TO COLLECTION MODAL */}
      {/* -------------------------------------------------------- */}
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
                          onChange={() =>
                            handleToggleProductInCollection(p.id, assigningCollection.slug)
                          }
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

      {/* -------------------------------------------------------- */}
      {/* MODAL 4: CREATE COLLECTION MODAL */}
      {/* -------------------------------------------------------- */}
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

            <form onSubmit={handleCreateCollection} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1">Collection Title</label>
                <input
                  type="text"
                  required
                  value={newCollectionForm.title}
                  onChange={(e) =>
                    setNewCollectionForm({ ...newCollectionForm, title: e.target.value })
                  }
                  placeholder="e.g. Minimalist Court Icons"
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
                  placeholder="e.g. New Drop"
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
                  placeholder="Curated selection of classic leather and court silhouettes."
                  className="w-full p-3 rounded-xl bg-[#F5F5F7] border border-[#E5E7EB]"
                />
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
    </div>
  );
}

