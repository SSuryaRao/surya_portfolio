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

// Fragment Shader - "Liquid Silk" Flowing Threads
const fragmentShaderSource = `
    precision highp float;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_clickTime;
    uniform vec2 u_clickPos;
    
    #define PI 3.14159265359
    #define NUM_THREADS 40.0
    
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
    
    // Fractal noise for organic movement
    float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
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
        vec3 baseColor = vec3(0.02, 0.02, 0.02);
        vec3 color = baseColor;
        
        // Color palette
        vec3 sapphire = vec3(0.118, 0.227, 0.541);  // #1E3A8A
        vec3 cyan = vec3(0.133, 0.827, 0.933);      // #22D3EE
        vec3 white = vec3(0.9, 0.95, 1.0);
        
        // === FLOWING VERTICAL THREADS ===
        float threads = 0.0;
        
        for (float i = 0.0; i < NUM_THREADS; i++) {
            // Thread base position (distributed across screen)
            float threadX = (i / NUM_THREADS) * 2.0 - 1.0;
            threadX *= u_resolution.x / u_resolution.y;
            
            // Add variation to each thread
            float seed = i * 0.1;
            float speed = 0.8 + sin(seed * 5.0) * 0.3;
            float amplitude = 0.08 + sin(seed * 7.0) * 0.04;
            float frequency = 3.0 + sin(seed * 11.0) * 1.5;
            
            // Sine wave oscillation
            float wave = sin(p.y * frequency + t * speed + seed * 10.0) * amplitude;
            
            // Add simplex noise for organic non-repeating motion
            float noiseOffset = fbm(vec2(p.y * 0.5 + seed, t * 0.3)) * 0.06;
            
            // Final thread X position
            float finalX = threadX + wave + noiseOffset;
            
            // === MOUSE DISTORTION FIELD ===
            vec2 threadPos = vec2(finalX, p.y);
            vec2 toMouse = threadPos - mouse;
            float mouseDist = length(toMouse);
            
            // Push threads away from mouse (distortion field)
            float distortionRadius = 0.4;
            float distortion = max(0.0, 1.0 - mouseDist / distortionRadius);
            distortion = distortion * distortion * distortion; // Cubic falloff
            vec2 push = normalize(toMouse + 0.001) * distortion * 0.15;
            finalX += push.x;
            
            // Add click ripple distortion
            finalX += ripple * 0.03 * sin(i * 0.5);
            
            // Thread glow calculation
            float dist = abs(p.x - finalX);
            
            // Thread thickness (increased)
            float thickness = 0.012 + sin(seed * 13.0) * 0.005;
            
            // Soft glow falloff (much brighter)
            float glow = thickness / (dist + 0.001);
            glow = pow(glow, 1.3) * 0.05;
            
            // Add slight variation in brightness along thread
            float brightness = 0.7 + 0.3 * sin(p.y * 8.0 + t * 2.0 + seed * 5.0);
            
            // Mouse proximity brightening
            float mouseBoost = exp(-mouseDist * 3.0) * 0.5;
            
            // Click pulse brightening
            float clickBoost = ripple * 2.0;
            
            glow *= brightness * (1.0 + mouseBoost + clickBoost);
            
            threads += glow;
        }
        
        // Apply thread colors - brighter gradient from sapphire to cyan
        float colorMix = sin(t * 0.5 + p.y * 2.0) * 0.5 + 0.5;
        vec3 brightSapphire = vec3(0.2, 0.35, 0.7);   // Brighter sapphire
        vec3 brightCyan = vec3(0.2, 0.9, 1.0);        // Brighter cyan
        vec3 threadColor = mix(brightSapphire, brightCyan, colorMix);
        
        // Add white highlights on brightest parts
        vec3 finalThreadColor = mix(threadColor, white, smoothstep(0.3, 1.0, threads));
        
        color += finalThreadColor * threads * 1.5;
        
        // === HORIZONTAL LIGHT BANDS ===
        // Adds depth and variety
        float band1 = exp(-abs(p.y - 0.3 - sin(t * 0.3) * 0.1) * 4.0) * 0.08;
        float band2 = exp(-abs(p.y + 0.4 - cos(t * 0.25) * 0.1) * 5.0) * 0.06;
        color += brightCyan * band1;
        color += brightSapphire * band2;
        
        // === MOUSE GLOW (Enhanced) ===
        float mouseDist = length(p - mouse);
        float mouseGlow = exp(-mouseDist * 3.0) * 0.25;
        float mouseRing = exp(-abs(mouseDist - 0.15) * 20.0) * 0.15;
        color += brightCyan * (mouseGlow + mouseRing);
        
        // === BLOOM EFFECT ===
        // Soft overall glow based on brightness
        float bloom = threads * 0.3;
        color += brightCyan * bloom * 0.2;
        
        // === GRADIENT OVERLAY ===
        // Subtle gradient from bottom to top
        float gradient = uv.y * 0.08;
        color += brightSapphire * gradient;
        
        // === VIGNETTE (Softer) ===
        float vignette = 1.0 - length(p) * 0.25;
        vignette = smoothstep(0.0, 1.0, vignette);
        color *= vignette;
        
        // === FINAL COLOR GRADING ===
        // Slight saturation boost
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));
        color = mix(vec3(luminance), color, 1.2);
        
        // Ensure we don't clip
        color = clamp(color, 0.0, 1.0);
        
        gl_FragColor = vec4(color, 1.0);
    }
`

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

        const gl = canvas.getContext('webgl', { alpha: false, antialias: !isMobile })
        if (!gl) return

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
        if (!vertexShader || !fragmentShader) return

        const program = createProgram(gl, vertexShader, fragmentShader)
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

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = {
                x: e.clientX / window.innerWidth,
                y: 1.0 - e.clientY / window.innerHeight
            }
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0]
                mouseRef.current = {
                    x: touch.clientX / window.innerWidth,
                    y: 1.0 - touch.clientY / window.innerHeight
                }
            }
        }

        const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0]
                mouseRef.current = {
                    x: touch.clientX / window.innerWidth,
                    y: 1.0 - touch.clientY / window.innerHeight
                }
                // Trigger click ripple on touch
                clickRef.current = {
                    time: performance.now() / 1000,
                    x: touch.clientX / window.innerWidth,
                    y: 1.0 - touch.clientY / window.innerHeight
                }
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('click', handleClick)
        window.addEventListener('touchmove', handleTouchMove, { passive: true })
        window.addEventListener('touchstart', handleTouchStart, { passive: true })

        const resize = () => {
            const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5)
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            gl.viewport(0, 0, canvas.width, canvas.height)
        }
        resize()
        window.addEventListener('resize', resize)

        let animationId: number
        const startTime = performance.now()

        const render = () => {
            const time = (performance.now() - startTime) / 1000

            gl.useProgram(program)
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
            gl.uniform1f(timeLocation, time)
            gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)
            gl.uniform1f(clickTimeLocation, clickRef.current.time - startTime / 1000)
            gl.uniform2f(clickPosLocation, clickRef.current.x, clickRef.current.y)

            gl.enableVertexAttribArray(positionLocation)
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
            gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
            gl.drawArrays(gl.TRIANGLES, 0, 6)

            animationId = requestAnimationFrame(render)
        }
        render()

        return () => {
            cancelAnimationFrame(animationId)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('click', handleClick)
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchstart', handleTouchStart)
            window.removeEventListener('resize', resize)
            gl.deleteProgram(program)
            gl.deleteShader(vertexShader)
            gl.deleteShader(fragmentShader)
        }
    }, [isMobile, handleClick])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 w-full h-full"
            style={{ display: 'block', touchAction: 'none' }}
        />
    )
}
