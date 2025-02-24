import { Drawer as MuiDrawer, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import * as React from 'react';

export const DrawerContent = React.forwardRef(function DrawerContent(props, ref) {
  const { children, open, onClose, ...rest } = props;
  return (
    <MuiDrawer open={open} onClose={onClose} ref={ref} {...rest}>
      {children}
    </MuiDrawer>
  );
});

export const DrawerCloseTrigger = React.forwardRef(function DrawerCloseTrigger(props, ref) {
  return (
    <IconButton onClick={props.onClick} ref={ref}>
      <CloseIcon />
    </IconButton>
  );
});

export const DrawerTrigger = MuiDrawer.Trigger;
export const DrawerRoot = MuiDrawer.Root;
export const DrawerFooter = MuiDrawer.Footer;
export const DrawerHeader = MuiDrawer.Header;
export const DrawerBody = MuiDrawer.Body;
export const DrawerBackdrop = MuiDrawer.Backdrop;
export const DrawerDescription = MuiDrawer.Description;
export const DrawerTitle = MuiDrawer.Title;
export const DrawerActionTrigger = MuiDrawer.ActionTrigger;
