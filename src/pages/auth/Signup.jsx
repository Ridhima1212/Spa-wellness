import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import banner from "../../assets/banner.svg";

const Signup = () => {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(formData);

    localStorage.setItem("users", JSON.stringify(users));

    setShowToast(true);

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="signup-page">
      <div className="signup-left">
        <img src={banner} alt="" className="signup-bg-svg" />

        <div className="signup-card">
          <h2>Create Your Account</h2>
          <p>Join SpaWellness and experience true relaxation</p>

          {/* ROLE TOGGLE */}
          <div className="login-toggle">
            <button
              type="button"
              className={formData.role === "USER" ? "active" : ""}
              onClick={() =>
                setFormData({ ...formData, role: "USER" })
              }
            >
              👤User Signup
            </button>

            <button
              type="button"
              className={formData.role === "ADMIN" ? "active" : ""}
              onClick={() =>
                setFormData({ ...formData, role: "ADMIN" })
              }
            >
              👑Admin Signup
            </button>
          </div>

          <form className="signup-form" onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
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
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            <button type="submit">Create Account</button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>

      <div className="signup-right">
        <div className="signup-overlay">
          <h3>Relax. Refresh. Rejuvenate.</h3>
        </div>
      </div>

      {showToast && (
        <div className="toast-popup">
          ✅ Signup successful!
        </div>
      )}
    </div>
  );
};

export default Signup;