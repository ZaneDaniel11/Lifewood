import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingScreen from "./Loading";
import ErrorBoundary from "./ErrorBoundary";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ScrollProvider } from "./ScrollContext";

const Abouts = lazy(() => import("./About"));
const StockTicker = lazy(() => import("./Components/Infinitescroll"));
const Portfolio = lazy(() => import("./Portfolio"));
const Service = lazy(() => import("./Service"));
const AdminDashboard = lazy(() => import("./AdminSide/AdminDashboard"));
const Footer = lazy(() => import("./Components/Footer"));
const Login = lazy(() => import("./Login-form"));

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
      <ScrollProvider>
        <ToastContainer />
        {loading ? (
          <LoadingScreen setLoading={setLoading} />
        ) : (
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route path="/" element={<MainApp showToast={showToast} />} />
              <Route path="/admin" element={<ErrorBoundary><AdminDashboard /></ErrorBoundary>} />
              <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
            </Routes>
          </Suspense>
        )}
      </ScrollProvider>
    </Router>
  );
}

function MainApp({ showToast }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ErrorBoundary><Abouts /></ErrorBoundary>
      <ErrorBoundary><Service /></ErrorBoundary>
      <ErrorBoundary><StockTicker /></ErrorBoundary>
      <ErrorBoundary><Portfolio /></ErrorBoundary>
      <ErrorBoundary><Footer /></ErrorBoundary>
    </Suspense>
  );
}

export default App;