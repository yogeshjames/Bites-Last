'use client'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ColorModeProvider } from './color-mode'
import { theme } from '@/lib/theme'

export function Provider({ children }) {
  return (
    <ColorModeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeProvider>
  )
}
