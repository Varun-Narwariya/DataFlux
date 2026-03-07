import { authApi } from "../../../services/authApi";

const TOKEN_KEY = "auth_token";
const USER_KEY  = "auth_user";

export const authService = {
  async login(email, password) {
    const data = await authApi.login(email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  },

  async signup(name, email, password) {
    const data = await authApi.signup(name, email, password);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    return data.user;
  },

  async logout() {
    try { await authApi.logout(); } catch (_) {}
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  async getMe() {
    return authApi.getMe();
  },

  getStoredUser() {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    return Boolean(this.getToken());
  },
};
