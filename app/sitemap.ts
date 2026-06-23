import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { getAllWork } from "@/lib/content/work";
import { getAllPosts } from "@/lib/content/blog";
import { absoluteUrl } from "@/lib/seo";

function contentMtime(dir: string, slug: string): Date {
  try {
    return fs.statSync(
      path.join(process.cwd(), "content", dir, `${slug}.mdx`)
    ).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/work"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/resume"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((entry) => ({
    url: absoluteUrl(`/work/${entry.slug}`),
    lastModified: contentMtime("work", entry.slug),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const posts = getAllPosts();
  const blogRoutes: MetadataRoute.Sitemap =
    posts.length > 0
      ? [
          {
            url: absoluteUrl("/blog"),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: 0.8,
          },
          ...posts.map((post) => ({
            url: absoluteUrl(`/blog/${post.slug}`),
            lastModified: new Date(post.updatedAt ?? post.date),
            changeFrequency: "monthly" as const,
            priority: 0.7,
          })),
        ]
      : [];

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
