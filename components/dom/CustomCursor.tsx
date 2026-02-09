'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const cursorDotRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    useEffect(() => {
        // Detect touch device
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
        }
        checkTouch()

        if (isTouchDevice) return

        const cursor = cursorRef.current
        const cursorDot = cursorDotRef.current
        if (!cursor || !cursorDot) return

        // Mouse position
        let mouseX = 0
        let mouseY = 0

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Instant dot movement
            gsap.set(cursorDot, {
                x: mouseX,
                y: mouseY,
            })

            // Smooth ring follow
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.5,
                ease: 'power3.out',
            })
        }

        const onMouseEnter = () => setIsHidden(false)
        const onMouseLeave = () => setIsHidden(true)

        // Interactive element hover detection
        const addHoverListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')

            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', () => setIsHovering(true))
                el.addEventListener('mouseleave', () => setIsHovering(false))
            })
        }

        window.addEventListener('mousemove', onMouseMove)
        document.body.addEventListener('mouseenter', onMouseEnter)
        document.body.addEventListener('mouseleave', onMouseLeave)

        // Add hover listeners after a short delay to ensure DOM is ready
        const timer = setTimeout(addHoverListeners, 500)

        // Set up MutationObserver to handle dynamic content
        const observer = new MutationObserver(addHoverListeners)
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            document.body.removeEventListener('mouseenter', onMouseEnter)
            document.body.removeEventListener('mouseleave', onMouseLeave)
            clearTimeout(timer)
            observer.disconnect()
        }
    }, [isTouchDevice])

    // Animate hover state changes
    useEffect(() => {
        if (isTouchDevice) return
        const cursor = cursorRef.current
        if (!cursor) return

        if (isHovering) {
            gsap.to(cursor, {
                scale: 1.5,
                borderColor: 'rgba(34, 211, 238, 0.8)',
                duration: 0.3,
                ease: 'power2.out',
            })
        } else {
            gsap.to(cursor, {
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                duration: 0.3,
                ease: 'power2.out',
            })
        }
    }, [isHovering, isTouchDevice])

    if (isTouchDevice) return null

    return (
        <>
            {/* Outer ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: '40px',
                    height: '40px',
                    marginLeft: '-20px',
                    marginTop: '-20px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    opacity: isHidden ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            />
            {/* Inner dot */}
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    width: '8px',
                    height: '8px',
                    marginLeft: '-4px',
                    marginTop: '-4px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    opacity: isHidden ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                }}
            />
        </>
    )
}
