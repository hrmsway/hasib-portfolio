import { getAllPosts } from "@/lib/content/blog";
import { profileSettings, siteSettings, SITE_URL } from "@/lib/content/settings";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const updated =
    posts.length > 0
      ? new Date(posts[0].updatedAt ?? posts[0].date).toISOString()
      : new Date().toISOString();

  const entries = posts
    .map(
      (post) => `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${SITE_URL}/blog/${post.slug}"/>
    <id>${SITE_URL}/blog/${post.slug}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.updatedAt ?? post.date).toISOString()}</updated>
    <summary>${escapeXml(post.excerpt)}</summary>
  </entry>`
    )
    .join("");

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(siteSettings.title)}</title>
  <subtitle>${escapeXml(siteSettings.description)}</subtitle>
  <link href="${SITE_URL}/feed.xml" rel="self"/>
  <link href="${SITE_URL}"/>
  <id>${SITE_URL}/</id>
  <updated>${updated}</updated>
  <author>
    <name>${escapeXml(profileSettings.name)}</name>
    <email>${profileSettings.email}</email>
  </author>${entries}
</feed>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
