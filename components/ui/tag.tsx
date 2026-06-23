import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mono-label border-line-faint text-ink-dim inline-flex items-center rounded-full border px-3 py-1 text-[0.6875rem]",
        className
      )}
    >
      {children}
    </span>
  );
}
