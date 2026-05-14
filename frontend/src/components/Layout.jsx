import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { clearSession, getCurrentUser } from "../lib/auth";

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Profile", path: "/profile" },
  { label: "Students", path: "/students" },
  { label: "Tests", path: "/tests" },
  { label: "Marks", path: "/marks" },
  { label: "Total Marks", path: "/total-marks" },
  { label: "Info", path: "/info" },
];

function Layout() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="sidebar-panel">
          <NavLink to="/" className="brand-mark">
            <span className="brand-badge">gO</span>
            <span>gradeO</span>
          </NavLink>

          <div className="sidebar-note">
            Your academic workspace for tests, marks, student insights, and branch-wise visibility.
          </div>

          <nav className="sidebar-links">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <main className="app-main">
        <header className="topbar">
          <div>
            <h3>{user?.name || "Student"}</h3>
            <div className="topbar-meta">
              {user?.email || "Logged in"} {user?.studentPrn ? `| PRN ${user.studentPrn}` : ""}
            </div>
            {(user?.branch || user?.dept) && (
              <div className="topbar-meta">
                {user?.branch || "Unknown"} {user?.dept ? `| ${user.dept}` : ""}
              </div>
            )}
          </div>

          <button type="button" onClick={handleLogout} className="danger-button">
            Logout
          </button>
        </header>

        <section className="content-shell">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default Layout;
