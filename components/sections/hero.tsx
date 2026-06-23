import { SceneView } from "@/components/three/scene-view";
import { PillButton } from "@/components/ui/pill-button";
import { LocalTime } from "@/components/local-time";
import { homeSettings, profileSettings } from "@/lib/content/settings";

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      {/* Blurred low-entropy poster: keeps the H1 as the LCP element */}
      <SceneView
        scene="hero"
        fallbackSrc="/fallbacks/hero-blob-soft.avif"
        className="absolute inset-0"
        fallbackClassName="object-cover opacity-90"
        eager
      />

      {/* Soft vignette so the headline stays readable over the blob */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_48%_at_50%_52%,rgb(5_5_5/0.78),transparent_72%)] md:bg-[radial-gradient(ellipse_55%_42%_at_50%_52%,rgb(5_5_5/0.62),transparent_70%)]"
      />

      <div className="hero-enter relative z-20 mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 pt-32 pb-28 text-center md:px-10">
        <p className="mono-label text-ink-dim mb-7">
          {homeSettings.heroKicker}
        </p>
        <h1 className="type-hero text-ink">
          {homeSettings.heroLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="text-ink-dim mx-auto mt-8 max-w-md font-mono text-[13px] leading-relaxed md:max-w-xl md:text-[15px]">
          {homeSettings.heroSub}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PillButton href={homeSettings.primaryCta.href} variant="filled">
            {homeSettings.primaryCta.label}
          </PillButton>
          <PillButton href={homeSettings.secondaryCta.href} variant="ghost">
            {homeSettings.secondaryCta.label}
          </PillButton>
        </div>
      </div>

      {/* Corner labels */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div className="mx-auto flex max-w-[1440px] items-end justify-between px-5 pb-7 md:px-10">
          <p className="mono-label text-ink-faint">
            {profileSettings.locationShort}
          </p>
          <p className="mono-label text-ink-faint hidden sm:block">
            {profileSettings.availability}
          </p>
          <p className="mono-label text-ink-faint">
            <LocalTime timezone={profileSettings.timezone} />{" "}
            <span aria-hidden="true">·</span> GMT+6
          </p>
        </div>
      </div>
    </section>
  );
}
