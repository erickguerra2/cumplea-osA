import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../data/config';
import { constellationMemories } from '../data/constellation';
import SectionHeader from '../components/SectionHeader';
import MemoryModal from '../components/MemoryModal';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { scaledCount } from '../utils/performance';

export default function Constellation() {
  const { eyebrow, title, subtitle } = config.sections.constellation;
  const [selected, setSelected] = useState(null);
  const tier = useDeviceTier();

  // Estrellas de fondo (decorativas)
  const bgStars = useMemo(() => {
    const n = scaledCount(90, tier);
    return Array.from({ length: n }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      dur: 2 + Math.random() * 3,
    }));
  }, [tier]);

  const byId = useMemo(
    () => Object.fromEntries(constellationMemories.map((m) => [m.id, m])),
    []
  );

  return (
    <section
      id="constellation"
      className="section-shell bg-gradient-to-b from-midnight via-[#0a0820] to-midnight"
    >
      {/* Estrellas de fondo */}
      <div className="pointer-events-none absolute inset-0">
        {bgStars.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
          />
        ))}
      </div>

      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} className="relative z-10 mb-10" />

      {/* Cielo interactivo */}
      <div className="relative z-10 aspect-[16/10] w-full max-w-4xl">
        {/* Lineas de conexion */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {constellationMemories.map((m) => {
            if (!m.connectTo || !byId[m.connectTo]) return null;
            const t = byId[m.connectTo];
            return (
              <motion.line
                key={`${m.id}-${m.connectTo}`}
                x1={m.x * 100}
                y1={m.y * 100}
                x2={t.x * 100}
                y2={t.y * 100}
                stroke="url(#cgrad)"
                strokeWidth="0.25"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            );
          })}
          <defs>
            <linearGradient id="cgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff8fb1" />
              <stop offset="100%" stopColor="#7c5cff" />
            </linearGradient>
          </defs>
        </svg>

        {/* Estrellas-recuerdo */}
        {constellationMemories.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => setSelected(m)}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${m.x * 100}%`, top: `${m.y * 100}%` }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.18, type: 'spring', stiffness: 200, damping: 14 }}
            aria-label={`Recuerdo: ${m.title}`}
          >
            {/* Halo */}
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-glow/40 blur-md transition-all duration-300 group-hover:bg-rose-glow/70"
              style={{ width: 22 * m.size, height: 22 * m.size }}
            />
            {/* Nucleo */}
            <motion.span
              className="relative block rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,143,177,0.6)]"
              style={{ width: 8 * m.size, height: 8 * m.size }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
            />
            {/* Etiqueta al hover */}
            <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full glass px-3 py-1 font-sans text-[0.65rem] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {m.title}
            </span>
          </motion.button>
        ))}
      </div>

      <MemoryModal memory={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
