'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/context/user'
import { CustomSpinner } from '@/components/ui/custom-spinner'

export default function ProtectedRoute({ children }) {
  const { user, verifyToken } = useUser()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      //await verifyToken();  // Call verifyToken on each page load
      setLoading(false); 
    }

    checkAuth()
  }, [verifyToken])

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

  return children  // Render protected content if the user is authenticated
}
