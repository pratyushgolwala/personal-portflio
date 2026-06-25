import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { personas, modeMeta } from "../data/resume";
import type { Mode } from "../data/resume";

export default function Skills({ mode }: { mode: Mode }) {
  const accent = modeMeta[mode].accent;
  const groups = personas[mode].skills;

  return (
    <section id="skills" className="relative">
      <div className="section-pad">
        <Reveal>
          <p className="font-mono text-sm" style={{ color: accent }}>
            04 / skills
          </p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Tools & technologies</h2>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {groups.map((g, gi) => (
              <motion.div
                key={g.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.06 }}
                className="glass rounded-2xl p-6"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                  {g.label}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border px-2.5 py-1 text-xs font-medium text-white/80 transition-colors hover:text-white"
                      style={{ borderColor: `${accent}33`, background: `${accent}11` }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
