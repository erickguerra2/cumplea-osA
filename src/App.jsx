import { Suspense, lazy, useEffect, useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Preloader from './components/Preloader';
import AudioPlayer from './components/AudioPlayer';
import Hero from './sections/Hero';
import { config } from './data/config';

// Code splitting: cada seccion se carga bajo demanda
const Story = lazy(() => import('./sections/Story'));
const Gallery = lazy(() => import('./sections/Gallery'));
const Letter = lazy(() => import('./sections/Letter'));
const Constellation = lazy(() => import('./sections/Constellation'));
const Journey = lazy(() => import('./sections/Journey'));
const Finale = lazy(() => import('./sections/Finale'));

/** Espaciador de carga para secciones perezosas (evita saltos de layout). */
const SectionFallback = () => <div className="min-h-[60vh] w-full" aria-hidden />;

export default function App() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Barra de carga: avanza suave y se completa al cargar la ventana
  useEffect(() => {
    let value = 0;
    const id = setInterval(() => {
      value = Math.min(value + Math.random() * 18, 92);
      setProgress(value);
    }, 180);

    const finish = () => {
      clearInterval(id);
      setProgress(100);
    };
    if (document.readyState === 'complete') {
      setTimeout(finish, 600);
    } else {
      window.addEventListener('load', () => setTimeout(finish, 400));
    }
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {!loaded && <Preloader progress={progress} onDone={() => setLoaded(true)} />}

      <SmoothScroll>
        <ScrollProgress />

        <main className="relative w-full">
          <Hero />

          <Suspense fallback={<SectionFallback />}>
            <Story />
            <Gallery />
            <Letter />
            <Constellation />
            <Journey />
            <Finale />
          </Suspense>
        </main>

        {config.enableMusic && <AudioPlayer />}
      </SmoothScroll>
    </>
  );
}
