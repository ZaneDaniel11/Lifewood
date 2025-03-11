import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profilePic from "../assets/proz.gif";

import "../CSS/Introduction.css";

export default function Introduction() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    degree: "",
    jobExperience: "",
    email: "",
    message: "",
    file: null, 
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      toast.error("Please select a file to upload.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("fullName", formData.fullName);
    submissionData.append("age", formData.age);
    submissionData.append("degree", formData.degree);
    submissionData.append("jobExperience", formData.jobExperience);
    submissionData.append("email", formData.email);
    submissionData.append("message", formData.message);
    submissionData.append("file", formData.file);

    try {
      const response = await fetch("http://localhost:5237/api/ApplicationsApi/InsertApplication", {
        method: "POST",
        body: submissionData, // No `Content-Type` header needed; `fetch` auto-handles it for `FormData`.
      });

      if (!response.ok) {
        throw new Error("Failed to submit application.");
      }

      toast.success("✅ Application submitted successfully!", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
      });

      setIsModalOpen(false);
      setFormData({ fullName: "", age: "", degree: "", jobExperience: "", email: "", message: "", file: null });

    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("❌ Error submitting application. Please try again.", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="block">
      <ToastContainer />

      <div className="mt-[20px] flex flex-col md:flex-row h-auto bg-body-yellow font-kanit items-center md:items-start justify-center md:justify-between space-y-8 md:space-y-0 md:space-x-8 px-4 py-6 md:py-10 lg:px-10 md:pt-[100px] md:pb-[100px] lg:pt-[130px] lg:pb-[170px]">
        <div className="text-center md:text-left lg:ml-20">
          <h1 className="font-kanit text-7xl m-0 mb-4 font-bold text-black md:text-6xl lg:text-9xl">Lifewood</h1>
          <p className="text-3xl font-kanit text-white mb-2 font-bold md:text-4xl lg:text-6xl lg:mt-6">
            Harness the power of AI
          </p>
          <button
            className="bg-[#60A805] rounded-3xl text-white font-kanit px-8 py-2 font-bold border-2 border-black md:px-12 md:py-2 md:border-[3px] md:text-xl lg:w-[220px] lg:h-[50px] lg:mt-7"
            onClick={() => setIsModalOpen(true)}
          >
            Apply Now
          </button>
        </div>

        <div className="mt-8 mb-10 md:mt-0 lg:mr-20">
          <img src={profilePic} alt="Profile Pic" className="md:w-[420px] lg:w-[512px] rounded-full" />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button className="absolute top-4 right-4" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Job Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="text" name="degree" placeholder="Degree" onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="text" name="jobExperience" placeholder="Relevant Job Experience" onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <textarea name="message" placeholder="Message (Optional)" onChange={handleChange} className="w-full p-3 border rounded-md"></textarea>

              {/* File Upload Field */}
              <input type="file" name="file" onChange={handleChange} className="w-full p-3 border rounded-md" required />

              <button type="submit" className="w-full bg-[#60A805] text-white p-3 rounded-md hover:bg-[#4E8700]">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
