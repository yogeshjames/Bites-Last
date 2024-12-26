'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setItems(JSON.parse(savedCart))
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

  const saveCart = (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
    setItems(newItems)
  }

  const addItem = (dish, quantity = 1) => {
    const existingItem = items.find(item => item.id === dish.id)
    
    if (existingItem) {
      const newItems = items.map(item => 
        item.id === dish.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
      saveCart(newItems)
    } else {
      saveCart([...items, { ...dish, quantity }])
    }

    showNotification(`${dish.name} added to cart`)
  }

  const removeItem = (dishId) => {
    const newItems = items.filter(item => item.id !== dishId)
    saveCart(newItems)
    showNotification('Item removed from cart')
  }

  const updateQuantity = (dishId, quantity) => {
    if (quantity < 1) {
      removeItem(dishId)
      return
    }

    const newItems = items.map(item =>
      item.id === dishId ? { ...item, quantity } : item
    )
    saveCart(newItems)
  }

  const clearCart = () => {
    localStorage.removeItem('cart')
    setItems([])
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
        getTotal
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