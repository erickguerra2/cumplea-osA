import { useEffect, useRef } from 'react';
import { useDeviceTier } from '../hooks/useDeviceTier';
import { prefersReducedMotion } from '../utils/performance';

const COLORS = ['#ff8fb1', '#ffc2d4', '#f5d491', '#7c5cff', '#ffffff'];

/**
 * Fuegos artificiales suaves en canvas 2D. Ligero y auto-limitado: lanza
 * cohetes esporadicos que estallan en particulas con gravedad y fade.
 * Solo se activa cuando `active` es true (p. ej. al ver el final).
 */
export default function Fireworks({ active = true }) {
  const canvasRef = useRef(null);
  const tier = useDeviceTier();

  useEffect(() => {
    if (!active || prefersReducedMotion()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let dpr = Math.min(window.devicePixelRatio || 1, tier === 'low' ? 1 : 1.5);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, tier === 'low' ? 1 : 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const burstSize = tier === 'low' ? 26 : tier === 'medium' ? 44 : 64;
    const maxInterval = tier === 'low' ? 1400 : 900;

    const launch = () => {
      const x = window.innerWidth * (0.2 + Math.random() * 0.6);
      const y = window.innerHeight * (0.2 + Math.random() * 0.35);
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < burstSize; i++) {
        const angle = (Math.PI * 2 * i) / burstSize;
        const speed = 1.5 + Math.random() * 3.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
          size: 1.5 + Math.random() * 1.5,
        });
      }
    };

    let lastLaunch = 0;
    const loop = (t) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      if (t - lastLaunch > maxInterval * (0.6 + Math.random() * 0.8)) {
        launch();
        lastLaunch = t;
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.04; // gravedad
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.012;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [active, tier]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
