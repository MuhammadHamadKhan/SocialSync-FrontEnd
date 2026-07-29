import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Core Application Feature Components
import DashboardLayout from "./dashboard/DashboardLayout";
import CreativeStudio from "./studio/CreativeStudio";
import PostFeedGrid from "./dashboard/PostFeed";
import ConnectSocials from "./studio/ConnectSocials";
import RegisterForm from "./pages/Registeration";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useQuery } from "@tanstack/react-query";
import { authMe } from "./api/authApi";
import authStore from "./store/store";
import ProtectedRoute from "./dashboard/ProtectedRoute";
import Privacy from "./privacy/Privacy";
export default function App() {
  const store = authStore();
  const setLogin = authStore((state) => state.setLogin);
  const setLogout = authStore((state) => state.setLogout);
  const isLogin = authStore((state) => state.isLogin);

  console.log(store);

  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: authMe,
  });

  useEffect(() => {
    if (isSuccess) {
      setLogin(data.user);
    }
  }, [isSuccess, data, setLogin]);
  useEffect(() => {
    if (isError) {
      setLogout();
    }
  }, [isError, setLogout]);
  if (isPending) {
    return <div>Loading</div>;
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Root Path Fallback Automatic Redirection Target */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        {/* 👑 PARENT NESTED BLOCK: Wraps every sub-view inside the theme shell layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="studio" element={<CreativeStudio />} />

            <Route path="integrations" element={<ConnectSocials />} />

            <Route
              path="settings"
              element={
                <div className="text-sm text-[#94A3B8]">
                  User configuration system nodes.
                </div>
              }
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
