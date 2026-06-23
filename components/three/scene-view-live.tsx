"use client";

import { Suspense, useEffect, useRef } from "react";
import { View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useThreeStore } from "./store";
import {
  HeroScene,
  AccentBlobScene,
  TrustCubeScene,
  FooterWaveScene,
  type SceneProps,
} from "./scenes";

export type SceneName = "hero" | "accent-blob" | "trust-cube" | "footer-wave";

const SCENES: Record<SceneName, React.ComponentType<SceneProps>> = {
  hero: HeroScene,
  "accent-blob": AccentBlobScene,
  "trust-cube": TrustCubeScene,
  "footer-wave": FooterWaveScene,
};

function FirstFrame({ onFirstFrame }: { onFirstFrame: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (!fired.current) {
      fired.current = true;
      onFirstFrame();
    }
  });
  return null;
}

export default function SceneViewLive({
  scene,
  trackRef,
  onFirstFrame,
}: {
  scene: SceneName;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onFirstFrame: () => void;
}) {
  const Scene = SCENES[scene];

  // Count this view toward the global frameloop while it is on screen.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let counted = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          useThreeStore.getState().addVisibleView(1);
        } else if (!entry.isIntersecting && counted) {
          counted = false;
          useThreeStore.getState().addVisibleView(-1);
        }
      },
      { rootMargin: "10%" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (counted) useThreeStore.getState().addVisibleView(-1);
    };
  }, [trackRef]);

  // Note: outside a Canvas, drei's View tracks its OWN rendered element
  // (the `track` prop is ignored) — so this element must carry the size.
  return (
    <View className="absolute inset-0">
      <Suspense fallback={null}>
        <Scene trackEl={trackRef} />
        <FirstFrame onFirstFrame={onFirstFrame} />
      </Suspense>
    </View>
  );
}
