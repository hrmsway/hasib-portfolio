import { siteIndexMarkdown } from "@/lib/markdown";
import { SITE_URL } from "@/lib/content/settings";

export const dynamic = "force-static";

export function GET() {
  return new Response(siteIndexMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      Link: `<${SITE_URL}/>; rel="canonical"`,
    },
  });
}
