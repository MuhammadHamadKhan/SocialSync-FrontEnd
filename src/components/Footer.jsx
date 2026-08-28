import React from "react";
import { CameraIcon, X, VideoIcon, Music2 } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "How it works", "FAQ"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy policy", "Terms of service", "Refund policy"],
};

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0B0F19] px-5 pt-14 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          {/* Brand column */}
          <div className="max-w-xs">
            <span className="text-lg font-bold text-white">
              Social<span className="text-[#00F2FE]">Sync</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-[#94A3B8]">
              Import once, preview per platform, and publish everywhere from one
              queue.
            </p>
            <div className="mt-5 flex items-center gap-4">
              <a
                aria-label="Instagram"
                className="text-[#94A3B8] transition-colors hover:text-[#00F2FE]"
              >
                <CameraIcon size={18} />
              </a>
              <a
                aria-label="X"
                className="text-[#94A3B8] transition-colors hover:text-[#00F2FE]"
              >
                <X size={18} />
              </a>
              <a
                aria-label="TikTok"
                className="text-[#94A3B8] transition-colors hover:text-[#00F2FE]"
              >
                <Music2 size={18} />
              </a>
              <a
                aria-label="YouTube"
                className="text-[#94A3B8] transition-colors hover:text-[#00F2FE]"
              >
                <VideoIcon size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-16">
            {Object.entries(footerLinks).map(([heading, links]) => (
              <div key={heading}>
                <h4 className="text-sm font-semibold text-white">{heading}</h4>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href={link.toLowerCase}
                        onClick={() => {
                          document
                            .getElementById(link.toLowerCase())
                            .scrollIntoView({ behavior: "smooth" });
                        }}
                        className="cursor-pointer text-sm text-[#94A3B8] transition-colors hover:text-[#00F2FE]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-[#94A3B8]">
            © {new Date().getFullYear()} SocialSync. All rights reserved by
            Hamad Khan.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[#94A3B8] transition-colors hover:text-[#00F2FE]"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-[#94A3B8] transition-colors hover:text-[#00F2FE]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
