"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { smokeVertexShader, cubeGlowFragmentShader } from "../shaders";

export function WireCube({
  size = 2.6,
  children,
  scrollRef,
}: {
  size?: number;
  children?: React.ReactNode;
  scrollRef?: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null!);

  const edges = useMemo(() => {
    const box = new THREE.BoxGeometry(size, size, size);
    const geo = new THREE.EdgesGeometry(box);
    box.dispose();
    return geo;
  }, [size]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    group.current.rotation.y += 0.08 * dt;
    group.current.rotation.x = 0.35 + (scrollRef?.current ?? 0) * 0.5;
  });

  return (
    <group ref={group} rotation={[0.35, 0.6, 0]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#b8b8b8" transparent opacity={0.55} />
      </lineSegments>
      {/* Luminous interior fog, brighter toward the top edge */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <shaderMaterial
          vertexShader={smokeVertexShader}
          fragmentShader={cubeGlowFragmentShader}
          uniforms={{ uIntensity: { value: 0.05 } }}
          transparent
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      {children}
    </group>
  );
}
