import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

let fontsPromise: Promise<{ display: Buffer; mono: Buffer }> | null = null;

function loadFonts() {
  fontsPromise ??= Promise.all([
    fs.readFile(path.join(process.cwd(), "fonts", "ClashDisplay-Medium.otf")),
    fs.readFile(path.join(process.cwd(), "fonts", "GeistMono-Regular.ttf")),
  ]).then(([display, mono]) => ({ display, mono }));
  return fontsPromise;
}

export async function renderOgImage({
  eyebrow,
  title,
  footer = "Hasib Ahmad Bhuyan — Backend Engineer & Tech Lead, Agentic AI",
  accent = "#cecafb",
}: {
  eyebrow: string;
  title: string;
  footer?: string;
  accent?: string;
}) {
  const { display, mono } = await loadFonts();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#050505",
        padding: "64px 72px",
        fontFamily: "GeistMono",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 1.5v21M1.5 12h21M4.6 4.6l14.8 14.8M19.4 4.6L4.6 19.4"
            stroke={accent}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <span
          style={{
            fontSize: 22,
            letterSpacing: "0.09em",
            color: "#989e9e",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "ClashDisplay",
          fontSize: title.length > 42 ? 64 : 80,
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          color: "#f0f3f3",
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 3,
            backgroundColor: accent,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#989e9e",
            letterSpacing: "0.02em",
          }}
        >
          {footer}
        </div>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [
        { name: "ClashDisplay", data: display, weight: 500, style: "normal" },
        { name: "GeistMono", data: mono, weight: 400, style: "normal" },
      ],
    }
  );
}
