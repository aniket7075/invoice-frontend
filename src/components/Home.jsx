import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(false);

  const username = localStorage.getItem("username"); // from login

  useEffect(() => {
    if (username) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 2600);
      return () => clearTimeout(timer);
    }
  }, [username]);

  return (
    <>
      {/* 🔥 WELCOME ANIMATION OVERLAY */}
      {showWelcome && (
        <div className="welcome-overlay">
          <div className="welcome-box">
            👋 Welcome, <span>{username}</span>
          </div>
        </div>
      )}

      <div className="home-bg page-animate">
        <Navbar />

        <div className="home-content page-contentt">
          <h1>
            Welcome to <span>Invoice Generator</span>
          </h1>

          <p>
            Create professional GST invoices with automatic calculations,
            modern UI, and instant PDF & print support.
          </p>

          <div className="home-actions">
            <button
              className="primary-btn"
              onClick={() => navigate("/invoice")}
            >
              Generate Invoice
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/about")}
            >
              About Us
            </button>
          </div>
        </div>
      </div>

      <footer className="about-footer">
        <p>© 2025 DW Innovation Pvt. Ltd. All rights reserved.</p>
      </footer>
    </>
  );
};

export default Home;
