import * as THREE from 'three';

let circleTexture = null;

/** Textura de un punto circular suave (con halo), cacheada. */
export function getCircleTexture() {
  if (circleTexture) return circleTexture;
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.9)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  circleTexture = new THREE.CanvasTexture(canvas);
  circleTexture.colorSpace = THREE.SRGBColorSpace;
  return circleTexture;
}
