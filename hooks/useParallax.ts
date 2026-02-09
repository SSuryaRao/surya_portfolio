'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxOptions {
    speed?: number // 0.1 = slow, 1 = fast
    direction?: 'up' | 'down'
}

export function useParallax(options: ParallaxOptions = {}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const { speed = 0.3, direction = 'up' } = options
        const yAmount = direction === 'up' ? -100 * speed : 100 * speed

        const timer = setTimeout(() => {
            if (!ref.current) return

            const ctx = gsap.context(() => {
                gsap.to(ref.current, {
                    y: yAmount,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                })
            }, ref)

            return () => ctx.revert()
        }, 100)

        return () => clearTimeout(timer)
    }, [options.speed, options.direction])

    return ref
}
