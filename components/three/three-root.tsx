"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useThreeStore } from "./store";
import { detectTier } from "./quality";

const CanvasRoot = dynamic(() => import("./canvas-root"), { ssr: false });

/**
 * Lives in the root layout. Detects the device quality tier once, tracks
 * the reduced-motion preference, and mounts the single persistent WebGL
 * canvas only after a SceneView has requested it.
 */
export function ThreeRoot() {
  const requested = useThreeStore((s) => s.canvasRequested);
  const tier = useThreeStore((s) => s.tier);

  useEffect(() => {
    useThreeStore.getState().setTier(detectTier());

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => useThreeStore.getState().setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!requested || tier === null || tier === "static") return null;
  return <CanvasRoot />;
}
