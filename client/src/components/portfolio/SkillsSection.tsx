import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Server, Cloud } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code,
    color: "neon-cyan",
    skills: [
      { name: "React", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "TypeScript", level: 82 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Material-UI", level: 75 },
      { name: "Mantine", level: 75 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    color: "neon-purple",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 78 },
      { name: "Python", level: 75 },
      { name: "FastAPI", level: 72 },
      { name: "PostgreSQL", level: 80 },
      { name: "Prisma", level: 78 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: Cloud,
    color: "neon-pink",
    skills: [
      { name: "Docker", level: 75 },
      { name: "Git", level: 85 },
      { name: "Vite", level: 80 },
      { name: "Stripe", level: 70 },
      { name: "Vercel", level: 75 },
    ],
  },
];

function SkillBar({ skill, color, delay }: { skill: Skill; color: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  const colorClasses: Record<string, string> = {
    "neon-cyan": "bg-neon-cyan shadow-neon-cyan",
    "neon-purple": "bg-neon-purple shadow-neon-purple",
    "neon-pink": "bg-neon-pink shadow-neon-pink",
  };

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{skill.name}</span>
        <span className="text-gray-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full rounded-full ${colorClasses[color]}`}
        />
      </div>
    </div>
  );
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const Icon = category.icon;

  const iconColors: Record<string, string> = {
    "neon-cyan": "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/10",
    "neon-purple": "text-neon-purple border-neon-purple/30 bg-neon-purple/10",
    "neon-pink": "text-neon-pink border-neon-pink/30 bg-neon-pink/10",
  };

  const glowColors: Record<string, string> = {
    "neon-cyan": "group-hover:shadow-neon-cyan",
    "neon-purple": "group-hover:shadow-neon-purple",
    "neon-pink": "group-hover:shadow-neon-pink",
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <Card 
        className={`group bg-white/5 backdrop-blur-lg border-white/10 p-6 transition-all duration-300 hover:scale-105 ${glowColors[category.color]}`}
        data-testid={`card-skill-${category.title.toLowerCase()}`}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-lg border ${iconColors[category.color]}`}>
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold text-white">{category.title}</h3>
        </div>
        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <SkillBar
              key={skill.name}
              skill={skill}
              color={category.color}
              delay={0.1 * skillIndex}
            />
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-white">Tech </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Technologies I work with to build amazing products
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <SkillCard key={category.title} category={category} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
