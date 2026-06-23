"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { smokeVertexShader, smokeFragmentShader } from "../shaders";

export function SmokeBackdrop({
  intensity = 0.13,
  width = 26,
  height = 15,
  z = -4,
}: {
  intensity?: number;
  width?: number;
  height?: number;
  z?: number;
}) {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.1);
  });

  return (
    <mesh position={[0, 0, z]} frustumCulled={false}>
      <planeGeometry args={[width, height]} />
      <shaderMaterial
        vertexShader={smokeVertexShader}
        fragmentShader={smokeFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
