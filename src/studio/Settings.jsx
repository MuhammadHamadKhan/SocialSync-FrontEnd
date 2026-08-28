import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LogOut, Trash2, AlertTriangle, X, Loader2 } from "lucide-react";
import { logoutApi, deleteApi } from "../api/logoutApi"; // adjust path to match your api folder
import authStore from "../store/store";

/**
 * Settings page — Dashboard section
 * Matches SocialSync theme: bg #0B0F19, card surfaces #171E2E, slate-800 borders,
 * cyan/purple accents, rounded-2xl, mobile-first padding.
 *
 * Wire up:
 * - onLoggedOut: called after logoutApi succeeds (clear auth state, redirect to /login)
 * - onAccountDeleted: called after deleteApi succeeds (clear auth state, redirect to /login)
 */
export default function Settings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const { setLogout, user } = authStore((state) => state);
  const CONFIRM_WORD = "DELETE";
  const canDelete = confirmText === CONFIRM_WORD;

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => setLogout(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => setLogout(),
  });

  const handleDelete = () => {
    if (!canDelete) return;
    deleteMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] p-5 sm:p-8 text-white">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Settings</h1>
          <p className="text-[#94A3B8] text-sm mt-1">
            Manage your account and session.
          </p>
        </div>

        {/* Logout */}
        <section className="bg-[#171E2E] border border-slate-800 rounded-2xl p-5 sm:p-6">
          <h2 className="text-white font-medium mb-1">Log out</h2>
          <p className="text-[#94A3B8] text-sm mb-4">
            Sign out of SocialSync on this device.
          </p>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-white hover:border-[#00F2FE] hover:text-[#00F2FE] transition-colors"
          >
            <LogOut size={16} />
            Log out
          </button>
        </section>

        {/* Danger zone */}
        <section className="bg-[#171E2E] border border-red-900/40 rounded-2xl p-5 sm:p-6">
          <h2 className="text-white font-medium mb-1">Delete account</h2>
          <p className="text-[#94A3B8] text-sm mb-4">
            Permanently delete your account, connected socials, and all
            scheduled and published post history. This can't be undone.
          </p>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={16} />
            Delete account
          </button>
        </section>
      </div>
      {/* Confirm logout modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#171E2E] border border-slate-800 rounded-2xl p-6 relative">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center shrink-0">
                <LogOut size={18} className="text-[#00F2FE]" />
              </div>
              <h3 className="text-white font-semibold text-lg">Log out?</h3>
            </div>

            <p className="text-[#94A3B8] text-sm mb-6">
              You'll need to sign in again to access your dashboard.
            </p>

            {logoutMutation.isError && (
              <p className="text-red-400 text-sm mb-4">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logoutMutation.reset();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-800 text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00F2FE] text-[#0B0F19] font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#00F2FE]/90 transition-colors"
              >
                {logoutMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <LogOut size={16} />
                )}
                {logoutMutation.isPending ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirm delete modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#171E2E] border border-slate-800 rounded-2xl p-6 relative">
            <button
              onClick={() => {
                setShowDeleteModal(false);
                setConfirmText("");
                deleteMutation.reset();
              }}
              className="cursor-pointer absolute top-4 right-4 text-[#94A3B8] hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                <AlertTriangle size={18} className="text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg">
                Delete your account?
              </h3>
            </div>

            <p className="text-[#94A3B8] text-sm mb-4">
              This will permanently delete{" "}
              <span className="text-white">{user.email}</span> and everything
              tied to it — connected social accounts, media, and post history.
              This action can't be undone.
            </p>

            <label className="block text-xs text-[#94A3B8] mb-2">
              Type{" "}
              <span className="text-white font-medium">{CONFIRM_WORD}</span> to
              confirm
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder={CONFIRM_WORD}
              className="w-full bg-[#0B0F19] border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-red-500/50 mb-4"
            />

            {deleteMutation.isError && (
              <p className="text-red-400 text-sm mb-4">
                Something went wrong. Please try again.
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setConfirmText("");
                  deleteMutation.reset();
                }}
                className="cursor-pointer flex-1 px-4 py-2.5 rounded-xl border border-slate-800 text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={!canDelete || deleteMutation.isPending}
                className="cursor-pointer flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
              >
                {deleteMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
