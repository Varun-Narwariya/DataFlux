import apiClient from "./apiClient";

export const getUserFiles = () => apiClient.get("/files");