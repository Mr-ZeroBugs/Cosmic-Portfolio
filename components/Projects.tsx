"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Eye, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Type Definition ---
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

// --- Sub Components ---
const QuantumLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px] relative">
      <div className="relative">
        <motion.div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600" animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        {[...Array(3)].map((_, i) => (
          <motion.div key={i} className="absolute w-3 h-3 bg-cyan-400 rounded-full" style={{ top: "50%", left: "50%", marginTop: "-6px", marginLeft: "-6px" }} animate={{ x: [0, 40 * Math.cos((i * 120) * Math.PI / 180)], y: [0, 40 * Math.sin((i * 120) * Math.PI / 180)], rotate: [0, 360] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3, ease: "linear" }} />
        ))}
      </div>
      <motion.p className="absolute bottom-0 text-cyan-400 font-mono" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>
        Scanning quantum database...
      </motion.p>
    </div>
  );
};

const HolographicProjectCard = ({ project, index }: { project: Project; index: number; }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [cardParticles, setCardParticles] = useState<CardParticle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({ id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50, duration: 3 + Math.random() * 2, delay: Math.random() * 2 }));
    setCardParticles(newParticles);
    const glitchInterval = setInterval(() => { if (Math.random() < 0.05) { setIsGlitching(true); setTimeout(() => setIsGlitching(false), 300); } }, 3000);
    return () => clearInterval(glitchInterval);
  }, []);

  const cardVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -45, scale: 0.8 },
    visible: { y: 0, opacity: 1, rotateX: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15, delay: index * 0.15 } },
  } as const;

  return (
    <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)} whileHover={{ y: -10, scale: 1.02, rotateX: 5 }} className="perspective-1000">
      <Card className={`relative flex h-full flex-col overflow-hidden border-2 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-500 group ${isGlitching ? 'border-red-500 animate-pulse' : isHovered ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20' : 'border-cyan-400/30'}`}>
        <motion.div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none z-10" animate={{ y: ["-100%", "100%"] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }} />
        <div className={`absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 transition-colors duration-300 z-20 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
        <div className={`absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 transition-colors duration-300 z-20 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
        <div className={`absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 transition-colors duration-300 z-20 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
        <div className={`absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 transition-colors duration-300 z-20 ${isGlitching ? 'border-red-500' : 'border-cyan-400'}`} />
        <CardHeader className="relative z-10">
          <div className="aspect-video w-full overflow-hidden rounded-lg border border-cyan-400/30 relative group">
            <Image src={project.imageUrl} alt={project.title} width={400} height={225} className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <CardTitle className={`pt-4 text-2xl font-mono transition-all duration-300 ${isGlitching ? 'text-red-400 animate-pulse' : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400'}`}>
            <motion.span animate={{ textShadow: isHovered ? "0 0 20px rgba(0, 255, 255, 0.8)" : "0 0 10px rgba(0, 255, 255, 0.3)" }}>{project.title}</motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow relative z-10"><motion.p className={`font-mono leading-relaxed transition-colors duration-300 ${isGlitching ? 'text-red-300' : 'text-cyan-100'}`} animate={{ x: isGlitching ? [0, -1, 1, 0] : 0 }}><span className="text-cyan-400 font-bold">&gt;</span> {project.description}</motion.p></CardContent>
        <CardFooter className="flex flex-col items-start space-y-4 relative z-10">
          <div className="flex flex-wrap gap-2">{project.tags.map((tag) => (<motion.span key={tag} className={`px-3 py-1 text-xs font-mono rounded-full border transition-all duration-300 ${isGlitching ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-cyan-400/20 border-cyan-400/50 text-cyan-300'}`} style={{ textShadow: `0 0 10px ${isGlitching ? '#ef4444' : '#00ffff'}` }}>{tag}</motion.span>))}</div>
          <div className="flex space-x-4 w-full">
            {project.githubLink && project.githubLink.toLowerCase() !== 'none' && (<Link href={project.githubLink} target="_blank" className="group flex items-center space-x-2 text-cyan-400 hover:text-white transition-all duration-300"><motion.div className="p-2 border border-cyan-400/50 rounded-lg backdrop-blur-sm group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-300"><Github className="h-5 w-5" /></motion.div><span className="font-mono text-sm group-hover:text-shadow-glow">SOURCE CODE</span></Link>)}
            {project.liveLink && project.liveLink.toLowerCase() !== 'none' && (<Link href={project.liveLink} target="_blank"><motion.button className="group flex items-center space-x-2 text-purple-400 hover:text-white transition-all duration-300"><div className="p-2 border border-purple-400/50 rounded-lg backdrop-blur-sm group-hover:border-purple-400 group-hover:bg-purple-400/10 transition-all duration-300"><Eye className="h-5 w-5" /></div><span className="font-mono text-sm">PREVIEW</span></motion.button></Link>)}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const DataStreamBackground = () => {
  const [streams, setStreams] = useState<DataStream[]>([]);

  useEffect(() => {
    const newStreams = Array.from({ length: 12 }, (_, i) => ({ id: i, width: `${200 + Math.random() * 200}px`, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, rotate: `${Math.random() * 360}deg` }));
    setStreams(newStreams);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">{streams.map((stream) => (<motion.div key={stream.id} className="absolute h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" style={{ width: stream.width, left: stream.left, top: stream.top, rotate: stream.rotate }} animate={{ scaleX: [0, 1, 0], opacity: [0, 0.8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: stream.id * 0.5, ease: "easeInOut" }} />))}</div>
  );
};

// --- Main Projects Component ---
const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // --- UPDATE: แก้ไข Query ให้ดึงเฉพาะโปรเจกต์เด่น (featured) ---
    const projectsCollectionRef = collection(db, "projects");
    const q = query(
      projectsCollectionRef, 
      where("featured", "==", true)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div id="projects" className="relative flex min-h-screen w-full flex-col items-center justify-center py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      <DataStreamBackground />
      <motion.h2 className="relative mb-16 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 z-10 text-center" initial={{ y: -100, opacity: 0, scale: 0.5 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} transition={{ duration: 1, type: "spring", stiffness: 100 }} style={{ textShadow: "0 0 40px rgba(0, 255, 255, 0.6)" }}>
        <span className="relative font-mono">FEATURED PROJECTS</span>
      </motion.h2>

      {loading ? (
        <QuantumLoader />
      ) : (
        <motion.div className="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {projects.map((project, index) => (
            <HolographicProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      )}

      {!loading && (
        <motion.div className="mt-16 text-center z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Link href="/projects">
            <Button size="lg" className="font-mono text-lg bg-cyan-400/10 border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 hover:text-white hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 group">
              View Full Archive
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      )}

      <motion.div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" animate={{ scaleX: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }} />
      <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cyan-400/50" />
      <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-cyan-400/50" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-cyan-400/50" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cyan-400/50" />
    </div>
  );
};

export default Projects;