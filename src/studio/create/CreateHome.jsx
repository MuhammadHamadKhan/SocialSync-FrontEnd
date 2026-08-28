import { useNavigate } from "react-router-dom";
import {
  MessageCircle,
  Video,
  Music2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";

export default function CreateHome() {
  const navigate = useNavigate();

  const platforms = [
    {
      title: "LinkedIn",
      description: "Create professional posts for your network.",
      icon: MessageCircle,
      connected: true,
      path: "linkedin",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "YouTube Shorts",
      description: "Upload and publish engaging short videos.",
      icon: Video,
      connected: true,
      path: "youtube",
      gradient: "from-red-500 to-pink-500",
    },
    {
      title: "TikTok",
      description: "Share short-form videos with your audience.",
      icon: Music2,
      connected: true,
      path: "tiktok",
      gradient: "from-fuchsia-500 to-cyan-400",
    },
    {
      title: "Shopify",
      description: "Create and publish products to your store.",
      icon: ShoppingBag,
      connected: false,
      path: "shopify",
      gradient: "from-emerald-500 to-green-400",
      comingSoon: true,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-3">
        <Badge className="w-fit">
          <Sparkles size={14} className="mr-1" />
          Create
        </Badge>

        <h1 className="text-4xl font-bold text-white">Create Content</h1>

        <p className="text-slate-400 max-w-2xl">
          Choose a platform to create content specifically designed for it.
          Every platform has its own optimized publishing experience.
        </p>
      </div>

      {/* Platform Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;

          return (
            <Card
              key={platform.title}
              className="p-6 group transition-all duration-300 hover:-translate-y-1 hover:border-[#7F00FF]/40"
            >
              <div className="flex items-start justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${platform.gradient} flex items-center justify-center`}
                >
                  <Icon className="text-white" size={28} />
                </div>

                {platform.comingSoon ? (
                  <Badge>Coming Soon</Badge>
                ) : (
                  <Badge>Available</Badge>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-white mt-6">
                {platform.title}
              </h2>

              <p className="text-slate-400 mt-2 leading-relaxed">
                {platform.description}
              </p>

              <div className="mt-8">
                <Button
                  disabled={platform.comingSoon}
                  onClick={() => navigate(platform.path)}
                  className="w-full px-4 py-2 cursor-pointer"
                >
                  {platform.comingSoon ? (
                    "Coming Soon"
                  ) : (
                    <>
                      Create
                      <ArrowRight size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
