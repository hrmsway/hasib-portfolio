import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/reveal";
import { capabilitiesSettings } from "@/lib/content/settings";

export function Capabilities() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-20 mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <Reveal>
          <MicroLabel as="h2" className="mb-6">
            What I do
          </MicroLabel>
          <p className="type-hero text-ink">{capabilitiesSettings.heading}</p>
          <p className="mono-body text-ink-dim mt-8 max-w-md">
            Four layers, one discipline: every piece — from the agent loop to
            the deployment pipeline — built to survive contact with production.
          </p>
        </Reveal>

        {/* Mono data table, tenbin comparison-card style */}
        <Reveal delay={120}>
          <div className="border-line-faint bg-raise/50 overflow-hidden rounded-xl border backdrop-blur-sm">
            <div className="hairline-b flex items-center justify-between px-6 py-4">
              <span className="mono-label text-ink-faint">Capability</span>
              <span className="mono-label text-accent">Tooling</span>
            </div>
            {capabilitiesSettings.items.map((item, i) => (
              <div
                key={item.title}
                className="hairline-b group hover:bg-ink/[0.03] flex flex-col gap-2 px-6 py-5 transition-colors duration-300 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="flex items-baseline gap-3">
                  <span className="mono-label text-ink-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-ink text-[17px] font-medium tracking-tight">
                    {item.title}
                  </span>
                </span>
                <span className="mono-label text-ink-dim text-right sm:max-w-[46%]">
                  {item.tags.join(" · ")}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
