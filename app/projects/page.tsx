"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Home, Zap, Activity, ChevronDown, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Eye } from "lucide-react";
import Image from "next/image";

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

type HologramParticle = {
  id: number;
  left: string;
  top: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
};

type DataStream = {
  id: number;
  width: string;
  left: string;
  top: string;
  rotate: string;
  opacity: number;
  color: string;
};

type GlitchLine = {
  id: number;
  height: string;
  left: string;
  top: string;
  width: string;
  delay: number;
};

// --- Modal Component ---
const ProjectDetailModal = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-4xl w-full max-h-[90vh] bg-gradient-to-br from-slate-900/70 via-blue-900/50 to-black/70 border-2 border-cyan-400/60 rounded-lg shadow-2xl shadow-cyan-400/30 overflow-y-auto"
        initial={{ y: 100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } }}
        exit={{ y: 100, scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-4xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400" style={{ textShadow: "0 0 20px rgba(0, 255, 255, 0.6)" }}>
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


// --- Enhanced Quantum Loader with Blackhole Theme ---
const QuantumBlackholeLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] relative">
      {/* Central core */}
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600 relative"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            boxShadow: [
              "0 0 20px rgba(0, 255, 255, 0.8)",
              "0 0 40px rgba(0, 255, 255, 1)",
              "0 0 20px rgba(0, 255, 255, 0.8)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inner void */}
          <div className="absolute inset-2 rounded-full bg-black border border-cyan-400/50" />
        </motion.div>

        {/* Orbital data fragments */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-sm"
            style={{
              top: "50%",
              left: "50%",
              marginTop: "-4px",
              marginLeft: "-4px"
            }}
            animate={{
              x: [0, 60 * Math.cos((i * 60) * Math.PI / 180)],
              y: [0, 60 * Math.sin((i * 60) * Math.PI / 180)],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "linear"
            }}
          />
        ))}

        {/* Accretion disk effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-orange-400/60"
          style={{ width: "120px", height: "120px", margin: "-30px" }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading text with glitch */}
      <motion.div className="absolute bottom-0 font-mono text-cyan-400">
        <motion.span
          animate={{
            opacity: [0.5, 1, 0.5],
            textShadow: [
              "0 0 5px rgba(0, 255, 255, 0.5)",
              "0 0 20px rgba(0, 255, 255, 1)",
              "0 0 5px rgba(0, 255, 255, 0.5)"
            ]
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          [SCANNING_ARCHIVE]
        </motion.span>
        <motion.span
          className="inline-block ml-2"
          animate={{
            opacity: [0, 1, 0],
            x: [0, 3, -3, 0]
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          █
        </motion.span>
      </motion.div>
    </div>
  );
};

// --- Enhanced Holographic Project Card ---
const HolographicLabCard = ({ project, index, onReadMoreClick }: { project: Project; index: number; onReadMoreClick: (project: Project) => void; }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [dataCorruption, setDataCorruption] = useState(false);
  const [hologramParticles, setHologramParticles] = useState<HologramParticle[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  const maxDescriptionLength = 120;
  const shouldTruncate = project.description.length > maxDescriptionLength;
  const displayDescription = shouldTruncate
    ? project.description.substring(0, maxDescriptionLength) + "..."
    : project.description;

  useEffect(() => {
    setHasMounted(true);
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 30,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 3,
      color: i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#0066FF' : '#9933FF'
    }));
    setHologramParticles(newParticles);

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.08) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 400);
      }
      if (Math.random() < 0.03) {
        setDataCorruption(true);
        setTimeout(() => setDataCorruption(false), 800);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.7, z: -100 }}
      animate={{ opacity: 1, scale: 1, z: 0 }}
      exit={{ opacity: 0, scale: 0.7, z: -100 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
        delay: index * 0.1
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -15,
        scale: 1.03,
        rotateX: 8,
        rotateY: isHovered ? 5 : 0,
        z: 50
      }}
      className="perspective-1000 group"
    >
      <Card className={`
        relative flex h-full flex-col overflow-hidden border-2
        bg-gradient-to-br from-slate-900/60 via-blue-900/40 to-black/80
        backdrop-blur-md transition-all duration-500 transform-gpu
        ${isGlitching ?
          'border-red-400 shadow-2xl shadow-red-400/30 animate-pulse' :
          isHovered ?
            'border-cyan-400 shadow-2xl shadow-cyan-400/40 glow-cyan' :
            'border-cyan-400/40 shadow-lg shadow-blue-500/20'
        }
        ${dataCorruption ? 'animate-bounce' : ''}
      `}>

        {/* Holographic scan line */}
        <motion.div
          className={`absolute inset-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-20 ${
            isGlitching ? 'via-red-400' : 'via-cyan-400'
          }`}
          animate={{
            y: ["-100%", "100%"],
            opacity: isHovered ? [0, 1, 0] : [0, 0.7, 0]
          }}
          transition={{
            duration: isGlitching ? 0.3 : 2.5,
            repeat: Infinity,
            repeatDelay: isGlitching ? 0.1 : 3,
            ease: "linear"
          }}
        />

        {/* Corner UI elements */}
        {[
          'top-3 left-3 border-l-2 border-t-2',
          'top-3 right-3 border-r-2 border-t-2',
          'bottom-3 left-3 border-l-2 border-b-2',
          'bottom-3 right-3 border-r-2 border-b-2'
        ].map((position, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 transition-all duration-300 z-20 ${position} ${
              isGlitching ? 'border-red-400 animate-ping' :
              isHovered ? 'border-cyan-300 glow-cyan' : 'border-cyan-500/60'
            }`}
          />
        ))}

        {/* System status indicator */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            className={`w-2 h-2 rounded-full ${
              isGlitching ? 'bg-red-400' : dataCorruption ? 'bg-yellow-400' : 'bg-green-400'
            }`}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>

        {/* Holographic particles */}
        {hologramParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full pointer-events-none z-10"
            style={{
              left: particle.left,
              top: particle.top,
              backgroundColor: particle.color,
              boxShadow: `0 0 6px ${particle.color}`
            }}
            animate={{
              x: [0, particle.x, -particle.x, 0],
              y: [0, particle.y, -particle.y, 0],
              opacity: [0, 0.8, 0.3, 0],
              scale: [0, 1, 0.5, 0]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        <CardHeader className="relative z-10">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-cyan-400/40 relative group">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={400}
              height={225}
              className={`h-full w-full object-cover transition-all duration-700 ${
                isGlitching ? 'filter hue-rotate-180 saturate-200' :
                'group-hover:scale-110 group-hover:brightness-125'
              }`}
            />

            {/* Holographic overlay */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-blue-400/20
              ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`} />

            {/* Data corruption effect */}
            {dataCorruption && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/30 to-transparent animate-pulse" />
            )}

            {/* Scan lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.1) 2px, rgba(0,255,255,0.1) 4px)'
                 }} />
          </div>

          <CardTitle className={`pt-4 text-2xl font-mono transition-all duration-300 ${
            isGlitching ? 'text-red-400 animate-pulse tracking-wider' :
            dataCorruption ? 'text-yellow-300' :
            'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400'
          }`}>
            <motion.span
              animate={{
                textShadow: isHovered ?
                  "0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)" :
                  "0 0 10px rgba(0, 255, 255, 0.3)"
              }}
            >
              {isGlitching ? `[${project.title.toUpperCase()}]` : project.title}
            </motion.span>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow relative z-10">
          <motion.div
            className={`font-mono leading-relaxed transition-all duration-300 ${
              isGlitching ? 'text-red-300' :
              dataCorruption ? 'text-yellow-200' :
              'text-cyan-100'
            }`}
            animate={{
              x: isGlitching ? [0, -2, 2, -1, 1, 0] : 0,
              textShadow: isHovered ? "0 0 10px rgba(0, 255, 255, 0.5)" : "none"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-start space-x-2">
              <span className={`font-bold ${isGlitching ? 'text-red-400' : 'text-cyan-400'}`}>
                {isGlitching ? '>' : dataCorruption ? '?' : '>'}
              </span>
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
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                className={`px-3 py-1 text-xs font-mono rounded-full border transition-all duration-300 ${
                  isGlitching ? 'bg-red-500/20 border-red-500 text-red-300' :
                  dataCorruption ? 'bg-yellow-500/20 border-yellow-500 text-yellow-300' :
                  'bg-gradient-to-r from-cyan-400/20 to-blue-500/20 border-cyan-400/60 text-cyan-300 hover:border-cyan-300'
                }`}
                style={{
                  textShadow: `0 0 8px ${isGlitching ? '#ef4444' : '#00ffff'}`,
                  boxShadow: isHovered ? `0 0 10px ${isGlitching ? '#ef4444' : '#00ffff'}40` : 'none'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: tagIndex * 0.1 }}
              >
                {isGlitching && Math.random() < 0.3 ?
                  tag.split('').map(char => String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 3 - 1))).join('') :
                  tag
                }
              </motion.span>
            ))}
          </div>

          <div className="flex space-x-4 w-full pt-2">
            {project.githubLink && project.githubLink.toLowerCase() !== 'none' && (
              <Link href={project.githubLink} target="_blank"
                    className="group flex items-center space-x-2 text-cyan-400 hover:text-white transition-all duration-300">
                <motion.div
                  className={`p-2 border rounded-lg backdrop-blur-sm transition-all duration-300 ${
                    isGlitching ? 'border-red-400/70 bg-red-400/10' :
                    'border-cyan-400/60 group-hover:border-cyan-400 group-hover:bg-cyan-400/10 group-hover:shadow-lg group-hover:shadow-cyan-400/20'
                  }`}
                  whileHover={{ scale: 1.1, rotateZ: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-5 w-5" />
                </motion.div>
                <span className={`font-mono text-sm transition-all duration-300 ${
                  isHovered ? 'text-shadow-glow tracking-wider' : ''
                }`}>
                  {isGlitching ? '[SRC_CODE]' : 'SOURCE_CODE'}
                </span>
              </Link>
            )}

            {project.liveLink && project.liveLink.toLowerCase() !== 'none' && (
              <Link href={project.liveLink} target="_blank">
                <motion.button
                  className={`group flex items-center space-x-2 transition-all duration-300 ${
                    isGlitching ? 'text-red-400 hover:text-white' : 'text-purple-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`p-2 border rounded-lg backdrop-blur-sm transition-all duration-300 ${
                    isGlitching ? 'border-red-400/70 bg-red-400/10' :
                    'border-purple-400/60 group-hover:border-purple-400 group-hover:bg-purple-400/10 group-hover:shadow-lg group-hover:shadow-purple-400/20'
                  }`}>
                    <Eye className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-sm">
                    {isGlitching ? '[VIEW]' : 'PREVIEW'}
                  </span>
                </motion.button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};


// --- Enhanced Data Stream Background ---
const QuantumDataStreamBackground = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [streams, setStreams] = useState<DataStream[]>([]);
  const [glitchLines, setGlitchLines] = useState<GlitchLine[]>([]);
  const [nodes, setNodes] = useState<{ id: number; left: string; top: string; }[]>([]);

  useEffect(() => {
    setHasMounted(true);

    const newStreams = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      width: `${200 + Math.random() * 400}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      rotate: `${Math.random() * 360}deg`,
      opacity: 0.3 + Math.random() * 0.4,
      color: i % 4 === 0 ? '#00FFFF' : i % 4 === 1 ? '#0066FF' : i % 4 === 2 ? '#9933FF' : '#FF6600'
    }));
    setStreams(newStreams);

    const newGlitchLines = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      height: `${2 + Math.random() * 3}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${50 + Math.random() * 200}px`,
      delay: Math.random() * 5
    }));
    setGlitchLines(newGlitchLines);
    
    const newNodes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }));
    setNodes(newNodes);

  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Main data streams */}
      {streams.map((stream) => (
        <motion.div
          key={stream.id}
          className="absolute h-0.5 opacity-60"
          style={{
            width: stream.width,
            left: stream.left,
            top: stream.top,
            rotate: stream.rotate,
            background: `linear-gradient(to right, transparent, ${stream.color}${Math.floor(stream.opacity * 255).toString(16)}, transparent)`,
            boxShadow: `0 0 4px ${stream.color}`
          }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, stream.opacity, 0]
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: stream.id * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Glitch lines */}
      {glitchLines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute bg-red-400/40"
          style={{
            height: line.height,
            left: line.left,
            top: line.top,
            width: line.width
          }}
          animate={{
            opacity: [0, 0.8, 0],
            x: [0, 10, -10, 0]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 8 + Math.random() * 5,
            delay: line.delay
          }}
        />
      ))}

      {/* Floating data nodes */}
      {nodes.map((node) => (
        <motion.div
          key={`node-${node.id}`}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: node.left,
            top: node.top,
            boxShadow: '0 0 6px #00FFFF'
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: node.id * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// --- Main Page Component ---
const AllProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [systemStatus, setSystemStatus] = useState<'ONLINE' | 'SCANNING' | 'ERROR'>('SCANNING');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    const unsubscribe = onSnapshot(projectsCollectionRef, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
      setSystemStatus('ONLINE');
    }, (error) => {
      console.error("Error fetching projects: ", error);
      setSystemStatus('ERROR');
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(p => p.tags.forEach(tag => tagsSet.add(tag.trim())));
    return ["All", ...Array.from(tagsSet)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (selectedTag === "All") {
      return projects;
    }
    return projects.filter(p => p.tags.map(t => t.trim()).includes(selectedTag));
  }, [projects, selectedTag]);

  const handleReadMoreClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden bg-gradient-to-b from-black via-slate-900 to-black">
      <QuantumDataStreamBackground />

      <motion.div
        className="absolute top-8 left-8 z-20"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href="/">
          <Button variant="ghost"
                  className="font-mono text-cyan-300 hover:bg-cyan-400/20 hover:text-white hover:shadow-lg hover:shadow-cyan-400/20 border border-cyan-400/30 backdrop-blur-sm">
            <Home className="mr-2 h-4 w-4" />
            [RETURN_HOME]
          </Button>
        </Link>
      </motion.div>

      <motion.div
        className="absolute top-8 right-8 z-20 flex items-center space-x-2 font-mono text-sm"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Activity className={`h-4 w-4 ${
          systemStatus === 'ONLINE' ? 'text-green-400' :
          systemStatus === 'SCANNING' ? 'text-yellow-400' : 'text-red-400'
        }`} />
        <span className={`${
          systemStatus === 'ONLINE' ? 'text-green-400' :
          systemStatus === 'SCANNING' ? 'text-yellow-400' : 'text-red-400'
        }`}>
          SYSTEM_STATUS: {systemStatus}
        </span>
      </motion.div>

      <motion.h1
        className="relative mb-4 text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 z-10 text-center"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          textShadow: "0 0 30px rgba(0, 255, 255, 0.3)"
        }}
      >
        <span className="font-mono">[PROJECT_ARCHIVE]</span>
      </motion.h1>

      <motion.p
        className="text-cyan-300/80 font-mono text-center mb-8 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        &gt; ACCESSING QUANTUM DATABASE...
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12 z-10 max-w-5xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        {allTags.map((tag, index) => (
          <Button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            variant={selectedTag === tag ? "default" : "outline"}
            className={`font-mono transition-all duration-300 transform hover:scale-105 ${
              selectedTag === tag
              ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-cyan-400 shadow-lg shadow-cyan-400/50 hover:shadow-xl'
              : 'text-cyan-300 border-cyan-400/50 hover:bg-cyan-400/20 hover:text-white hover:border-cyan-400 backdrop-blur-sm'
            }`}
            style={{
              textShadow: selectedTag === tag ? 'none' : '0 0 8px rgba(0, 255, 255, 0.3)'
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
            >
              [{tag}]
            </motion.span>
          </Button>
        ))}
      </motion.div>

      {loading ? (
        <QuantumBlackholeLoader />
      ) : (
        <motion.div
          layout
          className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <HolographicLabCard
                key={project.id}
                project={project}
                index={index}
                onReadMoreClick={handleReadMoreClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProjectsPage;