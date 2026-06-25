# Pratyush Golwala — Portfolio

A modern, 3D-interactive portfolio with smooth animations and a Full-Stack ↔ AI/ML persona toggle that reshapes the experience, projects, and skills around each profile.

## Tech Stack

- **React 18 + Vite + TypeScript**
- **Three.js** via `@react-three/fiber` and `@react-three/drei` — interactive 3D hero scene
- **Framer Motion** — scroll reveals, layout transitions, animated toggle
- **Tailwind CSS** — styling

## Getting Started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build
npm run preview  # preview the production build
```

## Structure

```
src/
  data/resume.ts     # all content for both personas (edit here)
  components/         # Navbar, Hero, Scene3D, About, Experience, Projects, Skills, Contact
  App.tsx            # persona state + ambient effects
```

To update content, edit `src/data/resume.ts`.
