import React from "react";

interface ProductOrbitRingProps {
  radiusX?: number;
  radiusZ?: number;
}

/**
 * INESTYLE OUTLET — Minimalist Apple-Inspired Exhibition Platform (Stationary)
 *
 * Features:
 * - Large circular/elliptical white platform with premium light-grey detailing
 * - Multiple subtle concentric architectural rings
 * - Diffuse ambient floor contact shadow
 * - Foreground featured product contact shadow
 * - Completely stationary exhibition stage (no neon, no gaming effects)
 */
export function ProductOrbitRing({
  radiusX = 330,
  radiusZ = 165,
}: ProductOrbitRingProps) {
  const platformWidth = Math.round(radiusX * 1.85);
  const platformHeight = Math.round(radiusZ * 1.52);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none flex items-center justify-center">
      {/* 1. Stationary Exhibition Circular Stage */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          width: `${platformWidth}px`,
          height: `${platformHeight}px`,
          transform: "translate(-50%, 60px)",
        }}
      >
        {/* Soft Natural Ground Contact Shadow */}
        <div
          className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 rounded-[50%] blur-[32px] opacity-20 pointer-events-none"
          style={{
            width: `${platformWidth * 0.94}px`,
            height: `${platformHeight * 0.62}px`,
            background:
              "radial-gradient(ellipse at center, rgba(15,20,30,0.85) 0%, rgba(30,35,45,0.25) 55%, transparent 80%)",
          }}
        />

        {/* Architectural Cylinder Edge / Depth Thickness */}
        <div
          className="absolute bottom-[-8px] left-1/2 -translate-x-1/2 rounded-[50%]"
          style={{
            width: `${platformWidth * 0.96}px`,
            height: `${platformHeight * 0.74}px`,
            background: "linear-gradient(to bottom, #DCDCE2 0%, #C6C6CE 100%)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.06)",
          }}
        />

        {/* Main Exhibition Turntable Surface (Matte White Lacquer & Concentric Rings) */}
        <div
          className="absolute inset-0 rounded-[50%] overflow-hidden border border-[#FFFFFF]/90"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, #F6F6F9 50%, #ECECF0 100%)",
            boxShadow:
              "inset 0 2px 4px rgba(255,255,255,0.95), inset 0 -3px 8px rgba(0,0,0,0.04), 0 12px 36px rgba(0,0,0,0.04)",
          }}
        >
          {/* Concentric Architectural Rings */}
          <div className="absolute inset-[6%] rounded-[50%] border border-[#1D1D1F]/[0.05] pointer-events-none" />
          <div className="absolute inset-[15%] rounded-[50%] border border-[#1D1D1F]/[0.04] pointer-events-none" />
          <div className="absolute inset-[28%] rounded-[50%] border border-dashed border-[#1D1D1F]/[0.03] pointer-events-none" />
          <div className="absolute inset-[44%] rounded-[50%] border border-[#1D1D1F]/[0.035] pointer-events-none" />

          {/* Center Gallery Spotlight Reflection */}
          <div
            className="absolute top-[12%] left-[20%] w-[60%] h-[40%] rounded-[50%] blur-[16px] opacity-75 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.98) 0%, transparent 80%)",
            }}
          />
        </div>

        {/* Foreground Featured Product Landing Contact Shadow */}
        <div
          className="absolute top-[60%] left-1/2 -translate-x-1/2 w-[240px] h-[48px] rounded-[50%] blur-[10px] opacity-30 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(12,15,22,0.9) 0%, rgba(22,28,38,0.3) 50%, transparent 80%)",
          }}
        />
      </div>
    </div>
  );
}
