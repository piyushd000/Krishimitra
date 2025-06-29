// src/pages/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserContextType {
  user: string | null;
  setUser: (user: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setUser(savedName);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
