import React from "react";

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) {
  // Base theme classes for layout continuity
  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-2xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  // Custom variant styling trees
  const variants = {
    // Royal Premium Action Button (Neon Cyan -> Electric Purple)
    primary:
      "bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] text-white hover:opacity-90 shadow-[0_0_20px_rgba(0,242,254,0.15)] hover:shadow-[0_0_25px_rgba(0,242,254,0.3)] active:scale-[0.98]",

    // Clean Content Box Surface Style
    secondary:
      "bg-[#0B0F19] border border-slate-800 text-white hover:border-[#00F2FE]/40 hover:text-white",

    // Muted Secondary Options
    ghost: "bg-transparent text-[#94A3B8] hover:text-white hover:bg-[#171E2E]",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {/* Loading Spinner Guard */}
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : null}

      {children}
    </button>
  );
}
