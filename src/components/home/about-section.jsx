'use client'

import { Box, Typography, Grid, Paper } from '@mui/material';

export function AboutSection() {
  return (
    <Box 
      display={{ xs: 'block', md: 'flex' }} 
      paddingBottom="6vh" 
      flexDirection={{ xs: 'column', md: 'row' }} 
      width={'90vw'} 
      backgroundColor={'#f5f5f5'} 
      mt={'1vh'}
    >
      <Box 
        display="flex" 
        flex={'1'} 
        justifyContent={'center'} 
        alignItems={'center'} 
        padding="2vh"
      >
        <Typography 
          textAlign={'center'} 
          fontFamily={'Montserrat'} 
          fontSize={{ xs: '2xl', md: '3xl' }} 
          fontWeight={'bold'}
          color="text.primary"
        >
          About us
        </Typography>
      </Box>
      <Box 
        display={'flex'} 
        flex={'1'} 
        justifyContent={'center'} 
        alignItems={'center'} 
        padding="2vh"
      >
        <Typography 
          textAlign={'center'} 
          paddingY="4" 
          width='100%' 
          color="text.secondary" 
          fontSize={{ xs: 'sm', md: 'md' }}
        >
          We’re a small group of passionate individuals from NIT Trichy, driven by a shared vision to make a difference. What started as a spark of curiosity has grown into a mission to create meaningful change. From late-night brainstorming sessions to turning ideas into impactful actions, we believe in building solutions that truly matter.

          Whether it's simplifying student queries, empowering institutions, or just adding a little extra flavor to everyday challenges, we’re here to bring innovation to life. Fueled by chai, camaraderie, and a can-do attitude, we’re on a journey to leave a lasting impact—one project at a time.

          Join us as we turn “blehh blehh” into something extraordinary. 🚀
        </Typography>
      </Box>
    </Box>
  );
}

