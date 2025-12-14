# Design Guidelines: Futuristic Full-Stack Engineer Portfolio

## Design Approach
**Reference-Based Cyberpunk/Sci-Fi Aesthetic** - Drawing inspiration from modern cyberpunk interfaces, glassmorphism trends, and futuristic UI patterns. This is a visually-driven portfolio showcasing technical expertise through stunning design.

## Color System
- **Background**: #0a0a0a (near-black)
- **Primary Accent**: #00f0ff (cyan) - neon glow effects, CTAs
- **Secondary Accent**: #b537ff (purple) - highlights, borders
- **Tertiary Accent**: #ff006e (pink) - interactive elements
- **Glass Effects**: White overlays with 10-20% opacity + backdrop-blur

## Typography
- **Font Family**: Inter (Google Fonts)
- **Hero Title**: text-6xl md:text-7xl, font-bold, cyan gradient
- **Section Titles**: text-4xl md:text-5xl, font-bold, white with neon underglow
- **Headings**: text-2xl md:text-3xl, font-semibold
- **Body**: text-base md:text-lg, text-gray-300
- **Tech Tags**: text-sm, uppercase, tracking-wider

## Layout System
**Spacing Units**: Tailwind's 4, 8, 12, 16, 24, 32 for consistent rhythm
- Section padding: py-24 md:py-32
- Container: max-w-7xl mx-auto px-6
- Card spacing: gap-8 md:gap-12
- Element spacing: space-y-8

## Component Library

### Navigation
- Sticky top-0 with backdrop-blur-xl
- Glass background (bg-black/30)
- Neon underline on active link
- Mobile: slide-in menu from right with overlay

### Hero Section (Full Viewport)
- Animated typing effect for main headline
- Two neon-glow CTA buttons side-by-side
- Particle/grid background animation layer
- Floating geometric shapes (subtle)

### About Section
- Two-column: Image (40%) | Content (60%)
- Professional photo with cyan neon border (border-4, glow effect)
- Three animated counter stats in grid below content

### Skills Section
- Three-category grid (Frontend, Backend, DevOps)
- Each category: glassmorphic card with skill items
- Animated progress bars (fill on scroll)
- Hover: card lifts (scale-105) with cyan glow

### Projects Section
- Filter buttons: pill-shaped with active state (neon background)
- 3-column grid (responsive to 1 column mobile)
- Glassmorphic cards with:
  - Image placeholder (aspect-video)
  - Title, description, tech tags
  - Two buttons: "Live Demo" + "GitHub"
- Hover: lift + purple/pink glow border

### Experience Section
- Vertical timeline with animated connecting line (cyan)
- Alternating left/right layout (desktop)
- Glassmorphic cards containing:
  - Company/role/duration
  - Bullet-point achievements
  - Tech stack pills at bottom
- Scroll-triggered fade-in animations

### Contact Section
- Two-column: Form (60%) | Info Cards (40%)
- Form inputs: transparent bg with cyan border-b, glows on focus
- Submit button: large with neon pink glow
- Right: stacked info cards (email, location, socials with icons)

### Footer
- Centered layout with subtle particle effect
- Copyright text + social icon row
- Floating "Back to Top" button (bottom-right, appears on scroll)

## Animations (Framer Motion)
- **Page Load**: Staggered fade-in from hero downward
- **Scroll Triggers**: Fade-in + slide-up for all sections
- **Typing Effect**: react-type-animation in hero
- **Counters**: Animated number increment on scroll
- **Progress Bars**: Width animation 0→target% on view
- **Hover States**: scale(1.05) + glow for all interactive elements
- **Timeline**: Line draws from top to bottom on scroll

## Images
- **Hero**: No large hero image - particle/grid animation background instead
- **About**: Professional headshot placeholder (400x400px, rounded with neon border)
- **Projects**: 6 placeholder project images (16:9 aspect ratio, tech-themed mockups)

## Glassmorphism Implementation
- Cards: `bg-white/10 backdrop-blur-lg border border-white/20`
- Navbar: `bg-black/30 backdrop-blur-xl`
- Overlays: `bg-black/50 backdrop-blur-sm`

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation for menu and forms
- Focus states with cyan ring
- Alt text for all images
- Semantic HTML structure

## Responsive Breakpoints
- Mobile: Single column, stacked layouts
- Tablet (md): 2-column for projects, simplified timeline
- Desktop (lg+): Full multi-column layouts, parallax effects

This cyberpunk portfolio prioritizes visual impact through neon glows, glassmorphism, and smooth animations while maintaining clean information hierarchy and professional content presentation.