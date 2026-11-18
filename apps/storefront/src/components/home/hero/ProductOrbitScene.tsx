"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Pause, Play, Sparkles } from "lucide-react";
import { OrbitProductItem, OrbitConfig } from "./types";
import { OrbitProduct } from "./OrbitProduct";
import { ProductOrbitRing } from "./ProductOrbitRing";
import { ProductOrbitFallback } from "./ProductOrbitFallback";

interface ProductOrbitSceneProps {
  products: OrbitProductItem[];
  config?: Partial<OrbitConfig>;
}

const DEFAULT_CONFIG: OrbitConfig = {
  radiusX: 380,
  radiusZ: 175,
  radiusY: 28,
  perspective: 1050,
  speed: 0.20, // radians per second (~31s per complete revolution)
  baseScale: 1.0,
  tiltAngle: 12,
  autoRotate: true,
};

// Five-product exact pentagonal angular offsets relative to front-centre
// Product 1: front-centre (0 rad)
// Product 2: left-front (-72 deg = -1.2566 rad)
// Product 3: right-front (+72 deg = +1.2566 rad)
// Product 4: left-rear (-144 deg = -2.5133 rad)
// Product 5: right-rear (+144 deg = +2.5133 rad)
const PENTAGON_OFFSETS = [
  0,
  -(72 * Math.PI) / 180,
  (72 * Math.PI) / 180,
  -(144 * Math.PI) / 180,
  (144 * Math.PI) / 180,
];

export function ProductOrbitScene({ products, config }: ProductOrbitSceneProps) {
  const settings: OrbitConfig = { ...DEFAULT_CONFIG, ...config };

  // Only use exactly five products for the Apple-inspired 5-product showcase
  const showcaseProducts = products.slice(0, 5);

  const containerRef = useRef<HTMLDivElement>(null);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);

  // High-performance animation state stored in mutable refs (0 React re-renders during 60-120fps loop)
  const angleRef = useRef(0);
  const targetAngleRef = useRef<number | null>(null);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);

  // Dynamic container-relative orbit radii
  const [radii, setRadii] = useState({
    radiusX: settings.radiusX,
    radiusZ: settings.radiusZ,
    radiusY: settings.radiusY,
  });

  // Active featured product (frontmost focal point)
  const [activeProductIndex, setActiveProductIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Responsive stage sizing relative to full hero container
  useEffect(() => {
    if (!containerRef.current) return;

    const updateDimensions = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      if (width < 640) {
        // Mobile layout: compact orbit with safe margins
        setRadii({
          radiusX: Math.max(140, Math.min(width * 0.36, 185)),
          radiusZ: Math.max(75, Math.min(height * 0.18, 100)),
          radiusY: 16,
        });
      } else if (width < 1024) {
        // Tablet layout
        setRadii({
          radiusX: Math.max(240, Math.min(width * 0.34, 310)),
          radiusZ: Math.max(110, Math.min(height * 0.20, 140)),
          radiusY: 22,
        });
      } else {
        // Desktop full-centre showcase: balanced proportions
        setRadii({
          radiusX: Math.max(340, Math.min(width * 0.30, 420)),
          radiusZ: Math.max(150, Math.min(height * 0.22, 185)),
          radiusY: settings.radiusY,
        });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [settings.radiusY]);

  // Main 3D Pentagonal Orbit Delta-Time Animation Loop
  useEffect(() => {
    if (reducedMotion || showcaseProducts.length === 0) return;

    let lastActiveIdx = -1;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // 1. Angular Movement Updates
      if (targetAngleRef.current !== null) {
        // Smoothly ease towards selected product target angle
        const diff = targetAngleRef.current - angleRef.current;
        if (Math.abs(diff) < 0.002) {
          angleRef.current = targetAngleRef.current;
          targetAngleRef.current = null;
        } else {
          angleRef.current += diff * Math.min(dt * 7, 0.22);
        }
      } else if (isDraggingRef.current) {
        // Direct touch / drag control
      } else if (Math.abs(velocityRef.current) > 0.001) {
        // Momentum coasting after pointer release
        angleRef.current += velocityRef.current * dt * 60;
        velocityRef.current *= 0.94;
      } else if (!isPaused && settings.autoRotate) {
        // Continuous serene rotation (slows down when user hovers)
        const currentSpeed = isHoveredRef.current
          ? settings.speed * 0.2
          : settings.speed;
        angleRef.current += currentSpeed * dt;
      }

      const currentAngle = angleRef.current;
      const count = showcaseProducts.length;

      let frontmostIndex = 0;
      let maxZ = -Infinity;

      // 2. Compute 3D Coordinates & Perspective Projection
      for (let i = 0; i < count; i++) {
        const el = productRefs.current[i];
        if (!el) continue;

        const product = showcaseProducts[i];
        const offset = PENTAGON_OFFSETS[i] ?? (i * 2 * Math.PI) / count;

        // Angular position along circular orbit
        const theta = currentAngle + offset;

        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        // 3D coordinates relative to stage center:
        // theta = 0 puts product at foreground focal center (X = 0, Z = +radiusZ, Y = 0)
        const worldX = radii.radiusX * sinTheta;
        const worldZ = radii.radiusZ * cosTheta;
        // Natural stage pitch: rear products (cosTheta < 0) curve upward (negative Y)
        const worldY = radii.radiusY * cosTheta - radii.radiusY;

        // Track frontmost product (closest to camera = max worldZ)
        if (worldZ > maxZ) {
          maxZ = worldZ;
          frontmostIndex = i;
        }

        // Perspective Camera Projection
        const D = settings.perspective;
        const depthFactor = D / (D - worldZ);

        // Projected 2D screen coordinates
        const screenX = worldX * depthFactor;
        const screenY = worldY * depthFactor;

        // Per-product normalized scale factor combined with optical depth scale
        const itemScaleFactor = product.scaleFactor || 1.0;
        const scale =
          settings.baseScale * itemScaleFactor * Math.pow(depthFactor, 1.35);

        // Subtle 3D banking / tangent rotation
        const rotateY = -14 * sinTheta;
        const rotateZ = -3 * sinTheta;

        // Depth-based Opacity & Layering
        const tau = Math.max(
          0,
          Math.min(1, (worldZ + radii.radiusZ) / (2 * radii.radiusZ))
        );
        const opacity = 0.60 + 0.40 * tau;

        // Stacking order: foreground always on top
        const zIndex = Math.round(worldZ + radii.radiusZ + 20);

        // Apply hardware-accelerated transform with pivot fixed at visual center
        el.style.transform = `translate(-50%, -50%) translate3d(${screenX.toFixed(
          2
        )}px, ${screenY.toFixed(2)}px, 0px) scale(${scale.toFixed(
          3
        )}) rotateY(${rotateY.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg)`;
        el.style.zIndex = zIndex.toString();
        el.style.opacity = opacity.toFixed(3);

        // Optical depth-of-field blur for far-rear products
        if (tau < 0.20) {
          el.style.filter = "blur(0.5px)";
        } else {
          el.style.filter = "none";
        }
      }

      // Update active product state when front focal point changes
      if (frontmostIndex !== lastActiveIdx) {
        lastActiveIdx = frontmostIndex;
        setActiveProductIndex(frontmostIndex);
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [radii, showcaseProducts, isPaused, reducedMotion, settings]);

  // Tactile pointer interactions (drag / swipe orbit)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerXRef.current = e.clientX;
    velocityRef.current = 0;
    targetAngleRef.current = null;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;

    // Convert pixel delta to angular rotation
    const angleDelta = (deltaX / radii.radiusX) * 0.85;
    angleRef.current -= angleDelta;
    velocityRef.current = -angleDelta * 0.42;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  // Click any orbit product to smoothly rotate it to the front focal point
  const handleProductClick = useCallback(
    (index: number) => {
      const offset = PENTAGON_OFFSETS[index] ?? 0;
      const current = angleRef.current;
      const targetBase = -offset;

      const twoPi = 2 * Math.PI;
      const diff =
        (((targetBase - current) % twoPi) + twoPi * 1.5) % twoPi - Math.PI;
      targetAngleRef.current = current + diff;
    },
    []
  );

  if (reducedMotion) {
    return <ProductOrbitFallback products={showcaseProducts} />;
  }

  const activeProduct = showcaseProducts[activeProductIndex] || showcaseProducts[0];

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
      className="relative w-full h-[560px] sm:h-[640px] lg:h-[720px] xl:h-[760px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-visible"
      aria-label="Apple-Inspired 3D Circular Product Installation"
    >
      {/* 1. Stationary Minimalist Exhibition Platform (Centered) */}
      <ProductOrbitRing radiusX={radii.radiusX} radiusZ={radii.radiusZ} />

      {/* 2. Five Orbiting 3D Products Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        {showcaseProducts.map((product, idx) => (
          <OrbitProduct
            key={product.id || idx}
            ref={(el) => {
              productRefs.current[idx] = el;
            }}
            product={product}
            index={idx}
            isFeatured={idx === activeProductIndex}
            onClick={() => handleProductClick(idx)}
          />
        ))}
      </div>

      {/* 3. Featured Product Information HUD (Fixed Horizontally Centered Beneath Stage) */}
      {activeProduct && (
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <div className="bg-white/90 hover:bg-white backdrop-blur-md px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-lg border border-[#E5E7EB] flex items-center gap-4 sm:gap-6 transition-all duration-300">
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-[#0071E3] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#0071E3]" />
                {activeProduct.brand}
              </span>
              <span className="h-3 w-[1px] bg-[#E5E7EB]" />
              <span className="text-xs sm:text-sm font-semibold text-[#1D1D1F] max-w-[150px] sm:max-w-[220px] truncate">
                {activeProduct.title}
              </span>
              <span className="h-3 w-[1px] bg-[#E5E7EB]" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-[#1D1D1F]">
                  ₹{activeProduct.outletPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-[#86868B] line-through hidden sm:inline">
                  ₹{activeProduct.mrp.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <Link
              href={`/products/${activeProduct.slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#1D1D1F] text-white text-[11px] sm:text-xs font-semibold hover:bg-black transition-colors shadow-xs active:scale-95 flex-shrink-0"
            >
              <span>View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* 4. Controls: Pause/Play & Orbit Hint (Bottom-Left) */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 z-30 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          aria-label={
            isPaused
              ? "Resume product orbit rotation"
              : "Pause product orbit rotation"
          }
          className="w-8 h-8 rounded-full bg-white/85 hover:bg-white border border-[#E5E7EB] flex items-center justify-center text-[#1D1D1F] shadow-xs hover:shadow-md transition-all active:scale-95"
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5 ml-0.5" />
          ) : (
            <Pause className="w-3.5 h-3.5" />
          )}
        </button>

        <span className="hidden md:inline-block text-[11px] font-medium text-[#86868B] bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-full border border-black/5">
          Drag to rotate • Click to focus
        </span>
      </div>

      {/* 5. Five Pentagonal Jump Indicators (Top-Right) */}
      <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8 z-30 flex items-center gap-1.5 pointer-events-auto">
        {showcaseProducts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleProductClick(idx)}
            aria-label={`Focus showcase product ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === activeProductIndex
                ? "w-4 h-1.5 bg-[#0071E3]"
                : "w-1.5 h-1.5 bg-[#1D1D1F]/20 hover:bg-[#1D1D1F]/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
