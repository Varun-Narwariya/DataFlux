import { useState, useRef } from "react";
import { ACCENT_CLASSES } from "../../../config/tools.config";

export default function UploadArea({ tool, onFiles, multiple = false }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const a = ACCENT_CLASSES[tool?.accent || "red"];

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    onFiles?.(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`
        relative border-2 border-dashed rounded-3xl p-14 flex flex-col items-center gap-4
        cursor-pointer select-none transition-all duration-200
        ${dragging
          ? `${a.border} ${a.bg} scale-[1.01]`
          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={tool?.accept || "*"}
        multiple={multiple}
        className="hidden"
        onChange={(e) => { onFiles?.(e.target.files); e.target.value = ""; }}
      />

      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${a.icon} shadow-sm`}>
        {tool?.emoji || "📂"}
      </div>

      <div className="text-center">
        <p className="font-bold text-gray-700 text-base">
          {dragging ? "Release to upload" : "Drop files here"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          or <span className={`font-semibold ${a.text} underline underline-offset-2`}>browse from device</span>
        </p>
      </div>

      <label className={`pointer-events-none text-white text-sm font-bold px-6 py-3 rounded-xl shadow-sm ${a.btn} transition`}>
        Select {multiple ? "Files" : "File"}
      </label>

      <p className="text-xs text-gray-400">
        Supported: {tool?.accept?.toUpperCase().replace(/\./g, "").replace(/,/g, ", ") || "All formats"} · Max 100MB
      </p>
    </div>
  );
}
