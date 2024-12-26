'use client'

import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { AddToCartButton } from '@/components/ui/add-to-cart-button';

export function DishCard({ dish }) {
  return (
    <Card sx={{ position: 'relative', boxShadow: 2 }}>
      <Box sx={{ position: 'relative', height: 200 }}>
        <CardMedia
          component="img"
          height="200"
          image={`${process.env.NEXT_PUBLIC_API_URL}/${dish.image}`}
          alt={dish.name}
          sx={{ objectFit: 'cover' }}
        />
        <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
          <AddToCartButton dish={dish} />
        </Box>
      </Box>

      <CardContent>
        <Typography 
          variant="h6"
          fontFamily="Muli"
          gutterBottom
        >
          {dish.name}
        </Typography>
        <Typography 
          variant="body2"
          color="text.secondary"
          fontFamily="Quicksand"
        >
          ₹{dish.price}
        </Typography>
      </CardContent>
    </Card>
  );
} 