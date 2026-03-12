'use client'

import dynamic from "next/dynamic"
import ScrollTracker from "@/components/scroll-tracker"
import NavOverlay from "@/components/nav-overlay"
import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import SkillsSection from "@/components/sections/skills-section"
import ProjectsSection from "@/components/sections/projects-section"
import ContactSection from "@/components/sections/contact-section"

// Load the 3D canvas client-side only (no SSR for WebGL)
const UniverseScene = dynamic(() => import("@/components/three/universe-scene"), {
  loading: () => (
    <div className="fixed inset-0 z-0 bg-[#080810] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
        <span className="font-mono text-xs text-cyan-400/60 tracking-widest uppercase">
          Initializing Universe...
        </span>
      </div>
    </div>
  ),
})

export default function Portfolio() {
  return (
    <main className="relative">
      {/* 3D Universe fixed in background */}
      <UniverseScene />

      {/* Scroll progress tracker (updates zustand store) */}
      <ScrollTracker />

      {/* Fixed navigation */}
      <NavOverlay />

      {/* Scrollable content — each section is min-h-screen tall so camera moves */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </main>
  )
}
