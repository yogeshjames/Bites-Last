import { Popover as MuiPopover, PopoverContent, PopoverTrigger } from '@mui/material';
import * as React from 'react';

export const PopoverContent = React.forwardRef(function PopoverContent(props, ref) {
  const { children, ...rest } = props;
  return (
    <MuiPopover ref={ref} {...rest}>
      {children}
    </MuiPopover>
  );
});

export const PopoverArrow = React.forwardRef(function PopoverArrow(props, ref) {
  return (
    <MuiPopover.Arrow {...props} ref={ref}>
      <MuiPopover.ArrowTip />
    </MuiPopover.Arrow>
  )
})

export const PopoverCloseTrigger = React.forwardRef(
  function PopoverCloseTrigger(props, ref) {
    return (
      <MuiPopover.CloseTrigger
        position='absolute'
        top='1'
        insetEnd='1'
        {...props}
        asChild
        ref={ref}
      >
        <CloseButton size='sm' />
      </MuiPopover.CloseTrigger>
    )
  },
)

export const PopoverTitle = MuiPopover.Title
export const PopoverDescription = MuiPopover.Description
export const PopoverFooter = MuiPopover.Footer
export const PopoverHeader = MuiPopover.Header
export const PopoverRoot = MuiPopover.Root
export const PopoverBody = MuiPopover.Body
export const PopoverTrigger = MuiPopover.Trigger
