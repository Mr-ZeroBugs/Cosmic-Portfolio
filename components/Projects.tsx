"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Eye, ArrowRight, ChevronDown, Zap, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Type Definitions ---
interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubLink: string;
  liveLink?: string;
  featured?: boolean;
}

type CardParticle = {
  id: number;
  left: string;
  top: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
};

type DataStream = {
  id: number;
  width: string;
  left: string;
  top: string;
  rotate: string;
};

type HologramLine = {
    id: number;
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    delay: number;
};

// --- Enhanced Sub Components ---

const QuantumLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] relative">
      <div className="relative">
        {/* Central Core */}
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 relative"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            boxShadow: [
              "0 0 20px rgba(0, 255, 255, 0.5)",
              "0 0 40px rgba(128, 0, 255, 0.8)",
              "0 0 20px rgba(0, 255, 255, 0.5)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-2 rounded-full bg-black"
            animate={{ rotate: [-360, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Orbiting Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-6px",
              marginLeft: "-6px"
            }}
            animate={{
              x: [0, 60 * Math.cos((i * 60) * Math.PI / 180)],
              y: [0, 60 * Math.sin((i * 60) * Math.PI / 180)],
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Energy Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute border border-cyan-400/30 rounded-full"
            style={{
              width: `${120 + i * 40}px`,
              height: `${120 + i * 40}px`,
              top: "50%",
              left: "50%",
              marginTop: `-${60 + i * 20}px`,
              marginLeft: `-${60 + i * 20}px`
            }}
            animate={{
              rotate: [0, 360]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <motion.div className="absolute bottom-0 flex flex-col items-center">
        <motion.p
          className="text-cyan-400 font-mono text-lg mb-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ACCESSING QUANTUM DATABASE...
        </motion.p>
        <motion.div
          className="flex space-x-1"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-6 bg-gradient-to-t from-cyan-400 to-purple-500"
              animate={{
                scaleY: [0.3, 1, 0.3],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const HolographicProjectCard = ({ project, index, onReadMoreClick }: { project: Project; index: number; onReadMoreClick: (project: Project) => void; }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const [cardParticles, setCardParticles] = useState<CardParticle[]>([]);
    const [hologramLines, setHologramLines] = useState<HologramLine[]>([]);
    const [hasMounted, setHasMounted] = useState(false);

    // Truncate description logic
    const maxDescriptionLength = 120;
    const shouldTruncate = project.description.length > maxDescriptionLength;
    const displayDescription = shouldTruncate
      ? project.description.substring(0, maxDescriptionLength) + "..."
      : project.description;

    useEffect(() => {
      setHasMounted(true);

      // Enhanced particles
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        x: (Math.random() - 0.5) * 80,
        y: (Math.random() - 0.5) * 80,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 3
      }));
      setCardParticles(newParticles);

      // Hologram lines
      const newHologramLines = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x1: `${Math.random() * 100}%`,
        y1: `${Math.random() * 100}%`,
        x2: `${Math.random() * 100}%`,
        y2: `${Math.random() * 100}%`,
        delay: Math.random() * 2
      }));
      setHologramLines(newHologramLines);

      // Enhanced glitch effect
      const glitchInterval = setInterval(() => {
        if (Math.random() < 0.08) {
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 400);
        }
      }, 2500);

      return () => clearInterval(glitchInterval);
    }, []);

    const cardVariants = {
      hidden: {
        y: 100, // ADJUSTED
        opacity: 0,
        rotateX: -45, // ADJUSTED
        scale: 0.8, // ADJUSTED
        filter: "blur(10px)"
      },
      visible: {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
          type: "spring",
          stiffness: 120, // ADJUSTED
          damping: 20, // ADJUSTED
          delay: index * 0.1, // ADJUSTED: Reduced delay
          duration: 0.8 // ADJUSTED: Reduced duration
        }
      },
    } as const;

    if (!hasMounted) {
      return null;
    }

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }} // ADJUSTED: Animation triggers sooner
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{
          y: -15,
          scale: 1.03,
          rotateX: 8,
          rotateY: isHovered ? 2 : 0,
          z: 50
        }}
        className="perspective-1000 group"
      >
        <Card className={`
          relative flex h-full flex-col overflow-hidden border-2 
          bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm
          transition-all duration-700
          ${isGlitching
            ? 'border-red-500 animate-pulse shadow-2xl shadow-red-500/40'
            : isHovered
              ? 'border-cyan-400 shadow-2xl shadow-cyan-400/30'
              : 'border-cyan-400/40'
          }
        `}>

          {/* Scanning Effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none z-10" 
            animate={{ y: ["-100%", "100%"] }} 
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }} 
          />
          
          {/* Hologram Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
            {hologramLines.map((line) => (
              <motion.line
                key={line.id}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={isGlitching ? "#ef4444" : "#00ffff"}
                strokeWidth="1"
                opacity="0.3"
                animate={{
                  opacity: [0, 0.6, 0],
                  strokeDasharray: ["0 100", "50 50", "100 0"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: line.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>
          
          {/* Floating Particles */}
          {cardParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className={`absolute w-1 h-1 rounded-full pointer-events-none z-10 ${
                isGlitching ? 'bg-red-400' : 'bg-cyan-400'
              }`}
              style={{ left: particle.left, top: particle.top }}
              animate={{
                x: [0, particle.x, -particle.x, 0],
                y: [0, particle.y, -particle.y, 0],
                scale: [0.5, 1.5, 0.8, 0.5],
                opacity: [0.3, 1, 0.6, 0.3]
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Enhanced Corner Brackets */}
          {[
            { position: "top-2 left-2", borders: "border-l-2 border-t-2" },
            { position: "top-2 right-2", borders: "border-r-2 border-t-2" },
            { position: "bottom-2 left-2", borders: "border-l-2 border-b-2" },
            { position: "bottom-2 right-2", borders: "border-r-2 border-b-2" }
          ].map((bracket, i) => (
            <motion.div
              key={i}
              className={`absolute ${bracket.position} w-6 h-6 ${bracket.borders} transition-colors duration-300 z-20`}
              style={{
                borderColor: isGlitching ? '#ef4444' : '#00ffff',
                filter: `drop-shadow(0 0 8px ${isGlitching ? '#ef4444' : '#00ffff'})`
              }}
              animate={{
                scale: isHovered ? [1, 1.2, 1] : 1,
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}

          <CardHeader className="relative z-10">
            <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-cyan-400/40 relative group">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={400}
                height={225}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              />

              {/* Image Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Holographic Grid Overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(0,255,255,0.2) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,255,255,0.2) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />

              {/* Featured Badge */}
              {project.featured && (
                <motion.div
                  className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full flex items-center space-x-1"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(255, 193, 7, 0.5)",
                      "0 0 20px rgba(255, 193, 7, 0.8)",
                      "0 0 10px rgba(255, 193, 7, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Star className="w-3 h-3 text-black" />
                  <span className="text-xs font-bold text-black">FEATURED</span>
                </motion.div>
              )}
            </div>

            <CardTitle className={`pt-4 text-2xl font-mono transition-all duration-500 ${
              isGlitching
                ? 'text-red-400 animate-pulse'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'
            }`}>
              <motion.span
                animate={{
                  textShadow: isHovered
                    ? "0 0 25px rgba(0, 255, 255, 0.9), 0 0 35px rgba(128, 0, 255, 0.5)"
                    : "0 0 15px rgba(0, 255, 255, 0.4)"
                }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.span>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-grow relative z-10">
            <motion.div
              className={`font-mono leading-relaxed transition-colors duration-300 ${
                isGlitching ? 'text-red-300' : 'text-cyan-100'
              }`}
              animate={{ x: isGlitching ? [0, -2, 2, 0] : 0 }}
            >
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold text-lg">&gt;</span>
                <div className="flex-1">
                  <p>
                    {displayDescription}
                  </p>

                  {shouldTruncate && (
                    <motion.button
                      onClick={() => onReadMoreClick(project)}
                      className="mt-2 flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-mono group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Zap className="w-3 h-3" />
                      <span>Read More</span>
                      <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex flex-col items-start space-y-4 relative z-10">
            {/* Enhanced Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className={`px-3 py-1 text-xs font-mono rounded-full border-2 transition-all duration-300 relative overflow-hidden ${
                    isGlitching
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-cyan-400/10 border-cyan-400/60 text-cyan-300 group-hover:border-cyan-400'
                  }`}
                  style={{
                    textShadow: `0 0 10px ${isGlitching ? '#ef4444' : '#00ffff'}`,
                    boxShadow: `0 0 15px ${isGlitching ? '#ef444420' : '#00ffff20'}`
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 25px ${isGlitching ? '#ef444440' : '#00ffff40'}`
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    animate={{
                      x: isHovered ? ['-100%', '100%'] : '-100%'
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: isHovered ? Infinity : 0,
                    }}
                  />
                  <span className="relative z-10">{tag}</span>
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 w-full">
              {project.githubLink && project.githubLink.toLowerCase() !== 'none' && (
                <Link href={project.githubLink} target="_blank" className="group flex items-center space-x-2 text-cyan-400 hover:text-white transition-all duration-300">
                  <motion.div className="p-2 border border-cyan-400/50 rounded-lg backdrop-blur-sm group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-300">
                    <Github className="h-5 w-5" />
                  </motion.div>
                  <span className="font-mono text-sm group-hover:text-shadow-glow">SOURCE CODE</span>
                </Link>
              )}
              {project.liveLink && project.liveLink.toLowerCase() !== 'none' && (
                <Link href={project.liveLink} target="_blank">
                  <motion.button className="group flex items-center space-x-2 text-purple-400 hover:text-white transition-all duration-300">
                    <div className="p-2 border border-purple-400/50 rounded-lg backdrop-blur-sm group-hover:border-purple-400 group-hover:bg-purple-400/10 transition-all duration-300">
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-sm">PREVIEW</span>
                  </motion.button>
                </Link>
              )}
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

const DataStreamBackground = () => {
    const [streams, setStreams] = useState<DataStream[]>([]);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        const newStreams = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            width: `${150 + Math.random() * 300}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            rotate: `${Math.random() * 360}deg`
        }));
        setStreams(newStreams);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {streams.map((stream) => (
          <motion.div
            key={stream.id}
            className="absolute h-px"
            style={{
              width: stream.width,
              left: stream.left,
              top: stream.top,
              rotate: stream.rotate,
              background: `linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.6) 50%, transparent 100%)`
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: stream.id * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Additional Matrix-like Code Rain */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`code-${i}`}
            className="absolute text-green-400/30 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-10%`
            }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {Math.random().toString(36).substring(2, 8)}
          </motion.div>
        ))}
      </div>
    );
  };

// --- Modal Component ---
const ProjectModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full max-h-[90vh] bg-gradient-to-br from-gray-900/70 to-black/70 border-2 border-cyan-400/60 rounded-lg shadow-2xl shadow-cyan-400/30 overflow-y-auto"
        initial={{ y: 100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } }}
        exit={{ y: 100, scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.6)" }}>
              {project.title}
            </h2>
            <motion.button onClick={onClose} className="text-cyan-400 hover:text-white" whileHover={{ scale: 1.2, rotate: 90 }} whileTap={{ scale: 0.9 }}>
              <X size={28} />
            </motion.button>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-cyan-400/40 mb-6">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="font-mono text-cyan-100 leading-relaxed text-lg">
            {project.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- Main Projects Component ---
const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    const q = query(
      projectsCollectionRef,
      where("featured", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleReadMoreClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div id="projects" className="relative flex min-h-screen w-full flex-col items-center justify-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <DataStreamBackground />

      {/* Enhanced Title */}
      <motion.div className="relative mb-20 text-center z-10">
        <motion.h2
          className="relative text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 font-mono"
          initial={{ y: -80, opacity: 0, scale: 0.6, rotateX: -90 }} // ADJUSTED
          whileInView={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
          transition={{
            duration: 1.0, // ADJUSTED
            type: "spring",
            stiffness: 100,
            delay: 0.1 // ADJUSTED
          }}
          style={{
            textShadow: "0 0 40px rgba(0, 255, 255, 0.6), 0 0 60px rgba(128, 0, 255, 0.4)",
            filter: "drop-shadow(0 4px 20px rgba(0, 255, 255, 0.3))"
          }}
        >
          FEATURED PROJECTS
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-lg text-cyan-300/80 font-mono"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }} // ADJUSTED
        >
          &gt; Quantum-enhanced digital experiences
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        />
      </motion.div>

      {loading ? (
        <QuantumLoader />
      ) : (
        <motion.div
          className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} // ADJUSTED
        >
          {projects.map((project, index) => (
            <HolographicProjectCard key={project.id} project={project} index={index} onReadMoreClick={handleReadMoreClick} />
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>


      {!loading && projects.length > 0 && (
        <motion.div className="mt-16 text-center z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Link href="/projects">
            <Button size="lg" className="font-mono text-lg bg-cyan-400/10 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 hover:text-white hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 group">
              View Full Archive
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      )}

      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  );
};

export default Projects;