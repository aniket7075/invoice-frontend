import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  // 🔐 HARD-CODED CREDENTIALS
  const VALID_EMAIL = "admin@gmail.com";
  const VALID_PASSWORD = "Admin@123";

  const isDisabled = !email || !password || loading;

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2500);
  };

  const login = () => {
    if (isDisabled) return;

    setLoading(true);

    // ⏳ fake delay for animation
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        localStorage.setItem("username", email.split("@")[0]);

        showToast("success", "Login successful 🎉");

        setTimeout(() => navigate("/home"), 1000);
      } else {
        showToast("error", "Invalid email or password ❌");
      }

      setLoading(false);
    }, 900);
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

      {/* 🔔 TOAST */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default Login;
