import { SceneView } from "@/components/three/scene-view";
import { Reveal } from "@/components/reveal";
import { homeSettings, profileSettings } from "@/lib/content/settings";

export function ContactCta() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden">
      <Reveal className="relative z-20 mx-auto flex max-w-[1440px] flex-col items-center px-5 pt-24 pb-10 text-center md:px-10 md:pt-36">
        <h2 className="type-mega text-ink">{homeSettings.contactHeadline}</h2>
        <p className="mono-body text-ink-dim mt-8 max-w-lg">
          {homeSettings.contactBody}
        </p>
        <a
          href={`mailto:${profileSettings.email}`}
          className="mono-label pill-filled mt-10 rounded-full px-8 py-4"
        >
          {profileSettings.email}
        </a>
        <div className="mt-8 flex gap-6">
          {profileSettings.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label text-ink-dim hover:text-ink transition-colors"
            >
              {social.label} ↗
            </a>
          ))}
        </div>
      </Reveal>

      {/* Dot-matrix wave bleeding into the footer */}
      <div className="relative mt-4">
        <SceneView
          scene="footer-wave"
          fallbackSrc="/fallbacks/footer-wave.avif"
          className="relative h-[44vh] min-h-64 w-full md:h-[56vh]"
          fallbackClassName="object-cover"
        />
        {/* Blend the scene region's top edge into the void */}
        <div
          aria-hidden="true"
          className="from-base pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b to-transparent"
        />
      </div>
    </section>
  );
}
