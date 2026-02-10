'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    const handleHoverEnter = useCallback(() => setIsHovering(true), [])
    const handleHoverLeave = useCallback(() => setIsHovering(false), [])

    useEffect(() => {
        const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
        const isTouch = !hoverQuery.matches
        setIsTouchDevice(isTouch)

        if (isTouch) return

        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current
        if (!cursor || !cursorDot) return

        const onMouseMove = (e: MouseEvent) => {
            gsap.set(cursorDot, { x: e.clientX, y: e.clientY })
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: 'power3.out',
            })
        }

        const onMouseEnter = () => setIsHidden(false)
        const onMouseLeave = () => setIsHidden(true)

        const trackedElements = new WeakSet<Element>()

        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
            )
            interactiveElements.forEach((el) => {
                if (trackedElements.has(el)) return
                trackedElements.add(el)
                el.addEventListener('mouseenter', handleHoverEnter)
                el.addEventListener('mouseleave', handleHoverLeave)
            })
        }

        window.addEventListener('mousemove', onMouseMove)
        document.body.addEventListener('mouseenter', onMouseEnter)
        document.body.addEventListener('mouseleave', onMouseLeave)

        const timer = setTimeout(addHoverListeners, 500)

        let mutationTimeout: ReturnType<typeof setTimeout>
        const observer = new MutationObserver(() => {
            clearTimeout(mutationTimeout)
            mutationTimeout = setTimeout(addHoverListeners, 200)
        })
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.body.removeEventListener('mouseenter', onMouseEnter)
            document.body.removeEventListener('mouseleave', onMouseLeave)
            clearTimeout(timer)
            clearTimeout(mutationTimeout)
            observer.disconnect()
            document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
            ).forEach((el) => {
                el.removeEventListener('mouseenter', handleHoverEnter)
                el.removeEventListener('mouseleave', handleHoverLeave)
            })
        }
    }, [isTouchDevice, handleHoverEnter, handleHoverLeave])

    // Animate hover state changes
    useEffect(() => {
        if (isTouchDevice) return
        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current
        if (!cursor || !cursorDot) return

        if (isHovering) {
            gsap.to(cursor, {
                scale: 1.6,
                borderColor: 'rgba(34, 211, 238, 0.9)',
                backgroundColor: 'rgba(34, 211, 238, 0.08)',
                duration: 0.3,
                ease: 'power2.out',
            })
            gsap.to(cursorDot, {
                scale: 0.5,
                backgroundColor: '#22D3EE',
                duration: 0.3,
                ease: 'power2.out',
            })
        } else {
            gsap.to(cursor, {
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.6)',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                duration: 0.3,
                ease: 'power2.out',
            })
            gsap.to(cursorDot, {
                scale: 1,
                backgroundColor: '#ffffff',
                duration: 0.3,
                ease: 'power2.out',
            })
        }
    }, [isHovering, isTouchDevice])

    if (isTouchDevice) return null

    return (
        <>
            {/* Outer ring — no blend mode, uses drop-shadow for visibility on any bg */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: '40px',
                    height: '40px',
                    marginLeft: '-20px',
                    marginTop: '-20px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.6)',
                    filter: 'drop-shadow(0 0 4px rgba(0, 0, 0, 0.6)) drop-shadow(0 0 8px rgba(34, 211, 238, 0.3))',
                    opacity: isHidden ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            />
            {/* Inner dot — solid with dark outline for contrast */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    width: '8px',
                    height: '8px',
                    marginLeft: '-4px',
                    marginTop: '-4px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 0 1.5px rgba(0, 0, 0, 0.5), 0 0 6px rgba(34, 211, 238, 0.5)',
                    opacity: isHidden ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            />
        </>
    )
}
