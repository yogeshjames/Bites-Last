import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import * as React from 'react';

export const CloseButton = React.forwardRef(function CloseButton(props, ref) {
  return (
    <IconButton aria-label="Close" ref={ref} {...props}>
      <CloseIcon />
    </IconButton>
  );
});
