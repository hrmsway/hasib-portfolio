"use client";

import { useRef } from "react";
import { MathUtils } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import type { Group } from "three";
import { LiquidBlob } from "./objects/liquid-blob";
import { ParticleField } from "./objects/particle-field";
import { WireCube } from "./objects/wire-cube";
import { DotWave } from "./objects/dot-wave";
import { SmokeBackdrop } from "./objects/smoke-backdrop";
import { useThreeStore } from "./store";
import { TIER_CONFIG } from "./quality";

export type SceneProps = {
  trackEl: React.RefObject<HTMLDivElement | null>;
};

function useTierConfig() {
  const tier = useThreeStore((s) => s.tier);
  const high = tier === "high";
  return { config: TIER_CONFIG[high ? "high" : "low"], high };
}

function scrollProgress(el: HTMLElement | null): number {
  if (!el || typeof window === "undefined") return 0;
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return MathUtils.clamp((vh - rect.top) / (vh + rect.height), 0, 1);
}

export function HeroScene({ trackEl }: SceneProps) {
  const { config, high } = useTierConfig();
  const group = useRef<Group>(null!);
  const { size } = useThree();
  // Narrow viewports: pull the blob back so the headline keeps breathing room.
  const narrow = size.width < 640;
  const blobScale = narrow ? 0.82 : 1.04;

  useFrame(() => {
    const progress = scrollProgress(trackEl.current);
    group.current.position.y = progress * 1.2 - 0.3;
    group.current.rotation.z = progress * 0.25;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4.6]} fov={42} />
      {high && <Environment files="/3d/studio_small_08_512.hdr" />}
      <SmokeBackdrop intensity={0.14} />
      <group ref={group}>
        <LiquidBlob
          detail={config.blobDetail}
          matcap={!high}
          scale={blobScale}
          position={[0, -0.08, 0]}
          pointerFollow={high}
          amp={0.32}
          freq={1.0}
          speed={0.09}
        />
        <ParticleField count={config.particles} />
      </group>
    </>
  );
}

export function AccentBlobScene({ trackEl }: SceneProps) {
  const { config, high } = useTierConfig();
  const group = useRef<Group>(null!);

  useFrame(() => {
    const progress = scrollProgress(trackEl.current);
    group.current.rotation.z = progress * 0.5;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={42} />
      {high && <Environment files="/3d/studio_small_08_512.hdr" />}
      <group ref={group}>
        <LiquidBlob
          detail={config.smallBlobDetail}
          matcap={!high}
          scale={1.05}
          amp={0.28}
          freq={1.7}
          spinSpeed={0.09}
        />
      </group>
    </>
  );
}

export function TrustCubeScene({ trackEl }: SceneProps) {
  const { config, high } = useTierConfig();
  const progressRef = useRef(0);

  useFrame(() => {
    progressRef.current = scrollProgress(trackEl.current);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5.4]} fov={42} />
      {high && <Environment files="/3d/studio_small_08_512.hdr" />}
      <WireCube size={2.7} scrollRef={progressRef}>
        <LiquidBlob
          detail={config.smallBlobDetail}
          matcap={!high}
          scale={0.85}
          amp={0.3}
          freq={1.8}
          spinSpeed={-0.07}
        />
      </WireCube>
      <ParticleField count={Math.floor(config.particles / 2)} spread={9} />
    </>
  );
}

export function FooterWaveScene(_props: SceneProps) {
  const { config } = useTierConfig();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.1, 7]} fov={50} />
      <DotWave cols={config.waveCols} rows={config.waveRows} />
    </>
  );
}
