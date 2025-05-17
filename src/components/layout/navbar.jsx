'use client'

import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Badge,
  Button,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/user'
import { useCart } from '@/context/cart'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { LoginDialog } from '@/components/auth/login-dialog'
import { Image } from '@/components/ui/image'

export function Navbar() {
  const { user } = useContext(UserContext)
  const { items } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 1 }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: { xs: 2, sm: 3 },
            maxWidth: 1200,
            mx: 'auto',
            width: '100%',
            gap: { xs: 1, sm: 2 },
          }}
        >
          {/* Left: Logo */}
          <Box sx={{ flexShrink: 0 }}>
            <Link href="/" passHref>
              <IconButton edge="start" disableRipple>
                <Image src="/images/logo.png" alt="Logo" width={73} height={75} priority />
              </IconButton>
            </Link>
          </Box>

          {/* Center: Text */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              minWidth: 100,
              maxWidth: 600,
              px: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Scandia',
                fontWeight: 'bold',
                color: 'text.primary',
                whiteSpace: 'nowrap',
                fontSize: {
                  xs: '1.05rem',
                  sm: '1.275rem',
                  md: '1.5rem',
                },
                textAlign: 'center',
              }}
            >
              We got everything you love ❤️
            </Typography>
          </Box>

          {/* Right: Cart or Sign-In */}
          <Box sx={{ flexShrink: 0 }}>
            {user ? (
              <IconButton color="primary" onClick={() => setIsCartOpen(true)}>
                <Badge badgeContent={items.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            ) : (
              <Button
                onClick={() => setIsSignInOpen(true)}
                variant="outlined"
                sx={{
                  borderRadius: '24px',
                  px: { xs: 1.5, sm: 2.5 },
                  py: 0.5,
                  fontSize: { xs: '0.95rem', sm: '1.105rem' },
                  minWidth: 'fit-content',
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Spacer to push content below the navbar */}
      <Toolbar />

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <LoginDialog isOpen={isSignInOpen} onClose={() => setIsSignInOpen(false)} />
    </>
  )
}