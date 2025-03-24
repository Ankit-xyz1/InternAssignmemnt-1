"use client"
import React, { useEffect } from "react";
import { adminStore } from "../../lib/adminStore.js";

const page = () => {
  const { adminlogin ,fetchAllCoupon } = adminStore();
  useEffect(() => {
    const email= "ankit@ankit.com"
    const pass = "123456"
    adminlogin(email, pass);
    fetchAllCoupon()
  }, [adminlogin,fetchAllCoupon]);

  return <div>admin page</div>;
};

export default page;
