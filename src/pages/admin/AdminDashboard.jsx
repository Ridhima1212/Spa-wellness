import "./admin-dashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);

  // 🔐 Protect admin route
  useEffect(() => {
    if (!user || user.role?.toUpperCase() !== "ADMIN") {
      navigate("/");
    }
  }, [user, navigate]);

  // 📊 Load bookings & users
  useEffect(() => {
    const loadBookings = async () => {
      if (user?.token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/bookings`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await res.json();
          if (res.ok) {
            setBookings(data);
          }
        } catch (error) {
          console.error("Failed to load bookings:", error);
        }
      }
    };

    const loadUsers = async () => {
      if (user?.token) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await res.json();
          if (res.ok) {
            setSystemUsers(data);
          }
        } catch (error) {
          console.error("Failed to load users:", error);
        }
      }
    };

    loadBookings();
    loadUsers();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        setBookings(
          bookings.map((booking) =>
            booking._id === id ? { ...booking, status } : booking
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const deleteBooking = async (id) => {
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
      console.error("Failed to delete booking", error);
    }
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
            <h3>Registered Users</h3>
            <span>{systemUsers.length}</span>
          </div>
        </section>

        {/* REGISTERED USERS */}
        <section className="admin-section">
          <h2 className="section-title">Registered Users</h2>

          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {systemUsers.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found</td>
                </tr>
              ) : (
                systemUsers.map((sysUser) => (
                  <tr key={sysUser._id}>
                    <td>{sysUser.name}</td>
                    <td>{sysUser.email}</td>
                    <td>
                      <span className={`status ${sysUser.role === 'admin' ? 'accepted' : 'pending'}`}>
                        {sysUser.role}
                      </span>
                    </td>
                    <td>{new Date(sysUser.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
                  <tr key={booking._id}>
                    <td>{booking.user?.name || 'Unknown User'}</td>
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
                        onClick={() => updateStatus(booking._id, "Accepted")}
                      >
                        Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => updateStatus(booking._id, "Rejected")}
                      >
                        Reject
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => deleteBooking(booking._id)}
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
