import { useState } from "react";
import Booking from "../../components/booking/Booking";
import Testimonials from "../../components/home/Testimonials";

const BookingSection = () => {
  const [active, setActive] = useState("booking");

  return (
    <section className={`booking-toggle-section ${active}`}>
      
      {/* HEADING */}
      <h2 className="main-heading">Relax. Book. Experience.</h2>

      {/* TOGGLE BUTTONS */}
      <div className="toggle-buttons">
        <button
          className={active === "booking" ? "active" : ""}
          onClick={() => setActive("booking")}
        >
          Book Session
        </button>

        <button
          className={active === "feedback" ? "active" : ""}
          onClick={() => setActive("feedback")}
        >
          Give Feedback
        </button>
      </div>

      {/* CONTENT */}
      <div className="toggle-wrapper">

        {/* CARD */}
        <div className="glass-card">
          {active === "booking" ? <Booking /> : <Testimonials />}
        </div>

        {/* LOGO SIDE */}
        <div className="logo-side">
          <img src="/spa-wellness-logo.svg" alt="Spa Logo" />
        </div>

      </div>
    </section>
  );
};

export default BookingSection;