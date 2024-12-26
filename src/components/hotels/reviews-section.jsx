'use client'

import { Box, Stack, Button, Typography, Snackbar } from '@mui/material'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { ReviewForm } from './review-form'
import { ReviewCard } from './review-card'
import { CustomSpinner } from '@/components/ui/custom-spinner'
import { useUser } from '@/context/user'

export function ReviewsSection({ hotelId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const { user } = useUser()
  const [toast, setToast] = useState({ open: false, message: '', severity: 'info' })

  useEffect(() => {
    fetchReviews()
  }, [hotelId])

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/reviews/${hotelId}`
      )
      setReviews(response.data.data)
    } catch (error) {
      setToast({ open: true, message: 'Error fetching reviews', severity: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleReviewSubmit = async (reviewData) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/hotel/review/${hotelId}`,
        reviewData,
        { withCredentials: true }
      )
      setToast({ open: true, message: 'Review submitted successfully!', severity: 'success' })
      setShowForm(false)
      fetchReviews()
    } catch (error) {
      setToast({
        open: true,
        message: error.response?.data?.message || 'Error submitting review',
        severity: 'error'
      })
    }
  }

  if (loading) return <CustomSpinner />

  return (
    <Box>
      {user && !showForm && (
        <Button
          onClick={() => setShowForm(true)}
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Write a Review
        </Button>
      )}

      {showForm && (
        <ReviewForm
          onSubmit={handleReviewSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <Stack spacing={2}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <Typography color="textSecondary" align="center">
            No reviews yet. Be the first to review!
          </Typography>
        )}
      </Stack>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        message={toast.message}
        severity={toast.severity}
      />
    </Box>
  )
} 