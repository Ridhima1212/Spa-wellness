import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // ✅ NEW
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = login(email, password, role); // ✅ pass role

    if (!user) {
      setError("Invalid credentials or role");
      return;
    }

    setShowToast(true);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="signup-page">
      <div className="signup-right login-left">
        <div className="signup-overlay">
          <h3>🌸Welcome Back!!🌸</h3>
        </div>
      </div>

      <div className="signup-left login-right">
        <div className="signup-card">
          <h2>Login to Your Account</h2>
          <p>Continue your journey of relaxation</p>

          {/* ✅ ROLE TOGGLE */}
          <div className="login-toggle">
            <button
              type="button"
              className={role === "USER" ? "active" : ""}
              onClick={() => setRole("USER")}
            >
              👤User Login
            </button>

            <button
              type="button"
              className={role === "ADMIN" ? "active" : ""}
              onClick={() => setRole("ADMIN")}
            >
              👑Admin Login
            </button>
          </div>

          <form className="signup-form" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="error">{error}</p>}

            <button type="submit">Login</button>

            <p className="auth-switch">
              Don’t have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>

      {showToast && (
        <div className="toast-popup">
          ✅ Login successful!
        </div>
      )}
    </div>
  );
};

export default Login;