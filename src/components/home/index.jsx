'use client'
import { Box, Button, Typography, useMediaQuery, useTheme, Container, Divider } from '@mui/material';
import { useState, useContext } from 'react';
import { LoginDialog } from '@/components/auth/login-dialog';
import { HotelsList } from '@/components/hotels/hotels-list';
import { Image } from '@/components/ui/image';
import { ReviewsSection } from './reviews-section';
import { FeaturedSection } from './featured-section';
import { AboutSection } from './about-section';
import { useRouter } from 'next/navigation'; 
import { UserContext } from '@/context/user'

export function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const { user } = useContext(UserContext); // Getting user authentication status
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const backgroundImage = matches ? '/images/largebg.jpg' : '/images/smallbg.jpg';

  // Button logic based on authentication status
  const handleButtonClick = () => {
    if (user) {
      router.push('/orders'); // Navigate to Orders page if logged in
    } else {
      router.push('/register'); // Navigate to Register page if not logged in
    }
  };

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
            left: '45%',
            transform: {xs: 'translate(-60%,-30%)', md: 'translate(-10%,-50%)'},
            textAlign: 'center',
            width: '80%',
            maxWidth: '600px',
            zIndex: 1,
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
            onClick={handleButtonClick}
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
            {user ? "See Your Orders" : "Register Now"}
          </Button>
        </Box>
      </Box>
      <Divider />

      {/* Hotels List Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 'bold', textAlign: 'center' }}
        >
          Popular Restaurants
        </Typography>
        <HotelsList />
      </Container>

      <Divider />

      {/* Featured Section */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <FeaturedSection />
      </Container>

      <Divider/>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
