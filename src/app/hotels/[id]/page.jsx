'use client'

import { Box, Tabs, Tab } from '@mui/material'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { HotelInfo } from '@/components/hotels/hotel-info'
import { MenuSection } from '@/components/hotels/menu-section'
import { ReviewsSection } from '@/components/hotels/reviews-section'
import { CustomSpinner } from '@/components/ui/custom-spinner'
import { BackButton } from '@/components/ui/back-button'
import ProtectedRoute from '@/components/auth/protected-route' // Import the ProtectedRoute component

export default function HotelDetailsPage() {
  return (
    <ProtectedRoute>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2, py: 2 }}>
        <BackButton />
        <HotelDetailsContent />
      </Box>
    </ProtectedRoute>
  )
}

function HotelDetailsContent() {
  const [hotelDetails, setHotelDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/details/${id}`
        )
        const hotelData = response.data.data

        if (hotelData.dishes?.length > 0) {
          const foodResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/food/details`,
            { dishIds: hotelData.dishes }
          )
          hotelData.dishes = foodResponse.data.data
        }

        setHotelDetails(hotelData)
      } catch (err) {
        setError('Failed to load hotel details.')
      } finally {
        setLoading(false)
      }
    }

    fetchHotelDetails()
  }, [id])

  if (loading) return <CustomSpinner />
  if (error) return <Box>{error}</Box>

  return (
    <>
      <HotelInfo hotel={hotelDetails} />
      <Box sx={{ mt: 8 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab
        label="Menu"
        sx={{
          fontFamily: 'poppins',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'none',
          color: 'text.primary',
          '&.Mui-selected': {
            color: 'primary.main',
          },
        }}
      />
      <Tab
        label="Reviews"
        sx={{
          fontFamily: 'Quicksand, sans-serif',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'none',
          color: 'text.primary',
          '&.Mui-selected': {
            color: 'primary.main',
          },
        }}
      />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {tabValue === 0 && <MenuSection dishes={hotelDetails.dishes} restaurantId={id} />}
          {tabValue === 1 && <ReviewsSection hotelId={id} />}
        </Box>
      </Box>
    </>
  )
}
