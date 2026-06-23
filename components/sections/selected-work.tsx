import { WorkRow } from "@/components/work-row";
import { PillButton } from "@/components/ui/pill-button";
import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/reveal";
import { getFeaturedWork } from "@/lib/content/work";

export function SelectedWork() {
  const entries = getFeaturedWork();

  return (
    <section id="work" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <MicroLabel as="h2">Selected work</MicroLabel>
            <span className="mono-label text-ink-faint">
              {String(entries.length).padStart(2, "0")} projects
            </span>
          </div>
        </Reveal>
        <ul>
          {entries.map((entry, i) => (
            <Reveal
              key={entry.slug}
              as="li"
              delay={i * 70}
              className="hairline-t last:border-b-line-faint last:border-b"
            >
              <WorkRow entry={entry} index={i} />
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex justify-center md:mt-16">
          <PillButton href="/work" variant="ghost">
            All work
          </PillButton>
        </div>
      </div>
    </section>
  );
}
