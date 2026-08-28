import React, { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ShieldCheck,
  Crown,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Wallet,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Payment from "../components/Payment";
import { Link, Navigate, useNavigate } from "react-router-dom";
import authStore from "../store/store";
import { registerUser } from "../api/loginApi"; // adjust to the actual path/filename of your axios instance

// Extracted so React Query owns the network call — testable in isolation,
// and swappable for a shared axios/fetch client later.
async function registerUser(payload) {
  const response = await api.post("/api/auth/register", payload);
  return response.data;
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const isLogin = authStore((state) => state.isLogin);
  const setLogin = authStore((state) => state.setLogin);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "free",
    paymentProvider: "easypaisa",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React Query now owns loading / error / response-data state for us —
  // registerMutation.isPending / .error / .data replace the old uiState object.
  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data, variables) => {
      const { role } = variables;

      if (role === "free") {
        setLogin();
        navigate("/dashboard/overview");
      }
      // pro: don't touch auth state — no session exists yet.
      // Payment component renders below once approved.
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (registerMutation.isError) registerMutation.reset();
  };

  const handleRoleSelect = (selectedRole) => {
    setFormData((prev) => ({ ...prev, role: selectedRole }));
    registerMutation.reset();
  };

  // Only trigger an error if the user has typed at least as many characters as the main password
  const isPasswordMismatched =
    formData.confirmPassword.length >= formData.password.length &&
    formData.password !== formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      // Local validation error — surface it the same way mutation errors are shown.
      registerMutation.reset();
      setLocalError("Passwords do not match. Please verify.");
      return;
    }

    const { confirmPassword, ...apiPayload } = formData;
    registerMutation.mutate(apiPayload);
  };

  // Small local-only error for the client-side password check above,
  // kept separate from registerMutation.error (server-side errors).
  const [localError, setLocalError] = useState("");
  const displayedError =
    localError ||
    registerMutation.error?.response?.data?.message ||
    registerMutation.error?.message;

  if (registerMutation.data && formData.role === "pro") {
    return <Payment uiState={{ apiResponseData: registerMutation.data }} />;
  }

  if (isLogin) {
    return <Navigate to={"/dashboard/overview"} />;
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#94A3B8] flex items-center justify-center p-4 sm:p-8 font-sans selection:bg-[#00F2FE]/30 selection:text-white relative overflow-x-hidden">
      <div className="hidden sm:block absolute top-1/4 left-1/4 w-96 h-96 bg-[#00F2FE]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7F00FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full sm:max-w-md bg-[#171E2E] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden relative z-10">
        <div className="px-5 pt-6 pb-3 text-center sm:px-8 sm:pt-8 sm:pb-4">
          <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-tr from-[#7F00FF] to-[#00F2FE] rounded-xl text-white shadow-lg mb-3 sm:mb-4">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Create your account
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Sync your entire social presence instantly
          </p>
        </div>

        <div className="px-5 py-1.5 sm:px-8 sm:py-2">
          <div
            className="grid grid-cols-2 gap-2 bg-[#0B0F19] p-1.5 rounded-xl border border-slate-800"
            role="tablist"
          >
            <button
              type="button"
              onClick={() => handleRoleSelect("free")}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                formData.role === "free"
                  ? "bg-slate-800 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Free Tier
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("pro")}
              className={`flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer relative overflow-hidden ${
                formData.role === "pro"
                  ? "bg-gradient-to-r from-[#7F00FF]/20 to-[#00F2FE]/20 text-white border border-[#00F2FE]/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Crown
                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${formData.role === "pro" ? "text-[#00F2FE]" : ""}`}
              />{" "}
              Pro Sync
            </button>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-8 pt-3 sm:pt-4 space-y-4.5 sm:space-y-4"
        >
          <div>
            <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00F2FE]" />
              </span>
              <input
                type="text"
                name="username"
                minLength={3}
                maxLength={15}
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00F2FE]" />
              </span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00F2FE]" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                minLength={8}
                maxLength={15}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                tabIndex="-1"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00F2FE]" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-11 py-2.5 bg-[#0B0F19] border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all text-sm sm:text-base ${
                  isPasswordMismatched
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                    : "border-slate-800 focus:border-[#00F2FE] focus:ring-[#00F2FE]"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                tabIndex="-1"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {isPasswordMismatched && (
              <p className="text-rose-400 text-[10px] sm:text-[11px] mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3 h-3" /> Passwords do not match yet
              </p>
            )}
          </div>

          {formData.role === "pro" && (
            <div className="transition-all duration-300">
              <label className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#00F2FE] mb-1.5 flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5" /> Mobile Wallet Provider
              </label>
              <div className="relative">
                <select
                  name="paymentProvider"
                  value={formData.paymentProvider}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-[#0B0F19] border border-[#00F2FE]/30 rounded-xl text-white appearance-none focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] cursor-pointer font-medium text-sm sm:text-base"
                >
                  <option value="easypaisa">Easypaisa Mobile Account</option>
                  <option value="jazzcash">JazzCash Mobile Wallet</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#00F2FE]">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://w3.org"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending || isPasswordMismatched}
            className="w-full py-3 mt-1.5 sm:mt-2 text-sm sm:text-base font-semibold rounded-xl text-white transition-all transform active:scale-[0.97] sm:active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-lg bg-gradient-to-r from-[#7F00FF] to-[#00F2FE] hover:opacity-95 shadow-[#00F2FE]/10 disabled:opacity-40 disabled:pointer-events-none"
          >
            {registerMutation.isPending ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : formData.role === "pro" ? (
              <>
                <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />{" "}
                Complete Pro Sync Setup
              </>
            ) : (
              "Create My Free Workspace"
            )}
          </button>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#94A3B8]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#00F2FE] hover:text-white transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {displayedError && (
            <div className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium">
                {displayedError}
              </span>
            </div>
          )}

          {registerMutation.isSuccess && formData.role === "free" && (
            <div className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium">
                Registered successfully!
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
