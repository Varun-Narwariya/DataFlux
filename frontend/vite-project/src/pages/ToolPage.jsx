import { useParams } from "react-router-dom";
import Navbar from "../shared/components/Navbar";
import UploadBox from "../shared/components/UploadBox";

function ToolPage() {
  const { toolSlug } = useParams();

  return (
    <div>
      <Navbar />

      <h1 style={{ textAlign: "center", marginTop: "40px" }}>
        {toolSlug}
      </h1>

      <UploadBox />
    </div>
  );
}

export default ToolPage;