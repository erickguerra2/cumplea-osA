import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { galleryPhotos } from '../data/gallery';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { TIER_DPR } from '../utils/performance';
import CanvasLoader from '../components/CanvasLoader';

/** Distribuye las fotos en una rejilla curva (arco) centrada. */
function layout(index, total) {
  const perRow = total > 4 ? 3 : Math.min(total, 3);
  const row = Math.floor(index / perRow);
  const col = index % perRow;
  const rows = Math.ceil(total / perRow);

  const x = (col - (perRow - 1) / 2) * 3.0;
  const y = ((rows - 1) / 2 - row) * 3.0;
  // Curvatura: las fotos de los lados se acercan en z
  const z = -Math.abs(x) * 0.35;
  return [x, y, z];
}

function Photo({ data, position, onSelect }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered ? 1.12 : 1;
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, target, 0.12);
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, target, 0.12);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group position={position}>
        <Image
          ref={ref}
          url={data.photo}
          transparent
          radius={0.12}
          scale={[2.4, 2.4]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(data);
          }}
        />
        {hovered && (
          <Html center distanceFactor={9} position={[0, -1.6, 0]}>
            <div className="glass-strong pointer-events-none w-44 -translate-y-2 rounded-xl px-3 py-2 text-center">
              <p className="font-display text-sm text-white">{data.title}</p>
              <p className="mt-0.5 font-sans text-[0.65rem] text-white/60">{data.caption}</p>
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}

/** Grupo que reacciona suavemente al puntero (efecto de mirar alrededor). */
function Rig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, state.pointer.x * 0.25, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -state.pointer.y * 0.18, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

export default function GalleryScene({ onSelect }) {
  const tier = useDeviceTier();
  const total = galleryPhotos.length;

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={TIER_DPR[tier]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: tier !== 'low', alpha: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <Rig>
          {galleryPhotos.map((p, i) => (
            <Photo key={p.id} data={p} position={layout(i, total)} onSelect={onSelect} />
          ))}
        </Rig>
      </Suspense>
    </Canvas>
  );
}
