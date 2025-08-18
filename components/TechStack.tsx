"use client";

import React, { useState, useEffect, ReactElement, useRef, useMemo } from 'react';
import { motion, Variants, useScroll, useTransform, useMotionValue, useSpring, useAnimation, AnimatePresence } from 'framer-motion';

// Custom hook to prevent hydration errors
const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

// Floating particles background for each category
const FloatingParticles = ({ color = "#06B6D4", count = 50 }: { color?: string; count?: number }) => {
  const isMounted = useIsMounted();
  
  const particles = useMemo(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.6 + 0.2,
    }))
  , [count]);

  if (!isMounted) return null; // Prevents server-side rendering and hydration mismatch

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${particle.size * 3}px ${color}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced holographic grid effect
const HolographicGrid = ({ color = "#06B6D4" }: { color?: string }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity="0.3"
            />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.1" />
            <stop offset="50%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#gridGradient)" />
      </svg>
    </div>
  );
};

  const SpectacularTechIcon = ({ children, color = "#06B6D4" }: { children: React.ReactNode; color?: string }) => {
  const isMounted = useIsMounted();
  const [isGlitching, setIsGlitching] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    if (!isMounted) return;

    const effectInterval = setInterval(() => {
      const random = Math.random();
      if (random < 0.03) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);
      } else if (random < 0.08) {
        setIsCharging(true);
        controls.start({
          scale: [1, 1.3, 1],
          rotate: [0, 360],
          filter: [`brightness(1) saturate(1)`, `brightness(2) saturate(2)`, `brightness(1) saturate(1)`],
          transition: { duration: 1, ease: "easeInOut" }
        });
        setTimeout(() => setIsCharging(false), 1000);
      }
    }, 2000);

    return () => clearInterval(effectInterval);
  }, [isMounted, controls]);

  return (
    <motion.div
      className="relative text-3xl mr-4 select-none"
      animate={controls}
      whileHover={{
        scale: 1.4,
        rotate: [0, -10, 10, 0],
        filter: "brightness(1.8) saturate(1.5)",
      }}
      style={{
        color: isGlitching && isMounted ? '#FF0040' : color,
        filter: isCharging ? `drop-shadow(0 0 20px ${color})` : 'none'
      }}
    >
      {/* Multiple glow layers */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          boxShadow: [
            `0 0 15px ${color}60`,
            `0 0 30px ${color}90`,
            `0 0 15px ${color}60`
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
      
      {/* Outer energy ring */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-4xl opacity-30"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{ color }}
      >
        ◯
      </motion.div>

      {/* Glitch overlay */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0, 1, 0],
              x: [0, -2, 2, -1, 1, 0],
              y: [0, 1, -1, 2, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ color: '#FF0040', mixBlendMode: 'screen' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </motion.div>
  );
};

// Spectacular tech card with multiple visual layers
interface TechCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color?: string;
  index?: number;
}

const SpectacularTechCard = ({ title, description, icon, color = "#06B6D4", index = 0 }: TechCardProps) => {
  const isMounted = useIsMounted();
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(0);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]));

  useEffect(() => {
    if (!isMounted) return;
    
    // Random glitch effects
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.02) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 250);
      }
    }, 3000);

    // Energy charging effect
    const energyInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        setEnergyLevel(1);
        setTimeout(() => setEnergyLevel(0), 2000);
      }
    }, 4000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(energyInterval);
    };
  }, [isMounted]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(event.clientX - (rect.left + rect.width / 2));
    mouseY.set(event.clientY - (rect.top + rect.height / 2));
  };

  const cardVariants: Variants = {
    hidden: { 
      y: 60, // ADJUSTED: Reduced y offset slightly
      opacity: 0, 
      rotateX: -20, 
      scale: 0.9,
      filter: "blur(8px)"
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20, 
        delay: index * 0.05, // ADJUSTED: Reduced delay significantly
        duration: 0.7 // ADJUSTED: Reduced duration
      } 
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }} // ADJUSTED: Animation triggers sooner
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d", 
        perspective: "1000px" 
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.05, 
        transition: { duration: 0.3 } 
      }}
      className="relative group cursor-pointer h-full"
    >
      {/* Background holographic grid */}
      <HolographicGrid color={color} />
      
      {/* Energy field effect */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          background: energyLevel > 0 
            ? `radial-gradient(circle at 50% 50%, ${color}40, transparent 70%)`
            : 'transparent',
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Main card container */}
      <div 
        className={`relative p-5 rounded-xl backdrop-blur-lg overflow-hidden transition-all duration-500 flex flex-col h-full transform-gpu`}
        style={{
          background: isHovered 
            ? `linear-gradient(135deg, ${color}10, transparent 60%), radial-gradient(ellipse at top, ${color}15, transparent 70%)`
            : `linear-gradient(135deg, ${color}05, transparent 80%)`,
          boxShadow: isHovered 
            ? `0 0 25px ${color}70, 0 0 50px ${color}50, inset 0 0 15px ${color}20`
            : `0 0 15px ${color}30`,
          transition: 'box-shadow 0.4s ease-in-out',
        }}
      >
        {/* Dynamic border animation */}
        <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(45deg, transparent, ${color}, transparent, #A855F7, transparent)`,
              backgroundSize: '400% 400%',
              padding: '2px',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'subtract',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'subtract',
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
        />
        
        {/* Scanning line effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1"
          style={{ 
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 10px ${color}`
          }}
          animate={{
            y: isHovered ? [0, 400, 0] : 0,
            opacity: isHovered ? [0, 1, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut"
          }}
        />

        {/* Content */}
        <div className="relative z-20 flex-grow flex flex-col">
          <div className="flex items-center mb-4">
            <SpectacularTechIcon color={color}>{icon}</SpectacularTechIcon>
            <motion.h3
              className="text-xl font-bold font-mono tracking-wide"
              style={{ 
                color: isGlitching && isMounted ? '#FF0040' : color,
                textShadow: `0 0 15px ${isGlitching && isMounted ? '#FF0040' : color}80`
              }}
              animate={{
                textShadow: [
                  `0 0 15px ${color}60`,
                  `0 0 25px ${color}80`,
                  `0 0 15px ${color}60`
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {title}
            </motion.h3>
          </div>

          <motion.div
            className="relative flex-grow"
            animate={{
              filter: isGlitching && isMounted 
                ? ['blur(0px)', 'blur(2px)', 'blur(0px)']
                : 'blur(0px)'
            }}
            transition={{ duration: 0.1, repeat: isGlitching && isMounted ? 3 : 0 }}
          >
            <motion.p
              className="font-mono leading-relaxed text-sm"
              style={{ 
                color: isGlitching && isMounted ? '#FF6B6B' : '#E5E7EB'
              }}
            >
              <motion.span 
                className="font-bold text-lg mr-2 inline-block"
                style={{ color }}
                animate={{ 
                  rotate: isHovered ? [0, 5, -5, 0] : 0,
                  scale: isHovered ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &gt;
              </motion.span>
              {description}
            </motion.p>
          </motion.div>

          {/* Progress bar effect */}
          <motion.div
            className="mt-4 h-0.5 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ 
                background: `linear-gradient(90deg, ${color}, #FFFFFF, ${color})`,
                boxShadow: `0 0 8px ${color}`
              }}
              animate={{
                x: isHovered ? ['-100%', '100%'] : '-100%',
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      {isHovered && <FloatingParticles color={color} count={20} />}
    </motion.div>
  );
};

// Enhanced category with spectacular effects
const SpectacularTechCategory = ({ 
  title, 
  children, 
  index, 
  color = "#06B6D4" 
}: { 
  title: string; 
  children: React.ReactNode; 
  index: number; 
  color?: string 
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const categoryVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 80, 
      filter: "blur(15px)",
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        duration: 0.8, // ADJUSTED: Reduced duration
        delay: index * 0.1, // ADJUSTED: Reduced delay
        ease: "easeOut", 
        staggerChildren: 0.05 // ADJUSTED: Reduced stagger
      } 
    }
  };

  return (
    <motion.div
      ref={sectionRef}
      className="mb-12 relative"
      variants={categoryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -150px 0px" }} // ADJUSTED: Animation triggers sooner
    >
      {/* Background effects */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y, scale }}
      >
        <FloatingParticles color={color} count={30} />
      </motion.div>

      {/* Section title */}
      <motion.div className="text-center mb-8 relative">
        {/* Title backdrop */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            background: [
              `radial-gradient(ellipse at center, ${color}10, transparent 70%)`,
              `radial-gradient(ellipse at center, ${color}20, transparent 70%)`,
              `radial-gradient(ellipse at center, ${color}10, transparent 70%)`
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h2
          className="text-2xl md:text-3xl font-light font-mono tracking-wider relative inline-block text-cyan-400"
        >
          {title}
        </motion.h2>

        {/* Underline effect */}
        <motion.div
          className="mx-auto mt-2 h-0.5 rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
            boxShadow: `0 0 15px ${color}`
          }}
          animate={{
            width: ['0%', '60%', '0%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Cards grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {React.Children.map(children, (child, childIndex) =>
          React.isValidElement(child) ? 
            React.cloneElement(child as ReactElement<{ index: number; color: string }>, { 
              index: childIndex, 
              color: color 
            }) : child
        )}
      </motion.div>
    </motion.div>
  );
};

// Main enhanced TechStack component
const TechStack = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef, 
    offset: ["start start", "end start"] 
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.8]);

  const headerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: -80, // ADJUSTED
      scale: 0.9, 
      filter: "blur(15px)" 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      filter: "blur(0px)", 
      transition: { 
        duration: 1.0, // ADJUSTED
        type: "spring", 
        stiffness: 80, 
        damping: 20 
      } 
    }
  };

  return (
    <div ref={targetRef} className="relative w-full text-white overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Compact header */}
        <motion.header
          className="text-center mb-12 py-8 flex flex-col items-center justify-center relative"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div style={{ y, opacity, scale }} className="relative">
            {/* Main title */}
            <motion.h1
              className="text-5xl md:text-7xl font-black tracking-tighter font-mono mb-4 relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
              style={{ 
                textShadow: "0 0 40px rgba(0, 255, 255, 0.6), 0 0 60px rgba(128, 0, 255, 0.4)"
              }}
            >
              TECHNOLOGY MATRIX
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-gray-300 mt-3 text-base font-mono max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }} // ADJUSTED
            >
              <motion.span 
                className="text-cyan-400 font-bold text-lg mr-2"
                animate={{ 
                  textShadow: [
                    '0 0 8px #06B6D4',
                    '0 0 15px #06B6D4',
                    '0 0 8px #06B6D4'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                &gt;
              </motion.span>
              Constructing digital innovation foundations
            </motion.p>
          </motion.div>
        </motion.header>

        {/* Tech categories */}
        <main>
          <SpectacularTechCategory title="Core Languages & Frameworks" index={0} color="#06B6D4">
            <SpectacularTechCard 
              title="Python" 
              description="Versatile language for AI, automation, data analysis, and rapid prototyping with extensive library ecosystem." 
              icon={<>🐍</>} 
            />
            <SpectacularTechCard 
              title="C++" 
              description="High-performance language for algorithms, system programming, competitive coding, and real-time applications." 
              icon={<>💻</>} 
            />
            <SpectacularTechCard 
              title="Next.js" 
              description="React-based framework for building fast, server-rendered, and scalable web applications with modern features." 
              icon={<>🚀</>} 
            />
          </SpectacularTechCategory>

          <SpectacularTechCategory title="Artificial Intelligence & Data" index={1} color="#06B6D4">
            <SpectacularTechCard 
              title="Machine Learning & Deep Learning" 
              description="Designing advanced neural network models to analyze complex data patterns and drive intelligent applications." 
              icon={<>🤖</>} 
            />
            <SpectacularTechCard 
              title="PyTorch & TensorFlow" 
              description="Industry-leading frameworks for building, training, and deploying neural networks with GPU acceleration." 
              icon={<>🧠</>} 
            />
            <SpectacularTechCard 
              title="Data Analysis & Visualization" 
              description="Extracting meaningful insights from big data using advanced libraries like Pandas, NumPy, and Matplotlib." 
              icon={<>📊</>} 
            />
          </SpectacularTechCategory>

          <SpectacularTechCategory title="Development Ecosystem & Tools" index={2} color="#06B6D4">
            <SpectacularTechCard 
              title="Git & GitHub" 
              description="Advanced version control and collaborative development workflows for maintaining clean, organized codebases." 
              icon={<>🔧</>} 
            />
            <SpectacularTechCard 
              title="VSCode & CLI Tools" 
              description="Professional development environment with extensions, debugging capabilities, and command-line efficiency." 
              icon={<>🖥️</>} 
            />
            <SpectacularTechCard 
              title="Docker & DevOps" 
              description="Containerization and deployment strategies for building scalable, portable applications across environments." 
              icon={<>🐳</>} 
            />
          </SpectacularTechCategory>
        </main>
      </div>
    </div>
  );
};

export default TechStack;