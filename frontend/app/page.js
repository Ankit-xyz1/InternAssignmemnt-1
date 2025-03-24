"use client";
import Navbar from "@/components/Navbar";
import { genralStore } from "@/lib/genralStore";
import { useEffect } from "react";

export default function Home() {

  const { startSession,fetchCoupons } = genralStore();
  useEffect(() => {
    startSession();
    fetchCoupons();
  }, [startSession,fetchCoupons]);
  
  return (
    <>
      <Navbar />
      home page
    </>
  );
}
