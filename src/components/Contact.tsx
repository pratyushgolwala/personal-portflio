import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import { profile, modeMeta } from "../data/resume";
import type { Mode } from "../data/resume";

export default function Contact({ mode }: { mode: Mode }) {
  const accent = modeMeta[mode].accent;

  return (
    <section id="contact" className="relative">
      <div className="section-pad">
        <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="font-mono text-sm" style={{ color: accent }}>
              05 / education & contact
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Let's build something.</h2>
            <p className="mt-4 max-w-md text-white/65">
              I'm open to full-time engineering roles across full-stack, systems, and AI/ML. Reach
              out and I'll get back to you quickly.
            </p>

            <div className="mt-8 glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <GraduationCap style={{ color: accent }} size={22} />
                <h3 className="font-semibold text-white">{profile.education.degree}</h3>
              </div>
              <p className="mt-2 text-sm text-white/65">{profile.education.school}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 text-sm text-white/50">
                <span>{profile.education.period}</span>
                <span style={{ color: accent }}>{profile.education.score}</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid gap-3">
              {[
                { Icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
                { Icon: Phone, label: profile.phone, href: `tel:${profile.phone}` },
                { Icon: Github, label: "github.com/pratyushgolwala", href: profile.github },
                { Icon: Linkedin, label: "linkedin.com/in/pratyush-golwala", href: profile.linkedin },
                { Icon: MapPin, label: profile.location, href: undefined },
              ].map(({ Icon, label, href }, i) => {
                const Wrapper = href ? "a" : "div";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Wrapper
                      {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <span
                        className="grid h-11 w-11 place-items-center rounded-xl"
                        style={{ background: `${accent}1a`, color: accent }}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="text-sm text-white/80 group-hover:text-white">{label}</span>
                    </Wrapper>
                  </motion.div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <footer className="mt-20 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {profile.name}. Built with React, Three.js & Framer Motion.
        </footer>
      </div>
    </section>
  );
}
