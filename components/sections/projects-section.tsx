"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Github } from "lucide-react"

interface Project {
  id: number
  title: string
  tagline: string
  description: string
  tech: string[]
  accentColor: string
  glowColor: string
  category: string
  repo?: string
  live?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Learnify",
    tagline: "Full-stack e-learning platform",
    description:
      "Online course platform I built for the Mongolian market. Has a web app, mobile app, and API all in one monorepo. 15 backend modules with DDD, 700+ tests.",
    tech: ["Next.js", "NestJS", "React Native", "PostgreSQL", "MongoDB"],
    accentColor: "#06b6d4",
    glowColor: "rgba(6,182,212,0.25)",
    category: "Full Stack",
    repo: "https://github.com/TemuulenBM/Online-course-platform",
    live: "https://online-course-platform-web.vercel.app/",
  },
  {
    id: 2,
    title: "ConvoAI",
    tagline: "AI-powered chatbot builder",
    description:
      "You can create a chatbot, train it on your website or custom Q&A, and embed it anywhere. Uses vector embeddings for smart answers. Has subscription tiers and analytics.",
    tech: ["React", "Node.js", "Supabase", "OpenAI", "BullMQ"],
    accentColor: "#a78bfa",
    glowColor: "rgba(167,139,250,0.25)",
    category: "AI / SaaS",
    repo: "https://github.com/TemuulenBM/convo-ai",
    live: "#",
  },
  {
    id: 3,
    title: "BB8",
    tagline: "Enterprise DevOps Slack bot",
    description:
      "Slack bot I built at work with 76+ commands for managing users, running Jenkins jobs, handling credentials, and more. Comes with a web dashboard for role-based access control.",
    tech: ["Python", "FastAPI", "React", "MySQL", "Docker"],
    accentColor: "#34d399",
    glowColor: "rgba(52,211,153,0.25)",
    category: "Enterprise",
  },
  {
    id: 4,
    title: "Local Retail",
    tagline: "Offline-first POS system",
    description:
      "Mobile app for small shop owners in Mongolia. Tracks inventory, handles sales, works offline with encrypted storage, and syncs when back online. Every stock change is logged.",
    tech: ["Flutter", "Fastify", "Supabase", "SQLCipher", "Redis"],
    accentColor: "#fb7185",
    glowColor: "rgba(251,113,133,0.25)",
    category: "Mobile",
    repo: "https://github.com/TemuulenBM/local-retail",
    live: "#",
  },
  {
    id: 5,
    title: "MoveMongolia",
    tagline: "Fitness survey platform",
    description:
      "Survey system for tracking fitness assessments across Mongolia. Testing centers register citizens, record measurements, and collect survey data. 12+ modules with Docker deployment.",
    tech: ["Node.js", "Express", "React", "Prisma", "PostgreSQL"],
    accentColor: "#fbbf24",
    glowColor: "rgba(251,191,36,0.25)",
    category: "Health Tech",
  },
  {
    id: 6,
    title: "Content Repurposing",
    tagline: "AI video clip automation",
    description:
      "Give it a YouTube video and it spits out 5 short vertical clips ready for TikTok, Reels, or Shorts. AI picks the best moments, crops to 9:16, and writes captions.",
    tech: ["n8n", "FFmpeg", "OpenAI Whisper", "GPT", "Cloudflare R2"],
    accentColor: "#06b6d4",
    glowColor: "rgba(6,182,212,0.25)",
    category: "AI Automation",
    repo: "https://github.com/TemuulenBM/content-repurposing",
    live: "#",
  },
]

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={cn(
        "relative h-72 cursor-pointer transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
        perspective: "1000px",
      }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 rounded-2xl border bg-white/5 backdrop-blur-md p-6 flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            borderColor: `${project.accentColor}40`,
            boxShadow: flipped ? "none" : `0 0 30px ${project.glowColor}`,
          }}
        >
          {/* Scan line effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none rounded-2xl"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${project.accentColor}20 2px, ${project.accentColor}20 4px)`,
            }}
          />

          {/* Category badge */}
          <div className="flex items-center mb-4">
            <span
              className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full border"
              style={{
                color: project.accentColor,
                borderColor: `${project.accentColor}50`,
                background: `${project.accentColor}15`,
              }}
            >
              {project.category}
            </span>
          </div>

          <h3
            className="text-2xl font-bold mb-1"
            style={{ color: project.accentColor, textShadow: `0 0 20px ${project.accentColor}60` }}
          >
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-auto">{project.tagline}</p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.slice(0, 4).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/8 text-muted-foreground border border-white/10"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/8 text-muted-foreground border border-white/10">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Click hint */}
          <div className="absolute bottom-4 right-4 text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
            Click to flip
          </div>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 rounded-2xl border bg-white/8 backdrop-blur-md p-6 flex flex-col overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${project.accentColor}60`,
            boxShadow: `0 0 50px ${project.glowColor}`,
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-5 pointer-events-none"
            style={{ background: `radial-gradient(circle at 30% 30%, ${project.accentColor}, transparent 60%)` }}
          />
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
            <button
              className="text-[10px] font-mono text-muted-foreground/60 hover:text-foreground uppercase tracking-widest transition-colors"
              onClick={(e) => { e.stopPropagation(); setFlipped(false) }}
            >
              Back
            </button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>
          {(project.repo || project.live) && (
            <div className="flex gap-3 mt-4">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-full border transition-all hover:scale-105"
                  style={{
                    color: project.accentColor,
                    borderColor: `${project.accentColor}50`,
                    background: `${project.accentColor}15`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                  Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 rounded-full border border-white/20 text-foreground bg-white/10 hover:bg-white/20 transition-all hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { threshold: 0.1 })

  return (
    <section id="projects" ref={ref} className="relative min-h-screen flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase mb-4">03 / Projects</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Things I{"'ve"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
              built
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Click any card to flip it and see details.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
