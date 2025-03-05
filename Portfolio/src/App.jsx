import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "./Loading";
import ErrorBoundary from "./ErrorBoundary";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Lazy loading components
const Abouts = lazy(() => import("./About"));
const StockTicker = lazy(() => import("./Components/Infinitescroll"));
const Portfolio = lazy(() => import("./Portfolio"));
const Technology = lazy(() => import("./Technology"));
const AdminDashboard = lazy(() => import("./AdminSide/AdminDashboard"));
const Github = lazy(() => import("./SocialsGithub/Github"));

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <Router>
      {loading ? (
        <LoadingScreen setLoading={setLoading} />
      ) : (
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<MainApp />} />
            <Route path="/admin" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
          </Routes>
        </Suspense>
      )}
    </Router>
  );
}

function MainApp() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ErrorBoundary><Abouts /></ErrorBoundary>
      <ErrorBoundary><Technology /></ErrorBoundary>
      <ErrorBoundary><StockTicker /></ErrorBoundary>
      <ErrorBoundary><Portfolio /></ErrorBoundary>
      <ErrorBoundary><Github /></ErrorBoundary>
    </Suspense>
  );
}

export default App;
