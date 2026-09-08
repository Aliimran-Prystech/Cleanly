import Booking_Call from "../assets/icons/Booking_Call.svg";
import Confirm_Booking from "../assets/icons/Confirm_Booking.svg";
import Home_clean from "../assets/icons/Home_clean.svg";

export const HowItWorks = () => {
  return (
    <div className="howItWorks-main-block">
      <section className="howItWorks ">
        <h2>
          How it <span>Works</span>
        </h2>
        <p>
          We've made all the hardwork for making it simple for you. Here's how
          it works.
        </p>
      </section>
      <section className="container d-flex text-center">
        <div className="icon_section1">
          <img src={Booking_Call} alt="Book a Cleaning" />
          <h4>Book a Cleaning</h4>
          <p className="text-left howItWorks-section-p">
            Click the book now button to make a booking on your preffered date
            and time.
          </p>
        </div>

        <div className="icon_section2">
          <img src={Confirm_Booking} alt="Confirm Booking" />
          <h4>Confirm Booking</h4>
          <p className="howItWorks-section-p">
            We will confirm your booking along with your instructions via secure
            transaction.
          </p>
        </div>

        <div className="icon_section3">
          <img src={Home_clean} alt="Home Clean" />
          <h4>We'll Clean it</h4>
          <p className="howItWorks-section-p">
            Our trusted & experienced maid will come to your door-step on the
            time for a cleaning.
          </p>
        </div>
      </section>
    </div>
  );
};
