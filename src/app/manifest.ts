import type { MetadataRoute } from "next";
import { appName } from "@/lib/app-config";
import { brandDefaultIconUrl, brandPwaIcon192Url, brandPwaIcon512Url } from "@/lib/brand-assets";

export const dynamic = "force-static";

const pwaIconUrl = brandPwaIcon512Url || brandDefaultIconUrl;
const pwaIconSize = brandPwaIcon512Url ? "512x512" : "1024x1024";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appName,
    short_name: appName,
    description: "Unlimited movies and TV shows for free. Inspired by Prime Video.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "any",
    scope: "/",
    icons: [
      ...(brandPwaIcon192Url
        ? [{ src: brandPwaIcon192Url, sizes: "192x192", purpose: "any" as const }]
        : []),
      ...(brandPwaIcon512Url
        ? [{ src: brandPwaIcon512Url, sizes: "512x512", purpose: "any" as const }]
        : []),
      {
        src: pwaIconUrl,
        sizes: pwaIconSize,
        purpose: "any",
      },
      {
        src: pwaIconUrl,
        sizes: pwaIconSize,
        purpose: "maskable",
      },
    ],
  };
}
