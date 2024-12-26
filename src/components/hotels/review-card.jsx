'use client'

import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import { StarRating } from '@/components/ui/star-rating';
import { formatDistanceToNow } from 'date-fns';

export function ReviewCard({ review }) {
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
              {review.userName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
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