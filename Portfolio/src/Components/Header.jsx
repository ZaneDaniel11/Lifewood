import { useState } from "react";
import zanelogo from "../assets/logo.png";
import { useScroll } from "../ScrollContext";

export default function Headers() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollToService } = useScroll();
  
  const handleServiceClick = () => {
    scrollToService();
    if (isOpen) setIsOpen(false);
  };
  
  return (
    <div className="bg-header-yellow font-kanit block mt-6">
      <div className="flex justify-between items-center h-24 mx-5 md:mx-5 lg:mx-10">
        {/* Logo */}
        <div className="flex space-x-4 items-center">
          <img src={zanelogo || "/placeholder.svg"} alt="ink" className="h-8 md:h-10 lg:h-12" />
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-8 text-md md:text-lg lg:text-2xl font-semibold">
          <li 
            onClick={handleServiceClick}
            className="cursor-pointer hover:text-gray-700 transition duration-300 list-none"
          >
            Service
          </li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-300 list-none">Projects</li>
          <li className="list-none">
            <button className="w-[180px] md:w-[180px] h-[50px] md:h-[55px] lg:h-[55px] bg-[#60A805] text-white text-md md:text-lg lg:text-2xl rounded-lg flex items-center justify-center shadow-md hover:bg-[#4e8704] transition duration-300">
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
          <li 
            onClick={handleServiceClick}
            className="cursor-pointer hover:text-gray-700 transition duration-300 list-none py-2"
          >
            Service
          </li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-300 list-none py-2">Projects</li>
          <li className="list-none py-2">
            <button className="w-[160px] h-[50px] bg-[#60A805] text-white text-lg rounded-lg shadow-md hover:bg-[#4e8704] transition duration-300">
              Apply Now
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}