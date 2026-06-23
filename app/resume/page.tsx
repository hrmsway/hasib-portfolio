import type { Metadata } from "next";
import { MicroLabel } from "@/components/ui/micro-label";
import { PillButton } from "@/components/ui/pill-button";
import { JsonLd } from "@/components/json-ld";
import {
  experienceSettings,
  profileSettings,
  resumeSettings,
} from "@/lib/content/settings";
import { breadcrumbJsonLd, jsonLdGraph, webPageJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

const TITLE = "Resume";
const DESCRIPTION =
  "Resume of Hasib Ahmad Bhuyan — Backend Engineer & Tech Lead, Agentic AI. Experience at Hours Media Ltd, Softstandard Solution, and Bytenyx Limited.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/resume" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/resume" },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-36 pb-24 md:px-10 md:pt-44">
      <JsonLd
        graph={jsonLdGraph(
          webPageJsonLd({
            path: "/resume",
            title: TITLE,
            description: DESCRIPTION,
            type: "ProfilePage",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume" },
          ])
        )}
      />

      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <MicroLabel as="h2" className="mb-5">
            Resume
          </MicroLabel>
          <h1 className="type-hero text-ink">{resumeSettings.headline}</h1>
        </div>
        <PillButton href={resumeSettings.pdfPath} variant="filled">
          Download PDF
        </PillButton>
      </div>

      {/* Experience */}
      <section className="mt-20 md:mt-28">
        <MicroLabel as="h2" className="mb-10">
          Experience
        </MicroLabel>
        <ol className="space-y-0">
          {experienceSettings.items.map((item) => (
            <li
              key={`${item.organization}-${item.role}`}
              className="hairline-t grid gap-4 py-10 lg:grid-cols-[300px_1fr] lg:gap-12"
            >
              <div>
                <h3
                  className={cn(
                    "type-sub",
                    item.current ? "text-accent" : "text-ink"
                  )}
                >
                  {item.organization}
                </h3>
                <p className="mono-label text-ink-dim mt-3">{item.role}</p>
                <p className="mono-label text-ink-faint mt-1.5">
                  {item.start} — {item.end}
                </p>
                <p className="mono-label text-ink-faint mt-1.5">
                  {item.location}
                </p>
              </div>
              <ul className="space-y-3">
                {item.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="mono-body text-ink-dim before:text-ink-faint relative pl-6 before:absolute before:left-0 before:content-['→']"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {/* Education + Languages */}
      <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-24">
        <section>
          <MicroLabel as="h2" className="mb-8">
            Education
          </MicroLabel>
          {resumeSettings.education.map((edu) => (
            <div key={edu.degree} className="hairline-t pt-8">
              <h3 className="type-sub text-ink">{edu.degree}</h3>
              <p className="mono-body text-ink-dim mt-3">
                {edu.institution} · {edu.location}
              </p>
              <p className="mono-label text-ink-faint mt-2">
                {edu.start} — {edu.end}
                {edu.note ? ` · ${edu.note}` : ""}
              </p>
            </div>
          ))}
        </section>
        <section>
          <MicroLabel as="h2" className="mb-8">
            Languages
          </MicroLabel>
          <dl className="hairline-t pt-8">
            {resumeSettings.languages.map((lang) => (
              <div
                key={lang.language}
                className="flex items-baseline justify-between py-2"
              >
                <dt className="mono-body text-ink">{lang.language}</dt>
                <dd className="mono-label text-ink-faint">{lang.level}</dd>
              </div>
            ))}
          </dl>
          <p className="mono-label text-ink-faint mt-10">
            Contact: {profileSettings.email}
          </p>
        </section>
      </div>
    </div>
  );
}
