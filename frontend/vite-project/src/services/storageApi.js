import { apiClient } from "./apiClient";

export const storageApi = {
  getUserFiles: () =>
    apiClient.get("/storage/files"),

  getFile: (fileId) =>
    apiClient.get(`/storage/files/${fileId}`),

  uploadFile: (file) => {
    const form = new FormData();
    form.append("file", file);
    return apiClient.post("/storage/upload", form);
  },

  deleteFile: (fileId) =>
    apiClient.delete(`/storage/files/${fileId}`),

  downloadFile: (fileId) =>
    apiClient.get(`/storage/files/${fileId}/download`),

  renameFile: (fileId, name) =>
    apiClient.post(`/storage/files/${fileId}/rename`, { name }),

  getStorageUsage: () =>
    apiClient.get("/storage/usage"),
};
