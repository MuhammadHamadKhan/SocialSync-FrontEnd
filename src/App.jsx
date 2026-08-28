import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Core Application Feature Components
import DashboardLayout from "./dashboard/DashboardLayout";

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
import CreatePost from "./pages/CreatePost";
import CreateHome from "./studio/create/CreateHome";
import DashboardOverview from "./studio/DashboardOverview";
import Settings from "./studio/Settings";
import AdminPanel from "./admin/AdminPanel";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  const store = authStore();
  const setLogin = authStore((state) => state.setLogin);
  const setLogout = authStore((state) => state.setLogout);
  const setUser = authStore((state) => state.setUser);
  const isLogin = authStore((state) => state.isLogin);

  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: ["auth"],
    queryFn: authMe,
  });

  useEffect(() => {
    if (isSuccess) {
      setUser(data.user);
      setLogin(data.user.isAdmin);
    }
  }, [isSuccess, data]);
  useEffect(() => {
    if (isError) {
      setLogout();
    }
  }, [isError, setLogout]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Root Path Fallback Automatic Redirection Target */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/privacy" element={<Privacy />} />
        {/*  PARENT NESTED BLOCK: Wraps every sub-view inside the theme shell layout */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="create" element={<CreateHome />} />

            <Route path="create/:platform" element={<CreatePost />} />

            <Route path="integrations" element={<ConnectSocials />} />
            <Route path="overview" element={<DashboardOverview />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
        <Route path="/adminPanel" element={<AdminPanel />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
