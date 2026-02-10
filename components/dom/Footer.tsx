'use client'

import { useLenis } from 'lenis/react'
import { Github, Mail } from 'lucide-react'
import { NAV_LINKS, SITE } from '@/lib/constants'

const socialLinks = [
    { icon: <Github className="w-4 h-4" />, href: SITE.github, label: 'GitHub' },
    { icon: <Mail className="w-4 h-4" />, href: `mailto:${SITE.email}`, label: 'Email' },
]

export default function Footer() {
    const lenis = useLenis()

    const handleNavClick = (href: string) => {
        lenis?.scrollTo(href, { offset: -80 })
    }

    return (
        <footer className="w-full border-t border-white/5 bg-black/40 backdrop-blur-sm pointer-events-auto">
            <div className="max-w-6xl mx-auto py-10 md:py-16 px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {/* Brand */}
                    <div>
                        <span className="text-xl font-black tracking-tighter text-gradient">SURYA</span>
                        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                            Full-Stack Developer crafting high-performance digital experiences with modern web technologies.
                        </p>
                        <div className="flex gap-3 mt-5">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyan-500/30 hover:bg-white/10 hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h4>
                        <div className="flex flex-col gap-3">
                            {NAV_LINKS.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300 text-left cursor-pointer"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Get In Touch</h4>
                        <div className="flex flex-col gap-3">
                            <a href={`mailto:${SITE.email}`} className="text-sm text-gray-400 hover:text-white transition-colors">{SITE.email}</a>
                            <p className="text-sm text-gray-400">Odisha, India</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Surya. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-600">
                        Built with Next.js & GLSL
                    </p>
                </div>
            </div>
        </footer>
    )
}
