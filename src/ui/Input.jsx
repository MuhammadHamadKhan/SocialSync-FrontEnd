import React from "react";

export default function Input({
  icon: Icon,
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={`w-full space-y-2 ${className}`}>
      {/* Label - Theme Compliant Muted Blue-Grey */}
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          {label}
        </label>
      )}

      {/* Input Field Container */}
      <div className="relative rounded-2xl">
        {/* Left-Aligned Micro Icon */}
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#94A3B8] transition-colors group-focus-within:text-[#00F2FE]">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {/* Main Form Field Control */}
        <input
          className={`
            w-full 
            ${Icon ? "pl-11" : "px-4"} 
            pr-4 
            py-3 
            rounded-2xl 
            bg-[#0B0F19] 
            border 
            ${error ? "border-red-500/50 focus:border-red-500" : "border-slate-800 focus:border-[#00F2FE]"} 
            text-white 
            placeholder-[#94A3B8]/50 
            text-sm 
            focus:outline-none 
            focus:ring-1 
            ${error ? "focus:ring-red-500" : "focus:ring-[#00F2FE]"} 
            transition-all 
            duration-200
          `}
          {...props}
        />
      </div>

      {/* Error Messaging Guard */}
      {error && (
        <p className="text-xs font-medium text-red-400 pl-1">{error}</p>
      )}
    </div>
  );
}
