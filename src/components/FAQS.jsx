import React, { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Can I import products straight from Shopify?",
    answer:
      "Yes. Connect your Shopify store and pull products directly into CreativeStudio to turn them into posts, no manual re-uploading needed.",
  },
  {
    question: "What's the difference between Free and Pro?",
    answer:
      "Free lets you post images across all connected channels. Pro (₹1000/month) unlocks video posting on top of everything in Free.",
  },
  {
    question: "Can I preview how a post looks before publishing?",
    answer:
      "Every post shows a live phone-style preview as you edit, so you can see exactly how it will look on each platform before it goes out.",
  },
  {
    question: "Which platforms can I publish to?",
    answer:
      "Instagram, TikTok, X, and Shopify today, with more channels on the way.",
  },
  {
    question: "Can I schedule a post to multiple channels at once?",
    answer:
      "Yes. Queue a post once and SocialSync publishes it to every channel you select, all from one unified queue.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="bg-[#0B0F19] py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-3">
            Frequently asked questions
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto">
            Everything you need to know before you get started.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={question}
                className="bg-[#171E2E] border border-slate-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="cursor-pointer w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <span className="text-sm sm:text-base font-medium text-white">
                    {question}
                  </span>
                  <Plus
                    className={` w-5 h-5 text-[#00F2FE] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    strokeWidth={2}
                  />
                </button>

                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-[#94A3B8] leading-relaxed px-5 sm:px-6 pb-5 sm:pb-6">
                      {answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
