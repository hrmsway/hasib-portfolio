import { renderOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Selected work — Hasib Ahmad Bhuyan";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "hasib.tech / work",
    title: "Systems that earn their keep in production.",
  });
}
