import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    if (token && name) {
      setUserState(name);
    }
  }, []);

  const setUser = (user: string | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('name', user);
    } else {
      localStorage.removeItem('name');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setUserState(null);
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, logout }}>
      {children}
    </UserContext.Provider>
  );
};
