import { useParams, Navigate } from "react-router-dom";
import { getToolById } from "../config/tools.config";

// Tool components
import MergeTool       from "../features/tools/merge/MergeTool";
import CompressTool    from "../features/tools/compress/CompressTool";
import PdfToPptTool    from "../features/tools/convert/pdf-to-ppt/PdfToPptTool";
import PdfToWordTool   from "../features/tools/convert/pdf-to-word/PdfToWordTool";

// Generic fallback for tools without a dedicated component yet
import ToolLayout from "../layouts/ToolLayout";
import UploadArea from "../features/tools/shared/UploadArea";
import FilePreview from "../features/tools/shared/FilePreview";
import Button from "../shared/ui/Button";
import { useFileUpload } from "../features/tools/engine/useFileUpload";

function GenericTool({ tool }) {
  const { files, handleInputChange, removeFile } = useFileUpload({
    accept: tool.accept,
    multiple: tool.multiple,
  });

  return (
    <ToolLayout tool={tool}>
      <UploadArea tool={tool} onFiles={handleInputChange} multiple={tool.multiple} />
      <FilePreview files={files} onRemove={removeFile} />
      {files.length > 0 && (
        <Button className="w-full mt-6" size="lg">
          {tool.label}
        </Button>
      )}
      <p className="text-center text-xs text-gray-400 mt-4">
        This tool is coming soon — backend integration in progress.
      </p>
    </ToolLayout>
  );
}

// Map tool IDs to their dedicated components
const TOOL_COMPONENTS = {
  "merge":      MergeTool,
  "compress":   CompressTool,
  "pdf-to-ppt": PdfToPptTool,
  "pdf-to-word":PdfToWordTool,
};

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = getToolById(toolId);

  if (!tool) return <Navigate to="/tools" replace />;

  const DedicatedComponent = TOOL_COMPONENTS[toolId];
  if (DedicatedComponent) return <DedicatedComponent />;

  return <GenericTool tool={tool} />;
}
