'use client'

import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PasswordInput = React.forwardRef(function PasswordInput(props, ref) {
  const { defaultVisible, visible: visibleProp, onVisibleChange, ...rest } = props;
  const [visible, setVisible] = React.useState(defaultVisible || false);

  const handleVisibilityToggle = () => {
    setVisible(!visible);
    if (onVisibleChange) onVisibleChange(!visible);
  };

  return (
    <TextField
      {...rest}
      ref={ref}
      type={visible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleVisibilityToggle}>
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
});
