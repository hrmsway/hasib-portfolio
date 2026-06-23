import { renderOgImage, OG_SIZE } from "@/lib/og";
import { getAllWork, getWorkBySlug } from "@/lib/content/work";
import { ACCENT_HEX } from "@/lib/accents";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study — Hasib Ahmad Bhuyan";

export function generateStaticParams() {
  return getAllWork().map((entry) => ({ slug: entry.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  return renderOgImage({
    eyebrow: `hasib.tech / work / ${entry?.category ?? ""}`,
    title: entry?.title ?? "Work",
    accent: entry ? ACCENT_HEX[entry.accent] : undefined,
  });
}
