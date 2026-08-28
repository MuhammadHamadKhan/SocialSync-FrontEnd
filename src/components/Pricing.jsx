import React from "react";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/mo",
    description: "For getting started with image posts.",
    features: [
      { label: "Post images", included: true },
      { label: "Post videos", included: false },
      { label: "Shopify product import", included: false },
      { label: "Live post preview", included: true },
      { label: "Unified content queue", included: true },
    ],
    featured: false,
  },
  {
    name: "Pro",
    price: "₹1000",
    period: "/mo",
    description: "For creators and brands posting video content.",
    features: [
      { label: "Post images", included: true },
      { label: "Post videos", included: true },
      { label: "Shopify product import", included: true },
      { label: "Live post preview", included: true },
      { label: "Unified content queue", included: true },
    ],
    featured: true,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section
      id="pricing"
      className="bg-[#0B0F19] transition-transform ease-in-out py-16 sm:py-24"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-semibold text-white mb-3">
            Simple pricing, no surprises
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto">
            Start free with images, upgrade to Pro when you're ready to post
            video.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {plans.map(
            ({ name, price, period, description, features, featured }) => (
              <div
                key={name}
                className={`
                rounded-2xl p-5 sm:p-8 flex flex-col
                ${
                  featured
                    ? "bg-[#171E2E] border-2 border-[#00F2FE]"
                    : "bg-[#171E2E] border border-slate-800"
                }
              `}
              >
                {featured && (
                  <span className="inline-block w-fit text-xs font-medium text-[#0B0F19] bg-[#00F2FE] px-3 py-1 rounded-full mb-4">
                    Most popular
                  </span>
                )}

                <h3 className="text-white font-medium text-lg mb-1">{name}</h3>
                <p className="text-sm text-[#94A3B8] mb-5">{description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl sm:text-4xl font-semibold text-white">
                    {price}
                  </span>
                  <span className="text-sm text-[#94A3B8]">{period}</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {features.map(({ label, included }) => (
                    <li
                      key={label}
                      className={`flex items-start gap-2 text-sm ${included ? "text-white" : "text-[#94A3B8]"}`}
                    >
                      {included ? (
                        <Check
                          className="w-4 h-4 text-[#00F2FE] mt-0.5 shrink-0"
                          strokeWidth={2}
                        />
                      ) : (
                        <X
                          className="w-4 h-4 text-slate-600 mt-0.5 shrink-0"
                          strokeWidth={2}
                        />
                      )}
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className={`cursor-pointer
                  w-full rounded-2xl py-3 text-sm font-medium transition
                  ${
                    featured
                      ? "bg-[#00F2FE] text-[#0B0F19] hover:bg-[#00d8e0]"
                      : "bg-[#0B0F19] text-white border border-slate-800 hover:border-slate-700"
                  }
                `}
                >
                  {name === "Free" ? "Get started free" : "Upgrade to Pro"}
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
