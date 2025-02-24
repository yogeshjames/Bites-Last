import { InputAdornment, TextField } from '@mui/material'
import * as React from 'react'

export const InputGroup = React.forwardRef(function InputGroup(props, ref) {
  const {
    startElement,
    endElement,
    children,
    ...rest
  } = props

  return (
    <TextField
      ref={ref}
      {...rest}
      InputProps={{
        ...rest.InputProps,
        startAdornment: startElement && (
          <InputAdornment position="start">
            {startElement}
          </InputAdornment>
        ),
        endAdornment: endElement && (
          <InputAdornment position="end">
            {endElement}
          </InputAdornment>
        ),
      }}
    >
      {children}
    </TextField>
  )
})
