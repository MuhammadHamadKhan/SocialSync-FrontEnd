import React from "react";
import {
  ShoppingBag,
  Wand2,
  Send,
  ArrowRight,
  Image as ImageIcon,
  Smartphone,
  ListChecks,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    label: "01",
    title: "Import",
    desc: "Pull products straight from Shopify, or drop in your own photos and video.",
  },
  {
    icon: Wand2,
    label: "02",
    title: "Customize",
    desc: "Write captions per platform and preview exactly how each post will look.",
  },
  {
    icon: Send,
    label: "03",
    title: "Publish",
    desc: "Send now or queue it. SocialSync handles the timing across every account.",
  },
];

export default function SocialSyncFeatures() {
  return (
    <section
      id="features"
      className="w-full bg-[#0B0F19] text-white py-8 px-5 sm:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-[#171E2E] px-3 py-1.5 text-xs font-medium text-[#94A3B8] mb-5">
            How it works
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
            From product page to feed,{" "}
            <span className="bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] bg-clip-text text-transparent">
              in three steps.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
            No separate tools for sourcing, editing, and scheduling. SocialSync
            is the one place that carries a post from idea to published.
          </p>
        </div>

        {/* Step rail */}
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="relative rounded-2xl border border-slate-800 bg-[#171E2E] p-6 sm:p-8"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-11 h-11 rounded-2xl bg-[#0B0F19] border border-slate-800 flex items-center justify-center">
                    <Icon size={18} className="text-[#00F2FE]" />
                  </div>
                  <span className="text-xs font-mono text-[#94A3B8] tracking-wider">
                    {step.label}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {step.desc}
                </p>

                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-[26px] -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#0B0F19] border border-slate-800 items-center justify-center">
                    <ArrowRight size={13} className="text-[#94A3B8]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Supporting feature pair */}
        <div className="grid md:grid-cols-2 gap-5 mt-14">
          <div className="rounded-2xl border border-slate-800 bg-[#171E2E] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#00F2FE]/20 to-[#7F00FF]/20 border border-slate-800">
              <Smartphone size={20} className="text-[#00F2FE]" />
            </div>
            <div>
              <h4 className="font-semibold mb-1.5 flex items-center gap-1.5">
                Live preview, every platform
                <ArrowUpRight size={14} className="text-[#94A3B8]" />
              </h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                See the exact crop, caption length, and layout for each network
                before anything goes out — no surprises after you hit publish.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#171E2E] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#00F2FE]/20 to-[#7F00FF]/20 border border-slate-800">
              <ListChecks size={20} className="text-[#7F00FF]" />
            </div>
            <div>
              <h4 className="font-semibold mb-1.5 flex items-center gap-1.5">
                One queue, every account
                <ArrowUpRight size={14} className="text-[#94A3B8]" />
              </h4>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Stop switching tabs between platform-native schedulers. Reorder,
                reschedule, or pause a post from a single timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
