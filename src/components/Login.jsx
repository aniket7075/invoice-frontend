

// export default Login;
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

  // 🔐 hard-coded credentials
  const HARD_EMAIL = "admin@gmail.com";
  const HARD_PASSWORD = "Admin@123";

  const isDisabled = !email || !password || loading;

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2800);
  };

  const login = () => {
    if (isDisabled) return;

    setLoading(true);

    setTimeout(() => {
      if (email === HARD_EMAIL && password === HARD_PASSWORD) {
        // ✅ store username for welcome animation
        localStorage.setItem("username", email.split("@")[0]);

        showToast("success", "Login successful 🎉");

        setTimeout(() => navigate("/home"), 1000);
      } else {
        showToast("error", "Invalid email or password ❌");
      }

      setLoading(false);
    }, 900); // fake delay for animation realism
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
