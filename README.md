# 💖 Una Experiencia de Cumpleaños

Una experiencia web **interactiva, emocional y cinematográfica** construida como
un viaje por scroll a través de recuerdos. Inspirada en las páginas de producto
de Apple, en Spotify Wrapped y en los portfolios premiados de Awwwards.

> Hecha con amor. Solo tienes que reemplazar las fotos y los textos. ✨

---

## ✨ La experiencia

El usuario vive un viaje narrativo de 7 capítulos, cada uno con su propia
identidad visual y transiciones cinematográficas:

| # | Sección | Qué pasa |
|---|---------|----------|
| 1 | **Hero cinematográfico** | Fondo espacial 3D, estrellas, nebulosa por shader, partículas flotantes y parallax con el mouse. |
| 2 | **Nuestra Historia** | Timeline con parallax multicapa; las fotos flotan en profundidad al hacer scroll. |
| 3 | **Galería 3D** | Fotografías distribuidas en un espacio 3D real, con hover, descripciones y movimiento según el cursor. |
| 4 | **Carta interactiva** | Un sobre que se abre al tocarlo y revela una carta con efecto de máquina de escribir. |
| 5 | **Constelación de recuerdos** | Cada estrella es un recuerdo; al tocarla se abre un modal con foto, fecha y descripción. |
| 6 | **Viaje espacial** | La sección estrella: la cámara viaja por el cosmos guiada por el scroll (R3F + GSAP ScrollTrigger), con mensajes emotivos. |
| 7 | **Final emocional** | Corazones flotantes, fuegos artificiales suaves, mensaje final y botón para revivir el viaje. |

Más un **reproductor de música** flotante opcional.

---

## 🛠️ Stack

- **React 18** + **Vite** — base rápida y moderna.
- **TailwindCSS** — estilos utilitarios y glassmorphism.
- **Framer Motion** — animaciones declarativas y transiciones.
- **GSAP + ScrollTrigger** — animaciones ligadas al scroll (viaje espacial).
- **Three.js + React Three Fiber + Drei** — escenas 3D.
- **Lenis** — scroll suave sincronizado con GSAP.

---

## 🚀 Empezar

Requisitos: **Node 18+**.

```bash
npm install      # instalar dependencias
npm run dev      # entorno de desarrollo  (http://localhost:5173)
npm run build    # build de producción     -> /dist
npm run preview  # previsualizar el build
```

---

## ✏️ Personalizar (sin tocar componentes)

**Todo el contenido vive en `src/data/`.** No necesitas tocar el código de los
componentes para hacerlo tuyo:

| Archivo | Qué controla |
|---------|--------------|
| `data/config.js` | Nombre de tu novia, títulos de cada sección, color de acento, activar música. **Empieza aquí.** |
| `data/story.js` | Los momentos del timeline (Sección 2). |
| `data/gallery.js` | Las fotos de la galería 3D (Sección 3). |
| `data/letter.js` | El texto de la carta (Sección 4). |
| `data/constellation.js` | Los recuerdos-estrella y su posición en el cielo (Sección 5). |
| `data/journey.js` | Los mensajes emotivos del viaje espacial (Sección 6). |
| `data/finale.js` | El mensaje de cierre (Sección 7). |
| `data/music.js` | La canción de fondo. |

### Reemplazar las fotos

Por defecto se muestran **placeholders** generados automáticamente. Para usar
tus fotos:

1. Copia tus imágenes a `public/photos/` (ideal: `.webp`, ~1000 px de ancho).
2. En el archivo de datos correspondiente, cambia la línea `photo:` por la ruta:

   ```js
   // antes
   photo: placeholder({ seed: 0, label: 'El comienzo', emoji: '✨' }),
   // después
   photo: '/photos/primera-cita.webp',
   ```

3. (Opcional) borra el `import { placeholder }` cuando ya no lo uses.

### Añadir música

1. Copia tu canción a `public/music/` (p. ej. `nuestra-cancion.mp3`).
2. Pon la ruta en `data/music.js`:

   ```js
   export const music = { src: '/music/nuestra-cancion.mp3', volume: 0.5, loop: true };
   ```

El botón de música aparecerá abajo a la derecha.

---

## 🧱 Estructura del proyecto

```
src/
├── animations/     # variantes de Framer Motion y setup de GSAP
├── components/     # UI reutilizable (preloader, modal, audio, etc.)
├── data/           # ⭐ TODO el contenido editable vive aquí
├── hooks/          # hooks (device tier, mouse, reduced-motion...)
├── scenes/         # escenas y objetos de Three.js / R3F
├── sections/       # las 7 secciones de la experiencia
├── shaders/        # shaders GLSL (nebulosa procedural)
├── utils/          # placeholders, detección de rendimiento, texturas
├── App.jsx
└── main.jsx
```

---

## ⚡ Rendimiento

Pensado para ir fluido también en móvil:

- **Code splitting**: cada sección y cada escena 3D se cargan bajo demanda
  (`React.lazy` + `Suspense`). Three.js no entra en el bundle inicial.
- **Montaje diferido**: los `Canvas` 3D se montan solo cuando se acercan al
  viewport (`LazyMount` con IntersectionObserver) para liberar la GPU.
- **Escalado por dispositivo** (`utils/performance.js`): el número de partículas,
  estrellas y el *device pixel ratio* se reducen automáticamente en equipos
  modestos. La nebulosa por shader y las fotos flotantes se omiten en gama baja.
- **`prefers-reduced-motion`**: se respeta en animaciones y scroll suave.
- **`lazy loading` de imágenes** (`loading="lazy"`).

Si quieres aún más rendimiento, baja los contadores base en cada escena
(`scaledCount(...)`).

---

## ▲ Desplegar en Vercel

El proyecto ya incluye `vercel.json`. Dos opciones:

**Desde la web de Vercel**
1. Sube el repositorio a GitHub.
2. En Vercel, *New Project* → importa el repo.
3. Framework: **Vite** (se detecta solo). Build: `npm run build`. Output: `dist`.
4. *Deploy*. ¡Listo!

**Desde la terminal**
```bash
npm i -g vercel
vercel        # preview
vercel --prod # producción
```

---

## ♿ Accesibilidad

- Soporte de `prefers-reduced-motion`.
- Modales cerrables con `Escape` y `aria-label`s en los controles.
- Textos con buen contraste sobre los fondos.

---

Hecho con 💖 para un cumpleaños muy especial.
