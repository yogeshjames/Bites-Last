'use client';

import { Box, Typography, Stack, IconButton, Link } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

export function FeaturedSection() {
  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
      >
        Why Choose Us
      </Typography>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        wrap="wrap"
        width="100%"
        paddingTop={'5vh'}
        spacing={4}
      >
        {/* Block 1 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ base: '100%', md: '30%' }}
          marginBottom="8"
        >
          <Box width="96px" height="96px" mb="4">
            <img src="/1st.svg" alt="Satisfy any craving" width="100%" height="100%" />
          </Box>
          <Typography fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
            Satisfy any craving
          </Typography>
          <Typography textAlign="center" color="gray.500">
            Check out menus from popular local restaurants and chains. Order something new or tuck into your favorite go-to.
          </Typography>
        </Box>

        {/* Block 2 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ base: '100%', md: '30%' }}
          marginBottom="8"
        >
          <Box width="96px" height="96px" mb="4">
            <img src="/images/2nd.png" alt="Delivery or pickup" width="100%" height="100%" />
          </Box>
          <Typography fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
            Delivery or pickup
          </Typography>
          <Typography textAlign="center" color="gray.500">
            Sit back and relax, have us deliver to you or skip the line with pickup.
          </Typography>
        </Box>

        {/* Block 3 */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ base: '100%', md: '30%' }}
          marginBottom="8"
        >
          <Box width="96px" height="96px" mb="4">
            <img src="/3rd.svg" alt="Save with FoodApp+" width="100%" height="100%" />
          </Box>
          <Typography fontSize="xl" fontWeight="bold" mb="2" textAlign="center">
            Save with Bites+
          </Typography>
          <Typography textAlign="center" color="gray.500">
            Join Bites+ and get unlimited $0 delivery fees, exclusive offers, and more.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

