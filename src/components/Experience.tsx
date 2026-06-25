import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { personas, modeMeta } from "../data/resume";
import type { Mode } from "../data/resume";

export default function Experience({ mode }: { mode: Mode }) {
  const accent = modeMeta[mode].accent;
  const items = personas[mode].experience;

  return (
    <section id="experience" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="font-mono text-sm" style={{ color: accent }}>
            02 / experience
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Where I've shipped</h2>
        </Reveal>

        <div className="relative mt-12">
          {/* vertical line */}
          <span
            className="absolute left-[15px] top-1 bottom-1 w-px"
            style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.18), transparent)" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {items.map((item, i) => (
                <Reveal key={item.company + i} delay={i * 0.05}>
                  <div className="relative pl-11 sm:pl-14">
                    {/* node */}
                    <span
                      className="absolute left-[8px] top-1.5 h-4 w-4 rounded-full ring-4 ring-ink-950"
                      style={{ background: accent }}
                    />
                    <div className="glass rounded-2xl p-5 transition-transform hover:-translate-y-1 sm:p-6">
                      <span className="font-mono text-xs font-semibold" style={{ color: accent }}>
                        {item.period}
                      </span>
                      <h3 className="mt-1 text-base font-bold text-white sm:text-lg">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-white/60">
                        {item.company}
                        {item.location ? ` · ${item.location}` : ""}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="text-sm leading-relaxed text-white/70">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
