export default function ViksitBharat() {
    return (
        <section id="viksit-bharat-section" className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-4 md:px-8 bg-black/50 backdrop-blur-sm relative pointer-events-none">
            <div className="max-w-4xl w-full pointer-events-auto">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-6 md:mb-8 border-l-4 border-orange-500 pl-4">
                    Viksit Bharat Journey
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-gray-300">
                    <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="text-lg md:text-xl font-semibold text-yellow-400 mb-2">Stage 1: The Quiz</h3>
                        <p>Selected among top performers in the initial screening.</p>
                    </div>
                    <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="text-lg md:text-xl font-semibold text-orange-400 mb-2">Stage 2: The Essay</h3>
                        <p>Drafted a vision for India's future, selected for state representation.</p>
                    </div>
                    <div className="bg-white/5 p-4 md:p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                        <h3 className="text-lg md:text-xl font-semibold text-red-400 mb-2">Stage 3: State Level</h3>
                        <p>Presented the proposal at the state symposium, winning 3rd prize.</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-4 md:p-6 rounded-xl border border-orange-500/30 hover:border-orange-500/50 transition-all shadow-lg shadow-orange-900/20">
                        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Stage 4: National Finals</h3>
                        <p>Represented Odisha at Bharat Mandapam, New Delhi.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
