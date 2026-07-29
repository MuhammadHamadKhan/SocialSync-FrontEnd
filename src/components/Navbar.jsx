import React, { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "dashboard" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-[#0B0F19] backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16 sm:h-[72px]">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group shrink-0">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#7F00FF] flex items-center justify-center shadow-[0_0_16px_rgba(0,242,254,0.35)] group-hover:shadow-[0_0_24px_rgba(0,242,254,0.55)] transition-shadow">
            <Zap
              className="w-4.5 h-4.5 text-[#0B0F19] fill-[#0B0F19]"
              strokeWidth={2.5}
            />
          </div>
          <span className="text-white font-bold text-lg tracking-wide">
            Social<span className="text-[#00F2FE]">Sync</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[#94A3B8] hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-sm font-semibold text-[#94A3B8] hover:text-white px-4 py-2 rounded-xl transition-colors"
          >
            Login
          </a>
          <a
            href="/register"
            className="text-sm font-bold text-[#0B0F19] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#7F00FF] shadow-[0_0_18px_rgba(0,242,254,0.35)] hover:shadow-[0_0_26px_rgba(0,242,254,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all"
          >
            Get Started Free
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-slate-800 bg-[#171E2E] text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 pt-2 space-y-1 bg-[#0B0F19] border-b border-slate-800">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#171E2E] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-3">
            <a
              href="/login"
              className="text-center text-sm font-semibold text-[#94A3B8] hover:text-white px-4 py-2.5 rounded-xl border border-slate-800"
            >
              Login
            </a>

            <a
              href="/register"
              className="text-center text-sm font-bold text-[#0B0F19] px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#7F00FF]"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
