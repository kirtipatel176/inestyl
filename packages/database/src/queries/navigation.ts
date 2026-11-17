import { SupabaseClient } from "@supabase/supabase-js";
import { NavigationConfig, NavigationLink, MegaMenuSection } from "@inestyle/shared-types";

export async function getNavigationTree(client: SupabaseClient): Promise<NavigationConfig | null> {
  const { data, error } = await client
    .from("navigation_items")
    .select("*")
    .eq("is_visible", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) {
    return null;
  }

  const header: NavigationLink[] = [];
  const footwearMegaMenu: MegaMenuSection[] = [];
  const clothingMegaMenu: MegaMenuSection[] = [];
  const menMegaMenu: MegaMenuSection[] = [];
  const womenMegaMenu: MegaMenuSection[] = [];
  const collections: NavigationLink[] = [];
  const brands: NavigationLink[] = [];
  const footerMap: Record<string, { id: string; title: string; links: NavigationLink[]; visible: boolean; order: number }> = {};

  data.forEach((item: any) => {
    const link: NavigationLink = {
      id: item.id,
      label: item.label,
      href: item.href,
      badge: item.badge || undefined,
      visible: item.is_visible,
      order: item.sort_order,
    };

    if (item.tree_key === "header") {
      header.push(link);
    } else if (item.tree_key === "collections") {
      collections.push(link);
    } else if (item.tree_key === "brands") {
      brands.push(link);
    } else if (item.tree_key === "footwearMegaMenu") {
      const secTitle = item.metadata?.sectionTitle || "Categories";
      let sec = footwearMegaMenu.find((s) => s.title === secTitle);
      if (!sec) {
        sec = {
          id: `fw-${secTitle.toLowerCase()}`,
          title: secTitle,
          links: [],
          visible: true,
          order: footwearMegaMenu.length + 1,
        };
        footwearMegaMenu.push(sec);
      }
      sec.links.push(link);
    } else if (item.tree_key === "clothingMegaMenu") {
      const secTitle = item.metadata?.sectionTitle || "Categories";
      let sec = clothingMegaMenu.find((s) => s.title === secTitle);
      if (!sec) {
        sec = {
          id: `cl-${secTitle.toLowerCase()}`,
          title: secTitle,
          links: [],
          visible: true,
          order: clothingMegaMenu.length + 1,
        };
        clothingMegaMenu.push(sec);
      }
      sec.links.push(link);
    } else if (item.tree_key === "menMegaMenu") {
      const secTitle = item.metadata?.sectionTitle || "Featured";
      let sec = menMegaMenu.find((s) => s.title === secTitle);
      if (!sec) {
        sec = {
          id: `men-${secTitle.toLowerCase()}`,
          title: secTitle,
          links: [],
          visible: true,
          order: menMegaMenu.length + 1,
        };
        menMegaMenu.push(sec);
      }
      sec.links.push(link);
    } else if (item.tree_key === "womenMegaMenu") {
      const secTitle = item.metadata?.sectionTitle || "Featured";
      let sec = womenMegaMenu.find((s) => s.title === secTitle);
      if (!sec) {
        sec = {
          id: `wom-${secTitle.toLowerCase()}`,
          title: secTitle,
          links: [],
          visible: true,
          order: womenMegaMenu.length + 1,
        };
        womenMegaMenu.push(sec);
      }
      sec.links.push(link);
    } else if (item.tree_key.startsWith("footer-")) {
      const colKey = item.tree_key.replace("footer-", "");
      if (!footerMap[colKey]) {
        footerMap[colKey] = {
          id: `footer-sec-${colKey}`,
          title: colKey.charAt(0).toUpperCase() + colKey.slice(1),
          links: [],
          visible: true,
          order: Object.keys(footerMap).length + 1,
        };
      }
      footerMap[colKey].links.push(link);
    }
  });

  return {
    header,
    footwearMegaMenu,
    clothingMegaMenu,
    menMegaMenu,
    womenMegaMenu,
    collections,
    brands,
    footer: Object.values(footerMap),
  };
}
