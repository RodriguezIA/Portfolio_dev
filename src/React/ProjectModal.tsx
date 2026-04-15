import React, { useState, useEffect, useRef } from "react";
import { ui, defaultLang, type Lang } from "../i18n/ui";

type TilePosition = "top" | "center" | "bottom";

interface Project {
  title: string;
  image: string;
  preview: string;
  link: string;
  status: { en: string; es: string };
  description: { en: string; es: string };
  tech: string[];
  priority: number;        // 1 = most important (largest tile)
  position: TilePosition;  // content focal point within the tile
  gallery?: { src: string; caption: { en: string; es: string } }[];
}

const projects: Project[] = [
  {
    title: "PromotorIA",
    image: "/promotoria.png",
    preview: "https://promotoria.edgardev.mx/",
    link: "",
    status: { en: "In Development", es: "En Desarrollo" },
    description: {
      en: "PromotorIA is an AI-powered platform designed to automate and enhance digital marketing strategies. It enables teams and brands to intelligently create promotional campaigns, optimizing reach, conversion, and impact with minimal manual effort.",
      es: "PromotorIA es una plataforma impulsada por inteligencia artificial diseñada para automatizar y potenciar estrategias de marketing digital. Permite a equipos y marcas crear campañas promocionales de forma inteligente, optimizando el alcance, la conversión y el impacto con el mínimo esfuerzo manual.",
    },
    tech: ["React", "TypeScript", "TailwindCSS", "Node.js", "AI/ML"],
    priority: 1,
    position: "bottom",
  },
  {
    title: "Puyo Puyo Game",
    image: "",
    preview: "",
    link: "https://github.com/RodriguezIA/puyo-puyo-game",
    status: { en: "Completed", es: "Completado" },
    description: {
      en: "Java implementation of the classic Puyo Puyo puzzle game using Java Swing for the GUI. Features color-matching mechanics where groups of 4+ same-colored puyos are eliminated, gravity physics, keyboard controls, and a BFS algorithm for group detection.",
      es: "Implementación en Java del clásico juego de puzzles Puyo Puyo usando Java Swing para la interfaz gráfica. Incluye mecánicas de coincidencia de colores donde grupos de 4+ puyos del mismo color se eliminan, física de gravedad, controles por teclado y algoritmo BFS para detección de grupos.",
    },
    tech: ["Java", "Java Swing", "OpenJDK"],
    priority: 3,
    position: "bottom",
    gallery: [
      {
        src: "/projects/puyo/diagrama_busqueda.png",
        caption: { en: "Group search algorithm", es: "Algoritmo de búsqueda de grupos" },
      },
      {
        src: "/projects/puyo/diagrama_BFS.png",
        caption: { en: "BFS algorithm diagram", es: "Diagrama del algoritmo BFS" },
      },
    ],
  },
  {
    title: "PaddleOCR API",
    image: "",
    preview: "",
    link: "https://github.com/RodriguezIA/paddleOCR",
    status: { en: "Completed", es: "Completado" },
    description: {
      en: "FastAPI server for image text extraction using PaddleOCR v5. Processes images directly from URLs without file uploads, supports multi-language OCR (Spanish, English and more), confidence-based filtering, and auto-cleanup of temporary files. Includes full test coverage with pytest and httpx.",
      es: "Servidor FastAPI para extracción de texto en imágenes usando PaddleOCR v5. Procesa imágenes directamente desde URL sin necesidad de subir archivos, soporta OCR multi-idioma (español, inglés y más), filtrado por confianza y eliminación automática de archivos temporales. Incluye cobertura completa de pruebas con pytest y httpx.",
    },
    tech: ["Python", "FastAPI", "PaddleOCR", "Pytest", "httpx"],
    priority: 2,
    position: "center",
  },
];

// ─── Tile helpers ───────────────────────────────────────────────────────────

/** Returns Tailwind span classes for a tile based on its priority */
const getTileSpan = (priority: number): string => {
  if (priority === 1) return "md:col-span-3 md:row-span-2";
  return ""; // priority 2+ = single cell (md:col-span-1 md:row-span-1 by default)
};

/** Mobile explicit height — removed at md+ so grid-auto-rows takes over */
const getMobileHeight = (priority: number): string => {
  if (priority === 1) return "h-[300px]";
  if (priority === 2) return "h-[200px]";
  return "h-[180px]";
};

/** Gradient overlay direction based on content focal point */
const getOverlay = (position: TilePosition): string => {
  if (position === "top")
    return "bg-gradient-to-b from-black/80 via-black/25 to-transparent";
  if (position === "center")
    return "bg-gradient-to-b from-black/50 via-black/20 to-black/55";
  return "bg-gradient-to-t from-black/88 via-black/40 to-transparent";
};

/** Flex alignment for tile content */
const getContentAlign = (position: TilePosition): string => {
  if (position === "top") return "justify-start pt-5";
  if (position === "center") return "justify-center";
  return "justify-end pb-5";
};

/** Fallback gradient background for tiles with no image */
const getNoImageBg = (index: number): string => {
  const bgs = [
    "bg-gradient-to-br from-[#1e1430] via-[#110d1e] to-[#0d0d18]",
    "bg-gradient-to-br from-[#0d1a1a] via-[#0a1214] to-[#0a0f18]",
    "bg-gradient-to-br from-[#1a1030] via-[#130e20] to-[#0d0d18]",
  ];
  return bgs[index % bgs.length];
};

// ─── Icon components ─────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
    <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z" />
  </svg>
);

const ExpandIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
    <path d="M3 3H10V5H6.41421L10.7071 9.29289L9.29289 10.7071L5 6.41421V10H3V3ZM14 3H21V10H19V6.41421L14.7071 10.7071L13.2929 9.29289L17.5858 5H14V3ZM3 14H5V17.5858L9.29289 13.2929L10.7071 14.7071L6.41421 19H10V21H3V14ZM21 14V21H14V19H17.5858L13.2929 14.7071L14.7071 13.2929L19 17.5858V14H21Z" />
  </svg>
);

// ─── Main component ──────────────────────────────────────────────────────────

interface Props {
  lang?: Lang;
}

const ProjectModal: React.FC<Props> = ({ lang = defaultLang }) => {
  const t = (key: string): string => {
    const langUi = ui[lang] as Record<string, string>;
    const fallbackUi = ui[defaultLang] as Record<string, string>;
    return langUi[key] ?? fallbackUi[key] ?? key;
  };

  const [selected, setSelected] = useState<Project | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelected(null); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const close = () => setSelected(null);

  // Sort by priority so CSS grid auto-places correctly
  const sorted = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <>
      {/* ── Bento tile grid ── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:[grid-auto-rows:215px]"
      >
        {sorted.map((project, idx) => (
          <div
            key={project.title}
            className={[
              "relative overflow-hidden rounded-2xl cursor-pointer group",
              "border border-[var(--white-icon-tr)] hover:border-[var(--sec)]",
              "transition-all duration-300",
              getMobileHeight(project.priority),
              "md:h-auto",
              getTileSpan(project.priority),
            ].join(" ")}
            onClick={() => setSelected(project)}
          >
            {/* Background */}
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className={[
                  "absolute inset-0 w-full h-full object-cover",
                  "transition-transform duration-500 group-hover:scale-[1.04]",
                  project.position === "top" ? "object-top" : project.position === "center" ? "object-center" : "object-bottom",
                ].join(" ")}
                loading="lazy"
              />
            ) : (
              <div className={`absolute inset-0 ${getNoImageBg(idx)}`}>
                {/* Subtle glow blobs for no-image tiles */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 40%, #a476ff 0%, transparent 55%), radial-gradient(circle at 75% 70%, #6b35d4 0%, transparent 45%)",
                  }}
                />
              </div>
            )}

            {/* Gradient overlay */}
            <div className={`absolute inset-0 ${getOverlay(project.position)}`} />

            {/* Content */}
            <div className={`absolute inset-0 flex flex-col px-5 ${getContentAlign(project.position)}`}>
              <span className="inline-flex mb-2 self-start px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-black/50 border border-white/10 text-white/70">
                {project.status[lang]}
              </span>
              <h4
                className={[
                  "font-bold text-white leading-tight",
                  project.priority === 1 ? "text-2xl md:text-3xl" : "text-lg",
                ].join(" ")}
              >
                {project.title}
              </h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech
                  .slice(0, project.priority === 1 ? 5 : 3)
                  .map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-black/55 border border-white/10 text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
              </div>
            </div>

            {/* Expand hint on hover */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="size-8 flex items-center justify-center rounded-full bg-black/60 border border-white/20 text-white/80">
                <ExpandIcon />
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
        className="w-full flex items-center justify-center gap-2 mt-6 text-[var(--white-icon)] hover:text-white transition duration-300 ease-in-out border border-[var(--white-icon-tr)] p-3 rounded-full bg-[#1414149c] hover:bg-[var(--white-icon-tr)] hover:scale-105"
      >
        <span className="md:text-lg text-md">{t("projects.more")}</span>
        <GithubIcon />
      </a>

      {/* ── Detail modal ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={selected.title}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
          <div
            ref={panelRef}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#ffffff10] shadow-2xl"
            style={{ background: "rgba(16,16,16,0.92)", backdropFilter: "blur(24px)" }}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 flex items-center justify-center size-9 rounded-full bg-[#1414149c] border border-[#ffffff15] text-[var(--white-icon)] hover:text-white hover:bg-[var(--white-icon-tr)] transition duration-300"
              aria-label="Cerrar"
            >
              <CloseIcon />
            </button>

            <div className="relative h-52 md:h-72 overflow-hidden rounded-t-2xl flex-shrink-0">
              {selected.image ? (
                <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
              ) : (
                <div className={`w-full h-full ${getNoImageBg(sorted.indexOf(selected))}`}>
                  <div
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25% 40%, #a476ff 0%, transparent 55%), radial-gradient(circle at 75% 70%, #6b35d4 0%, transparent 45%)",
                    }}
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#10101080] to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="inline-block mb-2 px-3 py-1 text-xs rounded-full bg-[#ffffff0d] border border-[#ffffff15] text-[var(--white-icon)]">
                  {selected.status[lang]}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">{selected.title}</h2>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--white-icon)] mb-2">
                  {t("projects.about")}
                </p>
                <p className="text-[var(--white)] leading-relaxed text-[15px]">
                  {selected.description[lang]}
                </p>
              </div>

              <div className="border-t border-[#ffffff10]" />

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--white-icon)] mb-3">
                  {t("projects.builtWith")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm rounded-full bg-[#1414149c] border border-[#ffffff10] text-[var(--white)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {selected.gallery && selected.gallery.length > 0 && (
                <>
                  <div className="border-t border-[#ffffff10]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[var(--white-icon)] mb-3">
                      Diagrams
                    </p>
                    <div className="flex flex-col gap-4">
                      {selected.gallery.map((item) => (
                        <div key={item.src}>
                          <img
                            src={item.src}
                            alt={item.caption[lang]}
                            className="w-full rounded-xl border border-[#ffffff10]"
                          />
                          <p className="mt-2 text-xs text-center text-[var(--white-icon)]">{item.caption[lang]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="border-t border-[#ffffff10]" />

              <div className="flex flex-wrap gap-3">
                {selected.preview && (
                  <a
                    href={selected.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--white-icon)] text-[var(--white)] font-medium hover:bg-[#ffffff10] transition duration-300"
                  >
                    <ExternalLinkIcon />
                    {t("projects.visit")}
                  </a>
                )}
                {selected.link && (
                  <a
                    href={selected.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1414149c] border border-[#ffffff10] text-[var(--white-icon)] hover:text-white hover:bg-[var(--white-icon-tr)] transition duration-300"
                  >
                    <CodeIcon />
                    {t("projects.code")}
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
