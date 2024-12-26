'use client'

import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeartButton } from '@/components/ui/heart-button';

export function HotelCard({
  hotelId,
  hotelName,
  currentRating,
  numberOfUsersRated,
  thumbnailImage,
  dishes,
}) {
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/hotels/${hotelId}`);
  };

  const handleLikeClick = (event) => {
    event.stopPropagation();
    setLiked(!liked);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        maxWidth: 'xl',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-4px)',
          transition: 'all 0.3s ease-in-out',
        },
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: 'relative', width: 150 }}>
        <CardMedia
          component={Image}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${thumbnailImage}`}
          alt={hotelName}
          width={150}
          height={200}
          sx={{ objectFit: 'cover' }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
          }}
          onClick={handleLikeClick}
        >
          <HeartButton isLiked={liked} />
        </IconButton>
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {hotelName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Rating: {currentRating} ⭐ ({numberOfUsersRated} users)
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Popular Dishes: {dishes.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
} 