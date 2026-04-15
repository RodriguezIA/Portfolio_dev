import React, { useState, useRef, useEffect, useCallback } from "react";
import { ui, defaultLang, type Lang } from "../i18n/ui";

// ⚠️  The API key is exposed client-side (PUBLIC_ prefix).
// Acceptable for a personal portfolio — keep usage limits on your DeepSeek account.
const API_KEY = (import.meta as any).env?.PUBLIC_DEEPSEEK_API_KEY as string | undefined;

// ── Constants ─────────────────────────────────────────────────────────────────

const SESSION_KEY = "ea_chat_session";
const LIMIT_KEY = "ea_chat_limit";
const TIMEOUT_MS = 30 * 60 * 1000; // 30 min inactivity → session expires
const MAX_DAILY = 3;

// ── Session & rate-limit helpers ──────────────────────────────────────────────

interface StoredMessage {
  role: "user" | "assistant";
  content: string;
}

interface StoredSession {
  id: string;
  messages: StoredMessage[];
  lastActivity: number;
  ended: boolean;
}

interface DailyLimit {
  count: number;
  date: string;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function loadSession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const s: StoredSession = JSON.parse(raw);
    if (Date.now() - s.lastActivity > TIMEOUT_MS) return null;
    return s;
  } catch {
    return null;
  }
}

function saveSession(s: StoredSession): void {
  try { localStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch {}
}

function clearSession(): void {
  try { localStorage.removeItem(SESSION_KEY); } catch {}
}

function loadLimit(): DailyLimit {
  try {
    const raw = localStorage.getItem(LIMIT_KEY);
    if (!raw) return { count: 0, date: todayStr() };
    const l: DailyLimit = JSON.parse(raw);
    return l.date === todayStr() ? l : { count: 0, date: todayStr() };
  } catch {
    return { count: 0, date: todayStr() };
  }
}

function bumpLimit(): DailyLimit {
  const l = { count: loadLimit().count + 1, date: todayStr() };
  try { localStorage.setItem(LIMIT_KEY, JSON.stringify(l)); } catch {}
  return l;
}

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are the portfolio assistant for Edgar Alan Rodriguez Amador, a Full Stack Software Developer based in Monterrey, México.

Your ONLY two purposes are:
1. Explain Edgar's projects — describe them in detail and answer follow-up questions naturally.
2. Help visitors contact Edgar or relay a message to him.

If the user asks about anything else, acknowledge it kindly and redirect back to one of these two topics.

EDGAR'S BACKGROUND (for context only — don't recite this unless relevant):
- Currently Software Developer at Jelp (Mar 2025 – present), on-site in Monterrey.
- Previously Software Engineer at Industrial Code (Jan 2022 – Mar 2025), led product development using React, TypeScript, FastAPI, PyTorch, Node.js, SQL/NoSQL.
- Freelance Frontend Developer at Tresite (Sep–Dec 2023), remote side project.
- Development Intern at NukleOS® (May 2021 – Jan 2022).
- Software Developer Intern at BLUIT S.R.L. (Jan–May 2020), built a Java/Spring Boot geolocation API for a delivery app.

EDGAR'S PROJECTS:
• PromotorIA — AI-powered marketing automation platform. Stack: React, Node.js, AI/ML integrations. Currently in active development. Helps businesses automate their marketing workflows using AI.
• Puyo Puyo Game — Java desktop game replicating Puyo Puyo mechanics. Uses BFS algorithm to detect connected groups of same-color pieces. Demonstrates data structures and game logic.
• PaddleOCR API — FastAPI server that exposes PaddleOCR v5 for image-to-text extraction. Designed for easy Docker deployment and integration into other services.

HOW TO CONTACT EDGAR:
• Email: edgaralanra@gmail.com
• GitHub: github.com/RodriguezIA
• LinkedIn: linkedin.com/in/edgar-alan-rodriguez-amador-3745b8148
If the user wants to leave a message for Edgar, collect their name and message, then show them the email link.

CONVERSATION RULES:
- Be warm, natural, and concise. Use short paragraphs — each idea in its own paragraph, separated by a blank line.
- Ask follow-up questions to keep the dialogue flowing naturally.
- Guide the user: if they haven't specified a topic, ask whether they'd like to know about Edgar's projects or how to contact him.
- When the conversation reaches a natural conclusion (user says goodbye, thanks, or their need is fully met), close warmly AND append the exact token [END] at the very end of your message — no space before it.
- Do NOT append [END] while the conversation is still ongoing.
- Respond in the same language the user writes in (Spanish or English).`;

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  lang?: Lang;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Render text with **bold** support and newline preservation */
function renderText(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <span style={{ whiteSpace: "pre-line" }}>
      {parts.map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part
      )}
    </span>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M3.47798 2.40466C3.20657 2.28506 2.88797 2.35 2.68314 2.55483C2.47831 2.75966 2.41337 3.07826 2.53297 3.34967L5.98344 11.2501H13.0001C13.5524 11.2501 14.0001 11.6978 14.0001 12.2501C14.0001 12.8024 13.5524 13.2501 13.0001 13.2501H5.9835L2.533 21.1506C2.4134 21.422 2.47834 21.7406 2.68317 21.9454C2.888 22.1503 3.2066 22.2152 3.47801 22.0956L21.978 14.0956C22.2445 13.9783 22.4134 13.7145 22.4134 13.4228C22.4134 13.1311 22.2446 12.8673 21.9781 12.75L3.47798 2.40466Z" />
  </svg>
);

const TypingIndicator = () => (
  <div className="flex justify-start">
    <div className="bg-[#1c1c1c] border border-[var(--white-icon-tr)] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
      <span className="size-1.5 bg-[var(--white-icon)] rounded-full animate-bounce [animation-delay:0ms]" />
      <span className="size-1.5 bg-[var(--white-icon)] rounded-full animate-bounce [animation-delay:150ms]" />
      <span className="size-1.5 bg-[var(--white-icon)] rounded-full animate-bounce [animation-delay:300ms]" />
    </div>
  </div>
);

interface BubbleProps {
  role: "user" | "assistant";
  content: string;
  showCursor?: boolean;
}

const Bubble: React.FC<BubbleProps> = ({ role, content, showCursor }) => (
  <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
    <div
      className={[
        "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
        role === "user"
          ? "bg-[var(--sec)] text-[var(--background)] rounded-br-sm font-medium"
          : "bg-[#1c1c1c] border border-[var(--white-icon-tr)] text-[var(--white)] rounded-bl-sm",
      ].join(" ")}
    >
      {renderText(content)}
      {showCursor && (
        <span className="inline-block w-[2px] h-[13px] bg-[var(--white-icon)] ml-[2px] align-middle animate-pulse" />
      )}
    </div>
  </div>
);

// ── Component ─────────────────────────────────────────────────────────────────

const ChatBot: React.FC<Props> = ({ lang = defaultLang }) => {
  const t = (key: string): string => {
    const langUi = ui[lang] as Record<string, string>;
    const fallbackUi = ui[defaultLang] as Record<string, string>;
    return langUi[key] ?? fallbackUi[key] ?? key;
  };

  const greeting =
    lang === "es"
      ? "¡Hola! Soy el asistente de Edgar. Puedo contarte sobre sus proyectos o ayudarte a ponerte en contacto con él. ¿Qué te gustaría saber?"
      : "Hi! I'm Edgar's assistant. I can tell you about his projects or help you get in touch with him. What would you like to know?";

  // ── State ──────────────────────────────────────────────────────────────────

  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greeting },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  // Streaming bubbles: sealed = completed paragraphs, active = paragraph being typed
  const [sealedBubbles, setSealedBubbles] = useState<string[]>([]);
  const [activeBubble, setActiveBubble] = useState("");

  const [sessionEnded, setSessionEnded] = useState(false);
  const [chatsLeft, setChatsLeft] = useState(MAX_DAILY);
  const [reachedLimit, setReachedLimit] = useState(false);

  const sessionRef = useRef<StoredSession | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  // ── Init ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const existing = loadSession();
    const limit = loadLimit();
    const remaining = Math.max(0, MAX_DAILY - limit.count);
    setChatsLeft(remaining);

    if (existing) {
      sessionRef.current = existing;
      setMessages([
        { role: "assistant", content: greeting },
        ...existing.messages,
      ]);
      if (existing.ended) setSessionEnded(true);
    } else if (remaining === 0) {
      setReachedLimit(true);
    }
  }, []);

  // ── Auto-scroll ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sealedBubbles, activeBubble, isStreaming]);

  // ── New conversation ───────────────────────────────────────────────────────

  const startNewChat = useCallback(() => {
    clearSession();
    sessionRef.current = null;
    setMessages([{ role: "assistant", content: greeting }]);
    setSessionEnded(false);
    const limit = loadLimit();
    const remaining = Math.max(0, MAX_DAILY - limit.count);
    setChatsLeft(remaining);
    if (remaining === 0) {
      setReachedLimit(true);
    } else {
      setReachedLimit(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [greeting]);

  // ── Send ───────────────────────────────────────────────────────────────────

  const send = async () => {
    const text = input.trim();
    if (!text || isStreaming || sessionEnded) return;

    // Create session on first message
    let session = sessionRef.current;
    if (!session) {
      const limit = loadLimit();
      if (limit.count >= MAX_DAILY) { setReachedLimit(true); return; }
      session = {
        id: Math.random().toString(36).slice(2) + Date.now().toString(36),
        messages: [],
        lastActivity: Date.now(),
        ended: false,
      };
      const newLimit = bumpLimit();
      setChatsLeft(Math.max(0, MAX_DAILY - newLimit.count));
      sessionRef.current = session;
    }

    setInput("");
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);
    setSealedBubbles([]);
    setActiveBubble("");

    const updatedSessionMsgs: StoredMessage[] = [
      ...session.messages,
      { role: "user", content: text },
    ];
    session.messages = updatedSessionMsgs;
    session.lastActivity = Date.now();
    saveSession(session);

    // No API key fallback
    if (!API_KEY) {
      const fallback =
        lang === "es"
          ? "El chatbot aún no está configurado. Puedes contactar a Edgar directamente en edgaralanra@gmail.com"
          : "The chatbot isn't configured yet. You can reach Edgar directly at edgaralanra@gmail.com";
      await new Promise((r) => setTimeout(r, 600)); // brief typing delay
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
      session.messages.push({ role: "assistant", content: fallback });
      saveSession(session);
      setIsStreaming(false);
      return;
    }

    // ── Streaming request ────────────────────────────────────────────────────

    // Local accumulators (not state, to avoid stale closures)
    let localSealed: string[] = [];
    let localActive = "";

    const sealParagraph = (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      localSealed = [...localSealed, trimmed];
      setSealedBubbles([...localSealed]);
      localActive = "";
      setActiveBubble("");
    };

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
            ...updatedSessionMsgs,
          ],
          max_tokens: 500,
          temperature: 0.75,
          stream: true,
        }),
      });

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let lineBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const rawLines = (lineBuffer + chunk).split("\n");
        lineBuffer = rawLines.pop() ?? "";

        for (const line of rawLines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            const delta: string = parsed.choices?.[0]?.delta?.content ?? "";
            if (!delta) continue;

            // Check for paragraph breaks in the incoming delta
            if (delta.includes("\n\n")) {
              const parts = (localActive + delta).split("\n\n");
              // All but the last are complete paragraphs → seal them
              for (let i = 0; i < parts.length - 1; i++) {
                sealParagraph(parts[i]);
              }
              // The last part is the new active bubble
              localActive = parts[parts.length - 1];
            } else {
              localActive += delta;
            }

            setActiveBubble(localActive);
          } catch {
            // Malformed SSE chunk — skip
          }
        }
      }

      // ── Stream finished ──────────────────────────────────────────────────

      // Seal the last active bubble if it has content
      if (localActive.trim()) {
        localSealed = [...localSealed, localActive.trim()];
      }

      // Detect [END] signal in last bubble
      let conversationEnded = false;
      if (localSealed.length > 0) {
        const last = localSealed[localSealed.length - 1];
        if (last.includes("[END]")) {
          localSealed[localSealed.length - 1] = last.replace(/\[END\]/g, "").trim();
          conversationEnded = true;
        }
      }

      // Filter empties and commit to messages
      const finalBubbles = localSealed.filter((b) => b.trim());
      const newMessages: Message[] = finalBubbles.map((content) => ({
        role: "assistant" as const,
        content,
      }));

      // Save full response to session (joined for API context)
      const fullText = finalBubbles.join("\n\n");
      session.messages.push({ role: "assistant", content: fullText });
      session.lastActivity = Date.now();

      if (conversationEnded) {
        session.ended = true;
        setSessionEnded(true);
      }

      saveSession(session);

      // Commit — clear streaming state and add messages atomically
      setMessages((prev) => [...prev, ...newMessages]);
      setSealedBubbles([]);
      setActiveBubble("");
      setIsStreaming(false);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.error") },
      ]);
      setSealedBubbles([]);
      setActiveBubble("");
      setIsStreaming(false);
    }

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // ── Derived ────────────────────────────────────────────────────────────────

  const isActive = sessionRef.current !== null && !sessionEnded;
  const showTypingIndicator = isStreaming && !activeBubble && sealedBubbles.length === 0;

  const statusText = sessionEnded
    ? t("chat.status_ended")
    : reachedLimit
    ? t("chat.status_limited")
    : t("chat.online");

  // ── Render ─────────────────────────────────────────────────────────────────

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
          <p className="text-[var(--white-icon)] text-xs truncate">{statusText}</p>
        </div>
        <span
          className={`ml-auto size-2 rounded-full flex-shrink-0 transition-colors ${
            sessionEnded || reachedLimit
              ? "bg-gray-500"
              : "bg-emerald-500 animate-pulse"
          }`}
        />
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
        {/* Committed messages */}
        {messages.map((msg, i) => (
          <Bubble key={i} role={msg.role} content={msg.content} />
        ))}

        {/* Streaming bubbles */}
        {isStreaming && (
          <>
            {/* Sealed paragraphs from this stream */}
            {sealedBubbles.map((content, i) => (
              <Bubble key={`s${i}`} role="assistant" content={content} />
            ))}

            {/* Active paragraph being typed */}
            {activeBubble ? (
              <Bubble role="assistant" content={activeBubble} showCursor />
            ) : (
              /* Waiting for first token */
              showTypingIndicator && <TypingIndicator />
            )}
          </>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-4 border-t border-[var(--white-icon-tr)] flex-shrink-0 space-y-2">

        {reachedLimit && !sessionRef.current ? (
          <p className="text-center text-xs text-[var(--white-icon)] py-1">
            {t("chat.daily_limit")}
          </p>

        ) : sessionEnded ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs text-[var(--white-icon)]">{t("chat.ended_msg")}</p>
            {chatsLeft > 0 ? (
              <button
                onClick={startNewChat}
                className="text-xs px-4 py-2 rounded-xl bg-[var(--sec)] text-[var(--background)] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
              >
                {t("chat.new_chat")} · {chatsLeft} {t("chat.chats_left")}
              </button>
            ) : (
              <p className="text-xs text-[var(--white-icon)] opacity-60">
                {t("chat.daily_limit")}
              </p>
            )}
          </div>

        ) : (
          <div className="flex gap-2 items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chat.placeholder")}
              disabled={isStreaming}
              className="flex-1 bg-[#0d0d0d] text-[var(--white)] border border-[var(--white-icon-tr)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[var(--sec)] transition-colors placeholder:text-[var(--white-icon)] disabled:opacity-50"
            />
            <button
              onClick={send}
              disabled={isStreaming || !input.trim()}
              aria-label={t("chat.send")}
              className="size-10 flex-shrink-0 flex items-center justify-center bg-[var(--sec)] text-[var(--background)] rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              <SendIcon />
            </button>
          </div>
        )}

        {isActive && (
          <p className="text-center text-xs text-[var(--white-icon)] opacity-50">
            {chatsLeft} {t("chat.remaining_today")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
