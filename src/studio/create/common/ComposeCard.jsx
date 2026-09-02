import { useRef } from "react";
import {
  ImagePlus,
  Sparkles,
  Send,
  X,
  ImageIcon,
  Video,
  UploadCloud,
} from "lucide-react";
import { toast } from "react-toastify";

import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Badge from "../../../ui/Badge";

export default function ComposeCard({
  config,
  platform,
  caption,
  setCaption,
  images,
  setImages,
  video,
  setVideo,
  onPublish,
  isPending,
}) {
  const fileInputRef = useRef(null);

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    if (imageFiles.length && videoFiles.length) {
      toast.error("Upload either images or one video.");
      e.target.value = "";
      return;
    }

    if (images.length && videoFiles.length) {
      toast.error("Remove uploaded images before selecting a video.");
      e.target.value = "";
      return;
    }

    if (video && imageFiles.length) {
      toast.error("Remove uploaded video before selecting images.");
      e.target.value = "";
      return;
    }

    if (imageFiles.length) {
      if (!config.maxImages) {
        toast.error(`${config.label} doesn't support images.`);
        e.target.value = "";
        return;
      }

      if (images.length + imageFiles.length > config.maxImages) {
        toast.error(
          `Maximum ${config.maxImages} image${
            config.maxImages > 1 ? "s" : ""
          } allowed.`,
        );
        e.target.value = "";
        return;
      }

      setImages((prev) => [...prev, ...imageFiles]);
    }

    if (videoFiles.length) {
      if (!config.maxVideos) {
        toast.error(`${config.label} doesn't support videos.`);
        e.target.value = "";
        return;
      }

      if (video) {
        toast.error("Only one video is allowed.");
        e.target.value = "";
        return;
      }

      setVideo(videoFiles[0]);
    }

    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeVideo = () => {
    setVideo(null);
  };

  return (
    <Card className="p-5 lg:p-7">
      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7F00FF] to-[#00F2FE] flex items-center justify-center shadow-lg">
              <Sparkles size={22} className="text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Create {config.label} Post
              </h2>

              <p className="text-slate-400 mt-1">
                Write content and preview it before publishing.
              </p>
            </div>
          </div>
        </div>

        <Badge className="px-3 py-1.5 rounded-xl bg-[#0F172A] border border-slate-700 flex items-center gap-2">
          <Sparkles size={14} />

          {config.label}
        </Badge>
      </div>

      {/* ================= BODY ================= */}

      <div className=" py-6 space-y-8 ">
        {/* Caption */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <label className="text-white font-semibold text-sm uppercase tracking-wide">
              Post Content
            </label>

            <span
              className={`text-xs font-medium ${
                caption.length > config.maxCaption
                  ? "text-red-400"
                  : "text-slate-500"
              }`}
            >
              {caption.length}/{config.maxCaption}
            </span>
          </div>

          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={8}
            placeholder={`What's happening today?

Share something with your audience...`}
            className="w-full rounded-2xl border border-slate-700 bg-[#0F172A] p-5 text-white placeholder:text-slate-500 resize-none outline-none transition-all duration-300 focus:border-[#00F2FE] focus:ring-4 focus:ring-cyan-500/10"
          />
        </section>
        {/* Upload */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold">Photos & Videos</h3>

              <p className="text-slate-400 text-sm mt-1">
                Upload images or a single video.
              </p>
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500">
              <ImageIcon size={14} />

              {config.maxImages > 0
                ? `${config.maxImages} Images`
                : "Images Disabled"}

              <span>•</span>

              <Video size={14} />

              {config.maxVideos > 0 ? "1 Video" : "Videos Disabled"}
            </div>
          </div>

          <input
            hidden
            multiple
            ref={fileInputRef}
            type="file"
            accept={config.acceptedMedia.join(",")}
            onChange={handleMediaUpload}
          />

          <div
            onClick={() => fileInputRef.current.click()}
            className="group cursor-pointer rounded-3xl border-2 border-dashed border-slate-700 bg-[#0F172A]/60 p-8 transition-all duration-300 hover:border-[#00F2FE] hover:bg-[#111827]"
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#7F00FF] to-[#00F2FE] flex items-center justify-center shadow-xl group-hover:scale-105 transition">
                <UploadCloud size={34} className="text-white" />
              </div>

              <h3 className="mt-6 text-white text-lg font-semibold">
                Drag & Drop Media
              </h3>

              <p className="mt-2 text-slate-400 max-w-md">
                Click anywhere to browse your computer. Upload images or one
                video depending on the selected platform.
              </p>

              <Button
                type="button"
                className="cursor-pointer mt-6 pointer-events-none rounded-xl px-6"
              >
                Browse Files
              </Button>
            </div>
          </div>
        </section>
        {/* Selected Media starts here in Part 2 */}{" "}
        {/* ================= SELECTED MEDIA ================= */}
        {(images.length > 0 || video) && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-white font-semibold text-lg">
                  Selected Media
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  Review your uploaded files before publishing.
                </p>
              </div>

              <Badge className="bg-[#0F172A] border border-slate-700 rounded-xl">
                {images.length > 0
                  ? `${images.length} Image${images.length > 1 ? "s" : ""}`
                  : "1 Video"}
              </Badge>
            </div>

            {/* ================= IMAGE GALLERY ================= */}

            {images.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden border border-slate-700 bg-[#0F172A]"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                    {/* Footer */}

                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition duration-300">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-white text-xs truncate font-medium">
                            {image.name}
                          </p>

                          <p className="text-slate-300 text-[11px]">
                            {(image.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="cursor-pointer w-9 h-9 rounded-xl bg-red-500/90 hover:bg-red-600 flex items-center justify-center transition"
                        >
                          <X size={16} className="text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ================= VIDEO CARD ================= */}

            {video && (
              <div className="rounded-3xl overflow-hidden border border-slate-700 bg-[#0F172A]">
                <div className="relative">
                  <video
                    controls
                    src={URL.createObjectURL(video)}
                    className="w-full max-h-[420px] bg-black object-contain"
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeVideo();
                    }}
                    className="cursor-pointer absolute top-4 right-4 w-11 h-11 rounded-2xl bg-red-500 hover:bg-red-600 transition flex items-center justify-center shadow-lg"
                  >
                    <X size={18} className="text-white" />
                  </button>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-white font-semibold truncate">
                        {video.name}
                      </h4>

                      <p className="text-slate-400 text-sm mt-1">
                        {(video.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    <Badge className="rounded-xl bg-[#111827] border border-slate-700">
                      Video
                    </Badge>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}{" "}
      </div>

      {/* ================= FOOTER ================= */}

      <div className="pt-6 mt-auto border-t border-slate-800">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="text-white font-semibold">Ready to publish?</h4>

            <p className="text-sm text-slate-400 mt-1">
              Review your content before publishing it to{" "}
              <span className="text-cyan-400 font-medium">{config.label}</span>.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={onPublish}
              disabled={
                isPending ||
                (platform !== "linkedin" && images.length === 0 && !video) ||
                caption.length > config.maxCaption
              }
              className="cursor-pointer w-full lg:w-auto min-w-[240px] h-13 rounded-2xl bg-gradient-to-r from-[#7F00FF] to-[#00F2FE] hover:scale-[1.02] transition-all duration-300 text-base font-semibold shadow-lg shadow-cyan-500/10 disabled:opacity-60 disabled:hover:scale-100"
            >
              <Send size={18} />

              {isPending ? "Publishing..." : `Publish to ${config.label}`}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
