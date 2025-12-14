import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Building2, Calendar, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  achievements: string[];
  tech: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "TechCorp Inc.",
    role: "Senior Full-Stack Engineer",
    duration: "2022 - Present",
    achievements: [
      "Led development of microservices architecture serving 1M+ users",
      "Reduced API response time by 60% through optimization",
      "Mentored 5 junior developers",
    ],
    tech: ["React", "Node.js", "AWS", "Docker"],
  },
  {
    id: 2,
    company: "StartupXYZ",
    role: "Full-Stack Developer",
    duration: "2020 - 2022",
    achievements: [
      "Built MVP from scratch that secured $2M funding",
      "Implemented real-time features using WebSockets",
      "Reduced infrastructure costs by 40%",
    ],
    tech: ["Vue.js", "Python", "PostgreSQL", "GCP"],
  },
  {
    id: 3,
    company: "Digital Agency Pro",
    role: "Frontend Developer",
    duration: "2019 - 2020",
    achievements: [
      "Developed 15+ responsive websites for clients",
      "Improved page load speeds by 70%",
      "Established component library and design system",
    ],
    tech: ["React", "TypeScript", "Sass", "Figma"],
  },
  {
    id: 4,
    company: "Freelance",
    role: "Web Developer",
    duration: "2018 - 2019",
    achievements: [
      "Completed 20+ projects for various clients",
      "Specialized in e-commerce and business websites",
      "Built long-term relationships with repeat clients",
    ],
    tech: ["JavaScript", "PHP", "WordPress", "MySQL"],
  },
];

function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 hidden md:block"
      >
        <Card 
          className="bg-white/5 backdrop-blur-lg border-white/10 p-6 hover:shadow-neon-cyan transition-shadow"
          data-testid={`card-experience-${experience.id}`}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
              <Building2 className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{experience.role}</h3>
              <p className="text-neon-purple">{experience.company}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Calendar className="w-4 h-4" />
            {experience.duration}
          </div>
          
          <ul className="space-y-2 mb-4">
            {experience.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="relative z-10"
      >
        <div className="w-4 h-4 rounded-full bg-neon-cyan shadow-neon-cyan" />
      </motion.div>

      <div className="flex-1 hidden md:block" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex-1 md:hidden"
      >
        <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
              <Building2 className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{experience.role}</h3>
              <p className="text-neon-purple text-sm">{experience.company}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <Calendar className="w-4 h-4" />
            {experience.duration}
          </div>
          
          <ul className="space-y-2 mb-4">
            {experience.achievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4 text-neon-cyan mt-0.5 flex-shrink-0" />
                {achievement}
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2">
            {experience.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-neon-purple/20 text-neon-purple border-neon-purple/30 text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default function ExperienceSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="experience" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-white">My </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            A timeline of my professional experience
          </p>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink hidden md:block" />
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-pink md:hidden" />
            
            <div className="space-y-12">
              {experiences.map((experience, index) => (
                <ExperienceCard key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
