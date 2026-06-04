import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getCircleTexture } from '../utils/textures';

/**
 * Campo de estrellas en una capa esferica. Rota muy lento y parpadea
 * sutilmente. `count` se debe escalar segun el tier del dispositivo.
 */
export default function StarField({
  count = 1200,
  radius = 60,
  size = 0.35,
  color = '#ffffff',
  speed = 0.02,
}) {
  const ref = useRef();
  const texture = useMemo(() => getCircleTexture(), []);

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribucion uniforme en una capa esferica
      const r = radius * (0.6 + Math.random() * 0.4);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = 0.5 + Math.random();
    }
    return { positions, scales };
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed;
    ref.current.rotation.x += delta * speed * 0.4;
    // Parpadeo global suave
    const t = state.clock.elapsedTime;
    ref.current.material.opacity = 0.7 + Math.sin(t * 0.8) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color={color}
        size={size}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.85}
      />
    </points>
  );
}
