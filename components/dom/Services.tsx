'use client'

import React from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SERVICES } from '@/lib/constants'

const SERVICE_ICONS: Record<string, React.ReactNode> = {
    code: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
    automation: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-violet-400"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
    ),
    performance: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" /><path d="M12 14v-4" /><path d="M12 2v2" /><path d="M12 22v-2" /><path d="m5 5 1.5 1.5" /><path d="M17.5 17.5 19 19" /><path d="M2 12h2" /><path d="M22 12h-2" /><path d="m5 19 1.5-1.5" /><path d="M17.5 6.5 19 5" /></svg>
    ),
}

export default function Services() {
    const sectionRef = useScrollReveal({ y: 50, stagger: 0.15 })

    return (
        <section id="services" className="w-full py-16 md:py-24 px-4 md:px-8 relative pointer-events-auto bg-black/40 backdrop-blur-sm">
            <div ref={sectionRef} className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    Services
                </h2>
                <p className="text-center text-gray-400 mb-10 md:mb-16 max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    Premium solutions designed to elevate your business.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SERVICES.map((service, index) => (
                        <div key={index} data-reveal className={`group relative p-6 md:p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden ${service.hoverBorder} transition-all duration-500 transform hover:-translate-y-2`}>
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.gradientFrom} ${service.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                            <div className="mb-6 p-4 bg-white/5 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300 relative z-10">
                                {SERVICE_ICONS[service.iconId]}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 relative z-10">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm relative z-10">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
