import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost } from "@/lib/types";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readPost(file: string): BlogPost {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    status: data.status ?? "draft",
    date: data.date ?? "",
    updatedAt: data.updatedAt || undefined,
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    accent: data.accent ?? "lavender",
    readingTime: readingTime(content).text,
    seoTitle: data.seoTitle || undefined,
    seoDescription: data.seoDescription || undefined,
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readPost)
    .filter((p) => p.status === "published")
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function hasPublishedPosts(): boolean {
  return getAllPosts().length > 0;
}
