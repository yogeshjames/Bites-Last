'use client'

import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/login/signout`, {
        method: 'POST',
        credentials: 'include',
      })

      // Clear storages
      localStorage.clear()
      sessionStorage.clear()

      // Clear caches
      if ('caches' in window) {
        const keys = await caches.keys()
        for (const key of keys) {
          await caches.delete(key)
        }
      }

    window.location.href = '/'
    } catch (error) {
      console.error('Sign out failed:', error)
      // You can show a toast here if you want!
    }
  }

  return (
    <Button variant="outlined" color="error" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
