import React, { useRef, useCallback } from "react";
import { Film, Trash2, AlertTriangle, Lock } from "lucide-react";
import { MAX_IMAGES, MAX_FILE_MB, formatBytes } from "./mediaConstants";
import authStore from "../store/store";

/**
 * Manual media dropzone.
 * - Free plan  -> images only (video files are filtered out client-side)
 * - Pro plan   -> images OR a single video, never mixed
 */
export default function ManualUpload({
  media,
  setMedia,
  activePreviewIndex,
  setActivePreviewIndex,
  error,
  setError,
  onDirty,
}) {
  const user = authStore((state) => state.user);
  const { role } = user;
  const canUseVideo = role === "pro";

  const fileInputRef = useRef(null);
  const hasVideo = media.some((m) => m.kind === "video");

  const handleFilesSelected = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList || []);
      if (incoming.length === 0) return;

      setError("");
      onDirty?.();

      let incomingVideos = incoming.filter((f) => f.type.startsWith("video/"));
      const incomingImages = incoming.filter((f) =>
        f.type.startsWith("image/"),
      );
      const rejectedType = incoming.filter(
        (f) => !f.type.startsWith("video/") && !f.type.startsWith("image/"),
      );

      if (rejectedType.length > 0) {
        setError("Only image or video files are supported.");
      }

      // Free plan can't select video at all — strip it out rather than blocking the whole batch
      if (incomingVideos.length > 0 && !canUseVideo) {
        setError(
          "Video uploads are available on the Pro plan. Upgrade to attach video.",
        );
        incomingVideos = [];
        if (incomingImages.length === 0) return;
      }

      // A video is already queued — block everything else until it's removed
      if (hasVideo) {
        setError(
          "Only one video is allowed per post. Remove it first to add other media.",
        );
        return;
      }

      // User is trying to add a video (Pro only, reaches here)
      if (incomingVideos.length > 0) {
        if (
          media.length > 0 ||
          incomingVideos.length > 1 ||
          incomingImages.length > 0
        ) {
          setError(
            "A video post can only include a single video — remove other media first, or drop just one video file.",
          );
          return;
        }
        const oversized = incomingVideos.filter(
          (f) => f.size > MAX_FILE_MB * 1024 * 1024,
        );
        if (oversized.length > 0) {
          setError(
            `"${oversized[0].name}" exceeds the ${MAX_FILE_MB}MB limit.`,
          );
          return;
        }
        const file = incomingVideos[0];
        const item = {
          id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
          file,
          url: URL.createObjectURL(file),
          kind: "video",
          name: file.name,
          size: file.size,
        };
        setMedia([item]);
        setActivePreviewIndex(0);
        return;
      }

      // User is adding images
      if (incomingImages.length > 0) {
        const room = MAX_IMAGES - media.length;
        if (room <= 0) {
          setError(`You can attach up to ${MAX_IMAGES} images.`);
          return;
        }
        const oversized = incomingImages.filter(
          (f) => f.size > MAX_FILE_MB * 1024 * 1024,
        );
        const accepted = incomingImages
          .filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024)
          .slice(0, room);

        if (oversized.length > 0) {
          setError(
            `${oversized.length} file(s) skipped — over the ${MAX_FILE_MB}MB limit.`,
          );
        } else if (incomingImages.length > room) {
          setError(
            `Only ${room} more image(s) could be added (${MAX_IMAGES} max).`,
          );
        }

        const newItems = accepted.map((file) => ({
          id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
          file,
          url: URL.createObjectURL(file),
          kind: "image",
          name: file.name,
          size: file.size,
        }));

        if (newItems.length > 0) {
          setMedia((prev) => [...prev, ...newItems]);
        }
      }
    },
    [
      hasVideo,
      media.length,
      canUseVideo,
      setMedia,
      setActivePreviewIndex,
      setError,
      onDirty,
    ],
  );

  const handleRemove = (id) => {
    onDirty?.();
    setMedia((prev) => {
      const target = prev.find((m) => m.id === id);
      if (target) URL.revokeObjectURL(target.url);
      const next = prev.filter((m) => m.id !== id);
      setActivePreviewIndex((idx) =>
        Math.min(idx, Math.max(next.length - 1, 0)),
      );
      return next;
    });
  };

  const handleClearAll = () => {
    onDirty?.();
    media.forEach((m) => URL.revokeObjectURL(m.url));
    setMedia([]);
    setActivePreviewIndex(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFilesSelected(e.dataTransfer.files);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          Asset Dropzone (
          {hasVideo ? "1 video" : `${media.length}/${MAX_IMAGES} images`})
        </label>
        {media.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[11px] font-semibold text-[#94A3B8] hover:text-white transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-slate-800 hover:border-[#00F2FE]/40 rounded-2xl p-8 bg-[#0B0F19] text-center transition-all group cursor-pointer"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={canUseVideo ? "image/*,video/*" : "image/*"}
          onChange={(e) => {
            handleFilesSelected(e.target.files);
            e.target.value = "";
          }}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <Film className="w-8 h-8 text-[#94A3B8] mx-auto mb-3 group-hover:text-[#00F2FE] transition-colors" />
        <p className="text-sm font-semibold text-white">
          Drag short-form assets here or select files
        </p>
        <p className="text-xs text-[#94A3B8] mt-1">
          {canUseVideo
            ? `Multiple images, or a single vertical MP4/MOV — max ${MAX_FILE_MB}MB per file`
            : `Multiple images — max ${MAX_FILE_MB}MB per file`}
        </p>
        {!canUseVideo && (
          <p className="flex items-center justify-center gap-1 text-[10px] text-[#7F00FF] mt-2 font-semibold">
            <Lock className="w-3 h-3" />
            Video uploads are a Pro feature
          </p>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs text-amber-300">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {media.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {media.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActivePreviewIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border transition-all ${
                idx === activePreviewIndex
                  ? "border-[#00F2FE] ring-2 ring-[#00F2FE]/20"
                  : "border-slate-800 hover:border-slate-700"
              }`}
            >
              {item.kind === "image" ? (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  className="w-full h-full object-cover"
                  muted
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 pt-3 pb-1">
                <p className="text-[9px] text-white truncate">{item.name}</p>
                <p className="text-[8px] text-white/70">
                  {formatBytes(item.size)}
                </p>
              </div>
              {item.kind === "video" && (
                <div className="absolute top-1.5 left-1.5 bg-black/60 rounded-full p-1">
                  <Film className="w-3 h-3 text-white" />
                </div>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}
                className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-red-500/80 rounded-full p-1 transition-colors"
              >
                <Trash2 className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
