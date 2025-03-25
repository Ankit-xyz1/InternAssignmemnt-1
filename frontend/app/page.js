"use client";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { genralStore } from "@/lib/genralStore";
import { useEffect } from "react";

export default function Home() {
  const { startSession, fetchCoupons, coupons, claimcoupon } = genralStore();
  useEffect(() => {
    startSession();
    fetchCoupons();
  }, [startSession, fetchCoupons]);

  const Claim = (id) => {
    claimcoupon(id);
  };
  return (
    <>
      <Navbar />
      <div className="main flex items-center justify-center h-[90vh]">
        <div className="all mt-10 h-[88vh] overflow-auto w-full  md:w-[60%] border-2 p-10 flex flex-col gap-2">
          {coupons.map((item) => (
            <div
              key={item._id}
              className="indiCoupom h-[10vh] md:h-[15vh] p-3 w-full bg-zinc-800 flex rounded-sm "
            >
              <div className="w-[70%]">
                <div className="title">
                  <h2 className="text-xl md:text-3xl">{item.title}</h2>
                </div>
                <div className="title">
                  <h2 className="text-sm md:text-xl">{item.forCompany}</h2>
                </div>
              </div>
              <div className="code w-[30%] flex justify-end items-end flex-col">
                <h2>{item.code}</h2>
                <Button
                  variant="outline"
                  className={`cursor-pointer w-[120px]`}
                  onClick={() => Claim(item._id)}
                >
                  Claim Coupon
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
