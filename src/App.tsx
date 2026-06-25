import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import CommandPalette from "./components/CommandPalette";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import type { Mode } from "./data/resume";
import { modeMeta } from "./data/resume";

export default function App() {
  const [mode, setMode] = useState<Mode>("fullstack");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const accent = modeMeta[mode].accent;

  return (
    <div className="relative min-h-screen bg-ink-950">
      {/* ambient gradient that reacts to persona */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(60% 50% at 80% 0%, ${accent}1f, transparent 60%), radial-gradient(50% 40% at 0% 100%, ${accent}14, transparent 60%)`,
        }}
      />

      <Sidebar mode={mode} setMode={setMode} openPalette={() => setPaletteOpen(true)} />

      {/* main content — offset for sidebar (desktop) / top bar (mobile) */}
      <div className="relative z-10 pt-14 lg:pl-16 lg:pt-0">
        {/* scroll progress (aligned to content area) */}
        <motion.div
          className="fixed inset-x-0 top-14 z-[60] h-0.5 origin-left lg:left-16 lg:top-0"
          style={{ scaleX, background: accent }}
        />
        <Hero mode={mode} />
        <About mode={mode} />
        <Experience mode={mode} />
        <Projects mode={mode} />
        <Skills mode={mode} />
        <Contact mode={mode} />
      </div>

      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} mode={mode} setMode={setMode} />
    </div>
  );
}
