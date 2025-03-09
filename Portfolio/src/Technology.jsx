import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export default function Technology() {
  const techList = [
    { icon: "fa-microchip", label: "DATA ACQUISITION" }, // Microchip for acquiring data
    { icon: "fa-database", label: "DATA COLLECTION" }, // Database for collection
    { icon: "fa-pencil-ruler", label: "DATA ANNOTATION" }, // Pencil/Ruler for annotation
    { icon: "fa-folder-open", label: "DATA CURATION" }, // Folder open for curation
    { icon: "fa-check-circle", label: "DATA VALIDATION" }, // Check circle for validation
  ];

  // Animation for h1
  const [refH1, inViewH1] = useInView({ triggerOnce: true, threshold: 1 });

  const h1Spring = useSpring({
    opacity: inViewH1 ? 1 : 0,
    transform: inViewH1 ? "scale(1)" : "scale(0.5)",
    config: { tension: 250, friction: 20 },
  });

  // Animation for span
  const [refSpan, inViewSpan] = useInView({ triggerOnce: true, threshold: 1 });

  const spanSpring = useSpring({
    opacity: inViewSpan ? 1 : 0,
    transform: inViewSpan ? "scale(1)" : "scale(0.5)",
    config: { tension: 250, friction: 20 },
  });

  return (
    <div className="bg-[#1D1D1D] overflow-x-hidden">
      <div className="text-center pt-8 font-kanit items-center justify-center mx-1.5 md:pt-[120px] lg:pb-[100px]">
        <animated.h1
          ref={refH1}
          style={h1Spring}
          className="text-5xl mb-4 font-bold text-body-yellow md:text-7xl pb-[20px] lg:text-9xl lg:pb-[40px]"
        >
          SERVICES
        </animated.h1>
        <animated.span
          ref={refSpan}
          style={spanSpring}
          className="text-white text-2xl md:text-4xl lg:text-5xl"
        >
          A wide variety of services for all types of AI training data
        </animated.span>
      </div>

      <div className="text-xl grid grid-cols-1 mx-1.5 md:grid-cols-2 md:pb-[120px] lg:grid-cols-3 gap-6 mt-10 p-8 font-kanit font-bold text-2xl">
        {techList.map((tech, index) => (
          <TechItem key={index} icon={tech.icon} label={tech.label} index={index} />
        ))}
      </div>
    </div>
  );
}

function TechItem({ icon, label, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "scale(1)" : "scale(0.7)",
    config: { tension: 200, friction: 15 },
    delay: index * 150,
  });

  return (
    <animated.div
      ref={ref}
      style={animation}
      className="flex items-center justify-center border-2 border-gray-600 h-24 bg-gray-800 rounded-lg md:h-[130px]"
    >
      <div className="w-2/5 md:w-1/2 lg:w-1/2 flex justify-center">
        <i className={`fa-solid ${icon} text-[#60A805] text-4xl md:text-5xl lg:text-6xl`}></i>
      </div>
      <div className="w-3/5 md:w-1/2 lg:w-1/2 flex justify-start">
        <span className="text-white md:text-[30px] lg:text-[40px]">{label}</span>
      </div>
    </animated.div>
  );
}
