import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import profilePic from "../assets/proz.gif";
import emailjs from "emailjs-com";

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
    file: null, // New field for file
  });
  // Apply Now Button Animations
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

  const [displayText, setDisplayText] = useState("Lifewood");
  const texts = ["Harness the potential of AI", "Be Amazed."];
  const typingSpeed = 100;
  const eraseSpeed = 90;
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


  

  const handleChange = (e) => {
    if (e.target.name === "file") {
      // Handle file input separately
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.file) {
      alert("Please select a file to upload.");
      return;
    }
  
    // Convert file to Base64
    const reader = new FileReader();
    reader.readAsDataURL(formData.file);
    reader.onloadend = async () => {
      const base64File = reader.result.split(",")[1]; // Extract Base64 data
  
      const requestBody = {
        id: 0, // Backend will handle actual ID assignment
        fullName: formData.fullName,
        age: parseInt(formData.age, 10), // Convert age to number
        degree: formData.degree,
        jobExperience: formData.jobExperience,
        email: formData.email,
        message: formData.message,
        fileName: formData.file.name,
        fileData: base64File,
        submittedAt: new Date().toISOString(),
      };
  
      try {
        // Submit to the backend
        const backendResponse = await fetch("http://localhost:5237/api/ApplicationsApi/InsertApplication", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
  
        if (!backendResponse.ok) {
          throw new Error("Failed to submit application to the backend.");
        }
  
        console.log("Application submitted to backend successfully.");
  
        // Send email using EmailJS (matching your template)
        const templateParams = {
          to_name: "Hiring Team",
          from_name: formData.fullName,
          age: formData.age,
          degree: formData.degree,
          job_experience: formData.jobExperience,
          from_email: formData.email,
          message: formData.message || "No message provided.",
        };
  
        const emailResponse = await emailjs.send(
          "service_y55bw9l", // Your service ID
          "template_nb605xl", // Your template ID
          templateParams,
          "0LlVOg8BMb3Vq5Wuf" // Your public key
        );
  
        console.log("Email sent successfully:", emailResponse);
        alert("Application submitted successfully!");
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error submitting application:", error);
        alert("Error submitting application. Please try again.");
      }
    };
  };
  

  useEffect(() => {
    setTimeout(() => setHelloSpring({ opacity: 1, transform: "scale(1)" }), 200);
    setTimeout(() => setName({ opacity: 1, transform: "scale(1)" }), 400);
    setTimeout(() => setDescSpring({ opacity: 1, transform: "scale(1)" }), 600);
    setTimeout(() => setButtonSpring({ opacity: 1, transform: "scale(1)" }), 800);
    setTimeout(() => setImageSpring({ opacity: 1, transform: "scale(1)" }), 1000);
  }, [setHelloSpring, setName, setDescSpring, setButtonSpring, setImageSpring]);

  // Modal Animation
  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? "translateY(0)" : "translateY(-50px)",
  });

  return (
    <div className="block">
 <div className="mt-[20px] flex flex-col md:flex-row h-auto bg-body-yellow font-kanit items-center md:items-start justify-center md:justify-between space-y-8 md:space-y-0 md:space-x-8 px-4 py-6 md:py-10 lg:px-10 md:pt-[100px] md:pb-[100px] lg:pt-[130px] lg:pb-[170px]">
  <div className="text-center md:text-left lg:ml-20">
    <animated.h1
      style={helloSpring}
      className="font-kanit text-7xl m-0 mb-4 font-bold text-black md:text-6xl lg:text-9xl"
    >
      Lifewood
    </animated.h1>
    <animated.p
      style={Namewhat}
      className="text-3xl font-kanit text-white mb-2 font-bold md:text-4xl lg:text-6xl lg:mt-6 relative whitespace-nowrap"
    >
      {displayText}
      <span className="cursor"></span>
    </animated.p>
    <animated.p
      style={descSpring}
      className="font-kanit text-2xl mb-6 md:text-base lg:text-5xl lg:mt-4"
    >
      Harnessing the power of AI
    </animated.p>
    <animated.button
      style={buttonSpring}
      className="bg-[#60A805] rounded-3xl text-white font-kanit px-8 py-2 font-bold border-2 border-black md:px-12 md:py-2 md:border-[3px] md:text-xl lg:w-[220px] lg:h-[50px] lg:mt-7"
      onClick={() => setIsModalOpen(true)}
    >
      Apply Now
    </animated.button>
  </div>
  <animated.div style={imageSpring} className="mt-8 mb-10 md:mt-0 lg:mr-20">
    <img src={profilePic} alt="Profile Pic" className="md:w-[420px] lg:w-[512px] rounded-full" />
  </animated.div>
</div>


{isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
          <animated.div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button className="absolute top-4 right-4" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Job Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
          </animated.div>
        </div>
      )}
    </div>
  );
}
