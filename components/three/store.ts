import { create } from "zustand";

export type QualityTier = "high" | "low" | "static";

type ThreeState = {
  tier: QualityTier | null;
  canvasRequested: boolean;
  visibleViews: number;
  reducedMotion: boolean;
  contextLosses: number;
  setTier: (tier: QualityTier) => void;
  requestCanvas: () => void;
  addVisibleView: (delta: number) => void;
  setReducedMotion: (value: boolean) => void;
  registerContextLoss: () => void;
};

export const useThreeStore = create<ThreeState>((set) => ({
  tier: null,
  canvasRequested: false,
  visibleViews: 0,
  reducedMotion: false,
  contextLosses: 0,
  setTier: (tier) => set({ tier }),
  requestCanvas: () => set({ canvasRequested: true }),
  addVisibleView: (delta) =>
    set((s) => ({ visibleViews: Math.max(0, s.visibleViews + delta) })),
  setReducedMotion: (value) => set({ reducedMotion: value }),
  registerContextLoss: () =>
    set((s) => {
      const losses = s.contextLosses + 1;
      // Two losses in one session: WebGL is unstable here, fall back to static.
      return losses >= 2
        ? { contextLosses: losses, tier: "static" as QualityTier }
        : { contextLosses: losses };
    }),
}));

// Mutable, non-reactive pointer state read inside useFrame.
export const pointerState = { x: 0, y: 0 };
