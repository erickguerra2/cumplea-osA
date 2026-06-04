/**
 * Shader de nebulosa procedural (fbm noise). Crea un resplandor de color
 * suave y en movimiento detras del hero. Es ligero: una sola pasada en un
 * unico plano. Para desactivarlo, no uses <Nebula /> en la escena.
 */

export const nebulaVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const nebulaFragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  // Ruido pseudo-aleatorio
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }
  // Fractal Brownian Motion
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv * 3.0;
    float t = uTime * 0.05;
    float n = fbm(uv + vec2(t, -t * 0.5));
    n += 0.4 * fbm(uv * 2.0 - vec2(t * 0.3, t));

    vec3 color = mix(uColorA, uColorB, smoothstep(0.2, 0.8, n));

    // Vineta radial para fundir los bordes
    float d = distance(vUv, vec2(0.5));
    float vignette = smoothstep(0.7, 0.2, d);

    float alpha = n * vignette * uOpacity;
    gl_FragColor = vec4(color, alpha);
  }
`;
