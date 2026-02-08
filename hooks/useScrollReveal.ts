'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
    y?: number
    x?: number
    duration?: number
    delay?: number
    stagger?: number
    start?: string
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!ref.current) return

        const { y = 40, x = 0, duration = 0.8, delay = 0, stagger = 0, start = 'top 85%' } = options

        // Small delay to ensure Lenis and ScrollTrigger are synced
        const timer = setTimeout(() => {
            if (!ref.current) return

            const ctx = gsap.context(() => {
                const targets = stagger > 0
                    ? ref.current!.querySelectorAll('[data-reveal]')
                    : ref.current!

                // If no data-reveal targets found with stagger, fall back to container
                const finalTargets = stagger > 0 && (targets as NodeList).length === 0
                    ? ref.current!
                    : targets

                gsap.fromTo(finalTargets,
                    { y, x, opacity: 0 },
                    {
                        y: 0,
                        x: 0,
                        opacity: 1,
                        duration,
                        delay,
                        stagger,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: ref.current,
                            start,
                            toggleActions: 'play none none none',
                        },
                    }
                )
            }, ref)

            return () => ctx.revert()
        }, 100)

        return () => clearTimeout(timer)
    }, [options.y, options.x, options.duration, options.delay, options.stagger, options.start])

    return ref
}
