"use client";

import { useState, useEffect } from "react";
import { X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FilterState } from "@/types/filters";
import { FilterAccordion } from "./FilterAccordion";
import { CategoryFilter } from "./CategoryFilter";
import { BrandFilter } from "./BrandFilter";
import { GenderFilter } from "./GenderFilter";
import { SizeFilter } from "./SizeFilter";
import { ColourFilter } from "./ColourFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AvailabilityFilter } from "./AvailabilityFilter";
import { ShoeTypeFilter } from "./ShoeTypeFilter";
import { FitFilter, SleeveFilter, FabricFilter } from "./ClothingSpecFilter";
import { CollectionFilter } from "./CollectionFilter";
import { DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE } from "@/hooks/useProductFilters";

interface MobileFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: FilterState;
  onApplyFilters: (state: FilterState) => void;
  onClearAll: () => void;
  getPreviewCount: (draft: FilterState) => number;
  department?: "footwear" | "clothing" | "all";
  isCollectionPage?: boolean;
}

export function MobileFilterSheet({
  isOpen,
  onClose,
  activeFilters,
  onApplyFilters,
  onClearAll,
  getPreviewCount,
  department = "all",
  isCollectionPage = false,
}: MobileFilterSheetProps) {
  // Local draft state so user can configure filters and press "Show X Products"
  const [draft, setDraft] = useState<FilterState>(activeFilters);
  const [openSection, setOpenSection] = useState<string | null>(
    department === "footwear" ? "shoeType" : "category"
  );

  // Keep draft in sync when sheet opens
  useEffect(() => {
    if (isOpen) {
      setDraft(activeFilters);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, activeFilters]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const toggleSection = (id: string) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  // Draft Toggle Handlers
  const handleToggleCategory = (cat: string) => {
    setDraft((prev) => ({
      ...prev,
      categories: prev.categories.some((c) => c.toLowerCase() === cat.toLowerCase())
        ? prev.categories.filter((c) => c.toLowerCase() !== cat.toLowerCase())
        : [...prev.categories, cat],
    }));
  };

  const handleToggleShoeType = (st: string) => {
    setDraft((prev) => {
      const arr = prev.shoeTypes ?? [];
      return {
        ...prev,
        shoeTypes: arr.some((s) => s.toLowerCase() === st.toLowerCase())
          ? arr.filter((s) => s.toLowerCase() !== st.toLowerCase())
          : [...arr, st],
      };
    });
  };

  const handleToggleBrand = (brand: string) => {
    setDraft((prev) => ({
      ...prev,
      brands: prev.brands.some((b) => b.toLowerCase() === brand.toLowerCase())
        ? prev.brands.filter((b) => b.toLowerCase() !== brand.toLowerCase())
        : [...prev.brands, brand],
    }));
  };

  const handleToggleGender = (gender: string) => {
    setDraft((prev) => ({
      ...prev,
      genders: prev.genders.some((g) => g.toLowerCase() === gender.toLowerCase())
        ? prev.genders.filter((g) => g.toLowerCase() !== gender.toLowerCase())
        : [...prev.genders, gender],
    }));
  };

  const handleToggleSize = (size: string) => {
    setDraft((prev) => ({
      ...prev,
      sizes: prev.sizes.some((s) => s.toLowerCase() === size.toLowerCase())
        ? prev.sizes.filter((s) => s.toLowerCase() !== size.toLowerCase())
        : [...prev.sizes, size],
    }));
  };

  const handleToggleColour = (colour: string) => {
    setDraft((prev) => ({
      ...prev,
      colours: prev.colours.some((c) => c.toLowerCase() === colour.toLowerCase())
        ? prev.colours.filter((c) => c.toLowerCase() !== colour.toLowerCase())
        : [...prev.colours, colour],
    }));
  };

  const handleToggleFit = (fit: string) => {
    setDraft((prev) => {
      const arr = prev.fits ?? [];
      return {
        ...prev,
        fits: arr.some((f) => f.toLowerCase() === fit.toLowerCase())
          ? arr.filter((f) => f.toLowerCase() !== fit.toLowerCase())
          : [...arr, fit],
      };
    });
  };

  const handleToggleSleeve = (sleeve: string) => {
    setDraft((prev) => {
      const arr = prev.sleeves ?? [];
      return {
        ...prev,
        sleeves: arr.some((s) => s.toLowerCase() === sleeve.toLowerCase())
          ? arr.filter((s) => s.toLowerCase() !== sleeve.toLowerCase())
          : [...arr, sleeve],
      };
    });
  };

  const handleToggleFabric = (fabric: string) => {
    setDraft((prev) => {
      const arr = prev.fabrics ?? [];
      return {
        ...prev,
        fabrics: arr.some((f) => f.toLowerCase() === fabric.toLowerCase())
          ? arr.filter((f) => f.toLowerCase() !== fabric.toLowerCase())
          : [...arr, fabric],
      };
    });
  };

  const handleToggleCollection = (col: string) => {
    setDraft((prev) => {
      const arr = prev.collections ?? [];
      return {
        ...prev,
        collections: arr.some((c) => c.toLowerCase() === col.toLowerCase())
          ? arr.filter((c) => c.toLowerCase() !== col.toLowerCase())
          : [...arr, col],
      };
    });
  };

  const handleToggleAvailability = (status: string) => {
    setDraft((prev) => ({
      ...prev,
      availability: prev.availability.some((a) => a.toLowerCase() === status.toLowerCase())
        ? prev.availability.filter((a) => a.toLowerCase() !== status.toLowerCase())
        : [...prev.availability, status],
    }));
  };

  const handlePriceChange = (min: number | null, max: number | null) => {
    setDraft((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
    }));
  };

  const handleResetDraft = () => {
    const cleared: FilterState = {
      categories: [],
      brands: [],
      genders: [],
      sizes: [],
      colours: [],
      minPrice: null,
      maxPrice: null,
      availability: [],
      collections: [],
      shoeTypes: [],
      clothingCategories: [],
      fits: [],
      sleeves: [],
      fabrics: [],
      sortBy: activeFilters.sortBy,
    };
    setDraft(cleared);
    onClearAll();
  };

  const handleApply = () => {
    onApplyFilters(draft);
    onClose();
  };

  const matchingCount = getPreviewCount(draft);

  const draftCount =
    (draft.categories?.length || 0) +
    (draft.shoeTypes?.length || 0) +
    (draft.clothingCategories?.length || 0) +
    (draft.brands?.length || 0) +
    (draft.genders?.length || 0) +
    (draft.sizes?.length || 0) +
    (draft.colours?.length || 0) +
    (draft.fits?.length || 0) +
    (draft.sleeves?.length || 0) +
    (draft.fabrics?.length || 0) +
    (draft.collections?.length || 0) +
    (draft.availability?.length || 0) +
    (draft.minPrice !== null || draft.maxPrice !== null ? 1 : 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center lg:hidden">
          {/* Backdrop with subtle dimming */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          {/* Bottom Sheet Modal Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#FFFFFF] rounded-t-3xl sm:rounded-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col shadow-2xl z-10 overflow-hidden"
          >
            {/* 1. Header (Sticky) */}
            <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#FFFFFF] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#0071E3]" />
                <h2 className="font-heading text-base font-semibold text-[#1D1D1F]">
                  Filters
                </h2>
                {draftCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#0071E3] text-white text-[10px] font-bold flex items-center justify-center">
                    {draftCount}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close filter sheet"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2. Scrollable Filter Sections Accordions */}
            <div className="p-6 overflow-y-auto space-y-1 flex-1 overscroll-contain">
              {/* Category (if general or clothing) */}
              {department !== "footwear" && (
                <FilterAccordion
                  title="Category"
                  isOpen={openSection === "category"}
                  onToggle={() => toggleSection("category")}
                  badgeCount={draft.categories.length}
                  selectedSummary={draft.categories.join(", ")}
                >
                  <CategoryFilter
                    selectedCategories={draft.categories}
                    onToggleCategory={handleToggleCategory}
                    onClear={() => setDraft((p) => ({ ...p, categories: [] }))}
                  />
                </FilterAccordion>
              )}

              {/* Shoe Type (if footwear) */}
              {department === "footwear" && (
                <FilterAccordion
                  title="Shoe Type"
                  isOpen={openSection === "shoeType"}
                  onToggle={() => toggleSection("shoeType")}
                  badgeCount={draft.shoeTypes?.length || 0}
                  selectedSummary={(draft.shoeTypes ?? []).join(", ")}
                >
                  <ShoeTypeFilter
                    selectedShoeTypes={draft.shoeTypes ?? []}
                    onToggleShoeType={handleToggleShoeType}
                    onClear={() => setDraft((p) => ({ ...p, shoeTypes: [] }))}
                  />
                </FilterAccordion>
              )}

              {/* Brand */}
              <FilterAccordion
                title="Brand"
                isOpen={openSection === "brand"}
                onToggle={() => toggleSection("brand")}
                badgeCount={draft.brands.length}
                selectedSummary={draft.brands.join(", ")}
              >
                <BrandFilter
                  selectedBrands={draft.brands}
                  onToggleBrand={handleToggleBrand}
                  onClear={() => setDraft((p) => ({ ...p, brands: [] }))}
                />
              </FilterAccordion>

              {/* Gender */}
              <FilterAccordion
                title="Gender"
                isOpen={openSection === "gender"}
                onToggle={() => toggleSection("gender")}
                badgeCount={draft.genders.length}
                selectedSummary={draft.genders.join(", ")}
              >
                <GenderFilter
                  selectedGenders={draft.genders}
                  onToggleGender={handleToggleGender}
                  onClear={() => setDraft((p) => ({ ...p, genders: [] }))}
                />
              </FilterAccordion>

              {/* Size */}
              <FilterAccordion
                title={department === "footwear" ? "UK Size" : "Size"}
                isOpen={openSection === "size"}
                onToggle={() => toggleSection("size")}
                badgeCount={draft.sizes.length}
                selectedSummary={draft.sizes.map((s) => (department === "footwear" ? `UK ${s}` : s)).join(", ")}
              >
                <SizeFilter
                  selectedSizes={draft.sizes}
                  selectedCategories={draft.categories}
                  onToggleSize={handleToggleSize}
                  onClear={() => setDraft((p) => ({ ...p, sizes: [] }))}
                />
              </FilterAccordion>

              {/* Colour */}
              <FilterAccordion
                title="Colour"
                isOpen={openSection === "colour"}
                onToggle={() => toggleSection("colour")}
                badgeCount={draft.colours.length}
                selectedSummary={draft.colours.join(", ")}
              >
                <ColourFilter
                  selectedColours={draft.colours}
                  onToggleColour={handleToggleColour}
                  onClear={() => setDraft((p) => ({ ...p, colours: [] }))}
                />
              </FilterAccordion>

              {/* Clothing-Specific Filters: Fit, Sleeve, Fabric */}
              {department === "clothing" && (
                <>
                  <FilterAccordion
                    title="Fit"
                    isOpen={openSection === "fit"}
                    onToggle={() => toggleSection("fit")}
                    badgeCount={draft.fits?.length || 0}
                    selectedSummary={(draft.fits ?? []).join(", ")}
                  >
                    <FitFilter
                      selectedFits={draft.fits ?? []}
                      onToggleFit={handleToggleFit}
                      onClear={() => setDraft((p) => ({ ...p, fits: [] }))}
                    />
                  </FilterAccordion>

                  <FilterAccordion
                    title="Sleeve Length"
                    isOpen={openSection === "sleeve"}
                    onToggle={() => toggleSection("sleeve")}
                    badgeCount={draft.sleeves?.length || 0}
                    selectedSummary={(draft.sleeves ?? []).join(", ")}
                  >
                    <SleeveFilter
                      selectedSleeves={draft.sleeves ?? []}
                      onToggleSleeve={handleToggleSleeve}
                      onClear={() => setDraft((p) => ({ ...p, sleeves: [] }))}
                    />
                  </FilterAccordion>

                  <FilterAccordion
                    title="Fabric"
                    isOpen={openSection === "fabric"}
                    onToggle={() => toggleSection("fabric")}
                    badgeCount={draft.fabrics?.length || 0}
                    selectedSummary={(draft.fabrics ?? []).join(", ")}
                  >
                    <FabricFilter
                      selectedFabrics={draft.fabrics ?? []}
                      onToggleFabric={handleToggleFabric}
                      onClear={() => setDraft((p) => ({ ...p, fabrics: [] }))}
                    />
                  </FilterAccordion>
                </>
              )}

              {/* Price */}
              <FilterAccordion
                title="Price Range"
                isOpen={openSection === "price"}
                onToggle={() => toggleSection("price")}
                badgeCount={draft.minPrice !== null || draft.maxPrice !== null ? 1 : 0}
                selectedSummary={
                  draft.minPrice !== null || draft.maxPrice !== null
                    ? `₹${(draft.minPrice ?? DEFAULT_MIN_PRICE).toLocaleString("en-IN")}–₹${(
                        draft.maxPrice ?? DEFAULT_MAX_PRICE
                      ).toLocaleString("en-IN")}`
                    : undefined
                }
              >
                <PriceRangeFilter
                  minPrice={draft.minPrice}
                  maxPrice={draft.maxPrice}
                  onPriceChange={handlePriceChange}
                  onClear={() => setDraft((p) => ({ ...p, minPrice: null, maxPrice: null }))}
                />
              </FilterAccordion>

              {/* Curated Collection (when not browsing a single collection) */}
              {!isCollectionPage && (
                <FilterAccordion
                  title="Collection"
                  isOpen={openSection === "collection"}
                  onToggle={() => toggleSection("collection")}
                  badgeCount={draft.collections?.length || 0}
                  selectedSummary={(draft.collections ?? []).join(", ")}
                >
                  <CollectionFilter
                    selectedCollections={draft.collections ?? []}
                    onToggleCollection={handleToggleCollection}
                    onClear={() => setDraft((p) => ({ ...p, collections: [] }))}
                  />
                </FilterAccordion>
              )}

              {/* Availability */}
              <FilterAccordion
                title="Availability"
                isOpen={openSection === "availability"}
                onToggle={() => toggleSection("availability")}
                badgeCount={draft.availability.length}
                selectedSummary={draft.availability.join(", ")}
              >
                <AvailabilityFilter
                  selectedAvailability={draft.availability}
                  onToggleAvailability={handleToggleAvailability}
                  onClear={() => setDraft((p) => ({ ...p, availability: [] }))}
                />
              </FilterAccordion>
            </div>

            {/* 3. Footer (Sticky at bottom while content scrolls) */}
            <div className="p-4 border-t border-[#E5E7EB] bg-[#FFFFFF] flex items-center gap-3 flex-shrink-0 shadow-lg">
              <button
                type="button"
                onClick={handleResetDraft}
                className="w-1/3 py-3 rounded-full border border-[#E5E7EB] text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#86868B]" />
                <span>Clear All</span>
              </button>

              {/* Dynamic matching result button */}
              <button
                type="button"
                onClick={handleApply}
                className="w-2/3 py-3 rounded-full bg-[#0071E3] text-white text-xs font-semibold hover:bg-[#0066CC] transition-all shadow-subtle active:scale-98"
              >
                Show {matchingCount} {matchingCount === 1 ? "Product" : "Products"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
