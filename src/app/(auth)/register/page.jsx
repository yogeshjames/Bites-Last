'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/hooks/use-auth';

// Styled Paper Component
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  background: '#ffffff',
  border: `1px solid ${theme.palette.divider}`,
  maxWidth: '800px',
  width: '90%',
  margin: '2rem auto',
}));

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    rollno: '',
    hostel: '',
    room: '',
    mobile: '',
  });
  const [verifiedNumber, setVerifiedNumber] = useState('');
  const router = useRouter();
  const { handleRegister } = useAuth();
  const theme = useTheme();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const initPhoneVerification = () => {
      const script = document.createElement('script');
      script.src = 'https://www.phone.email/sign_in_button_v1.js';
      script.async = true;
      const container = document.querySelector('.pe_signin_button');
      if (container) container.appendChild(script);

      window.phoneEmailListener = (userObj) => {
        axios.get(userObj.user_json_url).then((response) => {
          setVerifiedNumber(response.data.user_phone_number);
          toast.success('Phone verification successful!');
        });
      };
    };

    initPhoneVerification();
    return () => {
      window.phoneEmailListener = null;
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!verifiedNumber) {
      toast.error('Please verify your phone number first!');
      return;
    }

    if (formData.mobile !== verifiedNumber) {
      toast.error('Phone number does not match verified number!');
      return;
    }

    try {
      await handleRegister(formData);
      router.push('/');
    } catch (error) {
      toast.error(error.message || 'Registration failed!');
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f8f9fa',
        py: 4,
      }}
    >
      <StyledPaper elevation={3}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            color: theme.palette.text.primary,
            mb: 4,
          }}
        >
           Registration
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2.5 }}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2.5 }}
              />
              <TextField
                fullWidth
                label="Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2.5 }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student ID"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2.5 }}
              />
              <TextField
                fullWidth
                label="Hostel Name"
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2.5 }}
              />
              <TextField
                fullWidth
                label="Room Number"
                name="room"
                value={formData.room}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                required
                sx={{ mb: 2.5 }}
              />
            </Grid>
          </Grid>

          <Box 
            className="pe_signin_button" 
            data-client-id={process.env.NEXT_PUBLIC_PHONE_EMAIL_CLIENT_ID}
            sx={{ 
              mt: 4,
              '& iframe': {
                borderRadius: '12px !important',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1) !important',
              }
            }}
          />

          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4 
          }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!verifiedNumber}
              sx={{
                borderRadius: '12px',
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Complete Registration
            </Button>
          </Box>
        </Box>
      </StyledPaper>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          backgroundColor: '#ffffff',
          color: theme.palette.text.primary,
          borderRadius: '12px',
          border: `1px solid ${theme.palette.divider}`,
        }}
      />
    </Container>
  );
}