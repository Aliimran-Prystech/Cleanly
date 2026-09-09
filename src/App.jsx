import { Routes, Route } from "react-router-dom";

import BottomCTA from "./components/BottomCTA";
import CleaningServices from "./components/CleaningServices";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import TrustedCompanies from "./components/TrustedCompanies";
import Booking from "./components/Booking";

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TrustedCompanies />
      <HowItWorks />
      <Testimonials />
      <CleaningServices />
      <FAQ />
      <BottomCTA />
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking" element={<Booking />} />
    </Routes>
  );
};

export default App;
