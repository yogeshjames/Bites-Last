import { Providers } from '@/components/providers'
import { Navbar } from '@/components/layout/navbar'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bites - Food Delivery',
  description: 'Order your favorite food online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main className="min-h-screen pt-[11vh]">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
} 