import { useState } from "react";
import { Link } from "react-router-dom";

import { resetPassword } from "../lib/api";
import { getCurrentUser } from "../lib/auth";

function Profile() {
  const user = getCurrentUser();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(event) {
    setPasswordForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  async function handlePasswordUpdate(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!user?.studentPrn) {
      setError("You must be logged in with a PRN-linked account.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (passwordForm.newPassword.trim().length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const response = await resetPassword({
        prn: user.studentPrn,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setSuccess(typeof response === "string" ? response : "Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (passwordError) {
      setError(passwordError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={container}>
      <div style={navbar}>
        <h2>Profile</h2>

        <div>
          <Link to="/dashboard" style={navBtn}>
            Dashboard
          </Link>
          <Link to="/marks" style={navBtn}>
            Marks
          </Link>
        </div>
      </div>

      <div style={profileHeader}>
        <div style={avatar}>{(user?.name || "G").charAt(0)}</div>

        <div>
          <h2>{user?.name || "Guest User"}</h2>
          <p>{user?.role ? `Role: ${user.role}` : "Login to see your profile"}</p>
        </div>
      </div>

      <div style={grid}>
        <div style={card}>
          <h3>Personal Details</h3>
          <p>
            <b>Name:</b> {user?.name || "-"}
          </p>
          <p>
            <b>Email:</b> {user?.email || "-"}
          </p>
        </div>

        <div style={card}>
          <h3>Account Details</h3>
          <p>
            <b>User ID:</b> {user?.id ?? "-"}
          </p>
          <p>
            <b>Student PRN:</b> {user?.studentPrn ?? "-"}
          </p>
          <p>
            <b>Role:</b> {user?.role || "-"}
          </p>
          <p>
            <b>Branch:</b> {user?.branch || "-"}
          </p>
          <p>
            <b>Department:</b> {user?.dept || "-"}
          </p>
          <p>
            <b>Status:</b> {user ? "Logged in" : "Not logged in"}
          </p>
        </div>

        <div style={card}>
          <h3>Reset Password</h3>
          <p style={helperText}>Update your password after logging in.</p>
          <form onSubmit={handlePasswordUpdate}>
            <input
              name="currentPassword"
              type="password"
              placeholder="Current password"
              value={passwordForm.currentPassword}
              onChange={handleChange}
              style={input}
            />
            <input
              name="newPassword"
              type="password"
              placeholder="New password"
              value={passwordForm.newPassword}
              onChange={handleChange}
              style={input}
            />
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={passwordForm.confirmPassword}
              onChange={handleChange}
              style={input}
            />
            {error && <p style={errorText}>{error}</p>}
            {success && <p style={successText}>{success}</p>}
            <button type="submit" style={actionBtn} disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const container = {
  padding: "20px",
  background: "#f8fafc",
  minHeight: "100vh",
  fontFamily: "sans-serif",
};

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
};

const navBtn = {
  marginRight: "10px",
  padding: "8px 14px",
  textDecoration: "none",
  background: "#4f46e5",
  color: "white",
  borderRadius: "6px",
};

const profileHeader = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const avatar = {
  width: "70px",
  height: "70px",
  borderRadius: "50%",
  background: "#4f46e5",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
  fontWeight: "bold",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const helperText = {
  color: "#64748b",
  marginTop: 0,
  marginBottom: "14px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  outline: "none",
};

const actionBtn = {
  width: "100%",
  padding: "12px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

const errorText = {
  color: "#b91c1c",
  marginBottom: "12px",
};

const successText = {
  color: "#15803d",
  marginBottom: "12px",
};
