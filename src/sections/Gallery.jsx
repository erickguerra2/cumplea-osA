import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../data/config';
import LazyMount from '../components/LazyMount';
import MemoryModal from '../components/MemoryModal';

const GalleryScene = lazy(() => import('../scenes/GalleryScene'));

export default function Gallery() {
  const { eyebrow, title, subtitle } = config.sections.gallery;
  const [selected, setSelected] = useState(null);

  return (
    <section id="gallery" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      {/* Encabezado superpuesto */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center px-6 pt-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 font-sans text-xs uppercase tracking-[0.4em] text-rose-soft/70"
        >
          {eyebrow}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl text-gradient md:text-5xl"
        >
          {title}
        </motion.h2>
        <p className="mt-3 font-sans text-sm font-light text-white/55">{subtitle}</p>
      </div>

      {/* Escena 3D */}
      <LazyMount className="absolute inset-0" rootMargin="300px">
        <Suspense fallback={null}>
          <GalleryScene onSelect={setSelected} />
        </Suspense>
      </LazyMount>

      <MemoryModal memory={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
