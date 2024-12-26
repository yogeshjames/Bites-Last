'use client'

import {
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Stack
} from '@mui/material';
import { useState } from 'react';
import { StarRating } from '@/components/ui/star-rating';

export function ReviewForm({ onSubmit, onCancel }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 1,
        bgcolor: 'background.paper',
        boxShadow: 1
      }}
    >
      <Stack spacing={3}>
        <FormControl required>
          <FormLabel>Rating</FormLabel>
          <StarRating
            value={rating}
            onChange={setRating}
            size={24}
            color="#FFB400"
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Your Review</FormLabel>
          <TextField
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
          />
        </FormControl>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!rating || !comment.trim()}
          >
            Submit Review
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
} 