import type { Metadata } from "next";
import { MicroLabel } from "@/components/ui/micro-label";
import { SceneView } from "@/components/three/scene-view";
import { Tag } from "@/components/ui/tag";
import { PillButton } from "@/components/ui/pill-button";
import { JsonLd } from "@/components/json-ld";
import {
  profileSettings,
  resumeSettings,
  skillsSettings,
} from "@/lib/content/settings";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdGraph,
  webPageJsonLd,
} from "@/lib/seo";

const TITLE = "About";
const DESCRIPTION =
  "About Hasib Ahmad Bhuyan — Backend Engineer and Tech Lead building agentic AI, LLM orchestration, RAG pipelines, and scalable Python and Go backends.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-10 md:pt-44">
      <JsonLd
        graph={jsonLdGraph(
          webPageJsonLd({
            path: "/about",
            title: TITLE,
            description: DESCRIPTION,
            type: "ProfilePage",
          }),
          faqJsonLd(resumeSettings.faq),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ])
        )}
      />

      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-24">
        <div>
          <MicroLabel as="h2" className="mb-5">
            About
          </MicroLabel>
          <h1 className="type-hero text-ink">
            Engineer first.
            <br />
            AI-native by practice.
          </h1>
          <div className="mono-body text-ink-dim mt-10 max-w-2xl space-y-5">
            <p>{profileSettings.summary}</p>
            <p>
              The through-line in my work: turning AI capabilities into
              automation people actually run. Agents get explicit, inspectable
              workflows; retrieval gets grounded, source-aware answers; and the
              unglamorous parts — task queues, orchestration, deployments — get
              treated as features, because in production they are.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton
              href={`mailto:${profileSettings.email}`}
              variant="filled"
            >
              Get in touch
            </PillButton>
            <PillButton href="/resume" variant="ghost">
              Resume
            </PillButton>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-xl">
            <SceneView
              scene="accent-blob"
              fallbackSrc="/fallbacks/accent-blob.avif"
              className="absolute inset-0 h-full w-full"
              fallbackClassName="object-cover"
            />
          </div>
          <p className="mono-label text-ink-faint mt-4">
            {profileSettings.location}
          </p>
        </div>
      </div>

      {/* Skills */}
      <section className="mt-28 md:mt-36">
        <MicroLabel as="h2" className="mb-12">
          Toolbox
        </MicroLabel>
        <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
          {skillsSettings.groups.map((group) => (
            <div key={group.category} className="hairline-t pt-8">
              <h3 className="type-sub text-ink mb-5">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-28 md:mt-36">
        <MicroLabel as="h2" className="mb-12">
          Quick answers
        </MicroLabel>
        <dl className="max-w-3xl">
          {resumeSettings.faq.map((item) => (
            <div
              key={item.question}
              className="hairline-t py-8 first:border-t-0 first:pt-0"
            >
              <dt className="type-sub text-ink mb-4">{item.question}</dt>
              <dd className="mono-body text-ink-dim">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
