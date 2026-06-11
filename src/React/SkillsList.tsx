import React, { useState, type ReactElement } from "react";
import { ui, defaultLang, type Lang } from "../i18n/ui";

const CategoryIcons: Record<string, ReactElement> = {
  frontend: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z" />
    </svg>
  ),
  backend: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M5 12.5C5 12.8708 5.43533 13.3875 6.47329 13.8431C7.45439 14.2748 8.86764 14.5 10.5 14.5C12.1324 14.5 13.5456 14.2748 14.5267 13.8431C15.5647 13.3875 16 12.8708 16 12.5V10.3287C14.6807 11.0574 12.6289 11.5 10.5 11.5C8.37108 11.5 6.31928 11.0574 5 10.3287V12.5ZM16 14.8287C14.6807 15.5574 12.6289 16 10.5 16C8.37108 16 6.31928 15.5574 5 14.8287V17C5 17.3708 5.43533 17.8875 6.47329 18.3431C7.45439 18.7748 8.86764 19 10.5 19C12.1324 19 13.5456 18.7748 14.5267 18.3431C15.5647 17.8875 16 17.3708 16 17V14.8287ZM3 17V8.5C3 6.567 6.35786 5 10.5 5C14.6421 5 18 6.567 18 8.5V17C18 18.933 14.6421 20.5 10.5 20.5C6.35786 20.5 3 18.933 3 17ZM10.5 9.5C12.1324 9.5 13.5456 9.27477 14.5267 8.84315C15.5647 8.38754 16 7.87077 16 7.5C16 7.12923 15.5647 6.61246 14.5267 6.15685C13.5456 5.72523 12.1324 5.5 10.5 5.5C8.86764 5.5 7.45439 5.72523 6.47329 6.15685C5.43533 6.61246 5 7.12923 5 7.5C5 7.87077 5.43533 8.38754 6.47329 8.84315C7.45439 9.27477 8.86764 9.5 10.5 9.5Z" />
    </svg>
  ),
  devops: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20ZM13 12V7H11V13H17V11H13Z" />
    </svg>
  ),
};

type CategoryKey = "frontend" | "backend" | "devops";
const categoryKeys: CategoryKey[] = ["frontend", "backend", "devops"];

interface Props {
  lang?: Lang;
}

const SkillsList = ({ lang = defaultLang }: Props) => {
  const t = (key: string): string => {
    const langUi = ui[lang] as Record<string, string>;
    const fallbackUi = ui[defaultLang] as Record<string, string>;
    return langUi[key] ?? fallbackUi[key] ?? key;
  };

  const [openKey, setOpenKey] = useState<CategoryKey | null>("frontend");

  return (
    <div className="text-left pt-3 md:pt-9 w-full">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold mb-4 md:mb-6">
        {t("skills.title")}
      </h3>

      <div className="space-y-3">
        {categoryKeys.map((key, idx) => {
          const isOpen = openKey === key;
          return (
            <div
              key={key}
              className={`rounded-2xl border overflow-hidden transition-colors duration-300 bg-[#1414149c] ${
                isOpen ? "border-[var(--sec)]" : "border-[var(--white-icon-tr)] hover:border-[var(--sec)]"
              }`}
            >
              {/* Cabecera del acordeón */}
              <button
                onClick={() => setOpenKey(isOpen ? null : key)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-3 px-5 py-4 cursor-pointer text-left group"
              >
                <span className="text-xs font-mono text-[var(--white-icon)] opacity-60">
                  0{idx + 1}
                </span>
                <span
                  className={`transition-colors duration-300 ${
                    isOpen ? "text-[var(--sec)]" : "text-[var(--white-icon)] group-hover:text-[var(--sec)]"
                  }`}
                >
                  {CategoryIcons[key]}
                </span>
                <span
                  className={`flex-1 font-semibold text-base md:text-lg transition-colors duration-300 ${
                    isOpen ? "text-[var(--white)]" : "text-[var(--white-icon)] group-hover:text-[var(--white)]"
                  }`}
                >
                  {t(`skills.cat.${key}`)}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isOpen ? "rotate-180 text-[var(--sec)]" : "text-[var(--white-icon)]"
                  }`}
                >
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" />
                </svg>
              </button>

              {/* Contenido colapsable (animación fluida con grid-rows) */}
              <div
                className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 pt-1 space-y-4">
                    <p
                      className={`text-sm text-[var(--white-icon)] leading-relaxed transition-all duration-500 delay-100 ${
                        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                      }`}
                    >
                      {t(`skills.desc.${key}`)}
                    </p>
                    <ul className="space-y-2">
                      {[0, 1, 2, 3].map((i) => (
                        <li
                          key={i}
                          className={`flex items-center text-sm text-[var(--white-icon)] transition-all duration-500 ${
                            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                          }`}
                          style={{ transitionDelay: isOpen ? `${150 + i * 70}ms` : "0ms" }}
                        >
                          <span className="text-[var(--sec)] flex-shrink-0 mr-3">▹</span>
                          {t(`skills.${key}.${i}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsList;
