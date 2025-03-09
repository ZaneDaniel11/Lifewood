import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
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
    message: ""
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      to_name: "Hiring Team",
      from_name: formData.fullName,
      age: formData.age,
      degree: formData.degree,
      job_experience: formData.jobExperience,
      from_email: formData.email,
      message: formData.message
    };

    emailjs.send("service_xxx", "template_nb605xl", templateParams, "your_user_id")
      .then(response => {
        console.log("Email sent successfully", response);
        alert("Application submitted successfully!");
        setIsModalOpen(false);
      })
      .catch(error => console.log("Error sending email", error));
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
          <animated.div style={modalAnimation} className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Job Application</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="text" name="jobExperience" placeholder="Relevant Job Experience" value={formData.jobExperience} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-md" required />
              <textarea name="message" placeholder="Message (Optional)" value={formData.message} onChange={handleChange} className="w-full p-3 border rounded-md"></textarea>
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
