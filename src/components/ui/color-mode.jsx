'use client'

import { IconButton } from '@mui/material'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import * as React from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'

export function ColorModeProvider({ children }) {
  const [mounted, setMounted] = React.useState(false)
  const { theme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const muiTheme = createTheme({
    palette: {
      mode: theme === 'dark' ? 'dark' : 'light',
    },
  })

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </NextThemeProvider>
  )
}

export function ColorModeButton() {
  const { theme, setTheme } = useTheme()

  return (
    <IconButton
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      color="inherit"
      size="small"
      aria-label="Toggle color mode"
    >
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
