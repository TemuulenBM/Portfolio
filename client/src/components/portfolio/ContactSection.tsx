import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Mail, MapPin, Github, Linkedin, Twitter, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ContactInfo {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}

interface SocialLink {
  icon: typeof Github;
  name: string;
  href: string;
}

const contactInfo: ContactInfo[] = [
  { icon: Mail, label: "Email", value: "temuulen.bayanmunkh@example.com", href: "mailto:temuulen.bayanmunkh@example.com" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
];

const socialLinks: SocialLink[] = [
  { icon: Github, name: "GitHub", href: "https://github.com" },
  { icon: Linkedin, name: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, name: "Twitter", href: "https://twitter.com" },
];

export default function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-white">Let's Build </span>
            <span className="bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">Something Amazing</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Have a project in mind? Let's talk about it.
          </p>

          <div className="grid md:grid-cols-5 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-3"
            >
              <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm text-gray-400">Name</label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="bg-transparent border-gray-700 focus:border-neon-cyan text-white placeholder:text-gray-600"
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-gray-400">Email</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="bg-transparent border-gray-700 focus:border-neon-cyan text-white placeholder:text-gray-600"
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm text-gray-400">Subject</label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      required
                      className="bg-transparent border-gray-700 focus:border-neon-cyan text-white placeholder:text-gray-600"
                      data-testid="input-subject"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm text-gray-400">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      required
                      rows={6}
                      className="bg-transparent border-gray-700 focus:border-neon-cyan text-white placeholder:text-gray-600 resize-none"
                      data-testid="input-message"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-neon-pink text-white font-semibold shadow-neon-pink hover:shadow-[0_0_30px_hsl(338_100%_50%/0.6)] transition-shadow disabled:opacity-50"
                    data-testid="button-submit"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="md:col-span-2 space-y-6"
            >
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card
                    key={index}
                    className="bg-white/5 backdrop-blur-lg border-white/10 p-6 hover:shadow-neon-cyan/30 transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-neon-cyan/10 border border-neon-cyan/30">
                        <Icon className="w-6 h-6 text-neon-cyan" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-neon-cyan transition-colors"
                            data-testid={`link-${info.label.toLowerCase()}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white" data-testid={`text-${info.label.toLowerCase()}`}>{info.value}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}

              <Card className="bg-white/5 backdrop-blur-lg border-white/10 p-6">
                <p className="text-sm text-gray-400 mb-4">Connect with me</p>
                <div className="flex gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-neon-purple/20 hover:border-neon-purple/50 transition-all"
                        aria-label={link.name}
                        data-testid={`link-social-${link.name.toLowerCase()}`}
                      >
                        <Icon className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
