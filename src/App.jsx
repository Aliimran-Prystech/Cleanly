import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HeroSection from "./components/HeroSection";
import Partners from "./components/Partners";
import { HowItWorks } from "./components/HowItWorks";
import Testomonial from "./components/Testomonial";

const App = () => {
  return (
    <>
      <div className="App">
        <header>
          <Header />
        </header>

        <main>
          <HeroSection />
          <Partners />
          <HowItWorks />
        </main>

        <Testomonial />
      </div>
    </>
  );
};

export default App;
