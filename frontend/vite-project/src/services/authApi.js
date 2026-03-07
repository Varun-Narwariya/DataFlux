import { apiClient } from "./apiClient";

export const authApi = {
  login: (email, password) =>
    apiClient.post("/auth/login", { email, password }),

  signup: (name, email, password) =>
    apiClient.post("/auth/signup", { name, email, password }),

  logout: () =>
    apiClient.post("/auth/logout", {}),

  getMe: () =>
    apiClient.get("/auth/me"),

  refreshToken: () =>
    apiClient.post("/auth/refresh", {}),
};
