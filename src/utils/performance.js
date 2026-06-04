/**
 * Deteccion de "tier" del dispositivo para escalar la calidad de los efectos.
 *
 * La regla de oro de esta experiencia: en movil o equipos modestos reducimos
 * el numero de particulas y el device-pixel-ratio para mantener 60fps, sin
 * sacrificar el impacto visual.
 */

const isBrowser = typeof window !== 'undefined';

export function getDeviceTier() {
  if (!isBrowser) return 'high';

  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4; // GB, solo Chrome
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const coarse = window.matchMedia?.('(pointer: coarse)')?.matches;

  if (isMobile || coarse) {
    return cores >= 8 && memory >= 6 ? 'medium' : 'low';
  }
  if (cores <= 4 || memory <= 4) return 'medium';
  return 'high';
}

/** Multiplicador para contar particulas/estrellas segun el tier. */
export const TIER_SCALE = {
  low: 0.35,
  medium: 0.65,
  high: 1,
};

/** Device pixel ratio recomendado por tier (cap para no quemar GPUs moviles). */
export const TIER_DPR = {
  low: [1, 1.25],
  medium: [1, 1.5],
  high: [1, 2],
};

export function scaledCount(base, tier) {
  return Math.max(1, Math.round(base * (TIER_SCALE[tier] ?? 1)));
}

export function prefersReducedMotion() {
  if (!isBrowser) return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}
