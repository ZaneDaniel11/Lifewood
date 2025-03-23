
import { useState } from "react"
import { Menu, CheckCircle, XCircle, Clock, BarChart3 } from "lucide-react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Table from "./components/Table"
import { useGetApplicationQuery } from "../assets/services/HandleApplicationsApi"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("All")

  const { data: applications = [], error, isLoading } = useGetApplicationQuery()

  const handleStatusClick = (status) => {
    setSelectedStatus(status)
  }

  const filteredApplications = applications.filter(
    (applicant) => selectedStatus === "All" || applicant.applicationStatus === selectedStatus,
  )

  const stats = [
    {
      title: "All",
      count: applications.length,
      icon: <BarChart3 size={24} />,
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
      textColor: "text-blue-600",
    },
    {
      title: "Accepted",
      count: applications.filter((app) => app.applicationStatus === "Accepted").length,
      icon: <CheckCircle size={24} />,
      color: "bg-gradient-to-r from-green-400 to-green-600",
      textColor: "text-green-600",
    },
    {
      title: "Rejected",
      count: applications.filter((app) => app.applicationStatus === "Rejected").length,
      icon: <XCircle size={24} />,
      color: "bg-gradient-to-r from-red-400 to-red-600",
      textColor: "text-red-600",
    },
    {
      title: "Pending",
      count: applications.filter((app) => app.applicationStatus === "Pending").length,
      icon: <Clock size={24} />,
      color: "bg-gradient-to-r from-amber-400 to-amber-600",
      textColor: "text-amber-600",
    },
  ]

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800 font-sans">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 min-h-0 pt-16">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 flex flex-col h-full overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Applications Dashboard</h1>
            <button
              className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-200"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-b-blue-700 border-gray-200 animate-spin"></div>
                <p className="mt-4 text-gray-600">Loading applications...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                <h3 className="text-red-600 font-semibold text-lg mb-2">Error Loading Data</h3>
                <p className="text-gray-700">We couldn't load the applications data. Please try again later.</p>
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Stats */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <button
                  key={stat.title}
                  onClick={() => handleStatusClick(stat.title)}
                  className={`relative overflow-hidden rounded-xl shadow-sm transition-all duration-200 ${
                    selectedStatus === stat.title
                      ? "ring-2 ring-offset-2 ring-blue-500 transform scale-[1.02]"
                      : "hover:shadow-md hover:transform hover:scale-[1.01]"
                  }`}
                >
                  <div className={`absolute inset-0 opacity-10 ${stat.color}`}></div>
                  <div className="p-6 flex items-center justify-between relative z-10 bg-white rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <h3 className={`text-3xl font-bold mt-1 ${stat.textColor}`}>{stat.count}</h3>
                    </div>
                    <div
                      className={`p-3 rounded-full ${selectedStatus === stat.title ? stat.color : "bg-gray-100"} text-white`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Applications Table */}
          {!isLoading && !error && (
            <div className="flex-1 overflow-hidden flex flex-col bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800">
                  {selectedStatus === "All" ? "All Applications" : `${selectedStatus} Applications`}
                </h2>
              </div>
              <div className="flex-1 overflow-auto">
                <Table applications={filteredApplications} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

