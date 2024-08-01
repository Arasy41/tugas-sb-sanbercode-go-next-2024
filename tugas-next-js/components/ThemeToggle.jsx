"use client"; // Add this directive

import { useEffect } from 'react';
import useThemeStore from '../stores/theme';

const ThemeToggle = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeToggle;
