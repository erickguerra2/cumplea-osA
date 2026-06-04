import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { config } from '../data/config';
import { finale } from '../data/finale';
import Fireworks from '../components/Fireworks';
import { useLenis } from '../components/SmoothScroll';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { scaledCount } from '../utils/performance';
import { EASE } from '../animations/variants';

export default function Finale() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const lenis = useLenis();
  const tier = useDeviceTier();

  // Corazones que flotan hacia arriba
  const hearts = useMemo(() => {
    const n = scaledCount(18, tier);
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 12 + Math.random() * 22,
      delay: Math.random() * 6,
      dur: 7 + Math.random() * 7,
    }));
  }, [tier]);

  const replay = () => {
    if (lenis) lenis.scrollTo(0, { duration: 2.4 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={ref}
      id="finale"
      className="section-shell bg-gradient-to-b from-midnight via-[#1a0a1f] to-[#05030f]"
    >
      {/* Fuegos artificiales */}
      <Fireworks active={inView} />

      {/* Corazones flotantes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute bottom-[-10%] text-rose-glow/70"
            style={{ left: `${h.left}%`, fontSize: h.size }}
            animate={{ y: ['0vh', '-115vh'], opacity: [0, 0.9, 0.9, 0], rotate: [0, 12, -8, 0] }}
            transition={{ duration: h.dur, repeat: Infinity, delay: h.delay, ease: 'easeOut' }}
          >
            ❤
          </motion.span>
        ))}
      </div>

      {/* Mensaje central */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="mb-6 font-sans text-xs uppercase tracking-[0.4em] text-rose-soft/70"
        >
          {finale.eyebrow}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(14px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE }}
          className="whitespace-pre-line font-display text-5xl font-medium leading-tight text-gradient text-glow sm:text-6xl md:text-7xl"
        >
          {finale.message}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="mt-8 max-w-md whitespace-pre-line font-sans text-base font-light leading-relaxed text-white/70"
        >
          {finale.closing}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 font-script text-3xl text-rose-soft"
        >
          {finale.signature} — {config.recipientName}
        </motion.p>

        <motion.button
          onClick={replay}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="glass mt-12 rounded-full px-7 py-3 font-sans text-sm tracking-wide text-white transition hover:bg-white/10"
        >
          ↻ {finale.replayLabel}
        </motion.button>
      </div>
    </section>
  );
}
