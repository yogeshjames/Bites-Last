'use client'

import { Box, Typography, Grid, Paper } from '@mui/material';

export function AboutSection() {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        About Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              We strive to provide the best food delivery experience to our customers,
              connecting them with their favorite restaurants and delivering happiness
              to their doorstep.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Our Values
            </Typography>
            <Typography variant="body1">
              Quality, reliability, and customer satisfaction are at the heart of
              everything we do. We work tirelessly to ensure that every delivery
              meets our high standards.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 