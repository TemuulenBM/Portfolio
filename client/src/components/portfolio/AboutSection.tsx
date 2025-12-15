import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { User, Briefcase, Heart } from "lucide-react";

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
  icon: typeof User;
}

function AnimatedCounter({ end, suffix, label, icon: Icon }: CounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-3">
        <Icon className="w-6 h-6 text-neon-cyan" />
      </div>
      <div className="text-4xl font-bold text-white mb-1" data-testid={`text-counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {count}{suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </motion.div>
  );
}

export default function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">About </span>
            <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink p-1 animate-glow-pulse">
                  <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center">
                    <div className="w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <User className="w-24 h-24 text-gray-600" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full shadow-neon-cyan blur-xl opacity-30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg text-gray-300 leading-relaxed" data-testid="text-about-bio">
                I'm a passionate full-stack developer with 1 year of experience building 
                modern web applications. I specialize in React, Next.js, Node.js, and TypeScript, 
                with hands-on experience in enterprise-level projects.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                I've worked on diverse projects including e-commerce platforms, client management 
                systems, and enterprise automation tools. I love learning new technologies, 
                solving complex problems, and building scalable solutions that make a real impact.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-16">
            <AnimatedCounter end={4} suffix="+" label="Projects" icon={Briefcase} />
            <AnimatedCounter end={1} suffix=" Year" label="Experience" icon={User} />
            <AnimatedCounter end={100} suffix="%" label="Passion" icon={Heart} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
