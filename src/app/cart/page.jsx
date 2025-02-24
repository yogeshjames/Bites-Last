'use client'

import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material'
import { useCart } from '@/context/cart'
import { CartItem } from '@/components/cart/cart-item'
import { formatPrice } from '@/lib/utils'
import { BackButton } from '@/components/ui/back-button'

export default function CartPage() {
  const { items, getTotal } = useCart()
  const total = getTotal()

  if (items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <BackButton />
        <Box textAlign="center" py={10}>
          <Typography variant="h4" gutterBottom>Your Cart is Empty</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Add some items to get started!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            href="/"
            component="a"
          >
            Browse Menu
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 8 }}>
      <BackButton />
      <Grid container spacing={8}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h4" sx={{ mb: 4 }}>Shopping Cart</Typography>
          <Stack spacing={2}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Card sx={{ position: 'sticky', top: '20px' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Order Summary</Typography>
              <Box sx={{ mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Subtotal</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>{formatPrice(total)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Delivery Fee</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography>{formatPrice(40)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography fontWeight="bold">Total</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="right">
                    <Typography fontWeight="bold">{formatPrice(total + 40)}</Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button variant="contained" fullWidth>
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
} 