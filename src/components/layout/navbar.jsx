'use client'

import { 
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { Image } from '@/components/ui/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { UserContext } from '@/context/user'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from '@/context/cart'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { LoginDialog } from '@/components/auth/login-dialog'

export function Navbar() {
  const { user } = useContext(UserContext)
  const { items } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'white',
          height: {xs:'9vh',md:'11vh'},
          boxShadow: 1
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: { xs: '100%', sm: '80%', md: '1200px' },
            mx: 'auto',
            width: '100%',
            height: '100%',
            px: { xs: 2, sm: 3 }
          }}
        >
          <Box sx={{ flexShrink: 0 }}>
            <Link href="/" style={{ display: 'block' }}>
              <Image
                src="/images/logo.png"
                alt="Logo"
<<<<<<< HEAD
                width={73}
                height={75}
=======
                 width={73}
                 height={75}
>>>>>>> feature/socket-integration
                priority
              />
            </Link>
          </Box>
          { (
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: 'center',
                margin: 'auto',
                flex: 1,
                mx: 2,
                fontFamily: 'Scandia',
                fontWeight: 'bold',
                color: 'text.primary'
              }}
            >
              We got everything you love
              <span role="img" aria-label="heart" style={{ marginLeft: '4px' }}>❤️</span>
            </Typography>
          )}

          <Box sx={{ flexShrink: 0 }}>
            {user ? (
              <IconButton
                onClick={() => setIsCartOpen(true)}
                color="primary"
                aria-label="Open cart"
                sx={{ position: 'relative' }}
              >
                <Badge 
                  badgeContent={items.length} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -3,
                      top: 3,
                    }
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            ) : (
              <Button
                onClick={() => setIsSignInOpen(true)}
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: '24px',
                  px: { xs: 1, md: 2.5 },
                  py: { xs: 1, md: 0.75 },
                  fontSize: { xs: '1.1rem', md: '0.875rem' },
                  fontWeight: 'normal',
                  '&:hover': {
                    borderColor: 'primary.light',
                  }
                }}
              >
                Sign In
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* we use this coz we hav alittle gap below the navabr which prevent s teh content from going indside  */}
      {/* Add spacing to prevent content from hiding under the fixed navbar */}
      <Box sx={{ height: '9vh' }} />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <LoginDialog 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </>
  )
} 