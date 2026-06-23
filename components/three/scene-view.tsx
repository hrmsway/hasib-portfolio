"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useThreeStore } from "./store";
import { onFirstInteraction } from "./interaction";
import type { SceneName } from "./scene-view-live";

const SceneViewLive = dynamic(() => import("./scene-view-live"), {
  ssr: false,
});

type SceneViewProps = {
  scene: SceneName;
  fallbackSrc: string;
  className?: string;
  fallbackClassName?: string;
  /** Load the fallback eagerly (above-the-fold scenes). */
  eager?: boolean;
};

/**
 * Server-renderable placeholder for a 3D scene. Paints a static fallback
 * image immediately; after window load + idle + intersection, mounts the
 * live WebGL view (scissor-rendered by the persistent canvas) and
 * crossfades. Decorative only — hidden from the accessibility tree.
 */
export function SceneView({
  scene,
  fallbackSrc,
  className,
  fallbackClassName,
  eager = false,
}: SceneViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [live, setLive] = useState(false);
  const tier = useThreeStore((s) => s.tier);

  useEffect(() => {
    let idleId: number | undefined;
    let observer: IntersectionObserver | undefined;
    let cancelled = false;

    const arm = () => {
      if (cancelled || !containerRef.current) return;
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setEnabled(true);
            useThreeStore.getState().requestCanvas();
            observer?.disconnect();
          }
        },
        { rootMargin: "400px" }
      );
      observer.observe(containerRef.current);
    };

    const scheduleIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(arm, { timeout: 2500 });
      } else {
        idleId = window.setTimeout(arm, 1200);
      }
    };

    // Load complete -> first user interaction -> idle slot -> intersection.
    let unsubscribe: () => void = () => {};
    const afterLoad = () => {
      unsubscribe = onFirstInteraction(() => {
        if (!cancelled) scheduleIdle();
      });
    };

    if (document.readyState === "complete") {
      afterLoad();
    } else {
      window.addEventListener("load", afterLoad, { once: true });
    }

    return () => {
      cancelled = true;
      unsubscribe();
      window.removeEventListener("load", afterLoad);
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId);
      }
      observer?.disconnect();
    };
  }, []);

  const webglAllowed = tier === "high" || tier === "low";
  const isLive = live && webglAllowed;

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none select-none", className)}
      data-scene-live={isLive}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallbackSrc}
        alt=""
        className={cn(
          "scene-fallback h-full w-full object-contain",
          fallbackClassName
        )}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "low" : undefined}
        decoding="async"
        draggable={false}
      />
      {enabled && webglAllowed && (
        <SceneViewLive
          scene={scene}
          trackRef={containerRef}
          onFirstFrame={() => setLive(true)}
        />
      )}
    </div>
  );
}
