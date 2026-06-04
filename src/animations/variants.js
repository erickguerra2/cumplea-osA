/**
 * Variantes reutilizables de Framer Motion.
 * Curvas de easing tipo "cinematic" (suaves al entrar y salir).
 */

export const EASE = [0.22, 1, 0.36, 1];
export const EASE_OUT = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.12 },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: EASE, delay: i * 0.1 },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: EASE_OUT, delay: i * 0.1 },
  }),
};

export const blurReveal = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { duration: 1.2, ease: EASE, delay: i * 0.1 },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

/** Letra por letra para titulos cinematograficos. */
export const charContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.2 } },
};

export const charReveal = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -40 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};
