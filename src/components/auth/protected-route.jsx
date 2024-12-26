'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import { CustomSpinner } from '@/components/ui/custom-spinner'

export function ProtectedRoute({ children }) {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [loading, user, router])

  if (loading) {
    return <CustomSpinner />
  }

  if (!user) {
    return null
  }

  return children
} 