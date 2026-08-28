import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  Image as ImageIcon,
  Play,
  Eye,
  Clock3,
  Image,
  Video,
} from "lucide-react";

import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

export default function PreviewCard({ config, caption, images, video }) {
  const hasMedia = images.length > 0 || video;

  return (
    <Card className="p-5 lg:p-6">
      {/* ================= HEADER ================= */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7F00FF] to-[#00F2FE] flex items-center justify-center">
            <Eye size={20} className="text-white" />
          </div>

          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Live Preview
            </h2>

            <p className="text-sm text-slate-400">
              This is approximately how your post will appear.
            </p>
          </div>
        </div>

        <Badge className="self-start sm:self-auto rounded-xl border border-slate-700 bg-[#0F172A]">
          {config.label}
        </Badge>
      </div>

      {/* ================= POST ================= */}

      <div className="mt-6 rounded-3xl border border-slate-700 bg-[#0F172A] overflow-hidden">
        {/* Fake Profile */}
        <div className="flex items-center gap-3 p-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#7F00FF] to-[#00F2FE]" />

          <div className="flex-1">
            <h3 className="text-white font-semibold text-sm">Your Brand</h3>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock3 size={12} />
              Just now
            </div>
          </div>
        </div>
        {/* Caption */}
        <div className="px-4 pb-4">
          {caption ? (
            <p className="text-slate-200 text-sm sm:text-base leading-6 whitespace-pre-wrap break-words">
              {caption}
            </p>
          ) : (
            <p className="text-slate-500 italic text-sm">
              Your caption will appear here...
            </p>
          )}
        </div>
        {/* ================= MEDIA ================= */}
        <div
          className={`mx-4 mb-4 rounded-2xl overflow-hidden border border-slate-700 bg-black relative ${
            video
              ? "max-w-[280px] mx-auto aspect-[9/16]"
              : "w-auto aspect-[4/5] sm:aspect-video"
          }`}
        >
          {video ? (
            <video
              src={URL.createObjectURL(video)}
              controls
              className="w-full h-full object-contain bg-black"
            />
          ) : images.length > 0 ? (
            <img
              src={URL.createObjectURL(images[0])}
              alt=""
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[260px]">
              <ImageIcon size={42} className="text-slate-500" />

              <p className="text-slate-500 text-sm mt-4 text-center px-6">
                Your uploaded media will appear here.
              </p>
            </div>
          )}

          {hasMedia && (
            <div className="absolute top-3 right-3 rounded-full bg-black/70 backdrop-blur-md px-3 py-1">
              <span className="text-[10px] text-white font-medium">
                {video ? "9:16" : "Preview"}
              </span>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <p className="text-center text-xs text-slate-400 pb-4">
            +{images.length - 1} more image
            {images.length > 2 ? "s" : ""}
          </p>
        )}{" "}
        {/* ================= ACTIONS ================= */}
        <div className="border-t border-slate-700 px-4 py-3">
          <div className="flex items-center justify-around">
            <button
              type="button"
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-pink-400 transition"
            >
              <Heart size={18} />
              <span className="text-[11px]">Like</span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition"
            >
              <MessageCircle size={18} />
              <span className="text-[11px]">Comment</span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 transition"
            >
              <Repeat2 size={18} />
              <span className="text-[11px]">Share</span>
            </button>

            <button
              type="button"
              className="flex flex-col items-center gap-1 text-slate-400 hover:text-amber-400 transition"
            >
              <Bookmark size={18} />
              <span className="text-[11px]">Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="mt-5 rounded-2xl border border-slate-700 bg-[#0F172A] p-4">
        <h4 className="text-white font-semibold mb-4">Post Summary</h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Platform</span>

            <Badge className="rounded-xl">{config.label}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Media</span>

            <div className="flex items-center gap-2 text-white text-sm">
              {video ? (
                <>
                  <Video size={15} />
                  <span>1 Video</span>
                </>
              ) : images.length > 0 ? (
                <>
                  <Image size={15} />
                  <span>
                    {images.length} Image
                    {images.length > 1 ? "s" : ""}
                  </span>
                </>
              ) : (
                <span>No Media</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Caption</span>

            <span className="text-white text-sm font-medium">
              {caption.length} Characters
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-sm">Status</span>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />

              <span className="text-emerald-400 text-sm font-medium">
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
