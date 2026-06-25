import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GitBranch,
  Github,
  Linkedin,
  Mail,
  Command,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
} from "lucide-react";
import type { Mode } from "../data/resume";
import { profile, modeMeta } from "../data/resume";

const NAV = [
  { id: "about", label: "About", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

const TRACKED = ["top", "about", "experience", "projects", "skills", "contact"];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Icon wrapper that reveals a label tooltip to its right on hover. */
function Tip({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="group relative flex items-center">
      {children}
      <span className="pointer-events-none absolute left-full z-50 ml-3 -translate-x-1 whitespace-nowrap rounded-md border border-white/10 bg-ink-800 px-2.5 py-1.5 text-xs font-medium text-white/90 opacity-0 shadow-xl transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100">
        {label}
      </span>
    </div>
  );
}

export default function Sidebar({
  mode,
  setMode,
  openPalette,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  openPalette: () => void;
}) {
  const accent = modeMeta[mode].accent;
  const branch = mode === "ai" ? "feature/ai" : "main";
  const [section, setSection] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setSection(e.target.id)),
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    TRACKED.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleBranch = () => setMode(mode === "ai" ? "fullstack" : "ai");

  return (
    <>
      {/* ---------- Desktop: thin icon rail ---------- */}
      <motion.aside
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed left-0 top-0 z-50 hidden h-screen w-16 flex-col items-center border-r border-white/10 bg-ink-900/60 py-5 backdrop-blur-xl lg:flex"
      >
        {/* monogram */}
        <Tip label="Back to top">
          <button
            onClick={() => scrollTo("top")}
            className="grid h-10 w-10 place-items-center rounded-xl text-sm font-extrabold text-ink-950 transition-transform hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${accent}, #ffffff66)` }}
          >
            PG
          </button>
        </Tip>

        {/* branch switcher */}
        <div className="mt-5">
          <Tip
            label={
              <span className="flex flex-col">
                <span className="font-mono font-semibold" style={{ color: accent }}>
                  ⎇ {branch}
                </span>
                <span className="text-[10px] text-white/50">
                  {mode === "ai" ? "AI / ML Engineer" : "Full-Stack Developer"} · click to switch
                </span>
              </span>
            }
          >
            <button
              onClick={toggleBranch}
              className="relative grid h-10 w-10 place-items-center rounded-xl border transition-colors hover:bg-white/10"
              style={{ borderColor: `${accent}55`, background: `${accent}14` }}
              aria-label="Switch branch"
            >
              <GitBranch size={17} style={{ color: accent }} />
              <span
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink-900"
                style={{ background: accent }}
              />
            </button>
          </Tip>
        </div>

        <div className="my-5 h-px w-7 bg-white/10" />

        {/* navigation */}
        <nav className="flex flex-1 flex-col items-center gap-1.5">
          {NAV.map((item) => {
            const isActive = section === item.id;
            const Icon = item.icon;
            return (
              <Tip key={item.id} label={item.label}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="relative grid h-10 w-10 place-items-center rounded-xl transition-colors hover:bg-white/10"
                  style={{
                    background: isActive ? `${accent}1f` : "transparent",
                    color: isActive ? accent : "rgba(255,255,255,0.55)",
                  }}
                  aria-label={item.label}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -left-[9px] top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full"
                      style={{ background: accent }}
                    />
                  )}
                  <Icon size={18} />
                </button>
              </Tip>
            );
          })}
        </nav>

        {/* command palette */}
        <Tip
          label={
            <span className="flex items-center gap-2">
              Command palette
              <kbd className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">
                ⌘K
              </kbd>
            </span>
          }
        >
          <button
            onClick={openPalette}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Open command palette"
          >
            <Command size={18} />
          </button>
        </Tip>

        <div className="my-4 h-px w-7 bg-white/10" />

        {/* socials */}
        <div className="flex flex-col items-center gap-1.5">
          {[
            { Icon: Github, href: profile.github, label: "GitHub" },
            { Icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
            { Icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
          ].map(({ Icon, href, label }, i) => (
            <Tip key={i} label={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            </Tip>
          ))}
        </div>
      </motion.aside>

      {/* ---------- Mobile / tablet top bar ---------- */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-white/10 bg-ink-900/80 px-4 backdrop-blur-xl lg:hidden"
      >
        <button onClick={() => scrollTo("top")} className="flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-extrabold text-ink-950"
            style={{ background: `linear-gradient(135deg, ${accent}, #ffffff66)` }}
          >
            PG
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-white/80">
            pratyush<span className="text-white/40">.dev</span>
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleBranch}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs font-semibold transition-colors hover:bg-white/10"
            style={{ color: accent }}
            title="Checkout the other branch"
          >
            <GitBranch size={13} />
            <AnimatePresence mode="wait">
              <motion.span
                key={branch}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -6, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {branch}
              </motion.span>
            </AnimatePresence>
          </button>
          <button
            onClick={openPalette}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Open command palette"
          >
            <Command size={16} />
          </button>
        </div>
      </motion.header>
    </>
  );
}
