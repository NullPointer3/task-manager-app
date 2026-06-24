import { createContext, ReactNode, useContext, useState } from "react";
import { api, AuthUser, clearToken, getToken, setToken } from "../lib/api";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  markEmailVerified: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => getToken() !== null);

  async function login(email: string, password: string) {
    const result = await api.login(email, password);
    setToken(result.token);
    setUser(result.user);
    setIsAuthenticated(true);
  }

  async function loginWithGoogle(credential: string) {
    const result = await api.googleLogin(credential);
    setToken(result.token);
    setUser(result.user);
    setIsAuthenticated(true);
  }

  async function register(email: string, password: string) {
    const result = await api.register(email, password);
    setToken(result.token);
    setUser(result.user);
    setIsAuthenticated(true);
  }

  function logout() {
    clearToken();
    setUser(null);
    setIsAuthenticated(false);
  }

  function markEmailVerified() {
    setUser((prev) => (prev ? { ...prev, emailVerified: true } : prev));
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, loginWithGoogle, register, logout, markEmailVerified }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
