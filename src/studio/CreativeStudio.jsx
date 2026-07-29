import React, { useState, useEffect } from "react";
import {
  Upload,
  ShoppingBag,
  Type,
  CheckCircle2,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Music,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import Card from "../ui/Card";
import Button from "../ui/Button";
import ManualUpload from "./ManualUploads";
import ShopifyImport from "./ShopifyImport";
import authStore from "../store/store";

export default function CreativeStudio() {
  const user = authStore((state) => state.user);
  const [activeStudioTab, setActiveStudioTab] = useState("manual");
  const [caption, setCaption] = useState("");
  const [shopifyUrl, setShopifyUrl] = useState("");
  const [shopifyHasResult, setShopifyHasResult] = useState(false);

  // Media queue: array of { id, file, url, kind: 'image' | 'video', name, size }
  const [media, setMedia] = useState([]);
  const [activePreviewIndex, setActivePreviewIndex] = useState(0);
  const [error, setError] = useState("");

  const [published, setPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      media.forEach((m) => URL.revokeObjectURL(m.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markDirty = () => setPublished(false);

  const hasContent =
    activeStudioTab === "manual" ? media.length > 0 : shopifyHasResult;
  const canPublish = hasContent && !isPublishing;

  const handlePublish = async () => {
    if (!canPublish) return;
    setIsPublishing(true);
    try {
      // TODO: wire up your two-step publish flow here (create post -> publish)
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setPublished(true);
    } finally {
      setIsPublishing(false);
    }
  };

  const activeItem = media[activePreviewIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      {/* ================= LEFT COLUMN: WORKSPACE COMPOSER ================= */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Media Engine Workspace
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Select asset sourcing matrix pipeline
              </p>
            </div>

            <div className="flex p-1 bg-[#0B0F19] rounded-2xl border border-slate-800 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveStudioTab("manual")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeStudioTab === "manual"
                    ? "bg-[#171E2E] text-[#00F2FE] border border-slate-800/80 shadow-md"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                Manual Post
              </button>
              <button
                type="button"
                onClick={() => setActiveStudioTab("shopify")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  activeStudioTab === "shopify"
                    ? "bg-[#171E2E] text-[#00F2FE] border border-slate-800/80 shadow-md"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Shopify Post
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            {activeStudioTab === "manual" && (
              <ManualUpload
                media={media}
                setMedia={setMedia}
                activePreviewIndex={activePreviewIndex}
                setActivePreviewIndex={setActivePreviewIndex}
                error={error}
                setError={setError}
                onDirty={markDirty}
              />
            )}

            {activeStudioTab === "shopify" && (
              <ShopifyImport
                shopifyUrl={shopifyUrl}
                setShopifyUrl={setShopifyUrl}
                onDirty={markDirty}
                onResultChange={setShopifyHasResult}
              />
            )}

            {/* ---------------- CAPTION ---------------- */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                Campaign Caption Text & Metadata Hooks
              </label>
              <div className="relative rounded-2xl">
                <div className="absolute left-4 top-4 text-[#94A3B8]">
                  <Type className="w-4 h-4" />
                </div>
                <textarea
                  rows={3}
                  placeholder="Draft your viral algorithmic description lines here..."
                  value={caption}
                  onChange={(e) => {
                    setCaption(e.target.value);
                    markDirty();
                  }}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#0B0F19] border border-slate-800 text-white placeholder-[#94A3B8]/50 text-sm focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all resize-none"
                />
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              disabled={!canPublish}
              onClick={handlePublish}
              className="w-full py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Publishing...
                </>
              ) : published ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Published
                </>
              ) : (
                "Compile & Generate Production Post"
              )}
            </Button>
            {!hasContent && (
              <p className="text-center text-[11px] text-[#94A3B8]">
                Add at least one image or video to publish.
              </p>
            )}
          </div>
        </Card>
      </div>

      {/* ================= RIGHT COLUMN: LIVE PREVIEW ================= */}
      <div className="flex justify-center lg:justify-start">
        <div className="relative w-[320px] h-[580px] bg-[#000000] rounded-[40px] shadow-[0_0_40px_rgba(0,0,0,0.8)] border-[10px] border-slate-900 overflow-hidden flex flex-col justify-between p-4 group">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800 ml-auto mr-4" />
          </div>

          <div className="absolute inset-0 w-full h-full bg-[#171E2E] z-10">
            {activeItem ? (
              activeItem.kind === "image" ? (
                <img
                  src={activeItem.url}
                  alt={activeItem.name}
                  className="w-full h-full object-cover brightness-[0.85]"
                />
              ) : (
                <video
                  src={activeItem.url}
                  className="w-full h-full object-cover brightness-[0.85]"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              )
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#3A4459]">
                <ImageIcon className="w-10 h-10" />
                <p className="text-xs">No media added yet</p>
              </div>
            )}
          </div>

          <div className="relative z-20 flex justify-center gap-4 text-xs font-bold pt-2 drop-shadow-md">
            <span className="text-white border-b-2 border-white pb-0.5 cursor-pointer">
              Following
            </span>
            <span className="text-white/60 cursor-pointer hover:text-white transition-colors">
              For You
            </span>
          </div>

          {media.length > 1 && (
            <div className="relative z-20 flex justify-center gap-1.5">
              {media.map((m, idx) => (
                <span
                  key={m.id}
                  className={`h-1 rounded-full transition-all ${
                    idx === activePreviewIndex
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

          <div className="relative z-20 mt-auto space-y-2 max-w-[80%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <p className="text-sm font-bold text-white flex items-center gap-1.5">
              {user.username}
              {activeItem && (
                <span className="bg-[#00F2FE] text-slate-950 text-[9px] px-1 rounded font-extrabold uppercase scale-90">
                  {activeItem.kind === "video" ? "VIDEO" : "IMAGE"}
                </span>
              )}
            </p>
            <p className="text-xs text-white/95 line-clamp-3 leading-normal">
              {caption.trim() ||
                "Your custom written description context will overlay here in real time just like a live short-form video network feed layer..."}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-white/80">
              <Music className="w-3 h-3 animate-spin [animation-duration:6s]" />
              <span className="truncate text-[11px]">
                Original Audio - @yourbrand
              </span>
            </div>
          </div>

          <div className="absolute right-3 bottom-16 z-20 flex flex-col items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00F2FE] to-[#7F00FF] p-[1px] shadow-md relative mb-2">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-bold text-[10px] text-white">
                YO
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white font-extrabold text-[10px] shadow-sm">
                +
              </div>
            </div>

            <div className="flex flex-col items-center drop-shadow-md cursor-pointer group/icon">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover/icon:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-white" />
              </div>
              <span className="text-[10px] font-bold text-white mt-1">
                12.4K
              </span>
            </div>

            <div className="flex flex-col items-center drop-shadow-md cursor-pointer group/icon">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover/icon:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <span className="text-[10px] font-bold text-white mt-1">342</span>
            </div>

            <div className="flex flex-col items-center drop-shadow-md cursor-pointer group/icon">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover/icon:scale-110 transition-transform">
                <Bookmark className="w-5 h-5 fill-white" />
              </div>
              <span className="text-[10px] font-bold text-white mt-1">
                1.8K
              </span>
            </div>

            <div className="flex flex-col items-center drop-shadow-md cursor-pointer group/icon">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white group-hover/icon:scale-110 transition-transform">
                <Share2 className="w-5 h-5 fill-white" />
              </div>
              <span className="text-[10px] font-bold text-white mt-1">
                Share
              </span>
            </div>
          </div>

          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full z-20" />
        </div>
      </div>
    </div>
  );
}
