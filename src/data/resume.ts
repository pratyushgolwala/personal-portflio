export type Mode = "fullstack" | "ai";

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
}

export interface ProjectItem {
  name: string;
  tagline: string;
  description: string[];
  tech: string[];
  link?: string;
  demo?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface PersonaData {
  title: string;
  tagline: string;
  summary: string;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
}

export const profile = {
  name: "Pratyush Golwala",
  phone: "+91-8200229608",
  email: "pratyushgolwala@gmail.com",
  location: "Surat, India",
  github: "https://github.com/pratyushgolwala",
  linkedin: "https://www.linkedin.com/in/pratyush-golwala-16242a322/",
  education: {
    degree: "B.Tech in Computer Science (Information Technology)",
    school: "SRM Institute of Science and Technology, Kattankulathur",
    period: "Jan 2022 – Jan 2026",
    score: "CGPA 8.83 / 10",
  },
};

export const personas: Record<Mode, PersonaData> = {
  fullstack: {
    title: "Full-Stack Developer",
    tagline: "Where I started",
    summary:
      "I cut my teeth building and shipping real web products end to end — React and Next.js front-ends, Node/Express APIs, and databases, deployed and running in production. This foundation in clean UI, performance, and reliable delivery is what now powers the way I build AI systems.",
    experience: [
      {
        role: "Full-Stack Developer Intern",
        company: "Mencoweb",
        location: "Indore",
        period: "Mar 2025 – May 2025",
        bullets: [
          "Built scalable web applications using React.js, Node.js, Express.js, and MongoDB following software development lifecycle best practices.",
          "Developed 3+ backend APIs optimizing NoSQL database interactions and wrote shell scripts to automate operational tasks.",
          "Enhanced UI responsiveness by 15% and improved Lighthouse performance scores by 25% through profiling and code optimization.",
        ],
      },
      {
        role: "Full-Stack Developer Intern",
        company: "PristinePro",
        period: "Jan 2025 – Feb 2025",
        bullets: [
          "Delivered a fully functional website MVP in 4 weeks with a bug-free, responsive deployment.",
          "Tested and optimized SEO, page-load time (30% reduction), and core performance metrics.",
          "Improved brand engagement through quality-focused UI/UX and design refinement.",
          "Ensured cross-browser and cross-device compatibility for a consistent user experience.",
        ],
      },
    ],
    projects: [
      {
        name: "Performance Dashboard",
        tagline: "Real-time data viz at 60fps",
        description: [
          "High-performance real-time dashboard built with Next.js 14 and the Canvas API, rendering 10,000+ live data points at a smooth 60fps.",
          "Implemented line, bar, and area charts with zoom and pan from scratch — no external charting libraries — keeping response times under 100ms.",
        ],
        tech: ["Next.js 14", "TypeScript", "Canvas API", "React"],
        link: "https://github.com/pratyushgolwala/Performane-Dashboard",
      },
      {
        name: "HR Workflow Platform",
        tagline: "Visual automation builder",
        description: [
          "Drag-and-drop workflow automation platform for HR processes, built with React and React Flow.",
          "Designed multiple node types (Start, Task, Approval, Automated Action, End) with real-time simulation backed by Mock Service Worker.",
        ],
        tech: ["React", "React Flow", "JavaScript", "MSW"],
        link: "https://github.com/pratyushgolwala/HR-WorkFlow-Dashboard",
      },
      {
        name: "PristinePro",
        tagline: "Product marketing site",
        description: [
          "Advertisement and brand site for a consumer hygiene product, built and shipped during my internship.",
          "Responsive, SEO-optimized React/Node front-end with refined UI/UX and cross-device compatibility.",
        ],
        tech: ["React", "Node.js", "TypeScript", "JavaScript"],
        link: "https://github.com/pratyushgolwala/Pristinepro",
        demo: "https://pristinepro.vercel.app",
      },
      {
        name: "DressTalk",
        tagline: "Full-stack e-commerce",
        description: [
          "E-commerce web app with product browsing, cart management, and checkout flow.",
          "Built on an Express.js backend with server-rendered views and persistent cart state.",
        ],
        tech: ["Express.js", "Node.js", "JavaScript", "EJS"],
        link: "https://github.com/pratyushgolwala/DressTalkk",
      },
      {
        name: "FundooNotes",
        tagline: "Full-stack notes API platform",
        description: [
          "Full-stack notes management platform with user authentication, label/collaborator support, and full CRUD note operations.",
          "Built REST APIs with Django REST Framework and FastAPI, documented via Swagger, backed by a PostgreSQL database.",
        ],
        tech: ["Python", "Django", "Django REST Framework", "FastAPI", "PostgreSQL", "Swagger"],
        link: "https://github.com/pratyushgolwala/FundoooNotes",
      },
    ],
    skills: [
      {
        label: "Frontend",
        items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind", "Canvas API"],
      },
      {
        label: "Backend",
        items: ["Node.js", "Express.js", "REST APIs", "Python", "Django"],
      },
      {
        label: "Databases",
        items: ["MongoDB", "SQL", "SQLite"],
      },
      {
        label: "Tooling & Deploy",
        items: ["Git", "Vercel", "Netlify", "Render", "Shell Scripting", "Linux"],
      },
    ],
  },
  ai: {
    title: "AI / ML Engineer",
    tagline: "Where I'm headed",
    summary:
      "I've gone all-in on AI — building RAG systems, ML models, and computer-vision applications with Python. From a retrieval-augmented culinary assistant to an XGBoost fraud detector and gesture-controlled interfaces, I focus on turning models into real, working products, backed by my full-stack instinct for shipping reliable software.",
    experience: [
      {
        role: "AI / ML Engineer",
        company: "BridgeLabz",
        period: "Feb 2026 – May 2026",
        bullets: [
          "Engineered AI-powered applications integrating Python ML services with Django, React, and REST APIs.",
          "Built NLP and document-processing workflows and designed inference pipelines containerized with Docker on Linux for consistent deployments.",
          "Improved model and service reliability through monitoring, debugging, and root cause analysis.",
        ],
      },
      {
        role: "AI-Integrated Developer Intern",
        company: "DigitalDose",
        period: "Jun 2025 – Sep 2025",
        bullets: [
          "Built an AI-integrated platform connecting React front-ends to ML inference APIs for an intelligent user experience.",
          "Developed backend services with Node.js wiring model endpoints into product features.",
          "Improved application rendering performance by 25% and integrated real-time analytics.",
        ],
      },
    ],
    projects: [
      {
        name: "ChefBot",
        tagline: "RAG culinary assistant",
        description: [
          "Conversational culinary assistant that answers recipe questions using retrieval-augmented generation over a vector store of precomputed embeddings.",
          "Handles multi-turn cooking clarifications, semantic recipe discovery, and context-aware suggestions through a Python RAG backend and a fast web UI.",
        ],
        tech: ["Python", "RAG", "Vector Search", "Embeddings", "LLM"],
        link: "https://github.com/pratyushgolwala/ChefBot",
        demo: "https://chef-bot-self.vercel.app",
      },
      {
        name: "UPI Fraud Detection",
        tagline: "ML fraud classifier",
        description: [
          "Machine-learning model to detect fraudulent UPI transactions, trained with XGBoost.",
          "Applied feature engineering and evaluation on transaction data to flag secure vs. suspicious payments.",
        ],
        tech: ["Python", "XGBoost", "scikit-learn", "Pandas"],
        link: "https://github.com/pratyushgolwala/DS-Project-SRM",
      },
      {
        name: "AI Virtual Mouse",
        tagline: "Gesture + voice control",
        description: [
          "Gesture-controlled virtual mouse enabling touchless human-computer interaction via real-time hand tracking.",
          "Combined static and dynamic hand gestures with voice commands using computer-vision and ML hand-detection.",
        ],
        tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
        link: "https://github.com/pratyushgolwala/AI-Virtual-Mouse",
      },
      {
        name: "Enterprise Book Store",
        tagline: "Analytics-driven platform",
        description: [
          "Full-stack book store platform with a React + Vite front-end backed by a Django REST API and a dedicated FastAPI analytics microservice.",
          "Architected with Redux Toolkit state management, modular services, and Docker — designed for data-driven recommendations and usage analytics.",
        ],
        tech: ["React", "Django REST", "FastAPI", "Redux Toolkit", "Docker"],
        link: "https://github.com/pratyushgolwala/Bookstore-ui",
        demo: "https://bookstore-ui-tau.vercel.app",
      },
    ],
    skills: [
      {
        label: "AI / ML",
        items: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP", "RAG", "LLMs", "Semantic Search"],
      },
      {
        label: "Libraries",
        items: ["XGBoost", "scikit-learn", "Pandas", "NumPy", "OpenCV", "MediaPipe"],
      },
      {
        label: "LLM & Data",
        items: ["Embeddings", "Vector Stores", "OpenAI / Gemini APIs", "Flask", "Django"],
      },
      {
        label: "Foundation",
        items: ["Python", "REST APIs", "Docker", "Git", "Linux"],
      },
    ],
  },
};

export const modeMeta: Record<Mode, { label: string; short: string; accent: string }> = {
  fullstack: { label: "Full-Stack", short: "FS", accent: "#38bdf8" },
  ai: { label: "AI / ML", short: "AI", accent: "#a855f7" },
};
