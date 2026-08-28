import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/loginApi";
import authStore from "../store/store";

export default function Login() {
  const navigate = useNavigate();
  const isLogin = authStore((state) => state.isLogin);
  const setLogin = authStore((state) => state.setLogin);
  const isAdmin = authStore((state) => state.isAdmin);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      setLogin(response.isAdmin); // pass isAdmin into the store
      navigate(response.isAdmin ? "/adminPanel" : "/dashboard/overview");
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    mutate(formData);
  };
  if (isLogin) {
    return (
      <Navigate to={isAdmin ? "/adminPanel" : "/dashboard/overview"} replace />
    );
  }
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-5 py-8 sm:px-8">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-[#00F2FE]/20 to-[#7F00FF]/20 border border-slate-800 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-7 h-7 text-[#00F2FE]" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-white tracking-tight">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[#94A3B8] leading-relaxed">
            Sign in to continue managing your social channels and automated
            publishing.
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-5 sm:p-8 border border-slate-800 bg-[#171E2E]/80 backdrop-blur-xl rounded-2xl">
          <form className="space-y-5" onSubmit={handleForm}>
            {/* Email */}
            <div>
              <label className="block text-xs font-semibold tracking-wide text-[#94A3B8] uppercase mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00F2FE]" />

                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 rounded-xl border border-slate-800 bg-[#0B0F19] pl-11 pr-4 text-white placeholder:text-[#64748B] outline-none transition-all focus:border-[#00F2FE] focus:ring-2 focus:ring-[#00F2FE]/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold tracking-wide text-[#94A3B8] uppercase">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-[#00F2FE] hover:text-white transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00F2FE]" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full h-12 rounded-xl border border-slate-800 bg-[#0B0F19] pl-11 pr-4 text-white placeholder:text-[#64748B] outline-none transition-all focus:border-[#00F2FE] focus:ring-2 focus:ring-[#00F2FE]/20"
                />
              </div>
            </div>
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
                      "Invalid email or password"}
                  </p>
                </div>
              </div>
            )}
            {isSuccess && (
              <div className="flex items-center gap-2.5 p-3 sm:p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="text-[11px] sm:text-xs font-medium">
                  Logged in successfully
                </span>
              </div>
            )}
            {/* Login Button */}
            <Button
              type="submit"
              className=" cursor-pointer w-full h-12 rounded-xl bg-linear-to-r from-[#00F2FE] to-[#7F00FF] text-white font-semibold shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all"
            >
              <span className="flex items-center justify-center gap-2">
                {isPending ? "Signing In...." : "Sign  In"}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-[#171E2E] px-3 text-xs text-[#64748B]">
                Secure Login
              </span>
            </div>
          </div>

          {/* Security Note */}
          <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-[#0B0F19] p-4">
            <ShieldCheck className="w-5 h-5 text-[#00F2FE] shrink-0 mt-0.5" />

            <div>
              <h3 className="text-sm font-semibold text-white">
                Your account is protected
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">
                We use secure authentication to keep your connected social
                accounts and publishing data safe.
              </p>
            </div>
          </div>

          {/* Register */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#94A3B8]">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#00F2FE] hover:text-white transition-colors"
              >
                Create one
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
