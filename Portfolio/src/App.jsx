import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "./Loading";
import ErrorBoundary from "./ErrorBoundary";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Abouts = lazy(() => import("./About"));
const StockTicker = lazy(() => import("./Components/Infinitescroll"));
const Portfolio = lazy(() => import("./Portfolio"));
const Technology = lazy(() => import("./Technology"));
const AdminDashboard = lazy(() => import("./AdminSide/AdminDashboard"));
const Footer = lazy(() => import("./Components/Footer"));

function App() {
  const [loading, setLoading] = useState(false);

  const showToast = () => {
    toast.success("Welcome to the app!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Router>
      <ToastContainer /> {/* Add this at the root level */}
      {loading ? (
        <LoadingScreen setLoading={setLoading} />
      ) : (
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<MainApp showToast={showToast} />} />
            <Route path="/admin" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
          </Routes>
        </Suspense>
      )}
    </Router>
  );
}

function MainApp({ showToast }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ErrorBoundary><Abouts /></ErrorBoundary>
      <ErrorBoundary><Technology /></ErrorBoundary>
      <ErrorBoundary><StockTicker /></ErrorBoundary>
      <ErrorBoundary><Portfolio /></ErrorBoundary>
      <ErrorBoundary><Footer /></ErrorBoundary>
    </Suspense>
  );
}

export default App;
