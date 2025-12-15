import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Twitter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const socialLinks = [
  { icon: Github, name: "GitHub", href: "https://github.com" },
  { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, name: "Twitter", href: "https://twitter.com" },
];

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-gray-400">
            <span>2024 Temuulen Bayanmunkh. Built with</span>
            <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" />
            <span>using React & TypeScript</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label={link.name}
                  data-testid={`link-footer-${link.name.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="icon"
          onClick={scrollToTop}
          className="bg-neon-cyan text-black shadow-neon-cyan hover:shadow-[0_0_30px_hsl(187_100%_47%/0.6)] transition-shadow rounded-full"
          aria-label="Back to top"
          data-testid="button-back-to-top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </motion.div>
    </footer>
  );
}
