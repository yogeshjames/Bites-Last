import { Tooltip as MuiTooltip } from '@mui/material';
import * as React from 'react';

export const Tooltip = React.forwardRef(function Tooltip(props, ref) {
  const { children, content, ...rest } = props;

  return (
    <MuiTooltip title={content} ref={ref} {...rest}>
      {children}
    </MuiTooltip>
  );
});
