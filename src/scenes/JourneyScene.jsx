import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Float } from '@react-three/drei';
import * as THREE from 'three';
import { getCircleTexture } from '../utils/textures';
import { storyMoments } from '../data/story';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { scaledCount, TIER_DPR } from '../utils/performance';
import CanvasLoader from '../components/CanvasLoader';

const TUNNEL_LENGTH = 220;
const CAM_START = 12;
const CAM_END = -200;

/** Estrellas distribuidas en un tubo largo; la camara las atraviesa. */
function WarpTunnel({ count }) {
  const ref = useRef();
  const texture = useMemo(() => getCircleTexture(), []);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 9;
      const angle = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = Math.sin(angle) * radius;
      arr[i * 3 + 2] = -Math.random() * TUNNEL_LENGTH;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#cdb8ff"
        size={0.45}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.9}
      />
    </points>
  );
}

/** Foto-recuerdo flotando junto al camino del viaje. */
function FloatingMemory({ url, position }) {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Image url={url} transparent radius={0.1} scale={[2.2, 2.8]} position={position} />
    </Float>
  );
}

/** Mueve la camara a lo largo del tunel segun el progreso del scroll (ref). */
function CameraDolly({ progressRef }) {
  useFrame((state) => {
    const p = progressRef.current ?? 0;
    const targetZ = THREE.MathUtils.lerp(CAM_START, CAM_END, p);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.08);
    // Balanceo sutil para sensacion de vuelo
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.6 + state.pointer.x * 0.8;
    state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.25) * 0.4 + state.pointer.y * 0.5;
    state.camera.lookAt(0, 0, state.camera.position.z - 10);
  });
  return null;
}

export default function JourneyScene({ progressRef }) {
  const tier = useDeviceTier();
  const stars = scaledCount(2600, tier);

  // Recuerdos repartidos a lo largo del tunel, alternando izquierda/derecha
  const memories = useMemo(
    () =>
      storyMoments.slice(0, 5).map((m, i) => ({
        id: m.id,
        url: m.photo,
        position: [i % 2 === 0 ? -4.5 : 4.5, (i % 3) - 1, -20 - i * 38],
      })),
    []
  );

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={TIER_DPR[tier]}
      camera={{ position: [0, 0, CAM_START], fov: 70 }}
      gl={{ antialias: tier !== 'low', alpha: true, powerPreference: 'high-performance' }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <fog attach="fog" args={['#05030f', 18, 80]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 0, 10]} intensity={1} color="#ff8fb1" />
        <CameraDolly progressRef={progressRef} />
        <WarpTunnel count={stars} />
        {tier !== 'low' &&
          memories.map((m) => <FloatingMemory key={m.id} url={m.url} position={m.position} />)}
      </Suspense>
    </Canvas>
  );
}
