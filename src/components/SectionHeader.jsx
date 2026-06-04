import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../animations/variants';

/** Encabezado reutilizable: eyebrow + titulo con gradiente + subtitulo. */
export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const alignCls = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <motion.div
      className={`flex flex-col ${alignCls} ${className}`}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="mb-4 font-sans text-xs uppercase tracking-[0.4em] text-rose-soft/70"
        >
          {eyebrow}
        </motion.span>
      )}
      {title && (
        <motion.h2
          variants={fadeUp}
          className="font-display text-4xl font-medium leading-tight text-gradient sm:text-5xl md:text-6xl"
        >
          {title}
        </motion.h2>
      )}
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className="mt-5 max-w-xl font-sans text-base font-light text-white/60 md:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
