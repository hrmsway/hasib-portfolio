"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { particleVertexShader, particleFragmentShader } from "../shaders";

export function ParticleField({
  count,
  spread = 7,
}: {
  count: number;
  spread?: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    // Deterministic pseudo-random scatter so SSR/resume stays stable.
    let s = 1337;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * spread;
      positions[i * 3 + 1] = (rand() - 0.5) * spread * 0.7;
      positions[i * 3 + 2] = (rand() - 0.5) * spread * 0.6;
      seeds[i] = rand();
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return geo;
  }, [count, spread]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 4 },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.1);
    uniforms.uSize.value = 4 * state.viewport.dpr;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
