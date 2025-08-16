"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Enhanced skills with gravitational positioning
const skills = [
  { name: "React", x: "-15vw", y: "2vw", color: "#61DAFB", glow: "#61DAFB" },
  { name: "Next.js", x: "-5vw", y: "-8vw", color: "#FFFFFF", glow: "#FFFFFF" },
  { name: "TypeScript", x: "15vw", y: "6vw", color: "#3178C6", glow: "#3178C6" },
  { name: "Tailwind CSS", x: "0vw", y: "10vw", color: "#06B6D4", glow: "#06B6D4" },
  { name: "Framer Motion", x: "-18vw", y: "-12vw", color: "#FF0080", glow: "#FF0080" },
  { name: "Firebase", x: "12vw", y: "-10vw", color: "#FFCA28", glow: "#FFCA28" },
  { name: "Node.js", x: "20vw", y: "-5vw", color: "#68A063", glow: "#68A063" },
  { name: "Git", x: "0vw", y: "-15vw", color: "#F05032", glow: "#F05032" },
  // Add more skills as needed
];

const HolographicSkill = ({ name, x, y, color, glow, index }: { name: string; x: string; y: string; color: string; glow: string; index: number }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const randomDelay = Math.random() * 2;
  const randomDuration = 3 + Math.random() * 3;

  return (
    <motion.div
      className="absolute"
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [x, `calc(${x} + ${Math.random() * 20 - 10}px)`],
        y: [y, `calc(${y} + ${Math.random() * 20 - 10}px)`],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: randomDuration,
        delay: randomDelay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <div className="relative group">
        <div
          className="px-3 py-1 text-sm font-mono rounded-full border border-white/20"
          style={{ color, textShadow: `0 0 8px ${glow}` }}
        >
          {name}
        </div>
        <div
          className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background: `radial-gradient(circle, transparent, ${glow} 50%)`,
            filter: "blur(10px)",
          }}
        />
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20">
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
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold md:text-7xl">
            <span className="relative">
              ABOUT ME
              <motion.span
                className="absolute left-0 top-0 text-cyan-400"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  textShadow: [
                    "0 0 5px #06B6D4",
                    "0 0 20px #06B6D4",
                    "0 0 5px #06B6D4",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </span>
          </h2>
          <div className="mt-8 space-y-4 font-mono text-lg text-gray-300">
            <p>
              I think, therefore I am.
              In a world of noise, I choose clarity—through tech, code, and the markets.
              Philosophy fuels my questions. Technology builds my answers. Finance tests my discipline.
              And innovation is where it all converges.
            </p>
            <p>
              My goal: To innovate the world, not for recognition, but for meaning.
            </p>
          </div>
        </motion.div>

        <div className="relative flex h-96 w-full items-center justify-center md:w-1/2">
          {/* --- FIXED CORE ANIMATION --- */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-cyan-400"
            style={{ boxShadow: "0 0 20px 5px #06B6D4" }}
            animate={{ scale: [1, 1.1] }} // <-- ใช้แค่ 2 keyframes
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse", // <-- เปลี่ยนเป็น 'reverse' หรือ 'yoyo'
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
                index={index}
              />
            ))}
          </div>

          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-cyan-400/20"
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