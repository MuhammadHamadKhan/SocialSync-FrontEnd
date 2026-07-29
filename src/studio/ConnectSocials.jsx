import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  VideoIcon,
  Film,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  Lock,
  Eye,
  UserCheck,
  Video,
} from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { toast } from "react-toastify";
export default function ConnectSocials() {
  const [connectedAccounts, setConnectedAccounts] = useState({
    youtube: false,
    tiktok: false,
  });
  const fetchConnectedAccounts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/social/get/accounts",
        {
          withCredentials: true,
        },
      );

      const accounts = data.accounts || [];
      console.log(data);

      setConnectedAccounts({
        youtube: accounts.some((a) => a.platform === "youtube"),
        tiktok: accounts.some((a) => a.platform === "tiktok"),
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnectedAccounts();
  }, []);
  useEffect(() => {
    const handleMessage = (event) => {
      // Backend origin
      if (event.origin !== "https://flatware-surrogate-single.ngrok-free.dev")
        return;

      if (event.data.type === "YOUTUBE_CONNECTED") {
        toast.success("YouTube connected successfully!");

        fetchConnectedAccounts();
      }

      if (event.data.type === "YOUTUBE_ERROR") {
        toast.error(event.data.message);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => window.removeEventListener("message", handleMessage);
  }, []);

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
            {/* 🎵 TIKTOK CONNECTION CARD */}
            <div className="p-5 rounded-2xl bg-[#0B0F19] border border-slate-800 hover:border-[#00F2FE]/40 transition-all flex flex-col justify-between h-56 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#00F2FE]/5 rounded-full blur-xl" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#171E2E] border border-slate-800 flex items-center justify-center text-white bg-gradient-to-br from-[#171E2E] to-[#00F2FE]/10">
                    <Film className="w-5 h-5 text-[#00F2FE]" />
                  </div>
                  <Badge
                    variant="cyan"
                    className="text-[9px] px-2 py-0.5 tracking-wider"
                  >
                    Ready
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  TikTok Channel
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                  Allow our system to upload short vertical videos directly to
                  your TikTok account drafts or feed.
                </p>
              </div>

              <Button
                type="button"
                variant="primary"
                className=" cursor-pointer  w-full py-2.5 text-xs rounded-xl shadow-md font-bold"
                onClick={() =>
                  (window.location.href =
                    "http://localhost:3000/api/social/auth/tiktok")
                }
              >
                Connect TikTok Profile
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* 🎥 YOUTUBE CONNECTION CARD */}
            <div className="p-5 rounded-2xl bg-[#0B0F19] border border-slate-800 hover:border-[#7F00FF]/40 transition-all flex flex-col justify-between h-56 relative overflow-hidden group">
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-[#7F00FF]/5 rounded-full blur-xl" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#171E2E] border border-slate-800 flex items-center justify-center text-white bg-gradient-to-br from-[#171E2E] to-red-500/10">
                    <Video className="w-5 h-5 text-red-500" />
                  </div>
                  <Badge
                    variant="purple"
                    className="text-[9px] px-2 py-0.5 tracking-wider"
                  >
                    Ready
                  </Badge>
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  YouTube Shorts
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                  Allow our system to publish vertical marketing videos straight
                  to your YouTube Shorts shelf.
                </p>
              </div>

              <Button
                type="button"
                variant={connectedAccounts.youtube ? "success" : "secondary"}
                disabled={connectedAccounts.youtube}
                className="cursor-pointer w-full py-2.5 text-xs rounded-xl font-bold transition-all"
                onClick={() => {
                  const width = 600;
                  const height = 700;

                  const left = window.screenX + (window.outerWidth - width) / 2;
                  const top =
                    window.screenY + (window.outerHeight - height) / 2;

                  window.open(
                    "http://localhost:3000/api/social/auth/youtube",
                    "youtube-oauth",
                    `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
                  );
                }}
              >
                {connectedAccounts.youtube ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Connected
                  </>
                ) : (
                  <>
                    Connect YouTube Shorts
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#A78BFA]" />
                  </>
                )}
              </Button>
            </div>
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
            {/* Simple Step 1 */}
            <div className="flex items-start gap-3 p-3 bg-[#0B0F19] rounded-xl border border-slate-800/60">
              <Lock className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">
                  We Never Save Passwords
                </h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-normal">
                  Login happens directly on official Google or TikTok screens.
                  We never see your password.
                </p>
              </div>
            </div>

            {/* Simple Step 2 */}
            <div className="flex items-start gap-3 p-3 bg-[#0B0F19] rounded-xl border border-slate-800/60">
              <Eye className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Safe Posting Only
                </h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-normal">
                  The app only asks for permission to publish videos. We cannot
                  see your personal messages.
                </p>
              </div>
            </div>

            {/* Simple Step 3 */}
            <div className="flex items-start gap-3 p-3 bg-[#0B0F19] rounded-xl border border-slate-800/60">
              <UserCheck className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-white">
                  Disconnect Anytime
                </h4>
                <p className="text-[11px] text-[#94A3B8] mt-0.5 leading-normal">
                  You can remove our posting permissions with one simple click
                  inside your account settings.
                </p>
              </div>
            </div>

            {/* Footer Notice */}
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
