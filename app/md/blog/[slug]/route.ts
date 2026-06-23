import { getAllPosts, getPostBySlug } from "@/lib/content/blog";
import { postToMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/content/settings";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(postToMarkdown(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Link: `<${SITE_URL}/blog/${post.slug}>; rel="canonical"`,
    },
  });
}
