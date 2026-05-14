import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../lib/api";
import { persistSession } from "../lib/auth";

function Login() {
  const navigate = useNavigate();

  const [prn, setPrn] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const trimmedPrn = prn.trim();
      const trimmedPassword = password.trim();

      if (!/^\d{11}$/.test(trimmedPrn)) {
        throw new Error("PRN must be exactly 11 digits.");
      }

      if (!trimmedPassword) {
        throw new Error("Password is required.");
      }

      const response = await login({
        prn: Number(trimmedPrn),
        password: trimmedPassword,
      });
      if (typeof response === "string") {
        throw new Error(response);
      }

      persistSession(response);
      navigate("/info");
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="eyebrow">Welcome back</div>
        <h2>Login to your academic space</h2>
        <p>Use your PRN and password to open your personalized dashboard.</p>

        <form onSubmit={handleLogin} className="auth-form">
          <input
            type="text"
            inputMode="numeric"
            placeholder="PRN"
            value={prn}
            onChange={(event) => setPrn(event.target.value)}
            className="form-input"
          />

          <div className="password-row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-input"
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="ghost-button"
            >
              {showPassword ? "Hide" : "View"}
            </button>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <Link to="/" className="btn-link auth-site-link">
          Go back to site
        </Link>

        <p className="auth-footer">
          Don&apos;t have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
