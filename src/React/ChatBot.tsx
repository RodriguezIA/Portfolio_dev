import React, { useState, useRef, useEffect } from "react";
import { ui, defaultLang, type Lang } from "../i18n/ui";

// ⚠️  The API key is exposed client-side (PUBLIC_ prefix).
// This is acceptable for a personal portfolio — just keep usage limits on
// your DeepSeek account to avoid unexpected costs.
const API_KEY = (import.meta as any).env?.PUBLIC_DEEPSEEK_API_KEY as string | undefined;

const SYSTEM_PROMPT = `You are the personal portfolio assistant of Edgar Alan Rodriguez Amador, a Full Stack Software Developer based in Monterrey, Nuevo León, México.

About Edgar:
- Full Stack Developer since 2022, currently working as Senior/Freelance Full Stack Developer
- Computer Systems Engineering degree (2019–2023)
- Skills: React, TypeScript, TailwindCSS, Next.js, Astro, Node.js, FastAPI, Python, PHP, SQL, NoSQL, Docker, Linux, CI/CD
- Notable projects:
  • PromotorIA – AI-powered marketing automation platform (React, Node.js, AI/ML) – currently in development
  • Puyo Puyo Game – Java implementation with BFS algorithm for group detection
  • PaddleOCR API – FastAPI server for image text extraction with PaddleOCR v5
- Contact: edgaralanra@gmail.com | GitHub: github.com/RodriguezIA | LinkedIn: linkedin.com/in/edgar-alan-rodriguez-amador-3745b8148

Instructions:
- Answer questions about Edgar's skills, projects, and experience concisely (2–3 sentences max unless more detail is requested)
- If asked how to contact Edgar, provide his email and social links
- Be friendly, professional, and conversational
- Respond in the same language the user writes in (Spanish or English)
- Do not make up information not listed above`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  lang?: Lang;
}

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M3.47798 2.40466C3.20657 2.28506 2.88797 2.35 2.68314 2.55483C2.47831 2.75966 2.41337 3.07826 2.53297 3.34967L5.98344 11.2501H13.0001C13.5524 11.2501 14.0001 11.6978 14.0001 12.2501C14.0001 12.8024 13.5524 13.2501 13.0001 13.2501H5.9835L2.533 21.1506C2.4134 21.422 2.47834 21.7406 2.68317 21.9454C2.888 22.1503 3.2066 22.2152 3.47801 22.0956L21.978 14.0956C22.2445 13.9783 22.4134 13.7145 22.4134 13.4228C22.4134 13.1311 22.2446 12.8673 21.9781 12.75L3.47798 2.40466Z" />
  </svg>
);

const ChatBot: React.FC<Props> = ({ lang = defaultLang }) => {
  const t = (key: string): string => {
    const langUi = ui[lang] as Record<string, string>;
    const fallbackUi = ui[defaultLang] as Record<string, string>;
    return langUi[key] ?? fallbackUi[key] ?? key;
  };

  const greeting =
    lang === "es"
      ? "¡Hola! Soy el asistente de Edgar. Puedo contarte sobre sus proyectos, habilidades o experiencia. ¿En qué puedo ayudarte?"
      : "Hi! I'm Edgar's assistant. I can tell you about his projects, skills, or experience. How can I help?";

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip the initial render (greeting message) so the page doesn't auto-scroll on load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);

    if (!API_KEY) {
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "El chatbot aún no está configurado. Puedes contactar a Edgar directamente en edgaralanra@gmail.com"
              : "The chatbot isn't configured yet. You can reach Edgar directly at edgaralanra@gmail.com",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...next,
          ],
          max_tokens: 350,
          temperature: 0.7,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      const reply: string =
        data.choices?.[0]?.message?.content ?? t("chat.error");

      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col bg-[#1414149c] border border-[var(--white-icon-tr)] rounded-2xl overflow-hidden h-[500px]">
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--white-icon-tr)] flex-shrink-0">
        <div className="size-9 rounded-full bg-[var(--sec)] flex items-center justify-center text-[var(--background)] font-bold text-sm select-none">
          E
        </div>
        <div className="min-w-0">
          <p className="text-[var(--white)] text-sm font-semibold leading-none mb-1">
            Edgar's Assistant
          </p>
          <p className="text-[var(--white-icon)] text-xs truncate">
            {t("chat.online")}
          </p>
        </div>
        <span className="ml-auto size-2 rounded-full bg-emerald-500 flex-shrink-0 animate-pulse" />
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={[
                "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                msg.role === "user"
                  ? "bg-[var(--sec)] text-[var(--background)] rounded-br-sm font-medium"
                  : "bg-[#1c1c1c] border border-[var(--white-icon-tr)] text-[var(--white)] rounded-bl-sm",
              ].join(" ")}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1c1c1c] border border-[var(--white-icon-tr)] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
              <span className="size-1.5 bg-[var(--white-icon)] rounded-full animate-bounce [animation-delay:0ms]" />
              <span className="size-1.5 bg-[var(--white-icon)] rounded-full animate-bounce [animation-delay:150ms]" />
              <span className="size-1.5 bg-[var(--white-icon)] rounded-full animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ── */}
      <div className="px-4 py-4 border-t border-[var(--white-icon-tr)] flex-shrink-0">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("chat.placeholder")}
            disabled={loading}
            className="flex-1 bg-[#0d0d0d] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--sec)] transition-colors placeholder:text-[var(--white-icon)] disabled:opacity-50"
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label={t("chat.send")}
            className="size-10 flex-shrink-0 flex items-center justify-center bg-[var(--sec)] text-[var(--background)] rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-default"
          >
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
