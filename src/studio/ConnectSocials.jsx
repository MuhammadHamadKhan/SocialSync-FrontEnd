import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Film,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  Lock,
  Eye,
  UserCheck,
  Video,
  Link2Icon,
  MessageCircle as InstagramIcon,
} from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import api from "../api/api";

// Must match the origin the OAuth popup is actually served from (your
// backend), since that's what event.origin will be when it postMessages
// back to this window. This should be the SAME value as FRONTEND_URL is
// on the backend, just from the other side — backend's own domain, not
// the frontend's.
const BACKEND_ORIGIN = "https://social-sync-back-end.vercel.app";

const PLATFORM_CONFIG = [
  {
    key: "youtube",
    label: "YouTube Shorts",
    description:
      "Allow our system to publish vertical marketing videos straight to your YouTube Shorts shelf.",
    connectLabel: "Connect YouTube Shorts",
    icon: Video,
    iconColor: "text-red-500",
    iconBg: "from-[#171E2E] to-red-500/10",
    accentGlow: "bg-[#7F00FF]/5",
    hoverBorder: "hover:border-[#7F00FF]/40",
    badgeVariant: "purple",
    buttonVariant: "primary",
    arrowColor: "",
    isAvailable: true,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    description:
      "Allow our system to publish posts directly to your LinkedIn profile or company page.",
    connectLabel: "Connect LinkedIn",
    icon: Link2Icon,
    iconColor: "text-red-500",
    iconBg: "from-[#171E2E] to-red-500/10",
    accentGlow: "bg-[#7F00FF]/5",
    hoverBorder: "hover:border-[#7F00FF]/40",
    badgeVariant: "purple",
    buttonVariant: "primary",
    arrowColor: "",
    isAvailable: true,
  },
  {
    key: "tiktok",
    label: "TikTok Channel",
    description:
      "Allow our system to upload short vertical videos directly to your TikTok account drafts or feed.",
    connectLabel: "Connect TikTok Profile",
    icon: Film,
    iconColor: "text-[#00F2FE]",
    iconBg: "from-[#171E2E] to-[#00F2FE]/10",
    accentGlow: "bg-[#00F2FE]/5",
    hoverBorder: "hover:border-[#00F2FE]/40",
    badgeVariant: "cyan",
    buttonVariant: "primary",
    arrowColor: "",
    isAvailable: false,
  },
  {
    key: "instagram",
    label: "Instagram",
    description:
      "Allow our system to publish Reels and feed posts directly to your Instagram business account.",
    connectLabel: "Connect Instagram",
    icon: InstagramIcon,
    iconColor: "text-[#00F2FE]",
    iconBg: "from-[#171E2E] to-[#00F2FE]/10",
    accentGlow: "bg-[#00F2FE]/5",
    hoverBorder: "hover:border-[#00F2FE]/40",
    badgeVariant: "cyan",
    buttonVariant: "primary",
    arrowColor: "",
    isAvailable: false,
  },
];

const SAFETY_ITEMS = [
  {
    key: "no-passwords",
    icon: Lock,
    title: "We Never Save Passwords",
    description:
      "Login happens directly on official platform screens. We never see your password.",
  },
  {
    key: "safe-posting",
    icon: Eye,
    title: "Safe Posting Only",
    description:
      "The app only asks for permission to publish content. We cannot see your personal messages.",
  },
  {
    key: "disconnect",
    icon: UserCheck,
    title: "Disconnect Anytime",
    description:
      "You can remove our posting permissions with one simple click inside your account settings.",
  },
];

export default function ConnectSocials() {
  const [connectedAccounts, setConnectedAccounts] = useState(
    PLATFORM_CONFIG.reduce((acc, { key }) => {
      acc[key] = false;
      return acc;
    }, {}),
  );

  const fetchConnectedAccounts = async () => {
    try {
      const { data } = await api.get("/api/social/get/overview", {
        withCredentials: true,
      });

      const accounts = data.platforms || [];

      setConnectedAccounts(
        PLATFORM_CONFIG.reduce((acc, { key }) => {
          acc[key] = accounts.some((a) => a.platform === key);
          return acc;
        }, {}),
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch once on mount only. This must NOT depend on `connectedAccounts` —
  // fetchConnectedAccounts() always sets a brand-new object reference (from
  // .reduce), so depending on that state here would re-trigger the effect
  // every time it runs, causing an infinite fetch loop. The OAuth-success
  // handler below already calls fetchConnectedAccounts() again when needed.
  useEffect(() => {
    fetchConnectedAccounts();
  }, []);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== BACKEND_ORIGIN) return;

      const { type, message } = event.data || {};
      if (!type) return;

      // Expects message types shaped like "<PLATFORM>_CONNECTED" / "<PLATFORM>_ERROR",
      // e.g. YOUTUBE_CONNECTED, LINKEDIN_ERROR, INSTAGRAM_CONNECTED, TIKTOK_ERROR.
      const match = type.match(/^([A-Z]+)_(CONNECTED|ERROR)$/);
      if (!match) return;

      const [, platformUpper, kind] = match;
      const platform = platformUpper.toLowerCase();

      if (kind === "CONNECTED") {
        toast.success(
          `${platformUpper.charAt(0)}${platformUpper.slice(1).toLowerCase()} connected successfully!`,
        );
        fetchConnectedAccounts();
      } else {
        toast.error(message || `Failed to connect ${platform}.`);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const openOAuthPopup = (platform) => {
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(
      `https://social-sync-back-end.vercel.app/api/social/auth/${platform}`,
      `${platform}-oauth`,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* ================= LEFT/CENTER COLUMN: CONNECTION HUB ================= */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-5 sm:p-6">
          <div className="pb-5 border-b border-slate-800">
            <h2 className="text-base font-bold text-white tracking-wide">
              Link Social Accounts
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Connect your channels to start automated posting
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {PLATFORM_CONFIG.map((platform) => {
              const Icon = platform.icon;
              const isConnected = connectedAccounts[platform.key];

              return (
                <div
                  key={platform.key}
                  className={`p-5 rounded-2xl bg-[#0B0F19] border border-slate-800 ${platform.hoverBorder} transition-all flex flex-col justify-between h-56 relative overflow-hidden group`}
                >
                  <div
                    className={`absolute -right-6 -top-6 w-20 h-20 ${platform.accentGlow} rounded-full blur-xl`}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-10 h-10 rounded-xl bg-[#171E2E] border border-slate-800 flex items-center justify-center text-white bg-gradient-to-br ${platform.iconBg}`}
                      >
                        <Icon className={`w-5 h-5 ${platform.iconColor}`} />
                      </div>
                      <Badge
                        variant={platform.badgeVariant}
                        className="text-[9px] px-2 py-0.5 tracking-wider"
                      >
                        {platform.isAvailable ? "Ready" : "Coming Soon"}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-white tracking-wide">
                      {platform.label}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                      {platform.description}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant={isConnected ? "success" : platform.buttonVariant}
                    disabled={isConnected || !platform.isAvailable}
                    className="cursor-pointer w-full py-2.5 text-xs rounded-xl shadow-md font-bold"
                    onClick={() => openOAuthPopup(platform.key)}
                  >
                    {isConnected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        Connected
                      </>
                    ) : (
                      <>
                        {platform.connectLabel}
                        <ArrowUpRight
                          className={`w-3.5 h-3.5 ${platform.arrowColor}`}
                        />
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* ================= RIGHT COLUMN: SIMPLIFIED TRUST & SECURITY INFO ================= */}
      <div className="space-y-6">
        <Card className="p-5 border-[#00F2FE]/10">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4 text-[#00F2FE]" />
            <h3 className="text-sm font-bold text-white tracking-wide uppercase">
              Safety & Privacy
            </h3>
          </div>

          <div className="mt-4 space-y-4">
            {SAFETY_ITEMS.map(({ key, icon: Icon, title, description }) => (
              <div
                key={key}
                className="flex items-start gap-3 p-3 bg-[#0B0F19] rounded-xl border border-slate-800/60"
              >
                <Icon className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">{title}</h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-normal">
                    {description}
                  </p>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-xl bg-[#7F00FF]/10 border border-[#7F00FF]/20 text-[11px] text-[#A78BFA] flex items-start gap-2 leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE] shrink-0 mt-0.5" />
              <span>
                Make sure you are logged into the correct channel on your
                browser before hitting connect.
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
