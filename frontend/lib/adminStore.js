import { create } from "zustand";
import { useRouter } from "next/navigation";

const backend = "http://localhost:3001";
export const adminStore = create((set, get) => ({
  admin: false,
  allCoupon: [],
  verifyadmin: async () => {
    const res = await fetch(`${backend}/admin/verifyAdmin`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data.sucess);
    if (data.sucess) {
      set({ admin: data.sucess });
    }
  },
  adminlogin: async (email, pass) => {
    const res = await fetch(`${backend}/admin/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    const data = await res.json();
    console.log(data.sucess);
    if (data.sucess) {
      set({ admin: true });
    }
  },
  fetchAllCoupon: async () => {
    set({allCoupon:[]})
    const res = await fetch(`${backend}/coupon/fetchAllCoupon`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log("fetch coupon",data);
    set({ allCoupon: data.coupons });
    console.log(data.coupons);
    
  },
  createCoupon: async (title, forCompany, code) => {
    const res = await fetch(`${backend}/coupon/createCoupon`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        title,
        forCompany,
        code,
      }),
    });
    const data = await res.json();
    console.log("from create coupon 59 admin store::",data);
    
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
    get().fetchAllCoupon()
  },
  Logout: async()=>{
    const res = await fetch(`${backend}/admin/logout`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // ✅ Inform server that body is JSON
      }
    });
    set({admin:false})
    set({allCoupon:[]})
    
    
  }
}));
