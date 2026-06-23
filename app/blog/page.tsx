import type { Metadata } from "next";
import Link from "next/link";
import { MicroLabel } from "@/components/ui/micro-label";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts } from "@/lib/content/blog";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

const TITLE = "Writing";
const DESCRIPTION =
  "Notes on agentic AI, LLM orchestration, RAG, and production backend engineering by Hasib Ahmad Bhuyan.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-10 md:pt-44">
      <JsonLd
        graph={jsonLdGraph(
          webPageJsonLd({
            path: "/blog",
            title: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/blog" },
          ])
        )}
      />
      <MicroLabel as="h2" className="mb-5">
        Writing
      </MicroLabel>
      <h1 className="type-hero text-ink mb-16 max-w-4xl md:mb-24">
        Notes from the agent trenches.
      </h1>

      {posts.length === 0 ? (
        <p className="mono-body text-ink-dim max-w-md">
          Nothing published yet — pieces on agentic systems and retrieval
          infrastructure are in the works. Subscribe to the{" "}
          <a
            href="/feed.xml"
            className="text-accent underline underline-offset-4"
          >
            feed
          </a>{" "}
          to catch them.
        </p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li
              key={post.slug}
              className="hairline-t last:border-b-line-faint last:border-b"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-2 py-8 md:flex-row md:items-baseline md:gap-10"
              >
                <time
                  dateTime={post.date}
                  className="mono-label text-ink-faint w-28 shrink-0"
                >
                  {formatDate(post.date)}
                </time>
                <span className="type-sub text-ink group-hover:text-accent flex-1 transition-colors">
                  {post.title}
                </span>
                <span className="mono-label text-ink-faint shrink-0">
                  {post.readingTime}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
