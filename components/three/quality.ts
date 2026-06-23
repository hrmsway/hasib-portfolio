import type { QualityTier } from "./store";

export function detectTier(): QualityTier {
  if (typeof window === "undefined") return "static";

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  if (nav.connection?.saveData) return "static";

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", {
      failIfMajorPerformanceCaveat: true,
    });
    if (!gl) return "static";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    return "static";
  }

  const memory = nav.deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 8;
  // Low cores alone isn't conclusive (VMs, efficiency-core reporting) —
  // only downgrade when memory is also constrained or unknown-and-few-cores.
  const lowMemory = memory !== undefined && memory <= 4;
  const constrained = cores <= 4 && (memory === undefined || memory <= 8);
  const smallTouch =
    window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 768;

  if (lowMemory || constrained || smallTouch) return "low";
  return "high";
}

export const TIER_CONFIG = {
  high: {
    blobDetail: 24,
    smallBlobDetail: 16,
    particles: 250,
    waveCols: 128,
    waveRows: 48,
    dprMax: 1.75,
    hdri: true,
  },
  low: {
    blobDetail: 12,
    smallBlobDetail: 8,
    particles: 80,
    waveCols: 80,
    waveRows: 30,
    dprMax: 1.5,
    hdri: false,
  },
} as const;
