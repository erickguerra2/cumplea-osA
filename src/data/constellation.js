/**
 * ============================================================
 *  SECCION 5 - CONSTELACION DE RECUERDOS
 * ============================================================
 * Cada estrella es un recuerdo. `x` e `y` son posiciones relativas
 * (0 a 1) dentro del cielo; ajustalas para "dibujar" tu constelacion.
 * `connectTo` (opcional) traza una linea hacia el id indicado.
 *
 * Reemplaza `photo` por tus fotos reales cuando quieras.
 */
import { placeholder } from '../utils/placeholder';

export const constellationMemories = [
  {
    id: 'c1',
    x: 0.18,
    y: 0.30,
    size: 1.4,
    title: 'El primer mensaje',
    date: 'Donde todo empezo',
    description: 'Un simple "hola" que se convirtio en mi conversacion favorita.',
    photo: placeholder({ seed: 0, label: 'Primer mensaje', emoji: '💬', w: 600, h: 600 }),
    connectTo: 'c2',
  },
  {
    id: 'c2',
    x: 0.34,
    y: 0.52,
    size: 1.1,
    title: 'La primera risa',
    date: 'Inolvidable',
    description: 'Me hiciste reir como nunca. Ahi supe que eras especial.',
    photo: placeholder({ seed: 1, label: 'Primera risa', emoji: '😂', w: 600, h: 600 }),
    connectTo: 'c3',
  },
  {
    id: 'c3',
    x: 0.52,
    y: 0.34,
    size: 1.6,
    title: 'Te dije lo que sentia',
    date: 'El gran salto',
    description: 'El corazon me latia fuerte. Valio cada segundo.',
    photo: placeholder({ seed: 2, label: 'Lo que siento', emoji: '❤', w: 600, h: 600 }),
    connectTo: 'c4',
  },
  {
    id: 'c4',
    x: 0.68,
    y: 0.58,
    size: 1.2,
    title: 'Nuestra cancion',
    date: 'Suena y pienso en ti',
    description: 'Cada vez que la escucho, vuelvo a ese momento contigo.',
    photo: placeholder({ seed: 3, label: 'Nuestra cancion', emoji: '🎵', w: 600, h: 600 }),
    connectTo: 'c5',
  },
  {
    id: 'c5',
    x: 0.82,
    y: 0.32,
    size: 1.5,
    title: 'Hoy y siempre',
    date: 'Por venir',
    description: 'Lo mejor aun esta por escribirse, y quiero hacerlo contigo.',
    photo: placeholder({ seed: 4, label: 'Hoy y siempre', emoji: '🌟', w: 600, h: 600 }),
    connectTo: null,
  },
];

export default constellationMemories;
