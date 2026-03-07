import { storageApi } from "../../services/storageApi";

export const storageService = {
  getFiles: () => storageApi.getUserFiles(),
  getFile: (id) => storageApi.getFile(id),
  upload: (file) => storageApi.uploadFile(file),
  delete: (id) => storageApi.deleteFile(id),
  download: (id) => storageApi.downloadFile(id),
  rename: (id, name) => storageApi.renameFile(id, name),
  getUsage: () => storageApi.getStorageUsage(),
};
