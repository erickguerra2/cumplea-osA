import { useEffect, useRef } from 'react';

/**
 * Posicion del mouse normalizada a [-1, 1] en ambos ejes, expuesta como ref
 * (no provoca re-render). Ideal para animaciones de parallax leidas dentro de
 * un requestAnimationFrame o del useFrame de R3F.
 *
 * En dispositivos tactiles permanece en {x:0, y:0}.
 */
export function useMousePosition() {
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      pos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pos.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return pos;
}

export default useMousePosition;
