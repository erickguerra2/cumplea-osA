import { motion } from 'framer-motion';

/**
 * Pantalla de carga cinematografica. Se muestra hasta que `progress` llega a
 * 100 y luego se desvanece. Un corazon late mientras carga.
 */
export default function Preloader({ progress = 0, onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => progress >= 100 && onDone?.()}
      style={{ pointerEvents: progress >= 100 ? 'none' : 'auto' }}
    >
      <motion.div
        className="text-6xl"
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        ❤
      </motion.div>

      <div className="mt-10 h-px w-48 overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-rose-glow to-aurora"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeOut', duration: 0.4 }}
        />
      </div>

      <p className="mt-5 font-display text-sm tracking-[0.35em] text-white/50">
        {Math.round(progress)}%
      </p>
      <p className="mt-2 font-script text-lg text-rose-soft/70">preparando un viaje para ti...</p>
    </motion.div>
  );
}
