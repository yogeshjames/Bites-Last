'use client'

import { IconButton, Tooltip } from '@mui/material';
import { ArrowBack as ArrowLeftIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <Tooltip title="Go back">
      <IconButton
        onClick={() => router.back()}
        aria-label="Go back"
        size="large"
      >
        <ArrowLeftIcon />
      </IconButton>
    </Tooltip>
  );
} 