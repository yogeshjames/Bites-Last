import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import * as React from 'react'

export const Checkbox = React.forwardRef(function Checkbox(props, ref) {
  const { children, ...rest } = props
  
  if (children) {
    return (
      <FormControlLabel
        control={<MuiCheckbox {...rest} ref={ref} />}
        label={children}
      />
    )
  }
  
  return <MuiCheckbox {...rest} ref={ref} />
})
