import React from "react";
import { MoreVertical } from "lucide-react";

import logo from "../../assets/logo.svg";

const Header = () => (
  <header className="flex justify-between items-center bg-white shadow-md p-4 fixed w-full top-0 left-0 z-50">
    <img src={logo} alt="Logo" className="h-6" />
    <button className="text-black">
      <MoreVertical size={28} />
    </button>
  </header>
);

export default Header;
