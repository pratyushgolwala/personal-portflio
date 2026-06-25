import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GitBranch,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Mail,
  Github,
  Linkedin,
  Home,
  Check,
} from "lucide-react";
import type { Mode } from "../data/resume";
import { profile, modeMeta } from "../data/resume";

interface Cmd {
  id: string;
  group: "Navigate" | "Branch" | "Links";
  label: string;
  hint?: string;
  keywords: string;
  icon: React.ReactNode;
  active?: boolean;
  perform: () => void;
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette({
  open,
  setOpen,
  mode,
  setMode,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const accent = modeMeta[mode].accent;

  // global ⌘K / Ctrl+K listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  const commands = useMemo<Cmd[]>(() => {
    const run = (fn: () => void) => () => {
      fn();
      setOpen(false);
    };
    return [
      { id: "home", group: "Navigate", label: "Go to top", keywords: "home hero start", icon: <Home size={16} />, perform: run(() => scrollTo("top")) },
      { id: "about", group: "Navigate", label: "About", keywords: "about story bio", icon: <User size={16} />, perform: run(() => scrollTo("about")) },
      { id: "experience", group: "Navigate", label: "Experience", keywords: "experience work jobs internship", icon: <Briefcase size={16} />, perform: run(() => scrollTo("experience")) },
      { id: "projects", group: "Navigate", label: "Projects", keywords: "projects work builds repos", icon: <FolderGit2 size={16} />, perform: run(() => scrollTo("projects")) },
      { id: "skills", group: "Navigate", label: "Skills", keywords: "skills stack tech tools", icon: <Cpu size={16} />, perform: run(() => scrollTo("skills")) },
      { id: "contact", group: "Navigate", label: "Contact", keywords: "contact email reach education", icon: <Mail size={16} />, perform: run(() => scrollTo("contact")) },

      {
        id: "checkout-fs",
        group: "Branch",
        label: "git checkout main",
        hint: "Full-Stack",
        keywords: "checkout fullstack full stack main branch foundation",
        icon: <GitBranch size={16} />,
        active: mode === "fullstack",
        perform: run(() => setMode("fullstack")),
      },
      {
        id: "checkout-ai",
        group: "Branch",
        label: "git checkout feature/ai",
        hint: "AI / ML",
        keywords: "checkout ai ml machine learning branch pivot feature",
        icon: <GitBranch size={16} />,
        active: mode === "ai",
        perform: run(() => setMode("ai")),
      },

      { id: "github", group: "Links", label: "GitHub", hint: "pratyushgolwala", keywords: "github code repos", icon: <Github size={16} />, perform: run(() => window.open(profile.github, "_blank")) },
      { id: "linkedin", group: "Links", label: "LinkedIn", hint: "connect", keywords: "linkedin connect network", icon: <Linkedin size={16} />, perform: run(() => window.open(profile.linkedin, "_blank")) },
      { id: "email", group: "Links", label: "Email me", hint: profile.email, keywords: "email mail contact hire", icon: <Mail size={16} />, perform: run(() => window.open(`mailto:${profile.email}`)) },
    ];
  }, [mode, setMode, setOpen]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q) || (c.hint?.toLowerCase().includes(q) ?? false)
    );
  }, [commands, query]);

  // clamp active index when list changes
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.perform();
    }
  };

  let runningIndex = -1;
  const groups: Cmd["group"][] = ["Navigate", "Branch", "Links"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[18vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 shadow-2xl"
            style={{ boxShadow: `0 30px 80px -20px ${accent}40` }}
            onKeyDown={onListKey}
          >
            {/* terminal title bar */}
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-2 font-mono text-xs text-white/40">
                pratyush@portfolio — {mode === "ai" ? "feature/ai" : "main"}
              </span>
            </div>

            {/* prompt input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="font-mono text-base font-bold" style={{ color: accent }}>
                ❯
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent font-mono text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
            </div>

            {/* results */}
            <div className="max-h-[46vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <div className="px-4 py-6 text-center font-mono text-sm text-white/40">
                  command not found: {query}
                </div>
              )}
              {groups.map((g) => {
                const items = filtered.filter((c) => c.group === g);
                if (items.length === 0) return null;
                return (
                  <div key={g} className="px-2 pb-1">
                    <div className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-widest text-white/30">
                      {g}
                    </div>
                    {items.map((c) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const isActive = idx === active;
                      return (
                        <button
                          key={c.id}
                          onMouseEnter={() => setActive(idx)}
                          onClick={c.perform}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
                          style={{ background: isActive ? `${accent}1f` : "transparent" }}
                        >
                          <span
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10"
                            style={{ color: isActive ? accent : "rgba(255,255,255,0.6)" }}
                          >
                            {c.icon}
                          </span>
                          <span className="flex-1 font-mono text-sm text-white/85">{c.label}</span>
                          {c.active && <Check size={15} style={{ color: accent }} />}
                          {c.hint && !c.active && (
                            <span className="font-mono text-xs text-white/35">{c.hint}</span>
                          )}
                          {isActive && (
                            <CornerDownLeft size={14} className="text-white/40" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* footer hints */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2.5 font-mono text-[11px] text-white/35">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ArrowUp size={11} />
                  <ArrowDown size={11} /> navigate
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={11} /> run
                </span>
              </span>
              <span>esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
