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
    "when.0.period": "2025 — Present",
    "when.0.role": "Software Developer",
    "when.0.place": "Jelp · On-site",
    "when.1.period": "2022 — 2025",
    "when.1.role": "Software Engineer",
    "when.1.place": "Industrial Code · Hybrid",
    "when.2.period": "Sep — Dec 2023",
    "when.2.role": "Frontend Developer",
    "when.2.place": "Tresite · Freelance",
    "when.3.period": "2021 — 2022",
    "when.3.role": "Development Intern",
    "when.3.place": "NukleOS® · On-site",
    "when.4.period": "2020",
    "when.4.role": "Software Developer Intern",
    "when.4.place": "BLUIT S.R.L. · Remote",

    // Projects
    "projects.eyebrow": "My work",
    "projects.title": "Projects",
    "projects.more": "More projects on",
    "projects.about": "About the project",
    "projects.builtWith": "Built with",
    "projects.visit": "Visit site",
    "projects.code": "View code",

    // Contact / Chat
    "contact.eyebrow": "Let's talk",
    "contact.title": "Contact",
    "contact.description": "Have a question or want to work together? Chat with my assistant or reach out directly.",
    "contact.location": "Location:",
    "chat.online": "Online · Ask me anything",
    "chat.placeholder": "Ask about Edgar...",
    "chat.send": "Send",
    "chat.error": "Something went wrong. Please try again.",
    "chat.thinking": "Thinking...",
    "chat.status_ended": "Conversation ended",
    "chat.status_limited": "Daily limit reached",
    "chat.daily_limit": "You've used your 3 daily chats. Come back tomorrow!",
    "chat.ended_msg": "Conversation ended. Start a new one?",
    "chat.new_chat": "New chat",
    "chat.chats_left": "left today",
    "chat.remaining_today": "chats remaining today",

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
    "when.0.period": "2025 — Presente",
    "when.0.role": "Software Developer",
    "when.0.place": "Jelp · Presencial",
    "when.1.period": "2022 — 2025",
    "when.1.role": "Software Engineer",
    "when.1.place": "Industrial Code · Híbrido",
    "when.2.period": "Sep — Dic 2023",
    "when.2.role": "Frontend Developer",
    "when.2.place": "Tresite · Freelance",
    "when.3.period": "2021 — 2022",
    "when.3.role": "Development Intern",
    "when.3.place": "NukleOS® · Presencial",
    "when.4.period": "2020",
    "when.4.role": "Software Developer Intern",
    "when.4.place": "BLUIT S.R.L. · Remoto",

    // Projects
    "projects.eyebrow": "Mi trabajo",
    "projects.title": "Proyectos",
    "projects.more": "Más proyectos en",
    "projects.about": "Acerca del proyecto",
    "projects.builtWith": "Construido con",
    "projects.visit": "Visitar sitio",
    "projects.code": "Ver código",

    // Contact / Chat
    "contact.eyebrow": "Hablemos",
    "contact.title": "Contacto",
    "contact.description": "¿Tienes alguna pregunta o quieres trabajar juntos? Chatea con mi asistente o contáctame directamente.",
    "contact.location": "Ubicación:",
    "chat.online": "En línea · Pregúntame lo que quieras",
    "chat.placeholder": "Pregunta sobre Edgar...",
    "chat.send": "Enviar",
    "chat.error": "Algo salió mal. Inténtalo de nuevo.",
    "chat.thinking": "Pensando...",
    "chat.status_ended": "Conversación terminada",
    "chat.status_limited": "Límite diario alcanzado",
    "chat.daily_limit": "Usaste tus 3 chats del día. ¡Vuelve mañana!",
    "chat.ended_msg": "Conversación terminada. ¿Iniciar una nueva?",
    "chat.new_chat": "Nueva conversación",
    "chat.chats_left": "restantes hoy",
    "chat.remaining_today": "chats restantes hoy",

    // Footer
    "footer.builtWith": "Construido con",
    "footer.styledWith": "Estilizado con",
    "footer.rights": "Todos los derechos reservados.",
  },
} as const;

export type UIKeys = keyof (typeof ui)[typeof defaultLang];
