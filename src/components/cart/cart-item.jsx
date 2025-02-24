'use client'

import {
  Box,
  Typography,
  IconButton,
  Stack,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '@/context/cart';
import { formatPrice } from '@/lib/utils';

export function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <Card variant="outlined" sx={{ maxWidth: 400, marginBottom: 1 }}>
      <Box sx={{ display: 'flex', p: 1.5 }}>
        <CardContent sx={{ flex: 1, pl: 1.5, pr: 1.5 }}>
          <Typography variant="subtitle2" fontWeight="bold" noWrap>
            {item.name}
          </Typography> 
          <Typography color="text.secondary" variant="body2">
            {formatPrice(item.price)}
          </Typography>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1.5 }}>
            <TextField
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              inputProps={{ min: 1, max: 10 }}
              size="small"
              sx={{ width: 55 }}
            />
            <IconButton
              onClick={() => removeItem(item.id)}
              size="small"
              color="error"
              aria-label="Remove item"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </CardContent>
      </Box>
    </Card>
  );
}
