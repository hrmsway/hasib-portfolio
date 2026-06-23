"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { mergeVertices } from "three-stdlib";
import CustomShaderMaterial from "three-custom-shader-material";
import { easing } from "maath";
import { blobVertexShader } from "../shaders";
import { pointerState } from "../store";

type LiquidBlobProps = {
  detail: number;
  /** Use the cheap matcap material (low tier) instead of PBR + HDRI. */
  matcap?: boolean;
  scale?: number;
  position?: [number, number, number];
  amp?: number;
  freq?: number;
  speed?: number;
  spinSpeed?: number;
  /** Follow the pointer with damped rotation + local surface swell. */
  pointerFollow?: boolean;
};

const tmpDir = new THREE.Vector3();
const tmpQuat = new THREE.Quaternion();

export function LiquidBlob({
  detail,
  matcap = false,
  scale = 1,
  position = [0, 0, 0],
  amp = 0.22,
  freq = 1.4,
  speed = 0.12,
  spinSpeed = 0.05,
  pointerFollow = false,
}: LiquidBlobProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const spin = useRef(0);

  const geometry = useMemo(() => {
    const icosa = new THREE.IcosahedronGeometry(1, detail);
    const merged = mergeVertices(icosa);
    merged.computeVertexNormals();
    icosa.dispose();
    return merged;
  }, [detail]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: amp },
      uFreq: { value: freq },
      uSpeed: { value: speed },
      uPointer: { value: new THREE.Vector3(0, 0, 1) },
      uPointerStrength: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    uniforms.uTime.value += dt;

    if (pointerFollow) {
      spin.current += spinSpeed * dt;
      easing.dampE(
        mesh.current.rotation,
        [pointerState.y * -0.22, spin.current + pointerState.x * 0.35, 0],
        0.8,
        dt
      );

      // Project pointer direction into object space for the surface swell.
      tmpDir
        .set(pointerState.x * 1.2, pointerState.y * 0.9, 1)
        .normalize()
        .applyQuaternion(tmpQuat.copy(mesh.current.quaternion).invert());
      uniforms.uPointer.value.copy(tmpDir);
      easing.damp(uniforms.uPointerStrength, "value", 0.1, 0.6, dt);
    } else {
      mesh.current.rotation.y += spinSpeed * dt;
      mesh.current.rotation.x += spinSpeed * 0.35 * dt;
    }
  });

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      scale={scale}
      position={position}
      frustumCulled={false}
    >
      {matcap ? (
        <MatcapBlobMaterial uniforms={uniforms} />
      ) : (
        <CustomShaderMaterial
          baseMaterial={THREE.MeshPhysicalMaterial}
          vertexShader={blobVertexShader}
          uniforms={uniforms}
          metalness={1}
          // Low roughness = sharp mirror reflections (the "chrome"). The dark
          // base color tints those metal reflections down to a mercury body,
          // while the strong, glossy clearcoat adds bright white specular
          // highlights on top that the base color does NOT darken.
          roughness={0.12}
          envMapIntensity={0.85}
          clearcoat={1}
          clearcoatRoughness={0.06}
          color={"#16191d"}
        />
      )}
    </mesh>
  );
}

function MatcapBlobMaterial({
  uniforms,
}: {
  uniforms: Record<string, THREE.IUniform>;
}) {
  const matcapTexture = useTexture("/3d/matcap-silver-256.webp");
  return (
    <CustomShaderMaterial
      baseMaterial={THREE.MeshMatcapMaterial}
      vertexShader={blobVertexShader}
      uniforms={uniforms}
      matcap={matcapTexture}
      color={"#646a70"}
    />
  );
}
