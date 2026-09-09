import BottomCTA from "./components/BottomCTA";
import CleaningServices from "./components/CleaningServices";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import TrustedCompanies from "./components/TrustedCompanies";

const App = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <TrustedCompanies />
      <HowItWorks />
      <Testimonials />
      <CleaningServices />
      <BottomCTA />
      <Footer />
    </>
  );
};

export default App;
