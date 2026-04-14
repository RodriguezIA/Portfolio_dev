import React, { useState, useEffect, useRef } from "react";

interface Project {
  title: string;
  image: string;
  preview: string;
  link: string;
  status: string;
  description: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "PromotorIA",
    image: "/promotoria.png",
    preview: "https://promotoria.edgardev.mx/",
    link: "",
    status: "En Desarrollo",
    description:
      "PromotorIA es una plataforma impulsada por inteligencia artificial diseñada para automatizar y potenciar estrategias de marketing digital. Permite a equipos y marcas crear campañas promocionales de forma inteligente, optimizando el alcance, la conversión y el impacto con el mínimo esfuerzo manual.",
    tech: ["React", "TypeScript", "TailwindCSS", "Node.js", "AI/ML"],
  },
];

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
  >
    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
  >
    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
  </svg>
);

const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-5"
  >
    <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-6"
  >
    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
  </svg>
);

const ProjectModal: React.FC = () => {
  const [selected, setSelected] = useState<Project | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const close = () => setSelected(null);

  return (
    <>
      {/* ── Project cards grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.title}
            className="group cursor-pointer"
            onClick={() => setSelected(project)}
          >
            <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="flex items-center px-3">
              <div className="flex-grow">
                <h4 className="text-2xl font-semibold text-[var(--white)]">
                  {project.title}
                </h4>
                <span className="py-1 text-sm text-[var(--white-icon)]">
                  {project.status}
                </span>
              </div>
              <div className="flex gap-2 ml-auto">
                <button
                  aria-label="Ver detalles"
                  className="size-14 flex justify-center items-center text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-xl bg-[#1414149c] hover:bg-[var(--white-icon-tr)]"
                >
                  {/* expand / maximize icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-7"
                  >
                    <path d="M3 3H10V5H6.41421L10.7071 9.29289L9.29289 10.7071L5 6.41421V10H3V3ZM14 3H21V10H19V6.41421L14.7071 10.7071L13.2929 9.29289L17.5858 5H14V3ZM3 14H5V17.5858L9.29289 13.2929L10.7071 14.7071L6.41421 19H10V21H3V14ZM21 14V21H14V19H17.5858L13.2929 14.7071L14.7071 13.2929L19 17.5858V14H21Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── More projects link ── */}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/RodriguezIA?tab=repositories"
        aria-label="GitHub"
        className="w-full flex items-center justify-center gap-2 mt-9 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-full bg-[#1414149c] hover:bg-[var(--white-icon-tr)] hover:scale-105"
      >
        <span className="md:text-lg text-md">More projects on</span>
        <GithubIcon />
      </a>

      {/* ── Modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#ffffff10] shadow-2xl"
            style={{ background: "rgba(16,16,16,0.92)", backdropFilter: "blur(24px)" }}
          >
            {/* Close button */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 flex items-center justify-center size-9 rounded-full bg-[#1414149c] border border-[#ffffff15] text-[var(--white-icon)] hover:text-white hover:bg-[var(--white-icon-tr)] transition duration-300"
              aria-label="Cerrar"
            >
              <CloseIcon />
            </button>

            {/* ── Hero image with title overlay ── */}
            <div className="relative h-52 md:h-72 overflow-hidden rounded-t-2xl flex-shrink-0">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              {/* gradient fade to panel bg */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#10101080] to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block mb-2 px-3 py-1 text-xs rounded-full bg-[#ffffff0d] border border-[#ffffff15] text-[var(--white-icon)]">
                  {selected.status}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {selected.title}
                </h2>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--white-icon)] mb-2">
                  Acerca del proyecto
                </p>
                <p className="text-[var(--white)] leading-relaxed text-[15px]">
                  {selected.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-[#ffffff10]" />

              {/* Tech stack */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--white-icon)] mb-3">
                  Construido con
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm rounded-full bg-[#1414149c] border border-[#ffffff10] text-[var(--white)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-[#ffffff10]" />

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={selected.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--white-icon)] text-[var(--white)] font-medium hover:bg-[#ffffff10] transition duration-300"
                >
                  <ExternalLinkIcon />
                  Visitar sitio
                </a>
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1414149c] border border-[#ffffff10] text-[var(--white-icon)] hover:text-white hover:bg-[var(--white-icon-tr)] transition duration-300"
                  >
                    <CodeIcon />
                    Ver código
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectModal;
