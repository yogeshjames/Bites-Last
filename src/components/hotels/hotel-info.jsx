'use client'

import { Box, Typography, Stack, Chip } from '@mui/material'
import Image from 'next/image'
import  Loader  from '@/components/ui/Loader'

export function HotelInfo({ hotel }) {
  return (
    <Box>
      <Box sx={{ position: 'relative', height: 400, width: '100%' }}>
        <Image
          src={`${hotel.thumbnailImage}`}
          alt={hotel.hotelName}
          fill
          style={{ objectFit: 'cover', borderRadius: '8px' }}
          priority
        />
      </Box>

      <Stack 
        alignItems="center" 
        spacing={2}
        sx={{ mt: 4 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            fontFamily="Nunito"
            sx={{ position: 'relative', top: '11px', mr: 2 }}
          >
            {hotel.hotelName}
          </Typography>
          <Loader />
        </Box>

        <Typography
          variant="h6"
          color="text.secondary"
          align="center"
          sx={{ pt: '7px' }}
        >
          Rating: {hotel.currentRating}{' '}
          <Chip 
            label={`${hotel.reviews.length} reviews`}
            size="small"
          />
        </Typography>
      </Stack>
    </Box>
  )
} 