import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService, OpenAPI, type UserDto } from "../api";
import { useQuery } from "@tanstack/react-query";

export type AuthContextData = {
    setToken: (token: string) => void,
    clearToken: () => void,
} & ({
    authenticated: false,
    token: null,
    user: null,
} | {
    authenticated: true,
    token: string,
    user: UserDto,
});

const AuthContext = createContext<AuthContextData>({
    authenticated: false,
    token: null,
    user: null,
    setToken: () => {},
    clearToken: () => {},
});

const LOCALSTORAGE_TOKEN_KEY = "auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, realSetToken] = useState<string | null>(
    () => localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
  );

  // keep OpenAPI client in sync
  useEffect(() => {
    OpenAPI.TOKEN = token || undefined;
    if (token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
    }
  }, [token]);

  const { data: user, refetch: refetchUserInfo } = useQuery({
    queryKey: ['profile'],
    queryFn: () => AuthService.authControllerGetProfile(),
    enabled: !!token, // auto-fetch if we already have a token
  });

  const authenticated = !!token && !!user;

  const setToken = (t: string) => {
    realSetToken(t);
  };

  const clearToken = () => {
    realSetToken(null);
  };

  useEffect(() => {
    if (token) {
      refetchUserInfo();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={
        authenticated
          ? {
              authenticated: true,
              token: token!,
              user: user!,
              setToken,
              clearToken,
            }
          : {
              authenticated: false,
              token: null,
              user: null,
              setToken,
              clearToken,
            }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth() must be used inside AuthProvider');
    return ctx;
}
