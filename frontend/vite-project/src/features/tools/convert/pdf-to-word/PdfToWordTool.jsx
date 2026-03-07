import { getToolById } from "../../../../config/tools.config";
import ToolLayout from "../../../../layouts/ToolLayout";
import UploadArea from "../../shared/UploadArea";
import FilePreview from "../../shared/FilePreview";
import Button from "../../../../shared/ui/Button";
import { useFileUpload } from "../../engine/useFileUpload";
import { useToolProcessor } from "../../engine/useToolProcessor";
import { convertService } from "../pdf-to-ppt/convert.service";

const tool = getToolById("pdf-to-word");

export default function PdfToWordTool() {
  const { files, handleInputChange, removeFile, error: uploadError } = useFileUpload({ accept: ".pdf", multiple: false });
  const { isProcessing, isDone, isError, error, progress, downloadResult, reset, process } = useToolProcessor();

  const handleConvert = () => {
    process(() => convertService.pdfToWord(files[0]));
  };

  return (
    <ToolLayout tool={tool}>
      {!isDone ? (
        <>
          <UploadArea tool={tool} onFiles={handleInputChange} />
          <FilePreview files={files} onRemove={removeFile} />

          {(uploadError || isError) && (
            <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3">
              ⚠️ {uploadError || error}
            </div>
          )}

          {isProcessing && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Converting to Word…</span><span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {files.length > 0 && !isProcessing && (
            <Button className="w-full mt-6" size="lg" onClick={handleConvert}>
              Convert to Word
            </Button>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-black text-gray-800 mb-2">Conversion Complete!</h2>
          <p className="text-sm text-gray-500 mb-6">Your Word document is ready.</p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" onClick={downloadResult} icon="⬇️">Download .DOCX</Button>
            <Button variant="secondary" size="lg" onClick={reset}>Convert Another</Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
