import { Suspense } from "react";
import type { Metadata } from "next";
import { StorefrontShell } from "@/components/layout/StorefrontShell";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { NetworkStatusProvider } from "@/components/providers/NetworkStatusProvider";
import { RouteProgressLoader } from "@/components/ui/RouteProgressLoader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://inestyl.com"),
  title: "iNESTYL OUTLET — Premium Multi-Brand Footwear & Apparel Outlet",
  description:
    "Original Brands. Outlet Prices. Premium Experience. 100% authentic footwear (Nike, Puma, adidas, HOKA) and apparel (Levi's, DIESEL, U.S. Polo Assn.) at our Kapadwanj, Gujarat flagship store.",
  icons: {
    icon: "/brand/favicon.svg",
    apple: "/brand/favicon-180x180.png",
  },
  openGraph: {
    title: "iNESTYL OUTLET — Original Brands. Outlet Prices.",
    description: "Multi-brand footwear & apparel outlet in Kapadwanj, Gujarat. Explore verified authentic stock.",
    url: "https://inestyl.com",
    siteName: "iNESTYL OUTLET",
    images: [
      {
        url: "/brand/logo-primary-stacked.png",
        width: 1460,
        height: 500,
        alt: "iNESTYL OUTLET",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Cloudinary Edge CDN for sub-50ms connection establishment */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Responsive LCP Image Preload for sub-200ms hero visual load */}
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto,c_fill,w_1600,h_900/inestyle-outlet/homepage/desktop/hero-lifestyle-composite"
          media="(min-width: 640px)"
          // @ts-expect-error fetchPriority supported by modern Chromium/Safari/Firefox
          fetchpriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/egjn8ayb/image/upload/f_auto,q_auto,c_fill,w_750,h_1000/inestyle-outlet/homepage/mobile/hero-mobile"
          media="(max-width: 639px)"
          // @ts-expect-error fetchPriority supported by modern Chromium/Safari/Firefox
          fetchpriority="high"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#1D1D1F] antialiased">
        <NetworkStatusProvider>
          <Suspense fallback={null}>
            <RouteProgressLoader />
          </Suspense>
          <SmoothScrollProvider>
            <StorefrontShell>{children}</StorefrontShell>
          </SmoothScrollProvider>
        </NetworkStatusProvider>
      </body>
    </html>
  );
}
