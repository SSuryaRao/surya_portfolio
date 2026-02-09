'use client'

import { ExternalLink, Github, GraduationCap, Gamepad2 } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const projects = [
    {
        title: 'Digital Guidance Platform',
        description: 'A one-stop tailored guidance platform for students — aptitude quizzes, course recommendations, college search with nearby government institutions, and deadline tracking for admissions and scholarships. Built for SIH 2025.',
        tags: [
            { label: 'Next.js', colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
            { label: 'SIH 2025', colorClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
        ],
        icon: <GraduationCap className="w-16 h-16 text-white/20" />,
        accentFrom: 'from-blue-600/20',
        accentTo: 'to-emerald-600/20',
        hoverBorder: 'hover:border-blue-500/50',
        liveUrl: 'https://sih-2025-indol.vercel.app/',
        githubUrl: '',
    },
    {
        title: 'BGMI Store',
        description: 'A digital marketplace for premium BGMI gaming assets. Buy UC, battle passes, elite passes, and exclusive skins with instant delivery, verified sellers, and 24/7 support.',
        tags: [
            { label: 'Next.js', colorClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
            { label: 'Tailwind CSS', colorClass: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
            { label: 'Auth', colorClass: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
        ],
        icon: <Gamepad2 className="w-16 h-16 text-white/20" />,
        accentFrom: 'from-orange-600/20',
        accentTo: 'to-red-600/20',
        hoverBorder: 'hover:border-orange-500/50',
        liveUrl: 'https://bgmistore.vercel.app/',
        githubUrl: '',
    },
]

export default function ProjectCards() {
    const sectionRef = useScrollReveal({ y: 50, stagger: 0.2 })

    return (
        <section id="projects" className="w-full py-16 md:py-20 px-4 md:px-8 relative pointer-events-auto bg-black/40 backdrop-blur-sm">
            <div ref={sectionRef} className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    Projects
                </h2>
                <p className="text-center text-gray-400 mb-10 md:mb-16 max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    A selection of work that showcases my expertise.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            data-reveal
                            className={`group glass-card overflow-hidden ${project.hoverBorder} transition-all duration-500 transform hover:-translate-y-2`}
                        >
                            {/* Image Placeholder */}
                            <div className={`aspect-video w-full bg-gradient-to-br ${project.accentFrom} ${project.accentTo} flex items-center justify-center border-b border-white/5 group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
                                {project.icon}
                            </div>

                            {/* Content */}
                            <div className="p-5 md:p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{project.title}</h3>
                                <p className="text-gray-400 mb-5 text-sm leading-relaxed">{project.description}</p>

                                {/* Tags */}
                                <div className="flex gap-2 flex-wrap mb-6">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag.label}
                                            className={`px-3 py-1 text-xs rounded-full border ${tag.colorClass}`}
                                        >
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 flex-wrap">
                                    {project.liveUrl ? (
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-glow !px-5 !py-2.5 !text-sm flex items-center gap-2"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                    ) : (
                                        <span className="px-5 py-2.5 text-sm rounded-xl bg-white/5 text-gray-500 border border-white/5 cursor-default">
                                            Coming Soon
                                        </span>
                                    )}
                                    {project.githubUrl ? (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-secondary !px-5 !py-2.5 !text-sm flex items-center gap-2"
                                        >
                                            <Github className="w-4 h-4" />
                                            Source Code
                                        </a>
                                    ) : (
                                        <span className="px-5 py-2.5 text-sm rounded-xl bg-white/5 text-gray-500 border border-white/5 cursor-default">
                                            Private
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
