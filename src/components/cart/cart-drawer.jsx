"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/context/cart";
import styled from "styled-components";
import { Drawer, Box, Typography, IconButton, Button, Stack, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {CartItem} from "./cart-item"; 
import { formatPrice } from "@/lib/utils";

const CheckoutButton = styled(Button)`
  width: 100%;
  margin-top: 1rem;
  padding: 0.75rem 1rem;
  background: #2d79f3;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: #1b5bbf;
  }
`;

export function CartDrawer({ isOpen, onClose }) {
  const { items, getTotal, restId, clearCart } = useCart();
  const router = useRouter();
  const total = getTotal();
  const isValidTotal = !isNaN(total) && total > 0; // Ensure total is valid

  const handleCheckout = async () => {
    const payload = {
      cartItems: items,      // Each item should include id, quantity, etc.
      total,                 // Client-calculated total (will be verified on the server)
      restaurantId: restId,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Sends HttpOnly cookies with the request
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, { position: "top-right", autoClose: 3000 });
        clearCart(); // Clear the cart after a successful order
        // router.push(`/order-confirmation/${data.orderId}`); // Redirect to confirmation page (optional)
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Checkout failed. Please try again.", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again.", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: 400 } },
      }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">Your Cart</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
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
        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography fontWeight="bold">Total:</Typography>
            <Typography fontWeight="bold">{formatPrice(total)}</Typography>
          </Box>
          {isValidTotal && (
            <CheckoutButton onClick={handleCheckout} variant="contained">
              Checkout
            </CheckoutButton>
          )}
          <Button variant="outlined" fullWidth onClick={clearCart}>
            Clear Cart
          </Button>
        </Box>
      )}
      <ToastContainer />
    </Drawer>
  );
}
