import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? "navbar-glass" : ""}`}>
      {/* LOGO */}
      <NavLink to="/" className="logo" onClick={closeMenu}>
        SpaWellness
      </NavLink>

      {/* HAMBURGER */}
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {/* NAV LINKS */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/services" onClick={closeMenu}>
            Services
          </NavLink>
        </li>

        {/* ✅ WHEN USER IS LOGGED IN */}
        {user ? (
          <>
            {/* USER DASHBOARD */}
            {user?.role === "USER" && (
              <li>
                <NavLink to="/dashboard" onClick={closeMenu}>
                  My Bookings
                </NavLink>
              </li>
            )}

            {/* ADMIN DASHBOARD */}
            {user?.role === "ADMIN" && (
              <li>
                <NavLink to="/admin" onClick={closeMenu}>
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* USER NAME */}
            <li className="nav-user">
              👋 Hi, <strong>{user.name}</strong>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login" onClick={closeMenu}>
                Login
              </NavLink>
            </li>

            <li>
              <NavLink to="/signup" className="signup-btn" onClick={closeMenu}>
                Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;