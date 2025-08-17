"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Enhanced skills with gravitational positioning
const skills = [
  { name: "Money", x: "-60px", y: "40px", color: "#61DAFB", glow: "#61DAFB" },
  { name: "Investing", x: "100px", y: "0px", color: "#FFFFFF", glow: "#FFFFFF" },
  { name: "Philosophy", x: "0px", y: "-90px", color: "#3178C6", glow: "#3178C6" },
  { name: "Coding", x: "60px", y: "40px", color: "#FF0080", glow: "#FF0080" },
  { name: "Chess", x: "-100px", y: "-80px", color: "#FFCA28", glow: "#FFCA28" },
  { name: "Gym", x: "100px", y: "-80px", color: "#68A063", glow: "#68A063" },
  { name: "Music", x: "0px", y: "90px", color: "#F05032", glow: "#F05032" },
];

// --- HolographicSkill Component ---
const HolographicSkill = ({ name, x, y, color, glow }: { name: string; x: string; y: string; color: string; glow: string; }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const randomDelay = Math.random() * 2;
  const randomDuration = 4 + Math.random() * 4;

  return (
    <motion.div
      className="absolute"
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [x, `calc(${x} + ${Math.random() * 10 - 5}px)`],
        y: [y, `calc(${y} + ${Math.random() * 10 - 5}px)`],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.2, 0.8, 1],
      }}
    >
      <div className="relative group">
        <div
          className="px-4 py-2 text-sm font-bold font-mono rounded-full border border-white/30 backdrop-blur-sm"
          style={{
            color,
            textShadow: `0 0 12px ${glow}`,
          }}
        >
          {name}
        </div>
        <div
          className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, transparent, ${glow} 40%)`,
            filter: "blur(12px)",
          }}
        />
      </div>
    </motion.div>
  );
};

// --- About Component ---
const About = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20">
      {/* --- กรอบใหญ่ (ทั้งหน้า) --- */}
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
      
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
          animate={{ backgroundPosition: ["0 0", "30px 30px"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="z-10 flex w-full max-w-7xl flex-col items-center gap-12 px-4 md:flex-row md:px-8">
        {/* --- START: แก้ไข Div นี้เพื่อเปลี่ยนสไตล์กรอบ --- */}
        <motion.div
          className="w-full md:w-1/2 relative p-8 rounded-lg border-2 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 border-cyan-400/30 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-400/20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* ลบกรอบแบบมุมออกไปแล้ว */}
          <motion.h2
            className="text-5xl font-bold md:text-7xl relative mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 z-10 font-mono"
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            style={{ textShadow: "0 0 40px rgba(0, 255, 255, 0.6)" }}
          >
            ABOUT ME
          </motion.h2>
          <div className="mt-4 space-y-4 font-mono text-lg text-gray-300">
            <p>
              I think, therefore I am.
              In a world of noise, I choose clarity—through tech, code, and the markets.
              Philosophy fuels my questions. Technology builds my answers. Finance tests my discipline.
              And innovation is where it all converges.
            </p>
            <p>
              I walk through fire, I carve the sky,  
              In code I dream, in truth I try,  
              Philosophy asks, yet answers lie,  
              But still, my heart says love you—why? @that one girl.  
            </p>
            <p>
              My goal: To innovate the world, not for recognition, but for meaning.
              

            </p>
          </div>
        </motion.div>
        {/* --- END: สิ้นสุดการแก้ไข --- */}


        <div className="relative flex h-96 w-full items-center justify-center md:w-1/2">
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-cyan-400"
            style={{ boxShadow: "0 0 20px 5px #06B6D4" }}
            animate={{ scale: [1, 1.1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <div className="relative">
            {skills.map((skill, index) => (
              <HolographicSkill
                key={index}
                name={skill.name}
                x={skill.x}
                y={skill.y}
                color={skill.color}
                glow={skill.glow}
              />
            ))}
          </div>

          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-cyan-400/40"
              style={{
                width: `${ring * 80}px`,
                height: `${ring * 80}px`,
              }}
              animate={{
                rotate: ring % 2 === 0 ? 360 : -360,
              }}
              transition={{
                duration: 20 + ring * 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        animate={{
          scaleX: [0, 1, 0, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default About;