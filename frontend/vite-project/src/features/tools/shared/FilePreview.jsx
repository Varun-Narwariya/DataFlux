export default function FilePreview({ files, onRemove, onReorder }) {
  if (!files?.length) return null;

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2 mt-4">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-1">
        {files.length} file{files.length !== 1 ? "s" : ""} selected
      </p>
      {files.map((file, i) => (
        <div
          key={`${file.name}-${i}`}
          className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm group"
        >
          {/* Drag handle (visual only) */}
          {files.length > 1 && (
            <span className="text-gray-300 text-lg cursor-grab select-none">⠿</span>
          )}

          {/* File icon */}
          <div className="w-9 h-9 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center text-lg shrink-0">
            📄
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-700 truncate">{file.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatSize(file.size)}</p>
          </div>

          {/* Remove */}
          <button
            onClick={() => onRemove?.(i)}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-300 hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
