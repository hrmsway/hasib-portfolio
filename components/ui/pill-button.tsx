import Link from "next/link";
import { cn } from "@/lib/utils";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "filled" | "ghost";
  className?: string;
};

export function PillButton({
  href,
  children,
  variant = "filled",
  className,
}: PillButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(
    "mono-label inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
    variant === "filled" ? "pill-filled" : "pill-ghost",
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
