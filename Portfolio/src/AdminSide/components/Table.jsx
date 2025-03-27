import { useState } from "react"
import { CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight, Download, Send } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import emailjs from "emailjs-com"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { faIdBadge } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const Table = ({ applications, setApplications = () => {} }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false)

  const handleRejectClick = (application, e) => {
    e.stopPropagation()
    setSelectedApplication(application)
    setIsRejectModalOpen(true)
  }

  const itemsPerPage = 5
  const totalPages = Math.ceil(applications.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const visibleData = applications.slice(startIndex, startIndex + itemsPerPage)

  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleView = (application) => {
    setSelectedApplication(application)
    setIsModalOpen(true)
  }

  const handleAcceptClick = (application, e) => {
    e.stopPropagation()
    setSelectedApplication(application)
    setIsAcceptModalOpen(true)
  }

  const closeModal = () => {
    setSelectedApplication(null)
    setIsModalOpen(false)
    setIsAcceptModalOpen(false)
    setIsRejectModalOpen(false)
    setMessage("")
  }

  const handleSubmit = async () => {
    if (!selectedApplication) return

    try {
      await axios.put(
        "http://localhost:5237/api/ApplicationsApi/UpdateApplicationStatus",
        {},
        {
          params: {
            id: selectedApplication.id,
            status: "Accepted",
          },
        },
      )

      if (typeof setApplications === "function") {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === selectedApplication.id ? { ...app, applicationStatus: "Accepted" } : app,
          ),
        )
      } else {
        console.warn("setApplications is not a function. State won't be updated in the parent component.")
      }

      const emailParams = {
        to_email: selectedApplication.email, // Ensure this matches your template
        to_name: selectedApplication.fullName,
        message: message || "Your application has been accepted!",
      }

      emailjs
        .send("service_y55bw9l", "template_0ka69sc", emailParams, "0LlVOg8BMb3Vq5Wuf")
        .then((response) => {
          console.log("Email sent successfully!", response)
          toast.success("Application accepted and email sent successfully!")
        })
        .catch((error) => {
          console.error("Failed to send email:", error)
          toast.error("Failed to send email.")
        })

      toast.success("Application accepted and email sent successfully!")
      closeModal()
    } catch (error) {
      console.error("Error updating status: ", error)
      toast.error("Failed to update application status.")
    }
  }

  const handleRejectSubmit = async () => {
    if (!selectedApplication) return

    try {
      await axios.put(
        "http://localhost:5237/api/ApplicationsApi/UpdateApplicationStatus",
        {},
        {
          params: {
            id: selectedApplication.id,
            status: "Rejected",
          },
        },
      )

      if (typeof setApplications === "function") {
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.id === selectedApplication.id ? { ...app, applicationStatus: "Rejected" } : app,
          ),
        )
      } else {
        console.warn("setApplications is not a function. State won't be updated in the parent component.")
      }

      toast.success("Application rejected and email sent.")
      closeModal()
    } catch (error) {
      console.error("Error rejecting application:", error)
      toast.error("Failed to reject application.")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Accepted":
        return <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">Accepted</span>
      case "Rejected":
        return <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium">Rejected</span>
      case "Pending":
      default:
        return <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">Pending</span>
    }
  }

  return (
    <div className="w-full">
      <ToastContainer />
      <table className="w-full border-collapse text-gray-800 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {["ID", "Name", "Age", "Degree", "Experience", "Email", "Resume", "Status", "Actions"].map((heading) => (
              <th key={heading} className="p-4 text-left font-medium text-gray-500">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleData.length > 0 ? (
            visibleData.map((app, index) => (
              <tr
                key={app.id}
                className="border-t border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleView(app)}
              >
                <td className="p-4 font-medium text-gray-900">{app.id}</td>
                <td className="p-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{app.fullName}</td>
                <td className="p-4">{app.age}</td>
                <td className="p-4">{app.degree}</td>
                <td className="p-4">{app.jobExperience}</td>
                <td className="p-4 text-gray-500">{app.email}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <a
                    href={app.downloadUrl || "#"}
                    download
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 gap-1"
                  >
                    <Download size={14} />
                    <span className="underline">{app.fileName}</span>
                  </a>
                </td>
                <td className="p-4">{getStatusBadge(app.applicationStatus)}</td>
                <td className="p-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex gap-2 items-center">
                    <button
                      className="p-1.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                      onClick={(e) => handleAcceptClick(app, e)}
                      title="Accept Application"
                    >
                      <CheckCircle size={16} />
                    </button>
                    <button
                      className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      onClick={(e) => handleRejectClick(app, e)}
                      title="Reject Application"
                    >
                      <XCircle size={16} />
                    </button>
                    <button
                      className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                      onClick={() => handleView(app)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="p-8 text-center text-gray-500">
                No applications found matching the selected criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center p-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Showing {visibleData.length > 0 ? startIndex + 1 : 0} to{" "}
          {Math.min(startIndex + itemsPerPage, applications.length)} of {applications.length} entries
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg flex items-center justify-center ${
              currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-lg flex items-center justify-center ${
              currentPage === totalPages || totalPages === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Accept Modal */}
      {isAcceptModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="bg-green-500 p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <CheckCircle />
                Accept Application
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                You are about to accept <span className="font-semibold">{selectedApplication.fullName}'s</span>{" "}
                application. Please provide a message to send to the applicant:
              </p>

              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none resize-none"
                placeholder="Congratulations! We're pleased to inform you that your application has been accepted..."
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                  Send & Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {isRejectModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fadeIn">
            <div className="bg-red-500 p-4 text-white">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <XCircle />
                Reject Application
              </h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-4">
                You are about to reject <span className="font-semibold">{selectedApplication.fullName}'s</span>{" "}
                application. Please provide a reason to send to the applicant:
              </p>

              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                placeholder="Thank you for your interest. After careful consideration, we regret to inform you that..."
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className="flex justify-end mt-6 gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectSubmit}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Send size={16} />
                  Send & Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Application Modal */}
      {isModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-blue-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FontAwesomeIcon icon={faIdBadge} />
                  Application Details
                </h2>
                <button onClick={closeModal} className="text-white hover:text-gray-200 transition-colors">
                  <XCircle size={20} />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium">{selectedApplication.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ID</p>
                  <p className="font-medium">{selectedApplication.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="font-medium">{selectedApplication.age}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Degree</p>
                  <p className="font-medium">{selectedApplication.degree}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="font-medium">{selectedApplication.jobExperience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-medium">{getStatusBadge(selectedApplication.applicationStatus)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500 mb-1">Resume</p>
                  <a
                    href={selectedApplication.downloadUrl || "#"}
                    download
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 gap-1"
                  >
                    <Download size={16} />
                    <span className="underline">{selectedApplication.fileName}</span>
                  </a>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                {selectedApplication.applicationStatus === "Pending" && (
                  <>
                    <button
                      onClick={() => {
                        closeModal()
                        setSelectedApplication(selectedApplication)
                        setIsRejectModalOpen(true)
                      }}
                      className="px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors flex items-center gap-2"
                    >
                      <XCircle size={16} />
                      Reject
                    </button>
                    <button
                      onClick={() => {
                        closeModal()
                        setSelectedApplication(selectedApplication)
                        setIsAcceptModalOpen(true)
                      }}
                      className="px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle size={16} />
                      Accept
                    </button>
                  </>
                )}
                <button
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Table

