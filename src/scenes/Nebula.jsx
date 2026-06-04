import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { nebulaVertexShader, nebulaFragmentShader } from '../shaders/nebula';

/** Plano con shader de nebulosa animada para el fondo del hero. */
export default function Nebula({
  position = [0, 0, -10],
  size = [70, 45],
  colorA = '#2a1b4a',
  colorB = '#e0507a',
  opacity = 0.5,
}) {
  const matRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uOpacity: { value: opacity },
    }),
    [colorA, colorB, opacity]
  );

  useFrame((state) => {
    if (matRef.current) matRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={position}>
      <planeGeometry args={size} />
      <shaderMaterial
        ref={matRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
