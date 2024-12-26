'use client'

import { IconButton } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { styled } from '@mui/material/styles'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.error.main,
  }
}))

export function HeartButton({ isLiked, onClick }) {
  return (
    <StyledIconButton
      onClick={onClick}
      size="medium"
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </StyledIconButton>
  )
} 