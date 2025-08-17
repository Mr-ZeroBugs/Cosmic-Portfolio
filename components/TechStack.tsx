"use client";

import React, { useState, useEffect, ReactElement } from 'react';
import { motion, Variants } from 'framer-motion';

// Enhanced Tech Icon with holographic effects
const TechIcon = ({ children }: { children: React.ReactNode }) => (
  <motion.div 
    className="text-cyan-400 text-3xl mr-4 relative"
    whileHover={{ 
      scale: 1.2, 
      textShadow: "0 0 20px rgba(0, 255, 255, 0.8)",
      filter: "drop-shadow(0 0 10px rgba(0, 255, 255, 0.6))"
    }}
    animate={{
      textShadow: [
        "0 0 10px rgba(0, 255, 255, 0.3)",
        "0 0 20px rgba(0, 255, 255, 0.6)",
        "0 0 10px rgba(0, 255, 255, 0.3)"
      ]
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  >
    {children}
    {/* Holographic glow effect */}
    <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full animate-pulse" />
  </motion.div>
);

// Props for the TechCard component
// Made 'index' optional as it's passed by the parent
interface TechCardProps { 
  title: string;
  description: string; 
  icon: React.ReactNode;
  index?: number; 
}

// Set a default value for index to prevent errors
const TechCard = ({ title, description, icon, index = 0 }: TechCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.03) { // 3% chance every interval
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Explicitly type cardVariants with the Variants type from framer-motion
  const cardVariants: Variants = {
    hidden: { 
      y: 50, 
      opacity: 0, 
      rotateX: -30,
      scale: 0.8 
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      rotateX: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15, 
        delay: index * 0.1 // Safe to use index now
      } 
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      className="perspective-1000"
    >
      <div className={`relative border-2 bg-gradient-to-br from-gray-900/50 to-black/50 p-6 rounded-lg backdrop-blur-sm 
                       transition-all duration-500 group overflow-hidden
                       ${isGlitching ? 'border-red-500 animate-pulse' : 
                         isHovered ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20' : 'border-cyan-400/30'}`}>
        
        {/* Corner decorations */}
        <div className={`absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 transition-colors duration-300 z-20 
                         ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
        <div className={`absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 transition-colors duration-300 z-20 
                         ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 transition-colors duration-300 z-20 
                         ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 transition-colors duration-300 z-20 
                         ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />

        {/* Scanning line effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none z-10"
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
        />

        {/* Data stream particles */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none z-10">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50],
                  y: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        <div className="flex items-center mb-4 relative z-20">
          <TechIcon>{icon}</TechIcon>
          <motion.h3 
            className={`text-xl font-bold font-mono transition-all duration-300 
                       ${isGlitching ? 'text-red-400 animate-pulse' : 
                         'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300'}`}
            animate={{ 
              textShadow: isHovered ? "0 0 20px rgba(0, 255, 255, 0.8)" : "0 0 10px rgba(0, 255, 255, 0.3)",
              x: isGlitching ? [0, -1, 1, 0] : 0
            }}
          >
            {title}
          </motion.h3>
        </div>
        
        <motion.p 
          className={`font-mono leading-relaxed transition-colors duration-300 relative z-20
                     ${isGlitching ? 'text-red-300' : 'text-cyan-100'}`}
          animate={{ x: isGlitching ? [0, -1, 1, 0] : 0 }}
        >
          <span className="text-cyan-400 font-bold">&gt;</span> {description}
        </motion.p>

        {/* Holographic overlay */}
        <div className={`absolute inset-0 bg-gradient-to-tr from-cyan-400/10 via-transparent to-cyan-300/10 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      </div>
    </motion.div>
  );
};

const TechCategory = ({ title, children, index }: { 
  title: string, 
  children: React.ReactNode,
  index: number 
}) => {
  // Explicitly type categoryVariants
  const categoryVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: index * 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="mb-16"
      variants={categoryVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        className="text-4xl font-light text-center mb-12 font-mono tracking-widest relative"
        style={{
          textShadow: "0 0 30px rgba(0, 255, 255, 0.6)"
        }}
        animate={{
          textShadow: [
            "0 0 20px rgba(0, 255, 255, 0.4)",
            "0 0 40px rgba(0, 255, 255, 0.8)",
            "0 0 20px rgba(0, 255, 255, 0.4)"
          ]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
          {title}
        </span>
        
        {/* Animated underline */}
        <motion.div 
          className="absolute w-32 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent 
                     left-1/2 bottom-[-15px] transform -translate-x-1/2"
          animate={{ 
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
          <div className="flex space-x-4">
            <div className="w-6 h-6 border-l-2 border-t-2 border-cyan-400/50" />
            <div className="w-6 h-6 border-r-2 border-t-2 border-cyan-400/50" />
          </div>
        </div>
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {/* Correctly clone children and pass the index prop without using 'any' */}
        {React.Children.map(children, (child, childIndex) => 
          React.isValidElement(child) 
            ? React.cloneElement(child as ReactElement<{ index: number }>, { index: childIndex })
            : child
        )}
      </motion.div>
    </motion.div>
  );
};

// Floating data streams background
const DataStreamBackground = () => {
  const [streams, setStreams] = useState<Array<{
    id: number;
    width: string;
    left: string;
    top: string;
    rotate: string;
  }>>([]);

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
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          style={{
            width: stream.width,
            left: stream.left,
            top: stream.top,
            rotate: stream.rotate
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: stream.id * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  return (
    // Removed bg-black to make the background transparent
    <div className="relative min-h-screen w-full text-white p-8 md:p-16 overflow-y-auto overflow-x-hidden">
      {/* Data stream background */}
      <DataStreamBackground />
      
      {/* Corner UI elements */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.header 
          className="text-center mb-20"
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-black tracking-tighter font-mono
                       bg-clip-text text-transparent bg-gradient-to-br from-cyan-300 to-emerald-400 mb-6"
            style={{
              textShadow: "0 0 50px rgba(0, 255, 255, 0.5)"
            }}
            animate={{
              textShadow: [
                "0 0 30px rgba(0, 255, 255, 0.3)",
                "0 0 60px rgba(0, 255, 255, 0.7)",
                "0 0 30px rgba(0, 255, 255, 0.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            TECHNOLOGY STACKS
          </motion.h1>
          
          <motion.p 
            className="text-cyan-100 mt-4 text-lg font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <span className="text-cyan-400">&gt;</span> The architecture of our digital universe.
          </motion.p>

          {/* Animated line separator */}
          <motion.div 
            className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-8"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
          />
        </motion.header>

        <main>
          <TechCategory title="Programming Languages & Core Skills" index={0}>
            <TechCard 
              title="Python" 
              description="Versatile language for AI, automation, data analysis, and rapid prototyping." 
              icon={<>🐍</>} 
            />
            <TechCard 
              title="C++" 
              description="High-performance language for algorithms, system programming, and competitive coding." 
              icon={<>💻</>} 
            />
            <TechCard
              title="Next.js"
              description="A React-based framework for building fast, server-rendered, and scalable web applications."
              icon={<>🚀</>}
            />
          </TechCategory>

          <TechCategory title="AI & Data Science" index={1}>
            <TechCard 
              title="Machine Learning & Deep Learning" 
              description="Designing models to analyze data, make predictions, and drive intelligent applications." 
              icon={<>🤖</>} 
            />
            <TechCard 
              title="PyTorch" 
              description="Core frameworks for building, training, and deploying neural networks efficiently." 
              icon={<>🧠</>} 
            />
            <TechCard 
              title="Data Analysis & Visualization" 
              description="Extracting insights from data using libraries like Pandas, NumPy, and Matplotlib." 
              icon={<>📊</>} 
            />
          </TechCategory>

          <TechCategory title="Tools & Ecosystem" index={2}>
            <TechCard 
              title="Git & GitHub" 
              description="Version control and collaborative coding to maintain clean and organized projects." 
              icon={<>🔧</>} 
            />
            <TechCard 
              title="VSCode & CLI Tools" 
              description="Essential tools for efficient coding, debugging, and project management." 
              icon={<>🖥️</>} 
            />
          </TechCategory>
        </main>
      </div>
    </div>
  );
};

export default App;
