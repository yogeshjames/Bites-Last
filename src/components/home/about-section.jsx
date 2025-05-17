'use client'

import { Box, Typography, Container } from '@mui/material';

export function AboutSection() {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#f5f5f5',
        py: { xs: 6, md: 8 },
        // center the whole section
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'Montserrat',
            fontWeight: 'bold',
          }}
        >
          About us
        </Typography>

        <Typography
          variant="body1"
          sx={{
            flex: 2,
            textAlign: 'center',
            color: 'text.secondary',
            lineHeight: 1.6,
          }}
        >
          We’re a small group of passionate individuals from NIT Trichy, driven by a shared vision to make a difference. What started as a spark of curiosity has grown into a mission to create meaningful change. From late‑night brainstorming sessions to turning ideas into impactful actions, we believe in building solutions that truly matter.

          Whether it's simplifying student queries, empowering institutions, or just adding a little extra flavor to everyday challenges, we’re here to bring innovation to life. Fueled by chai, camaraderie, and a can‑do attitude, we’re on a journey to leave a lasting impact—one project at a time.
          Join us as we turn “blehh blehh” into something extraordinary. 🚀
        </Typography>
      </Container>
    </Box>
  );
}
