"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import { Mail, Github, Linkedin, Instagram, Send, CheckCircle } from "lucide-react"

const socials = [
  { icon: Github, label: "GitHub", handle: "@TemuulenBM", href: "https://github.com/TemuulenBM" },
  { icon: Linkedin, label: "LinkedIn", handle: "temuulen-bayanmunkh", href: "https://www.linkedin.com/in/temuulen-bayanmunkh-304a93267/" },
  { icon: Instagram, label: "Instagram", handle: "@temuulnnnz", href: "https://www.instagram.com/temuulnnnz/" },
  { icon: Mail, label: "Email", handle: "temuulen.developer@gmail.com", href: "mailto:temuulen.developer@gmail.com" },
]

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { threshold: 0.2 })
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1500)
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="w-full max-w-5xl mx-auto">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <p className="font-mono text-xs tracking-[0.25em] text-cyan-400 uppercase mb-4">04 / Contact</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400">
              touch
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Got a project or just want to say hi? Drop me a message.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Contact form – 3 cols */}
          <div
            className={cn(
              "md:col-span-3 transition-all duration-700 delay-200",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
            )}
          >
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 overflow-hidden">
              {/* Corner accents */}
              <span className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-cyan-500/50 rounded-tl" />
              <span className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-rose-400/50 rounded-br" />

              {sent ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-10 text-center">
                  <CheckCircle className="w-12 h-12 text-cyan-400" />
                  <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                  <p className="text-muted-foreground">{"I'll"} get back to you within 24 hours.</p>
                  <button
                    className="mt-2 text-xs font-mono text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-full hover:bg-cyan-500/10 transition-colors"
                    onClick={() => { setSent(false); setForm({ name: "", email: "", message: "" }) }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="Your name"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="you@email.com"
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Hey, I wanted to talk about..."
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="group relative flex items-center justify-center gap-2 py-3 px-6 rounded-full font-mono text-sm tracking-wider uppercase overflow-hidden border border-cyan-500/60 text-cyan-400 hover:text-background transition-colors duration-300 disabled:opacity-60"
                  >
                    <span className="absolute inset-0 bg-cyan-500 translate-x-[-101%] group-hover:translate-x-0 group-disabled:translate-x-[-101%] transition-transform duration-300" />
                    <span className="relative z-10 flex items-center gap-2">
                      {sending ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Socials + info – 2 cols */}
          <div
            className={cn(
              "md:col-span-2 flex flex-col gap-5 transition-all duration-700 delay-400",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
            )}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-cyan-500/40 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/25 transition-colors">
                  <s.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{s.label}</div>
                  <div className="text-xs text-muted-foreground font-mono">{s.handle}</div>
                </div>
              </a>
            ))}

            {/* Availability badge */}
            <div className="mt-auto p-5 rounded-xl border border-green-500/30 bg-green-500/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-mono text-green-400 uppercase tracking-wider">
                  Open to opportunities
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Looking for full-time or freelance work. Feel free to reach out.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={cn(
            "mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-700 delay-600",
            inView ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="font-mono text-xs text-muted-foreground">
            © 2026 Temuulen Bayanmunkh. Crafted with React Three Fiber.
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            Made with{" "}
            <span className="text-cyan-400">{"<3"}</span>{" "}
            somewhere in the cosmos.
          </span>
        </div>
      </div>
    </section>
  )
}
