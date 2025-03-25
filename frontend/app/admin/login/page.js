"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminStore } from "@/lib/adminStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const { adminlogin, admin } = adminStore();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  useEffect(() => {
    if (admin) {
      router.push("/admin");
    }
  }, [admin]);

  const LogIn = () => {
    adminlogin(email, password);
    setemail("");
    setpassword("");
  };
  const emailHandle = (e) => {
    setemail(e.target.value);
  };
  const passHandle = (e) => {
    setpassword(e.target.value);
  };
  return (
    <>
      <div className="main h-screen w-full flex justify-center items-center">
        <div className="w-[300px] h-[40vh] md:w-[40%] md:h-[70vh]  flex gap-5 items-center justify-center flex-col p-5">
          <div className="title text-xl md:text-3xl flex items-center justify-center w-full h-fit">
            ADMIN LOGIN
          </div>
          <div className="input flex items-center justify-center gap-2 flex-col  w-full h-fit">
            <Input
              type="email"
              onChange={emailHandle}
              value={email}
              placeholder="Email"
              className={`md:max-w-[40%]`}
            />
            <Input
              type="password"
              onChange={passHandle}
              value={password}
              placeholder="password"
              className={`md:max-w-[40%]`}
            />
          </div>
          <div className="submit">
            <Button
              className={`p-4 hover:cursor-pointer bg-zinc-600`}
              onClick={() => LogIn()}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
