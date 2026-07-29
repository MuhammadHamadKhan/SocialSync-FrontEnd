import React, { useState } from "react";
import {
  LayoutDashboard,
  Layers,
  Settings,
  LogOut,
  Bell,
  UserCheck,
  Zap,
  Menu,
  X,
} from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import authStore from "../store/store";
import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/logoutApi";
export default function DashboardLayout() {
  const user = authStore((state) => state.user);
  const setLogout = authStore((state) => state.setLogout);
  const { mutate, data, isSuccess, isError } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutApi,
  });
  if (isSuccess) {
    setLogout();
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { pathname } = useLocation();

  function isActive(pathname, navItemName) {
    const lastSegment = pathname.split("/").filter(Boolean).pop() || "";
    const normalized = lastSegment.toLowerCase().replace(/-/g, " ");
    return normalized === navItemName.toLowerCase();
  }
  // Navigation Links Definition Matrix
  const navItems = [
    { id: "overview", name: "Overview Dashboard", icon: LayoutDashboard },
    { id: "studio", name: "Creative Studio", icon: Zap },
    { id: "integrations", name: "Social Accounts", icon: Layers },
    { id: "settings", name: "System Settings", icon: Settings },
  ];
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans antialiased flex overflow-hidden h-screen">
      {/* ================= BACKGROUND BLUR ANCHORS ================= */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7F00FF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00F2FE]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="w-66 bg-[#171E2E] border-r border-slate-800 flex flex-col justify-between hidden md:flex z-20">
        <div>
          {/* Logo Header Wrapper */}
          <div className="h-20 flex items-center px-6 border-b border-slate-800 gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00F2FE] to-[#7F00FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              <Zap className="w-5 h-5 text-white fill-white/10" />
            </div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white to-[#94A3B8] bg-clip-text text-transparent">
              CROWN.AI
            </span>
          </div>

          {/* Navigation Control Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.id);
                  }}
                  className={`cursor-pointer  w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group border ${
                    active
                      ? "bg-linear-to-r from-[#171E2E] to-[#0B0F19] border-[#00F2FE]/30 text-white shadow-[0_0_15px_rgba(0,242,254,0.05)]"
                      : "text-[#94A3B8] border-transparent hover:text-white hover:bg-[#0B0F19] hover:border-slate-800"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 transition-colors ${pathname === item.id ? "text-[#00F2FE]" : "group-hover:text-[#00F2FE]"}`}
                  />
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Workspace Profile Card */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between bg-[#0B0F19]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7F00FF] to-[#00F2FE] p-[1px]">
              <div className="w-full h-full bg-[#171E2E] rounded-[15px] flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-[#00F2FE]" />
              </div>
            </div>
            <div className="truncate w-28">
              <p className=" uppercase text-xs font-semibold text-white truncate">
                {user.role} mode
              </p>
              <Badge
                variant="purple"
                className="text-[10px] px-1.5 py-0 mt-0.5 tracking-widest scale-90 origin-left"
              >
                {user?.role}
              </Badge>
            </div>
          </div>
          <button
            onClick={() => {
              mutate();
            }}
            className="cursor-pointer  text-[#94A3B8] hover:text-red-400 p-2 rounded-xl hover:bg-[#0B0F19] transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* ================= MOBILE NAV MENU WINDOW ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0B0F19]/90 z-50 md:hidden backdrop-blur-sm animate-fade-in">
          <div className="w-72 bg-[#171E2E] h-full border-r border-slate-800 flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F2FE] to-[#7F00FF] flex items-center justify-center">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold tracking-wide">CROWN.AI</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#94A3B8] hover:text-white bg-[#0B0F19] rounded-xl border border-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="mt-6 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(pathname, item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm ${
                        active
                          ? "bg-[#0B0F19] border border-[#00F2FE]/30 text-white"
                          : "text-[#94A3B8]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#00F2FE]" />
                      {item.name}
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-[#94A3B8]">Connected Profile</span>
              <button
                onClick={() => {
                  mutate();
                }}
                className="text-red-400 p-2"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= WORKSPACE BODY PLATFORM ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Dynamic App Header Frame */}
        <header className="h-20 bg-[#171E2E] border-b border-slate-800 flex items-center justify-between px-5 sm:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            {/* Mobile View Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 rounded-2xl bg-[#0B0F19] border border-slate-800 text-[#94A3B8] hover:text-white md:hidden transition-all"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <h2 className="text-sm font-bold text-white capitalize tracking-wide">
                {navItems.find((item) => {
                  const active = isActive(pathname, item.id);
                  if (active) {
                    return item;
                  }
                }).name || "Dashboard"}
              </h2>
              <p className="text-[11px] text-[#94A3B8] hidden sm:block">
                Automated Short-Form Workspace Platform v1.0
              </p>
            </div>
          </div>

          {/* Right Header Status Nodes */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B0F19] border border-slate-800 text-[11px] text-[#94A3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              API Server Pipeline Connected
            </div>

            <button className="p-2.5 rounded-2xl bg-[#0B0F19] border border-slate-800 text-[#94A3B8] hover:text-white transition-all relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#00F2FE] rounded-full shadow-[0_0_8px_#00F2FE]" />
            </button>
          </div>
        </header>

        {/* Dynamic Layout Content View injection zone */}
        <main className="flex-1 p-5 sm:p-8 overflow-y-auto bg-[#0B0F19] relative">
          <div className="max-w-7xl mx-auto h-full">{<Outlet />}</div>
        </main>
      </div>
    </div>
  );
}
