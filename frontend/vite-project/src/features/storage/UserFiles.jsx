import { useUserFiles } from "./useUserFiles";
import Button from "../../shared/ui/Button";

export default function UserFiles() {
  const { files, loading, error, deleteFile, downloadFile } = useUserFiles();

  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const formatSize = (b) => b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  if (loading) return (
    <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
      </svg>
      Loading your files…
    </div>
  );

  if (error) return (
    <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl px-5 py-4 text-sm">
      ⚠️ {error}
    </div>
  );

  if (!files.length) return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">📂</div>
      <p className="font-semibold text-gray-600">No files yet</p>
      <p className="text-sm text-gray-400 mt-1">Files you process will appear here</p>
    </div>
  );

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <div key={file.id} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm group hover:shadow-md transition">
          <div className="w-10 h-10 bg-red-50 border border-red-100 rounded-lg flex items-center justify-center text-xl shrink-0">📄</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-700 truncate">{file.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">{formatSize(file.size)} · {formatDate(file.createdAt)}</p>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
            <Button variant="ghost" size="sm" icon="⬇️" onClick={() => downloadFile(file.id, file.name)} />
            <Button variant="ghost" size="sm" icon="🗑️" onClick={() => deleteFile(file.id)} className="hover:text-rose-600 hover:bg-rose-50" />
          </div>
        </div>
      ))}
    </div>
  );
}
