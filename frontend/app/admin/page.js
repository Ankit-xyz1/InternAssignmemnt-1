"use client";
import React, { useEffect, useState } from "react";
import { adminStore } from "../../lib/adminStore.js";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


const page = () => {
  const {
    fetchAllCoupon,
    admin,
    verifyadmin,
    createCoupon,
    allCoupon,
    toggleCouponStatus,
  } = adminStore();

  const router = useRouter();

  const [creatingCoupon, setcreatingCoupon] = useState(false);
  const [title, settitle] = useState("");
  const [forComany, setforComany] = useState("");
  const [code, setcode] = useState("");

  const handleName = (e) => {
    settitle(e.target.value);
  };
  const handleforComany = (e) => {
    setforComany(e.target.value);
  };
  const handleCode = (e) => {
    setcode(e.target.value);
  };

  useEffect(() => {
  if(!allCoupon){
    router.push("/login");
  }
  }, [allCoupon])
  
  useEffect(() => {
    if (!admin) {
      verifyadmin();
      console.log(admin);
      // if(!admin){
      //   router.push("/")
      // }
    }

    fetchAllCoupon();
  }, [verifyadmin, admin]);

  useEffect(() => {
    console.log("from use eddeft", allCoupon);
  }, [allCoupon]);

  const CreateCoupon = () => {
    createCoupon(title, forComany, code);
    settitle("");
    setforComany("");
    setcode("");
  };

  const ToggleCoupon = (id) => {
    toggleCouponStatus(id);
  };

  return (
    <>
      <Navbar />
      <div className="main w-full h-screen flex items-center justify-center">
        <div className="w-full md:w-[80%] h-[90vh]">
          <div className="w-full md:h-[14vh] p-4 h-fit flex items-center flex-col justify-center gap-2 ">
            <p className="text-4xl md:text-6xl"> ADMIN DASHBOARD</p>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className={`cursor-pointer`}>
                  Create a coupon
                </Button>
              </SheetTrigger>
              <SheetContent className={`p-5`}>
                <SheetHeader>
                  <SheetTitle>Create Coupons</SheetTitle>
                  <SheetDescription>
                    Click Create when you're done.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Title
                    </Label>
                    <Input
                      onChange={handleName}
                      id="name"
                      value={title}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Forcompany
                    </Label>
                    <Input
                      onChange={handleforComany}
                      id="username"
                      value={forComany}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center  gap-4">
                    <Label htmlFor="username" className="text-right">
                      Code
                    </Label>
                    <Input
                      onChange={handleCode}
                      id="username"
                      value={code}
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex h-[4vh] w-full items-center gap-4">
                    <SheetClose asChild>
                      <Button
                        className={`bg-zinc-600`}
                        onClick={() => CreateCoupon()}
                      >
                        Create Coupon
                      </Button>
                    </SheetClose>
                  </div>
                </div>
                <SheetFooter>haha lets create</SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
          <div className="h-[1px] opacity-15 bg-amber-50 w-full"></div>
          <div className="coupons p-5 flex items-center justify-center flex-col">
            <div className="heading flex gap-2 flex-col w-full h-fit items-start justify-start">
              <h2 className="text-3xl text-left">All coupons</h2>
            </div>
            <div className="all mt-10 h-[50vh] overflow-auto w-full  md:w-[60%] border-2 p-10 flex flex-col gap-2">
              {allCoupon.map((item) => (
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
                      onClick={() => ToggleCoupon(item._id)}
                    >
                      {item.isClaimed ? "ReStartCoupon" : "StopCoupon"}
                    </Button>
                    {item.claimedBy && (
                      <p className="mt-[4px]">claimed by {item.claimedBy}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
