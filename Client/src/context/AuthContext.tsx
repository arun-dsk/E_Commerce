"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { API_BASE_URL } from "@/lib/api";
import type {
  AuthResult,
  AuthUser,
} from "@/types/auth";

const TOKEN_KEY = "token";
const USER_KEY = "user";

interface AuthApiResponse {
  token?: string;
  user?: AuthUser;
  error?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<AuthResult>;
  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

const saveAuth = (
  token: string,
  user: AuthUser
) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );
};

const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const getStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
};

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [token, setToken] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(true);
  const hasInitializedRef =
    useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const storedToken =
        getStoredToken();

      hasInitializedRef.current = true;

      if (storedToken) {
        setToken(storedToken);
        return;
      }

      clearAuth();
      setIsLoading(false);
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    let isMounted = true;

    const verifySession = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/users/me/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data =
          (await response.json()) as AuthApiResponse;

        if (!isMounted) {
          return;
        }

        if (!response.ok || !data.user) {
          clearAuth();
          setToken(null);
          setUser(null);
          return;
        }

        setUser(data.user);
        saveAuth(token, data.user);
      } catch {
        if (!isMounted) {
          return;
        }

        clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void verifySession();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const authenticate = useCallback(async (
    endpoint: "login" | "register",
    body: Record<string, string>
  ): Promise<AuthResult> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/users/${endpoint}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data =
        (await response.json()) as AuthApiResponse;

      if (!response.ok || !data.token || !data.user) {
        return {
          ok: false,
          error:
            data.error ??
            "Authentication failed",
        };
      }

      saveAuth(data.token, data.user);
      setToken(data.token);
      setUser(data.user);

      return { ok: true };
    } catch {
      return {
        ok: false,
        error:
          "Server error. Please try again.",
      };
    }
  }, []);

  const login = useCallback((
    email: string,
    password: string
  ) =>
    authenticate("login", {
      email,
      password,
    }), [authenticate]);

  const register = useCallback((
    name: string,
    email: string,
    password: string
  ) =>
    authenticate("register", {
      name,
      email,
      password,
    }), [authenticate]);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      register,
      logout,
    }),
    [
      user,
      token,
      isLoading,
      login,
      register,
      logout,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
