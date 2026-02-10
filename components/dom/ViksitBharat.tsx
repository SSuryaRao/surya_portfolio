'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { VIKSIT_BHARAT_STAGES } from '@/lib/constants'

export default function ViksitBharat() {
    const sectionRef = useScrollReveal({ y: 40 })

    return (
        <section id="viksit-bharat-section" className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-4 md:px-8 bg-black/50 backdrop-blur-sm relative pointer-events-none">
            <div ref={sectionRef} className="max-w-4xl w-full pointer-events-auto">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4 border-l-4 border-orange-500 pl-4">
                    Viksit Bharat Journey
                </h2>
                <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-8 pl-4">
                    A national initiative where 50 Lakh+ participants competed across India. Here&apos;s my path from quiz to national stage.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-gray-300">
                    {VIKSIT_BHARAT_STAGES.map((stage) => (
                        <div
                            key={stage.title}
                            className={
                                stage.isHighlighted
                                    ? 'bg-gradient-to-br from-orange-600/20 to-red-600/20 p-4 md:p-6 rounded-xl border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg shadow-orange-900/20'
                                    : 'bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors'
                            }
                        >
                            <h3 className={`text-lg md:text-xl font-semibold ${stage.colorClass} mb-2`}>{stage.title}</h3>
                            <p>{stage.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
