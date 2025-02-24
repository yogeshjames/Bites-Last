import { Button as MuiButton, CircularProgress } from '@mui/material';
import * as React from 'react';

export const Button = React.forwardRef(function Button(props, ref) {
  const { loading, disabled, loadingText, children, ...rest } = props;
  return (
    <MuiButton disabled={loading || disabled} ref={ref} {...rest}>
      {loading ? (
        <>
          <CircularProgress size={24} />
          {loadingText && <span>{loadingText}</span>}
        </>
      ) : (
        children
      )}
    </MuiButton>
  );
});
