import Link from "next/link";
import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/reveal";
import { experienceSettings } from "@/lib/content/settings";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <div className="mb-12 flex items-end justify-between md:mb-16">
            <MicroLabel as="h2">Experience</MicroLabel>
            <Link
              href="/resume"
              className="mono-label text-ink-dim decoration-line hover:text-ink underline underline-offset-4 transition-colors"
            >
              Full resume
            </Link>
          </div>
        </Reveal>
        <ul>
          {experienceSettings.items.map((item, i) => (
            <Reveal
              key={`${item.organization}-${item.role}`}
              as="li"
              delay={i * 60}
              className="hairline-t last:border-b-line-faint grid grid-cols-1 gap-2 py-6 last:border-b sm:grid-cols-[1fr_1fr_auto] sm:items-baseline sm:gap-6 md:py-7"
            >
              <p
                className={cn(
                  "font-display flex items-center gap-2.5 text-lg font-medium tracking-tight",
                  item.current ? "text-accent" : "text-ink"
                )}
              >
                {item.current && (
                  <span
                    aria-hidden="true"
                    className="bg-accent inline-block size-1.5 animate-pulse rounded-full"
                  />
                )}
                {item.organization}
              </p>
              <p className="mono-label text-ink-dim">{item.role}</p>
              <p className="mono-label text-ink-faint sm:text-right">
                {item.start} — {item.end}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
