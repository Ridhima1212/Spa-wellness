import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔐 AUTH CHECK FIRST
    if (!user) {
      onClose();
      navigate("/login", { state: { from: "/services" } });
      return;
    }

    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      ...formData,
      service,
      user: user.name,
      id: Date.now(),
      status: "Pending",
    };

    bookings.push(newBooking);

    localStorage.setItem("bookings", JSON.stringify(bookings));

    // ✅ Booking success
    setSuccess(true);
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
