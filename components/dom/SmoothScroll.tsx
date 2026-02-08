'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { ReactNode, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: ReactNode
}

function LenisGSAPSync() {
  const lenisRef = useRef<ReturnType<typeof useLenis>>(null)

  lenisRef.current = useLenis()

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // Tell Lenis to not run its own raf loop since GSAP handles it
    lenisRef.current?.stop()
    lenisRef.current?.start()

    return () => {
      gsap.ticker.remove(update)
    }
  }, [])

  // Sync scroll position to ScrollTrigger on every Lenis scroll event
  useLenis(() => {
    ScrollTrigger.update()
  })

  return null
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root>
      <LenisGSAPSync />
      {children}
    </ReactLenis>
  )
}
