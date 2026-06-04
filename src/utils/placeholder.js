/**
 * Generador de imagenes placeholder en formato SVG data-URI.
 *
 * Se usa mientras no tengas tus fotos reales. Funciona igual de bien como
 * `src` de un <img> que como textura de Three.js (TextureLoader acepta
 * data-URIs). Para reemplazarlo por una foto real, en los archivos de
 * /src/data simplemente cambia el valor por la ruta de tu imagen, p. ej.
 * '/photos/primera-cita.jpg'.
 */

const PALETTES = [
  ['#2a1b4a', '#e0507a'],
  ['#0a0820', '#7c5cff'],
  ['#3a1f3d', '#ff8fb1'],
  ['#102a43', '#f5d491'],
  ['#1a1530', '#ffc2d4'],
  ['#241b3a', '#9d7bff'],
];

const escape = (str) =>
  encodeURIComponent(str).replace(/'/g, '%27').replace(/"/g, '%22');

/**
 * @param {Object} opts
 * @param {number} [opts.seed]   - elige la paleta de color de forma estable
 * @param {string} [opts.label]  - texto principal (p. ej. una fecha o titulo)
 * @param {string} [opts.emoji]  - emoji decorativo central
 * @param {number} [opts.w]
 * @param {number} [opts.h]
 */
export function placeholder({ seed = 0, label = '', emoji = '✨', w = 800, h = 1000 } = {}) {
  const [c1, c2] = PALETTES[Math.abs(seed) % PALETTES.length];
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>
  <defs>
    <linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${c1}'/>
      <stop offset='100%' stop-color='${c2}'/>
    </linearGradient>
    <radialGradient id='glow' cx='50%' cy='38%' r='60%'>
      <stop offset='0%' stop-color='rgba(255,255,255,0.35)'/>
      <stop offset='100%' stop-color='rgba(255,255,255,0)'/>
    </radialGradient>
  </defs>
  <rect width='${w}' height='${h}' fill='url(#bg)'/>
  <rect width='${w}' height='${h}' fill='url(#glow)'/>
  <text x='50%' y='42%' font-size='${Math.round(w * 0.22)}' text-anchor='middle' dominant-baseline='middle'>${escape(emoji)}</text>
  ${label ? `<text x='50%' y='62%' font-family='Georgia, serif' font-size='${Math.round(w * 0.05)}' fill='rgba(255,255,255,0.92)' text-anchor='middle' dominant-baseline='middle'>${escape(label)}</text>` : ''}
  <text x='50%' y='94%' font-family='monospace' font-size='${Math.round(w * 0.028)}' fill='rgba(255,255,255,0.45)' text-anchor='middle'>reemplaza esta foto</text>
</svg>`.trim();

  return `data:image/svg+xml;charset=utf-8,${escape(svg)}`;
}
