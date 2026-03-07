function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 40px",
        borderBottom: "1px solid #ddd"
      }}
    >
      <h2 style={{ color: "red" }}>DataFlux</h2>

      <div>
        <button>Login</button>
        <button style={{ marginLeft: "10px" }}>Sign up</button>
      </div>
    </nav>
  );
}

export default Navbar;