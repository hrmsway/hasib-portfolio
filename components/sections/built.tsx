import { SceneView } from "@/components/three/scene-view";
import { MicroLabel } from "@/components/ui/micro-label";
import { Reveal } from "@/components/reveal";
import { homeSettings } from "@/lib/content/settings";

export function Built() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-between overflow-hidden py-24 md:py-28">
      {/* Cube sits between the headline and the meta row, like the reference */}
      <SceneView
        scene="trust-cube"
        fallbackSrc="/fallbacks/trust-cube.avif"
        className="absolute top-[56%] left-1/2 h-[min(60vmin,600px)] w-[min(60vmin,600px)] -translate-x-1/2 -translate-y-1/2"
      />

      <Reveal className="relative z-20 mx-auto flex max-w-[1440px] flex-col items-center px-5 text-center md:px-10">
        <MicroLabel as="h2" className="mb-7">
          {homeSettings.builtKicker}
        </MicroLabel>
        <p className="type-mega text-ink">{homeSettings.builtHeadline}</p>
      </Reveal>

      <div className="relative z-20 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 px-5 md:px-10">
        <p className="mono-body text-ink-dim max-w-md text-center [text-shadow:0_0_18px_rgb(5_5_5),0_0_6px_rgb(5_5_5)]">
          {homeSettings.builtBody}
        </p>
        <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-16">
          {homeSettings.builtMeta.map((meta) => (
            <p key={meta.label} className="text-center">
              <span className="mono-label text-ink-faint block">
                {meta.label}:
              </span>
              <span className="mono-body text-ink mt-1.5 block">
                {meta.value}
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
