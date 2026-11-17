import { SupabaseClient } from "@supabase/supabase-js";
import {
  Brand,
  CollectionItem,
  CategoryItem,
  BannerItem,
  HomepageSectionConfig,
  NavigationConfig,
  SizeGuideTable,
} from "@inestyle/shared-types";
import { getActiveBrands, getBrandBySlug } from "../queries/brands";
import { getActiveCollections, getCollectionBySlug } from "../queries/collections";
import { getCategories } from "../queries/categories";
import { getHeroBanners, getHomepageSections } from "../queries/homepage";
import { getNavigationTree } from "../queries/navigation";
import { getSizeGuides } from "../queries/sizeGuides";
import { updateHomepageSectionsMutation } from "../mutations/homepage";

export class CmsRepository {
  constructor(private client: SupabaseClient) {}

  async getBrands(): Promise<Brand[]> {
    return getActiveBrands(this.client);
  }

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    return getBrandBySlug(this.client, slug);
  }

  async getCollections(): Promise<CollectionItem[]> {
    return getActiveCollections(this.client);
  }

  async getCollectionBySlug(slug: string): Promise<CollectionItem | null> {
    return getCollectionBySlug(this.client, slug);
  }

  async getCategories(department?: "footwear" | "clothing"): Promise<CategoryItem[]> {
    return getCategories(this.client, department);
  }

  async getHeroBanners(): Promise<BannerItem[]> {
    return getHeroBanners(this.client);
  }

  async getHomepageSections(): Promise<HomepageSectionConfig[]> {
    return getHomepageSections(this.client);
  }

  async updateHomepageSections(sections: HomepageSectionConfig[]) {
    return updateHomepageSectionsMutation(this.client, sections);
  }

  async getNavigation(): Promise<NavigationConfig | null> {
    return getNavigationTree(this.client);
  }

  async getSizeGuides(): Promise<Record<string, SizeGuideTable>> {
    return getSizeGuides(this.client);
  }
}
