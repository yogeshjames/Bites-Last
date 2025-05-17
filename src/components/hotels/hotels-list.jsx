'use client'

import { Container, Grid, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { HotelCard } from './hotel-card'
import { CustomSpinner } from '@/components/ui/custom-spinner'

export function HotelsList() {
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
console.log(process.env.NEXT_PUBLIC_API_URL);
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/getall`
        )
        console.log(response)
        setHotels(response.data.data)
      } catch (err) {
        setError('Failed to load hotels. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  if (error) {
    return (
      <Typography 
        color="error" 
        variant="h6" 
        align="center" 
        sx={{ mb: 4 }}
      >
        {error}
      </Typography>
    )
  }

  if (loading) {
    return <CustomSpinner />
  }

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4}  key={hotel.hotelId} >
            <HotelCard
              hotelId={hotel.hotelId}
              hotelName={hotel.hotelName}
              currentRating={hotel.currentRating}
              numberOfUsersRated={hotel.numberOfUsersRated}
              thumbnailImage={hotel.thumbnailImage}
              dishes={hotel.dishes}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
} 