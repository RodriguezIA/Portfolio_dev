export const languages = {
  en: "English",
  es: "Español",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

export const ui = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Hi, I'm Edgar Rodriguez",
    "hero.title1": "Software",
    "hero.title2": "Developer",
    "hero.desc": "Building complete digital products — from intuitive interfaces to robust backends — with a",
    "hero.desc.highlight": "full-stack",
    "hero.desc.end": "mindset.",

    // SkillsList
    "skills.title": "What I do?",
    "skills.cat.frontend": "Frontend Development",
    "skills.cat.backend": "Backend Development",
    "skills.cat.devops": "Deployment & Maintenance",
    "skills.frontend.0": "Single Page Applications (SPAs)",
    "skills.frontend.1": "Landing pages and corporate sites",
    "skills.frontend.2": "Portfolios and personal sites",
    "skills.frontend.3": "Responsive design with TailwindCSS",
    "skills.backend.0": "REST and GraphQL APIs",
    "skills.backend.1": "Services with Node.js, FastAPI and PHP",
    "skills.backend.2": "SQL and NoSQL databases",
    "skills.backend.3": "Authentication and authorization",
    "skills.devops.0": "Containers with Docker",
    "skills.devops.1": "Linux server administration",
    "skills.devops.2": "CI/CD and automation",
    "skills.devops.3": "Service monitoring and maintenance",

    // When
    "when.title": "When?",
    "when.0.period": "2024 — Present",
    "when.0.role": "Full Stack Developer",
    "when.0.place": "Company / Freelance",
    "when.1.period": "2022 — 2024",
    "when.1.role": "Junior Developer",
    "when.1.place": "Company / Agency",
    "when.2.period": "2019 — 2023",
    "when.2.role": "Computer Systems Engineering",
    "when.2.place": "University",
    "when.3.period": "2018",
    "when.3.role": "First lines of code",
    "when.3.place": "Start of the journey",

    // Projects
    "projects.eyebrow": "My work",
    "projects.title": "Projects",
    "projects.more": "More projects on",
    "projects.about": "About the project",
    "projects.builtWith": "Built with",
    "projects.visit": "Visit site",
    "projects.code": "View code",

    // Contact
    "contact.eyebrow": "Let's talk",
    "contact.title": "Contact",
    "contact.description": "Have a question or a project in mind? Feel free to reach out.",
    "contact.location": "Location:",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Submit",
    "contact.success": "✅ Thank you for your message!",
    "contact.error": "There was a problem sending your message.",

    // Footer
    "footer.builtWith": "Built with",
    "footer.styledWith": "Styled with",
    "footer.rights": "All rights reserved.",
  },
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Hero
    "hero.greeting": "Hola, soy Edgar Rodriguez",
    "hero.title1": "Desarrollador",
    "hero.title2": "de Software",
    "hero.desc": "Construyendo productos digitales completos — desde interfaces intuitivas hasta backends robustos — con una mentalidad",
    "hero.desc.highlight": "full-stack",
    "hero.desc.end": ".",

    // SkillsList
    "skills.title": "¿Qué hago?",
    "skills.cat.frontend": "Desarrollo Frontend",
    "skills.cat.backend": "Desarrollo Backend",
    "skills.cat.devops": "Despliegue y Mantenimiento",
    "skills.frontend.0": "Single Page Applications (SPAs)",
    "skills.frontend.1": "Landing pages y sitios corporativos",
    "skills.frontend.2": "Portafolios y sitios personales",
    "skills.frontend.3": "Diseño responsive con TailwindCSS",
    "skills.backend.0": "APIs REST y GraphQL",
    "skills.backend.1": "Servicios con Node.js, FastAPI y PHP",
    "skills.backend.2": "Bases de datos SQL y NoSQL",
    "skills.backend.3": "Autenticación y autorización",
    "skills.devops.0": "Contenedores con Docker",
    "skills.devops.1": "Administración de servidores Linux",
    "skills.devops.2": "CI/CD y automatización",
    "skills.devops.3": "Monitoreo y mantenimiento de servicios",

    // When
    "when.title": "¿Cuándo?",
    "when.0.period": "2024 — Presente",
    "when.0.role": "Full Stack Developer",
    "when.0.place": "Empresa / Freelance",
    "when.1.period": "2022 — 2024",
    "when.1.role": "Junior Developer",
    "when.1.place": "Empresa / Agencia",
    "when.2.period": "2019 — 2023",
    "when.2.role": "Ingeniería en Sistemas / Computación",
    "when.2.place": "Universidad",
    "when.3.period": "2018",
    "when.3.role": "Primeras líneas de código",
    "when.3.place": "Inicio del camino",

    // Projects
    "projects.eyebrow": "Mi trabajo",
    "projects.title": "Proyectos",
    "projects.more": "Más proyectos en",
    "projects.about": "Acerca del proyecto",
    "projects.builtWith": "Construido con",
    "projects.visit": "Visitar sitio",
    "projects.code": "Ver código",

    // Contact
    "contact.eyebrow": "Hablemos",
    "contact.title": "Contacto",
    "contact.description": "¿Tienes una pregunta o un proyecto en mente? No dudes en contactarme.",
    "contact.location": "Ubicación:",
    "contact.name": "Nombre",
    "contact.email": "Email",
    "contact.message": "Mensaje",
    "contact.submit": "Enviar",
    "contact.success": "✅ ¡Gracias por tu mensaje!",
    "contact.error": "Hubo un problema al enviar tu mensaje.",

    // Footer
    "footer.builtWith": "Construido con",
    "footer.styledWith": "Estilizado con",
    "footer.rights": "Todos los derechos reservados.",
  },
} as const;

export type UIKeys = keyof (typeof ui)[typeof defaultLang];
