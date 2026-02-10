'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/dom/Navbar'
import Hero from '@/components/dom/Hero'
import Preloader from '@/components/dom/Preloader'
import CustomCursor from '@/components/dom/CustomCursor'
import { ErrorBoundary } from '@/components/dom/ErrorBoundary'

// Lazy-load heavy / below-the-fold components
const FluidBackground = dynamic(() => import('@/components/canvas/FluidBackground'), { ssr: false })
const TrustSection = dynamic(() => import('@/components/dom/TrustSection'))
const About = dynamic(() => import('@/components/dom/About'))
const Services = dynamic(() => import('@/components/dom/Services'))
const ProjectCards = dynamic(() => import('@/components/dom/ProjectCards'))
const ViksitBharat = dynamic(() => import('@/components/dom/ViksitBharat'))
const Contact = dynamic(() => import('@/components/dom/Contact'))
const Footer = dynamic(() => import('@/components/dom/Footer'))
const ScrollToTop = dynamic(() => import('@/components/dom/ScrollToTop'))

export default function Home() {
  return (
    <main className="relative w-full">
      <CustomCursor />
      <Preloader />
      <ErrorBoundary>
        <FluidBackground />
      </ErrorBoundary>
      <Navbar />
      <Hero />
      <ErrorBoundary>
        <TrustSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
      <ErrorBoundary>
        <Services />
      </ErrorBoundary>
      <ErrorBoundary>
        <ProjectCards />
      </ErrorBoundary>
      <ErrorBoundary>
        <ViksitBharat />
      </ErrorBoundary>
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
      <Footer />
      <ScrollToTop />
    </main>
  );
}
