import React, { useState, useEffect } from "react";
import { Menu, X, CheckCircle, XCircle, Clock, MoreVertical } from "lucide-react";
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";
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

const Table = ({ applications }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = applications.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="bg-white shadow-md rounded-lg overflow-x-auto w-full">
      <table className="w-full border-collapse text-black text-sm md:text-base">
        <thead className="bg-gray-100 text-black">
          <tr>
            {["ID", "Name", "Age", "Degree", "Experience", "Email", "Resume", "Status", "Actions"].map(
              (heading) => (
                <th key={heading} className="p-2 md:p-4 text-left whitespace-nowrap">
                  {heading}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {visibleData.map((app, index) => (
            <tr
              key={app.id}
              className={`${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-gray-200 text-xs md:text-sm`}
            >
              <td className="p-2 md:p-4">{app.id}</td>
              <td className="p-2 md:p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{app.fullName}</td>
              <td className="p-2 md:p-4">{app.age}</td>
              <td className="p-2 md:p-4">{app.degree}</td>
              <td className="p-2 md:p-4">{app.jobExperience}</td>
              <td className="p-2 md:p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{app.email}</td>
              <td className="p-2 md:p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                <a href="#" className="text-blue-500 underline">{app.fileName}</a>
              </td>
              <td
                className={`p-2 md:p-4 font-semibold ${
                  app.applicationStatus === "Accepted"
                    ? "text-green-600"
                    : app.applicationStatus === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {app.applicationStatus}
              </td>
           <td className="p-2 md:p-4 flex gap-2 items-center">
              <button className="text-green-500 hover:text-green-700">
                <CheckCircle size={20} />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <XCircle size={20} />
              </button>
              <button className="text-blue-500 hover:text-blue-700">
                <Eye size={20} />
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-end gap-4 p-4 items-center">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);

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
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <Table applications={applications} />
      </div>
    </main>
  </div>
</div>

  );
}
