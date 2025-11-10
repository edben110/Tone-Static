import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tone Static',
  description: 'Reproductor de música con Jamendo y archivos locales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
