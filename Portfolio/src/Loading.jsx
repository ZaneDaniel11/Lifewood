import React, { useEffect } from "react";
import logo from "./assets/logo.svg";

const LoadingScreen = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <div className="flex items-center justify-center w-full h-[100vh] bg-black">
      <img
        src={logo}
        alt="Logo"
        className="w-56 h-56 animate-pulse" // Increased size to 14rem (56)
      />
    </div>
  );
};

export default LoadingScreen;
