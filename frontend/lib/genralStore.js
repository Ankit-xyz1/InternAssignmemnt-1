import { create } from "zustand";

const backend = "http://localhost:3001";
export const genralStore = create((set, get) => ({
  isSessionStarted: false,
  coupons: [],

  startSession: async () => {
    const res = await fetch(`${backend}/SessionStart`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    set({ isSessionStarted: true });
  },

  fetchCoupons: async () => {
    const res = await fetch(`${backend}/coupon/fetchCoupon`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json()
    console.log("from fetchCoupons func in genralstore",data)
    set({coupons:data.coupons})
  },
}));
