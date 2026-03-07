import { getToolById } from "../../../config/tools.config";
import ToolLayout from "../../../layouts/ToolLayout";
import UploadArea from "../shared/UploadArea";
import FilePreview from "../shared/FilePreview";
import Button from "../../../shared/ui/Button";
import { useFileUpload } from "../engine/useFileUpload";
import { useToolProcessor } from "../engine/useToolProcessor";
import { mergeService } from "./merge.service";

const tool = getToolById("merge");

export default function MergeTool() {
  const { files, handleDrop, handleInputChange, removeFile, reorderFiles, error: uploadError } = useFileUpload({ accept: ".pdf", multiple: true });
  const { isProcessing, isDone, isError, error, progress, downloadResult, reset, process } = useToolProcessor();

  const handleMerge = () => {
    process(() => mergeService.merge(files));
  };

  return (
    <ToolLayout tool={tool}>
      {!isDone ? (
        <>
          <UploadArea tool={tool} onFiles={handleInputChange} multiple />
          <FilePreview files={files} onRemove={removeFile} onReorder={reorderFiles} />

          {(uploadError || isError) && (
            <div className="mt-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl px-4 py-3">
              ⚠️ {uploadError || error}
            </div>
          )}

          {isProcessing && (
            <div className="mt-6">
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span>Merging PDFs…</span><span>{progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {files.length >= 2 && !isProcessing && (
            <Button className="w-full mt-6" size="lg" onClick={handleMerge} loading={isProcessing}>
              Merge {files.length} PDFs
            </Button>
          )}
          {files.length < 2 && files.length > 0 && (
            <p className="text-center text-sm text-gray-400 mt-4">Add at least one more PDF to merge</p>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-black text-gray-800 mb-2">PDFs Merged!</h2>
          <p className="text-sm text-gray-500 mb-6">Your merged PDF is ready to download.</p>
          <div className="flex gap-3 justify-center">
            <Button size="lg" onClick={downloadResult} icon="⬇️">Download PDF</Button>
            <Button variant="secondary" size="lg" onClick={reset}>Merge More</Button>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
