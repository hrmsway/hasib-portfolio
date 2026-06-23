"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string };

export function SiteHeader({
  items,
  contactEmail,
}: {
  items: NavItem[];
  contactEmail: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="from-base/90 via-base/40 pointer-events-none absolute inset-0 bg-gradient-to-b to-transparent" />
      <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "mono-label hover:text-ink transition-colors duration-300",
                pathname === item.href ? "text-ink" : "text-ink-dim"
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${contactEmail}`}
            className="mono-label pill-filled rounded-full px-5 py-2.5"
          >
            Contact
          </a>
        </nav>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="mono-label border-line text-ink rounded-full border px-4 py-2 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        className={cn(
          "bg-base fixed inset-0 z-[-1] flex flex-col justify-between px-5 pt-28 pb-10 transition-all duration-400 md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-2">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "type-title text-ink py-2 transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${contactEmail}`}
          className={cn(
            "mono-label pill-filled inline-flex w-fit rounded-full px-6 py-3 transition-all duration-500",
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}
          style={{ transitionDelay: open ? "320ms" : "0ms" }}
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}
