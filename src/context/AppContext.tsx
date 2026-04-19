import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../data/types';
import { getCurrentUser, setCurrentUser, getDarkMode, setDarkMode } from '../utils/storage';

interface AppContextType {
  user: User | null;
  darkMode: boolean;
  setUser: (user: User | null) => void;
  toggleDarkMode: () => void;
  refreshUser: () => void;
}

const AppContext = createContext<AppContextType>({
  user: null,
  darkMode: false,
  setUser: () => {},
  toggleDarkMode: () => {},
  refreshUser: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [darkMode, setDarkModeState] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    if (u) setUserState(u);
    const dm = getDarkMode();
    setDarkModeState(dm);
    if (dm) document.documentElement.classList.add('dark');
  }, []);

  const setUser = (u: User | null) => {
    setCurrentUser(u);
    setUserState(u);
  };

  const refreshUser = () => {
    const u = getCurrentUser();
    setUserState(u);
  };

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkModeState(next);
    setDarkMode(next);
    if (next) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  return (
    <AppContext.Provider value={{ user, darkMode, setUser, toggleDarkMode, refreshUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
