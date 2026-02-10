'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLenis } from 'lenis/react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isHidden, setIsHidden] = useState(false)
    const [activeSection, setActiveSection] = useState('home')
    const lastScrollY = useRef(0)
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const hamburgerRef = useRef<HTMLButtonElement>(null)

    const lenis = useLenis(({ scroll }) => {
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

    // Close mobile menu on Escape key
    useEffect(() => {
        if (!isMobileMenuOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMobileMenuOpen(false)
                hamburgerRef.current?.focus()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isMobileMenuOpen])

    // Focus trap inside mobile menu
    useEffect(() => {
        if (!isMobileMenuOpen || !mobileMenuRef.current) return

        const menu = mobileMenuRef.current
        const focusableEls = menu.querySelectorAll<HTMLElement>('button, a, [tabindex]:not([tabindex="-1"])')
        if (focusableEls.length === 0) return

        const firstEl = focusableEls[0]
        const lastEl = focusableEls[focusableEls.length - 1]

        // Focus first item when menu opens
        firstEl.focus()

        const trapFocus = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return

            if (e.shiftKey) {
                if (document.activeElement === firstEl) {
                    e.preventDefault()
                    lastEl.focus()
                }
            } else {
                if (document.activeElement === lastEl) {
                    e.preventDefault()
                    firstEl.focus()
                }
            }
        }

        menu.addEventListener('keydown', trapFocus)
        return () => menu.removeEventListener('keydown', trapFocus)
    }, [isMobileMenuOpen])

    const handleNavClick = useCallback((href: string) => {
        setIsMobileMenuOpen(false)
        lenis?.scrollTo(href, { offset: -80 })
    }, [lenis])

    return (
        <>
            {/* Skip to content link for accessibility */}
            <a
                href="#home"
                className="skip-link"
                onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#home')
                }}
            >
                Skip to main content
            </a>

            <nav
                className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'
                    }`}
                role="navigation"
                aria-label="Main navigation"
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
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${activeSection === link.href.slice(1)
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
                                ref={hamburgerRef}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden text-white p-2 cursor-pointer"
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <div
                            ref={mobileMenuRef}
                            id="mobile-menu"
                            role="dialog"
                            aria-label="Mobile navigation menu"
                            className="md:hidden glass-card mt-2 py-4 px-6"
                        >
                            <div className="flex flex-col gap-4">
                                {NAV_LINKS.map((link) => (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className={`text-sm font-medium text-left transition-colors duration-300 cursor-pointer ${activeSection === link.href.slice(1)
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
        </>
    )
}
