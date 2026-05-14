function Navbar() {
  return (
    <div style={{
      background: "white",
      padding: "15px 25px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ margin: 0 }}>Student Login</h3>
      <input 
        placeholder="Search..." 
        style={{
          padding: "8px 12px",
          borderRadius: "8px",
          border: "1px solid #ddd"
        }}
      />
    </div>
  );
}

export default Navbar;