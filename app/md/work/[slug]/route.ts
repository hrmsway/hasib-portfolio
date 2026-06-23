import { getAllWork, getWorkBySlug } from "@/lib/content/work";
import { workToMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/content/settings";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllWork().map((entry) => ({ slug: entry.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(workToMarkdown(entry), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Link: `<${SITE_URL}/work/${entry.slug}>; rel="canonical"`,
    },
  });
}
