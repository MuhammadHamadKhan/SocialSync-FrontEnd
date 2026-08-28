import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  XCircle,
  Eye,
  X,
  Loader2,
  RefreshCcw,
  LogOut,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import {
  getProPaymentsApi,
  approveProPaymentApi,
  rejectProPaymentApi,
} from "../api/adminApi/adminApi";
import { logoutApi } from "../api/logoutApi"; // adjust path/name to match your actual logout API

const STATUS_STYLES = {
  pending: "bg-slate-700/40 text-slate-300 border-slate-600",
  payment_submitted: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  expired: "bg-rose-500/10 text-rose-400 border-rose-500/30",
  cancelled: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("payment_submitted");
  const [activePayment, setActivePayment] = useState(null); // for details modal
  const [actionModal, setActionModal] = useState(null); // { type: "approve" | "reject", payment }
  const [transactionId, setTransactionId] = useState("");
  const [reason, setReason] = useState("");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["proPayments"],
    queryFn: () => getProPaymentsApi(),
  });

  const approveMutation = useMutation({
    mutationFn: ({ id, transactionId }) =>
      approveProPaymentApi(id, transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proPayments"] });
      closeActionModal();
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }) => rejectProPaymentApi(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proPayments"] });
      closeActionModal();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      queryClient.clear(); // wipe cached user/query data
      window.location.href = "/login"; // adjust to your actual login route
    },
  });

  const closeActionModal = () => {
    setActionModal(null);
    setTransactionId("");
    setReason("");
  };

  const handleConfirmAction = () => {
    if (!actionModal) return;
    const { type, payment } = actionModal;

    if (type === "approve") {
      approveMutation.mutate({
        id: payment.id,
        transactionId: transactionId || payment.transactionId,
      });
    } else {
      rejectMutation.mutate({ id: payment.id, reason });
    }
  };

  const payments = data?.payments || [];

  return (
    <div className="min-h-screen bg-[#0B0F19] px-5 py-8 sm:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Pro Payment Requests
            </h1>
            <p className="text-sm text-[#94A3B8] mt-1">
              Review and confirm manual pro-plan payments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-xl border border-slate-800 bg-[#171E2E] px-3 text-sm text-white outline-none focus:border-[#00F2FE]"
            >
              <option value="payment_submitted">Payment Submitted</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
              <option value="all">All</option>
            </select>

            <button
              onClick={() => refetch()}
              className="cursor-pointer h-10 w-10 flex items-center justify-center rounded-xl border border-slate-800 bg-[#171E2E] text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
              title="Refresh"
            >
              <RefreshCcw
                className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`}
              />
            </button>

            <button
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className="cursor-pointer h-10 px-4 flex items-center gap-1.5 rounded-xl border border-slate-800 bg-[#171E2E] text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10 transition-colors text-sm font-medium disabled:opacity-50"
              title="Logout"
            >
              {logoutMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              Logout
            </button>
          </div>
        </div>

        {/* States */}
        {isLoading && (
          <div className="flex items-center justify-center py-20 text-[#94A3B8]">
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Loading payment requests...
          </div>
        )}

        {isError && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-300 text-sm">
            {error?.response?.data?.message ||
              error?.message ||
              "Failed to load payments"}
          </div>
        )}

        {!isLoading && !isError && payments.length === 0 && (
          <div className="py-20 text-center text-[#64748B] text-sm">
            No payment requests found for this status.
          </div>
        )}

        {/* List */}
        <div className="space-y-3">
          {payments.map((payment) => (
            <Card
              key={payment.id}
              className="p-4 sm:p-5 border border-slate-800 bg-[#171E2E]/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-semibold truncate">
                    {payment.username}
                  </h3>
                  <span
                    className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                      STATUS_STYLES[payment.status] ||
                      "bg-slate-700/40 text-slate-300 border-slate-600"
                    }`}
                  >
                    {payment.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1 truncate">
                  {payment.email}
                </p>
                <p className="text-xs text-[#64748B] mt-1">
                  {payment.paymentProvider} &middot; {payment.amount}{" "}
                  {payment.currency}
                  {payment.transactionId
                    ? ` · TxID: ${payment.transactionId}`
                    : ""}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActivePayment(payment)}
                  className="cursor-pointer h-9 px-3 flex items-center gap-1.5 rounded-lg border border-slate-800 text-xs text-[#94A3B8] hover:text-white hover:border-slate-600 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Details
                </button>

                <button
                  onClick={() => setActionModal({ type: "approve", payment })}
                  className="cursor-pointer h-9 px-3 flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Approve
                </button>

                <button
                  onClick={() => setActionModal({ type: "reject", payment })}
                  className="cursor-pointer h-9 px-3 flex items-center gap-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 hover:bg-rose-500/20 transition-colors"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Reject
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Details Modal */}
      {activePayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <Card className="w-full max-w-md p-5 sm:p-6 border border-slate-800 bg-[#171E2E] rounded-2xl relative">
            <button
              onClick={() => setActivePayment(null)}
              className="cursor-pointer absolute top-4 right-4 text-[#64748B] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-white font-semibold text-lg mb-4">
              Payment Details
            </h2>

            <dl className="space-y-2 text-sm">
              {[
                ["Username", activePayment.username],
                ["Email", activePayment.email],
                ["Role", activePayment.role],
                ["Provider", activePayment.paymentProvider],
                ["Amount", `${activePayment.amount} ${activePayment.currency}`],
                ["Status", activePayment.status],
                ["Transaction ID", activePayment.transactionId || "—"],
                ["Rejection Reason", activePayment.rejectionReason || "—"],
                [
                  "Expires At",
                  new Date(activePayment.expiresAt).toLocaleString(),
                ],
                [
                  "Created At",
                  new Date(activePayment.createdAt).toLocaleString(),
                ],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-[#64748B]">{label}</dt>
                  <dd className="text-white text-right break-all">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      )}

      {/* Approve/Reject Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50">
          <Card className="w-full max-w-sm p-5 sm:p-6 border border-slate-800 bg-[#171E2E] rounded-2xl relative">
            <button
              onClick={closeActionModal}
              className="cursor-pointer absolute top-4 right-4 text-[#64748B] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-white font-semibold text-lg mb-1">
              {actionModal.type === "approve"
                ? "Approve Payment"
                : "Reject Payment"}
            </h2>
            <p className="text-xs text-[#94A3B8] mb-4">
              {actionModal.payment.username} &middot;{" "}
              {actionModal.payment.email}
            </p>

            {actionModal.type === "approve" ? (
              <div className="mb-4">
                <label className="block text-xs font-semibold tracking-wide text-[#94A3B8] uppercase mb-2">
                  Transaction ID
                </label>
                <input
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder={
                    actionModal.payment.transactionId || "Enter transaction ID"
                  }
                  className="w-full h-11 rounded-xl border border-slate-800 bg-[#0B0F19] px-3 text-white placeholder:text-[#64748B] outline-none focus:border-[#00F2FE]"
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-xs font-semibold tracking-wide text-[#94A3B8] uppercase mb-2">
                  Reason (optional)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Payment rejected by admin"
                  rows={3}
                  className="w-full rounded-xl border border-slate-800 bg-[#0B0F19] px-3 py-2 text-white placeholder:text-[#64748B] outline-none focus:border-[#00F2FE] resize-none"
                />
              </div>
            )}

            {(approveMutation.isError || rejectMutation.isError) && (
              <div className="mb-4 p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-rose-300">
                {approveMutation.error?.response?.data?.message ||
                  rejectMutation.error?.response?.data?.message ||
                  "Action failed"}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={closeActionModal}
                className="cursor-pointer flex-1 h-10 rounded-xl border border-slate-800 text-[#94A3B8] hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmAction}
                disabled={approveMutation.isPending || rejectMutation.isPending}
                className={`cursor-pointer flex-1 h-10 rounded-xl font-semibold text-white ${
                  actionModal.type === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                {approveMutation.isPending || rejectMutation.isPending
                  ? "Processing..."
                  : actionModal.type === "approve"
                    ? "Confirm Approve"
                    : "Confirm Reject"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
