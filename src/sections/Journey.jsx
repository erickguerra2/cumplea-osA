import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { config } from '../data/config';
import { journeyStops } from '../data/journey';
import { setupGsap } from '../animations/gsapSetup';
import LazyMount from '../components/LazyMount';
import { EASE } from '../animations/variants';

const JourneyScene = lazy(() => import('../scenes/JourneyScene'));

export default function Journey() {
  const { eyebrow, title, subtitle } = config.sections.journey;
  const containerRef = useRef(null);
  const progressRef = useRef(0); // leido cada frame por la camara (sin re-render)
  const [activeId, setActiveId] = useState(null);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const { gsap, ScrollTrigger } = setupGsap();
    const el = containerRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        progressRef.current = p;
        setIntro(p < 0.06);

        // Determina el mensaje activo (mas cercano dentro de una ventana)
        let nearest = null;
        let best = 0.12;
        for (const s of journeyStops) {
          const d = Math.abs(p - s.at);
          if (d < best) {
            best = d;
            nearest = s.id;
          }
        }
        setActiveId((prev) => (prev === nearest ? prev : nearest));
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(progressRef);
    };
  }, []);

  const activeStop = journeyStops.find((s) => s.id === activeId);

  return (
    // Contenedor alto que define la "duracion" del viaje (scrub)
    <section ref={containerRef} id="journey" className="relative h-[500vh] w-full">
      {/* Capa pegajosa: ocupa la pantalla mientras dura el scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-midnight">
        <LazyMount className="absolute inset-0" rootMargin="400px">
          <Suspense fallback={null}>
            <JourneyScene progressRef={progressRef} />
          </Suspense>
        </LazyMount>

        {/* Intro de la seccion */}
        <AnimatePresence>
          {intro && (
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.6 } }}
            >
              <span className="mb-3 font-sans text-xs uppercase tracking-[0.4em] text-rose-soft/70">
                {eyebrow}
              </span>
              <h2 className="font-display text-4xl text-gradient md:text-6xl">{title}</h2>
              <p className="mt-3 font-sans text-sm font-light text-white/55">{subtitle}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensajes emotivos durante el viaje */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
          <AnimatePresence mode="wait">
            {activeStop && (
              <motion.div
                key={activeStop.id}
                className="text-center"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <p className="font-display text-3xl text-white text-glow md:text-5xl">
                  {activeStop.message}
                </p>
                <p className="mt-3 font-script text-2xl text-rose-soft md:text-3xl">
                  {activeStop.sub}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Vineta */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,3,15,0.7)_100%)]" />
      </div>
    </section>
  );
}
