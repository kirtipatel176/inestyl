export interface OrbitProductItem {
  id: string;
  title: string;
  slug: string;
  brand: string;
  department: "footwear" | "clothing" | string;
  subcategory?: string;
  mrp: number;
  outletPrice: number;
  discount: number;
  imageUrl: string;
  cutoutUrl?: string;
  aspectRatio?: number;
  scaleFactor?: number;
  isTransparent?: boolean;
}

export interface OrbitConfig {
  radiusX: number; // Horizontal orbit radius (pixels)
  radiusZ: number; // Depth orbit radius (pixels)
  radiusY: number; // Vertical tilt displacement
  perspective: number; // Camera focal length / perspective distance
  speed: number; // Base angular velocity (rad/s)
  baseScale: number; // Overall product cutout scale
  tiltAngle: number; // Pitch angle in degrees
  autoRotate: boolean;
}

export interface ProductOrbitHeroProps {
  products?: OrbitProductItem[];
  config?: Partial<OrbitConfig>;
}
