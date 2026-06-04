import { useEffect, useRef, useState } from 'react';

/**
 * Monta a sus hijos solo cuando el contenedor se acerca al viewport, y
 * (opcionalmente) los desmonta al alejarse para liberar la GPU. Pensado para
 * envolver Canvases 3D pesados y mantener el rendimiento en movil.
 */
export default function LazyMount({
  children,
  className = '',
  rootMargin = '200px',
  keepMounted = true,
  placeholder = null,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [everSeen, setEverSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setEverSeen(true);
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  const shouldRender = keepMounted ? everSeen : visible;

  return (
    <div ref={ref} className={className}>
      {shouldRender ? children : placeholder}
    </div>
  );
}
