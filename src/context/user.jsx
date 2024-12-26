'use client'

import { createContext, useContext, useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

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

  const login = async (credentials) => {
    try {
      // Implement login logic here
      showNotification('Successfully logged in')
    } catch (error) {
      showNotification(error.message, 'error')
      throw error
    }
  }

  const logout = () => {
    try {
      setUser(null)
      showNotification('Successfully logged out')
    } catch (error) {
      showNotification('Error logging out', 'error')
    }
  }

  const register = async (userData) => {
    try {
      // Implement register logic here
      showNotification('Successfully registered')
    } catch (error) {
      showNotification(error.message, 'error')
      throw error
    }
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register }}>
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
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
} 