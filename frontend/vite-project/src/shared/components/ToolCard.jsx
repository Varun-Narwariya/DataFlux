import { Link } from "react-router-dom";

function ToolCard({ title, slug }) {
  return (
    <Link
      to={`/tool/${slug}`}
      style={{
        border: "1px solid #ddd",
        padding: "30px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "black",
        textAlign: "center"
      }}
    >
      <h3>{title}</h3>
    </Link>
  );
}

export default ToolCard;