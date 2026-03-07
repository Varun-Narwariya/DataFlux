import { getToolById } from "../../../config/tools.config";
import ToolLayout from "../../../layouts/ToolLayout";
import UploadArea from "../shared/UploadArea";
import FilePreview from "../shared/FilePreview";
import ToolOptionsPanel, { OptionRow, OptionSelect } from "../shared/ToolOptionsPanel";
import Button from "../../../shared/ui/Button";
import { useFileUpload } from "../engine/useFileUpload";
import { useToolProcessor } from "../engine/useToolProcessor";
import { useState } from "react";
import { toolApi } from "../../../services/toolApi";

const tool = getToolById("compress");

const QUALITY_OPTIONS = [
  { value: "extreme",      label: "Extreme compression (smaller file, lower quality)" },
  { value: "recommended",  label: "Recommended compression (balanced)" },
  { value: "less",         label: "Less compression (larger file, better quality)" },
];

export default function CompressTool() {
  const [quality, setQuality] = useState("recommended");
  const { files, handleInputChange, removeFile, error: uploadError } = useFileUpload({ accept: ".pdf", multiple: false });
  const { isProcessing, isDone, isError, error, progress, downloadResult, reset, process } = useToolProcessor();

  const handleCompress = () => {
    process(() => toolApi.compressPdf(files[0], quality));
  };

  return (
    <ToolLayout tool={tool}>
      {!isDone ? (
        <>
          <UploadArea tool={tool} onFiles={handleInputChange} />
          <FilePreview files={files} onRemove={removeFile} />

          {files.length > 0 && (
            <ToolOptionsPanel title="Compression Options">
              <OptionRow label="Quality" hint="Choose compression level">
                <OptionSelect value={quality} onChange={setQuality} options={QUALITY_OPTIONS} />
              </OptionRow>
            </ToolOptionsPanel>
          )}

          {(uploadError || isError) && (
            <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3">
              ⚠️ {uploadError || error}
            </div>
          )}

          {isProcessing && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Compressing PDF…</span><span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {files.length > 0 && !isProcessing && (
            <Button className="w-full mt-6 bg-orange-500 hover:bg-orange-600" size="lg" onClick={handleCompress}>
              Compress PDF
            </Button>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-black text-gray-800 mb-2">PDF Compressed!</h2>
          <p className="text-sm text-gray-500 mb-6">Your compressed PDF is ready to download.</p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" onClick={downloadResult} icon="⬇️">Download PDF</Button>
            <Button variant="secondary" size="lg" onClick={reset}>Compress Another</Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
