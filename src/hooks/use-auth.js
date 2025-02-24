'use client'

import { useCallback } from 'react'
import { useUser } from '@/context/user'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { login, logout, register } = useUser()
  const router = useRouter()

  const handleLogin = useCallback(async (credentials) => {
    try {
      await login(credentials)
      router.push('/')
    } catch (error) {
      throw error
    }
  }, [login, router])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [logout])

  const handleRegister = useCallback(async (userData) => {
    try {
      await register(userData)
      router.push('/')
    } catch (error) {
      throw error
    }
  }, [register, router])

  return {
    handleLogin,
    handleLogout,
    handleRegister
  }
} 