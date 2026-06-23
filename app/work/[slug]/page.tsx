import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { MicroLabel } from "@/components/ui/micro-label";
import { Tag } from "@/components/ui/tag";
import { PillButton } from "@/components/ui/pill-button";
import { SceneView } from "@/components/three/scene-view";
import { JsonLd } from "@/components/json-ld";
import { getAllWork, getWorkBySlug } from "@/lib/content/work";
import { profileSettings } from "@/lib/content/settings";
import { breadcrumbJsonLd, jsonLdGraph, workJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return getAllWork().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};
  const title = entry.seoTitle ?? entry.title;
  const description = entry.seoDescription ?? entry.summary;
  return {
    title,
    description,
    alternates: {
      canonical: `/work/${entry.slug}`,
      types: { "text/markdown": `/work/${entry.slug}.md` },
    },
    openGraph: {
      title,
      description,
      url: `/work/${entry.slug}`,
      type: "article",
    },
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) notFound();

  const all = getAllWork();
  const index = all.findIndex((e) => e.slug === entry.slug);
  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;

  return (
    <article className="relative">
      <JsonLd
        graph={jsonLdGraph(
          workJsonLd(entry),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: entry.title, path: `/work/${entry.slug}` },
          ])
        )}
      />

      <SceneView
        scene="accent-blob"
        fallbackSrc="/fallbacks/accent-blob.avif"
        className="absolute top-10 -right-32 hidden h-[480px] w-[480px] opacity-50 lg:block"
      />

      <div className="relative z-20 mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-10 md:pt-44">
        <nav aria-label="Breadcrumb" className="mono-label text-ink-faint mb-8">
          <Link href="/work" className="hover:text-ink transition-colors">
            Work
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-ink-dim">{entry.title}</span>
        </nav>

        <h1 className="type-hero text-ink max-w-4xl">{entry.title}</h1>
        <p className="mono-body text-ink-dim mt-8 max-w-2xl">{entry.summary}</p>

        {/* Fact grid */}
        <dl className="hairline-t mt-14 grid grid-cols-2 gap-x-8 gap-y-8 pt-10 md:grid-cols-4">
          <div>
            <dt className="mono-label text-ink-faint mb-2">Role</dt>
            <dd className="mono-body text-ink">{entry.role}</dd>
          </div>
          <div>
            <dt className="mono-label text-ink-faint mb-2">Year</dt>
            <dd className="mono-body text-ink">{entry.year}</dd>
          </div>
          <div>
            <dt className="mono-label text-ink-faint mb-2">Category</dt>
            <dd className="mono-body text-ink">{entry.category}</dd>
          </div>
          {entry.links.length > 0 && (
            <div>
              <dt className="mono-label text-ink-faint mb-2">Links</dt>
              <dd className="mono-body">
                {entry.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent decoration-accent/40 hover:decoration-accent block underline underline-offset-4 transition-colors"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </dd>
            </div>
          )}
          {entry.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="mono-label text-ink-faint mb-2">{metric.label}</dt>
              <dd className="mono-body text-ink">{metric.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 flex flex-wrap gap-2">
          {entry.stack.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>

        {/* Thumbnail banner */}
        <div className="relative mt-16 aspect-[21/9] w-full overflow-hidden rounded-xl">
          <Image
            src={entry.thumbnail.src}
            alt={entry.thumbnail.alt}
            fill
            priority={false}
            sizes="(max-width: 1440px) 100vw, 1360px"
            className="object-cover"
          />
        </div>

        <div className="prose-dark mx-auto mt-20 max-w-2xl">
          <MDXRemote source={entry.content} components={mdxComponents} />
        </div>

        {/* Pager */}
        <nav
          aria-label="More work"
          className="hairline-t mt-24 grid gap-6 pt-10 sm:grid-cols-2"
        >
          {prev ? (
            <Link href={`/work/${prev.slug}`} className="group">
              <MicroLabel className="mb-2">← Previous</MicroLabel>
              <span className="type-sub text-ink-dim group-hover:text-ink transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link href={`/work/${next.slug}`} className="group sm:text-right">
              <MicroLabel className="mb-2">Next →</MicroLabel>
              <span className="type-sub text-ink-dim group-hover:text-ink transition-colors">
                {next.title}
              </span>
            </Link>
          )}
        </nav>

        <div className="mt-24 flex flex-col items-center gap-6 text-center">
          <p className="type-title text-ink">
            Building something in this space?
          </p>
          <PillButton href={`mailto:${profileSettings.email}`} variant="filled">
            Get in touch
          </PillButton>
        </div>
      </div>
    </article>
  );
}
