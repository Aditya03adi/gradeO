import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { signup } from "../lib/api";
import { persistSession } from "../lib/auth";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    prn: "",
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const trimmedForm = {
        prn: form.prn.trim(),
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password.trim(),
      };

      if (!/^\d{11}$/.test(trimmedForm.prn)) {
        throw new Error("PRN must be exactly 11 digits.");
      }

      if (trimmedForm.name.length < 2) {
        throw new Error("Name must be at least 2 characters long.");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedForm.email)) {
        throw new Error("Please enter a valid email address.");
      }

      if (!trimmedForm.email.toLowerCase().endsWith("@sitpune.edu.in")) {
        throw new Error("Only @sitpune.edu.in email addresses are allowed.");
      }

      if (trimmedForm.password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }

      const response = await signup({
        ...trimmedForm,
        prn: Number(trimmedForm.prn),
      });

      persistSession(response);
      navigate("/info");
    } catch (signupError) {
      setError(signupError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="eyebrow">Get started</div>
        <h2>Create your student account</h2>
        <p>Join gradeO with your PRN, your @sitpune.edu.in email, and a secure password.</p>

        <form onSubmit={handleSignup} className="auth-form">
          <input
            name="prn"
            placeholder="PRN"
            value={form.prn}
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
          />
          <div className="password-row">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <Link to="/" className="btn-link auth-site-link">
          Go back to site
        </Link>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
