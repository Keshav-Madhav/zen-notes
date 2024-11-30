import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './button';

const DarkLightToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so this ensures the component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // If the component is not mounted, return null or a placeholder
  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button
      className={`h-fit w-fit p-2 mr-4 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-300 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-300`}
      onClick={toggleTheme}
    >
      {theme === 'dark' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default DarkLightToggle;