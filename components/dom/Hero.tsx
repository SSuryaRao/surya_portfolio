export default function Hero() {
    return (
        <section id="home" className="relative w-full min-h-screen flex flex-col items-start justify-center px-6 md:px-20 lg:px-32 pointer-events-none py-20">


            <div className="z-10 text-left pointer-events-auto max-w-3xl">
                {/* Subtle backdrop for text readability */}
                <div className="absolute inset-0 -top-8 -bottom-8 bg-gradient-to-r from-black/60 via-black/30 to-transparent rounded-3xl blur-xl -z-10"></div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 md:mb-8 leading-[0.95] tracking-tighter drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    Turn Ideas Into <br />
                    <span className="text-gradient drop-shadow-[0_4px_30px_rgba(34,211,238,0.5)]">
                        Digital Reality.
                    </span>
                </h1>

                {/* Subheadline */}
                <p className="text-base md:text-xl text-white/90 font-medium mb-8 md:mb-12 max-w-xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    Elite Full-Stack Developer crafting high-performance, scalable web solutions for forward-thinking businesses.
                </p>

                {/* Call to Actions */}
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <a href="#contact" className="btn-glow flex items-center gap-3 shadow-xl shadow-cyan-500/30">
                        Start Your Project
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>

                    <a href="#services" className="btn-secondary shadow-lg shadow-black/30">
                        View Services
                    </a>
                </div>

                {/* Tech Stack */}
                <div className="mt-10 md:mt-16 flex gap-4 md:gap-8 text-white/70 text-xs font-mono tracking-[0.2em] uppercase drop-shadow-lg flex-wrap">
                    <span>Next.js 15</span>
                    <span className="text-white/40">•</span>
                    <span>WebGL</span>
                    <span className="text-white/40">•</span>
                    <span>GLSL Shaders</span>
                </div>
            </div>
        </section>
    )
}
