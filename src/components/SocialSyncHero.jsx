import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Play,
  Camera,
  Music2,
  ShoppingBag,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const platforms = [
  { icon: Camera, label: "Instagram", offset: 0 },
  { icon: Music2, label: "TikTok", offset: 1 },
  { icon: ShoppingBag, label: "Shopify", offset: 2 },
  { icon: MessageCircle, label: "X", offset: 3 },
];

export default function SocialSyncHero() {
  const [activeCard, setActiveCard] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const id = setInterval(() => {
      setActiveCard((c) => (c + 1) % platforms.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Ambient glow field */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "#00F2FE" }}
      />
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-[480px] h-[480px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "#7F00FF" }}
      />

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-[#171E2E] px-3 py-1.5 text-xs font-medium text-[#94A3B8] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            Now syncing with Shopify
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
            One queue.
            <br />
            <span className="bg-linear-to-r from-[#00F2FE] to-[#7F00FF] bg-clip-text text-transparent">
              Every platform.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94A3B8] max-w-md mb-8 leading-relaxed">
            Pull products straight from Shopify or drop in your own media, then
            publish everywhere from a single studio. No more tab-switching
            between five different schedulers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <button
              onClick={() => {
                navigate("/register");
              }}
              className=" cursor-pointer group rounded-2xl px-6 py-3.5 font-medium bg-linear-to-r from-[#00F2FE] to-[#7F00FF] text-[#0B0F19] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              Start scheduling free
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>
            <button
              onClick={() => {
                document
                  .getElementById("dashboard")
                  .scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="cursor-pointer rounded-2xl px-6 py-3.5 font-medium border border-slate-800 bg-[#171E2E] flex items-center justify-center gap-2 hover:border-slate-700 transition-colors"
            >
              <Play size={16} />
              Watch demo
            </button>
          </div>

          <p className="text-xs text-[#94A3B8]">
            No credit card required · Free for your first 10 posts
          </p>
        </div>

        {/* Right: signature visual — publish queue */}
        <div className="relative h-[420px] flex items-center justify-center">
          <div className="relative w-full max-w-sm h-full">
            {platforms.map((p, i) => {
              const Icon = p.icon;
              const isActive = i === activeCard;
              const stackPos =
                (i - activeCard + platforms.length) % platforms.length;
              return (
                <div
                  key={p.label}
                  className="absolute inset-x-0 mx-auto rounded-2xl border bg-[#171E2E] p-5 transition-all duration-700 ease-out"
                  style={{
                    top: `${stackPos * 26}px`,
                    zIndex: platforms.length - stackPos,
                    transform: `scale(${1 - stackPos * 0.05}) translateY(${stackPos * 4}px)`,
                    borderColor: isActive ? "#00F2FE55" : "#1e293b",
                    boxShadow: isActive
                      ? "0 0 40px -8px #00F2FE40, 0 0 0 1px #00F2FE20"
                      : "none",
                    opacity: stackPos > 2 ? 0 : 1,
                    width: "100%",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-9 h-9 rounded-2xl flex items-center justify-center"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, #00F2FE, #7F00FF)"
                            : "#0B0F19",
                        }}
                      >
                        <Icon
                          size={16}
                          className={
                            isActive ? "text-[#0B0F19]" : "text-[#94A3B8]"
                          }
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{p.label}</p>
                        <p className="text-xs text-[#94A3B8]">
                          {isActive ? "Publishing now" : "Queued"}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
                    )}
                  </div>
                  <div className="w-full rounded-xl bg-[#0B0F19] border border-slate-800 p-3 flex gap-3">
                    <div
                      className="w-16 h-16 rounded-lg flex-shrink-0 relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(135deg, #00F2FE22, #7F00FF33)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/40 to-transparent" />
                      <div
                        className="absolute bottom-1.5 left-1.5 right-1.5 h-1 rounded-full"
                        style={{ background: isActive ? "#00F2FE" : "#334155" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center gap-1.5">
                      <div className="h-2 rounded-full bg-slate-700 w-full" />
                      <div className="h-2 rounded-full bg-slate-800 w-3/4" />
                      <div className="flex items-center gap-3 mt-1.5">
                        <div className="h-1.5 w-8 rounded-full bg-slate-800" />
                        <div className="h-1.5 w-5 rounded-full bg-slate-800" />
                        <div className="h-1.5 w-5 rounded-full bg-slate-800" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
