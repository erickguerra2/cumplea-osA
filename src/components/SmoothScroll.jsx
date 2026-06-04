import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { setupGsap } from '../animations/gsapSetup';
import { useReducedMotion } from '../hooks/useReducedMotion';

const LenisContext = createContext(null);
export const useLenis = () => useContext(LenisContext);

/**
 * Provee scroll suave global con Lenis y lo sincroniza con GSAP ScrollTrigger.
 * Si el usuario prefiere menos movimiento, se desactiva el smoothing.
 */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap, ScrollTrigger } = setupGsap();

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      syncTouch: false, // mejor rendimiento tactil; usa scroll nativo en movil
      touchMultiplier: 1.5,
    });

    instance.on('scroll', ScrollTrigger.update);

    // Un unico loop: el ticker de GSAP conduce a Lenis (evita dos rAF en paralelo)
    const tick = (time) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.off('scroll', ScrollTrigger.update);
      instance.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
