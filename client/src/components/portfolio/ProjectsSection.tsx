import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Layers, Code, Server, Box } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Category = "All" | "Frontend" | "Backend" | "Full-Stack";

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  category: Category;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory and payment processing",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full-Stack",
  },
  {
    id: 2,
    title: "AI Dashboard",
    description: "Analytics dashboard with machine learning insights and data visualization",
    tech: ["Next.js", "Python", "TensorFlow", "D3.js"],
    category: "Full-Stack",
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative project management tool with real-time updates",
    tech: ["React", "Firebase", "Material-UI"],
    category: "Frontend",
  },
  {
    id: 4,
    title: "REST API Service",
    description: "Scalable microservices architecture with authentication and rate limiting",
    tech: ["Node.js", "Express", "PostgreSQL", "Redis"],
    category: "Backend",
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "Instagram-like social network with real-time messaging and media sharing",
    tech: ["Next.js", "GraphQL", "AWS", "Socket.io"],
    category: "Full-Stack",
  },
  {
    id: 6,
    title: "DevOps Pipeline",
    description: "Automated CI/CD pipeline with containerization and monitoring",
    tech: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    category: "Backend",
  },
];

const categories: Category[] = ["All", "Frontend", "Backend", "Full-Stack"];

const categoryIcons: Record<Category, typeof Layers> = {
  "All": Layers,
  "Frontend": Code,
  "Backend": Server,
  "Full-Stack": Box,
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      layout
    >
      <Card 
        className="group bg-white/5 backdrop-blur-lg border-white/10 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-neon-purple"
        data-testid={`card-project-${project.id}`}
      >
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-neon-purple/5 to-neon-pink/5" />
          <Layers className="w-16 h-16 text-gray-600 group-hover:text-neon-cyan transition-colors" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white group-hover:text-neon-cyan transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="bg-white/10 text-gray-300 border-white/20 text-xs"
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:bg-neon-cyan hover:text-black"
              data-testid={`button-demo-${project.id}`}
              onClick={() => console.log(`Live demo clicked for ${project.title}`)}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-white/10"
              data-testid={`button-github-${project.id}`}
              onClick={() => console.log(`GitHub clicked for ${project.title}`)}
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            A selection of my recent work and side projects
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`${
                    activeCategory === category
                      ? "bg-neon-purple text-white shadow-neon-purple"
                      : "border-gray-600 text-gray-400 hover:text-white hover:border-neon-purple"
                  }`}
                  data-testid={`button-filter-${category.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category}
                </Button>
              );
            })}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
