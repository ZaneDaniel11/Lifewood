"use client"
import { X, LayoutDashboard, Users, Settings, FileText, Bell, LogOut } from "lucide-react"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
    { name: "Applications", icon: <FileText size={20} />, active: false },
    { name: "Users", icon: <Users size={20} />, active: false },
    { name: "Notifications", icon: <Bell size={20} />, active: false },
    { name: "Settings", icon: <Settings size={20} />, active: false },
  ]

  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:relative ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } flex flex-col shadow-sm pt-16 border-r border-gray-100`}
    >
      <div className="md:hidden absolute right-4 top-4">
        <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-500">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <span className={item.active ? "text-blue-600" : "text-gray-500"}>{item.icon}</span>
              {item.name}
              {item.active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"></span>}
            </a>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <a
          href="#"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </a>
      </div>
    </aside>
  )
}

export default Sidebar

