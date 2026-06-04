import { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Escribe `paragraphs` (array de strings) uno tras otro con efecto maquina de
 * escribir. Si el usuario prefiere menos movimiento, muestra todo de golpe.
 */
export default function Typewriter({ paragraphs = [], speed = 28, start = true, onDone }) {
  const reduced = useReducedMotion();
  const [text, setText] = useState(reduced ? paragraphs : []);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    if (!start || reduced) {
      if (reduced) setText(paragraphs);
      return;
    }
    let para = 0;
    let char = 0;
    let cancelled = false;
    const out = paragraphs.map(() => '');

    const tick = () => {
      if (cancelled) return;
      if (para >= paragraphs.length) {
        setDone(true);
        onDone?.();
        return;
      }
      const current = paragraphs[para];
      out[para] = current.slice(0, char + 1);
      setText([...out]);
      char += 1;
      if (char >= current.length) {
        para += 1;
        char = 0;
        setTimeout(tick, 420); // pausa entre parrafos
      } else {
        setTimeout(tick, speed);
      }
    };
    const id = setTimeout(tick, 300);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, reduced]);

  return (
    <div className="space-y-4">
      {(text.length ? text : paragraphs.map(() => '')).map((p, i) => (
        <p key={i} className="font-sans text-[0.95rem] font-light leading-relaxed text-midnight/80">
          {p}
          {!done && !reduced && i === text.length - 1 && p.length > 0 && (
            <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-rose-deep align-middle" />
          )}
        </p>
      ))}
    </div>
  );
}
