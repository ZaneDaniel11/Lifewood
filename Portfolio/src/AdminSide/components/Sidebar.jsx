import React from "react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => (
  <aside
    className={`fixed inset-y-0 left-0 w-64 bg-white text-black p-5 z-40 transform transition-transform md:translate-x-0 md:relative ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } flex flex-col justify-between shadow-lg mt-6`}
  >
    <div>
      <h2 className="text-lg font-bold">Admin Panel</h2>
      <nav className="mt-5 space-y-2">
        {["Dashboard", "Users", "Settings"].map((item) => (
          <div key={item} className="py-3 px-4 rounded hover:bg-gray-200 cursor-pointer">
            {item}
          </div>
        ))}
      </nav>
    </div>
  </aside>
);

export default Sidebar;
