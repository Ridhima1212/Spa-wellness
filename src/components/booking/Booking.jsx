import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Booking = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    date: "",
    time: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 AUTH CHECK
    if (!user) {
      navigate("/login", { state: { from: "/booking" } });
      return;
    }

    // ✅ simulate booking success
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setFormData({
        name: "",
        email: "",
        service: "",
        date: "",
        time: "",
      });
      navigate("/dashboard");
    }, 2500);
  };

  return (
    <section id="booking" className="booking">
      <h2>Book Your Session</h2>

      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <select
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
        >
          <option value="">Select Service</option>
          <option>Swedish Massage</option>
          <option>Aroma Therapy</option>
          <option>Deep Tissue Massage</option>
          <option>Hot Stone Massage</option>
          <option>Balinese Massage</option>
          <option>Reflexology</option>
          <option>Thai Massage</option>
          <option>Head & Shoulder Massage</option>
          <option>Couple Massage</option>
          <option>Body Scrub & Polish</option>
          <option>Prenatal Massage</option>
          <option>Ayurvedic Abhyanga</option>
        </select>

        <input
          type="date"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
        />

        <input
          type="time"
          name="time"
          required
          value={formData.time}
          onChange={handleChange}
        />

        <button type="submit">Confirm Booking</button>
      </form>

      {/* ✅ SUCCESS POPUP */}
      {success && (
        <div className="booking-success-overlay">
          <div className="booking-success">
            <div className="checkmark">✓</div>
            <h3>Booking Confirmed</h3>
            <p>Your session has been successfully booked.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Booking;
