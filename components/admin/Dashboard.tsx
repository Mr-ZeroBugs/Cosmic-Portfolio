"use client";

import { useState, useEffect } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore"; // เพิ่ม updateDoc
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"; // เพิ่ม Dialog
import { Switch } from "@/components/ui/switch"; // เพิ่ม Switch
import { Loader2, Trash2, Orbit, Zap, Database, Settings, User, LogOut, Cpu, Activity, Wifi, HardDrive, Star } from "lucide-react"; // เพิ่ม Settings, Star
import Image from "next/image";

// --- Type Definitions (เพิ่ม featured) ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  imageUrl: string;
  liveLink?: string;
  featured?: boolean; // เพิ่ม field นี้
}

interface SystemStats {
  cpuUsage: number;
  quantumUsage: number;
  memoryUsage: number;
  networkActivity: number;
  powerLevel: number;
}

// --- UPDATE: สร้าง Component ใหม่สำหรับหน้าต่างตั้งค่า ---
const FeaturedProjectsSettings = ({ isOpen, onClose, projects }: { isOpen: boolean; onClose: () => void; projects: Project[] }) => {
  const handleToggleFeatured = async (projectId: string, currentStatus: boolean) => {
    const projectDocRef = doc(db, "projects", projectId);
    try {
      // อัปเดตเฉพาะ field 'featured'
      await updateDoc(projectDocRef, {
        featured: !currentStatus,
      });
    } catch (error) {
      console.error("Error updating featured status: ", error);
      alert("Failed to update status.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/90 border-blue-500/30 text-white backdrop-blur-md max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl text-blue-300 flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Manage Featured Projects
          </DialogTitle>
          <DialogDescription className="font-mono text-slate-400">
            Select which projects to display on the main page. Changes are saved automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-2 pr-4">
          {projects.length > 0 ? (
            projects.map(project => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-md hover:bg-blue-900/30 transition-colors">
                <span className="font-mono text-slate-300">{project.title}</span>
                <Switch
                  checked={project.featured || false}
                  onCheckedChange={() => handleToggleFeatured(project.id, project.featured || false)}
                />
              </div>
            ))
          ) : (
            <p className="font-mono text-slate-500 text-center py-4">No projects available to feature.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};


const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStats, setSystemStats] = useState<SystemStats>({
    cpuUsage: 0,
    quantumUsage: 0,
    memoryUsage: 0,
    networkActivity: 0,
    powerLevel: 0
  });
  
  // State สำหรับฟอร์ม
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false); // State สำหรับเปิด/ปิดหน้าต่างตั้งค่า

  // Fetch ข้อมูลโปรเจกต์แบบ Real-time
  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    const unsubscribe = onSnapshot(projectsCollectionRef, (snapshot) => {
      const projectsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fake system monitoring data
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpuUsage: Math.floor(Math.random() * 40) + 35, // 35-75%
        quantumUsage: Math.floor(Math.random() * 30) + 60, // 60-90%
        memoryUsage: Math.floor(Math.random() * 25) + 50, // 50-75%
        networkActivity: Math.floor(Math.random() * 100), // 0-100%
        powerLevel: Math.floor(Math.random() * 15) + 85, // 85-100%
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Please select an image file.");
      return;
    }
    setIsSubmitting(true);

    try {
      const imageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      const projectsCollectionRef = collection(db, "projects");
      await addDoc(projectsCollectionRef, {
        title,
        description,
        tags: tags.split(",").map(tag => tag.trim()),
        githubLink,
        liveLink,
        imageUrl,
        featured: false, // โปรเจกต์ใหม่จะไม่เป็น featured โดยอัตโนมัติ
      });

      // Reset ฟอร์ม
      setTitle("");
      setDescription("");
      setTags("");
      setGithubLink("");
      setLiveLink("");
      setImageFile(null);
      (e.target as HTMLFormElement).reset();

    } catch (error) {
      console.error("Error adding project: ", error);
      alert("Failed to add project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const projectDocRef = doc(db, "projects", projectId);
        await deleteDoc(projectDocRef);
      } catch (error) {
        console.error("Error deleting project: ", error);
        alert("Failed to delete project.");
      }
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 30) return "text-blue-400";
    if (percentage < 60) return "text-sky-400";
    if (percentage < 80) return "text-cyan-400";
    return "text-indigo-400";
  };

  const getUsageBarColor = (percentage: number) => {
    if (percentage < 30) return "from-blue-600 to-blue-400";
    if (percentage < 60) return "from-sky-600 to-sky-400";
    if (percentage < 80) return "from-cyan-600 to-cyan-400";
    return "from-indigo-600 to-indigo-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,130,246,0.08)_100%)]"></div>
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.1) 1px, transparent 1px)`,
               backgroundSize: '35px 35px',
               animation: 'grid-float 25s linear infinite'
             }}></div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full animate-pulse ${ i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-sky-400' : 'bg-cyan-400' }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                boxShadow: `0 0 ${2 + Math.random() * 4}px currentColor`
              }}
            ></div>
          ))}
        </div>
        <div className="absolute top-1/4 right-1/4 w-40 h-40 border-2 border-blue-500/20 rounded-full animate-spin" style={{animationDuration: '30s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 border border-cyan-500/15 rounded-full animate-spin" style={{animationDuration: '20s', animationDirection: 'reverse'}}></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 border border-indigo-500/10 rounded-full animate-spin" style={{animationDuration: '45s', transform: 'translate(-50%, -50%)'}}></div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        
        {/* UPDATE: เรียกใช้หน้าต่างตั้งค่า */}
        <FeaturedProjectsSettings 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          projects={projects} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 p-6 rounded-xl bg-gradient-to-r from-slate-900/90 via-blue-900/40 to-slate-900/90 border-2 border-blue-500/30 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse shadow-blue-500/50 shadow-lg">
                  <Orbit className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                    AZURE CONTROL CENTER
                  </h1>
                  <p className="text-blue-300/70 text-sm font-mono">Deep Blue Research Station • Sector X-42</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* UPDATE: เพิ่มปุ่ม Manage Featured */}
                <Button onClick={() => setIsSettingsOpen(true)} className="bg-gradient-to-r from-cyan-700 to-sky-700 hover:from-cyan-800 hover:to-sky-800 border border-cyan-500/50 transition-all duration-300 shadow-cyan-500/30 shadow-lg">
                  <Settings className="w-4 h-4 mr-2" />
                  MANAGE FEATURED
                </Button>

                <Button onClick={handleLogout} className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 border border-blue-500/50 transition-all duration-300 shadow-blue-500/30 shadow-lg">
                  <LogOut className="w-4 h-4 mr-2" />
                  DISCONNECT
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/90 via-blue-900/30 to-slate-900/90 border-2 border-cyan-500/30 backdrop-blur-sm shadow-[0_0_25px_rgba(6,182,212,0.15)]">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-cyan-300 font-mono">SYSTEM STATUS</h3>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Cpu className="w-3 h-3 text-blue-400" /><span className="text-xs font-mono text-blue-300">CPU</span></div>
                  <span className={`text-xs font-mono ${getUsageColor(systemStats.cpuUsage)}`}>{systemStats.cpuUsage}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.cpuUsage)} h-1.5 rounded-full transition-all duration-500 shadow-sm`} style={{ width: `${systemStats.cpuUsage}%` }}></div></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Zap className="w-3 h-3 text-cyan-400" /><span className="text-xs font-mono text-cyan-300">QUANTUM</span></div>
                  <span className={`text-xs font-mono ${getUsageColor(systemStats.quantumUsage)}`}>{systemStats.quantumUsage}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.quantumUsage)} h-1.5 rounded-full transition-all duration-500 shadow-cyan-400/30 shadow-sm`} style={{ width: `${systemStats.quantumUsage}%` }}></div></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><HardDrive className="w-3 h-3 text-sky-400" /><span className="text-xs font-mono text-sky-300">MEMORY</span></div>
                  <span className={`text-xs font-mono ${getUsageColor(systemStats.memoryUsage)}`}>{systemStats.memoryUsage}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.memoryUsage)} h-1.5 rounded-full transition-all duration-500 shadow-sm`} style={{ width: `${systemStats.memoryUsage}%` }}></div></div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Wifi className="w-3 h-3 text-indigo-400" /><span className="text-xs font-mono text-indigo-300">NETWORK</span></div>
                  <span className={`text-xs font-mono ${getUsageColor(systemStats.networkActivity)}`}>{systemStats.networkActivity}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.networkActivity)} h-1.5 rounded-full transition-all duration-500 shadow-sm`} style={{ width: `${systemStats.networkActivity}%` }}></div></div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-blue-400/50 shadow-sm"></div><span className="text-xs text-blue-300 font-mono">POWER: {systemStats.powerLevel}%</span></div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div><span className="text-xs text-green-300 font-mono">OPTIMAL</span></div>
              </div>
            </div>
          </div>
        </div>
        
        <Card className="mb-8 bg-gradient-to-br from-slate-900/90 via-blue-900/20 to-slate-900/90 border-2 border-blue-500/30 backdrop-blur-sm shadow-[0_0_35px_rgba(59,130,246,0.25)]">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-2xl font-bold"><div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 shadow-blue-500/50 shadow-lg"><Zap className="w-6 h-6" /></div><span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">INITIALIZE NEW PROJECT</span></CardTitle>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-2"></div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-blue-300 text-sm font-mono uppercase tracking-wide">Project Codename</label><Input className="bg-slate-800/50 border-2 border-blue-500/30 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/50 font-mono transition-all duration-300 shadow-inner" placeholder="Enter project codename..." value={title} onChange={(e) => setTitle(e.target.value)} required /></div>
                <div className="space-y-2"><label className="text-cyan-300 text-sm font-mono uppercase tracking-wide">Classification Tags</label><Input className="bg-slate-800/50 border-2 border-cyan-500/30 text-white placeholder:text-slate-500 focus:border-cyan-400 focus:ring-cyan-400/50 font-mono transition-all duration-300 shadow-inner" placeholder="quantum, ai, experimental..." value={tags} onChange={(e) => setTags(e.target.value)} required /></div>
              </div>
              <div className="space-y-2"><label className="text-sky-300 text-sm font-mono uppercase tracking-wide">Mission Description</label><Textarea className="bg-slate-800/50 border-2 border-sky-500/30 text-white placeholder:text-slate-500 focus:border-sky-400 focus:ring-sky-400/50 font-mono min-h-[100px] transition-all duration-300 shadow-inner" placeholder="Describe the quantum research parameters and expected outcomes..." value={description} onChange={(e) => setDescription(e.target.value)} required /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-indigo-300 text-sm font-mono uppercase tracking-wide">Repository Link</label><Input className="bg-slate-800/50 border-2 border-indigo-500/30 text-white placeholder:text-slate-500 focus:border-indigo-400 focus:ring-indigo-400/50 font-mono transition-all duration-300 shadow-inner" placeholder="https://github.com/lab/project or 'none'" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} required /></div>
                <div className="space-y-2"><label className="text-blue-300 text-sm font-mono uppercase tracking-wide">Live Demo Link</label><Input className="bg-slate-800/50 border-2 border-blue-500/30 text-white placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/50 font-mono transition-all duration-300 shadow-inner" placeholder="https://demo.azure-lab.space or 'none'" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} required /></div>
              </div>
              <div className="space-y-2"><label className="text-cyan-300 text-sm font-mono uppercase tracking-wide">Visual Data Upload</label><Input className="bg-slate-800/50 border-2 border-cyan-500/30 text-white file:text-cyan-300 file:bg-slate-700 file:border-cyan-500/50 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 hover:file:bg-slate-600 transition-all duration-300 shadow-inner" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} required accept="image/*" /></div>
              <Button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gradient-to-r from-blue-600 via-sky-600 to-cyan-600 hover:from-blue-700 hover:via-sky-700 hover:to-cyan-700 border border-blue-400/50 text-white font-bold text-lg transition-all duration-300 shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]">
                {isSubmitting ? ( <div className="flex items-center gap-3"><Loader2 className="animate-spin w-5 h-5" /> <span className="font-mono">INITIALIZING...</span></div> ) : ( <div className="flex items-center gap-3"><Database className="w-5 h-5" /> <span className="font-mono">DEPLOY PROJECT</span></div> )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-900/80 to-blue-900/50 border-2 border-blue-500/30 shadow-blue-500/20 shadow-lg">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-sky-600 shadow-blue-500/50 shadow-lg"><Database className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent font-mono">PROJECT DATABASE</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            <div className="text-blue-300 text-sm font-mono bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30">{projects.length} ENTRIES</div>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12"><div className="flex items-center gap-4 text-blue-400"><Loader2 className="animate-spin w-8 h-8" /> <span className="text-xl font-mono">ACCESSING DATABASE...</span></div></div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project, index) => (
                <Card key={project.id} className="group bg-gradient-to-r from-slate-900/90 via-blue-900/15 to-slate-900/90 border border-blue-500/30 hover:border-blue-400/60 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.25)]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg opacity-40 blur-sm group-hover:opacity-60 transition-opacity"></div>
                          <Image src={project.imageUrl} alt={project.title} width={120} height={68} className="relative rounded-lg object-cover border-2 border-blue-400/30 shadow-lg shadow-blue-500/20" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-blue-300 text-sm font-mono bg-blue-900/30 px-2 py-1 rounded border border-blue-500/30">#{String(index + 1).padStart(3, '0')}</span>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{project.title}</h3>
                            {/* UPDATE: เพิ่มไอคอนดาวสำหรับโปรเจกต์เด่น */}
                            {project.featured && <Star className="w-4 h-4 text-yellow-400" />}
                          </div>
                          <p className="text-slate-400 max-w-md font-mono text-sm">{project.description.substring(0, 80)}...</p>
                          <div className="flex items-center gap-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (<span key={tagIndex} className="px-2 py-1 text-xs font-mono bg-gradient-to-r from-blue-600/30 to-sky-600/30 border border-blue-400/30 rounded-md text-blue-300">{tag}</span>))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right text-sm font-mono text-slate-400">
                          <div>STATUS: <span className="text-blue-400">ACTIVE</span></div>
                          <div>CLEARANCE: <span className="text-cyan-400">LEVEL-7</span></div>
                        </div>
                        <Button variant="destructive" size="icon" onClick={() => handleDelete(project.id)} className="bg-red-900/50 hover:bg-red-800 border border-red-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx global>{` @keyframes grid-float { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 33% { transform: translate(8px, 3px) rotate(0.5deg); } 66% { transform: translate(-5px, 8px) rotate(-0.3deg); } } `}</style>
    </div>
  );
};

export default Dashboard;