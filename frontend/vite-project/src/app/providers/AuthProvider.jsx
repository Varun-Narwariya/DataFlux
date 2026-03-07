import { createContext, useState, useEffect, useCallback } from "react";
import { authService } from "../../features/auth/auth.service";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = authService.getStoredUser();
    if (stored && authService.isAuthenticated()) {
      setUser(stored);
      // Refresh from server in background
      authService.getMe().then(setUser).catch(() => {
        authService.logout();
        setUser(null);
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const u = await authService.login(email, password);
    setUser(u);
    return u;
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const u = await authService.signup(name, email, password);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    window.location.href = "/";
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <svg className="animate-spin h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-sm font-medium">Loading…</span>
          </div>
        </div>
      ) : children}
    </AuthContext.Provider>
  );
}
