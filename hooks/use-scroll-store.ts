import { create } from "zustand"

interface ScrollStore {
  progress: number      // 0 → 1 across full page
  section: number       // 0-4 which section we're in
  setProgress: (p: number) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  section: 0,
  setProgress: (p) =>
    set({ progress: p, section: Math.min(4, Math.floor(p * 5)) }),
}))
