'use client'

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '@/context/cart';
import { CartItem } from './cart-item';
import { formatPrice } from '@/lib/utils';

export function CartDrawer({ isOpen, onClose }) {
  const { items, clearCart, getTotal } = useCart();
  const total = getTotal();

  // Check if the total is a valid number and greater than zero
  const isValidTotal = !isNaN(total) && total > 0;

  const handleCheckout = () => {
    // Implement checkout logic
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
        {items.length === 0 ? (
          <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
            Your cart is empty
          </Typography>
        ) : (
          <Stack spacing={2}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Stack>
        )}
      </Box>

      {items.length > 0 && (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography fontWeight="bold">Total:</Typography>
            <Typography fontWeight="bold">{formatPrice(total)}</Typography>
          </Box>
          {isValidTotal && (
            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              sx={{ mb: 1 }}
            >
              Checkout
            </Button>
          )}
          <Button
            variant="outlined"
            fullWidth
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        </Box>
      )}
    </Drawer>
  );
}
