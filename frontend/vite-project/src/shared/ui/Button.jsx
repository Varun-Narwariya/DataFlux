function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "red",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}

export default Button;