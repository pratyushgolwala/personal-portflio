import { motion } from "framer-motion";
import type { Mode } from "../data/resume";
import { modeMeta } from "../data/resume";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 py-3 md:px-6">
        <a href="#top" className="font-mono text-sm font-bold tracking-tight">
          <span className="text-gradient">PG</span>
          <span className="hidden text-white/60 sm:inline"> / pratyush.dev</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm text-white/60 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        <PersonaToggle mode={mode} setMode={setMode} />
      </nav>
    </motion.header>
  );
}

function PersonaToggle({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  return (
    <div className="relative flex items-center rounded-full border border-white/10 bg-black/40 p-1 text-xs font-semibold">
      {(["fullstack", "ai"] as Mode[]).map((m) => (
        <button
          key={m}
          onClick={() => setMode(m)}
          className="relative z-10 rounded-full px-3 py-1.5 transition-colors"
          style={{ color: mode === m ? "#05060a" : "rgba(255,255,255,0.6)" }}
        >
          {mode === m && (
            <motion.span
              layoutId="persona-pill"
              className="absolute inset-0 -z-10 rounded-full"
              style={{ background: modeMeta[m].accent }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          {modeMeta[m].short}
        </button>
      ))}
    </div>
  );
}
