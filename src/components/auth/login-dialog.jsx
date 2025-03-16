'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  IconButton,
  Typography,
  Checkbox,
  Link,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation'; 
<<<<<<< HEAD

=======
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);
>>>>>>> feature/socket-integration

export function LoginDialog({ isOpen, onClose }) {
  const [credentials, setCredentials] = useState({
    mobile: '',
    password: ''
  });
<<<<<<< HEAD
  const { handleLogin } = useAuth();
  const router = useRouter();
=======

  const { handleLogin } = useAuth();
>>>>>>> feature/socket-integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(credentials);
      onClose();
<<<<<<< HEAD
=======
    const clientId= localStorage.getItem('userId');

      socket.emit("joinHotelRoom", clientId);
      console.log(`Joined WebSocket room: ${clientId}`);
>>>>>>> feature/socket-integration
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <Box position="relative" p={4}>
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
        <Typography
          variant="h4"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '2rem',
            textAlign: 'center',
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '1rem',
            textAlign: 'center',
          }}
        >
          Log in now to explore all the features and benefits of our platform and see what’s new.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3}>
            <TextField
              placeholder="Enter your Mobile No."
              value={credentials.mobile}
              onChange={(e) => setCredentials((prev) => ({
                ...prev,
                mobile: e.target.value,
              }))}
              type="tel"
              fullWidth
              required
              variant="outlined"
              inputProps={{
                maxLength: 10,
                minLength: 10,
              }}
              label="Mobile No."
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
                fontFamily: 'Poppins, sans-serif',
              }}
            />

            <TextField
              placeholder="Enter your Password"
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({
                ...prev,
                password: e.target.value,
              }))}
              type="password"
              fullWidth
              required
              variant="outlined"
              label="Password"
              sx={{
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                },
                fontFamily: 'Poppins, sans-serif',
              }}
            />
            <Stack direction="row" justifyContent="space-between">
              <Link href="#" color="primary.main" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '0.9rem' }}>
                Forgot Password?
              </Link>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={onClose} variant="outlined" sx={{ fontFamily: 'Poppins, sans-serif', borderRadius: '8px' }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{ fontFamily: 'Poppins, sans-serif', borderRadius: '8px' }}>
            Login
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
