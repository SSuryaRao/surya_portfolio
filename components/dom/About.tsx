'use client'

import { User } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const skillCategories = [
    {
        label: 'Frontend',
        skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Three.js'],
    },
    {
        label: 'Backend',
        skills: ['Node.js', 'Python', 'Supabase', 'PostgreSQL'],
    },
    {
        label: 'AI & Tools',
        skills: ['OpenAI', 'LangChain', 'Git', 'Figma', 'WebGL/GLSL'],
    },
]

const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '10+', label: 'Projects' },
    { value: '3', label: 'Awards' },
]

export default function About() {
    const sectionRef = useScrollReveal({ y: 40 })

    return (
        <section id="about" className="w-full py-16 md:py-24 px-4 md:px-8 relative pointer-events-auto bg-black/40 backdrop-blur-sm">
            <div ref={sectionRef} className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    About Me
                </h2>
                <p className="text-center text-gray-400 mb-10 md:mb-16 max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    Passionate about building digital experiences that make an impact.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Left: Bio */}
                    <div className="lg:col-span-2">
                        <div className="glass-card p-6 md:p-8 flex flex-col gap-6">
                            {/* Photo Placeholder */}
                            <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-[#1E3A8A]/20 to-[#22D3EE]/20 border border-white/10 flex items-center justify-center max-w-[240px] mx-auto">
                                <User className="w-20 h-20 text-white/20" />
                            </div>

                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                I&apos;m a full-stack developer from Odisha, India, specializing in crafting high-performance web applications with modern technologies. From interactive WebGL experiences to AI-powered tools, I bring ideas to life with clean code and creative solutions.
                            </p>
                            <p className="text-gray-400 leading-relaxed text-xs md:text-sm">
                                National Finalist at Viksit Bharat 2026, recognized for innovative thinking and technical excellence. Always exploring the intersection of design, performance, and cutting-edge technology.
                            </p>

                            {/* Stats */}
                            <div className="flex gap-6 mt-2 justify-center lg:justify-start">
                                {stats.map((stat) => (
                                    <div key={stat.label} className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Skills */}
                    <div className="lg:col-span-3">
                        <div className="glass-card p-6 md:p-8">
                            <h3 className="text-xl font-semibold text-white mb-8">Tech Stack</h3>

                            <div className="flex flex-col gap-8">
                                {skillCategories.map((category) => (
                                    <div key={category.label}>
                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                            {category.label}
                                        </h4>
                                        <div className="flex flex-wrap gap-3">
                                            {category.skills.map((skill) => (
                                                <span key={skill} className="skill-badge">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
