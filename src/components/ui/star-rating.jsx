'use client'

import { Box, IconButton } from '@mui/material';
import { Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material';
import * as React from 'react';

export function StarRating({ value, onChange, size = 24, color = "#FFB400", readOnly = false }) {
  const stars = Array(5).fill(0);

  return (
    <Box display="flex" alignItems="center">
      {stars.map((_, index) => (
        <IconButton
          key={index}
          onClick={() => !readOnly && onChange(index + 1)}
          disabled={readOnly}
          sx={{ color: index < value ? color : 'gray.200' }}
        >
          {index < value ? <StarIcon fontSize="inherit" /> : <StarBorderIcon fontSize="inherit" />}
        </IconButton>
      ))}
    </Box>
  );
} 