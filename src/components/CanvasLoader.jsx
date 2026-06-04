import { Html, useProgress } from '@react-three/drei';

/** Fallback de Suspense que se muestra dentro de un Canvas mientras carga. */
export default function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-rose-glow" />
        <span className="font-sans text-xs tracking-widest text-white/50">
          {Math.round(progress)}%
        </span>
      </div>
    </Html>
  );
}
