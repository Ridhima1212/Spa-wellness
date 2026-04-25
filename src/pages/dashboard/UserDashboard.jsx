import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config";
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

    const loadBookings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/bookings/mybookings`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to load user bookings:", error);
      }
    };

    loadBookings();
  }, [user]);

  // ❌ Cancel booking
  const cancelBooking = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.ok) {
        setBookings(bookings.filter((booking) => booking._id !== id));
      }
    } catch (error) {
      console.error("Failed to cancel booking", error);
    }
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
                <tr key={booking._id}>
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
                      onClick={() => cancelBooking(booking._id)}
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