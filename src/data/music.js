/**
 * ============================================================
 *  MUSICA
 * ============================================================
 * Para anadir tu cancion:
 *   1. Copia tu archivo (mp3/ogg) a la carpeta /public, p. ej.
 *      /public/music/nuestra-cancion.mp3
 *   2. Pon la ruta en `src` (sin "public", queda '/music/nuestra-cancion.mp3').
 *   3. Listo: el boton de musica aparecera abajo a la derecha.
 *
 * Si `src` queda vacio, el boton de musica no se muestra.
 */

export const music = {
  // Ruta al archivo de audio (relativa a /public). Vacio = sin musica.
  src: '',

  // Titulo que se muestra junto al reproductor
  title: 'Nuestra cancion',
  artist: '',

  // Volumen inicial (0 a 1)
  volume: 0.5,

  // Reproducir en bucle
  loop: true,
};

export default music;
