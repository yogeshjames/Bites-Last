'use client'

import { 
  Box, 
  Grid,
  TextField,
  InputAdornment
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { DishCard } from './dish-card'

export function MenuSection({ dishes }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDishes = dishes?.filter((dish) =>
    dish?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Box>
      <TextField
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search dishes..."
        sx={{
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            bgcolor: 'grey.50',
            '&:hover': {
              bgcolor: 'grey.100'
            }
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          style: { fontFamily: 'Muli' }
        }}
      />

      <Grid container spacing={3}>
        {filteredDishes?.map((dish) => (
          <Grid item xs={12} md={6} lg={4} key={dish.id}>
            <DishCard dish={dish} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
} 