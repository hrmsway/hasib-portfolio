import type { Accent } from "@/lib/types";

export const ACCENT_HEX: Record<Accent, string> = {
  lavender: "#cecafb",
  mint: "#c9f0da",
  amber: "#f2e2c4",
  rose: "#f0cfd9",
  ice: "#cde8f5",
};

export const ACCENT_TEXT_CLASS: Record<Accent, string> = {
  lavender: "group-hover:text-[#cecafb]",
  mint: "group-hover:text-[#c9f0da]",
  amber: "group-hover:text-[#f2e2c4]",
  rose: "group-hover:text-[#f0cfd9]",
  ice: "group-hover:text-[#cde8f5]",
};
