'use client';

import { IconButton } from '@mui/material';
import { Brightness4 as MoonIcon, Brightness7 as SunIcon } from '@mui/icons-material';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
