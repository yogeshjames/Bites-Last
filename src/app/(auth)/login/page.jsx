'use client'

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Stack,
  Typography,
  InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    mobile: '',
    password: '',
  })
  const { handleLogin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleLogin(credentials)
    } catch (error) {
      // Error is handled by useAuth hook
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={8}>
        <Box textAlign="center">
          <Typography variant="h4" component="h1">Welcome Back</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: 'primary.main' }}>
              Sign up
            </Link>
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl required>
              <FormLabel>Mobile Number</FormLabel>
              <TextField
                name="mobile"
                value={credentials.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your mobile number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                }}
                inputProps={{ maxLength: 10 }}
                fullWidth
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Password</FormLabel>
              <TextField
                name="password"
                value={credentials.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                fullWidth
              />
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 3 }}
            >
              Sign In
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
} 