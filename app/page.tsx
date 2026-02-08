import FluidBackground from '@/components/canvas/FluidBackground'
import Navbar from '@/components/dom/Navbar'
import Hero from '@/components/dom/Hero'
import TrustSection from '@/components/dom/TrustSection'
import About from '@/components/dom/About'
import Services from '@/components/dom/Services'
import ProjectCards from '@/components/dom/ProjectCards'
import ViksitBharat from '@/components/dom/ViksitBharat'
import Contact from '@/components/dom/Contact'
import Footer from '@/components/dom/Footer'
import ScrollToTop from '@/components/dom/ScrollToTop'
import Preloader from '@/components/dom/Preloader'

export default function Home() {
  return (
    <main className="relative w-full">
      <Preloader />
      <FluidBackground />
      <Navbar />
      <Hero />
      <TrustSection />
      <About />
      <Services />
      <ProjectCards />
      <ViksitBharat />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
