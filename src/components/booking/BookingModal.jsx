import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import API_BASE_URL from "../../config";

const BookingModal = ({ isOpen, onClose, service }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔐 AUTH CHECK FIRST
    if (!user || !user.token) {
      onClose();
      navigate("/login", { state: { from: "/services" } });
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          service: service,
          date: formData.date,
          time: formData.time,
        }),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const data = await res.json();
        alert("Booking failed: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      alert("Error creating booking: " + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        {success ? (
          <div className="success-container">
            <h2>Booking Confirmed</h2>
            <p>
              Your session for <strong>{service}</strong> is booked!
            </p>

            <button
              className="dashboard-btn"
              onClick={() => {
                setSuccess(false);
                onClose();
                navigate("/dashboard");
              }}
            >
              View My Bookings →
            </button>
          </div>
        ) : (
          <>
            <h2>Confirm Your Booking</h2>

            <p className="modal-service">
              Service: <strong>{service}</strong>
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                onChange={handleChange}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                onChange={handleChange}
              />

              <input type="date" name="date" required onChange={handleChange} />

              <input type="time" name="time" required onChange={handleChange} />

              <button type="submit" className="confirm-btn">
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
