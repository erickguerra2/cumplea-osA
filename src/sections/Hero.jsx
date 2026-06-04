import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { config } from '../data/config';
import { EASE } from '../animations/variants';
import ScrollIndicator from '../components/ScrollIndicator';

const HeroScene = lazy(() => import('../scenes/HeroScene'));

export default function Hero() {
  const { eyebrow, title, subtitle, scrollHint } = config.hero;
  const lines = title.split('\n');

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Fondo 3D */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmos via-midnight to-midnight">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Vinetas para profundidad */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,3,15,0.85)_100%)]" />

      {/* Contenido */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: EASE }}
          className="mb-6 font-script text-2xl text-rose-soft text-glow md:text-3xl"
        >
          {eyebrow}
        </motion.p>

        <h1 className="font-display text-5xl font-medium leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              className="block text-gradient"
              initial={{ opacity: 0, y: 60, filter: 'blur(14px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.9 + i * 0.25, duration: 1.2, ease: EASE }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1, ease: EASE }}
          className="mt-8 max-w-md font-sans text-base font-light text-white/70 md:text-lg"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <ScrollIndicator label={scrollHint} />
      </div>
    </section>
  );
}
