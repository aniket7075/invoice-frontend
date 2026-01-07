import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="custom-navbar">
      <div className="nav-container">

        {/* LEFT SIDE : LOGO + NAV LINKS */}
        <div className="nav-left">

          {/* LOGO */}
<div className="logo-box" onClick={() => navigate("/home")}>
  <div className="logo-bg">
    <img
      src="/DWI_logo.png"
      alt="DW Innovation Logo"
      className="logo-img"
    />
  </div>
  <span className="company-name">DW Innovation</span>
</div>



          {/* NAV LINKS */}
          <NavLink to="/home" className="nav-btn">
            Home
          </NavLink>

          <NavLink to="/invoice" className="nav-btn">
            Generate Invoice
          </NavLink>

          <NavLink to="/about" className="nav-btn">
            About
          </NavLink>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">
          <button className="logout-btn" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
