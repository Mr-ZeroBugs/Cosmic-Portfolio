"use client";

import { motion } from "framer-motion";
import Terminal from "./Terminal";
import { useEffect, useState } from "react";

// Define types for better code structure
type ParticleStyle = {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
  opacity: number;
  boxShadow: string;
};

type GlitchBlockStyle = {
  left: string;
  top: string;
  width: string;
  height: string;
};

type CosmicErrorStyle = {
  left: string;
  top: string;
  transform: string;
};

const Hero = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [isClient, setIsClient] = useState(false);
  // --- 1. สร้าง State สำหรับเช็ค Mobile ---
  const [isMobile, setIsMobile] = useState(false);
  // --- Animation States for Epic Name Entrance ---
  const [nameEntrancePhase, setNameEntrancePhase] = useState(0); // 0: hidden, 1: materializing, 2: complete

  // States to hold styles generated only on the client
  const [particleStyles, setParticleStyles] = useState<ParticleStyle[]>([]);
  const [glitchBlockStyles, setGlitchBlockStyles] = useState<GlitchBlockStyle[]>([]);
  const [cosmicErrorStyles, setCosmicErrorStyles] = useState<CosmicErrorStyle[]>([]);
  const [cosmicReadings, setCosmicReadings] = useState({
    radiation: 0,
    stability: 0,
  });

  useEffect(() => {
    setIsClient(true);
    
    // --- 2. เพิ่ม Logic ตรวจสอบขนาดหน้าจอ ---
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkScreenSize(); // เช็คครั้งแรกตอนโหลด
    window.addEventListener('resize', checkScreenSize); // เช็คทุกครั้งที่ปรับขนาดจอ

    const pStyles = Array.from({ length: 50 }).map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 4}s`,
      opacity: 0.3 + Math.sin(i) * 0.2,
      boxShadow: i % 3 === 0 ? '0 0 4px currentColor' : 'none',
    }));
    setParticleStyles(pStyles);

    const gStyles = Array.from({ length: 6 }).map(() => ({
      left: `${Math.random() * 90}%`,
      top: `${Math.random() * 90}%`,
      width: `${4 + Math.random() * 12}px`,
      height: `${2 + Math.random() * 6}px`,
    }));
    setGlitchBlockStyles(gStyles);

    const eStyles = Array.from({ length: 3 }).map(() => ({
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        transform: `rotate(${Math.random() * 6 - 3}deg)`
    }));
    setCosmicErrorStyles(eStyles);

    // Epic Name Entrance Animation Sequence
    const nameEntranceSequence = () => {
      // Phase 1: Start materialization
      setTimeout(() => setNameEntrancePhase(1), 500);
      // Phase 2: Complete entrance
      setTimeout(() => setNameEntrancePhase(2), 3500);
    };

    nameEntranceSequence();

    const readingInterval = setInterval(() => {
        setCosmicReadings({
            radiation: Math.floor(Math.random() * 999 + 100),
            stability: parseFloat((97 + Math.random() * 2.9).toFixed(1)),
        });
    }, 2000);


    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.08) { // 8% chance
        setGlitchActive(true);
        setTimeout(() => {
          setGlitchActive(false);
        }, 150 + Math.random() * 400);
      }
    }, 1500);

    // Cleanup function
    return () => {
      clearInterval(glitchInterval);
      clearInterval(readingInterval);
      window.removeEventListener('resize', checkScreenSize);
    }
  }, []);

  if (!isClient) {
    return null; 
  }

  const quantumErrors = [
    "HOLOGRAM.ERROR", "DIMENSIONAL_BREACH", "REALITY_MATRIX_UNSTABLE",
    "SPACETIME_FRAGMENTED", "CONSCIOUSNESS_OVERFLOW", "EVENT_HORIZON_EXCEEDED",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center px-4 md:px-8 relative overflow-hidden py-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`scanline-${i}`}
              className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
              style={{
                top: `${10 + i * 12}%`,
                animationName: 'hologram-scan',
                animationDuration: '4s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {particleStyles.map((style, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 rounded-full animate-pulse ${
              i % 4 === 0 ? 'bg-orange-400' : 
              i % 4 === 1 ? 'bg-cyan-400' : 
              i % 4 === 2 ? 'bg-yellow-400' : 'bg-purple-400'
            }`}
            style={style}
          />
        ))}

        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full border border-orange-500/20 opacity-30"
          style={{
            transform: 'translate(-50%, -50%)',
            animationName: 'cosmic-pulse',
            animationDuration: '6s',
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite'
          }}
        />
      </div>

      <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-2 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className={`relative ${glitchActive ? 'animate-digital-glitch' : ''}`}
        >
          <div className="absolute -inset-4 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"
                style={{
                  top: `${20 + i * 15}%`, left: '-10%', right: '-10%',
                animationName: 'cosmic-flow',
                animationDuration: '3s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>

          <div 
            className="absolute -inset-8 opacity-20 rounded-full"
            style={{
              backgroundImage: 'radial-gradient(ellipse, rgba(255, 69, 0, 0.2) 0%, transparent 60%)',
              animationName: 'energy-field',
              animationDuration: '8s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite'
            }}
          />

          <div className="relative">
            <h1 className="text-5xl font-bold md:text-7xl relative">
              {/* Epic Name Entrance Effects */}
              {nameEntrancePhase === 1 && (
                <>
                  {/* MASSIVE Quantum materialization particles */}
                  {Array.from({ length: 80 }).map((_, i) => (
                    <div
                      key={`quantum-particle-${i}`}
                      className={`absolute rounded-full ${
                        i % 5 === 0 ? 'w-3 h-3 bg-orange-400' :
                        i % 5 === 1 ? 'w-2 h-2 bg-cyan-400' :
                        i % 5 === 2 ? 'w-4 h-4 bg-yellow-400' :
                        i % 5 === 3 ? 'w-1 h-1 bg-purple-400' :
                        'w-2 h-2 bg-pink-400'
                      }`}
                      style={{
                        left: `${-50 + Math.random() * 200}%`,
                        top: `${-50 + Math.random() * 200}%`,
                        animationName: 'quantum-converge-epic',
                        animationDuration: `${1.2 + Math.random() * 0.8}s`,
                        animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        animationFillMode: 'forwards',
                        animationDelay: `${Math.random() * 0.5}s`,
                        boxShadow: `0 0 ${8 + Math.random() * 12}px currentColor`,
                        filter: 'blur(0.5px)'
                      }}
                    />
                  ))}
                  
                  {/* Multiple Reality tear effects */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={`reality-tear-${i}`}
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `conic-gradient(from ${Math.random() * 360}deg, transparent, rgba(255, 69, 0, ${0.6 + Math.random() * 0.4}), rgba(255, 215, 0, ${0.4 + Math.random() * 0.4}), rgba(0, 255, 255, ${0.6 + Math.random() * 0.4}), transparent)`,
                        animationName: `reality-tear-epic`,
                        animationDuration: `${1.5 + i * 0.3}s`,
                        animationTimingFunction: 'ease-out',
                        animationFillMode: 'forwards',
                        animationDelay: `${i * 0.2}s`,
                        clipPath: i === 0 ? 'polygon(0% 50%, 20% 45%, 40% 55%, 60% 48%, 80% 52%, 100% 50%, 100% 52%, 80% 54%, 60% 50%, 40% 57%, 20% 47%, 0% 52%)' :
                                 i === 1 ? 'polygon(10% 20%, 30% 25%, 50% 15%, 70% 22%, 90% 18%, 90% 82%, 70% 78%, 50% 85%, 30% 75%, 10% 80%)' :
                                 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                        opacity: 0.7 - i * 0.1
                      }}
                    />
                  ))}
                  
                  {/* EPIC Holographic scan lines */}
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={`scan-${i}`}
                      className="absolute w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      style={{
                        height: i % 3 === 0 ? '2px' : '1px',
                        top: `${6.67 * i}%`,
                        opacity: 0.8,
                        animationName: 'holographic-build-epic',
                        animationDuration: `${0.4 + i * 0.08}s`,
                        animationTimingFunction: 'ease-out',
                        animationFillMode: 'forwards',
                        animationDelay: `${0.3 + i * 0.03}s`,
                        boxShadow: `0 0 ${4 + (i % 4) * 2}px currentColor`,
                        filter: `hue-rotate(${i * 15}deg)`
                      }}
                    />
                  ))}
                  
                  {/* Energy Explosion Rings */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`energy-ring-${i}`}
                      className="absolute border-2 rounded-full"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: `${(i + 1) * 100}px`,
                        height: `${(i + 1) * 100}px`,
                        transform: 'translate(-50%, -50%)',
                        borderColor: i % 2 === 0 ? '#FF4500' : '#00FFFF',
                        animationName: 'energy-explosion',
                        animationDuration: `${1.0 + i * 0.2}s`,
                        animationTimingFunction: 'ease-out',
                        animationFillMode: 'forwards',
                        animationDelay: `${0.5 + i * 0.1}s`,
                        opacity: 0
                      }}
                    />
                  ))}
                  
                  {/* Lightning Effects */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`lightning-${i}`}
                      className="absolute bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
                      style={{
                        width: '2px',
                        height: '100%',
                        left: `${20 + i * 12}%`,
                        top: '0',
                        animationName: 'lightning-strike',
                        animationDuration: `${0.8 + Math.random() * 0.4}s`,
                        animationTimingFunction: 'ease-out',
                        animationFillMode: 'forwards',
                        animationDelay: `${0.6 + i * 0.1}s`,
                        transform: `rotate(${-15 + Math.random() * 30}deg)`,
                        boxShadow: '0 0 8px #FFFF00, 0 0 16px #FFFF00',
                        opacity: 0
                      }}
                    />
                  ))}
                  
                  {/* Dimensional Portal Effect */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(ellipse, rgba(138, 43, 226, 0.4) 0%, rgba(255, 69, 0, 0.3) 30%, rgba(0, 255, 255, 0.2) 60%, transparent 80%)`,
                      animationName: 'dimensional-portal',
                      animationDuration: '2s',
                      animationTimingFunction: 'ease-out',
                      animationFillMode: 'forwards',
                      animationDelay: '0.2s',
                      filter: 'blur(1px)',
                      opacity: 0
                    }}
                  />
                </>
              )}

              {/* Glitch effects for regular glitch state */}
              {glitchActive && nameEntrancePhase === 2 && (
                <>
                  <span className="absolute inset-0 text-orange-400 opacity-70" style={{ transform: 'translate(-2px, -1px)' }}>
                    I&apos;m <span className="text-yellow-400">Kongpop</span><br />Pipatpusit
                  </span>
                  <span className="absolute inset-0 text-purple-400 opacity-70" style={{ transform: 'translate(2px, 1px)' }}>
                    I&apos;m <span className="text-cyan-400">Kongpop</span><br />Pipatpusit
                  </span>
                </>
              )}
              
              <span 
                className={`relative z-10 transition-all duration-300 ${
                  nameEntrancePhase === 0 ? 'opacity-0' : 
                  nameEntrancePhase === 1 ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  backgroundImage: nameEntrancePhase === 1 ? 
                    'linear-gradient(45deg, transparent, rgba(255, 69, 0, 0.3), rgba(255, 215, 0, 0.3), rgba(0, 255, 255, 0.3), transparent)' :
                    'linear-gradient(45deg, #FF4500, #FFD700, #00FFFF, #FF6B00, #FFFF00)',
                  backgroundSize: '400% 400%', 
                  backgroundClip: 'text', 
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animationName: nameEntrancePhase === 1 ? 'quantum-materialize-epic' :
                            nameEntrancePhase === 2 && glitchActive ? 'quantum-shift' : 
                            nameEntrancePhase === 2 ? 'cosmic-flow-text' : 'none',
                  animationDuration: nameEntrancePhase === 1 ? '2.5s' :
                            nameEntrancePhase === 2 && glitchActive ? '0.3s' : 
                            nameEntrancePhase === 2 ? '6s' : '0s',
                  animationTimingFunction: nameEntrancePhase === 1 ? 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' :
                            nameEntrancePhase === 2 && glitchActive ? 'ease-in-out' : 
                            nameEntrancePhase === 2 ? 'ease-in-out' : 'ease',
                  animationFillMode: nameEntrancePhase === 1 ? 'forwards' : 'none',
                  animationIterationCount: nameEntrancePhase === 1 ? '1' :
                            nameEntrancePhase === 2 && glitchActive ? 'infinite' : 
                            nameEntrancePhase === 2 ? 'infinite' : 'none',
                  WebkitTextStroke: nameEntrancePhase >= 2 ? '0.5px #fff' : '0px transparent',
                  WebkitTextFillColor: 'transparent',
                  transform: nameEntrancePhase === 1 ? 'scale(1.1)' : 'scale(1)',
                  filter: nameEntrancePhase === 1 ? 'blur(0.5px)' : 'blur(0px)',
                }}
              >
                I&apos;m <span 
                  className="relative"
                  style={{
                    textShadow: nameEntrancePhase === 1 ? 
                      '0 0 50px #FF4500, 0 0 100px #FFD700, 0 0 150px #FF6B00, 0 0 200px #00FFFF, 0 0 250px #FF1493, 0 0 300px #9400D3' :
                      glitchActive && nameEntrancePhase === 2 ? 
                      '0 0 10px #FF4500, 0 0 20px #FFD700, 0 0 30px #FF6B00' : 
                      '0 0 20px rgba(255, 69, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)'
                  }}
                >
                  Kongpop
                </span><br />Pipatpusit
              </span>
            </h1>

            {glitchActive && (
              <div className="absolute inset-0 pointer-events-none">
                {glitchBlockStyles.map((style, i) => (
                  <div
                    key={i}
                    className={`absolute ${ i % 3 === 0 ? 'bg-orange-400' : i % 3 === 1 ? 'bg-cyan-400' : 'bg-yellow-400' }`}
                    style={{
                      ...style,
                      opacity: 0.8,                 animationName: 'digital-corrupt',
                animationDuration: '0.1s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                      boxShadow: '0 0 4px currentColor'
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* --- 3. เพิ่มเงื่อนไขการแสดงผล --- */}
          { !isMobile && (
            <>
              <motion.div 
                className="mt-8 space-y-4 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-orange-400 via-yellow-400 to-cyan-400 opacity-60 rounded-full" />
                  <p className="text-lg text-orange-100/90 leading-relaxed font-mono">
                    <span className="text-orange-400">HOLOGRAPHIC_INTERFACE</span>
                    <span className="text-cyan-400 animate-pulse">_</span><br />
                    <span className="text-sm text-cyan-300/80 mt-2 block">{'> '}Accessing interdimensional terminal...</span>
                    <span className="text-sm text-yellow-300/70 mt-1 block">{'> '}Reality matrix: <span className="text-green-400">STABLE</span></span>
                  </p>
                </div>
              </motion.div>

              <div className="mt-4 text-xs font-mono text-gray-400 opacity-60">
                <div>Event Horizon: 15.7 LY</div>
                <div>Cosmic Radiation: {cosmicReadings.radiation} THz</div>
                <div>Reality Stability: {cosmicReadings.stability}%</div>
              </div>
            </>
          )}

          <div className="mt-6 flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse shadow-orange-400/50 shadow-md" />
              <span className="text-xs text-orange-300/80 font-mono">BLACK_HOLE.SYS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-cyan-400/50 shadow-md" />
              <span className="text-xs text-cyan-300/80 font-mono">HOLOGRAM.DLL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse shadow-yellow-400/50 shadow-md" />
              <span className="text-xs text-yellow-300/80 font-mono">SPACETIME.EXE</span>
            </div>
          </div>
          
          {/* ส่วนนี้จะแสดงผลทั้งบน Desktop และ Mobile */}
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="bg-black/40 border border-cyan-400/30 rounded px-3 py-2 font-mono text-sm">
              <span className="text-cyan-400">quantum@reality:~$</span>{' '}
              <span className="text-yellow-300">Try </span>
              <code className="text-orange-300 bg-gray-800/50 px-1 rounded">`help`</code>
              <span className="text-yellow-300"> to explore the void</span>
              <span className="text-cyan-400 animate-pulse ml-1">█</span>
            </div>
          </motion.div>

        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="absolute -inset-8 pointer-events-none">
            <div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 69, 0, 0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '25px 25px',
                animationName: 'cosmic-grid-flow',
                animationDuration: '6s',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite'
              }}
            />
          </div>

          <div 
            className={`absolute -inset-4 rounded-lg transition-all duration-300 ${ glitchActive ? 'opacity-80' : 'opacity-30' }`}
            style={{
              backgroundImage: 'conic-gradient(from 0deg, transparent, rgba(255, 69, 0, 0.4), rgba(255, 215, 0, 0.3), rgba(0, 255, 255, 0.4), transparent)',
              animationName: 'cosmic-rotation',
              animationDuration: '12s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite'
            }}
          />

          {glitchActive && (
            <>
              <div className="absolute inset-0 bg-orange-500/30 rounded-lg" style={{ transform: 'translateX(-3px) translateY(-1px)' }} />
              <div className="absolute inset-0 bg-cyan-500/25 rounded-lg" style={{ transform: 'translateX(1px) translateY(2px)' }} />
              <div className="absolute inset-0 bg-yellow-500/20 rounded-lg" style={{ transform: 'translateX(2px) translateY(-1px)' }} />
              <div 
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cosmic-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cosmic-noise)' fill='%23FF4500' opacity='0.3'/%3E%3C/svg%3E")`,
                  animationName: 'cosmic-noise-shift',
                  animationDuration: '0.1s',
                  animationTimingFunction: 'steps(8, end)',
                  animationIterationCount: 'infinite'
                }}
              />
            </>
          )}

          {glitchActive && cosmicErrorStyles.map((style, i) => (
            <div
              key={quantumErrors[i] + i}
              className="absolute pointer-events-none text-xs font-mono text-orange-400 whitespace-nowrap"
              style={{
                ...style,
                opacity: 0.8,
                textShadow: '0 0 10px rgba(255, 69, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.4)',
                animationName: 'cosmic-error-glitch',
                animationDuration: '0.5s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
              }}
            >
              {quantumErrors[i]}
            </div>
          ))}

          <div className={`relative ${glitchActive ? 'animate-terminal-quantum' : ''}`}>
            <Terminal />
          </div>

          <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-orange-400 opacity-70 shadow-orange-400/50 shadow-sm" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-cyan-400 opacity-70 shadow-cyan-400/50 shadow-sm" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-yellow-400 opacity-70 shadow-yellow-400/50 shadow-sm" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-orange-400 opacity-70 shadow-orange-400/50 shadow-sm" />
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes quantum-converge-epic {
          0% { 
            transform: translate(0, 0) scale(2) rotate(0deg);
            opacity: 1;
            filter: blur(3px) brightness(2);
          }
          50% {
            transform: translate(calc(25vw - 50%), calc(25vh - 50%)) scale(1.5) rotate(180deg);
            opacity: 0.8;
            filter: blur(1px) brightness(1.5);
          }
          100% { 
            transform: translate(calc(50vw - 50%), calc(50vh - 50%)) scale(0) rotate(360deg);
            opacity: 0;
            filter: blur(0px) brightness(0.5);
          }
        }
        
        @keyframes reality-tear-epic {
          0% { 
            opacity: 0;
            transform: scaleX(0) scaleY(5) rotate(0deg);
            filter: blur(30px) brightness(0.3);
          }
          25% {
            opacity: 0.4;
            transform: scaleX(0.5) scaleY(3) rotate(10deg);
            filter: blur(20px) brightness(0.8);
          }
          50% { 
            opacity: 1;
            transform: scaleX(1) scaleY(1) rotate(0deg);
            filter: blur(8px) brightness(2);
          }
          75% {
            opacity: 0.6;
            transform: scaleX(1.3) scaleY(0.7) rotate(-5deg);
            filter: blur(3px) brightness(1.5);
          }
          100% { 
            opacity: 0;
            transform: scaleX(2) scaleY(0.2) rotate(0deg);
            filter: blur(0px) brightness(0.5);
          }
        }
        
        @keyframes holographic-build-epic {
          0% { 
            transform: scaleX(0) translateX(-100%);
            opacity: 0;
            filter: hue-rotate(0deg);
          }
          30% {
            transform: scaleX(0.7) translateX(-20%);
            opacity: 0.8;
            filter: hue-rotate(90deg);
          }
          60% { 
            transform: scaleX(1.2) translateX(10%);
            opacity: 1;
            filter: hue-rotate(180deg);
          }
          80% {
            transform: scaleX(1) translateX(0%);
            opacity: 0.9;
            filter: hue-rotate(270deg);
          }
          100% { 
            transform: scaleX(1) translateX(0%);
            opacity: 0;
            filter: hue-rotate(360deg);
          }
        }
        
        @keyframes energy-explosion {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
            filter: blur(0px);
          }
          50% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
            filter: blur(2px);
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
            filter: blur(5px);
          }
        }
        
        @keyframes lightning-strike {
          0% {
            opacity: 0;
            transform: scaleY(0) rotate(var(--rotation, 0deg));
            filter: brightness(0.5);
          }
          10% {
            opacity: 1;
            transform: scaleY(0.3) rotate(var(--rotation, 0deg));
            filter: brightness(3);
          }
          20% {
            opacity: 0.8;
            transform: scaleY(1) rotate(var(--rotation, 0deg));
            filter: brightness(2);
          }
          30% {
            opacity: 1;
            transform: scaleY(0.8) rotate(var(--rotation, 0deg));
            filter: brightness(4);
          }
          100% {
            opacity: 0;
            transform: scaleY(0) rotate(var(--rotation, 0deg));
            filter: brightness(0.5);
          }
        }
        
        @keyframes dimensional-portal {
          0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
            filter: blur(20px) hue-rotate(0deg);
          }
          30% {
            opacity: 0.6;
            transform: scale(0.5) rotate(120deg);
            filter: blur(10px) hue-rotate(120deg);
          }
          60% {
            opacity: 0.8;
            transform: scale(1.2) rotate(240deg);
            filter: blur(5px) hue-rotate(240deg);
          }
          100% {
            opacity: 0;
            transform: scale(2) rotate(360deg);
            filter: blur(30px) hue-rotate(360deg);
          }
        }
        
        @keyframes quantum-materialize-epic {
          0% { 
            opacity: 0;
            transform: scale(0.3) rotateX(90deg) rotateY(45deg);
            filter: blur(20px) brightness(0.2) saturate(0.5);
          }
          15% {
            opacity: 0.2;
            transform: scale(0.6) rotateX(45deg) rotateY(22deg);
            filter: blur(15px) brightness(0.8) saturate(1);
          }
          30% { 
            opacity: 0.4;
            transform: scale(0.9) rotateX(20deg) rotateY(10deg);
            filter: blur(10px) brightness(1.8) saturate(1.5);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.15) rotateX(5deg) rotateY(2deg);
            filter: blur(5px) brightness(2.2) saturate(2);
          }
          70% { 
            opacity: 0.85;
            transform: scale(1.05) rotateX(-2deg) rotateY(-1deg);
            filter: blur(3px) brightness(1.8) saturate(1.8);
          }
          85% {
            opacity: 0.95;
            transform: scale(1.02) rotateX(1deg) rotateY(0.5deg);
            filter: blur(1px) brightness(1.3) saturate(1.3);
          }
          100% { 
            opacity: 1;
            transform: scale(1) rotateX(0deg) rotateY(0deg);
            filter: blur(0px) brightness(1) saturate(1);
          }
        }
        
        @keyframes quantum-converge {
          0% { 
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% { 
            transform: translate(calc(50vw - 50%), calc(50vh - 50%)) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes reality-tear {
          0% { 
            opacity: 0;
            transform: scaleX(0) scaleY(3);
            filter: blur(20px);
          }
          50% { 
            opacity: 0.8;
            transform: scaleX(1) scaleY(1);
            filter: blur(5px);
          }
          100% { 
            opacity: 0;
            transform: scaleX(1.2) scaleY(0.5);
            filter: blur(0px);
          }
        }
        
        @keyframes holographic-build {
          0% { 
            transform: scaleX(0);
            opacity: 0;
          }
          50% { 
            transform: scaleX(1);
            opacity: 1;
          }
          100% { 
            transform: scaleX(1);
            opacity: 0;
          }
        }
        
        @keyframes quantum-materialize {
          0% { 
            opacity: 0;
            transform: scale(0.8);
            filter: blur(10px) brightness(0.5);
          }
          30% { 
            opacity: 0.3;
            transform: scale(1.05);
            filter: blur(5px) brightness(1.5);
          }
          60% { 
            opacity: 0.7;
            transform: scale(0.98);
            filter: blur(2px) brightness(1.2);
          }
          80% { 
            opacity: 0.9;
            transform: scale(1.01);
            filter: blur(1px) brightness(1.1);
          }
          100% { 
            opacity: 1;
            transform: scale(1);
            filter: blur(0px) brightness(1);
          }
        }
        
        @keyframes hologram-scan {
          0%, 100% { opacity: 0.2; transform: translateX(-100%); }
          50% { opacity: 0.8; transform: translateX(100%); }
        }
        @keyframes cosmic-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
        }
        @keyframes cosmic-flow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes cosmic-flow-text {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes energy-field {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.2; }
          50% { transform: scale(1.05) rotate(180deg); opacity: 0.4; }
        }
        @keyframes cosmic-grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(25px, 25px); }
        }
        @keyframes cosmic-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes cosmic-error-glitch {
          0%, 100% { opacity: 0.8; transform: translateX(0) rotate(0deg); }
          25% { opacity: 0.3; transform: translateX(-2px) rotate(-1deg); }
          50% { opacity: 1; transform: translateX(2px) rotate(1deg); }
          75% { opacity: 0.5; transform: translateX(-1px) rotate(-0.5deg); }
        }
        @keyframes digital-corrupt {
          0%, 100% { opacity: 0.7; transform: scaleX(1); }
          50% { opacity: 1; transform: scaleX(1.2); }
        }
        @keyframes quantum-shift {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-1px) translateY(-1px); }
          50% { transform: translateX(1px) translateY(1px); }
          75% { transform: translateX(-1px) translateY(1px); }
        }
        .animate-digital-glitch {
          animation-name: quantum-shift;
          animation-duration: 0.1s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .animate-terminal-quantum {
          animation-name: cosmic-rotation;
          animation-duration: 0.3s;
          animation-timing-function: ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;