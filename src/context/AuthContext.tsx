import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { IS_MOCK } from "@/config/config";
import { MOCK_USER } from "@/mocks/mocks";

interface AuthContextType {
  userId: number | null;
  accessToken: string | null;
  setAuthData: (userId: number | null, accessToken: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(() => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? Number(storedUserId) : null;
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });

  const setAuthData = (newUserId: number | null, newAccessToken: string | null) => {
    setUserId(newUserId);
    setAccessToken(newAccessToken);
    if (newUserId && newAccessToken) {
      localStorage.setItem('userId', String(newUserId));
      localStorage.setItem('accessToken', newAccessToken);
    } else {
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
    }
  };

  useEffect(() => {
    if (IS_MOCK && !userId && !accessToken) {
      // Auto-login with mock user if in mock mode and not already authenticated
      if (MOCK_USER.id && MOCK_USER.sessionToken) {
        setAuthData(MOCK_USER.id, MOCK_USER.sessionToken);
      } else {
        console.warn("MOCK_USER is missing id or sessionToken for auto-login.");
      }
    }
  }, [IS_MOCK, userId, accessToken, setAuthData]);

  return (
    <AuthContext.Provider value={{ userId, accessToken, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
