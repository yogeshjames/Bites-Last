'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [restId, setRestId] = useState(null) // Changed restaurantId to restId
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  // Load saved cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedRestId = localStorage.getItem('restaurantId') 
    
    if (savedCart && savedRestId) {
      setItems(JSON.parse(savedCart))
      setRestId(savedRestId) 
    }

    setLoading(false)
  }, [])

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }))
  }

  const showNotification = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    })
  }

  const saveCart = (newItems, newRestId) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
    localStorage.setItem('restaurantId', newRestId) 
    setItems(newItems)
    setRestId(newRestId) 
  }

  const addItem = (dish, restaurantId, quantity = 1) => {
    console.log(restaurantId);

    if (restId && restId !== restaurantId) {
      clearCart() // Clear the cart if restaurantId differs from the stored restId
    }

    const existingItem = items.find(item => item.id === dish.id)

    if (existingItem) {
      const newItems = items.map(item =>
        item.id === dish.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
      saveCart(newItems, restaurantId) // Pass the incoming restaurantId
    } else {
      saveCart([...items, { ...dish, quantity }], restaurantId) // Save new item with restaurantId
    }

    showNotification(`${dish.name} added to cart`)
  }

  const removeItem = (dishId) => {
    const newItems = items.filter(item => item.id !== dishId);
  console.log(newItems);

  if (newItems.length === 0) {
    clearCart();
    console.log('Cart is empty, clearing cart...');
  } else {
    saveCart(newItems, restId); 
  }
  showNotification('Item removed from cart');
};
  // Update quantity of item
  const updateQuantity = (dishId, quantity) => {
    if (quantity < 1) {
      removeItem(dishId)
      return
    }

    const newItems = items.map(item =>
      item.id === dishId ? { ...item, quantity } : item
    )
    saveCart(newItems, restId) // Update with restId
  }

  // Clear the cart function
  const clearCart = () => {
    localStorage.removeItem('cart')
    localStorage.removeItem('restaurantId') // Clear restaurant ID from localStorage
    setItems([])
    setRestId(null) // Clear restId
    showNotification('Cart cleared')
  }

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
        restId 
      }}
    >
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
