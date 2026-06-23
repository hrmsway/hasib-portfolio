export type Accent = "lavender" | "mint" | "amber" | "rose" | "ice";

export type Metric = { label: string; value: string };
export type LinkItem = { label: string; href: string };

export type WorkEntry = {
  slug: string;
  title: string;
  status: "draft" | "published";
  order: number;
  featured: boolean;
  category: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  metrics: Metric[];
  accent: Accent;
  thumbnail: { src: string; alt: string };
  links: LinkItem[];
  seoTitle?: string;
  seoDescription?: string;
  content: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  status: "draft" | "published";
  date: string;
  updatedAt?: string;
  excerpt: string;
  tags: string[];
  accent: Accent;
  readingTime: string;
  seoTitle?: string;
  seoDescription?: string;
  content: string;
};
