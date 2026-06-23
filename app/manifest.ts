import type { MetadataRoute } from "next";
import { siteSettings } from "@/lib/content/settings";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSettings.title,
    short_name: siteSettings.name,
    description: siteSettings.description,
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
