import { motion, useScroll, useSpring } from 'framer-motion';

/** Barra de progreso superior, ligada al scroll global de la pagina. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-gradient-to-r from-rose-glow via-gold to-aurora"
      style={{ scaleX }}
    />
  );
}
