import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdAccountCircle } from "react-icons/md";

function Navbar() {
  return (
    <div className="flex items-center justify-between h-16 shadow-2xl bg-white px-4">
      <div className="flex items-center justify-between gap-4 ">
        <GiHamburgerMenu size={28} color="#003366" />
        <h1 className="text-2xl text-[#003366] font-semibold">
          Vehicle Insurance Management System
        </h1>
      </div>
      <div className="flex items-center justify-center gap-2">
        <MdAccountCircle size={34} color="#003366" />
        <h1 className="text-[#003368]">Tinashe Phiri</h1>
      </div>
    </div>
  );
}

export default Navbar;
