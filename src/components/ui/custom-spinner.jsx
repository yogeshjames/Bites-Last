'use client'

import { Box, CircularProgress } from '@mui/material'

export function CustomSpinner() {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100%"
      minHeight="200px"
    >
      <CircularProgress 
        sx={{ 
          color: 'primary.main',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          }
        }} 
      />
    </Box>
  )
} 