'use client'

import { useState, FormEvent } from 'react'
import { Mail, MapPin, Clock, Send, CheckCircle, Github, Linkedin, Twitter } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const sectionRef = useScrollReveal({ y: 40 })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    return (
        <section id="contact" className="w-full py-16 md:py-24 px-4 md:px-8 relative pointer-events-auto bg-black/40 backdrop-blur-sm">
            <div ref={sectionRef} className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-4 tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    Let&apos;s Work Together
                </h2>
                <p className="text-center text-gray-400 mb-10 md:mb-16 max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                    Have a project in mind? Let&apos;s build something extraordinary.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Contact Info */}
                    <div className="glass-card p-6 md:p-8 flex flex-col gap-8">
                        <p className="text-gray-300 leading-relaxed">
                            I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of something amazing. Drop me a message and I&apos;ll get back to you as soon as possible.
                        </p>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                    <p className="text-white text-sm">hello@surya.dev</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                                    <p className="text-white text-sm">Odisha, India</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Availability</p>
                                    <p className="text-white text-sm">Open to freelance & collaborations</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 mt-2">
                            {[
                                { icon: <Github className="w-4 h-4" />, href: '#', label: 'GitHub' },
                                { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
                                { icon: <Twitter className="w-4 h-4" />, href: '#', label: 'Twitter' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:border-cyan-500/30 hover:bg-white/10 hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="glass-card p-6 md:p-10">
                        {isSubmitted ? (
                            <div className="flex flex-col items-center justify-center h-full min-h-[300px] gap-4">
                                <CheckCircle className="w-12 h-12 text-cyan-400" />
                                <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
                                <p className="text-gray-400 text-sm text-center">
                                    Thank you for reaching out. I&apos;ll get back to you soon.
                                </p>
                                <button
                                    onClick={() => {
                                        setIsSubmitted(false)
                                        setFormData({ name: '', email: '', message: '' })
                                    }}
                                    className="btn-secondary !px-5 !py-2.5 !text-sm mt-4 cursor-pointer"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div>
                                    <label htmlFor="name" className="text-sm font-medium text-gray-300 mb-2 block">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="Your name"
                                        className="glass-input"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        className="glass-input"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="text-sm font-medium text-gray-300 mb-2 block">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Tell me about your project..."
                                        className="glass-input resize-none"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-glow flex items-center justify-center gap-2 w-full mt-2 cursor-pointer">
                                    <Send className="w-4 h-4" />
                                    Send Message
                                </button>

                                <p className="text-xs text-gray-600 text-center mt-1">
                                    Frontend only — backend integration coming soon.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
