'use client'

import { useState, useEffect, useRef } from 'react'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const lastScrollY = useRef(0)

    const lenis = useLenis(({ scroll }) => {
        // Hide on scroll down, show on scroll up
        if (scroll > 100) {
            setIsHidden(scroll > lastScrollY.current)
        } else {
            setIsHidden(false)
        }
        lastScrollY.current = scroll
    })

    // Active section detection
    useEffect(() => {
        const sectionIds = ['home', 'about', 'services', 'projects', 'contact']
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
        )

        sectionIds.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false)
        lenis?.scrollTo(href, { offset: -80 })
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${
                isHidden ? '-translate-y-full' : 'translate-y-0'
            }`}
        >
            <div className="mx-4 md:mx-8 mt-4">
                <div className="glass-nav px-4 md:px-6 py-3">
                    <div className="max-w-6xl mx-auto flex items-center justify-between">
                        {/* Logo */}
                        <button
                            onClick={() => handleNavClick('#home')}
                            className="text-lg font-black tracking-tighter text-gradient cursor-pointer"
                        >
                            SURYA
                        </button>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                                        activeSection === link.href.slice(1)
                                            ? 'text-cyan-400'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <button
                            onClick={() => handleNavClick('#contact')}
                            className="hidden md:block btn-glow !px-5 !py-2.5 !text-sm cursor-pointer"
                        >
                            Let&apos;s Talk
                        </button>

                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-2 cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden glass-card mt-2 py-4 px-6">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`text-sm font-medium text-left transition-colors duration-300 cursor-pointer ${
                                        activeSection === link.href.slice(1)
                                            ? 'text-cyan-400'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {link.label}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNavClick('#contact')}
                                className="btn-glow !px-5 !py-2.5 !text-sm text-center mt-2 cursor-pointer"
                            >
                                Let&apos;s Talk
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
