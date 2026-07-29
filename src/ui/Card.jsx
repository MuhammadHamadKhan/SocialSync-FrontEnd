import React from "react";

export default function Card({
  children,
  hoverEffect = false,
  className = "",
  ...props
}) {
  return (
    <div
      className={`
        bg-[#171E2E] 
        border 
        border-slate-800 
        rounded-2xl 
        overflow-hidden
        transition-all 
        duration-300
        ${hoverEffect ? "hover:border-[#00F2FE]/30 hover:shadow-[0_0_30px_rgba(0,242,254,0.03)]" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}
