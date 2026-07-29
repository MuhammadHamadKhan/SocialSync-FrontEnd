import React from "react";
import authStore from "../store/store";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const isLogin = authStore((state) => state.isLogin);
  const isCheckingAuth = authStore((state) => state.isCheckingAuth);
  if (isCheckingAuth) {
    return <div>Loading</div>;
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
