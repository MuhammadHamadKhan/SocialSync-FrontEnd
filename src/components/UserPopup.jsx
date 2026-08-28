import { Settings, UserCheck } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserPopup = ({ user, setShowProfile }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={() => setShowProfile(false)}
      />

      {/* Profile Popup */}
      <div
        className="
        fixed z-50 bg-[#171E2E] border border-slate-700 shadow-2xl

        left-4 right-4 top-20 rounded-3xl p-5

        md:absolute md:top-14 md:right-0 md:left-auto
        md:w-80 md:rounded-2xl
      "
      >
        {/* User */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7F00FF] to-[#00F2FE] p-[2px]">
            <div className="w-full h-full rounded-[14px] bg-[#0B0F19] flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-[#00F2FE]" />
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-semibold truncate">
              {user?.username || user?.name || "User"}
            </h3>

            <p className="text-xs text-[#94A3B8] truncate">{user?.email}</p>

            <span className="inline-block mt-2 px-2 py-1 rounded-lg bg-[#00F2FE]/10 text-[#00F2FE] text-[11px] font-medium">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-700" />

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => {
              navigate("/dashboard/settings");
              setShowProfile(false);
            }}
            className="cursor-pointer  w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#0B0F19] transition"
          >
            <Settings className=" w-4 h-4 text-[#94A3B8]" />
            <span className="text-sm text-white">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserPopup;
