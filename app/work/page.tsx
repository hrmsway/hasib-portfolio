import type { Metadata } from "next";
import { WorkRow } from "@/components/work-row";
import { MicroLabel } from "@/components/ui/micro-label";
import { JsonLd } from "@/components/json-ld";
import { getAllWork } from "@/lib/content/work";
import {
  breadcrumbJsonLd,
  jsonLdGraph,
  webPageJsonLd,
  workCollectionJsonLd,
} from "@/lib/seo";

const TITLE = "Work";
const DESCRIPTION =
  "Selected work by Hasib Ahmad Bhuyan — AI SaaS backends, multi-agent automation, RAG-powered search, and real-time production systems.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/work",
    types: { "text/markdown": "/index.md" },
  },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/work" },
};

export default function WorkIndexPage() {
  const entries = getAllWork();

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-10 md:pt-44">
      <JsonLd
        graph={jsonLdGraph(
          webPageJsonLd({
            path: "/work",
            title: TITLE,
            description: DESCRIPTION,
            type: "CollectionPage",
          }),
          workCollectionJsonLd(entries),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ])
        )}
      />
      <MicroLabel as="h2" className="mb-5">
        Work
      </MicroLabel>
      <h1 className="type-hero text-ink mb-16 max-w-4xl md:mb-24">
        Systems that earn their keep in production.
      </h1>
      <ul>
        {entries.map((entry, i) => (
          <li
            key={entry.slug}
            className="hairline-t last:border-b-line-faint last:border-b"
          >
            <WorkRow entry={entry} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
