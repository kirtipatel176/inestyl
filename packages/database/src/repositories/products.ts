import { SupabaseClient } from "@supabase/supabase-js";
import { Product } from "@inestyle/shared-types";
import { ProductQueryFilters, PaginatedResult } from "../types";
import {
  getPublishedProducts,
  getProductBySlug,
  getProductById,
  getRelatedProducts,
} from "../queries/products";
import {
  createProductMutation,
  updateProductMutation,
  deleteProductMutation,
} from "../mutations/products";

export class ProductRepository {
  constructor(private client: SupabaseClient) {}

  async getProducts(filters: ProductQueryFilters = {}): Promise<PaginatedResult<Product>> {
    return getPublishedProducts(this.client, filters);
  }

  async getProductBySlug(slug: string, publishedOnly = true): Promise<Product | null> {
    return getProductBySlug(this.client, slug, publishedOnly);
  }

  async getProductById(id: string, publishedOnly = false): Promise<Product | null> {
    return getProductById(this.client, id, publishedOnly);
  }

  async getRelatedProducts(currentProductId: string, department: string, brandSlug: string, limit = 4): Promise<Product[]> {
    return getRelatedProducts(this.client, currentProductId, department, brandSlug, limit);
  }

  async createProduct(rawInput: any) {
    return createProductMutation(this.client, rawInput);
  }

  async updateProduct(id: string, rawInput: any) {
    return updateProductMutation(this.client, id, rawInput);
  }

  async deleteProduct(id: string) {
    return deleteProductMutation(this.client, id);
  }
}
