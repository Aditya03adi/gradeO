import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Home", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Tests", path: "/tests" },
    { name: "Marks", path: "/marks" },
    { name: "Profile", path: "/profile" }
  ];

  return (
    <div style={{
      width: "240px",
      background: "linear-gradient(180deg, #1e3a8a, #2563eb)",
      color: "white",
      padding: "20px",
      height: "100vh"
    }}>
      <h2 style={{ marginBottom: "30px" }}>🎓 Dashboard</h2>

      {menu.map(item => (
        <Link 
          key={item.name}
          to={item.path}
          style={{
            display: "block",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "10px",
            textDecoration: "none",
            color: "white",
            background: location.pathname === item.path ? "#3b82f6" : "transparent"
          }}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}

export default Sidebar;