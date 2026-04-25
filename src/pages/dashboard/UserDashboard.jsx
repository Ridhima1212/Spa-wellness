import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/main.css";
const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  // 🔐 Protect route
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 📦 Load bookings
  useEffect(() => {
    if (!user) return;

    const loadBookings = () => {
      const storedBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      const userBookings = storedBookings.filter(
        (booking) => booking.user === user.name
      );

      setBookings(userBookings);
    };

    loadBookings();
  }, [user]);

  // ❌ Cancel booking
  const cancelBooking = (id) => {
    const storedBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    const updatedBookings = storedBookings.filter(
      (booking) => booking.id !== id
    );

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    const userBookings = updatedBookings.filter(
      (booking) => booking.user === user.name
    );

    setBookings(userBookings);
  };

return (
  <div className="dashboard-container">
    <div className="dashboard-content">

      {/* HEADER */}
      <div className="dashboard-header">
        <h1>✨ My Bookings</h1>
        <p>Relax. Refresh. Rejuvenate.</p>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings yet</h3>
          <p>Book your first relaxing session 🌸</p>
        </div>
      ) : (
        <div className="table-card">

          {/* TABLE HEADER */}
          <div className="table-top">
            <h2>Recent Appointments</h2>
          </div>

          <table className="user-table">
            <thead>
              <tr>
                <th>💆 Service</th>
                <th>📅 Date</th>
                <th>⏰ Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="service-cell">{booking.service}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>

                  <td>
                    <span className={`status ${booking.status?.toLowerCase()}`}>
                      {booking.status || "Pending"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="cancel-btn"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  </div>
);
};

export default UserDashboard;