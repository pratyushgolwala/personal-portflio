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
          <div
            className="absolute left-3 top-2 h-full w-px md:left-1/2"
            style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), transparent)" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              {items.map((item, i) => (
                <Reveal key={item.company + i} delay={i * 0.05}>
                  <div
                    className={`relative pl-12 md:w-1/2 ${
                      i % 2 === 0 ? "md:ml-auto md:pl-12" : "md:mr-auto md:pl-0 md:pr-12 md:text-right"
                    }`}
                  >
                    <span
                      className="absolute top-2 grid h-6 w-6 place-items-center rounded-full border-2 border-ink-950 left-0 md:left-auto"
                      style={{
                        background: accent,
                        [i % 2 === 0 ? "left" : "right"]: "-12px",
                      } as React.CSSProperties}
                    />
                    <div className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
                      <span
                        className="text-xs font-mono font-semibold"
                        style={{ color: accent }}
                      >
                        {item.period}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-white">{item.role}</h3>
                      <p className="text-sm font-medium text-white/60">{item.company}</p>
                      <ul className={`mt-4 space-y-2 ${i % 2 === 0 ? "" : "md:text-right"}`}>
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
