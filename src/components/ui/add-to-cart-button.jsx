'use client'

import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useUser } from '@/context/user'
import { useCart } from '@/context/cart'

export function AddToCartButton({ dish }) {
  const { user } = useUser()
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!user) {
      // Using the new snackbar system from context
      return
    }

    addItem(dish)
  }

  return (
    <IconButton
      onClick={handleAddToCart}
      color="primary"
      size="small"
      sx={{
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: 'primary.light',
        }
      }}
      aria-label="Add to cart"
    >
      <AddIcon />
    </IconButton>
  )
} 