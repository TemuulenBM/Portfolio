"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useScrollStore } from "@/hooks/use-scroll-store"
import { Menu, X } from "lucide-react"

const links = [
  { label: "Hero", href: "#hero", section: 0 },
  { label: "About", href: "#about", section: 1 },
  { label: "Skills", href: "#skills", section: 2 },
  { label: "Projects", href: "#projects", section: 3 },
  { label: "Contact", href: "#contact", section: 4 },
]

export default function NavOverlay() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const section = useScrollStore((s) => s.section)
  const progress = useScrollStore((s) => s.progress)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      {/* Top bar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#080810]/80 backdrop-blur-md border-b border-white/10"
            : "bg-transparent",
        )}
      >
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-500 to-rose-400 transition-all duration-150" style={{ width: `${progress * 100}%` }} />

        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <a
            href="#hero"
            className="font-mono font-bold text-sm tracking-widest text-foreground hover:text-cyan-400 transition-colors uppercase"
            onClick={(e) => { e.preventDefault(); scrollTo("#hero") }}
          >
            <span className="text-cyan-400">{"<"}</span>
            {"TB"}
            <span className="text-cyan-400">{"/>"}</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                className={cn(
                  "font-mono text-xs tracking-widest uppercase transition-all duration-300 relative group",
                  section === link.section
                    ? "text-cyan-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all duration-300",
                    section === link.section ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </a>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#080810]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-all duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        {links.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            className={cn(
              "font-mono text-2xl tracking-[0.3em] uppercase transition-all duration-300",
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              section === link.section ? "text-cyan-400" : "text-muted-foreground hover:text-foreground",
            )}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Section indicator dots (right side) */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3" aria-hidden="true">
        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            title={link.label}
            className={cn(
              "transition-all duration-300 rounded-full",
              section === link.section
                ? "w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                : "w-2 h-2 bg-white/20 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </>
  )
}
