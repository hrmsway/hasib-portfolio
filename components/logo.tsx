import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-[18px]", className)}
    >
      <path
        d="M12 1.5v21M1.5 12h21M4.6 4.6l14.8 14.8M19.4 4.6L4.6 19.4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group text-ink inline-flex items-center gap-2.5",
        className
      )}
      aria-label="Hasib Ahmad Bhuyan — home"
    >
      <LogoMark className="text-accent transition-transform duration-500 group-hover:rotate-45" />
      <span className="font-display text-[15px] font-medium tracking-tight">
        Hasib Ahmad Bhuyan
      </span>
    </Link>
  );
}
