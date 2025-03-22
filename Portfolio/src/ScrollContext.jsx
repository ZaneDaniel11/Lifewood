import React, { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const serviceRef = useRef(null);
  
  const scrollToService = () => {
    if (serviceRef.current) {
      serviceRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <ScrollContext.Provider value={{ serviceRef, scrollToService }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  return useContext(ScrollContext);
}