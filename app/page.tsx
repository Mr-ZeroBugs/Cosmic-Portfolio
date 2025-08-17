import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact"; // Import Contact component
import TechStacksPage from "@/components/TechStack";
import PhilosophyPage from "@/components/Philosophy";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <TechStacksPage/>
      <Projects />
      <PhilosophyPage/>
      <Contact />
    </main>
  );
}
