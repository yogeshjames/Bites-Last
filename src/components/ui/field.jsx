import { TextField, FormHelperText, FormControl, InputLabel } from '@mui/material';
import * as React from 'react';

export const Field = React.forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, optionalText, ...rest } = props;
  return (
    <FormControl ref={ref} {...rest}>
      {label && <InputLabel>{label}</InputLabel>}
      <TextField {...rest} helperText={helperText || optionalText} error={!!errorText} />
      {children}
      {errorText && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
});
