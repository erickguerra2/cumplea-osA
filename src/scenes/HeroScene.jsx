import { Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import StarField from './StarField';
import FloatingParticles from './FloatingParticles';
import Nebula from './Nebula';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { scaledCount, TIER_DPR } from '../utils/performance';

/** Camara que sigue suavemente al puntero para dar profundidad. */
function ParallaxCamera() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 1.6, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 1.0, 0.03);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Fondo 3D del hero: nebulosa + estrellas + polvo estelar con parallax de
 * camara. Se adapta al tier del dispositivo.
 */
export default function HeroScene() {
  const tier = useDeviceTier();
  const stars = scaledCount(1600, tier);
  const dust = scaledCount(260, tier);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={TIER_DPR[tier]}
      camera={{ position: [0, 0, 14], fov: 60 }}
      gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={null}>
        <ParallaxCamera />
        <ambientLight intensity={0.6} />
        <StarField count={stars} radius={70} size={0.3} speed={0.015} />
        <FloatingParticles count={dust} spread={20} />
        {/* Nebulosa procedural (shader). En tier bajo se omite por rendimiento */}
        {tier !== 'low' && <Nebula position={[0, 0, -10]} opacity={0.5} />}
      </Suspense>
    </Canvas>
  );
}
