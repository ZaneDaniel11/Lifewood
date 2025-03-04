import React, { useState } from "react";
import { Menu, X, CheckCircle, XCircle, Clock } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => (
  <aside
    className={`fixed inset-y-0 left-0 w-64 bg-gray-900 text-white p-6 z-50 transform transition-transform md:translate-x-0 md:relative ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    } flex flex-col justify-between shadow-lg`}
  >
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold tracking-wide">Admin Panel</h2>
        <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
          <X size={28} />
        </button>
      </div>
      <nav className="mt-6 space-y-3">
        {["Dashboard", "Users", "Settings"].map((item) => (
          <div
            key={item}
            className="py-3 px-5 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200"
          >
            {item}
          </div>
        ))}
      </nav>
    </div>
  </aside>
);

const StatsCard = ({ title, count, color, icon }) => (
  <div
    className={`p-5 rounded-xl text-white ${color} flex items-center justify-between shadow-md hover:shadow-xl transition-shadow duration-200 transform hover:scale-105`}
  >
    <div>
      <h3 className="text-md font-semibold opacity-90">{title}</h3>
      <p className="text-4xl font-bold">{count}</p>
    </div>
    {icon}
  </div>
);

const Table = ({ applications }) => (
  <div className="bg-white shadow-lg rounded-xl overflow-hidden w-full">
    <table className="w-full border-collapse">
      <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
        <tr>
          {["ID", "Name", "Age", "Degree", "Experience", "Email", "Resume", "Status", "Actions"].map(
            (heading) => (
              <th key={heading} className="p-4 text-left border-b border-gray-300">
                {heading}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {applications.map((app, index) => (
          <tr
            key={app.id}
            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 transition`}
          >
            <td className="p-4">{app.id}</td>
            <td className="p-4">{app.name}</td>
            <td className="p-4">{app.age}</td>
            <td className="p-4">{app.degree}</td>
            <td className="p-4">{app.experience}</td>
            <td className="p-4">{app.email}</td>
            <td className="p-4">
              <a href="#" className="text-blue-500 font-medium hover:underline">
                {app.resume}
              </a>
            </td>
            <td
              className={`p-4 font-semibold ${
                app.status === "Accepted"
                  ? "text-green-600"
                  : app.status === "Rejected"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              {app.status}
            </td>
            <td className="p-4 flex gap-2">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition">
                Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition">
                Decline
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const stats = [
    { title: "Accepted", count: 75, color: "bg-green-500", icon: <CheckCircle size={32} /> },
    { title: "Rejected", count: 45, color: "bg-red-500", icon: <XCircle size={32} /> },
    { title: "Pending", count: 30, color: "bg-yellow-500", icon: <Clock size={32} /> },
  ];

  const applications = [
    {
      id: 1,
      name: "John Doe",
      age: 29,
      degree: "B.Sc Computer Science",
      experience: "5 years",
      email: "john.doe@example.com",
      resume: "View Resume",
      status: "Pending",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 p-6 flex flex-col space-y-6">
        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-900 mb-4" onClick={() => setSidebarOpen(true)}>
          <Menu size={32} />
        </button>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Applications Table */}
        <Table applications={applications} />
      </main>
    </div>
  );
}
