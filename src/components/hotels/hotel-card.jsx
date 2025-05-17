'use client'

import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
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

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: '100%',
        maxWidth: 320,              // Responsive max width
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        borderRadius: 2,
        mx: 'auto',                 // Auto horizontal margin to help centering
        '&:hover': {
          boxShadow: 8,
          transform: 'translateY(-4px)',
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: 200, borderRadius: 2, overflow: 'hidden' }}>
        <Image
          src={thumbnailImage}
          alt={hotelName}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 320px"
          priority
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <Typography
          variant="h6"
          color="text.primary"
          gutterBottom
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {hotelName}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Rating: {currentRating} ⭐ ({numberOfUsersRated} users)
        </Typography>
      </CardContent>
    </Card>
  );
}
