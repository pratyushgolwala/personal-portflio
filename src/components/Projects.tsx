import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Reveal from "./Reveal";
import { personas, modeMeta } from "../data/resume";
import type { Mode } from "../data/resume";

export default function Projects({ mode }: { mode: Mode }) {
  const accent = modeMeta[mode].accent;
  const projects = personas[mode].projects;

  return (
    <section id="projects" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="font-mono text-sm" style={{ color: accent }}>
            03 / projects
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Selected builds</h2>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-12 grid gap-6 md:grid-cols-2"
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.name} index={i} accent={accent} project={p} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  accent,
  index,
}: {
  project: ReturnType<typeof personas.ai.projects.slice>[number];
  accent: string;
  index: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:-translate-y-1.5 sm:p-7"
      style={{ boxShadow: hover ? `0 24px 60px -24px ${accent}66` : undefined }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
        style={{ background: accent }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
            <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
              {project.tagline}
            </p>
          </div>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all group-hover:rotate-45 group-hover:text-white"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>

        <ul className="mt-4 space-y-2">
          {project.description.map((d, i) => (
            <li key={i} className="text-sm leading-relaxed text-white/65">
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
            style={{ color: accent }}
          >
            Live demo <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
