import { renderOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Hasib Ahmad Bhuyan — Backend Engineer & Tech Lead, Agentic AI";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "hasib.tech",
    title: "Agentic systems, engineered for production.",
  });
}
