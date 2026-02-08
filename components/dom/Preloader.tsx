'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true)
    const preloaderRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const barRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!preloaderRef.current || !textRef.current || !barRef.current) return

        const tl = gsap.timeline()

        // Entrance animation
        tl.from(textRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'power3.out',
        })
        tl.from(barRef.current, {
            scaleX: 0,
            duration: 0.4,
            ease: 'power2.out',
        }, '-=0.2')

        // Loading bar animation
        tl.to(barRef.current.querySelector('.bar-fill'), {
            width: '100%',
            duration: 1.2,
            ease: 'power2.inOut',
        })

        // Exit animation
        tl.to(preloaderRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => setIsVisible(false),
        }, '+=0.2')

        return () => { tl.kill() }
    }, [])

    if (!isVisible) return null

    return (
        <div
            ref={preloaderRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]"
        >
            <div ref={textRef} className="mb-8">
                <span className="text-5xl md:text-7xl font-black tracking-tighter text-gradient">
                    SURYA
                </span>
            </div>
            <div ref={barRef} className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="bar-fill h-full w-0 bg-gradient-to-r from-[#1E3A8A] to-[#22D3EE] rounded-full" />
            </div>
        </div>
    )
}
