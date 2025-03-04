import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Abouts from "./About";
import StockTicker from "./Components/Infinitescroll";
import Portfolio from "./Portfolio";
import Technology from "./Technology";
import LoadingScreen from "./Loading";
import Admin from "./Admin"; // Ensure this is the Admin Dashboard component
import Github from "./SocialsGithub/Github";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      {loading ? (
        <LoadingScreen setLoading={setLoading} />
      ) : (
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      )}
    </Router>
  );
}

// Extract main components into a separate component
function MainApp() {
  return (
    <>
      <Abouts />
      <Technology />
      <StockTicker />
      <Portfolio />
      <Github />
    </>
  );
}

export default App;
