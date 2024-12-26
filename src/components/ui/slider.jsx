import { Slider as MuiSlider, Box, Typography } from '@mui/material';
import * as React from 'react';

export const Slider = React.forwardRef(function Slider(props, ref) {
  const { marks, label, showValue, ...rest } = props;

  return (
    <Box>
      {label && <Typography>{label}</Typography>}
      <MuiSlider ref={ref} marks={marks} {...rest} />
    </Box>
  );
});
