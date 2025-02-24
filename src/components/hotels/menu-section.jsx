'use client'

import { 
  Box, 
  Grid,
  TextField,
  InputAdornment,
  Typography
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import { DishCard } from './dish-card'

export function MenuSection({ dishes , restaurantId}) {
  
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDishes = dishes?.filter((dish) =>
    dish?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )
  {console.log(filteredDishes);}
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
        
      {
      
  filteredDishes.length == 0 ? (
    <Typography
      variant="h6"
      color="text.secondary"
      fontSize="1rem"
      align="justify"
      sx={{
        pt: { xs: '10px', sm: '14px' }, 
        pl: { xs: '30vw', sm: '40vw' }, 
        fontSize: { xs: '0.875rem', sm: '1.3rem' }, 
      }}
    >
      No Foods Found 😔
    </Typography>
  ) : (
    filteredDishes?.map((dish) => (
      <Grid item xs={12} md={6} lg={4} key={dish.id}>
        <DishCard dish={dish} restaurantId ={restaurantId} />
        {/* //passing the id of thec urrent hotwl the dish is  */}
      </Grid>
    ))
  )
}
      </Grid>
    </Box>
  )
} 