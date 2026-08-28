import React, { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "SocialSync cut our posting time in half. Importing straight from Shopify is the feature I didn't know I needed.",
    name: "Amara Chen",
    role: "Founder, Loomstate Goods",
  },
  {
    quote:
      "The live preview means I never guess how a post will crop on TikTok versus Instagram anymore.",
    name: "Diego Fernandez",
    role: "Social lead, Northbound Coffee",
  },
  {
    quote:
      "One queue for every channel. Our team finally stopped juggling four different apps to schedule content.",
    name: "Priya Raman",
    role: "Marketing manager, Fernwell",
  },
];

export default function Testimonials() {
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
    <section id="reviews" className="bg-[#0B0F19] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-3">
            Loved by teams who publish daily
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto">
            Real feedback from brands running their content through SocialSync.
          </p>
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
          {testimonials.map(({ quote, name, role }) => (
            <div
              key={name}
              className="
                snap-center shrink-0 w-[85%] sm:w-auto
                bg-[#171E2E] border border-slate-800 rounded-2xl
                p-5 sm:p-8 flex flex-col
              "
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[#00F2FE] fill-[#00F2FE]"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="text-sm text-white leading-relaxed mb-6 flex-1">
                "{quote}"
              </p>
              <div>
                <p className="text-sm font-medium text-white">{name}</p>
                <p className="text-xs text-[#94A3B8]">{role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicator — mobile only */}
        <div className="flex justify-center gap-1.5 mt-5 sm:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
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
