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
  MenuItem,
  InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    password: '',
    rollno: '',
    hostel: '',
    room: '',
  })
  const { handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleRegister(formData)
    } catch (error) {
      // Error is handled by useAuth hook
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Stack spacing={8}>
        <Box textAlign="center">
          <Typography variant="h4" component="h1">Create an Account</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: 'primary.main' }}>
              Sign in
            </Link>
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <FormControl required>
              <FormLabel>Full Name</FormLabel>
              <TextField
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                fullWidth
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Mobile Number</FormLabel>
              <TextField
                name="mobile"
                value={formData.mobile}
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
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Create a password"
                fullWidth
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Roll Number</FormLabel>
              <TextField
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                placeholder="Enter your roll number"
                fullWidth
              />
            </FormControl>

            <FormControl required>
              <FormLabel>Hostel</FormLabel>
              <TextField
                select
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                placeholder="Select your hostel"
                fullWidth
              >
                <MenuItem value="Garnet-A">Garnet-A</MenuItem>
                <MenuItem value="Garnet-B">Garnet-B</MenuItem>
                <MenuItem value="Garnet-C">Garnet-C</MenuItem>
              </TextField>
            </FormControl>

            <FormControl required>
              <FormLabel>Room Number</FormLabel>
              <TextField
                name="room"
                value={formData.room}
                onChange={handleChange}
                placeholder="Enter your room number"
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
              Register
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
} 