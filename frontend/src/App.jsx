import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const Home = ({ isLoggedIn, handleLogout }) => (
  <main className="home-layout">
    <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
    <HeroSection />
    <TrustedCompanies />
    <HowItWorks />
    <Testimonials />
    <CleaningServices />
    <BottomCTA />
  </main>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          }
        />
        <Route
          path="/auth"
          element={<Auth setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route 
        path="/dashboard" 
        element={<Dashboard isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} 
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;