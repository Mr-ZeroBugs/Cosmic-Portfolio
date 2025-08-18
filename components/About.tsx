"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Enhanced skills with gravitational positioning and new holographic effects
const skills = [
  { name: "Money", x: "-60px", y: "40px", color: "#00FF88", glow: "#00FF88", pulse: 0.8 },
  { name: "Investing", x: "100px", y: "0px", color: "#FF3366", glow: "#FF3366", pulse: 1.2 },
  { name: "Philosophy", x: "0px", y: "-90px", color: "#3366FF", glow: "#3366FF", pulse: 0.9 },
  { name: "Coding", x: "60px", y: "40px", color: "#FF0099", glow: "#FF0099", pulse: 1.1 },
  { name: "Chess", x: "-100px", y: "-80px", color: "#FFAA00", glow: "#FFAA00", pulse: 0.7 },
  { name: "Gym", x: "100px", y: "-80px", color: "#00AAFF", glow: "#00AAFF", pulse: 1.0 },
  { name: "Music", x: "0px", y: "90px", color: "#AA00FF", glow: "#AA00FF", pulse: 0.6 },
];

// --- Quantum Particles Background ---
const QuantumParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: '0 0 10px #06B6D4, 0 0 20px #06B6D4, 0 0 30px #06B6D4',
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
          }}
          transition={{
            duration: 4,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- Neural Network Lines ---
const NeuralNetwork = () => {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
      <defs>
        <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
          <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Animated neural pathways */}
      {[
        { x1: "10%", y1: "20%", x2: "90%", y2: "80%" },
        { x1: "20%", y1: "80%", x2: "80%", y2: "20%" },
        { x1: "5%", y1: "50%", x2: "95%", y2: "50%" },
        { x1: "50%", y1: "5%", x2: "50%", y2: "95%" },
      ].map((line, index) => (
        <motion.line
          key={index}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="url(#neuralGradient)"
          strokeWidth="1"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + index,
            delay: index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Network nodes */}
      {[
        { cx: "10%", cy: "20%" },
        { cx: "90%", cy: "80%" },
        { cx: "20%", cy: "80%" },
        { cx: "80%", cy: "20%" },
        { cx: "50%", cy: "50%" },
      ].map((node, index) => (
        <motion.circle
          key={index}
          cx={node.cx}
          cy={node.cy}
          r="3"
          fill="#06B6D4"
          filter="url(#glow)"
          animate={{
            r: [2, 4, 2],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            delay: index * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
};

// --- Enhanced Holographic Skill Component ---
const HolographicSkill = ({ 
  name, x, y, color, glow, pulse 
}: { 
  name: string; 
  x: string; 
  y: string; 
  color: string; 
  glow: string; 
  pulse: number; 
}) => {
  const [isClient, setIsClient] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.08) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  if (!isClient) return null;

  const randomDelay = Math.random() * 2;
  const randomDuration = 4 + Math.random() * 4;

  return (
    <motion.div
      className="absolute"
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: isGlitching 
          ? [x, `calc(${x} + ${Math.random() * 30 - 15}px)`, x]
          : [x, `calc(${x} + ${Math.random() * 8 - 4}px)`],
        y: isGlitching 
          ? [y, `calc(${y} + ${Math.random() * 30 - 15}px)`, y]
          : [y, `calc(${y} + ${Math.random() * 8 - 4}px)`],
        opacity: isGlitching ? [1, 0.2, 1] : [0, 1, 1, 0],
        scale: [1, pulse, 1],
      }}
      transition={{
        duration: isGlitching ? 0.3 : randomDuration,
        delay: isGlitching ? 0 : randomDelay,
        repeat: isGlitching ? 0 : Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: isGlitching ? [0, 0.5, 1] : [0, 0.2, 0.8, 1],
      }}
    >
      <div className="relative group">
        {/* Main skill bubble */}
        <motion.div
          className="relative px-6 py-3 text-sm font-bold font-mono rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer"
          style={{
            color: isGlitching ? '#FF0040' : color,
            textShadow: `0 0 20px ${isGlitching ? '#FF0040' : glow}`,
            backgroundImage: `linear-gradient(135deg, ${glow}15, transparent 50%, ${glow}10)`,
            borderColor: isGlitching ? '#FF0040' : `${glow}60`,
            borderWidth: '2px',
            boxShadow: `
              0 0 20px ${isGlitching ? '#FF004080' : glow + '40'},
              inset 0 0 20px ${isGlitching ? '#FF004020' : glow + '20'}
            `,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {name}
          
          {/* Holographic effect overlay */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* Quantum field effect */}
        <motion.div
          className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            backgroundImage: `radial-gradient(circle, ${glow}30, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Energy particles */}
        <motion.div
          className="absolute -top-2 -right-2 w-2 h-2 rounded-full opacity-80"
          style={{ 
            backgroundColor: glow,
            boxShadow: `0 0 10px ${glow}`,
          }}
          animate={{
            x: [0, 15, -15, 0],
            y: [0, -15, 15, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
};

// --- About Component ---
const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [textGlitch, setTextGlitch] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setTextGlitch(true);
        setTimeout(() => setTextGlitch(false), 150);
      }
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20">
      {/* Enhanced corner frames */}
      {[
        { top: '1rem', left: '1rem', rotate: 0 },
        { top: '1rem', right: '1rem', rotate: 90 },
        { bottom: '1rem', left: '1rem', rotate: 270 },
        { bottom: '1rem', right: '1rem', rotate: 180 },
      ].map((corner, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 z-30"
          style={{ 
            top: corner.top, 
            left: corner.left, 
            right: corner.right, 
            bottom: corner.bottom,
            transform: `rotate(${corner.rotate}deg)`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg className="w-full h-full" viewBox="0 0 64 64">
            <defs>
              <linearGradient id={`cornerGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
              <filter id={`cornerGlow${i}`}>
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M 0 12 L 0 0 L 12 0 M 52 0 L 64 0 L 64 12"
              stroke={`url(#cornerGrad${i})`}
              strokeWidth="3"
              fill="none"
              filter={`url(#cornerGlow${i})`}
            />
          </svg>
        </motion.div>
      ))}

      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <QuantumParticles />
        <NeuralNetwork />
        
        {/* Improved grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(6, 182, 212, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(6, 182, 212, 0.6) 1px, transparent 1px),
              radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.3) 0%, transparent 60%)
            `,
            backgroundSize: "40px 40px, 40px 40px, 200px 200px",
          }}
          animate={{ 
            backgroundPosition: ["0 0", "40px 40px", "0 0"],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      <div className="z-10 flex w-full max-w-7xl flex-col items-center gap-12 px-4 md:flex-row md:px-8">
        {/* Enhanced text section */}
        <motion.div
          className="w-full md:w-1/2 relative"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main content container */}
          <div className="relative p-8 rounded-2xl border-2 transition-all duration-500 overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(135deg, 
                  rgba(0, 0, 0, 0.9) 0%,
                  rgba(6, 182, 212, 0.05) 25%,
                  rgba(0, 0, 0, 0.8) 50%,
                  rgba(168, 85, 247, 0.05) 75%,
                  rgba(0, 0, 0, 0.9) 100%
                ),
                radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
              `,
              borderColor: isHovered ? '#06B6D4' : 'rgba(6, 182, 212, 0.3)',
              boxShadow: isHovered 
                ? '0 0 50px rgba(6, 182, 212, 0.3), inset 0 0 50px rgba(6, 182, 212, 0.1)'
                : '0 0 20px rgba(6, 182, 212, 0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            
            {/* Dynamic border animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(45deg, transparent, #06B6D4, transparent, #A855F7, transparent)`,
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

            {/* Content */}
            <div className="relative z-10">
              {/* Title with enhanced effects */}
              <div className="relative">
                <motion.h2
                  className="text-5xl font-bold md:text-7xl mb-8 font-mono relative"
                  style={{
                    backgroundImage: textGlitch 
                      ? 'linear-gradient(45deg, #FF0040, #00FF40, #4000FF)'
                      : 'linear-gradient(45deg, #06B6D4, #A855F7, #10B981)',
                    backgroundSize: '400% 400%',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: textGlitch 
                      ? '2px 0 #FF0040, -2px 0 #00FF40'
                      : '0 0 30px rgba(6, 182, 212, 0.6)',
                    filter: textGlitch ? 'hue-rotate(180deg)' : 'none',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  ABOUT ME
                </motion.h2>
                
                {/* Holographic scan line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent opacity-0"
                  animate={{ 
                    opacity: [0, 0.8, 0],
                    y: ['-100%', '100%'] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                />
              </div>

              {/* Enhanced text content */}
              <div className="space-y-6 font-mono text-lg">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-gray-200 leading-relaxed">
                    I think, therefore I am. In a world of noise, I choose clarity—through tech, code, and the markets.
                    Philosophy fuels my questions. Technology builds my answers. Finance tests my discipline.
                    And innovation is where it all converges.
                  </div>
                  {/* The animated underline has been removed as requested */}
                </motion.div>

                <motion.div
                  className="relative italic text-cyan-300 leading-relaxed border-l-4 border-cyan-400/50 pl-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  style={{
                    textShadow: '0 0 20px rgba(6, 182, 212, 0.5)',
                  }}
                >
                  I walk through fire, I carve the sky,<br />
                  In code I dream, in truth I try,<br />
                  Philosophy asks, yet answers lie,<br />
                  But still, my heart says love you, why?. <br/>
                  @that one girl.
                </motion.div>

                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="text-gray-200">
                    <span className="text-emerald-400 font-bold text-xl">My goal:</span> To innovate the world, not for recognition, but for meaning.
                  </div>
                </motion.div>

                {/* Status indicator */}
                <motion.div
                  className="flex items-center gap-4 mt-8 p-4 rounded-lg"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), transparent)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-emerald-400"
                    style={{
                      boxShadow: '0 0 20px #10B981',
                    }}
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-emerald-400 text-lg font-mono font-bold">
                    STATUS: ONLINE & INNOVATING
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced skills visualization */}
        <div className="relative flex h-96 w-full items-center justify-center md:w-1/2">
          {/* Central quantum core */}
          <motion.div
            className="absolute w-6 h-6 rounded-full z-20"
            style={{ 
              backgroundImage: 'radial-gradient(circle, #06B6D4, #A855F7)',
              boxShadow: `
                0 0 30px #06B6D4,
                0 0 60px rgba(6, 182, 212, 0.5),
                0 0 90px rgba(168, 85, 247, 0.3),
                inset 0 0 20px rgba(255, 255, 255, 0.3)
              `
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 360],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />

          {/* Skills orbit */}
          <div className="relative">
            {skills.map((skill, index) => (
              <HolographicSkill
                key={index}
                name={skill.name}
                x={skill.x}
                y={skill.y}
                color={skill.color}
                glow={skill.glow}
                pulse={skill.pulse}
              />
            ))}
          </div>

          {/* Enhanced orbital rings */}
          {[1, 2, 3, 4].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border z-10"
              style={{
                width: `${ring * 80}px`,
                height: `${ring * 80}px`,
                borderWidth: '2px',
                borderStyle: 'dashed',
                borderColor: ring % 2 === 0 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(168, 85, 247, 0.3)',
                filter: `drop-shadow(0 0 ${ring * 3}px ${ring % 2 === 0 ? '#06B6D4' : '#A855F7'})`,
              }}
              animate={{
                rotate: ring % 2 === 0 ? 360 : -360,
                opacity: [0.2, 0.8, 0.2],
                borderColor: ring % 2 === 0 
                  ? ['rgba(6, 182, 212, 0.4)', 'rgba(168, 85, 247, 0.4)', 'rgba(6, 182, 212, 0.4)']
                  : ['rgba(168, 85, 247, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(168, 85, 247, 0.3)'],
              }}
              transition={{
                rotate: { 
                  duration: 20 + ring * 5, 
                  repeat: Infinity, 
                  ease: "linear" 
                },
                opacity: { 
                  duration: 4 + ring, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                },
                borderColor: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            />
          ))}

          {/* Quantum connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-5">
            <defs>
              <linearGradient id="quantumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0" />
                <stop offset="30%" stopColor="#06B6D4" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#A855F7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
              </linearGradient>
            </defs>
            {skills.map((_, index) => (
              <motion.line
                key={index}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${skills[index].x})`}
                y2={`calc(50% + ${skills[index].y})`}
                stroke="url(#quantumGradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  strokeDashoffset: [0, -10],
                }}
                transition={{
                  pathLength: { duration: 3 + index * 0.2, repeat: Infinity },
                  opacity: { duration: 3 + index * 0.2, repeat: Infinity },
                  strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
                  delay: index * 0.3,
                }}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Enhanced bottom energy wave */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 z-20"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent, #06B6D4, #A855F7, #06B6D4, transparent)',
        }}
        animate={{
          scaleX: [0, 1, 0, 1, 0],
          opacity: [0, 1, 0, 1, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default About;