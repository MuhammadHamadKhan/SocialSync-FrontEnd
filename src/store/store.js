import { create } from "zustand";
const authStore = create((set) => ({
  user: null,
  isLogin: false,
  isAdmin: false,
  isCheckingAuth: true,

  setLogin: (isAdmin = false) =>
    set({
      isLogin: true,
      isCheckingAuth: false,
      isAdmin,
    }),
  setLogout: () =>
    set({
      user: null,
      isLogin: false,
      isCheckingAuth: false,
      isAdmin: false,
    }),
  setUser: (user) =>
    set({
      user,
    }),
}));
export default authStore;
