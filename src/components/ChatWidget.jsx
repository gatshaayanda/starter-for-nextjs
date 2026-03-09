"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, ExternalLink } from "lucide-react";

const STORAGE_KEY = "appwrite_demo_chat_history_v1";

function safeJsonParse(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function clampText(s, max = 1200) {
  const t = (s || "").trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const FALLBACKS = useMemo(
    () => [
      "I can help explain why Appwrite stands out for developers.",
      "Ask me about Appwrite’s features, auth, database, pricing, docs, or open-source advantages.",
      "Try one of the quick buttons below.",
    ],
    []
  );

  const DEFAULT_SUGGESTIONS = useMemo(
    () => [
      "Why Appwrite?",
      "Core features",
      "Authentication",
      "Database & storage",
      "Open source",
      "Read docs",
    ],
    []
  );

  useEffect(() => {
    try {
      const savedMsgs = safeJsonParse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(savedMsgs)) setMessages(savedMsgs);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (!open && messages.length) {
      const last = messages[messages.length - 1];
      if (last && last.sender === "bot") setUnread((u) => u + 1);
    }
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;

    setUnread(0);

    if (messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text:
            "Hi 👋 I’m the Appwrite demo assistant.\nI can help you understand why Appwrite is useful for modern app development.\n\nWhat would you like to know?",
        },
      ]);
      setSuggestions(DEFAULT_SUGGESTIONS);
    }

    const t = setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 120);

    return () => clearTimeout(t);
  }, [open, messages.length, DEFAULT_SUGGESTIONS]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const pushBot = (text, sugg) => {
    setMessages((p) => [...p, { sender: "bot", text: clampText(text, 1800) }]);
    setSuggestions(Array.isArray(sugg) ? sugg : []);
  };

  async function sendMessage(override) {
    const text = (override ?? input).trim();
    if (!text) return;

    setMessages((p) => [...p, { sender: "user", text }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/fake-bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json().catch(() => ({}));
      const botReply =
        (data?.reply || "").trim() ||
        FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
      const botSugg = Array.isArray(data?.suggestions) ? data.suggestions : [];

      setTyping(false);
      pushBot(botReply, botSugg.length ? botSugg : DEFAULT_SUGGESTIONS);
    } catch {
      setTyping(false);
      pushBot(
        FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)],
        DEFAULT_SUGGESTIONS
      );
    }
  }

  const onSuggestion = (s) => {
    if (s === "Read docs") {
      window.open("https://appwrite.io/docs", "_blank", "noopener,noreferrer");
      return;
    }

    if (s === "Open console") {
      window.open("https://cloud.appwrite.io", "_blank", "noopener,noreferrer");
      return;
    }

    if (s === "GitHub") {
      window.open("https://github.com/appwrite", "_blank", "noopener,noreferrer");
      return;
    }

    sendMessage(s);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="appwrite-launcher fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(253,54,110,0.98), rgba(240,46,101,0.92))",
            boxShadow: "0 14px 32px rgba(240,46,101,0.22)",
          }}
          aria-label="Open Appwrite demo chat"
        >
          <MessageCircle size={22} />
          {unread > 0 && (
            <span
              className="absolute -right-1 -top-1 rounded-full px-2 py-0.5 text-[11px] font-extrabold"
              style={{
                background: "rgba(15,23,42,0.95)",
                boxShadow: "0 8px 18px rgba(15,23,42,0.20)",
              }}
            >
              {unread}
            </span>
          )}
        </button>
      )}

      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-[#EDEDF0] bg-white shadow-2xl"
          style={{
            width: "min(92vw, 23rem)",
            height: "30rem",
            animation: "appwriteChatSlideIn 0.35s cubic-bezier(0.45,0,0.25,1)",
          }}
          role="dialog"
          aria-label="Appwrite demo assistant"
        >
          <div className="flex items-center justify-between border-b border-[#EDEDF0] bg-[#FAFAFB] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div
                className="grid h-8 w-8 place-items-center rounded-full text-[11px] font-extrabold text-[#FD366E]"
                style={{
                  background: "rgba(253,54,110,0.10)",
                  border: "1px solid rgba(253,54,110,0.20)",
                }}
              >
                AW
              </div>

              <div className="leading-tight">
                <div className="inline-flex items-center gap-2 text-sm font-extrabold text-[#2D2D31]">
                  Appwrite Demo Assistant
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#FD366E26] bg-[#FD366E14] px-2 py-0.5 text-[11px] text-[#FD366E]">
                    <Sparkles size={12} />
                    Quick help
                  </span>
                </div>
                <div className="mt-0.5 text-[11px] text-[#7A7A80]">
                  Online • Why Appwrite • Features • Docs
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-[#EDEDF0] bg-white hover:bg-[#F9F9FA]"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-2 overflow-y-auto bg-[#FAFAFB] p-3 text-sm">
            {messages.map((m, i) => {
              const isUser = m.sender === "user";
              return (
                <div key={i} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] whitespace-pre-line rounded-2xl border px-3 py-2 ${
                      isUser
                        ? "border-black/10 bg-black/5 text-[#2D2D31]"
                        : "border-[#EDEDF0] bg-white text-[#2D2D31]"
                    }`}
                    style={{
                      boxShadow: isUser ? "none" : "0 10px 22px rgba(2,6,23,0.06)",
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}

            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-[#EDEDF0] bg-white px-3 py-2 text-[#2D2D31]">
                  <span className="appwrite-typing-dot" />
                  <span
                    className="appwrite-typing-dot"
                    style={{ animationDelay: "120ms" }}
                  />
                  <span
                    className="appwrite-typing-dot"
                    style={{ animationDelay: "240ms" }}
                  />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-2 border-t border-[#EDEDF0] bg-white px-3 py-2">
              {suggestions.map((s, i) => (
                <button
                  key={`${s}-${i}`}
                  type="button"
                  onClick={() => onSuggestion(s)}
                  className="rounded-full border border-[#EDEDF0] px-3 py-1 text-xs text-[#2D2D31] transition hover:bg-[#F9F9FA]"
                >
                  {s}
                </button>
              ))}

              <a
                href="https://appwrite.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[#EDEDF0] px-3 py-1 text-xs text-[#2D2D31] transition hover:bg-[#F9F9FA]"
              >
                Docs <ExternalLink size={12} />
              </a>
            </div>
          )}

          <div className="flex gap-2 border-t border-[#EDEDF0] bg-white p-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask: Why Appwrite, auth, database, docs..."
              className="flex-1 rounded-xl border border-[#EDEDF0] bg-[#FAFAFB] px-3 py-2 text-sm text-[#2D2D31] outline-none focus:border-[#FD366E66]"
              aria-label="Type your message"
            />
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FD366E] px-4 py-2 text-white hover:opacity-90"
              onClick={() => sendMessage()}
              aria-label="Send message"
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes appwriteChatSlideIn {
          from {
            transform: translateY(18px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes appwriteTyping {
          0%,
          80%,
          100% {
            transform: scale(0);
            opacity: 0.35;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes appwriteLauncherBounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          15% {
            transform: translateY(-4px) scale(1.02);
          }
          30% {
            transform: translateY(0) scale(1);
          }
          45% {
            transform: translateY(-2px) scale(1.01);
          }
          60% {
            transform: translateY(0) scale(1);
          }
        }

        @keyframes appwriteLauncherPulse {
          0% {
            box-shadow: 0 14px 32px rgba(240, 46, 101, 0.22), 0 0 0 0 rgba(253, 54, 110, 0.18);
          }
          70% {
            box-shadow: 0 14px 32px rgba(240, 46, 101, 0.22), 0 0 0 14px rgba(253, 54, 110, 0);
          }
          100% {
            box-shadow: 0 14px 32px rgba(240, 46, 101, 0.22), 0 0 0 0 rgba(253, 54, 110, 0);
          }
        }

        .appwrite-launcher {
          animation:
            appwriteLauncherBounce 2.8s ease-in-out infinite,
            appwriteLauncherPulse 2.8s ease-out infinite;
          transform-origin: center;
        }

        .appwrite-launcher:hover {
          animation-play-state: paused;
          transform: scale(1.06);
        }

        .appwrite-typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin-right: 4px;
          background: linear-gradient(
            90deg,
            rgba(253, 54, 110, 0.95),
            rgba(240, 46, 101, 0.9)
          );
          border-radius: 999px;
          animation: appwriteTyping 1.35s infinite ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </>
  );
}