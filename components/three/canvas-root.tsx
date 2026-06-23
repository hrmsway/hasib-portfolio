"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { View, PerformanceMonitor } from "@react-three/drei";
import { useThreeStore, pointerState } from "./store";
import { TIER_CONFIG } from "./quality";

export default function CanvasRoot() {
  const tier = useThreeStore((s) => s.tier);
  const reducedMotion = useThreeStore((s) => s.reducedMotion);
  const visibleViews = useThreeStore((s) => s.visibleViews);
  const [tabVisible, setTabVisible] = useState(true);

  const config = TIER_CONFIG[tier === "high" ? "high" : "low"];
  const [dprMax, setDprMax] = useState<number>(config.dprMax);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  if (tier === "static") return null;

  const active = visibleViews > 0 && !reducedMotion && tabVisible;

  return (
    <div className="pointer-events-none fixed inset-0 z-10" aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "demand"}
        dpr={[1, dprMax]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ pointerEvents: "none", background: "transparent" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => {
            e.preventDefault();
            useThreeStore.getState().registerContextLoss();
          });
        }}
      >
        <View.Port />
        <PerformanceMonitor
          flipflops={2}
          onDecline={() => setDprMax((d) => Math.max(1, d - 0.25))}
          onIncline={() => setDprMax((d) => Math.min(config.dprMax, d + 0.25))}
        />
      </Canvas>
    </div>
  );
}
