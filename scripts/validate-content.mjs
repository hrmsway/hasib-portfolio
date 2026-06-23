// Validates content frontmatter and settings JSON before build.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

const root = process.cwd();
const errors = [];

const accent = z.enum(["lavender", "mint", "amber", "rose", "ice"]);
const status = z.enum(["draft", "published"]);

const workSchema = z.object({
  title: z.string().min(1),
  status,
  order: z.number(),
  featured: z.boolean(),
  category: z.string().min(1),
  year: z.string().min(1),
  role: z.string().min(1),
  summary: z.string().min(40),
  stack: z.array(z.string()).min(1),
  metrics: z.array(z.object({ label: z.string(), value: z.string() })),
  accent,
  thumbnail: z.object({ src: z.string(), alt: z.string() }),
  links: z.array(z.object({ label: z.string(), href: z.string().url() })),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

const blogSchema = z.object({
  title: z.string().min(1),
  status,
  date: z.string().min(1),
  updatedAt: z.string().optional(),
  excerpt: z.string().min(20),
  tags: z.array(z.string()),
  accent: accent.optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

function validateCollection(dir, schema, label) {
  const full = path.join(root, "content", dir);
  if (!fs.existsSync(full)) return;
  for (const file of fs.readdirSync(full).filter((f) => f.endsWith(".mdx"))) {
    const { data } = matter(fs.readFileSync(path.join(full, file), "utf8"));
    const result = schema.safeParse(data);
    if (!result.success) {
      errors.push(
        `${label}/${file}: ${result.error.issues
          .map((i) => `${i.path.join(".")} — ${i.message}`)
          .join("; ")}`
      );
    }
  }
}

validateCollection("work", workSchema, "work");
validateCollection("blog", blogSchema, "blog");

const requiredSettings = [
  "site",
  "profile",
  "navigation",
  "home",
  "capabilities",
  "experience",
  "skills",
  "resume",
];
for (const name of requiredSettings) {
  const p = path.join(root, "content", "settings", `${name}.json`);
  if (!fs.existsSync(p)) {
    errors.push(`settings/${name}.json missing`);
    continue;
  }
  try {
    JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    errors.push(`settings/${name}.json is not valid JSON`);
  }
}

if (errors.length) {
  console.error("Content validation failed:\n" + errors.join("\n"));
  process.exit(1);
}
console.log("Content validation passed.");
