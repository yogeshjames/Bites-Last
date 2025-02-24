'use client'

import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { StarRating } from '@/components/ui/star-rating';

export function ReviewCard({ review }) {

  function maskText(text, visibleChars = 3) {
    if (!text || text.length <= visibleChars) return text;
    const visiblePart = text.slice(0, visibleChars);
    const maskedPart = '*'.repeat(text.length - visibleChars);
    return `${visiblePart}${maskedPart}`;
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar
            src={review.userImage}
            alt={review.userName}
            sx={{ width: 32, height: 32, mr: 1 }}
          />
         <Box sx={{ flex: 1 }}>
  <Typography variant="subtitle2">
    {maskText(review.user)}
  </Typography>
</Box>
          <StarRating
            value={review.rating}
            readOnly
            size={16}
            color="#FFB400"
          />
        </Box>

        <Typography variant="body2" color="text.secondary">
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
} 