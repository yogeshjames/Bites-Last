'use client'

import { createContext, useContext, useState ,useEffect} from 'react'
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
      console.log(credentials);
        const response = await fetch(`http://localhost:5000/api/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include',
        });

        const result = await response.json();
         
        if (!response.ok) throw new Error(result.message || 'Login failed');
console.log(result);
localStorage.setItem('userId', `${result.clientId}`);
        setUser(result.user);
        showNotification('Successfully logged in');
    } catch (error) {
        showNotification(error.message, 'error');
        throw error;
    }
};


const verifyToken = async () => {
    try {
        const response = await fetch(`http://localhost:5000/api/auth/verifyToken`, {
            credentials: 'include',
        });

        if (response.ok) {
            const result = await response.json();
            setUser(result.user);
        } else {
            setUser(null);
        }
    } catch {
        setUser(null);
    }
};

useEffect(() => {
    verifyToken();
}, []);




  const logout = async  () => {
    try {
      const re = await fetch(`http://localhost:5000/api/auth/logout`);

      if(re.ok){
        setUser(null)

        showNotification('Successfully logged out')
      }
      
    } catch (error) {
      showNotification('Error logging out', 'error')
    }
  }



  const register = async (userData) => {
    const backendUrl = process.env.BACKEND_URL
    try {
      // Send the POST request to your external backend API with user data
      const response = await fetch(`http://localhost:5000/api/user/register`, {////////WHY .ENV DOESNT WORK 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),  // Sending the user data as JSON
      });
  
      // Get the response from the backend
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
  
      // Show success notification
      showNotification('Successfully registered');
    } catch (error) {
      showNotification(error.message, 'error')
      throw error
    }
  }

  return (
    <UserContext.Provider value={{ user, login, logout, register,verifyToken }}>
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