import React, { useState } from "react";

const CategoryIcons = {
  "Frontend Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z"></path>
    </svg>
  ),
  "Backend Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M5 12.5C5 12.8708 5.43533 13.3875 6.47329 13.8431C7.45439 14.2748 8.86764 14.5 10.5 14.5C12.1324 14.5 13.5456 14.2748 14.5267 13.8431C15.5647 13.3875 16 12.8708 16 12.5V10.3287C14.6807 11.0574 12.6289 11.5 10.5 11.5C8.37108 11.5 6.31928 11.0574 5 10.3287V12.5ZM16 14.8287C14.6807 15.5574 12.6289 16 10.5 16C8.37108 16 6.31928 15.5574 5 14.8287V17C5 17.3708 5.43533 17.8875 6.47329 18.3431C7.45439 18.7748 8.86764 19 10.5 19C12.1324 19 13.5456 18.7748 14.5267 18.3431C15.5647 17.8875 16 17.3708 16 17V14.8287ZM3 17V8.5C3 6.567 6.35786 5 10.5 5C14.6421 5 18 6.567 18 8.5V17C18 18.933 14.6421 20.5 10.5 20.5C6.35786 20.5 3 18.933 3 17ZM10.5 9.5C12.1324 9.5 13.5456 9.27477 14.5267 8.84315C15.5647 8.38754 16 7.87077 16 7.5C16 7.12923 15.5647 6.61246 14.5267 6.15685C13.5456 5.72523 12.1324 5.5 10.5 5.5C8.86764 5.5 7.45439 5.72523 6.47329 6.15685C5.43533 6.61246 5 7.12923 5 7.5C5 7.87077 5.43533 8.38754 6.47329 8.84315C7.45439 9.27477 8.86764 9.5 10.5 9.5Z"></path>
    </svg>
  ),
  "Despliegue y Mantenimiento": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20ZM13 12V7H11V13H17V11H13Z"></path>
    </svg>
  ),
};

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const skills = {
    "Frontend Development": [
      "Single Page Applications (SPAs)",
      "Landing pages y sitios corporativos",
      "Portafolios y sitios personales",
      "Diseño responsive con TailwindCSS",
    ],
    "Backend Development": [
      "APIs REST y GraphQL",
      "Servicios con Node.js, FastAPI y PHP",
      "Bases de datos SQL y NoSQL",
      "Autenticación y autorización",
    ],
    "Despliegue y Mantenimiento": [
      "Contenedores con Docker",
      "Administración de servidores Linux",
      "CI/CD y automatización",
      "Monitoreo y mantenimiento de servicios",
    ],
  };

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        What I do?
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {Object.entries(skills).map(([category, items]) => (
          <li key={category} className="w-full">
            <div
              onClick={() => toggleItem(category)}
              className="md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                {CategoryIcons[category]}
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-lg">
                      {category}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${
                      openItem === category ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-300 px-4 ${
                  openItem === category
                    ? "max-h-[500px] pb-4 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-1">•</span>
                      <li className="pl-3">{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
