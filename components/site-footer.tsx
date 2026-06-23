import Link from "next/link";
import { LogoMark } from "@/components/logo";
import {
  navigationSettings,
  profileSettings,
  siteSettings,
} from "@/lib/content/settings";

export function SiteFooter() {
  return (
    <footer className="hairline-t relative">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-12 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex items-center gap-2.5">
          <LogoMark className="text-accent" />
          <span className="font-display text-ink text-[15px] font-medium tracking-tight">
            Hasib Ahmad Bhuyan
          </span>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          {navigationSettings.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="mono-label text-ink-dim hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {profileSettings.socials.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label text-ink-dim hover:text-ink transition-colors"
            >
              {social.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 pb-10 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="mono-label text-ink-faint">
          © {new Date().getFullYear()} {siteSettings.name} —{" "}
          {siteSettings.domain}
        </p>
        <p className="mono-label text-ink-faint">
          <a href="/llms.txt" className="hover:text-ink-dim transition-colors">
            llms.txt
          </a>
          <span aria-hidden="true"> · </span>
          <a href="/feed.xml" className="hover:text-ink-dim transition-colors">
            RSS
          </a>
          <span aria-hidden="true"> · </span>
          <a href="/index.md" className="hover:text-ink-dim transition-colors">
            index.md
          </a>
        </p>
      </div>
    </footer>
  );
}
