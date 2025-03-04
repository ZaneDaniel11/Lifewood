import React, { useState } from "react";
import { Menu, X, CheckCircle, XCircle, Clock, MoreVertical } from "lucide-react";
import logo from "../assets/logo.svg";

const Header = () => (
  <header className="flex justify-between items-center bg-white shadow-md p-4 fixed w-full top-0 left-0 z-50">
    <img src={logo} alt="Logo" className="h-10" />
    <button className="text-black">
      <MoreVertical size={28} />
    </button>
  </header>
);

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

const StatsCard = ({ title, count, icon }) => (
  <div className="p-4 rounded-lg bg-gray-100 text-black flex items-center justify-between shadow-md w-full">
    <div>
      <h3 className="text-md font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
    {icon}
  </div>
);

const Table = ({ applications }) => (
  <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
    <table className="w-full border-collapse text-black text-sm md:text-base">
      <thead className="bg-gray-100 text-black">
        <tr>
          {["ID", "Name", "Age", "Degree", "Experience", "Email", "Resume", "Status", "Actions"].map((heading) => (
            <th key={heading} className="p-2 md:p-4 text-left whitespace-nowrap">{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {applications.map((app, index) => (
          <tr key={app.id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-200 text-xs md:text-sm`}>
            <td className="p-2 md:p-4">{app.id}</td>
            <td className="p-2 md:p-4">{app.name}</td>
            <td className="p-2 md:p-4">{app.age}</td>
            <td className="p-2 md:p-4">{app.degree}</td>
            <td className="p-2 md:p-4">{app.experience}</td>
            <td className="p-2 md:p-4">{app.email}</td>
            <td className="p-2 md:p-4">
              <a href="#" className="text-blue-500 underline">{app.resume}</a>
            </td>
            <td className={`p-2 md:p-4 font-semibold ${app.status === "Accepted" ? "text-green-600" : app.status === "Rejected" ? "text-red-600" : "text-yellow-600"}`}>{app.status}</td>
            <td className="p-2 md:p-4 flex gap-1 md:gap-2 flex-wrap">
              <button className="bg-green-500 text-white px-2 py-1 md:px-4 md:py-2 rounded">Accept</button>
              <button className="bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded">Decline</button>
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
    { title: "Accepted", count: 75, icon: <CheckCircle size={28} /> },
    { title: "Rejected", count: 45, icon: <XCircle size={28} /> },
    { title: "Pending", count: 30, icon: <Clock size={28} /> },
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
    <div className="flex flex-col h-screen bg-gray-50 text-black">
      <Header />
      <div className="flex flex-1 mt-20">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 flex flex-col">
          <button className="md:hidden text-black mb-4" onClick={() => setSidebarOpen(true)}>
            <Menu size={32} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>
          <Table applications={applications} />
        </main>
      </div>
    </div>
  );
}
