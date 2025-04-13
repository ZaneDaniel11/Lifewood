import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import DataExtraction from "./assets/Portfolio/dataExtraction.png";
import MachineLearning from "./assets/Portfolio/MachineLearning.png";
import Genealogy from "./assets/Portfolio/geneology.png";
import Natural from "./assets/Portfolio/natural-lang.png";
import Customer from "./assets/Portfolio/CustomerService.png";
import Computer from "./assets/Portfolio/ComputerVision.png";
import Driving from "./assets/Portfolio/autonomousDriving.png";


export default function Portfolio() {
  const portfolioItems = [
    {
      id: 1,
      title: "AI DATA EXTRACTION",
      imgSrc: DataExtraction,
      description:
        "We use AI to optimize image and text acquisition through scanning, drone photography, archival negotiation, and partnerships with corporations, religious groups, and governments",
    },
    {
      id: 2,
      title: "Machine Learning Enablement",
      imgSrc: MachineLearning,
      description:
        "Our flexible data solutions support all ML systems, from simple data to deep learning.",
    },
    {
      id: 3,
      title: "AI Enabled Customer Service",
      imgSrc: Customer,
      description:
        "AI-driven customer service delivers fast, personalized experiences that boost engagement.",
    },
    {
      id: 4,
      title: "Genealogy",
      imgSrc: Genealogy,
      description:
        "AI-powered Lifewood preserves and digitizes records at scale, unlocking histories in any language or condition.",
    },
    {
      id: 5,
      title: "Natural Language Processing",
      imgSrc: Natural,
      description:
        "We partner with top NLP companies and provide solutions in 50+ languages with a global workforce.",
    },
    {
      id: 6,
      title: "Computer Vision",
      imgSrc: Computer,
      description:
        "Lifewood delivers complete data solutions for CV, from collection to annotation, ensuring high-quality training data.",
    },
    {
      id: 7,
      title: "Autonomous Driving Technology",
      imgSrc: Driving,
      description:
        "Lifewood fuels innovation, advancing Autonomous Driving Technology.",
    },
  ];

  return (
    <div className="relative bg-header-yellow font-kanit h-auto py-8">
      <div className="text-center mb-8 mx-1.5 lg:pb-[80px]">
        <h1 className="text-5xl text-black font-bold md:text-7xl md:pt-[100px] lg:text-8xl">
          PROJECTS
        </h1>
        <div className="mt-3 md:mt-6 lg:mt-10">
          <span className="text-2xl text-black font-bold md:text-4xl lg:text-6xl mt-7">
            Discover what our AI Data Services have accomplished
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 mx-1.5 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 pt-5">
        {portfolioItems.map((item, index) => (
          <PortfolioItem
            key={item.id}
            title={item.title}
            imgSrc={item.imgSrc}
            description={item.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function PortfolioItem({ title, imgSrc, description, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px)" : "translateY(50px)",
    config: { tension: 200, friction: 20 },
    delay: inView ? index * 200 : 0, // Staggered delay
  });

  return (
    <animated.div
      ref={ref}
      style={animation}
      className="rounded-2xl shadow-lg overflow-hidden bg-white transform transition duration-300 hover:scale-[1.02]"
    >
      {/* Image with hover overlay */}
      <div className="relative h-80 md:h-64">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover rounded-t-2xl" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-black px-4 py-2 text-sm font-semibold rounded-md shadow-md hover:bg-gray-300 transition">
            Read More
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 text-center">
        <h1 className="text-3xl md:text-xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm md:text-base text-gray-700 leading-relaxed">{description}</p>
      </div>
    </animated.div>
  );
}
