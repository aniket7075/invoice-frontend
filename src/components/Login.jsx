import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const isDisabled = !email || !password || loading;

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2800);
  };

  const login = async () => {
    if (isDisabled) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      // ✅ store username/email for welcome animation
      localStorage.setItem("username", email.split("@")[0]);

      showToast("success", "Login successful 🎉");

      setTimeout(() => navigate("/home"), 1200);

    } catch (err) {
      showToast("error", err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="login-container glass pop-in">

        <h2>🔐 Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={email ? "input-success" : ""}
        />

        <div className="password-box">
          <input
            type={showPwd ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={password ? "input-success" : ""}
          />
          <span onClick={() => setShowPwd(!showPwd)}>
            {showPwd ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          onClick={login}
          disabled={isDisabled}
          className={loading ? "loading" : ""}
        >
          {loading ? "Checking..." : "Login"}
        </button>

      </div>

      {/* 🔔 Toast Popup */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default Login;
