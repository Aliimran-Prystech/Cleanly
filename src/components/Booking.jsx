import { useState } from "react";
import "../styles/components/Booking.scss";

const Booking = () => {
  const [cleaningType, setCleaningType] = useState("STANDARD");
  const [frequency, setFrequency] = useState("WEEKLY");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const [extras, setExtras] = useState({
    oven: false,
    windows: false,
    fridge: false,
  });

  const [specialRequirements, setSpecialRequirements] = useState("");
  const [selectedTime, setSelectedTime] = useState("7:00 AM");

  const frequencyOptions = [
    { name: "ONE-TIME" },
    { name: "WEEKLY", discount: "SAVE UP TO 25% OFF", featured: true },
    { name: "BI-WEEKLY", discount: "SAVE UP TO 15% OFF" },
    { name: "MONTHLY", discount: "SAVE UP TO 10% OFF" },
  ];

  const toggleExtra = (extra) => {
    setExtras((prev) => ({
      ...prev,
      [extra]: !prev[extra],
    }));
  };

  return (
    <div className="booking-page">
      {/* Page Heading */}
      <section className="booking-page__hero">
        <h1>Book your cleaning</h1>
        <p>Its time to book our cleaning service for your home or apartment.</p>
      </section>

      {/* Booking Layout */}
      <section className="booking-page__wrapper">
        {/* LEFT SIDE */}
        <div className="booking-form">
          {/* Cleaning Preferences */}
          <div className="booking-card">
            <div className="booking-card__header">
              <h2>Cleaning Preferences</h2>
            </div>

            <div className="booking-card__body">
              {/* Cleaning Type */}
              <div className="booking-field">
                <p>What type of cleaning?</p>

                <div className="booking-options booking-options--three">
                  {["STANDARD", "DEEP", "MOVE IN/OUT"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={
                        cleaningType === type
                          ? "booking-option active"
                          : "booking-option"
                      }
                      onClick={() => setCleaningType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frequency */}
              <div className="booking-field">
                <p>How often would you like cleaning?</p>

                <div className="booking-options booking-options--four">
                  {frequencyOptions.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      className={`booking-option ${
                        frequency === item.name ? "active" : ""
                      } ${item.featured ? "featured" : ""}`}
                      onClick={() => setFrequency(item.name)}
                    >
                      {item.featured && <span className="ribbon-badge">★</span>}
                      {item.discount && (
                        <span className="discount-tooltip">
                          {item.discount}
                        </span>
                      )}
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-divider"></div>

              {/* Home Details */}
              <div className="booking-section-title">
                <h3>Tell us about your home</h3>
              </div>

              <div className="booking-home-options">
                {/* Bedrooms */}
                <div className="room-card">
                  <div className="room-card__icon">
                    <img
                      src="https://cleanly-700a6.firebaseapp.com/static/media/double-bed.d9f07817ed485e9e44867d90cd599487.svg"
                      alt="bedroom_icon"
                      width={100}
                    />
                  </div>

                  <strong>BEDROOMS</strong>

                  <div className="room-card__counter">
                    <button
                      type="button"
                      onClick={() => setBedrooms(Math.max(1, bedrooms - 1))}
                    >
                      −
                    </button>

                    <span>{bedrooms}</span>

                    <button
                      type="button"
                      onClick={() => setBedrooms(Math.min(10, bedrooms + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bathrooms */}
                <div className="room-card">
                  <div className="room-card__icon">
                    <img
                      src="https://cleanly-700a6.firebaseapp.com/static/media/shower.e6890660b15eb68b523fa147e59542bb.svg"
                      alt="bathroom_icon"
                      width={100}
                    />
                  </div>

                  <strong>BATHROOMS</strong>

                  <div className="room-card__counter">
                    <button
                      type="button"
                      onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}
                    >
                      −
                    </button>

                    <span>{bathrooms}</span>

                    <button
                      type="button"
                      onClick={() => setBathrooms(Math.min(10, bathrooms + 1))}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Extras */}
              <div className="booking-field booking-extras">
                <p>Need any extras?</p>

                <div className="extra-options">
                  <button
                    type="button"
                    className={extras.oven ? "extra-card active" : "extra-card"}
                    onClick={() => toggleExtra("oven")}
                  >
                    <span className="extra-card__icon">♨</span>
                    <span>CLEAN OVEN</span>
                  </button>

                  <button
                    type="button"
                    className={
                      extras.windows ? "extra-card active" : "extra-card"
                    }
                    onClick={() => toggleExtra("windows")}
                  >
                    <span className="extra-card__icon">▣</span>
                    <span>CLEAN WINDOWS</span>
                  </button>

                  <button
                    type="button"
                    className={
                      extras.fridge ? "extra-card active" : "extra-card"
                    }
                    onClick={() => toggleExtra("fridge")}
                  >
                    <span className="extra-card__icon">▯</span>
                    <span>CLEAN FRIDGE</span>
                  </button>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="booking-field special-requirements">
                <p>
                  Do you have any special requirements? <span>(optional)</span>
                </p>

                <textarea
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                />
              </div>

              <div className="booking-divider"></div>

              {/* Choose Dates */}
              <div className="booking-section-title">
                <h3>Choose dates</h3>
              </div>

              <div className="booking-divider"></div>

              <div className="booking-field">
                <p>Choose a date?</p>

                <input type="date" defaultValue="2026-09-09" />
              </div>

              {/* Time */}
              <div className="booking-field">
                <p>When do you like to start?</p>

                <div className="time-options">
                  {[
                    "7:00 AM",
                    "9:00 AM",
                    "11:00 AM",
                    "1:00 PM",
                    "3:00 PM",
                    "5:00 PM",
                    "7:00 PM",
                    "9:00 PM",
                  ].map((time) => (
                    <button
                      type="button"
                      key={time}
                      className={
                        selectedTime === time
                          ? "time-option active"
                          : "time-option"
                      }
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="booking-divider"></div>

              {/* Pay Later */}
              <div className="pay-later">
                <h2>BOOK NOW, PAY LATER</h2>

                <h3>We offer a money back guarantee</h3>

                <p>
                  Pay only after your cleaning is complete and you are satisfied
                  with the service.
                </p>
              </div>

              {/* Personal Details */}
              <div className="personal-details">
                <label>Personal Details</label>

                <input type="text" placeholder="Full Name" />

                <div className="personal-details__row">
                  <input type="email" placeholder="Email Address" />

                  <input type="tel" placeholder="Phone Number" />
                </div>

                <div className="personal-details__row">
                  <input
                    type="text"
                    placeholder="Your Full Address"
                    className="address-input"
                  />

                  <input type="text" placeholder="Zip" className="zip-input" />
                </div>

                <label className="terms">
                  <input type="checkbox" />
                  <span>
                    I read and agree to the{" "}
                    <a href="/">terms &amp; conditions</a>
                  </span>
                </label>

                <button type="button" className="complete-booking-btn">
                  🔒 Complete Booking via Secure Server
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <aside className="booking-summary">
          <div className="booking-summary__header">
            <h2>Booking Summary</h2>
          </div>

          <div className="booking-summary__body">
            <div className="summary-item">
              <span>🧹</span>
              <p>
                {cleaningType === "STANDARD"
                  ? "Standard Cleaning"
                  : cleaningType}
              </p>
            </div>

            <div className="summary-item">
              <span>▦</span>
              <p>Wed. 09/09/2026</p>
            </div>

            <div className="summary-item">
              <span className="summary-icon summary-icon--reload">↻</span>
              <p>
                {frequency === "ONE-TIME"
                  ? "One-Time"
                  : frequency === "BI-WEEKLY"
                    ? "Bi-Weekly"
                    : frequency.charAt(0) + frequency.slice(1).toLowerCase()}
              </p>
            </div>

            <div className="summary-total">
              <h3>Total cost</h3>
              <strong>$120.00</strong>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Booking;
