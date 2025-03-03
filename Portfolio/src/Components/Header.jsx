import { useState } from "react";
import zanelogo from "../assets/logo.png";

export default function Headers() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-header-yellow font-Kanit block mt-6">
      <div className="flex justify-between items-center h-24 mx-5 md:mx-20 lg:mx-28">
        {/* Logo */}
        <div className="flex space-x-4 items-center">
          <img src={zanelogo} alt="ink" className="h-10 md:h-12 lg:h-16" />
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-12 text-lg md:text-2xl lg:text-4xl font-semibold">
          <li className="cursor-pointer hover:text-gray-700 transition duration-300 list-none">Service</li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-300 list-none">Projects</li>
          <li className="list-none">
            <button className="w-[212px] h-[65px] bg-[#60A805] text-white text-lg md:text-2xl lg:text-4xl rounded-lg flex items-center justify-center shadow-md hover:bg-[#4e8704] transition duration-300">
              Apply Now
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center bg-white py-4 shadow-md">
          <li className="cursor-pointer hover:text-gray-700 transition duration-300 list-none py-2">Service</li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-300 list-none py-2">Projects</li>
          <li className="list-none py-2">
            <button className="w-[180px] h-[50px] bg-[#60A805] text-white text-lg rounded-lg shadow-md hover:bg-[#4e8704] transition duration-300">
              Apply Now
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
