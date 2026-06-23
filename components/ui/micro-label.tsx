import { cn } from "@/lib/utils";

export function MicroLabel({
  children,
  className,
  as: Tag = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("mono-label text-ink-dim", className)}>{children}</Tag>
  );
}
