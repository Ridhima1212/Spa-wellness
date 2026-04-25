import "./admin-dashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);

  // 🔐 Protect admin route
  useEffect(() => {
    if (!user || user.role !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate]);

  // 📊 Load bookings
  useEffect(() => {
    const loadBookings = () => {
      const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
      setBookings(storedBookings);
    };

    loadBookings();

    window.addEventListener("storage", loadBookings);

    return () => {
      window.removeEventListener("storage", loadBookings);
    };
  }, []);

  const updateStatus = (id, status) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking,
    );

    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  const deleteBooking = (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);

    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="admin-dashboard">
      {/* 🔝 NAVBAR */}
      <header className="admin-navbar">
        <h2 className="admin-logo">SpaWellness Admin</h2>

        <button className="website-btn" onClick={() => navigate("/")}>
          Go to Website
        </button>
      </header>

      {/* 📄 MAIN CONTENT */}
      <main className="admin-main">
        {/* HEADER */}
        <div className="admin-header">
          <h1>Admin Dashboard ✨✨</h1>
          <p>Welcome back 👋</p>
        </div>

        {/* STATS */}
        <section className="stats-grid">
          <div className="stat-card">
            <h3>Total Bookings</h3>
            <span>{bookings.length}</span>
          </div>

          <div className="stat-card">
            <h3>Active Services</h3>
            <span>12</span>
          </div>

          <div className="stat-card">
            <h3>Users</h3>
            <span>86</span>
          </div>
        </section>

        {/* RECENT BOOKINGS */}
        <section className="admin-section">
          <h2 className="section-title">Recent Bookings</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="6">No bookings yet</td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.name}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`status ${booking.status.toLowerCase()}`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <button
                        className="accept-btn"
                        onClick={() => updateStatus(booking.id, "Accepted")}
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(booking.id, "Rejected")}
                      >
                        Reject
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteBooking(booking.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
