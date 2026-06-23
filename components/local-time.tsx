"use client";

import { useEffect, useState } from "react";

export function LocalTime({ timezone }: { timezone: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timezone,
      }).format(new Date());
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [timezone]);

  return <span suppressHydrationWarning>{time ?? "--:--"}</span>;
}
