'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

// Vertex Shader
const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
    }
`

// Quality tiers — thread count & FBM octaves baked into shader at compile time
interface QualityTier {
    label: string
    threads: number
    fbmOctaves: number
    dprScale: number   // multiplier on device pixel ratio
    targetFps: number
}

const DESKTOP_TIERS: QualityTier[] = [
    { label: 'ultra',  threads: 60, fbmOctaves: 4, dprScale: 1.0,  targetFps: 60 },
    { label: 'high',   threads: 45, fbmOctaves: 3, dprScale: 0.85, targetFps: 60 },
    { label: 'medium', threads: 30, fbmOctaves: 3, dprScale: 0.7,  targetFps: 45 },
]

const MOBILE_TIERS: QualityTier[] = [
    { label: 'high',   threads: 20, fbmOctaves: 3, dprScale: 0.7,  targetFps: 60 },
    { label: 'medium', threads: 15, fbmOctaves: 2, dprScale: 0.5,  targetFps: 45 },
    { label: 'low',    threads: 10, fbmOctaves: 2, dprScale: 0.5,  targetFps: 30 },
]

function detectInitialTier(isMobile: boolean): { tier: QualityTier, tiers: QualityTier[] } {
    if (isMobile) {
        const cores = navigator.hardwareConcurrency || 2
        const dpr = window.devicePixelRatio || 1
        const memoryGB = (navigator as { deviceMemory?: number }).deviceMemory || 2

        if (cores >= 6 && dpr >= 3 && memoryGB >= 6) return { tier: MOBILE_TIERS[0], tiers: MOBILE_TIERS }
        if (cores >= 4 && dpr >= 2) return { tier: MOBILE_TIERS[1], tiers: MOBILE_TIERS }
        return { tier: MOBILE_TIERS[2], tiers: MOBILE_TIERS }
    }

    const cores = navigator.hardwareConcurrency || 4
    const dpr = window.devicePixelRatio || 1
    const memoryGB = (navigator as { deviceMemory?: number }).deviceMemory || 8
    const screenPixels = window.screen.width * window.screen.height

    if (cores >= 8 && dpr >= 2 && memoryGB >= 8 && screenPixels >= 2073600) return { tier: DESKTOP_TIERS[0], tiers: DESKTOP_TIERS }
    if (cores >= 4 && memoryGB >= 4) return { tier: DESKTOP_TIERS[1], tiers: DESKTOP_TIERS }
    return { tier: DESKTOP_TIERS[2], tiers: DESKTOP_TIERS }
}

// Generate fragment shader with baked-in quality constants
function generateFragmentShader(threads: number, fbmOctaves: number): string {
    return `
    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_clickTime;
    uniform vec2 u_clickPos;

    #define PI 3.14159265359
    #define NUM_THREADS ${threads}.0

    // 2D Simplex Noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
            dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    // Fractal noise — octave count baked in
    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < ${fbmOctaves}; i++) {
            value += amplitude * snoise(p);
            p *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.4;

        // Mouse position
        vec2 mouse = u_mouse * 2.0 - 1.0;
        mouse.x *= u_resolution.x / u_resolution.y;

        // Click ripple
        float clickAge = u_time - u_clickTime;
        vec2 clickPos = u_clickPos * 2.0 - 1.0;
        clickPos.x *= u_resolution.x / u_resolution.y;
        float clickDist = length(p - clickPos);
        float ripple = sin(clickDist * 20.0 - clickAge * 8.0) * exp(-clickAge * 2.0) * exp(-clickDist * 2.0);
        ripple = max(0.0, ripple) * step(0.0, 5.0 - clickAge);

        // Base color - near black
        vec3 color = vec3(0.02, 0.02, 0.02);

        // Color palette
        vec3 white = vec3(0.9, 0.95, 1.0);
        vec3 brightSapphire = vec3(0.2, 0.35, 0.7);
        vec3 brightCyan = vec3(0.2, 0.9, 1.0);

        // === FLOWING VERTICAL THREADS ===
        float threads = 0.0;
        vec3 threadColorAccum = vec3(0.0);

        for (float i = 0.0; i < NUM_THREADS; i++) {
            float threadX = (i / NUM_THREADS) * 2.0 - 1.0;
            threadX *= u_resolution.x / u_resolution.y;

            float seed = i * 0.1;
            float speed = 0.8 + sin(seed * 5.0) * 0.3;
            float amplitude = 0.08 + sin(seed * 7.0) * 0.04;
            float frequency = 3.0 + sin(seed * 11.0) * 1.5;

            // Sine wave oscillation
            float wave = sin(p.y * frequency + t * speed + seed * 10.0) * amplitude;

            // Organic noise offset
            float noiseOffset = fbm(vec2(p.y * 0.5 + seed, t * 0.3)) * 0.06;

            float finalX = threadX + wave + noiseOffset;

            // === MOUSE DISTORTION ===
            vec2 threadPos = vec2(finalX, p.y);
            vec2 toMouse = threadPos - mouse;
            float mouseDist = length(toMouse);
            float distortion = max(0.0, 1.0 - mouseDist / 0.4);
            distortion = distortion * distortion * distortion;
            finalX += normalize(toMouse + 0.001).x * distortion * 0.15;

            // Click ripple distortion
            finalX += ripple * 0.03 * sin(i * 0.5);

            // Distance from pixel to thread
            float dist = abs(p.x - finalX);

            // === Y-AXIS THICKNESS VARIATION ===
            float baseThickness = 0.012 + sin(seed * 13.0) * 0.005;
            float thicknessVar = 0.8 + 0.4 * sin(p.y * 3.0 + t * 0.5 + seed * 7.0);
            float thickness = baseThickness * thicknessVar;

            // === DUAL-LAYER GLOW (core + halo) ===
            // Tight bright core with smoothstep AA
            float core = smoothstep(thickness, thickness * 0.1, dist) * 0.6;
            // Soft wide halo
            float halo = (thickness * 2.5) / (dist + 0.002);
            halo = pow(halo, 1.2) * 0.03;

            float glow = core + halo;

            // Brightness variation along thread
            float brightness = 0.7 + 0.3 * sin(p.y * 8.0 + t * 2.0 + seed * 5.0);

            // Mouse proximity boost
            float mouseBoost = exp(-mouseDist * 3.0) * 0.5;
            float clickBoost = ripple * 2.0;

            glow *= brightness * (1.0 + mouseBoost + clickBoost);

            // === PER-THREAD COLOR VARIATION ===
            float threadHue = fract(seed * 3.7 + 0.2);
            vec3 threadTint = mix(brightSapphire, brightCyan, threadHue);
            // Some threads get a slight purple tint
            threadTint = mix(threadTint, vec3(0.4, 0.2, 0.8), smoothstep(0.7, 1.0, sin(seed * 17.0)) * 0.3);

            threadColorAccum += threadTint * glow;
            threads += glow;
        }

        // Add white highlights on the brightest parts
        vec3 finalThreadColor = mix(threadColorAccum, white * threads, smoothstep(0.3, 1.0, threads));
        color += finalThreadColor * 1.5;

        // === HORIZONTAL LIGHT BANDS ===
        float band1 = exp(-abs(p.y - 0.3 - sin(t * 0.3) * 0.1) * 4.0) * 0.08;
        float band2 = exp(-abs(p.y + 0.4 - cos(t * 0.25) * 0.1) * 5.0) * 0.06;
        color += brightCyan * band1;
        color += brightSapphire * band2;

        // === MOUSE GLOW ===
        float mDist = length(p - mouse);
        float mouseGlow = exp(-mDist * 3.0) * 0.25;
        float mouseRing = exp(-abs(mDist - 0.15) * 20.0) * 0.15;
        color += brightCyan * (mouseGlow + mouseRing);

        // === BLOOM ===
        color += brightCyan * threads * 0.06;

        // === GRADIENT OVERLAY ===
        color += brightSapphire * uv.y * 0.08;

        // === VIGNETTE ===
        float vignette = smoothstep(0.0, 1.0, 1.0 - length(p) * 0.25);
        color *= vignette;

        // === COLOR GRADING ===
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 1.2);

        color = clamp(color, 0.0, 1.0);
        gl_FragColor = vec4(color, 1.0);
    }
`
}

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile failed:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
    }
    return shader
}

function createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    const program = gl.createProgram()
    if (!program) return null
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link failed:', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return null
    }
    return program
}

export default function FluidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mouseRef = useRef({ x: 0.5, y: 0.5 })
    const clickRef = useRef({ time: -10, x: 0.5, y: 0.5 })
    const isMobile = useIsMobile()

    const handleClick = useCallback((e: MouseEvent) => {
        clickRef.current = {
            time: performance.now() / 1000,
            x: e.clientX / window.innerWidth,
            y: 1.0 - e.clientY / window.innerHeight
        }
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Respect prefers-reduced-motion — show static gradient instead
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (reducedMotion.matches) {
            canvas.style.background = 'linear-gradient(135deg, #050505 0%, #0a1428 50%, #050505 100%)'
            return
        }

        // === QUALITY DETECTION (once on load, locked in) ===
        const { tier: currentTier } = detectInitialTier(isMobile)

        const gl = canvas.getContext('webgl', {
            alpha: false,
            antialias: currentTier.label === 'ultra' || currentTier.label === 'high',
            powerPreference: 'high-performance',
        })
        if (!gl) {
            // WebGL not supported — show static gradient fallback
            canvas.style.background = 'linear-gradient(135deg, #050505 0%, #0a1428 50%, #050505 100%)'
            return
        }

        const fragSource = generateFragmentShader(currentTier.threads, currentTier.fbmOctaves)
        const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fragSource)
        if (!vs || !fs) return
        const program = createProgram(gl, vs, fs)
        if (!program) return

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
        ]), gl.STATIC_DRAW)

        const positionLocation = gl.getAttribLocation(program, 'a_position')
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
        const timeLocation = gl.getUniformLocation(program, 'u_time')
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse')
        const clickTimeLocation = gl.getUniformLocation(program, 'u_clickTime')
        const clickPosLocation = gl.getUniformLocation(program, 'u_clickPos')

        function applyResolution() {
            const baseDpr = window.devicePixelRatio || 1
            const dpr = Math.min(baseDpr * currentTier.dprScale, 3.0)
            canvas!.width = window.innerWidth * dpr
            canvas!.height = window.innerHeight * dpr
            gl!.viewport(0, 0, canvas!.width, canvas!.height)
        }
        applyResolution()

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: 1.0 - e.clientY / window.innerHeight
            }
        }

        // On mobile, push mouse position off-screen so there's no glow/distortion at center
        if (isMobile) {
            mouseRef.current = { x: -1, y: -1 }
        }

        // Only add mouse/click listeners on desktop
        if (!isMobile) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('click', handleClick)
        }
        window.addEventListener('resize', applyResolution)

        let animationId: number
        const startTime = performance.now()

        // Frame throttle for low tier
        let lastFrameTime = 0
        const baseMinFrameInterval = currentTier.targetFps < 60 ? (1000 / currentTier.targetFps) : 0
        const throttledInterval = 1000 / 5 // 5fps when background not visible

        // === VISIBILITY-BASED THROTTLING ===
        let heroVisible = true
        const heroEl = document.getElementById('home')
        let observer: IntersectionObserver | null = null

        if (heroEl) {
            observer = new IntersectionObserver(
                ([entry]) => { heroVisible = entry.isIntersecting },
                { threshold: 0 } // triggers when any part enters/leaves viewport
            )
            observer.observe(heroEl)
        }

        const render = (now: number) => {
            animationId = requestAnimationFrame(render)

            // Use heavy throttle when hero is off-screen (background mostly hidden)
            const minFrameInterval = heroVisible ? baseMinFrameInterval : throttledInterval
            if (minFrameInterval > 0 && now - lastFrameTime < minFrameInterval) return
            lastFrameTime = now

            const time = (now - startTime) / 1000

            gl!.useProgram(program)
            gl!.uniform2f(resolutionLocation, canvas!.width, canvas!.height)
            gl!.uniform1f(timeLocation, time)
            gl!.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
            gl!.uniform1f(clickTimeLocation, clickRef.current.time - startTime / 1000)
            gl!.uniform2f(clickPosLocation, clickRef.current.x, clickRef.current.y)

            gl!.enableVertexAttribArray(positionLocation)
            gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer)
            gl!.vertexAttribPointer(positionLocation, 2, gl!.FLOAT, false, 0, 0)
            gl!.drawArrays(gl!.TRIANGLES, 0, 6)
        }
        animationId = requestAnimationFrame(render)

        return () => {
            cancelAnimationFrame(animationId)
            if (observer) observer.disconnect()
            if (!isMobile) {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('click', handleClick)
            }
            window.removeEventListener('resize', applyResolution)
            gl.deleteProgram(program)
        }
    }, [isMobile, handleClick])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 w-full h-full"
            style={{ display: 'block' }}
        />
    )
}
