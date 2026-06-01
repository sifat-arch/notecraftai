import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import TrustedBy from "@/components/landing/TrustedBy"
import BentoFeatures from "@/components/landing/BentoFeatures"
import AiDemo from "@/components/landing/AiDemo"
import Workflow from "@/components/landing/Workflow"
import Testimonials from "@/components/landing/Testimonials"
import Pricing from "@/components/landing/Pricing"
import FAQ from "@/components/landing/FAQ"
import Footer from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <TrustedBy />
      <BentoFeatures />
      <AiDemo />
      <Workflow />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
