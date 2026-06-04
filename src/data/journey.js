/**
 * ============================================================
 *  SECCION 6 - VIAJE ESPACIAL
 * ============================================================
 * Mensajes emotivos que apareceran mientras la camara avanza por
 * el espacio. `at` es la posicion en el scroll de la seccion (0 a 1):
 * 0 = inicio del viaje, 1 = final. Ordenalos de menor a mayor.
 */

export const journeyStops = [
  {
    id: 'j1',
    at: 0.12,
    message: 'Cierra los ojos...',
    sub: 'y dejate llevar.',
  },
  {
    id: 'j2',
    at: 0.30,
    message: 'Cada estrella que pasa',
    sub: 'es un dia que te elegi.',
  },
  {
    id: 'j3',
    at: 0.50,
    message: 'Hemos recorrido tanto',
    sub: 'y apenas empezamos.',
  },
  {
    id: 'j4',
    at: 0.70,
    message: 'No importa cuan lejos lleguemos',
    sub: 'mi destino siempre eres tu.',
  },
  {
    id: 'j5',
    at: 0.90,
    message: 'Gracias por viajar conmigo',
    sub: 'por la vida entera.',
  },
];

export default journeyStops;
