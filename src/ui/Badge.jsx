import React from "react";

export default function Badge({
  children,
  variant = "cyan",
  className = "",
  ...props
}) {
  const baseStyle =
    "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border uppercase";

  const variants = {
    // Neon Cyan Active Accent
    cyan: "bg-[#00F2FE]/10 text-[#00F2FE] border-[#00F2FE]/20",

    // Pro Tier Electric Purple Accent
    purple: "bg-[#7F00FF]/10 text-[#A78BFA] border-[#7F00FF]/20",

    // Operational Success Accent
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

    // Muted System Status Accent
    muted: "bg-slate-800/50 text-[#94A3B8] border-slate-800",
  };

  return (
    <span
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
