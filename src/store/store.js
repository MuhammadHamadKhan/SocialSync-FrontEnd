import { create } from "zustand";
const authStore = create((set) => ({
  user: null,
  isLogin: false,
  isCheckingAuth: true,

  setLogin: (user) =>
    set({
      user,
      isLogin: true,
      isCheckingAuth: false,
    }),
  setLogout: () =>
    set({
      user: null,
      isLogin: false,
      isCheckingAuth: false,
    }),
}));
export default authStore;
