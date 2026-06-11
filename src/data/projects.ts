export type TilePosition = "top" | "center" | "bottom";

export interface Project {
  slug: string;
  title: string;
  image: string;
  preview: string;
  link: string;
  status: { en: string; es: string };
  description: { en: string; es: string };
  highlights?: { en: string; es: string }[];
  tech: string[];
  priority: number; // 1 = most important (largest tile)
  position: TilePosition; // content focal point within the tile
  gallery?: { src: string; caption: { en: string; es: string } }[];
}

export const projects: Project[] = [
  {
    slug: "promotoria",
    title: "PromotorIA",
    image: "/promotoria.png",
    preview: "https://promotoria.edgardev.mx/",
    link: "",
    status: { en: "In Development", es: "En Desarrollo" },
    description: {
      en: "PromotorIA is an AI-powered platform designed to automate and enhance digital marketing strategies. It enables teams and brands to intelligently create promotional campaigns, optimizing reach, conversion, and impact with minimal manual effort.",
      es: "PromotorIA es una plataforma impulsada por inteligencia artificial diseñada para automatizar y potenciar estrategias de marketing digital. Permite a equipos y marcas crear campañas promocionales de forma inteligente, optimizando el alcance, la conversión y el impacto con el mínimo esfuerzo manual.",
    },
    highlights: [
      {
        en: "AI-assisted campaign creation and copy generation",
        es: "Creación de campañas y generación de textos asistida por IA",
      },
      {
        en: "Built as a modern SPA with React and TypeScript",
        es: "Construida como una SPA moderna con React y TypeScript",
      },
      {
        en: "Node.js backend orchestrating the AI workflows",
        es: "Backend en Node.js orquestando los flujos de IA",
      },
    ],
    tech: ["React", "TypeScript", "TailwindCSS", "Node.js", "AI/ML"],
    priority: 1,
    position: "bottom",
  },
  {
    slug: "puyo-puyo-game",
    title: "Puyo Puyo Game",
    image: "",
    preview: "",
    link: "https://github.com/RodriguezIA/puyo-puyo-game",
    status: { en: "Completed", es: "Completado" },
    description: {
      en: "Java implementation of the classic Puyo Puyo puzzle game using Java Swing for the GUI. Features color-matching mechanics where groups of 4+ same-colored puyos are eliminated, gravity physics, keyboard controls, and a BFS algorithm for group detection.",
      es: "Implementación en Java del clásico juego de puzzles Puyo Puyo usando Java Swing para la interfaz gráfica. Incluye mecánicas de coincidencia de colores donde grupos de 4+ puyos del mismo color se eliminan, física de gravedad, controles por teclado y algoritmo BFS para detección de grupos.",
    },
    highlights: [
      {
        en: "BFS algorithm for detecting groups of connected puyos",
        es: "Algoritmo BFS para detectar grupos de puyos conectados",
      },
      {
        en: "Gravity physics and chain-reaction eliminations",
        es: "Física de gravedad y eliminaciones en cadena",
      },
      {
        en: "Keyboard-driven gameplay built with Java Swing",
        es: "Jugabilidad por teclado construida con Java Swing",
      },
    ],
    tech: ["Java", "Java Swing", "OpenJDK"],
    priority: 3,
    position: "bottom",
    gallery: [
      {
        src: "/projects/puyo/diagrama_busqueda.png",
        caption: {
          en: "Group search algorithm",
          es: "Algoritmo de búsqueda de grupos",
        },
      },
      {
        src: "/projects/puyo/diagrama_BFS.png",
        caption: { en: "BFS algorithm diagram", es: "Diagrama del algoritmo BFS" },
      },
    ],
  },
  {
    slug: "paddleocr-api",
    title: "PaddleOCR API",
    image: "",
    preview: "",
    link: "https://github.com/RodriguezIA/paddleOCR",
    status: { en: "Completed", es: "Completado" },
    description: {
      en: "FastAPI server for image text extraction using PaddleOCR v5. Processes images directly from URLs without file uploads, supports multi-language OCR (Spanish, English and more), confidence-based filtering, and auto-cleanup of temporary files. Includes full test coverage with pytest and httpx.",
      es: "Servidor FastAPI para extracción de texto en imágenes usando PaddleOCR v5. Procesa imágenes directamente desde URL sin necesidad de subir archivos, soporta OCR multi-idioma (español, inglés y más), filtrado por confianza y eliminación automática de archivos temporales. Incluye cobertura completa de pruebas con pytest y httpx.",
    },
    highlights: [
      {
        en: "Processes images directly from URLs — no file uploads needed",
        es: "Procesa imágenes directamente desde URL — sin subir archivos",
      },
      {
        en: "Multi-language OCR with confidence-based filtering",
        es: "OCR multi-idioma con filtrado por nivel de confianza",
      },
      {
        en: "Full test coverage with pytest and httpx",
        es: "Cobertura completa de pruebas con pytest y httpx",
      },
    ],
    tech: ["Python", "FastAPI", "PaddleOCR", "Pytest", "httpx"],
    priority: 2,
    position: "center",
  },
];

/** Fallback gradient background for tiles/headers with no image (warm palette) */
export const noImageBgs = [
  "bg-gradient-to-br from-[#2b1a12] via-[#1c120c] to-[#12100c]",
  "bg-gradient-to-br from-[#241c10] via-[#181208] to-[#100e0a]",
  "bg-gradient-to-br from-[#2a160e] via-[#1a100a] to-[#12100c]",
];

export const noImageGlow =
  "radial-gradient(circle at 25% 40%, #d97757 0%, transparent 55%), radial-gradient(circle at 75% 70%, #e3b341 0%, transparent 45%)";
