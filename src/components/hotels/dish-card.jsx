
import AddToCart from '@/components/ui/addtocart/AddToCart';

import { Card, CardContent, Typography, Box, Button, Input } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/cart';  // Import the useCart context

export function DishCard({ dish , restaurantId}) {
  const { addItem, removeItem } = useCart();  // Use context functions
  const handleAddToCart = () => {
    addItem(dish,restaurantId);  
  };

  const handleRemoveFromCart = () => {
    removeItem(dish.id); 
    console.log(`${dish.name} removed from cart!`);
  };



  return (
    <Card
      sx={{
        position: 'relative',
        boxShadow: 2,
        borderRadius: 2,
        width: '100%',
        maxWidth: 300,
        margin: 'auto',
      }}
    >
      <Box sx={{ position: 'relative', height: 100, width: '100%' }}>
        <Image
          src={`http://localhost:5000/${dish.image}`}
          alt={dish.name}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          priority
        />
      </Box>

      <CardContent>
        <Typography variant="h6" fontFamily="Muli" gutterBottom>
          {dish.name}
        </Typography>

        {/* Price and Add to Cart Button */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: -2,
            mb:0,
            padding:0
          }}
        >
          <Typography variant="body2" color="text.secondary" fontFamily="Quicksand">
            ₹{dish.price}
          </Typography>

          {/* Add to Cart Button */}
          <AddToCart 
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Box>
      </CardContent>
    </Card>
  );
}



