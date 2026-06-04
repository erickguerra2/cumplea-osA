/**
 * ============================================================
 *  CONFIGURACION GLOBAL
 * ============================================================
 * Empieza por aqui. Cambia los nombres, el titulo y los textos
 * principales. El resto del contenido vive en los otros archivos
 * de esta carpeta (story, gallery, letter, constellation, journey,
 * finale, music).
 */

export const config = {
  // Nombre de tu novia (aparece en el hero y en el cierre)
  recipientName: 'Mi Amor',

  // Tu nombre / firma (aparece en la carta y el final)
  senderName: 'Con todo mi corazon',

  // Textos del HERO (Seccion 1)
  hero: {
    eyebrow: 'Feliz Cumpleanos',
    title: 'Un viaje por\nnuestros recuerdos',
    subtitle:
      'Hoy el universo celebra el dia en que llegaste para iluminarlo todo. Desplazate y viajemos juntos.',
    scrollHint: 'Desliza para comenzar',
  },

  // Encabezados de cada seccion (titulo + subtitulo)
  sections: {
    story: {
      eyebrow: 'Capitulo 01',
      title: 'Nuestra Historia',
      subtitle: 'Cada momento que nos trajo hasta aqui.',
    },
    gallery: {
      eyebrow: 'Capitulo 02',
      title: 'Galeria de Momentos',
      subtitle: 'Instantes que guardo para siempre.',
    },
    letter: {
      eyebrow: 'Capitulo 03',
      title: 'Una Carta Para Ti',
      subtitle: 'Toca el sobre para abrirlo.',
    },
    constellation: {
      eyebrow: 'Capitulo 04',
      title: 'Constelacion de Recuerdos',
      subtitle: 'Cada estrella es un momento nuestro. Tocala.',
    },
    journey: {
      eyebrow: 'Capitulo 05',
      title: 'Viaje Espacial',
      subtitle: 'Atraviesa el cosmos de nuestra historia.',
    },
    finale: {
      eyebrow: 'El final... o el comienzo',
      title: '',
      subtitle: '',
    },
  },

  // Activa/desactiva el reproductor de musica global
  enableMusic: true,

  // Color de acento principal (afecta brillos y detalles)
  accent: '#ff8fb1',
};

export default config;
