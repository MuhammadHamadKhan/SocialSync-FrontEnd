import React from "react";
import {
  Play,
  Calendar,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Layers,
} from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function PostFeedGrid({ posts = [], onPublishTrigger }) {
  // Empty State Dashboard Layout Guard
  if (posts.length === 0) {
    return (
      <Card className="p-8 text-center border-dashed border-slate-800 bg-[#171E2E]">
        <div className="w-12 h-12 rounded-2xl bg-[#0B0F19] border border-slate-800 flex items-center justify-center mx-auto mb-4 text-[#94A3B8]">
          <Layers className="w-5 h-5" />
        </div>
        <h3 className="text-base font-bold text-white tracking-wide">
          No Created Posts Found
        </h3>
        <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mt-1 leading-relaxed">
          Use the Creative Studio tab to import files or scrape product assets
          to populate your media distribution catalog.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Dynamic Header Metrics Anchor */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-wide">
            Production Media Library
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Compiled content objects ready for cloud distribution
          </p>
        </div>
        <Badge variant="cyan" className="text-[10px]">
          {posts.length} Items Total
        </Badge>
      </div>

      {/* Grid Allocation Layout System */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card
            key={post.id}
            hoverEffect={true}
            className="flex flex-col h-full bg-[#171E2E]"
          >
            {/* Visual Media Header Wrapper */}
            <div className="relative aspect-[16/10] bg-[#0B0F19] overflow-hidden group border-b border-slate-800">
              {post.media && post.media.length > 0 ? (
                <img
                  src={post.media[0]}
                  alt="Campaign active core preview node"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#94A3B8]">
                  <Play className="w-8 h-8 opacity-40" />
                </div>
              )}

              {/* Asset Origin Sourcing Tracker Label */}
              <div className="absolute bottom-3 left-3 z-10">
                <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-[#0B0F19]/80 border border-slate-800 backdrop-blur-sm text-white">
                  {post.source}
                </span>
              </div>
            </div>

            {/* Content Metadata Display Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-[#94A3B8] font-mono flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#00F2FE]" />
                  {post.timestamp}
                </p>
                <p className="text-sm font-medium text-white line-clamp-2 leading-relaxed">
                  {post.caption ||
                    "No campaign caption drafted for this distribution run."}
                </p>
              </div>

              {/* Action Operations Execution Row */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between gap-3">
                <div className="flex gap-1">
                  <Badge
                    variant="cyan"
                    className="scale-95 text-[9px] px-2 py-0.5"
                  >
                    TikTok
                  </Badge>
                  <Badge
                    variant="purple"
                    className="scale-95 text-[9px] px-2 py-0.5"
                  >
                    YouTube
                  </Badge>
                </div>

                {/* Theme Compliant Small Gradient Dispatch Control */}
                <Button
                  onClick={() => onPublishTrigger(post.id)}
                  variant="primary"
                  className="px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 shadow-sm font-semibold"
                >
                  <ExternalLink className="w-3 h-3" />
                  Publish
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
