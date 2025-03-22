import React, { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const introductionRef = useRef(null);
  const serviceRef = useRef(null);
  
  const scrollToServiceWithIntro = () => {
    // First scroll to the introduction section
    if (introductionRef.current) {
      introductionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // After a delay, scroll to the service section
      setTimeout(() => {
        if (serviceRef.current) {
          serviceRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 1500); // 1.5 second delay - adjust as needed
    }
  };
  
  return (
    <ScrollContext.Provider value={{ 
      introductionRef, 
      serviceRef, 
      scrollToServiceWithIntro 
    }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}