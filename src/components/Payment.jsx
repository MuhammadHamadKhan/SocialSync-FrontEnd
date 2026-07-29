import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { submitPaymentApi } from "../api/submitPayment";

const Payment = ({ uiState }) => {
  const [paymentData, setPaymentData] = useState({
    pendingRegistrationId: "",
    transactionId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value,
    });
  };

  const { mutate, data, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: submitPaymentApi,
  });

  const formHandler = (e) => {
    e.preventDefault(); // Prevents page reload
    mutate(paymentData);
  };
  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#94A3B8] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#00F2FE]/30 selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glow Nodes */}
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F2FE]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7F00FF]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Primary Layout Structural Container */}
      <div className="w-full sm:max-w-md bg-[#171E2E] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10 animate-fadeIn">
        {/* CASE A: SHOW SUCCESS RESPONSE FROM SERVER */}
        {isSuccess ? (
          <div className="p-6 sm:p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full shadow-lg mx-auto">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Submission Received
            </h2>

            <div className="bg-[#0B0F19] rounded-xl p-4 border border-slate-800 text-sm text-slate-300 leading-relaxed">
              {data?.message ||
                "Your payment verification has been forwarded to the admin panel."}
            </div>
          </div>
        ) : (
          /* CASE B: SHOW STANDARD PAYMENT FORM */
          <>
            {/* Header Status Bar Area */}
            <div className="px-5 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-4 border-b border-slate-800/60">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                    Payment Required
                  </span>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Action Required
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                {uiState.apiResponseData.message ||
                  "Complete your transaction to activate Pro."}
              </h2>
            </div>

            {/* Invoice Specs Panel */}
            <div className="px-5 py-4 sm:px-8 space-y-3.5">
              <div className="bg-[#0B0F19] rounded-xl p-4 border border-slate-800 space-y-3.5 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-xs font-medium text-slate-400">
                    Selected Provider
                  </span>
                  <span className="text-xs font-bold text-[#00F2FE] uppercase bg-[#00F2FE]/10 px-2 py-0.5 rounded-md border border-[#00F2FE]/20">
                    {uiState.apiResponseData.payment?.provider ||
                      "Mobile Account"}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800/50 pb-2">
                  <span className="text-xs font-medium text-slate-400">
                    Total Amount Due
                  </span>
                  <span className="text-base font-extrabold text-emerald-400">
                    {uiState.apiResponseData.payment?.amount}{" "}
                    {uiState.apiResponseData.payment?.currency}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    Send Payment To:
                  </label>
                  <div className="bg-[#171E2E] px-3 py-2 rounded-lg border border-slate-800/80 text-xs font-semibold text-white">
                    {uiState.apiResponseData.payment?.account?.accountTitle}
                  </div>
                  <div className="bg-[#171E2E] px-3 py-2 rounded-lg border border-slate-800/80 flex justify-between items-center text-sm font-mono font-bold text-white">
                    {uiState.apiResponseData.payment?.account?.mobileNumber}
                  </div>

                  <div className="bg-[#171E2E] px-1 sm:px:3 py-2 rounded-lg border border-slate-800/80 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-col justify-center ">
                      <span className="block text-[9px] text-slate-500 uppercase font-medium">
                        Registration ID
                      </span>
                      <span className="text-sm font-mono font-bold text-white tracking-wider">
                        {uiState.apiResponseData.pendingRegistrationId}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          uiState.apiResponseData.pendingRegistrationId || "",
                        );
                        alert("Registration ID copied to clipboard!");
                      }}
                      className="text-[10px]    font-medium text-[#00F2FE] bg-[#00F2FE]/10 border border-[#00F2FE]/20 hover:bg-[#00F2FE]/20 px-2 py-1 rounded-md transition-colors cursor-pointer"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Input Form Fields */}
            <form
              onSubmit={formHandler}
              className="p-5 sm:p-8 pt-0 sm:pt-0 space-y-4"
            >
              <div>
                <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Registration ID
                </label>
                <input
                  type="text"
                  name="pendingRegistrationId"
                  value={paymentData.pendingRegistrationId}
                  onChange={handleChange}
                  required
                  minLength={5}
                  maxLength={30}
                  pattern="^[a-zA-Z0-9_-]+$"
                  title="Registration ID must contain only alphanumeric letters and numbers (min 5 characters)."
                  placeholder="write registrationID provided"
                  className="w-full pl-4 pr-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#00F2FE]"
                />
              </div>

              <div>
                <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Transaction ID (TID)
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={paymentData.transactionId}
                  onChange={handleChange}
                  required
                  minLength={6}
                  maxLength={24}
                  pattern="^[a-zA-Z0-9]+$"
                  title="Transaction ID must contain only letters and numbers (minimum 6 characters, no spaces)."
                  placeholder="e.g. 23894723948"
                  className="w-full pl-4 pr-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-[#00F2FE]"
                />
              </div>

              {/* STYLIZED INLINE ERROR BANNER */}
              {isError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-2.5 animate-fadeIn">
                  <span className="text-rose-400 mt-0.5">⚠️</span>
                  <div>
                    <p className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      Submission Failed
                    </p>
                    <p className="text-xs text-rose-300 mt-0.5 leading-relaxed">
                      {error?.response?.data?.message ||
                        error?.message ||
                        "Invalid registration or transaction details."}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#7F00FF] to-[#00F2FE] hover:opacity-95 disabled:opacity-50 text-white font-semibold rounded-xl text-xs sm:text-sm cursor-pointer transition-all shadow-lg active:scale-[0.98]"
                >
                  {isPending ? "Submitting..." : "Submit Proof"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
