import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { Tag } from "@/components/ui/tag";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts, getPostBySlug } from "@/lib/content/blog";
import { blogPostJsonLd, breadcrumbJsonLd, jsonLdGraph } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: { "text/markdown": `/blog/${post.slug}.md` },
    },
    openGraph: {
      title,
      description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt ?? post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-10 md:pt-44">
      <JsonLd
        graph={jsonLdGraph(
          blogPostJsonLd(post),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ])
        )}
      />
      <nav aria-label="Breadcrumb" className="mono-label text-ink-faint mb-8">
        <Link href="/blog" className="hover:text-ink transition-colors">
          Writing
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-dim">{post.title}</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="type-hero text-ink">{post.title}</h1>
        <p className="mono-label text-ink-faint mt-8">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true"> · </span>
          {post.readingTime}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>

      <div className="prose-dark mx-auto mt-16 max-w-2xl">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
