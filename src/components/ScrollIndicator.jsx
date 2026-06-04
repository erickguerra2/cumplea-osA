import { motion } from 'framer-motion';

/** Indicador de scroll animado (raton + texto opcional). */
export default function ScrollIndicator({ label }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
    >
      {label && (
        <span className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-white/50">
          {label}
        </span>
      )}
      <div className="relative flex h-10 w-6 justify-center rounded-full border border-white/30 p-1">
        <motion.span
          className="h-2 w-1 rounded-full bg-rose-soft"
          animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}
