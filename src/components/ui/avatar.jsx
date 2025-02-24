'use client'

import { Avatar as MuiAvatar, AvatarGroup as MuiAvatarGroup } from '@mui/material';
import * as React from 'react';

export const Avatar = React.forwardRef(function Avatar(props, ref) {
  const { name, src, srcSet, loading, icon, fallback, children, ...rest } = props;
  return (
    <MuiAvatar ref={ref} src={src} srcSet={srcSet} {...rest}>
      {fallback || name.charAt(0)}
    </MuiAvatar>
  );
});

export const AvatarGroup = React.forwardRef(function AvatarGroup(props, ref) {
  return <MuiAvatarGroup ref={ref} {...props} />;
});
