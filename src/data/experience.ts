// NOTA: Los textos son una primera versión razonable — edítalos con los
// detalles reales de cada puesto (proyectos, métricas, logros concretos).

export interface Experience {
  slug: string;
  role: string;
  company: string;
  period: { en: string; es: string };
  location: { en: string; es: string };
  summary: { en: string; es: string };
  contributions: { en: string; es: string }[];
  achievements?: { en: string; es: string }[];
  stack: string[];
  current?: boolean;
}

export const experience: Experience[] = [
  {
    slug: "jelp",
    role: "Software Developer",
    company: "Jelp",
    period: { en: "2025 — Present", es: "2025 — Presente" },
    location: { en: "Monterrey, MX · On-site", es: "Monterrey, MX · Presencial" },
    current: true,
    summary: {
      en: "I work as a software developer building and evolving the core product: new end-to-end features, performance improvements and integrations with third-party services, collaborating closely with product and design.",
      es: "Trabajo como desarrollador de software construyendo y evolucionando el producto principal: nuevas funcionalidades end-to-end, mejoras de rendimiento e integraciones con servicios de terceros, colaborando de cerca con producto y diseño.",
    },
    contributions: [
      {
        en: "Develop new features end-to-end, from the UI to the API and database layer",
        es: "Desarrollo de nuevas funcionalidades end-to-end, desde la UI hasta la API y la capa de datos",
      },
      {
        en: "Integrations with external services and internal tooling",
        es: "Integraciones con servicios externos y herramientas internas",
      },
      {
        en: "Performance profiling and optimization of critical flows",
        es: "Análisis de rendimiento y optimización de flujos críticos",
      },
      {
        en: "Code reviews and technical collaboration with the team",
        es: "Code reviews y colaboración técnica con el equipo",
      },
    ],
    stack: ["React", "TypeScript", "Node.js", "SQL", "Docker"],
  },
  {
    slug: "industrial-code",
    role: "Software Engineer",
    company: "Industrial Code",
    period: { en: "2022 — 2025", es: "2022 — 2025" },
    location: { en: "Hybrid", es: "Híbrido" },
    summary: {
      en: "Three years building web applications for industrial and business clients: from corporate platforms to internal management systems, owning features across the entire stack.",
      es: "Tres años construyendo aplicaciones web para clientes industriales y empresariales: desde plataformas corporativas hasta sistemas de gestión internos, siendo responsable de funcionalidades en todo el stack.",
    },
    contributions: [
      {
        en: "Built SPAs and admin dashboards with React and TypeScript",
        es: "Construcción de SPAs y dashboards administrativos con React y TypeScript",
      },
      {
        en: "Designed and implemented REST and GraphQL APIs with Node.js and PHP",
        es: "Diseño e implementación de APIs REST y GraphQL con Node.js y PHP",
      },
      {
        en: "Modeled SQL and NoSQL databases for new modules",
        es: "Modelado de bases de datos SQL y NoSQL para nuevos módulos",
      },
      {
        en: "Containerized services with Docker and maintained Linux deployments",
        es: "Contenerización de servicios con Docker y mantenimiento de despliegues en Linux",
      },
    ],
    achievements: [
      {
        en: "Grew from junior tasks to owning complete modules in production",
        es: "Crecí de tareas junior a ser responsable de módulos completos en producción",
      },
      {
        en: "Standardized the team's deployment flow with containers",
        es: "Estandaricé el flujo de despliegue del equipo con contenedores",
      },
    ],
    stack: ["React", "TypeScript", "Node.js", "PHP", "GraphQL", "Docker", "Linux"],
  },
  {
    slug: "tresite",
    role: "Frontend Developer",
    company: "Tresite",
    period: { en: "Sep — Dec 2023", es: "Sep — Dic 2023" },
    location: { en: "Freelance · Remote", es: "Freelance · Remoto" },
    summary: {
      en: "Freelance engagement focused on frontend: built responsive, pixel-perfect interfaces for client projects with tight deadlines.",
      es: "Colaboración freelance enfocada en frontend: construí interfaces responsivas y pixel-perfect para proyectos de clientes con tiempos de entrega ajustados.",
    },
    contributions: [
      {
        en: "Implemented responsive landing pages and corporate sites",
        es: "Implementación de landing pages y sitios corporativos responsivos",
      },
      {
        en: "Translated design mockups into reusable components",
        es: "Traducción de mockups de diseño a componentes reutilizables",
      },
      {
        en: "Optimized loading performance and SEO basics",
        es: "Optimización de tiempos de carga y fundamentos de SEO",
      },
    ],
    stack: ["JavaScript", "React", "TailwindCSS", "HTML5", "CSS3"],
  },
  {
    slug: "nukleos",
    role: "Development Intern",
    company: "NukleOS®",
    period: { en: "2021 — 2022", es: "2021 — 2022" },
    location: { en: "On-site", es: "Presencial" },
    summary: {
      en: "Internship where I joined a real development team for the first time: contributed to internal tools, fixed bugs and learned professional workflows (git, code review, agile).",
      es: "Prácticas donde me integré por primera vez a un equipo de desarrollo real: contribuí a herramientas internas, corregí bugs y aprendí flujos de trabajo profesionales (git, code review, agile).",
    },
    contributions: [
      {
        en: "Contributed features and fixes to internal web tools",
        es: "Contribución de funcionalidades y correcciones en herramientas web internas",
      },
      {
        en: "Wrote documentation and helped with QA testing",
        es: "Redacción de documentación y apoyo en pruebas de QA",
      },
      {
        en: "Learned team workflows: git, code reviews and agile ceremonies",
        es: "Aprendizaje de flujos de equipo: git, code reviews y ceremonias agile",
      },
    ],
    stack: ["JavaScript", "PHP", "SQL", "Git"],
  },
  {
    slug: "bluit",
    role: "Software Developer Intern",
    company: "BLUIT S.R.L.",
    period: { en: "2020", es: "2020" },
    location: { en: "Remote", es: "Remoto" },
    summary: {
      en: "My first industry experience, fully remote: supported the development team building small features and learning the fundamentals of shipping real software.",
      es: "Mi primera experiencia en la industria, totalmente remota: apoyé al equipo de desarrollo construyendo funcionalidades pequeñas y aprendiendo los fundamentos de entregar software real.",
    },
    contributions: [
      {
        en: "Built small features under senior supervision",
        es: "Desarrollo de funcionalidades pequeñas bajo supervisión senior",
      },
      {
        en: "Fixed UI bugs and improved existing screens",
        es: "Corrección de bugs de UI y mejora de pantallas existentes",
      },
      {
        en: "First exposure to remote collaboration and version control",
        es: "Primer contacto con colaboración remota y control de versiones",
      },
    ],
    stack: ["JavaScript", "HTML5", "CSS3", "Git"],
  },
];
