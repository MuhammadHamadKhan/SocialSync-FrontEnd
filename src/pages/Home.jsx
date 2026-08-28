import React from "react";
import Navbar from "../components/Navbar";
import authStore from "../store/store";
import { Navigate, replace } from "react-router-dom";
import SocialSyncHero from "../components/SocialSyncHero";
import SocialSyncFeatures from "../components/SocialSyncFeatures";
import LogoStrip from "../components/LogoStrip";
import ProductShowcase from "../components/ProductShowcase";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQS";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import { Loader2Icon } from "lucide-react";

const Home = () => {
  const isLogin = authStore((state) => state.isLogin);
  const isAdmin = authStore((state) => state.isAdmin);
  const isCheckingAuth = authStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#0B0F19] ">
        <Loader2Icon className="text-white animate-spin " />
      </div>
    );
  }
  if (isLogin) {
    if (isAdmin) {
      return <Navigate to={"/adminPanel"} replace />;
    } else {
      return <Navigate to={"/dashboard"} replace />;
    }
  }
  return (
    <>
      <Navbar />
      <SocialSyncHero />
      <SocialSyncFeatures />
      <LogoStrip />
      <ProductShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
};

export default Home;
