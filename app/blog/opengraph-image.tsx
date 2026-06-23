import { renderOgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Writing — Hasib Ahmad Bhuyan";

export default function OgImage() {
  return renderOgImage({
    eyebrow: "hasib.tech / writing",
    title: "Notes from the agent trenches.",
  });
}
