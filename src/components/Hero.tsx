import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";
import Scene3D from "./Scene3D";
import { profile, personas, modeMeta } from "../data/resume";
import type { Mode } from "../data/resume";

export default function Hero({ mode }: { mode: Mode }) {
  const persona = personas[mode];
  const accent = modeMeta[mode].accent;

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 opacity-90">
        <Scene3D mode={mode} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950" />

      <div className="section-pad relative z-10 pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: accent }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: accent }} />
          </span>
          Open to opportunities · {profile.location}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-7xl"
        >
          {profile.name.split(" ")[0]}{" "}
          <span className="text-gradient">{profile.name.split(" ")[1]}</span>
        </motion.h1>

        <div className="mt-4 h-9 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={persona.title}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex items-baseline gap-3 text-lg font-semibold sm:text-2xl"
              style={{ color: accent }}
            >
              {persona.title}
              <span className="text-xs font-medium uppercase tracking-wider text-white/40">
                {persona.tagline}
              </span>
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
        >
          {persona.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-ink-950 transition-transform hover:scale-105"
            style={{ background: accent }}
          >
            <Mail size={16} /> Get in touch
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
          >
            View work
          </a>
          <div className="ml-1 flex items-center gap-2">
            {[
              { Icon: Github, href: profile.github },
              { Icon: Linkedin, href: profile.linkedin },
              { Icon: Mail, href: `mailto:${profile.email}` },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:scale-110 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-10 flex items-center gap-2 text-xs text-white/40"
        >
          <MapPin size={14} /> {profile.location}
          <span className="mx-2">·</span>
          {profile.phone}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40"
      >
        <ArrowDown className="animate-float" size={22} />
      </motion.a>
    </section>
  );
}
