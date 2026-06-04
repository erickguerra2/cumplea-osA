# Carpeta de Musica

Copia aqui tu cancion (mp3 u ogg), por ejemplo `nuestra-cancion.mp3`.

Luego activala en `/src/data/music.js`:

```js
export const music = {
  src: '/music/nuestra-cancion.mp3',
  title: 'Nuestra cancion',
  volume: 0.5,
  loop: true,
};
```

El boton de musica aparecera abajo a la derecha. Los navegadores exigen un
toque del usuario antes de reproducir sonido, asi que la primera reproduccion
siempre se inicia al pulsar el boton.
