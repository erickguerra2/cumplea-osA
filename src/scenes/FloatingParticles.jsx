import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getCircleTexture } from '../utils/textures';

/**
 * Polvo estelar de colores que flota lentamente. Cada particula sube y se
 * reinicia abajo, creando una sensacion de ascenso continuo.
 */
export default function FloatingParticles({ count = 220, spread = 18, colors = ['#ff8fb1', '#7c5cff', '#f5d491'] }) {
  const ref = useRef();
  const texture = useMemo(() => getCircleTexture(), []);

  const { positions, colorArray, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colorArray = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const palette = colors.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colorArray[i * 3] = c.r;
      colorArray[i * 3 + 1] = c.g;
      colorArray[i * 3 + 2] = c.b;
      speeds[i] = 0.2 + Math.random() * 0.6;
    }
    return { positions, colorArray, speeds };
  }, [count, spread, colors]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    const half = spread / 2;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += delta * speeds[i];
      if (arr[i * 3 + 1] > half) arr[i * 3 + 1] = -half;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    // Parallax sutil con el puntero
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.15, 0.04);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.1, 0.04);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        size={0.5}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </points>
  );
}
