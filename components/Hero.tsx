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
                animationDelay: `${i * 0.3}s`,
                animation: 'hologram-scan 4s ease-in-out infinite'
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
            animation: 'cosmic-pulse 6s ease-in-out infinite'
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
                  animationDelay: `${i * 0.2}s`, animation: 'cosmic-flow 3s ease-in-out infinite'
                }}
              />
            ))}
          </div>

          <div 
            className="absolute -inset-8 opacity-20 rounded-full"
            style={{
              background: 'radial-gradient(ellipse, rgba(255, 69, 0, 0.2) 0%, transparent 60%)',
              animation: 'energy-field 8s ease-in-out infinite'
            }}
          />

          <div className="relative">
            <h1 className="text-5xl font-bold md:text-7xl relative">
              {glitchActive && (
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
                className="relative z-10"
                style={{
                  background: 'linear-gradient(45deg, #FF4500, #FFD700, #00FFFF, #FF6B00, #FFFF00)',
                  backgroundSize: '400% 400%', backgroundClip: 'text', WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: glitchActive ? 'quantum-shift 0.3s ease-in-out infinite' : 'cosmic-flow-text 6s ease-in-out infinite',
                  WebkitTextStroke: '0.5px #fff',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                I&apos;m <span 
                  className="relative"
                  style={{
                    textShadow: glitchActive ? 
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
                      opacity: 0.8, animation: 'digital-corrupt 0.1s linear infinite',
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
                animation: 'cosmic-grid-flow 6s linear infinite'
              }}
            />
          </div>

          <div 
            className={`absolute -inset-4 rounded-lg transition-all duration-300 ${ glitchActive ? 'opacity-80' : 'opacity-30' }`}
            style={{
              background: 'conic-gradient(from 0deg, transparent, rgba(255, 69, 0, 0.4), rgba(255, 215, 0, 0.3), rgba(0, 255, 255, 0.4), transparent)',
              animation: 'cosmic-rotation 12s linear infinite'
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
                  background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cosmic-noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cosmic-noise)' fill='%23FF4500' opacity='0.3'/%3E%3C/svg%3E")`,
                  animation: 'cosmic-noise-shift 0.1s steps(8, end) infinite'
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
                animation: 'cosmic-error-glitch 0.5s ease-in-out infinite',
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
          animation: quantum-shift 0.1s ease-in-out infinite;
        }
        .animate-terminal-quantum {
          animation: cosmic-rotation 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Hero;