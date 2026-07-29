import React from "react";
import Navbar from "../components/Navbar";
import authStore from "../store/store";
import { Navigate, replace } from "react-router-dom";

const Home = () => {
  const isLogin = authStore((state) => state.isLogin);
  console.log(isLogin);

  if (isLogin) {
    return <Navigate to={"/dashboard"} replace />;
  }
  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
