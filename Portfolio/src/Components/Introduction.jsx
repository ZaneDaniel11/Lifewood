import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import profilePic from "../assets/proz.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [helloSpring, setHelloSpring] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.9)",
  }));
  const [Namewhat, setName] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.9)",
  }));

  const [descSpring, setDescSpring] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.9)",
  }));

  const [buttonSpring, setButtonSpring] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.9)",
  }));

  const [imageSpring, setImageSpring] = useSpring(() => ({
    opacity: 0,
    transform: "scale(0.9)",
  }));

  const [displayText, setDisplayText] = useState("Be Amazed.");
  const texts = ["Harness the potential of AI", "Be Amazed."];
  const typingSpeed = 150;
  const eraseSpeed = 100;
  const delayBeforeErase = 1500;
  const delayBeforeTypingStarts = 2000;

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isErasing = false;
    let timeout;

    const type = () => {
      const currentText = texts[textIndex];
      if (isErasing) {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          charIndex--;
          timeout = setTimeout(type, eraseSpeed);
        } else {
          isErasing = false;
          textIndex = (textIndex + 1) % texts.length;
          timeout = setTimeout(type, typingSpeed);
        }
      } else {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          charIndex++;
          timeout = setTimeout(type, typingSpeed);
        } else {
          isErasing = true;
          timeout = setTimeout(type, delayBeforeErase);
        }
      }
    };

    timeout = setTimeout(type, delayBeforeTypingStarts);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setTimeout(
      () => setHelloSpring({ opacity: 1, transform: "scale(1)" }),
      200
    );
    setTimeout(() => setName({ opacity: 1, transform: "scale(1)" }), 400);
    setTimeout(() => setDescSpring({ opacity: 1, transform: "scale(1)" }), 600);
    setTimeout(
      () => setButtonSpring({ opacity: 1, transform: "scale(1)" }),
      800
    );
    setTimeout(
      () => setImageSpring({ opacity: 1, transform: "scale(1)" }),
      1000
    );
  }, [setHelloSpring, setName, setDescSpring, setButtonSpring, setImageSpring]);
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
        body: submissionData,
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
    <div className="block md:h-[500px] lg:h-[700px]">
       <ToastContainer />
      <div className="mt-[20px] flex flex-col md:mt-0 md:flex-row h-auto bg-body-yellow font-kanit items-center md:items-start justify-center md:justify-between space-y-8 md:space-y-0 md:space-x-8 px-4 py-6 md:py-10  md:pt-[30px] md:pb-[100px] lg:pb-[50px]">
          <div className="text-center md:mt-[100px] md:text-left lg:ml-10">
          <animated.h1
            style={helloSpring}
            className="font-kanit text-7xl m-0 mb-4 font-bold text-black md:text-6xl lg:text-8xl"
          >
            Lifewood
          </animated.h1>
          <animated.p
            style={Namewhat}
            className="text-3xl font-kanit text-white mb-2 font-bold md:text-2xl lg:text-5xl lg:mt-6"
          >
            {displayText}
            <span className="cursor"></span>
          </animated.p>
      
          <animated.button
            style={buttonSpring}
            className="bg-[#60A805] rounded-3xl text-white font-kanit px-8 py-2 font-bold border-2 border-black md:px-12 md:py-2 md:border-[3px] md:text-xl lg:w-[220px] lg:h-[50px] lg:mt-7"
            onClick={() => setIsModalOpen(true)}
          >
             Apply Now
          </animated.button>
        </div>
        <animated.div
          style={imageSpring}
            className="mt-8 mb-10 md:mt-0 lg:mr-20"
        >
          <img
            src={profilePic}
            alt="Profile Pic"
            style={{ borderRadius: "185.5px" }}
           className="md:w-[420px] lg:w-[512px] rounded-full"
          />
        </animated.div>
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