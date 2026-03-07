import { useState, useEffect, useCallback } from "react";
import { storageService } from "./storage.service";

export function useUserFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await storageService.getFiles();
      setFiles(data?.files || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const deleteFile = useCallback(async (id) => {
    await storageService.delete(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const downloadFile = useCallback(async (id, name) => {
    const blob = await storageService.download(id);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name || "file.pdf";
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return { files, loading, error, refetch: fetchFiles, deleteFile, downloadFile };
}
