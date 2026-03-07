function Input(props) {
  return (
    <input
      {...props}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px"
      }}
    />
  );
}

export default Input;