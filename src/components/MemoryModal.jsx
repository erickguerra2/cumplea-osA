import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

/** Modal elegante para mostrar un recuerdo (foto + texto + fecha). */
export default function MemoryModal({ memory, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {memory && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-midnight/80 backdrop-blur-md" />
          <motion.div
            className="glass-strong relative z-10 w-full max-w-md overflow-hidden rounded-3xl"
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {memory.photo && (
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={memory.photo}
                  alt={memory.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
              </div>
            )}
            <div className="p-6">
              {memory.date && (
                <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-rose-soft/70">
                  {memory.date}
                </p>
              )}
              <h3 className="font-display text-2xl text-white">{memory.title}</h3>
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/70">
                {memory.description}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white/80 transition hover:bg-black/50"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
