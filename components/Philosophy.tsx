"use client";

import React, { useState, useEffect } from 'react';
// Import 'Variants' type to fix the TypeScript error
import { motion, AnimatePresence, useMotionValue, useTransform, animate, type Variants } from 'framer-motion';

// Data: All philosophy quotes
const philosophyQuotes = [
  { quote: "I think, therefore I am.", author: "René Descartes", school: "existentialism" },
  { quote: "Everything we hear is an opinion, not the truth.", author: "Marcus Aurelius", school: "stoicism" },
  { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", school: "stoicism" },
  { quote: "Happiness depends upon ourselves.", author: "Aristotle", school: "stoicism" },
  { quote: "The unexamined life is not worth living.", author: "Socrates", school: "existentialism" },
  { quote: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", school: "existentialism" },
];

// Data for the philosophy school boxes
const philosophySchools = {
  stoicism: {
    title: "Stoicism",
    description: "A philosophy built on reason, nature, and virtue. It’s about facing reality head-on, with wisdom and resilience, instead of running from it. Founded by Zeno of Citium, Stoicism teaches that we can’t control the world, but we can control ourselves—our thoughts, our actions, our response. True peace and strength come not from what happens outside, but from the mind that refuses to be broken."
  },
  existentialism: {
    title: "Existentialism",
    description: "A philosophical theory which emphasizes the existence of the individual person as a free and responsible agent determining their own development through acts of the will. Explores themes of authenticity, freedom, anxiety, and the search for meaning in an apparently meaningless universe."
  }
};

// Typed glitch animation variants
const glitchVariants: Variants = {
  initial: {
    x: 0, y: 0,
    textShadow: "0 0 10px rgba(0, 255, 255, 0.3)"
  },
  glitch: {
    x: [0, -3, 3, -2, 2, 0],
    y: [0, 2, -2, 3, -3, 0],
    textShadow: [
      "0 0 10px rgba(0, 255, 255, 0.3)", "3px 0 #ff0000, -3px 0 #00ffff",
      "-3px 0 #ff0000, 3px 0 #00ffff", "2px 2px #ff0000, -2px -2px #00ffff",
      "0 0 20px rgba(255, 0, 0, 0.8)", "0 0 10px rgba(0, 255, 255, 0.3)"
    ],
    transition: { duration: 0.4, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: "easeInOut" }
  }
};

// Background data stream effect
const DataStreamBackground = () => {
  const [streams, setStreams] = useState<Array<{ id: number; width: string; left: string; top: string; rotate: string; }>>([]);
  useEffect(() => {
    const newStreams = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      width: `${200 + Math.random() * 300}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotate: `${Math.random() * 360}deg`
    }));
    setStreams(newStreams);
  }, []);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          style={{ ...stream }}
          animate={{ scaleX: [0, 1, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: stream.id * 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// Orbiting quote card component
const QuoteCard = ({ quote, author, index, isMobile, totalQuotes }: { quote: string; author: string; index: number; isMobile: boolean; totalQuotes: number; }) => {
  const initialAngle = index * (360 / totalQuotes);
  const angle = useMotionValue(initialAngle);

  useEffect(() => {
    const controls = animate(angle, angle.get() + 360, {
      duration: 30, repeat: Infinity, ease: "linear",
    });
    return () => controls.stop();
  }, [angle]);
  
  const getOrbitalPosition = (currentAngle: number) => {
    const rad = currentAngle * Math.PI / 180;
    if (isMobile) {
      // Mobile: Wide elliptical orbit that goes off-screen
      return { x: 0 + Math.cos(rad) * 350, y: 100 + Math.sin(rad) * 280 };
    } else {
      // Desktop: Large elliptical orbit around both boxes
      return { x: 0 + Math.cos(rad) * 550, y: 50 + Math.sin(rad) * 300 };
    }
  };
  
  const transform = useTransform(angle, a => {
    const pos = getOrbitalPosition(a);
    return `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`;
  });

  return (
    <motion.div
      className="absolute p-4 max-w-xs cursor-pointer rounded-lg border border-cyan-400/30 bg-black/50 backdrop-blur-md z-5"
      style={{ left: '50%', top: '50%', transform }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.2, type: "spring", stiffness: 120 }}
      whileHover={{ scale: 1.1, boxShadow: "0px 0px 30px rgba(0, 255, 255, 0.6)", zIndex: 100, borderColor: "rgba(0, 255, 255, 0.8)" }}
    >
      <motion.p className="text-sm italic text-cyan-200 leading-relaxed">&ldquo;{quote}&rdquo;</motion.p>
      <p className="text-right mt-3 text-xs font-mono text-fuchsia-400/80">- {author}</p>
      <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none"
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
      />
    </motion.div>
  );
};

// Philosophy school box component
const SchoolBox = ({ school, isGlitching, isMobile, currentSchool }: { school: keyof typeof philosophySchools; isGlitching: boolean; isMobile: boolean; currentSchool?: keyof typeof philosophySchools; }) => {
  const schoolData = philosophySchools[school];
  if (isMobile && currentSchool !== school) return null;

  return (
    <motion.div
      variants={glitchVariants}
      initial="initial"
      animate={isGlitching ? "glitch" : "initial"}
      className={`relative rounded-xl border-2 backdrop-blur-lg z-10 flex flex-col ${isMobile ? 'w-80 min-h-[16rem] p-6' : 'w-96 h-96 p-8'} ${isGlitching ? 'border-red-500 bg-red-900/20 shadow-lg shadow-red-500/30' : 'border-cyan-400/50 bg-black/30 shadow-lg shadow-cyan-400/20'}`}
      whileHover={{ scale: 1.02, borderColor: isGlitching ? '#ef4444' : '#00ffff', boxShadow: isGlitching ? '0 0 40px rgba(239, 68, 68, 0.4)' : '0 0 40px rgba(0, 255, 255, 0.4)' }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
      <div className={`absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
      <div className={`absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
      <div className={`absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 transition-colors duration-300 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
      <div className="relative z-10 h-full flex flex-col">
        <motion.h3 className={`text-3xl font-bold mb-6 font-mono ${isGlitching ? 'text-red-400' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400'}`}>{schoolData.title}</motion.h3>
        <motion.p className={`text-gray-300 text-sm leading-relaxed flex-grow ${isGlitching ? 'text-red-300' : ''}`}>
          <span className={`font-bold ${isGlitching ? 'text-red-400' : 'text-cyan-400'}`}>&gt;</span> {schoolData.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

// Main page component
const PhilosophyPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSchool, setCurrentSchool] = useState<keyof typeof philosophySchools>('stoicism');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setCurrentSchool(prev => prev === 'stoicism' ? 'existentialism' : 'stoicism');
          setIsGlitching(false);
        }, 400);
      }, 5000);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        if (Math.random() < 0.4) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 400);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  // Show fewer quotes on mobile to avoid clutter
  const quotesToShow = isMobile ? philosophyQuotes.slice(0, 3) : philosophyQuotes;

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center py-20 px-4">
      <DataStreamBackground />
      <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, type: "spring" }} className="relative mb-16 z-20">
        <motion.h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-mono text-center"
          style={{ textShadow: "0 0 40px rgba(0, 255, 255, 0.6)" }}
        >
          Philosophy Core
        </motion.h1>
      </motion.div>
      <div className={`relative z-10 flex items-center justify-center ${isMobile ? '' : 'gap-24'}`}>
        {isMobile ? (
          <SchoolBox school={currentSchool} isGlitching={isGlitching} isMobile={true} currentSchool={currentSchool} />
        ) : (
          <>
            <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, type: "spring" }}>
              <SchoolBox school="stoicism" isGlitching={isGlitching} isMobile={false} />
            </motion.div>
            <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, type: "spring" }}>
              <SchoolBox school="existentialism" isGlitching={isGlitching} isMobile={false} />
            </motion.div>
          </>
        )}
      </div>
      <div className="absolute inset-0">
        {quotesToShow.map((item, index) => (
          <QuoteCard key={item.quote} index={index} quote={item.quote} author={item.author} isMobile={isMobile} totalQuotes={quotesToShow.length} />
        ))}
      </div>
    </div>
  );
};

export default PhilosophyPage;