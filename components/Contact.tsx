"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Github, Instagram, Mail, Send, Signal, Copy, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef, type ElementType } from "react";
import emailjs from '@emailjs/browser';
import { ComponentType } from "react";

// --- Type Definitions ---
type QuantumParticle = {
  id: number;
  left: string;
  top: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
};

// Quantum communication particles
const QuantumParticles = () => {
  const [particles, setParticles] = useState<QuantumParticle[]>([]);

  useEffect(() => {
    // FIX: Generate random values on client-side to prevent Hydration Error
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{ left: p.left, top: p.top }}
          animate={{
            x: [0, p.x],
            y: [0, p.y],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// FIX: สร้าง Object เพื่อ map ค่าสีกับชื่อคลาส Tailwind แบบเต็ม
const colorClasses = {
  cyan: {
    border: "border-cyan-400",
    borderHover: "hover:border-cyan-400",
    borderHalfOpacity: "border-cyan-400/50",
    bg: "bg-cyan-900/20",
    bgHover: "hover:bg-cyan-900/30",
    bgIcon: "bg-cyan-400/20",
    bgIconHover: "group-hover:bg-cyan-400/30",
    text: "text-cyan-400",
    textSub: "text-cyan-300",
  },
  purple: {
    border: "border-purple-400",
    borderHover: "hover:border-purple-400",
    borderHalfOpacity: "border-purple-400/50",
    bg: "bg-purple-900/20",
    bgHover: "hover:bg-purple-900/30",
    bgIcon: "bg-purple-400/20",
    bgIconHover: "group-hover:bg-purple-400/30",
    text: "text-purple-400",
    textSub: "text-purple-300",
  },
  emerald: {
    border: "border-emerald-400",
    borderHover: "hover:border-emerald-400",
    borderHalfOpacity: "border-emerald-400/50",
    bg: "bg-emerald-900/20",
    bgHover: "hover:bg-emerald-900/30",
    bgIcon: "bg-emerald-400/20",
    bgIconHover: "group-hover:bg-emerald-400/30",
    text: "text-emerald-400",
    textSub: "text-emerald-300",
  },
};


type IconProps = {
  className?: string;
};
// Enhanced contact card (แก้ไขแล้ว)
const ContactCard = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  link, 
  color,
  delay = 0 
}: {
  icon: ComponentType<IconProps>;  // FIX: ใช้ ElementType แทน any
  title: string;
  subtitle: string;
  link: string;
  color: keyof typeof colorClasses; // FIX: ใช้ key ของ object colorClasses
  delay?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // FIX: ดึงชุดคลาสสีจาก object
  const colors = colorClasses[color];

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.03) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  const handleCopy = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(subtitle);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const isMail = link.startsWith("mailto:");

  const cardContent = (
    <div 
      className={`
        relative p-6 rounded-lg border-2 backdrop-blur-sm transition-all duration-500 group
        ${isGlitching 
          ? 'border-red-500 bg-red-500/10 animate-pulse' 
          : `${colors.borderHalfOpacity} ${colors.bg} ${colors.borderHover} ${colors.bgHover}`
        }
      `}
      onClick={isMail ? handleCopy : undefined}
      style={{ cursor: isMail ? 'pointer' : 'default' }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 + delay, ease: "linear" }}
      />
      <div className={`absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : colors.border}`} />
      <div className={`absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : colors.border}`} />
      <div className={`absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : colors.border}`} />
      <div className={`absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : colors.border}`} />

      <div className="relative flex items-center space-x-4">
        <motion.div
          className={`p-3 rounded-full border transition-all duration-300 ${isGlitching ? 'border-red-500 bg-red-500/20' : `${colors.borderHalfOpacity} ${colors.bgIcon} ${colors.bgIconHover}`}`}
          animate={{ boxShadow: isHovered ? `0 0 25px ${color === 'cyan' ? '#00ffff' : color === 'purple' ? '#a855f7' : '#10b981'}80` : `0 0 10px ${color === 'cyan' ? '#00ffff' : color === 'purple' ? '#a855f7' : '#10b981'}40` }}
        >
          <Icon className={`h-6 w-6 transition-all duration-300 ${isGlitching ? 'text-red-400' : colors.text}`} />
        </motion.div>
        <div className="flex-1">
          <h3 className={`font-bold font-mono transition-all duration-300 ${isGlitching ? 'text-red-400' : colors.textSub}`} style={{ textShadow: `0 0 10px ${isGlitching ? '#ef4444' : color === 'cyan' ? '#00ffff' : color === 'purple' ? '#a855f7' : '#10b981'}` }}>
            {title}
          </h3>
          <p className={`text-sm font-mono transition-colors duration-300 ${isGlitching ? 'text-red-300' : 'text-gray-400'}`}>{subtitle}</p>
        </div>
        {isMail && (
          <div className="text-sm font-mono transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            {isCopied ? <Check className="text-green-400" /> : <Copy className={colors.text} />}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, y: -5 }}
      className="perspective-1000"
    >
      {isMail ? cardContent : <Link href={link} target="_blank" className="block">{cardContent}</Link>}
    </motion.div>
  );
};


const TransmissionWaves = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full border border-cyan-400/10"
          style={{
            width: `${20 + i * 40}%`,
            height: `${20 + i * 40}%`,
            marginLeft: `-${10 + i * 20}%`,
            marginTop: `-${10 + i * 20}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const HolographicForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitted, setTransmitted] = useState<'success' | 'error' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTransmitting(true);
    setTransmitted(null);

    if (!form.current) {
        console.error("Form reference is not available.");
        setTransmitted('error');
        setIsTransmitting(false);
        return;
    }
    
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      console.error("EmailJS environment variables are not set! Please check your .env.local file and restart the server.");
      setTransmitted('error');
      setIsTransmitting(false);
      return;
    }

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then(
        () => {
          setTransmitted('success');
          form.current?.reset();
        },
        (error) => {
          console.error("FAILED...", error);
          setTransmitted('error');
        }
      )
      .finally(() => {
        setIsTransmitting(false);
        setTimeout(() => setTransmitted(null), 4000);
      });
  };

  return (
    <motion.div
      className="relative"
      initial={{ x: 100, opacity: 0, rotateY: -30 }}
      whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <div className="relative p-6 border-2 border-cyan-400/30 bg-cyan-900/10 rounded-lg backdrop-blur-sm">
        <form ref={form} onSubmit={handleSubmit} className="relative space-y-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">QUANTUM COMMUNICATION</h3>
            <p className="text-cyan-300 font-mono text-sm mt-2">&gt; Establishing secure connection...</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="user_name" className="text-cyan-400 font-mono text-sm font-bold">Your Name</Label>
            <Input id="user_name" name="user_name" type="text" placeholder="e.g., Jane Doe" required className="border-2 border-cyan-400/50 bg-black/50 text-cyan-100 font-mono placeholder:text-cyan-600 focus:border-cyan-400 focus:bg-cyan-900/20 transition-all" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="user_email" className="text-cyan-400 font-mono text-sm font-bold">Your Email</Label>
            <Input id="user_email" name="user_email" type="email" placeholder="e.g., jane.doe@example.com" required className="border-2 border-cyan-400/50 bg-black/50 text-cyan-100 font-mono placeholder:text-cyan-600 focus:border-cyan-400 focus:bg-cyan-900/20 transition-all" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-cyan-400 font-mono text-sm font-bold">Your Message</Label>
            <Textarea id="message" name="message" placeholder="Hi Kongpop, I'd like to talk about..." required className="border-2 border-cyan-400/50 bg-black/50 text-cyan-100 font-mono placeholder:text-cyan-600 focus:border-cyan-400 focus:bg-cyan-900/20 transition-all min-h-[120px]" />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button type="submit" disabled={isTransmitting} className="w-full border-2 border-cyan-400 bg-cyan-900/20 text-cyan-400 font-mono font-bold transition-all hover:bg-cyan-400/20 hover:text-white hover:shadow-lg hover:shadow-cyan-400/50 disabled:opacity-50">
              {isTransmitting ? ( <motion.div className="flex items-center justify-center"> <motion.div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full mr-2" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} /> TRANSMITTING... </motion.div> ) : ( <> TRANSMIT SIGNAL <Send className="ml-2 h-4 w-4" /> </> )}
            </Button>
          </motion.div>
          <AnimatePresence>
            {transmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`text-center p-3 border rounded font-mono ${transmitted === 'success' ? 'border-green-400 bg-green-900/20 text-green-400' : 'border-red-400 bg-red-900/20 text-red-400'}`}
              >
                {transmitted === 'success' ? "> SIGNAL TRANSMITTED SUCCESSFULLY" : "> TRANSMISSION FAILED: Check console for details"}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </motion.div>
  );
};

// Main Contact component
const Contact = () => {
  const contacts = [
    { icon: Mail, title: "Email", subtitle: "51921@ayw.ac.th", link: "mailto:51921@ayw.ac.th", color: "cyan" as const },
    { icon: Github, title: "Github", subtitle: "github.com/Mr-ZeroBugs", link: "https://github.com/Mr-ZeroBugs", color: "purple" as const },
    { icon: Instagram, title: "Instagram", subtitle: "instagram.com/antarctic.intellectual", link: "https://www.instagram.com/antarctic.intellectual/", color: "emerald" as const },
  ];

  return (
    <div
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <QuantumParticles />
      <TransmissionWaves />

      <motion.h2
        className="text-5xl md:text-7xl font-bold font-mono mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
      >
        CONTACT
      </motion.h2>

      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-2 z-10">
        <div className="flex flex-col space-y-8">
          <motion.p 
            className="text-lg text-cyan-200 font-mono text-center md:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            &gt; Open a channel or transmit a signal. I am always open to new connections and collaborations.
          </motion.p>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <ContactCard
                key={contact.title}
                icon={contact.icon}
                title={contact.title}
                subtitle={contact.subtitle}
                link={contact.link}
                color={contact.color}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
        <HolographicForm />
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
      />
      
      <motion.div
        className="absolute top-4 right-4 flex items-center space-x-2 bg-black/70 px-3 py-1 rounded border border-green-400/50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-2 h-2 bg-green-400 rounded-full"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="text-xs text-green-400 font-mono">CONNECTION_STABLE</span>
      </motion.div>
    </div>
  );
};

export default Contact;