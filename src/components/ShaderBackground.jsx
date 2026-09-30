import { useEffect, useRef } from 'react'

// Full-bleed WebGL "liquid ink" background. Domain-warped fbm noise that bends
// toward the cursor. Pauses when off-screen, falls back to CSS if no WebGL.

const VERTEX = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`

const FRAGMENT = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  vec2 m = (uMouse - 0.5 * uResolution.xy) / uResolution.y;

  float t = uTime * 0.06;
  float d = length(p - m);
  vec2 pull = (m - p) * 0.35 * exp(-d * 2.4);

  vec2 q = vec2(fbm(p * 1.6 + pull + t), fbm(p * 1.6 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p * 1.6 + 4.0 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p * 1.6 + 4.0 * q + vec2(8.3, 2.8) - t));
  float f = fbm(p * 1.6 + 4.0 * r);

  vec3 base = vec3(0.027, 0.027, 0.035);
  vec3 deep = vec3(0.05, 0.11, 0.22);
  vec3 teal = vec3(0.0, 0.55, 0.6);
  vec3 lime = vec3(0.78, 1.0, 0.18);

  vec3 col = mix(base, deep, clamp(f * f * 2.2, 0.0, 1.0));
  col = mix(col, teal, clamp(length(q) * 0.55 - 0.18, 0.0, 1.0) * 0.55);
  col = mix(col, lime, smoothstep(0.72, 0.98, f) * 0.35);
  col += lime * 0.10 * exp(-d * 6.0);

  // Vignette + fade to page background at the bottom edge.
  float vig = smoothstep(1.25, 0.2, length(p * vec2(0.8, 1.0)));
  col *= mix(0.35, 1.0, vig);
  col = mix(base, col, smoothstep(0.0, 0.35, uv.y));

  gl_FragColor = vec4(col, 1.0);
}
`

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const gl = canvas.getContext('webgl', { antialias: false, powerPreference: 'high-performance' })
    if (!gl) {
      canvas.classList.add('is-fallback')
      return undefined
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vs || !fs) {
      canvas.classList.add('is-fallback')
      return undefined
    }

    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, 'uResolution')
    const uMouse = gl.getUniformLocation(program, 'uMouse')
    const uTime = gl.getUniformLocation(program, 'uTime')

    // Render below native resolution — the noise is soft so nobody can tell.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      canvas.width = Math.max(1, Math.floor(clientWidth * scale))
      canvas.height = Math.max(1, Math.floor(clientHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      if (!mouse.x && !mouse.y) {
        mouse.x = mouse.tx = canvas.width * 0.7
        mouse.y = mouse.ty = canvas.height * 0.55
      }
    }
    resize()

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      mouse.tx = (event.clientX - rect.left) * scale
      mouse.ty = (rect.height - (event.clientY - rect.top)) * scale
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let visible = true
    let frame = 0
    const start = performance.now()

    const render = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform1f(uTime, reduced ? 12 : (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (visible && !reduced) frame = requestAnimationFrame(render)
    }
    render()

    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = visible
      visible = entry.isIntersecting
      if (visible && !wasVisible && !reduced) frame = requestAnimationFrame(render)
    })
    observer.observe(canvas)

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return <canvas ref={canvasRef} className={`shader-canvas ${className}`.trim()} aria-hidden="true" />
}

export default ShaderBackground
