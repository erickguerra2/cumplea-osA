/**
 * ============================================================
 *  SECCION 2 - NUESTRA HISTORIA (timeline)
 * ============================================================
 * Cada objeto es un hito del timeline. Para reemplazar una foto,
 * cambia `photo` por la ruta de tu imagen (p. ej. '/photos/01.jpg')
 * y borra la linea de `placeholder(...)`.
 *
 * Puedes anadir o quitar momentos libremente: la UI se adapta sola.
 */
import { placeholder } from '../utils/placeholder';

export const storyMoments = [
  {
    id: 'm1',
    date: 'El comienzo',
    title: 'Cuando te conoci',
    description:
      'No sabia que ese dia cambiaria mi vida para siempre. Una sonrisa fue suficiente para que todo tuviera sentido.',
    photo: '/photos/1.webp',
  },
  {
    id: 'm2',
    date: 'Nuestra primera cita',
    title: 'Las primeras horas',
    description:
      'Hablamos durante horas y el tiempo desaparecio. Supe que queria muchos dias mas como ese, contigo.',
    photo: '/photos/2.webp',
  },
  {
    id: 'm3',
    date: 'Nuestro primer viaje',
    title: 'Descubriendo el mundo juntos',
    description:
      'Cada lugar nuevo se volvio nuestro. Aprendi que mi sitio favorito siempre es donde estas tu.',
    photo: '/photos/3.webp',
  },
  {
    id: 'm4',
    date: 'Un dia cualquiera',
    title: 'Lo cotidiano contigo',
    description:
      'Descubri que la felicidad tambien vive en lo simple: cocinar, reir, abrazarnos sin razon.',
    photo: '/photos/4.webp',
  },
  {
    id: 'm5',
    date: 'Hoy',
    title: 'Y aqui seguimos',
    description:
      'Cada dia te elijo de nuevo. Gracias por tanto. Este es solo el comienzo de todo lo que viene.',
    photo: '/photos/5.webp',
  },
];

export default storyMoments;
