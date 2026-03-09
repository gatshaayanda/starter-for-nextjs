"use client";

import { useEffect, useState } from "react";

export default function AppwriteLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fade = setTimeout(() => setFading(true), 1800);
    const hide = setTimeout(() => setVisible(false), 2600);

    return () => {
      clearTimeout(fade);
      clearTimeout(hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading Why Appwrite demo"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-[900ms] ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(900px 500px at 20% 0%, rgba(253,54,110,0.10), transparent 55%), radial-gradient(900px 500px at 80% 10%, rgba(240,46,101,0.08), transparent 55%), #FAFAFB",
        color: "#2D2D31",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="relative mb-6 h-28 w-28">
        <svg
          viewBox="0 0 64 64"
          className="absolute inset-0 scale-y-[-1] translate-y-8 opacity-10 blur-sm"
        >
          <rect
            x="10"
            y="10"
            width="44"
            height="44"
            rx="14"
            fill="rgba(253,54,110,0.35)"
          />
          <path
            d="M22 42 L32 20 L42 42"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <svg viewBox="0 0 64 64" width="112" height="112" className="animate-float drop-glow">
          <defs>
            <linearGradient id="awTile" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FD366E" />
              <stop offset="100%" stopColor="#F02E65" />
            </linearGradient>

            <linearGradient id="awLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.82)" />
            </linearGradient>

            <radialGradient id="awGlow" cx="50%" cy="90%" r="65%">
              <stop offset="0%" stopColor="rgba(253,54,110,0.35)" />
              <stop offset="55%" stopColor="rgba(253,54,110,0.14)" />
              <stop offset="100%" stopColor="rgba(253,54,110,0)" />
            </radialGradient>
          </defs>

          <rect
            x="10"
            y="10"
            width="44"
            height="44"
            rx="14"
            fill="url(#awTile)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.2"
          />

          <ellipse cx="32" cy="50" rx="16" ry="8" fill="url(#awGlow)" opacity="0.9" />

          <path
            d="M22 42 L32 20 L42 42"
            fill="none"
            stroke="url(#awLine)"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <circle cx="32" cy="32" r="2.8" fill="rgba(255,255,255,0.95)" />
        </svg>
      </div>

      <div className="fade-in-text font-[Poppins] text-[1.05rem] font-semibold uppercase tracking-[0.22em] sm:text-[1.15rem]">
        Why Appwrite
      </div>

      <div className="fade-in-delayed mt-2 text-xs tracking-[0.24em] text-[#FD366E] sm:text-sm">
        auth • database • storage • developer control
      </div>

      <div className="mt-8 h-1.5 w-52 overflow-hidden rounded-full bg-black/10">
        <span
          className="shimmer block h-full w-1/3"
          style={{
            background:
              "linear-gradient(90deg, #FD366E, #F02E65, #ff7aa3, #FD366E)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-150%);
          }
          50% {
            transform: translateX(30%);
          }
          100% {
            transform: translateX(150%);
          }
        }

        .shimmer {
          animation: shimmer 2s cubic-bezier(0.45, 0, 0.25, 1) infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-float {
          animation: float 4.5s cubic-bezier(0.45, 0, 0.25, 1) infinite;
        }

        .drop-glow {
          filter: drop-shadow(0 14px 26px rgba(240, 46, 101, 0.18))
            drop-shadow(0 0 18px rgba(253, 54, 110, 0.18));
        }

        @keyframes fadeInText {
          0% {
            opacity: 0;
            letter-spacing: 0.34em;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            letter-spacing: 0.18em;
            transform: translateY(0);
          }
        }

        .fade-in-text {
          animation: fadeInText 1.2s cubic-bezier(0.45, 0, 0.25, 1) forwards;
        }

        .fade-in-delayed {
          opacity: 0;
          animation: fadeInText 1.2s cubic-bezier(0.45, 0, 0.25, 1) 0.3s forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}