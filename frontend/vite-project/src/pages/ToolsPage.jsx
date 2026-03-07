import Navbar from "../shared/components/Navbar";
import ToolCard from "../shared/components/ToolCard";

const tools = [
  { title: "Merge PDF", slug: "merge-pdf" },
  { title: "Split PDF", slug: "split-pdf" },
  { title: "Compress PDF", slug: "compress-pdf" },
  { title: "PDF to PowerPoint", slug: "pdf-to-ppt" }
];

function ToolsPage() {
  return (
    <div>
      <Navbar />

      <h1 style={{ textAlign: "center", marginTop: "40px" }}>
        Every tool you need to work with PDFs
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          padding: "40px"
        }}
      >
        {tools.map((tool) => (
          <ToolCard key={tool.slug} {...tool} />
        ))}
      </div>
    </div>
  );
}

export default ToolsPage;