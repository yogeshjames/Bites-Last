'use client'

import { Box, Button, Typography, useMediaQuery, useTheme, Container, Divider } from '@mui/material';
import { useState } from 'react';
import { LoginDialog } from '@/components/auth/login-dialog';
import { HotelsList } from '@/components/hotels/hotels-list';
import { Image } from '@/components/ui/image';
import { ReviewsSection } from './reviews-section';
import { FeaturedSection } from './featured-section';
import { AboutSection } from './about-section';

export function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const backgroundImage = matches ? '/images/largebg.jpg' : '/images/smallbg.jpg';
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '80vh' },
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Image
          src={backgroundImage}
          alt="Background"
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
          priority
        />

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: {xs: 'translate(-50%,-50%)', md: 'translate(-10%,-50%)'},
            textAlign: 'center',
            width: '90%',
            maxWidth: '600px',
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderRadius: 2,
            p: 4
          }}
        >
          <Typography
            variant={matches ? "h3" : "h4"}
            fontWeight="bold"
            color="white"
            sx={{ mb: 3 }}
          >
            Get your food delivered.
          </Typography>
          <Button
            onClick={() => setIsSignInOpen(true)}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 8,
              px: 4,
              py: 1.5,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              textTransform: 'none'
            }}
          >
            Register Now
          </Button>
        </Box>
      </Box>

     
      <Divider />

      {/* Hotels List Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Popular Restaurants
        </Typography>
        <HotelsList />
      </Container>

      <Divider />

       {/* Featured Section */}
       <Container maxWidth="lg" sx={{ py: 8 }}>
        <FeaturedSection />
      </Container>

          <Divider/>

      {/* Reviews Section */}
      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <ReviewsSection />
      </Container>

      <Divider /> */}

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <AboutSection />
      </Container>

      {/* Login Dialog */}
      <LoginDialog 
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </Box>
  );
} 