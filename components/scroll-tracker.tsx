"use client"

import { useEffect } from "react"
import { useScrollStore } from "@/hooks/use-scroll-store"

export default function ScrollTracker() {
  const setProgress = useScrollStore((s) => s.setProgress)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
      setProgress(progress)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [setProgress])

  return null
}
