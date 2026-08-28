import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-[#0B0F19] px-5 py-20 sm:px-8 sm:py-28">
      {/* Ambient glow, echoes the Hero treatment to bookend the page */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#00F2FE] opacity-[0.12] blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[320px] w-[320px] translate-x-1/3 translate-y-1/3 rounded-full bg-[#7F00FF] opacity-[0.14] blur-[110px]" />

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-[#171E2E] px-4 py-1.5">
          <Sparkles size={14} className="text-[#00F2FE]" />
          <span className="text-xs font-medium text-[#94A3B8]">
            Free plan, no card required
          </span>
        </div>

        <h2 className="text-3xl font-bold leading-tight text-white sm:text-5xl">
          Import once. Publish everywhere.
        </h2>

        <p className="mt-4 max-w-md text-base text-[#94A3B8] sm:text-lg">
          Bring your Shopify catalog or your own media, preview it per platform,
          and schedule it in one pass. Start free today.
        </p>

        <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row">
          <button className="cursor-pointer group flex items-center gap-2 rounded-2xl bg-[#00F2FE] px-7 py-3.5 text-sm font-semibold text-[#0B0F19] transition-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]">
            Get started free
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

          <button
            onClick={() => {
              document
                .getElementById("pricing")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer rounded-2xl border border-slate-800 bg-transparent px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-[#7F00FF] hover:text-[#7F00FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F00FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            See pricing
          </button>
        </div>

        <p className="mt-6 text-xs text-[#94A3B8]">
          Upgrade to Pro anytime for ₹1000/month to unlock video.
        </p>
      </div>
    </section>
  );
}
