import React, { useState } from "react";
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdBadge,
  faUser,
  faCalendar,
  faGraduationCap,
  faBriefcase,
  faEnvelope,
  faFileAlt,
  faCheckCircle,
  faTimesCircle,
  faClock,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Table = ({ applications }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const itemsPerPage = 5;
  const totalPages = Math.ceil(applications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = applications.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleView = (application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  };

  const handleAcceptClick = (application) => {
    setSelectedApplication(application);
    setIsAcceptModalOpen(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setIsModalOpen(false);
    setIsAcceptModalOpen(false);
    setMessage("");
  };
  const handleSubmit = async () => {
    if (!selectedApplication) return;

    try {
      await axios.put(
        `http://localhost:5237/api/ApplicationsApi/UpdateApplicationStatus`,
        {},
        {
          params: {
            id: selectedApplication.id,
            status: "Accepted",
          },
        }
      );

      await axios.post("https://api.emailjs.com/api/v1.0/email/send", {
        service_id: "your_service_id",
        template_id: "your_template_id",
        user_id: "your_user_id",
        template_params: {
          to_email: selectedApplication.email,
          message,
        },
      });

      alert("Application status updated and email sent successfully!");
      closeModal();
    } catch (error) {
      console.error("Error updating status: ", error);
      alert("Failed to update application status.");
    }
  };

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
      } hover:bg-gray-200 text-xs md:text-sm cursor-pointer`}
      onClick={() => handleView(app)}
    >
      <td className="p-2 md:p-4">{app.id}</td>
      <td className="p-2 md:p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{app.fullName}</td>
      <td className="p-2 md:p-4">{app.age}</td>
      <td className="p-2 md:p-4">{app.degree}</td>
      <td className="p-2 md:p-4">{app.jobExperience}</td>
      <td className="p-2 md:p-4">{app.email}</td>
      <td 
        className="p-2 md:p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]"
        onClick={(e) => e.stopPropagation()} // Prevents modal from opening when clicking resume
      >
        <a 
          href={app.downloadUrl || "#"} 
          download 
          className="text-blue-500 underline"
        >
          {app.fileName}
        </a>
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
      <td 
        className="p-2 md:p-4 flex gap-2 items-center"
        onClick={(e) => e.stopPropagation()} // Prevents modal from opening when clicking actions
      >
        <button className="text-green-500" onClick={() => handleAcceptClick(app)}>
                  <CheckCircle size={20} />
                </button>
        <button className="text-red-500 hover:text-red-700">
          <XCircle size={20} />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => handleView(app)}
        >
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
      {isAcceptModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Accept Application</h2>
            <p className="mb-2">Send a message to the applicant:</p>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end mt-4 gap-2">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">
                Cancel
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded-md">
                <FontAwesomeIcon icon={faPaperPlane} /> Submit
              </button>
            </div>
          </div>
        </div>
      )}
   {/* Modal for Application Details */}
{isModalOpen && selectedApplication && (
  <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative border-t-4 border-blue-500">
      
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 text-white p-2 rounded-full">
            <FontAwesomeIcon icon={faCheckCircle} size="lg" />
          </div>
          <h2 className="text-2xl font-bold text-blue-600">Application Details</h2>
        </div>
        <button
          onClick={closeModal}
          className="text-red-500 hover:text-red-700 text-lg font-semibold"
        >
          ✖
        </button>
      </div>

      {/* Modal Content */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p className="flex items-center gap-2">
          <FontAwesomeIcon icon={faIdBadge} className="text-blue-500" />
          <strong>ID:</strong> {selectedApplication.id}
        </p>
        <p className="flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} className="text-blue-500" />
          <strong>Name:</strong> {selectedApplication.fullName}
        </p>
        <p className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCalendar} className="text-blue-500" />
          <strong>Age:</strong> {selectedApplication.age}
        </p>
        <p className="flex items-center gap-2">
          <FontAwesomeIcon icon={faGraduationCap} className="text-blue-500" />
          <strong>Degree:</strong> {selectedApplication.degree}
        </p>
        <p className="flex items-center gap-2">
          <FontAwesomeIcon icon={faBriefcase} className="text-blue-500" />
          <strong>Experience:</strong> {selectedApplication.jobExperience}
        </p>
        <p className="flex items-center gap-2">
          <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />
          <strong>Email:</strong> {selectedApplication.email}
        </p>
        <p className="flex items-center gap-2 col-span-2">
          <FontAwesomeIcon icon={faFileAlt} className="text-blue-500" />
          <strong>Resume:</strong>
       <a 

    className="text-blue-500 underline"
  >
    {selectedApplication.fileName}
  </a>
        </p>
        <p className="flex items-center gap-2 col-span-2">
          <FontAwesomeIcon
            icon={
              selectedApplication.applicationStatus === "Accepted"
                ? faCheckCircle
                : selectedApplication.applicationStatus === "Rejected"
                ? faTimesCircle
                : faClock
            }
            className={`${
              selectedApplication.applicationStatus === "Accepted"
                ? "text-green-600"
                : selectedApplication.applicationStatus === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          />
          <strong>Status:</strong> 
          <span
            className={`font-semibold ml-1 ${
              selectedApplication.applicationStatus === "Accepted"
                ? "text-green-600"
                : selectedApplication.applicationStatus === "Rejected"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {selectedApplication.applicationStatus}
          </span>
        </p>
      </div>

      {/* Modal Footer */}
      <div className="flex justify-end mt-6">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faTimesCircle} />
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Table;
