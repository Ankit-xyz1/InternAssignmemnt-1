import { BadgePercent, LogOut, MessagesSquare, Settings, User } from "lucide-react";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <header>
        <div className="navbar flex w-full h-15  items-center justify-between ">
          <div className="left px-4">
            <Link href={"/"} className=" ">
              <div className="flex gap-2 items-center justify-center">
                <BadgePercent size={40} color="#4643be" />
                <span className="text-xl   no-underline hover:text-gray-300 transition-all ease-in-out duration-700">
                  COUPON-CO
                </span>
              </div>
            </Link>
          </div>
          <div className="right flex gap-5 px-10">
            <div
              className="setting flex gap-2 cursor-pointer"
              onClick={() => Logout()}
            >
              <LogOut color="#4643be" />
              <span className="  hidden md:inline hover:text-red-400 transition-all ease-in-out duration-700">
                Logout
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="h-[1px] opacity-35 bg-amber-50 w-full"></div>
    </>
  );
};

export default Navbar;
