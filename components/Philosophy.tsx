"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate} from 'framer-motion';

// --- Data ---

const philosophyQuotes = [
  { quote: "I think, therefore I am.", author: "René Descartes", school: "existentialism" },
  { quote: "Everything we hear is an opinion, not the truth.", author: "Marcus Aurelius", school: "stoicism" },
  { quote: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle", school: "stoicism" },
  { quote: "Happiness depends upon ourselves.", author: "Aristotle", school: "stoicism" },
  { quote: "The unexamined life is not worth living.", author: "Socrates", school: "existentialism" },
  { quote: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche", school: "existentialism" },
];

const philosophySchools = {
  stoicism: {
    title: "Stoicism",
    description: "A philosophy built on reason, nature, and virtue. It’s about facing reality head-on, with wisdom and resilience, instead of running from it.Stoicism teaches that we can’t control the world, but we can control ourselves—our thoughts, our actions. True peace and strength come not from what happens outside, but from within.",
    color: "#06B6D4", // Cyan
    glowColor: "#22D3EE",
  },
  existentialism: {
    title: "Existentialism",
    description: "A philosophical theory which emphasizes the existence of the individual person as a free and responsible agent determining their own development through acts of the will. Explores themes of authenticity, freedom, anxiety, and the search for meaning in an apparently meaningless universe.",
    color: "#A855F7", // Purple
    glowColor: "#C084FC",
  }
};

// --- Type Definitions ---
type School = keyof typeof philosophySchools;

// --- Sub Components ---

const AnimatedQuote = ({ quote, glowColor }: { quote: { quote: string; author: string }, glowColor: string }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => `"${quote.quote.slice(0, latest)}"`);

    useEffect(() => {
        const controls = animate(count, quote.quote.length, {
            type: 'tween',
            duration: 3,
            ease: 'easeInOut',
        });
        return controls.stop;
    }, [quote.quote, count]);

    return (
        <div className="text-center font-mono h-24 flex flex-col justify-center items-center">
            <motion.p className="text-sm italic" style={{ textShadow: `0 0 10px ${glowColor}` }}>
                {displayText}
            </motion.p>
            <motion.p className="text-xs mt-2 opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 3 }}>
                - {quote.author}
            </motion.p>
        </div>
    );
};

const QuoteCard = ({ quote, author, index, isMobile, totalQuotes }: { quote: string; author: string; index: number; isMobile: boolean; totalQuotes: number; }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const initialAngle = index * (360 / totalQuotes);
  const angle = useMotionValue(initialAngle);

  useEffect(() => {
    setHasMounted(true); // This now runs only on the client
    const controls = animate(angle, angle.get() + 360, {
      duration: 30, repeat: Infinity, ease: "linear",
    });
    return () => controls.stop();
  }, [angle]);
  
  const getOrbitalPosition = (currentAngle: number) => {
    const rad = currentAngle * Math.PI / 180;
    if (isMobile) {
      return { x: 0 + Math.cos(rad) * 350, y: 100 + Math.sin(rad) * 280 };
    } else {
      return { x: 0 + Math.cos(rad) * 550, y: 50 + Math.sin(rad) * 300 };
    }
  };
  
  const transform = useTransform(angle, a => {
    const pos = getOrbitalPosition(a);
    return `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`;
  });

  // Prevent rendering on the server and initial client render to avoid hydration mismatch
  if (!hasMounted) {
    return null;
  }

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

const SchoolBox = ({ school, isGlitching, isMobile, currentSchool }: { school: School; isGlitching: boolean; isMobile: boolean; currentSchool?: School; }) => {
  const schoolData = philosophySchools[school];
  const { color, glowColor } = schoolData;
  const [currentQuote, setCurrentQuote] = useState(philosophyQuotes.filter(q => q.school === school)[0]);

  useEffect(() => {
    const relevantQuotes = philosophyQuotes.filter(q => q.school === school);
    const quoteInterval = setInterval(() => {
      setCurrentQuote(prev => {
        const currentIndex = relevantQuotes.findIndex(q => q.quote === prev.quote);
        return relevantQuotes[(currentIndex + 1) % relevantQuotes.length];
      });
    }, 7000);
    return () => clearInterval(quoteInterval);
  }, [school]);

  if (isMobile && currentSchool !== school) return null;

  return (
    <motion.div
      className={`relative rounded-xl border-2 backdrop-blur-lg z-10 flex flex-col ${isMobile ? 'w-80 h-auto p-6' : 'w-96 p-8'}`}
      style={{
        borderColor: isGlitching ? '#ef4444' : color,
        boxShadow: isGlitching ? '0 0 40px rgba(239, 68, 68, 0.4)' : `0 0 40px ${color}50`,
        backgroundColor: 'rgba(0,0,0,0.3)'
      }}
      whileHover={{
        scale: 1.02,
        borderColor: isGlitching ? '#ef4444' : glowColor,
        boxShadow: isGlitching ? '0 0 40px rgba(239, 68, 68, 0.4)' : `0 0 40px ${glowColor}70`
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 transition-colors duration-300`} style={{ borderColor: isGlitching ? '#ef4444' : color }} />
      <div className={`absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 transition-colors duration-300`} style={{ borderColor: isGlitching ? '#ef4444' : color }} />
      <div className={`absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 transition-colors duration-300`} style={{ borderColor: isGlitching ? '#ef4444' : color }} />
      <div className={`absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 transition-colors duration-300`} style={{ borderColor: isGlitching ? '#ef4444' : color }} />

      <div className="relative z-10 h-full flex flex-col">
        <motion.h3
          className={`text-3xl font-bold mb-4 font-mono`}
          style={{ color: isGlitching ? '#ef4444' : glowColor, textShadow: `0 0 15px ${isGlitching ? '#ef4444' : glowColor}` }}
        >
          {schoolData.title}
        </motion.h3>
        <p className={`text-gray-300 text-sm leading-relaxed flex-grow ${isGlitching ? 'text-red-300' : ''}`}>
          <span className={`font-bold`} style={{ color: isGlitching ? '#ef4444' : color }}>&gt;</span> {schoolData.description}
        </p>
        <AnimatePresence mode="wait">
            <motion.div
                key={currentQuote.quote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
            >
                <AnimatedQuote quote={currentQuote} glowColor={glowColor} />
            </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---
const PhilosophyPage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentSchool, setCurrentSchool] = useState<School>('stoicism');
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
      }, 7000); // Changed duration to match quote change
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        if (Math.random() < 0.2) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 400);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const quotesToShow = isMobile ? philosophyQuotes.slice(0, 3) : philosophyQuotes;

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center py-20 px-4 text-white">
      {/* Corner border elements */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50" />

      <div className="relative mb-16 z-20">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-mono text-center"
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          animate={{
            textShadow: [
              "0 0 30px rgba(0, 255, 255, 0.3)",
              "0 0 60px rgba(168, 85, 247, 0.5)",
              "0 0 30px rgba(0, 255, 255, 0.3)"
            ],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          Philosophy Core
        </motion.h1>
      </div>

      <div className={`relative z-10 flex items-center justify-center ${isMobile ? '' : 'gap-24'}`}>
        {isMobile ? (
          <SchoolBox school={currentSchool} isGlitching={isGlitching} isMobile={true} currentSchool={currentSchool} />
        ) : (
          <>
            <motion.div initial={{ x: -200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{once: true}} transition={{ delay: 0.3, type: "spring" }}>
              <SchoolBox school="stoicism" isGlitching={isGlitching} isMobile={false} />
            </motion.div>
            <motion.div initial={{ x: 200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{once: true}} transition={{ delay: 0.5, type: "spring" }}>
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