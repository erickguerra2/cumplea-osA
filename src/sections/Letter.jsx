import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { config } from '../data/config';
import { letter } from '../data/letter';
import SectionHeader from '../components/SectionHeader';
import Typewriter from '../components/Typewriter';
import { EASE } from '../animations/variants';

export default function Letter() {
  const { eyebrow, title, subtitle } = config.sections.letter;
  const [open, setOpen] = useState(false);

  return (
    <section
      id="letter"
      className="section-shell bg-gradient-to-b from-midnight via-nebula/20 to-midnight"
    >
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={!open ? subtitle : ''} className="mb-12" />

      <div className="perspective relative flex w-full max-w-xl items-center justify-center">
        <AnimatePresence mode="wait">
          {!open ? (
            // ---------- SOBRE CERRADO ----------
            <motion.button
              key="envelope"
              onClick={() => setOpen(true)}
              className="group relative h-56 w-80 cursor-pointer sm:h-64 sm:w-96"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
              transition={{ duration: 0.8, ease: EASE }}
              whileHover={{ y: -6 }}
              aria-label="Abrir la carta"
            >
              {/* Cuerpo del sobre */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-rose-soft to-rose-deep shadow-[0_25px_60px_rgba(224,80,122,0.35)]">
                {/* Solapa triangular */}
                <div
                  className="absolute inset-x-0 top-0 h-1/2 origin-top bg-gradient-to-br from-rose-glow to-rose-deep transition-transform duration-500 group-hover:[transform:rotateX(8deg)]"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                />
                {/* Sello de corazon */}
                <div className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow-lg">
                  ❤
                </div>
              </div>
              <motion.p
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap font-script text-xl text-rose-soft"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                toca para abrir
              </motion.p>
            </motion.button>
          ) : (
            // ---------- CARTA ABIERTA ----------
            <motion.article
              key="letter"
              className="relative w-full max-w-lg rounded-2xl bg-gradient-to-br from-[#fff8f0] to-[#ffeef2] p-8 text-midnight shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:p-10"
              initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{ duration: 1, ease: EASE }}
            >
              {/* Textura sutil de papel */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.6),transparent_60%)]" />
              <div className="relative">
                <p className="mb-5 font-script text-3xl text-rose-deep">{letter.greeting}</p>
                <Typewriter paragraphs={letter.paragraphs} />
                <div className="mt-7 text-right">
                  <p className="font-sans text-sm text-midnight/70">{letter.signature}</p>
                  <p className="font-script text-2xl text-rose-deep">{letter.signatureName}</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="mt-8 w-full rounded-full border border-midnight/10 bg-midnight/5 py-2 font-sans text-xs uppercase tracking-widest text-midnight/60 transition hover:bg-midnight/10"
              >
                Cerrar la carta
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
