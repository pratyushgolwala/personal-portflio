import { motion } from "framer-motion";
import Reveal from "./Reveal";
import type { Mode } from "../data/resume";
import { modeMeta } from "../data/resume";

const stats = [
  { value: "2025", label: "Pivot to AI" },
  { value: "10k+", label: "Data points @ 60fps" },
  { value: "12+", label: "Projects shipped" },
  { value: "8.83", label: "CGPA / 10" },
];

export default function About({ mode }: { mode: Mode }) {
  const accent = modeMeta[mode].accent;
  return (
    <section id="about" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="font-mono text-sm" style={{ color: accent }}>
            01 / about
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            From shipping web products to building AI.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-white/70">
              I started out as a <span className="text-white">full-stack developer</span>, shipping
              real React and Next.js products with Node back-ends — internships at PristinePro and
              Mencoweb, performance-critical dashboards, and e-commerce apps running in production.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Now I've turned fully toward <span className="text-white">AI and machine learning</span> —
              RAG systems, ML classifiers, and computer-vision apps in Python. The full-stack
              foundation is my edge: I don't just train models, I ship them as products people can
              actually use.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Use the <span className="text-white">FS / AI</span> toggle in the nav to switch between
              the two chapters of my work.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass glow-ring rounded-2xl p-5"
                >
                  <div className="text-3xl font-extrabold" style={{ color: accent }}>
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-white/55">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
