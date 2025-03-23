
import { Bell, Search, Menu, User } from "lucide-react"
import logo from "../../assets/logo.svg"

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg?height=24&width=24"} alt="Logo" className="h-8 w-auto" />
            <span className="font-semibold text-gray-900 text-lg hidden sm:inline-block">Admin Portal</span>
          </div>
        </div>

        <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
          <Search size={18} className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={16} />
            </div>
            <span className="text-sm font-medium text-gray-700 hidden md:inline-block">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

