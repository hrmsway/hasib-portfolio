"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { dotWaveVertexShader, dotWaveFragmentShader } from "../shaders";

export function DotWave({
  cols,
  rows,
  width = 22,
  height = 9,
}: {
  cols: number;
  rows: number;
  width?: number;
  height?: number;
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        positions[i++] = (x / (cols - 1) - 0.5) * width;
        positions[i++] = (y / (rows - 1) - 0.5) * height;
        positions[i++] = 0;
      }
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [cols, rows, width, height]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 2.2 },
    }),
    []
  );

  useFrame((state, delta) => {
    uniforms.uTime.value += Math.min(delta, 0.1);
    uniforms.uSize.value = 2.2 * state.viewport.dpr;
  });

  return (
    <points geometry={geometry} rotation={[-1.05, 0, 0]} frustumCulled={false}>
      <shaderMaterial
        vertexShader={dotWaveVertexShader}
        fragmentShader={dotWaveFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </points>
  );
}
