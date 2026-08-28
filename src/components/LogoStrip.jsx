import React, { useRef, useState, useEffect } from "react";
import {
  Music2,
  ShoppingBag,
  MessageCircle,
  VideoIcon,
  Camera,
  AtSign,
} from "lucide-react";

const integrations = [
  { name: "TikTok", Icon: Music2 },
  { name: "Shopify", Icon: ShoppingBag },
  { name: "Linkedin", Icon: MessageCircle },
  { name: "YouTube", Icon: VideoIcon },
  { name: "Instagram", Icon: Camera },
  { name: "Threads", Icon: AtSign },
];

export default function LogoStrip() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track which card is centered on mobile, to drive the dot indicator
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cardWidth = track.firstChild?.offsetWidth || 1;
      const gap = 12;
      const index = Math.round(track.scrollLeft / (cardWidth + gap));
      setActiveIndex(index);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.firstChild?.offsetWidth || 1;
    const gap = 12;
    track.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="bg-[#0B0F19] py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <p className="text-center text-sm text-[#94A3B8] mb-6 sm:mb-8">
          Publish everywhere your audience is
        </p>

        {/* Mobile: horizontal scroll-snap carousel. Desktop (sm+): static row, no scroll. */}
        <div
          ref={trackRef}
          className="
            flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth
            sm:grid sm:grid-cols-6 sm:gap-6 sm:overflow-visible
            -mx-5 px-5 sm:mx-0 sm:px-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
          "
        >
          {integrations.map(({ name, Icon }) => (
            <div
              key={name}
              className="
                snap-center shrink-0 w-[42%] sm:w-auto
                flex flex-col items-center justify-center gap-2
                bg-[#171E2E] border border-slate-800 rounded-2xl
                p-5 sm:p-4 sm:bg-transparent sm:border-none
              "
            >
              <Icon className="w-6 h-6 text-[#94A3B8]" strokeWidth={1.75} />
              <span className="text-xs text-[#94A3B8] sm:hidden">{name}</span>
            </div>
          ))}
        </div>

        {/* Dot indicator — mobile only */}
        <div className="flex justify-center gap-1.5 mt-4 sm:hidden">
          {integrations.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to logo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-4 bg-[#00F2FE]" : "w-1.5 bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
