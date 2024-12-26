'use client'

import { Box } from '@mui/material'
import styles from '@/styles/truck-loader.module.css'

export function TruckLoader() {
  return (
    <Box className={styles.loader}>
      <div className={styles.truckWrapper}>
        <div className={styles.truckBody}>
          <svg viewBox="0 0 198 93">
            <path
              d="M135.5 26.5L165 26.5L191.5 51.5L191.5 89L6 89L6 26.5L135.5 26.5Z"
              fill="#f08746"
            />
            <path
              d="M135.5 26.5L165 26.5L191.5 51.5L191.5 89L6 89L6 26.5L135.5 26.5Z"
              stroke="black"
              strokeWidth="3"
            />
            <circle cx="56" cy="89" r="10" fill="#333" />
            <circle cx="146" cy="89" r="10" fill="#333" />
          </svg>
        </div>
        <div className={styles.truckWheels}>
          <div className={styles.wheel} />
          <div className={styles.wheel} />
        </div>
      </div>
      <div className={styles.road} />
    </Box>
  )
} 