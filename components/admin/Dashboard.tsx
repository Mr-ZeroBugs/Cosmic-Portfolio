"use client";

import { useState, useEffect } from "react";
import { auth, db, storage } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc, writeBatch } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Loader2, Trash2, Orbit, Zap, Database, Settings, Star, Pencil, ArrowUp, ArrowDown, LogOut, Cpu, Activity, Wifi, HardDrive } from "lucide-react";
import Image from "next/image";

// --- Type Definitions (เพิ่ม position) ---
interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
  imageUrl: string;
  liveLink?: string;
  featured?: boolean;
  position?: number; // ทำให้ position เป็น optional เพื่อป้องกันโค้ดพังหากข้อมูลเก่าไม่มี field นี้
}

interface SystemStats {
  cpuUsage: number;
  quantumUsage: number;
  memoryUsage: number;
  networkActivity: number;
  powerLevel: number;
}

// --- Component: Featured Projects Settings ---
const FeaturedProjectsSettings = ({ isOpen, onClose, projects }: { isOpen: boolean; onClose: () => void; projects: Project[] }) => {
    const handleToggleFeatured = async (projectId: string, currentStatus: boolean) => {
        const projectDocRef = doc(db, "projects", projectId);
        try {
            await updateDoc(projectDocRef, { featured: !currentStatus });
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
                        Select which projects to display on the main page.
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
                        <p className="font-mono text-slate-500 text-center py-4">No projects available.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

// --- Component: Edit Project Dialog ---
const EditProjectDialog = ({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void; }) => {
    const [title, setTitle] = useState(project.title);
    const [description, setDescription] = useState(project.description);
    const [tags, setTags] = useState(project.tags.join(", "));
    const [githubLink, setGithubLink] = useState(project.githubLink);
    const [liveLink, setLiveLink] = useState(project.liveLink || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            let imageUrl = project.imageUrl;
            if (imageFile) {
                const newImageRef = ref(storage, `projects/${Date.now()}_${imageFile.name}`);
                const snapshot = await uploadBytes(newImageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
                
                try {
                  const oldImageRef = ref(storage, project.imageUrl);
                  await deleteObject(oldImageRef);
                } catch (error) {
                   console.warn("Could not delete old image, it might not exist or there was an error:", error)
                }
            }

            const projectDocRef = doc(db, "projects", project.id);
            await updateDoc(projectDocRef, {
                title,
                description,
                tags: tags.split(",").map(tag => tag.trim()),
                githubLink,
                liveLink,
                imageUrl,
            });
            onClose();
        } catch (error) {
            console.error("Error updating project: ", error);
            alert("Failed to update project.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900/90 border-cyan-500/30 text-white backdrop-blur-md max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="font-mono text-xl text-cyan-300 flex items-center">
                        <Pencil className="mr-2 h-5 w-5" /> Edit Project: {project.title}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleUpdate} className="space-y-4 pt-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-blue-300 text-sm font-mono">Project Codename</label><Input className="bg-slate-800/50 border-blue-500/30" value={title} onChange={(e) => setTitle(e.target.value)} /></div>
                        <div><label className="text-cyan-300 text-sm font-mono">Classification Tags</label><Input className="bg-slate-800/50 border-cyan-500/30" value={tags} onChange={(e) => setTags(e.target.value)} /></div>
                    </div>
                    <div><label className="text-sky-300 text-sm font-mono">Mission Description</label><Textarea className="bg-slate-800/50 border-sky-500/30 min-h-[100px]" value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label className="text-indigo-300 text-sm font-mono">Repository Link</label><Input className="bg-slate-800/50 border-indigo-500/30" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} /></div>
                        <div><label className="text-blue-300 text-sm font-mono">Live Demo Link</label><Input className="bg-slate-800/50 border-blue-500/30" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} /></div>
                    </div>
                    <div>
                        <label className="text-cyan-300 text-sm font-mono">Update Visual Data</label>
                        <Input className="bg-slate-800/50 border-cyan-500/30 text-white file:text-cyan-300 file:bg-slate-700" type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} accept="image/*" />
                        <p className="text-xs text-slate-500 mt-1">Current image will be used if no new file is uploaded.</p>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isUpdating} className="bg-cyan-600 hover:bg-cyan-700">
                            {isUpdating ? <><Loader2 className="animate-spin w-4 h-4 mr-2" /> Saving...</> : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [systemStats, setSystemStats] = useState<SystemStats>({ cpuUsage: 0, quantumUsage: 0, memoryUsage: 0, networkActivity: 0, powerLevel: 0 });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // ✅ FIX: ดึงข้อมูลแบบเดิม แล้วค่อยมาเรียงลำดับในฝั่ง Client
  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    const unsubscribe = onSnapshot(projectsCollectionRef, (snapshot) => {
      const projectsData = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        position: doc.data().position ?? index, // ถ้าไม่มี position ให้ใช้ index ชั่วคราว
      })) as Project[];
      
      // เรียงลำดับด้วย JavaScript หลังจากดึงข้อมูลมาแล้ว
      projectsData.sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
      
      setProjects(projectsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpuUsage: Math.floor(Math.random() * 40) + 35,
        quantumUsage: Math.floor(Math.random() * 30) + 60,
        memoryUsage: Math.floor(Math.random() * 25) + 50,
        networkActivity: Math.floor(Math.random() * 100),
        powerLevel: Math.floor(Math.random() * 15) + 85,
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
      await addDoc(collection(db, "projects"), {
        title,
        description,
        tags: tags.split(",").map(tag => tag.trim()),
        githubLink,
        liveLink,
        imageUrl,
        featured: false,
        position: projects.length, // โปรเจกต์ใหม่จะมี position เป็นลำดับสุดท้ายเสมอ
      });
      setTitle(""); setDescription(""); setTags(""); setGithubLink(""); setLiveLink(""); setImageFile(null);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error adding project: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteDoc(doc(db, "projects", projectId));
        // หมายเหตุ: ควรเขียน logic สำหรับอัปเดต position ของโปรเจกต์ที่เหลือด้วย
      } catch (error) {
        console.error("Error deleting project: ", error);
      }
    }
  };
  
  const handleMove = async (currentIndex: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    // สลับตำแหน่งใน Array ของ State ก่อน
    const reorderedProjects = [...projects];
    const [movedProject] = reorderedProjects.splice(currentIndex, 1);
    reorderedProjects.splice(targetIndex, 0, movedProject);
    
    // อัปเดต position ของทุกโปรเจกต์ใน Firebase ทีเดียว
    const batch = writeBatch(db);
    reorderedProjects.forEach((project, index) => {
        const docRef = doc(db, "projects", project.id);
        batch.update(docRef, { position: index });
    });
    
    try {
      await batch.commit();
    } catch (error) {
      console.error("Error reordering projects: ", error);
      alert("Failed to reorder projects.");
    }
  };

  const getUsageColor = (percentage: number) => {
    if (percentage < 60) return "text-sky-400";
    if (percentage < 80) return "text-cyan-400";
    return "text-indigo-400";
  };
  const getUsageBarColor = (percentage: number) => {
    if (percentage < 60) return "from-sky-600 to-sky-400";
    if (percentage < 80) return "from-cyan-600 to-cyan-400";
    return "from-indigo-600 to-indigo-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(59,130,246,0.08)_100%)]"></div>
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.1) 1px, transparent 1px)`, backgroundSize: '35px 35px', animation: 'grid-float 25s linear infinite' }}></div>
        <div className="absolute inset-0">{[...Array(20)].map((_, i) => (<div key={i} className={`absolute w-1 h-1 rounded-full animate-pulse ${ i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-sky-400' : 'bg-cyan-400' }`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 4}s`, animationDuration: `${3 + Math.random() * 4}s`, boxShadow: `0 0 ${2 + Math.random() * 4}px currentColor` }}></div>))}</div>
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <FeaturedProjectsSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} projects={projects} />
        {editingProject && <EditProjectDialog isOpen={!!editingProject} onClose={() => setEditingProject(null)} project={editingProject} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 p-6 rounded-xl bg-gradient-to-r from-slate-900/90 via-blue-900/40 to-slate-900/90 border-2 border-blue-500/30 backdrop-blur-sm shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 animate-pulse shadow-blue-500/50 shadow-lg"><Orbit className="w-8 h-8" /></div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">AZURE CONTROL CENTER</h1>
                            <p className="text-blue-300/70 text-sm font-mono">Deep Blue Research Station • Sector X-42</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button onClick={() => setIsSettingsOpen(true)} className="bg-gradient-to-r from-cyan-700 to-sky-700 hover:from-cyan-800 hover:to-sky-800 border border-cyan-500/50">
                            <Settings className="w-4 h-4 mr-2" /> MANAGE FEATURED
                        </Button>
                        <Button onClick={handleLogout} className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 border border-blue-500/50">
                            <LogOut className="w-4 h-4 mr-2" /> DISCONNECT
                        </Button>
                    </div>
                </div>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900/90 via-blue-900/30 to-slate-900/90 border-2 border-cyan-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4"><Activity className="w-5 h-5 text-cyan-400" /><h3 className="text-lg font-bold text-cyan-300 font-mono">SYSTEM STATUS</h3></div>
                <div className="space-y-3">
                    <div className="space-y-1"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Cpu className="w-3 h-3 text-blue-400" /><span className="text-xs font-mono text-blue-300">CPU</span></div><span className={`text-xs font-mono ${getUsageColor(systemStats.cpuUsage)}`}>{systemStats.cpuUsage}%</span></div><div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.cpuUsage)} h-1.5 rounded-full`} style={{ width: `${systemStats.cpuUsage}%` }}></div></div></div>
                    <div className="space-y-1"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Zap className="w-3 h-3 text-cyan-400" /><span className="text-xs font-mono text-cyan-300">QUANTUM</span></div><span className={`text-xs font-mono ${getUsageColor(systemStats.quantumUsage)}`}>{systemStats.quantumUsage}%</span></div><div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.quantumUsage)} h-1.5 rounded-full`} style={{ width: `${systemStats.quantumUsage}%` }}></div></div></div>
                    <div className="space-y-1"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><HardDrive className="w-3 h-3 text-sky-400" /><span className="text-xs font-mono text-sky-300">MEMORY</span></div><span className={`text-xs font-mono ${getUsageColor(systemStats.memoryUsage)}`}>{systemStats.memoryUsage}%</span></div><div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.memoryUsage)} h-1.5 rounded-full`} style={{ width: `${systemStats.memoryUsage}%` }}></div></div></div>
                    <div className="space-y-1"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Wifi className="w-3 h-3 text-indigo-400" /><span className="text-xs font-mono text-indigo-300">NETWORK</span></div><span className={`text-xs font-mono ${getUsageColor(systemStats.networkActivity)}`}>{systemStats.networkActivity}%</span></div><div className="w-full bg-slate-800 rounded-full h-1.5"><div className={`bg-gradient-to-r ${getUsageBarColor(systemStats.networkActivity)} h-1.5 rounded-full`} style={{ width: `${systemStats.networkActivity}%` }}></div></div></div>
                </div>
            </div>
        </div>

        <Card className="mb-8 bg-gradient-to-br from-slate-900/90 via-blue-900/20 to-slate-900/90 border-2 border-blue-500/30 backdrop-blur-sm">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold"><div className="p-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600"><Zap className="w-6 h-6" /></div><span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">INITIALIZE NEW PROJECT</span></CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Project Codename..." value={title} onChange={(e) => setTitle(e.target.value)} required />
                        <Input placeholder="Classification Tags (comma, separated)..." value={tags} onChange={(e) => setTags(e.target.value)} required />
                    </div>
                    <Textarea placeholder="Mission Description..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input placeholder="Repository Link..." value={githubLink} onChange={(e) => setGithubLink(e.target.value)} required />
                        <Input placeholder="Live Demo Link..." value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
                    </div>
                    <Input type="file" onChange={(e) => e.target.files && setImageFile(e.target.files[0])} required accept="image/*" />
                    <Button type="submit" disabled={isSubmitting} className="w-full py-3">
                        {isSubmitting ? <><Loader2 className="animate-spin mr-2" /> INITIALIZING...</> : <><Database className="mr-2" /> DEPLOY PROJECT</>}
                    </Button>
                </form>
            </CardContent>
        </Card>
        
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-900/80 to-blue-900/50 border-2 border-blue-500/30">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-600 to-sky-600"><Database className="w-6 h-6" /></div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent font-mono">PROJECT DATABASE</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent"></div>
            <div className="text-blue-300 text-sm font-mono bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/30">{projects.length} ENTRIES</div>
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin w-8 h-8 text-blue-400" /></div>
          ) : (
            <div className="grid gap-4">
              {projects.map((project, index) => (
                <Card key={project.id} className="group bg-gradient-to-r from-slate-900/90 via-blue-900/15 to-slate-900/90 border border-blue-500/30 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Image src={project.imageUrl} alt={project.title} width={120} height={68} className="hidden sm:block rounded-lg object-cover border-2 border-blue-400/30" />
                        <div className="space-y-2 flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white truncate flex items-center gap-2">{project.title} {project.featured && <Star className="w-4 h-4 text-yellow-400" />}</h3>
                          <p className="text-slate-400 font-mono text-sm">
                              {project.description.length > 100 
                                ? `${project.description.substring(0, 100)}...` 
                                : project.description}
                            </p>
                          <div className="flex items-center gap-2 flex-wrap">{project.tags.map(tag => <span key={tag} className="px-2 py-1 text-xs font-mono bg-blue-600/30 border border-blue-400/30 rounded-md text-blue-300">{tag}</span>)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-1.5">
                            <Button size="icon" className="w-8 h-8" onClick={() => handleMove(index, 'up')} disabled={index === 0}> <ArrowUp className="h-4 w-4" /> </Button>
                            <Button size="icon" className="w-8 h-8" onClick={() => handleMove(index, 'down')} disabled={index === projects.length - 1}> <ArrowDown className="h-4 w-4" /> </Button>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <Button size="icon" variant="outline" className="w-8 h-8" onClick={() => setEditingProject(project)}> <Pencil className="h-4 w-4" /> </Button>
                            <Button size="icon" variant="destructive" className="w-8 h-8" onClick={() => handleDelete(project.id)}> <Trash2 className="h-4 w-4" /> </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <style jsx global>{` @keyframes grid-float { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } } `}</style>
    </div>
  );
};

export default Dashboard;