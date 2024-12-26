'use client'

import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

export function FeaturedSection() {
  const featuredItems = [
    {
      id: 1,
      title: 'Special Offers',
      image: '/1st.svg',
      description: 'Exclusive deals and discounts'
    },
    {
      id: 2,
      title: 'Fast Delivery',
      image: '/images/2nd.png',
      description: 'Quick and reliable service'
    },
    {
      id: 3,
      title: 'Top Rated',
      image: '/3rd.svg',
      description: 'Best restaurants in town'
    }
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        Why Choose Us
      </Typography>
      <Grid container spacing={4}>
        {featuredItems.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 