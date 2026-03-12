"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const TITLE = "Temuulen Bayanmunkh"
const SUBTITLE = "Software Engineer"

export default function HeroSection() {
  const [visible, setVisible] = useState(false)
  const [typedTitle, setTypedTitle] = useState("")
  const [typedSub, setTypedSub] = useState("")
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t1)
  }, [])

  // Type-in title then subtitle
  useEffect(() => {
    if (!visible) return
    let i = 0
    const id = setInterval(() => {
      setTypedTitle(TITLE.slice(0, i + 1))
      i++
      if (i >= TITLE.length) clearInterval(id)
    }, 80)
    return () => clearInterval(id)
  }, [visible])

  useEffect(() => {
    if (typedTitle !== TITLE) return
    let i = 0
    const id = setTimeout(() => {
      const sub = setInterval(() => {
        setTypedSub(SUBTITLE.slice(0, i + 1))
        i++
        if (i >= SUBTITLE.length) clearSub()
      }, 55)
      const clearSub = () => clearInterval(sub)
    }, 400)
    return () => clearTimeout(id)
  }, [typedTitle])

  // Blinking cursor
  useEffect(() => {
    const id = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-6"
    >
      {/* Scanline vignette overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#080810_100%)]" />

      <div
        className={cn(
          "relative z-10 transition-all duration-1000",
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        {/* Glowing tag line */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase">
            Available for hire
          </span>
        </div>

        {/* Main title */}
        <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-bold leading-none tracking-tight text-foreground font-sans mb-2">
          <span className="relative">
            {typedTitle}
            {typedTitle !== TITLE && (
              <span
                className={cn(
                  "inline-block w-[0.08em] h-[0.9em] bg-cyan-400 align-middle ml-1 rounded-sm",
                  showCursor ? "opacity-100" : "opacity-0",
                )}
              />
            )}
          </span>
        </h1>

        {/* Subtitle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
          <h2 className="text-[clamp(1rem,2.5vw,1.5rem)] font-mono text-cyan-400 tracking-[0.3em] uppercase">
            {typedSub}
            {typedTitle === TITLE && typedSub !== SUBTITLE && (
              <span
                className={cn(
                  "inline-block w-[0.06em] h-[0.9em] bg-cyan-400 align-middle ml-0.5 rounded-sm",
                  showCursor ? "opacity-100" : "opacity-0",
                )}
              />
            )}
          </h2>
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
        </div>

        {/* Description */}
        <p
          className={cn(
            "max-w-xl mx-auto text-muted-foreground leading-relaxed text-base md:text-lg transition-all duration-1000 delay-700",
            typedSub === SUBTITLE ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          Full-stack engineer who builds enterprise tools by day and ships side projects by night.
          TypeScript, Python, and way too much coffee.
        </p>

        {/* CTA Buttons */}
        <div
          className={cn(
            "flex flex-wrap gap-4 justify-center mt-10 transition-all duration-1000 delay-1000",
            typedSub === SUBTITLE ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          <a
            href="#projects"
            className="group relative px-8 py-3 font-mono text-sm tracking-widest uppercase overflow-hidden rounded-full border border-cyan-500/60 text-cyan-400 hover:text-background transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-cyan-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">View Work</span>
          </a>
          <a
            href="#contact"
            className="group relative px-8 py-3 font-mono text-sm tracking-widest uppercase overflow-hidden rounded-full border border-rose-400/60 text-rose-400 hover:text-background transition-colors duration-300"
          >
            <span className="absolute inset-0 bg-rose-400 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Contact Me</span>
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-1500",
          typedSub === SUBTITLE ? "opacity-60" : "opacity-0",
        )}
      >
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan-500/80 to-transparent animate-bounce" />
      </div>
    </section>
  )
}
