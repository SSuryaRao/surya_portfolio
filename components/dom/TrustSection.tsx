'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function TrustSection() {
    const sectionRef = useScrollReveal({ y: 40 })

    return (
        <section className="w-full py-12 md:py-20 px-4 md:px-8 flex justify-center pointer-events-none">
            <div ref={sectionRef} className="pointer-events-auto max-w-5xl w-full group relative p-6 md:p-10 lg:p-14 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-500 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex-1 relative z-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 tracking-tight">Award-Winning Engineering</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Recognized for technical excellence and innovation on national stages.
                    </p>
                </div>

                <div className="w-full h-px bg-white/10 md:w-px md:h-28 relative z-10" />

                <div className="flex-1 flex flex-col gap-6 relative z-10">
                    <div className="flex items-start gap-4">
                        <div className="text-amber-400 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                        </div>
                        <div>
                            <h3 className="text-base md:text-lg font-semibold text-white">National Finalist: Viksit Bharat 2026</h3>
                            <p className="text-sm text-gray-400">Selected from 50 Lakh+ participants nationwide. Represented Odisha at Bharat Mandapam.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="text-cyan-400 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-base md:text-lg font-semibold text-white">3rd Prize: Odisha AI Symposium</h3>
                            <p className="text-sm text-gray-400">Awarded for innovative AI solution design.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
