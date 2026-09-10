import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TrustedCompanies from "./components/TrustedCompanies";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import CleaningServices from "./components/CleaningServices";
import BottomCTA from "./components/BottomCTA";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import Booking from "./components/Booking";
import FAQ from "./components/FAQ";
import RecentBookings from "./components/RecentBookings";

const Home = ({ isLoggedIn, isAdmin, handleLogout }) => (
  <main className="home-layout">
    <Header isLoggedIn={isLoggedIn} isAdmin={isAdmin} onLogout={handleLogout} />
    <HeroSection />
    <TrustedCompanies />
    <HowItWorks />
    <Testimonials />
    <CleaningServices />
    <FAQ />
    <BottomCTA />
  </main>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home isLoggedIn={isLoggedIn} isAdmin={currentUser?.role === "admin"} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/auth"
          element={<Auth setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />}
        />
        <Route 
        path="/dashboard" 
        element={currentUser?.role === "admin" ? <Dashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : <Navigate to="/" replace />}
        />

        <Route
          path="/booking"
          element={<Booking isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
        />
        <Route
          path="/recent-bookings"
          element={isLoggedIn ? <RecentBookings isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> : <Navigate to="/auth" replace />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;