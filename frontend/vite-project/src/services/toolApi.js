import apiClient from "./apiClient";

export const processTool = (tool, file) => {
  return apiClient.post(`/tools/${tool}`, file);
};