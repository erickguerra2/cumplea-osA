/**
 * ============================================================
 *  SECCION 3 - GALERIA 3D
 * ============================================================
 * Fotos distribuidas en un espacio 3D. Recomendado: 6 a 9 fotos.
 * Reemplaza `photo` con la ruta de tu imagen real.
 *
 * Consejo de rendimiento: usa imagenes de ~1000px de ancho y
 * formato .webp para que la galeria cargue ligera en movil.
 */
import { placeholder } from '../utils/placeholder';

export const galleryPhotos = [
  {
    id: 'g1',
    title: 'Tu sonrisa',
    caption: 'Mi lugar favorito del mundo.',
    photo: placeholder({ seed: 0, label: 'Tu sonrisa', emoji: '😊', w: 800, h: 800 }),
  },
  {
    id: 'g2',
    title: 'Aquella tarde',
    caption: 'El cielo nunca fue tan bonito.',
    photo: placeholder({ seed: 1, label: 'Aquella tarde', emoji: '🌇', w: 800, h: 800 }),
  },
  {
    id: 'g3',
    title: 'Risas',
    caption: 'No puedo parar de reir contigo.',
    photo: placeholder({ seed: 2, label: 'Risas', emoji: '😄', w: 800, h: 800 }),
  },
  {
    id: 'g4',
    title: 'Nuestro rincon',
    caption: 'Donde el tiempo se detiene.',
    photo: placeholder({ seed: 3, label: 'Nuestro rincon', emoji: '🌙', w: 800, h: 800 }),
  },
  {
    id: 'g5',
    title: 'Aventuras',
    caption: 'Contigo todo es una aventura.',
    photo: placeholder({ seed: 4, label: 'Aventuras', emoji: '🗺', w: 800, h: 800 }),
  },
  {
    id: 'g6',
    title: 'Para siempre',
    caption: 'Hacia donde quieras, vamos.',
    photo: placeholder({ seed: 5, label: 'Para siempre', emoji: '💫', w: 800, h: 800 }),
  },
];

export default galleryPhotos;
