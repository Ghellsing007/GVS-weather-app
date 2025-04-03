import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Clima App',
  description: 'Creado por Garving Vasquez S.',
  generator: 'gvservices',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
