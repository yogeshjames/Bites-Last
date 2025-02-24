"use client";

import { Box, Tabs, Tab, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProtectedRoute from "@/components/auth/protected-route"; // Ensures only logged-in users access this page
import { BackButton } from "@/components/ui/back-button";
import { CustomSpinner } from "@/components/ui/custom-spinner";

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2, py: 2 }}>
        <BackButton />
        <OrdersContent />
      </Box>
    </ProtectedRoute>
  );
}

function OrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0); // Tab to filter orders by status
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/user-orders`, {
          withCredentials: true, // Sends the authentication token
        });
        setOrders(response.data.orders);
      } catch (err) {
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }


    };

    fetchOrders();
  }, []);

  if (loading) return <CustomSpinner />;
  if (error) return <Box>{error}</Box>;

  const filteredOrders = orders.filter(order => {
    if (tabValue === 0) return true; // Show all orders
    if (tabValue === 1) return order.status === "Waiting";
    if (tabValue === 2) return order.status === "Accepted";
    if (tabValue === 4) return order.status === "Cancelled";
  });

  return (
    <>
      <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 3 }}>
        Your Orders
      </Typography>

      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="All" />
        <Tab label="Waiting" />
        <Tab label="Accepted" />
        <Tab label="Cancelled" />
      </Tabs>

      {/* Orders List */}
      <Box sx={{ mt: 3 }}>
        {filteredOrders.length === 0 ? (
          <Typography textAlign="center" color="text.secondary">
            No orders found.
          </Typography>
        ) : (
          filteredOrders.map(order => (
            <OrderCard key={order.orderId} order={order} />
          ))
        )}
      </Box>
    </>
  );
}
function OrderCard({ order }) {
    return (
      <Card sx={{ mb: 3, p: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {order.hotelName}
          </Typography>
          <Typography color="text.secondary">Id: {order.orderId}</Typography>
          <Typography color="text.secondary">Contact: {order.hotelContact}</Typography>
          <Typography color="text.secondary">Total: ₹{order.totalPrice}</Typography>
          <Typography color={getStatusColor(order.status)} fontWeight="bold">
            Status: {order.status}
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            {order.cartItems.map((item) => (
              <Typography key={item.id} color="text.secondary">
                - {item.quantity} × {item.name} (₹{item.price})
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }
  

// Function to determine the status color
const getStatusColor = (status) => {
  if (status === "Waiting") return "#f1c40f";
  if (status === "Accepted") return "#3498db";
  if (status === "Cancelled") return "#e74c3c";
  return "text.primary";
};
