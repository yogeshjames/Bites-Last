'use client'

import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ColorModeProvider } from './ui/color-mode'
import { UserProvider } from '@/context/user'
import { CartProvider } from '@/context/cart'
import { theme } from '@/lib/theme'

export function Providers({ children }) {
  return (
    <ColorModeProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </ColorModeProvider>
  )
} 