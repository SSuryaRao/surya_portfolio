'use client'

import { useState } from 'react'
import { useLenis } from 'lenis/react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    const lenis = useLenis(({ scroll }) => {
        setIsVisible(scroll > 500)
    })

    const scrollToTop = () => {
        lenis?.scrollTo(0)
    }

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#22D3EE] shadow-lg shadow-cyan-500/20 flex items-center justify-center hover:shadow-cyan-500/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll to top"
        >
            <ChevronUp className="w-5 h-5 text-white" />
        </button>
    )
}
