"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface Skill {
  name: string
  level: number
  color: string
  glow: string
  category: string
}

const skills: Skill[] = [
  { name: "TypeScript", level: 95, color: "#3b82f6", glow: "rgba(59,130,246,0.4)", category: "Language" },
  { name: "React", level: 92, color: "#06b6d4", glow: "rgba(6,182,212,0.4)", category: "Frontend" },
  { name: "Next.js", level: 90, color: "#f0f0f5", glow: "rgba(240,240,245,0.3)", category: "Frontend" },
  { name: "Node.js", level: 90, color: "#34d399", glow: "rgba(52,211,153,0.4)", category: "Backend" },
  { name: "Python", level: 85, color: "#fbbf24", glow: "rgba(251,191,36,0.4)", category: "Language" },
  { name: "Java", level: 80, color: "#fb7185", glow: "rgba(251,113,133,0.4)", category: "Language" },
  { name: "Flutter", level: 82, color: "#06b6d4", glow: "rgba(6,182,212,0.4)", category: "Mobile" },
  { name: "PostgreSQL", level: 88, color: "#fbbf24", glow: "rgba(251,191,36,0.4)", category: "Database" },
  { name: "NestJS", level: 88, color: "#fb7185", glow: "rgba(251,113,133,0.4)", category: "Backend" },
  { name: "Docker", level: 85, color: "#06b6d4", glow: "rgba(6,182,212,0.4)", category: "DevOps" },
  { name: "MongoDB", level: 80, color: "#34d399", glow: "rgba(52,211,153,0.4)", category: "Database" },
  { name: "Redis", level: 78, color: "#a78bfa", glow: "rgba(167,139,250,0.4)", category: "Database" },
]

function SkillOrb({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-3 cursor-pointer transition-all duration-700",
        inView ? "opacity-100 scale-100" : "opacity-0 scale-75",
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Orb */}
      <div className="relative">
        {/* Outer glow ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-500",
            hovered ? "scale-125 opacity-100" : "scale-100 opacity-40",
          )}
          style={{
            background: `radial-gradient(circle, ${skill.glow} 0%, transparent 70%)`,
            width: "72px",
            height: "72px",
            transform: `translate(-50%, -50%) ${hovered ? "scale(1.4)" : "scale(1)"}`,
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />

        {/* SVG orb with progress ring */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          className={cn(
            "relative z-10 transition-transform duration-300",
            hovered ? "scale-110" : "scale-100",
          )}
        >
          {/* Background track */}
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
          />
          {/* Progress arc */}
          <circle
            cx="36"
            cy="36"
            r="30"
            fill="none"
            stroke={skill.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${(skill.level / 100) * 188.5} 188.5`}
            transform="rotate(-90 36 36)"
            style={{
              filter: `drop-shadow(0 0 6px ${skill.color})`,
              transition: "stroke-dasharray 1s ease",
            }}
          />
          {/* Dot at start of arc */}
          <circle
            cx="36"
            cy="6"
            r="3"
            fill={skill.color}
            style={{ filter: `drop-shadow(0 0 4px ${skill.color})` }}
          />
          {/* Center fill */}
          <circle
            cx="36"
            cy="36"
            r="22"
            fill={`${skill.color}18`}
            style={{ transition: "all 0.3s ease" }}
            opacity={hovered ? 2 : 1}
          />
        </svg>

        {/* Level % in center */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <span
            className={cn(
              "font-mono font-bold text-xs transition-all duration-200",
              hovered ? "opacity-100 scale-110" : "opacity-70",
            )}
            style={{ color: skill.color }}
          >
            {hovered ? `${skill.level}%` : skill.name.slice(0, 2)}
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="text-center">
        <div
          className={cn(
            "text-xs font-mono font-medium transition-all duration-300",
            hovered ? "text-foreground" : "text-muted-foreground",
          )}
          style={hovered ? { color: skill.color, textShadow: `0 0 8px ${skill.color}` } : {}}
        >
          {skill.name}
        </div>
        <div className="text-[10px] text-muted-foreground/50 mt-0.5">{skill.category}</div>
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { threshold: 0.15 })

  return (
    <section id="skills" ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase mb-4">02 / Skills</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
              tech stack
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Hover any orb to see proficiency level. These are the tools I use daily across my projects.
          </p>
        </div>

        {/* Orbs grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 justify-items-center">
          {skills.map((skill, i) => (
            <SkillOrb key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>

        {/* Additional tech row */}
        <div
          className={cn(
            "mt-16 flex flex-wrap justify-center gap-3 transition-all duration-700 delay-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          {["Tailwind CSS", "Prisma", "Supabase", "FastAPI", "Fastify", "n8n", "OpenAI API", "React Native"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono text-muted-foreground border border-white/10 rounded-full bg-white/5 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors cursor-default"
              >
                {tech}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
