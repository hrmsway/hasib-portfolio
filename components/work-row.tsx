import Image from "next/image";
import Link from "next/link";
import type { WorkEntry } from "@/lib/types";
import { ACCENT_TEXT_CLASS } from "@/lib/accents";
import { cn } from "@/lib/utils";

export function WorkRow({ entry, index }: { entry: WorkEntry; index: number }) {
  return (
    <Link
      href={`/work/${entry.slug}`}
      className="group relative flex items-center gap-5 py-7 transition-colors duration-300 md:gap-10 md:py-9"
    >
      <span className="mono-label text-ink-faint w-8 shrink-0">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Mobile inline thumbnail */}
      <span className="relative block size-14 shrink-0 overflow-hidden rounded-md md:hidden">
        <Image
          src={entry.thumbnail.src}
          alt=""
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "type-title text-ink block truncate transition-colors duration-300",
            ACCENT_TEXT_CLASS[entry.accent]
          )}
        >
          {entry.title}
        </span>
        <span className="mono-label text-ink-faint mt-2 block md:hidden">
          {entry.category} · {entry.year}
        </span>
      </span>

      <span className="mono-label text-ink-dim hidden w-44 shrink-0 text-right md:block">
        {entry.category}
      </span>
      <span className="mono-label text-ink-faint hidden w-20 shrink-0 text-right md:block">
        {entry.year}
      </span>

      {/* Desktop hover thumbnail reveal */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-40 z-10 hidden h-44 w-60 -translate-y-1/2 scale-90 rotate-[-3deg] overflow-hidden rounded-lg opacity-0 shadow-2xl shadow-black/60 transition-all duration-500 ease-out group-hover:scale-100 group-hover:rotate-0 group-hover:opacity-100 lg:block"
      >
        <Image
          src={entry.thumbnail.src}
          alt=""
          fill
          sizes="240px"
          className="object-cover"
        />
      </span>
    </Link>
  );
}
