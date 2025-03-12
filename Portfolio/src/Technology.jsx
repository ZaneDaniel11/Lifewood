import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export default function Technology() {
  const techList = [
    { icon: "fa-microchip", label: "DATA ACQUISITION" },
    { icon: "fa-database", label: "DATA COLLECTION" },
    { icon: "fa-pencil-ruler", label: "DATA ANNOTATION" },
    { icon: "fa-folder-open", label: "DATA CURATION" },
    { icon: "fa-check-circle", label: "DATA VALIDATION" },
  ];

  // Title Animation (h1)
  const [refH1, inViewH1] = useInView({ triggerOnce: true, threshold: 0.8 });

  const h1Spring = useSpring({
    opacity: inViewH1 ? 1 : 0,
    transform: inViewH1 ? "translateY(0px) scale(1)" : "translateY(50px) scale(0.9)",
    config: { tension: 120, friction: 15 },
  });

  // Subtitle Animation (span)
  const [refSpan, inViewSpan] = useInView({ triggerOnce: true, threshold: 0.8 });

  const spanSpring = useSpring({
    opacity: inViewSpan ? 1 : 0,
    transform: inViewSpan ? "translateY(0px) scale(1)" : "translateY(30px) scale(0.95)",
    config: { tension: 100, friction: 18 },
  });

  return (
    <div className="bg-[#1D1D1D] overflow-x-hidden">
      <div className="text-center pt-8 font-kanit items-center justify-center mx-1.5 md:pt-[120px] lg:pb-[100px]">
        <animated.h1
          ref={refH1}
          style={h1Spring}
          className="text-5xl mb-4 font-bold text-body-yellow md:text-7xl pb-[20px] lg:text-8xl lg:pb-[40px]"
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

      <div className="text-lg grid grid-cols-1 mx-1.5 md:text-4xl md:grid-cols-1 md:pb-[120px] lg:grid-cols-2 gap-9 mt-10 p-8 font-kanit font-bold lg:text-sm">
        {techList.map((tech, index) => (
          <TechItem key={index} icon={tech.icon} label={tech.label} index={index} />
        ))}
      </div>
    </div>
  );
}

function TechItem({ icon, label, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px) scale(1)" : "translateY(20px) scale(0.9)",
    config: { tension: 150, friction: 20, mass: 1 },
    delay: index * 150,
  });

  return (
    <animated.div
      ref={ref}
      style={animation}
      className="flex items-center justify-center border-2 border-gray-600 h-24 bg-gray-800 rounded-lg md:h-[130px] 
      transition-transform duration-500 ease-out hover:scale-105"
    >
      {/* Icon: 30% width in lg */}
      <div className="w-[30%] flex justify-center">
        <i className={`fa-solid ${icon} text-[#60A805] text-4xl md:text-5xl lg:text-6xl`}></i>
      </div>
      {/* Label: 70% width in lg */}
      <div className="w-[70%] flex justify-start">
        <span className="text-white text-lg md:text-[30px] lg:text-[40px]">{label}</span>
      </div>
    </animated.div>
  );
}
