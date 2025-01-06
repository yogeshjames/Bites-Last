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
         <Image
                  src={`http://localhost:5000/${thumbnailImage}`}
                  alt={hotelName}
                  fill
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                  priority
                />
        
          <HeartButton isLiked={liked}  onClick={handleLikeClick} />

      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {hotelName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Rating: {currentRating} ⭐ ({numberOfUsersRated} users)
        </Typography>
      </CardContent>
    </Card>
  );
} 