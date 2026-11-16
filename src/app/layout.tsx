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
