"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Code2, Cpu, Globe, Zap } from "lucide-react"

const stats = [
  { label: "Years of experience", value: "2+" },
  { label: "Projects shipped", value: "7+" },
  { label: "Technologies used", value: "20+" },
  { label: "Coffee cups", value: "∞" },
]

const highlights = [
  { icon: Code2, label: "Clean Code", desc: "I care about code that other people can actually read and work with." },
  { icon: Zap, label: "Performance", desc: "Fast pages, smooth animations, no unnecessary re-renders." },
  { icon: Globe, label: "Full Stack", desc: "I handle everything from the database to the UI." },
  { icon: Cpu, label: "AI Integration", desc: "I use OpenAI, Whisper, and embeddings in my projects." },
]

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { threshold: 0.2 })

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      {/* Glass panel */}
      <div
        className={cn(
          "w-full max-w-5xl mx-auto transition-all duration-1000",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16",
        )}
      >
        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-10 md:p-14 overflow-hidden">
          {/* Corner decorations */}
          <span className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-cyan-500/60 rounded-tl" />
          <span className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-cyan-500/60 rounded-tr" />
          <span className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-rose-400/60 rounded-bl" />
          <span className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-rose-400/60 rounded-br" />

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left */}
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase mb-4">
                01 / About
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 text-balance">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
                  me
                </span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {"I'm"} a full-stack engineer at GrapeCIty Mongolia. I work on enterprise systems like DevOps automation bots and configuration management platforms using TypeScript, Python, and Java.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                On my own time, I build SaaS platforms, mobile apps with Flutter, and AI automation tools. I enjoy shipping real products that people actually use.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                {stats.map((s) => (
                  <div key={s.label} className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-2xl font-bold text-cyan-400 font-mono">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right – highlights */}
            <div className="grid grid-cols-1 gap-4">
              {highlights.map((h, i) => (
                <div
                  key={h.label}
                  className={cn(
                    "flex items-start gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 transition-all duration-300 group",
                    inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
                  )}
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/25 transition-colors">
                    <h.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground mb-1">{h.label}</div>
                    <div className="text-sm text-muted-foreground">{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
