import React from "react";
import authStore from "../store/store";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
const ProtectedRoute = () => {
  const isLogin = authStore((state) => state.isLogin);
  const isCheckingAuth = authStore((state) => state.isCheckingAuth);
  if (isCheckingAuth) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#0B0F19] ">
        <Loader2Icon className="text-white animate-spin " />
      </div>
    );
  }

  if (!isLogin) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
