'use client'

import {
  Box,
  Typography,
  IconButton,
  Stack,
  TextField,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '@/context/cart';
import { formatPrice } from '@/lib/utils';

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <Card variant="outlined">
      <Box sx={{ display: 'flex', p: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 100, height: 100, borderRadius: 1, objectFit: 'cover' }}
          image={`${process.env.NEXT_PUBLIC_API_URL}/${item.image}`}
          alt={item.name}
        />
        <CardContent sx={{ flex: 1, pl: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {item.name}
          </Typography>
          <Typography color="text.secondary">
            {formatPrice(item.price)}
          </Typography>
          
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 2 }}>
            <TextField
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              inputProps={{ min: 1, max: 10 }}
              size="small"
              sx={{ width: 80 }}
            />
            <IconButton
              onClick={() => removeItem(item.id)}
              size="small"
              color="error"
              aria-label="Remove item"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
} 