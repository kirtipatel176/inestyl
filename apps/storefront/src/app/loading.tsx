import { HomePageSkeleton } from "@/components/home/skeletons";

/**
 * Root storefront loading state.
 * Displays high-fidelity section-based skeletons matching the home page structure
 * instead of a generic product catalog grid.
 */
export default function RootLoading() {
  return <HomePageSkeleton />;
}
