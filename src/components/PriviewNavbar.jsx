import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ onUpdate, onPrint, onDownload }) => {
  const navigate = useNavigate();

  return (
    <nav className="custom-navbar no-print">
      <div className="nav-container">

        {/* LEFT SIDE */}
        <div className="nav-left">
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

          <NavLink to="/home" className="nav-btn">Home</NavLink>
          <NavLink to="/invoice" className="nav-btn">Generate Invoice</NavLink>
          <NavLink to="/about" className="nav-btn">About</NavLink>
        </div>

        {/* RIGHT SIDE */}
        <div className="nav-right">

          {(onUpdate || onPrint || onDownload) && (
            <>
              {onUpdate && (
                <button
                  className="action-btn update-btn"
                  onClick={onUpdate}
                >
                  🔄 Update
                </button>
              )}

              {onPrint && (
                <button
                  className="action-btn print-btn"
                  onClick={onPrint}
                >
                  🖨 Print
                </button>
              )}

              {onDownload && (
                <button
                  className="action-btn download-btn"
                  onClick={onDownload}
                >
                  ⬇ Download
                </button>
              )}
            </>
          )}

          <button
            className="logout-btn"
            onClick={() => navigate("/")}
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
