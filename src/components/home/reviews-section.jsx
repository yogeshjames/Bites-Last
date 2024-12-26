'use client'

import { Box, Typography, Grid } from '@mui/material';
import ReviewCard from './review-card';

export function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Amazing service and delicious food!",
      date: new Date("2024-02-20")
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Quick delivery and great packaging.",
      date: new Date("2024-02-19")
    },
    {
      id: 3,
      name: "Mike Johnson",
      rating: 5,
      comment: "Best food delivery service in town!",
      date: new Date("2024-02-18")
    }
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        What Our Customers Say
      </Typography>
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} md={4} key={review.id}>
            <ReviewCard review={review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 