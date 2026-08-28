import { useState } from "react";

import { PLATFORM_CONFIG } from ".././constants/platformConfig";

import ComposeCard from ".././studio/create/common/ComposeCard";
import PreviewCard from ".././studio/create/common/PreviewCard";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createPostApi, publishPostApi } from "../api/createPostApi";
import { toast } from "react-toastify";

export default function CreatePost() {
  const { platform } = useParams();
  const config = PLATFORM_CONFIG[platform];
  if (!config) {
    return <h1>Platform not found</h1>;
  }
  const [caption, setCaption] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const {
    mutate: publishPost,
    isPending: publishPending,
    error: publishError,
  } = useMutation({
    mutationKey: ["publishPost"],
    mutationFn: publishPostApi,
    onSuccess: (data) => {
      if (data.status === "published") {
        toast.success("Post published successfully.");
        return;
      }

      const failedPlatforms = Object.entries(data.results)
        .filter(([_, result]) => !result.success)
        .map(([platform, result]) => `${platform}: ${result.message}`);

      toast.error(failedPlatforms.join("\n"));
    },
    onError: (publishError) => {
      toast.error(
        publishError.response?.data?.message ||
          publishError.message ||
          "Something went wrong",
      );
    },
  });
  const {
    mutate: createPost,
    isPending: createPending,
    data,
    error: createError,
  } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostApi,
    onSuccess: (data) => {
      const postId = data?.post._id;

      publishPost({ postId, platforms: platform });
    },
    onError: (createError) => {
      toast.error(
        createError.response?.data?.message ||
          createError.message ||
          "Something went wrong",
      );
    },
  });
  // console.log(data.post.userId);

  const isPending = publishPending || createPending;
  function handlePublish() {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("platforms", platform); // single value; backend's normalizeList handles it

    images.forEach((img) => formData.append("files", img));
    if (video) formData.append("files", video);

    createPost(formData);

    // triggers the mutation
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Create {config.label} Post
            </h1>

            <p className="mt-2 text-slate-400 max-w-2xl">
              Create engaging content, preview it instantly, and publish to your
              connected {config.label} account.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#171E2E] px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Platform
            </p>

            <p className="mt-1 font-semibold text-white">{config.label}</p>
          </div>
        </div>
      </div>

      {/* Layout */}

      <div className="grid gap-6 xl:grid-cols-12">
        {/* Compose */}

        <div className="xl:col-span-8  xl:order-1">
          <ComposeCard
            config={config}
            platform={platform}
            caption={caption}
            setCaption={setCaption}
            images={images}
            setImages={setImages}
            video={video}
            setVideo={setVideo}
            onPublish={handlePublish}
            isPending={isPending}
          />
        </div>

        {/* Preview */}

        <div className="xl:col-span-4  xl:order-2">
          <div className="xl:sticky xl:top-6">
            <PreviewCard
              config={config}
              caption={caption}
              images={images}
              video={video}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
