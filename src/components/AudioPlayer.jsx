import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { music } from '../data/music';

/**
 * Reproductor flotante minimal. Solo aparece si hay una cancion configurada
 * en /src/data/music.js. Los navegadores bloquean el autoplay con sonido, por
 * eso siempre requiere un toque del usuario para empezar.
 */
export default function AudioPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = music.volume ?? 0.5;
    el.loop = music.loop ?? true;
  }, []);

  if (!music.src) return null;

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      /* el navegador bloqueo la reproduccion: se reintenta al proximo toque */
    }
  };

  return (
    <>
      <audio ref={audioRef} src={music.src} preload="none" />
      <motion.button
        onClick={toggle}
        aria-label={playing ? 'Pausar musica' : 'Reproducir musica'}
        className="glass fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full px-4 py-3 text-white/90 transition-colors hover:bg-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Visualizador de 3 barras */}
        <span className="flex h-4 items-end gap-[3px]">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] rounded-full bg-rose-soft"
              animate={
                playing
                  ? { height: ['35%', '100%', '50%', '85%', '35%'] }
                  : { height: '35%' }
              }
              transition={
                playing
                  ? { duration: 1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }
                  : { duration: 0.3 }
              }
              style={{ height: '35%' }}
            />
          ))}
        </span>
        <AnimatePresence>
          <motion.span
            key={playing ? 'on' : 'off'}
            className="hidden font-sans text-xs tracking-wide text-white/70 sm:inline"
          >
            {playing ? music.title || 'Reproduciendo' : 'Musica'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </>
  );
}
