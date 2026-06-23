import { renderOgImage, OG_SIZE } from "@/lib/og";
import { getAllPosts, getPostBySlug } from "@/lib/content/blog";
import { ACCENT_HEX } from "@/lib/accents";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Article — Hasib Ahmad Bhuyan";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return renderOgImage({
    eyebrow: "hasib.tech / writing",
    title: post?.title ?? "Writing",
    accent: post ? ACCENT_HEX[post.accent] : undefined,
  });
}
