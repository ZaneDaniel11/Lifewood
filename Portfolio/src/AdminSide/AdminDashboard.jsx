import React, { useState, useEffect } from "react";
import { Menu, CheckCircle, XCircle, Clock } from "lucide-react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";


export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleStatusClick = (status) => {
    setSelectedStatus(status);
  };
  const filteredApplications = applications.filter((applicant) => 
    selectedStatus === "All" || applicant.applicationStatus === selectedStatus
  );
  

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:5237/api/ApplicationsApi/GetApplications");
        const data = await response.json();
        console.log(data);
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const stats = [
    { title: "Accepted", count: applications.filter(app => app.applicationStatus === "Accepted").length, icon: <CheckCircle size={28} /> },
    { title: "Rejected", count: applications.filter(app => app.applicationStatus === "Rejected").length, icon: <XCircle size={28} /> },
    { title: "Pending", count: applications.filter(app => app.applicationStatus === "Pending").length, icon: <Clock size={28} /> },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-black">
      <Header />
      <div className="flex flex-1 min-h-0 mt-20">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-6 flex flex-col h-full">
          <button className="md:hidden text-black mb-4" onClick={() => setSidebarOpen(true)}>
            <Menu size={32} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
              <button 
                key={stat.title} 
                onClick={() => handleStatusClick(stat.title)}
                className={`p-4 rounded-lg text-black flex items-center justify-between shadow-md w-full ${
                  selectedStatus === stat.title ? "bg-blue-300" : "bg-gray-100"
                }`}
              >
                <div>
                  <h3 className="text-md font-semibold">{stat.title}</h3>
                  <p className="text-3xl font-bold">{stat.count}</p>
                </div>
                {stat.icon}
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-auto">
          <Table applications={filteredApplications} setApplications={setApplications} />
          </div>
        </main>
      </div>
    </div>
  );
}
