import { RadioGroup, FormControlLabel, Radio as MuiRadio } from '@mui/material';
import * as React from 'react';

export const Radio = React.forwardRef(function Radio(props, ref) {
  const { children, inputProps, rootRef, ...rest } = props;
  return (
    <FormControlLabel
      control={<MuiRadio inputRef={ref} {...inputProps} />}
      label={children}
      {...rest}
    />
  );
});

export const RadioGroup = RadioGroup;
