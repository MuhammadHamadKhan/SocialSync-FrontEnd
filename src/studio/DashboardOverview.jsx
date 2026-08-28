import React, { useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  Send,
  XCircle,
  Link2,
  ImageIcon,
  Plus,
  ArrowUpRight,
  Camera as Instagram,
  VideoIcon as Youtube,
  Music2,
  Link2Icon as Linkedin,
  CheckCircle2,
} from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import authStore from "../store/store";
import { useNavigate } from "react-router-dom";

const KNOWN_PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "tiktok", label: "TikTok", icon: Music2 },
  { key: "youtube", label: "YouTube", icon: Youtube },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
];

const fetchDashboardOverview = async () => {
  const { data } = await axios.get(
    "http://localhost:3000/api/social/get/overview",
    { withCredentials: true },
  );
  return data;
};

const ACTIVITY_PAGE_SIZE = 10;

const fetchActivityPage = async ({ pageParam }) => {
  const { data } = await axios.get(
    "http://localhost:3000/api/social/get/activity",
    {
      params: { cursor: pageParam, limit: ACTIVITY_PAGE_SIZE },
      withCredentials: true,
    },
  );
  return data;
};

function StatCardSkeleton() {
  return (
    <Card className="p-5">
      <div className="w-9 h-9 rounded-xl bg-slate-800/60 animate-pulse" />
      <div className="h-6 w-12 rounded bg-slate-800/60 animate-pulse mt-4" />
      <div className="h-3 w-20 rounded bg-slate-800/60 animate-pulse mt-2" />
    </Card>
  );
}

export default function DashboardOverview() {
  const navigate = useNavigate();
  const user = authStore((state) => state.user);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,
  });

  const {
    data: activityPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isActivityLoading,
    isError: isActivityError,
  } = useInfiniteQuery({
    queryKey: ["dashboard-activity"],
    queryFn: fetchActivityPage,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const recentActivity =
    activityPages?.pages.flatMap((page) => page.items) ?? [];

  // Sentinel element at the bottom of the list — fetch the next page once it
  // scrolls into view, so the list loads automatically instead of a button.
  const sentinelRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage],
  );

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "80px",
      threshold: 0,
    });
    observer.observe(node);

    return () => observer.disconnect();
  }, [handleObserver]);

  const stats = data?.stats;
  const connectedPlatformKeys = new Set(
    (data?.platforms ?? []).map((a) => a.platform),
  );

  const STAT_CARDS = stats
    ? [
        {
          key: "published",
          label: "Posts published",
          value: stats.postsPublished,
          icon: Send,
          accent: "text-[#00F2FE]",
          iconBg: "bg-[#00F2FE]/10",
        },
        {
          key: "failed",
          label: "Failed posts",
          value: stats.postsFailed,
          icon: XCircle,
          accent: "text-[#7F00FF]",
          iconBg: "bg-[#7F00FF]/10",
        },
        {
          key: "connected",
          label: "Connected accounts",
          value: `${stats.connectedAccounts} / ${stats.totalPlatforms}`,
          icon: Link2,
          accent: "text-[#00F2FE]",
          iconBg: "bg-[#00F2FE]/10",
        },
        {
          key: "media",
          label: "Media imported",
          value: stats.mediaImported,
          icon: ImageIcon,
          accent: "text-[#7F00FF]",
          iconBg: "bg-[#7F00FF]/10",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      {/* Welcome / quick action row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            Welcome back {user?.username}
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Here's what's happening across your channels today.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            navigate("/dashboard/create");
          }}
          className="cursor-pointer w-full sm:w-auto py-2.5 px-5 text-xs rounded-xl shadow-md font-bold"
        >
          <Plus className="w-4 h-4" />
          Create new post
        </Button>
      </div>

      {isError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          Couldn't load dashboard data
          {error?.response?.data?.message
            ? `: ${error.response.data.message}`
            : "."}
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))
          : STAT_CARDS.map(
              ({ key, label, value, icon: Icon, accent, iconBg }) => (
                <Card key={key} className="p-5">
                  <div
                    className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}
                  >
                    <Icon className={`w-4 h-4 ${accent}`} />
                  </div>
                  <p className="text-2xl font-bold text-white mt-4">{value}</p>
                  <p className="text-xs text-[#94A3B8] mt-1">{label}</p>
                </Card>
              ),
            )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Recent activity */}
        <Card className="lg:col-span-2 p-5 sm:p-6">
          <div className="flex items-center justify-between pb-5 border-b border-slate-800">
            <h2 className="text-base font-bold text-white tracking-wide">
              Recent activity
            </h2>
            <button className="text-xs text-[#00F2FE] font-semibold flex items-center gap-1 hover:underline">
              View all
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="mt-4 space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {isActivityLoading && (
              <p className="text-xs text-[#94A3B8]">Loading activity…</p>
            )}

            {isActivityError && (
              <p className="text-xs text-red-400">
                Couldn't load recent activity.
              </p>
            )}

            {!isActivityLoading && recentActivity.length === 0 && (
              <p className="text-xs text-[#94A3B8]">
                No posts yet — create your first one to see it here.
              </p>
            )}

            {recentActivity.map((post) => (
              <div
                key={post._id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F19] border border-slate-800/60"
              >
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    {post.caption || "Untitled post"}
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] mt-0.5">
                    {(post.platforms || []).join(", ") || "No platform"} ·{" "}
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant={post.status === "published" ? "cyan" : "purple"}
                  className="text-[9px] px-2 py-0.5 tracking-wider capitalize"
                >
                  {post.status}
                </Badge>
              </div>
            ))}

            {/* Sentinel: fetches the next page once it scrolls into view */}
            {recentActivity.length > 0 && (
              <div ref={sentinelRef} className="h-1" />
            )}

            {isFetchingNextPage && (
              <p className="text-center text-[11px] text-[#94A3B8] py-2">
                Loading more…
              </p>
            )}

            {!hasNextPage && recentActivity.length > 0 && (
              <p className="text-center text-[11px] text-[#94A3B8] py-2">
                You're all caught up
              </p>
            )}
          </div>
        </Card>

        {/* Connected platforms status */}
        <Card className="p-5">
          <h2 className="text-base font-bold text-white tracking-wide pb-4 border-b border-slate-800">
            Platform status
          </h2>

          <div className="mt-4 space-y-3">
            {isLoading && (
              <p className="text-xs text-[#94A3B8]">Loading platforms…</p>
            )}

            {!isLoading &&
              KNOWN_PLATFORMS.map(({ key, label, icon: Icon }) => {
                const connected = connectedPlatformKeys.has(key);
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#0B0F19] border border-slate-800/60"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-[#94A3B8]" />
                      <span className="text-xs font-semibold text-white">
                        {label}
                      </span>
                    </div>
                    {connected ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : (
                      <span className="text-[10px] text-[#94A3B8]">
                        Not linked
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </Card>
      </div>
    </div>
  );
}
