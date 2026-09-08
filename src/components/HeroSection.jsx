import Carousel from "react-bootstrap/Carousel";
import Cleaning1 from "../assets/Cleaning1.jpg";
import Cleaning2 from "../assets/Cleaning2.jpg";
import Cleaning3 from "../assets/Cleaning3.jpg";

const HeroSection = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 hero-image"
          src={Cleaning1}
          alt="Professional bedroom cleaning"
        />

        <Carousel.Caption className="hero-caption">
          <h1>A Cleaner Home, A Happier Life</h1>

          <p>
            Professional cleaning services for a fresh and comfortable home.
          </p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 hero-image"
          src={Cleaning2}
          alt="Professional bathroom cleaning"
        />

        <Carousel.Caption className="hero-caption">
          <h1>Professional Deep Cleaning</h1>

          <p>Let our professional cleaners take care of every corner.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 hero-image"
          src={Cleaning3}
          alt="Clean and beautiful home"
        />

        <Carousel.Caption className="hero-caption">
          <h1>Book Your Cleaning Today</h1>

          <p>Choose your preferred service, date, and time.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default HeroSection;
