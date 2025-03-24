import { create } from "zustand";

const backend = "http://localhost:3001";
export const adminStore = create((set, get) => ({
  admin: false,
  allCoupon: [],
  adminlogin: async (email, pass) => {
    const res = await fetch(`${backend}/admin/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // ✅ Inform server that body is JSON
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.sucess) {
      set({ admin: true });
    }
  },
  fetchAllCoupon: async () => {
    const res = await fetch(`${backend}/coupon/fetchAllCoupon`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    set({ coupon: data.coupons });
  },
  createCoupon: async (title, forcompany, code) => {
    const res = await fetch(`${backend}/coupon/createCoupon`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // ✅ Inform server that body is JSON
      },
      body: JSON.stringify({
        title,
        forcompany,
        code,
      }),
    });
    const data = await res.json();
  },
  toggleCouponStatus: async (couponId) => {
    const res = await fetch(`${backend}/coupon/toggleCouponStatus`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // ✅ Inform server that body is JSON
      },
      body: JSON.stringify({
        couponId,
      }),
    });
    const data = await res.json();
  },
}));
