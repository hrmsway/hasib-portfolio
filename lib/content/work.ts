import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { WorkEntry } from "@/lib/types";

const WORK_DIR = path.join(process.cwd(), "content", "work");

function readEntry(file: string): WorkEntry {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(WORK_DIR, file), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    status: data.status ?? "draft",
    order: data.order ?? 99,
    featured: data.featured ?? false,
    category: data.category ?? "",
    year: data.year ?? "",
    role: data.role ?? "",
    summary: data.summary ?? "",
    stack: data.stack ?? [],
    metrics: data.metrics ?? [],
    accent: data.accent ?? "lavender",
    thumbnail: data.thumbnail ?? { src: "", alt: "" },
    links: data.links ?? [],
    seoTitle: data.seoTitle || undefined,
    seoDescription: data.seoDescription || undefined,
    content,
  };
}

export function getAllWork(): WorkEntry[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs
    .readdirSync(WORK_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(readEntry)
    .filter((e) => e.status === "published")
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedWork(): WorkEntry[] {
  return getAllWork().filter((e) => e.featured);
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getAllWork().find((e) => e.slug === slug);
}
