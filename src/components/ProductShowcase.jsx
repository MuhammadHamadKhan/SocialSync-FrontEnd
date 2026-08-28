import React, { useRef, useState, useEffect } from "react";
import { LayoutGrid, Wand2, CalendarClock } from "lucide-react";
import image from "../../src/assets/preview.png";
const showcaseItems = [
  {
    title: "Unified content queue",
    description:
      "See every scheduled post across Instagram, TikTok, Shopify, and X in one timeline.",
    Icon: LayoutGrid,
  },
  {
    title: "Live preview as you create",
    description:
      "Edit media and captions in CreativeStudio with a real-time phone preview for every platform.",
    Icon: Wand2,
  },
  {
    title: "Schedule once, publish everywhere",
    description:
      "Queue a post for multiple channels at once and let SocialSync handle the timing.",
    Icon: CalendarClock,
  },
];

export default function ProductShowcase() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const cardWidth = track.firstChild?.offsetWidth || 1;
      const gap = 16;
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
    const gap = 16;
    track.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="bg-[#0B0F19] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-3">
            Everything you need to publish, in one place
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto">
            From import to publish, SocialSync keeps your whole workflow in a
            single screen.
          </p>
        </div>

        {/* Screenshot / mockup frame */}
        <div
          id="dashboard"
          className="rounded-2xl border border-slate-800 bg-[#171E2E] p-3 sm:p-5 mb-10 sm:mb-14"
        >
          <div className="rounded-xl bg-[#0B0F19] aspect-video flex items-center justify-center border border-slate-800">
            <span className="text-[#94A3B8] text-sm">
              {image ? (
                <img src={image} alt="dashboard preview" />
              ) : (
                "Dashboard preview"
              )}
            </span>
          </div>
        </div>

        {/* Mobile: swipe carousel. Desktop: static 3-column grid. */}
        <div
          ref={trackRef}
          className="
            flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth
            sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible
            -mx-5 px-5 sm:mx-0 sm:px-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']
          "
        >
          {showcaseItems.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="
                snap-center shrink-0 w-[85%] sm:w-auto
                bg-[#171E2E] border border-slate-800 rounded-2xl
                p-5 sm:p-8
              "
            >
              <div className="w-10 h-10 rounded-xl bg-[#0B0F19] border border-slate-800 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#00F2FE]" strokeWidth={1.75} />
              </div>
              <h3 className="text-white font-medium mb-2">{title}</h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Dot indicator — mobile only */}
        <div className="flex justify-center gap-1.5 mt-5 sm:hidden">
          {showcaseItems.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to card ${i + 1}`}
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
