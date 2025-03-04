import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Abouts from "./About";
import StockTicker from "./Components/Infinitescroll";
import Portfolio from "./Portfolio";
import Technology from "./Technology";
import LoadingScreen from "./Loading";
import AdminDashboard from "./AdminSide/AdminDashboard";
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
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      )}
    </Router>
  );
}

// Extracted main components
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
