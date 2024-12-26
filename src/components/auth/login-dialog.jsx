'use client'

import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Typography
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'

export function LoginDialog({ isOpen, onClose }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const { handleLogin } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleLogin(credentials)
      onClose()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        Sign In
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              autoFocus
              label="Phone"
              type="number"
              fullWidth
              required
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({
                ...prev,
                email: e.target.value
              }))}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({
                ...prev,
                password: e.target.value
              }))}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Sign In
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
} 